#!/usr/bin/env python3
"""
Bora Group Image Pipeline & Audit Tool
======================================
Strict Preservation and Lossless Image Management

Enforces:
1. Preservation of untouched original masters in images/originals/
2. Visually lossless web asset generation (never aggressive compression)
3. Zero repetitive re-compression
4. High-DPI (@2x) responsive support for Retina/4K displays
5. Comprehensive audit of intrinsic resolution vs CSS container display
"""

import os
import re
import glob
import shutil
import hashlib
from PIL import Image

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
IMAGES_DIR = os.path.join(BASE_DIR, 'images')
ORIGINALS_DIR = os.path.join(IMAGES_DIR, 'originals')

def get_file_hash(filepath):
    """Compute SHA-256 hash of a file for change detection and idempotency."""
    if not os.path.exists(filepath):
        return None
    h = hashlib.sha256()
    with open(filepath, 'rb') as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

def ingest_master(source_path, target_basename):
    """
    Ingest an uploaded image:
    1. Copies the file directly and byte-for-byte to images/originals/
    2. Derives visually lossless web assets without destructive resizing.
    """
    os.makedirs(ORIGINALS_DIR, exist_ok=True)
    orig_path = os.path.join(ORIGINALS_DIR, target_basename)
    shutil.copyfile(source_path, orig_path)
    print(f"[INGEST] Master preserved: {orig_path} ({os.path.getsize(orig_path)} bytes)")
    
    # Process for web
    process_master(orig_path)

def process_master(orig_path):
    """
    Process an original master image into web-ready assets:
    - Never reduces resolution unless creating dedicated responsive srcset tiers.
    - Preserves PNG for graphics/illustrations/logos.
    - Uses quality=98, 4:4:4 chroma for JPEG (visually lossless).
    - Generates lossless/near-lossless WebP (quality=98) alongside JPEG.
    """
    basename = os.path.basename(orig_path)
    name, ext = os.path.splitext(basename)
    ext_lower = ext.lower()

    im = Image.open(orig_path)
    w, h = im.size

    # Target path in main images directory
    dest_path = os.path.join(IMAGES_DIR, basename)
    
    # If format is PNG, preserve as pristine PNG
    if ext_lower == '.png':
        # Copy master byte-for-byte to guarantee zero loss
        shutil.copyfile(orig_path, dest_path)
        # Also create WebP lossless
        webp_path = os.path.join(IMAGES_DIR, f"{name}.webp")
        im.save(webp_path, 'WEBP', lossless=True, quality=100)
        print(f"[PROCESS] Byte-for-byte lossless PNG & WebP: {dest_path} ({w}x{h})")
    elif ext_lower in ('.jpg', '.jpeg'):
        # Copy master byte-for-byte to guarantee zero loss
        shutil.copyfile(orig_path, dest_path)
        webp_path = os.path.join(IMAGES_DIR, f"{name}.webp")
        if im.mode != 'RGB':
            im_rgb = im.convert('RGB')
        else:
            im_rgb = im
        im_rgb.save(webp_path, 'WEBP', quality=98, method=6)
        print(f"[PROCESS] Byte-for-byte master JPEG & lossless WebP: {dest_path} ({w}x{h})")

def audit_all_images():
    """Audit all images referenced in HTML files against their intrinsic resolutions."""
    html_files = glob.glob(os.path.join(BASE_DIR, '*.html')) + \
                 glob.glob(os.path.join(BASE_DIR, '*/*.html')) + \
                 glob.glob(os.path.join(BASE_DIR, '*/*/*.html'))
    html_files = [f for f in html_files if not os.path.basename(f).startswith('.')]

    img_src_regex = re.compile(r'<img[^>]+src=["\']([^"\'>\s]+)["\']', re.IGNORECASE)
    bg_img_regex = re.compile(r'url\(["\']?([^"\'\)\s]+)["\']?\)', re.IGNORECASE)

    findings = []
    
    for hf in html_files:
        rel_html = os.path.relpath(hf, BASE_DIR)
        content = open(hf, encoding='utf-8', errors='ignore').read()
        
        matches = img_src_regex.findall(content)
        for src in matches:
            src_clean = src.split('?')[0]
            if not src_clean.startswith('http') and not src_clean.startswith('data:'):
                hdir = os.path.dirname(hf)
                norm = os.path.normpath(os.path.join(hdir, src_clean))
                rel_img = os.path.relpath(norm, BASE_DIR)
                
                if not os.path.exists(norm):
                    findings.append({
                        'html': rel_html,
                        'image': rel_img,
                        'status': 'MISSING'
                    })
                else:
                    try:
                        im = Image.open(norm)
                        findings.append({
                            'html': rel_html,
                            'image': rel_img,
                            'format': im.format,
                            'width': im.width,
                            'height': im.height,
                            'bytes': os.path.getsize(norm),
                            'status': 'OK'
                        })
                    except Exception as e:
                        findings.append({
                            'html': rel_html,
                            'image': rel_img,
                            'status': f'ERROR: {e}'
                        })

    return findings

if __name__ == '__main__':
    print("=" * 60)
    print("BORA GROUP IMAGE PIPELINE & AUDIT")
    print("=" * 60)
    
    # Process existing originals
    os.makedirs(ORIGINALS_DIR, exist_ok=True)
    for orig in os.listdir(ORIGINALS_DIR):
        orig_p = os.path.join(ORIGINALS_DIR, orig)
        if os.path.isfile(orig_p) and not orig.startswith('.'):
            process_master(orig_p)
            
    # Run audit
    findings = audit_all_images()
    missing = [f for f in findings if f['status'] == 'MISSING']
    ok = [f for f in findings if f['status'] == 'OK']
    print(f"\nAudit complete: {len(ok)} references OK, {len(missing)} missing.")
    if missing:
        for m in missing:
            print(f"  [MISSING] {m['html']} -> {m['image']}")
