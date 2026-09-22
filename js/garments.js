/**
 * BORA GROUP — Garments & Textile Engine
 * Shop by Category Focus: 8 Main Categories Only, Sharp Architectural Edges.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof GARMENTS_DATA === 'undefined') {
    console.error('GARMENTS_DATA is not defined. Ensure js/garments-data.js is loaded first.');
    return;
  }

  // =========================================================================
  // SHOP BY CATEGORY SECTION (8 Main Categories Only)
  // =========================================================================
  const categoryGrid = document.getElementById('shop-category-grid');
  if (categoryGrid) {
    categoryGrid.innerHTML = GARMENTS_DATA.shopCategories.map((cat, idx) => `
      <div class="shop-cat-card garment-sharp group bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div>
          <!-- Accurate Square Image Frame -->
          <div class="garment-img-frame aspect-square w-full border-b border-stone-200 relative">
            <img src="${cat.image}" alt="${cat.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out">
            <div class="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"></div>
            <span class="absolute top-3 right-3 text-[10px] font-heading font-bold uppercase tracking-widest text-white bg-black/70 px-2.5 py-1 border border-white/20">
              ${cat.tag}
            </span>
            <span class="absolute bottom-3 left-4 text-[10px] font-mono text-white/80 font-medium">0${idx + 1}</span>
          </div>

          <div class="p-5 sm:p-6">
            <h3 class="font-heading font-bold text-xl text-navy group-hover:text-gold transition-colors duration-300">
              ${cat.title}
            </h3>
            <p class="font-sans text-xs text-stone-500 font-normal leading-relaxed mt-2.5">
              ${cat.description}
            </p>
          </div>
        </div>

        <div class="p-5 sm:p-6 pt-0 mt-auto">
          <div class="pt-4 border-t border-stone-150 flex items-center justify-between">
            <a href="${cat.anchor}" class="text-xs font-heading font-bold uppercase tracking-widest text-navy group-hover:text-gold transition-colors flex items-center gap-1.5">
              <span>Enquire Category</span>
              <span class="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
            <span class="text-[10px] font-mono text-stone-400">#0${idx + 1}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // BRAND LOGOS HORIZONTAL BAR (Left to Right Continuous Loop)
  // =========================================================================
  const brandTrack = document.getElementById('brand-marquee-track');
  if (brandTrack && GARMENTS_DATA.brandLogos) {
    const logos = GARMENTS_DATA.brandLogos;
    // Repeat set twice per half (20 logos per half = ~4500px), ensuring seamless loop on all displays
    const singleBatch = [...logos, ...logos];
    const doubleBatch = [...singleBatch, ...singleBatch];

    brandTrack.innerHTML = doubleBatch.map(b => `
      <div class="brand-logo-item" title="${b.name}">
        <img src="${b.logo}" alt="${b.alt}" class="brand-logo-img" loading="eager">
      </div>
    `).join('');
  }
});

