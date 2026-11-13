<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Strict Image Quality & Preservation Rules for AI Agents

**CRITICAL: Original image quality must ALWAYS be preserved across the entire website.**

Whenever new images are added or existing images are modified:
1. **Preserve Master Originals in `images/originals/`**:
   - Always copy the untouched original master file directly to `images/originals/<filename>`.
   - Never overwrite an original master with a downscaled or converted version.
2. **Never Downscale or Degrade Resolution**:
   - Never reduce the resolution of an uploaded image.
   - Never resize high-resolution images down to arbitrary low-resolution dimensions (e.g. 768x1024 or 600x600).
   - Never convert high-quality images into low-quality JPEG or WebP files.
   - Do not use thumbnails or previews as main website assets.
3. **Lossless Quality Standards**:
   - For PNG images (graphics, logos, illustrations): preserve lossless PNG.
   - For JPEG images: maintain visually lossless quality (`quality >= 98`, `subsampling=0` / 4:4:4 full chroma).
   - For modern WebP variants: use visually lossless quality (`quality >= 98` or `lossless=True`).
   - Never repeatedly compress or re-encode already processed images during subsequent turns or builds.
4. **Rendering & Layout**:
   - Ensure `<img>` elements use `object-fit` without stretching low-resolution images.
   - Use `loading="lazy"` and `decoding="async"` for below-the-fold images.
   - Use `fetchpriority="high"` and `decoding="sync"` for critical hero banners above the fold.
   - Run `python3 scripts/image-pipeline.py` to audit and process masters without destructive edits.

# Automated Git Push Rule for AI Agents

After making any changes and verifying them, you MUST stage, commit, and push the changes directly to the `main` branch on GitHub.
You can execute the automated sync script:
`powershell -NoProfile -ExecutionPolicy Bypass -File ./git-sync.ps1`
Or run:
1. `git add -A`
2. `git commit -m "Descriptive commit message detailing the changes"`
3. `git push origin main`
Ensure the remote GitHub repository is always updated before completing the task.
