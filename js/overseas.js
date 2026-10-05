/**
 * BORA GROUP — Overseas Trade Controller
 * Clean, minimal Apple-inspired categorized product showcase.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof OVERSEAS_DATA === 'undefined') return;

  const pillContainer = document.getElementById('sector-pills');
  const productGrid = document.getElementById('sector-product-grid');
  let activeSector = 'all';

  function renderPills() {
    if (!pillContainer) return;
    pillContainer.innerHTML = OVERSEAS_DATA.sectors.map(s => `
      <button type="button" class="sector-pill ${s.id === activeSector ? 'active' : ''}" data-sector="${s.id}">
        ${s.name}
      </button>
    `).join('');

    pillContainer.querySelectorAll('.sector-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeSector = btn.getAttribute('data-sector');
        renderPills();
        renderProducts();
      });
    });
  }

  function renderProducts() {
    if (!productGrid) return;

    const filtered = activeSector === 'all'
      ? OVERSEAS_DATA.products
      : OVERSEAS_DATA.products.filter(p => p.category === activeSector);

    productGrid.innerHTML = filtered.map(item => `
      <div class="minimal-card">
        <div class="minimal-img-frame">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="p-6 flex flex-col justify-between flex-1">
          <div>
            <div class="text-[11px] font-heading uppercase tracking-wider text-stone-400 font-semibold mb-1">
              ${item.categoryLabel}
            </div>
            <h3 class="font-heading font-bold text-lg text-stone-900 mb-1.5">
              ${item.name}
            </h3>
            <p class="text-xs text-stone-500 font-sans mb-3 font-medium">
              ${item.spec}
            </p>
            <p class="text-xs text-stone-600 font-sans leading-relaxed">
              ${item.desc}
            </p>
          </div>
          <div class="pt-5 mt-6 border-t border-stone-100 flex items-center justify-between">
            <a href="enquiry-export.html?subject=${encodeURIComponent(item.name + ' Export Enquiry')}" class="minimal-link">
              <span>Enquire</span>
              <i class="fa-solid fa-arrow-right text-[9px]"></i>
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  renderPills();
  renderProducts();
});
