/**
 * BORA GROUP — Industrial Supply Interactive Controller
 * Manages category cards, product grids, discovery filtering, and mobile drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof INDUSTRIAL_DATA === 'undefined') {
    console.error('INDUSTRIAL_DATA not loaded. Ensure js/industrial-data.js is included.');
    return;
  }

  // =========================================================================
  // 01 — SHOP BY CATEGORY
  // =========================================================================
  const categoryGrid = document.getElementById('industrial-category-grid');
  if (categoryGrid) {
    categoryGrid.innerHTML = INDUSTRIAL_DATA.categories.map((cat, idx) => `
      <a href="${cat.anchor}" class="ind-card group p-6 sm:p-7 flex flex-col justify-between" aria-label="${cat.name}">
        <div>
          <div class="flex items-center justify-between mb-5">
            <span class="w-12 h-12 rounded-xl bg-stone-100 text-navy flex items-center justify-center text-lg group-hover:bg-navy group-hover:text-gold transition-colors duration-300">
              <i class="${cat.icon}"></i>
            </span>
            <span class="text-[10px] font-heading font-bold uppercase tracking-widest text-stone-400 bg-stone-50 border border-stone-200/60 px-2.5 py-1 rounded-md">
              ${cat.tag}
            </span>
          </div>

          <h3 class="font-heading font-bold text-xl text-navy group-hover:text-gold transition-colors">
            ${cat.name}
          </h3>
          <p class="font-sans text-xs sm:text-sm text-stone-500 font-normal leading-relaxed mt-2">
            ${cat.description}
          </p>
        </div>

        <div class="pt-5 mt-6 border-t border-stone-100 flex items-center justify-between">
          <span class="text-xs font-heading font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors flex items-center gap-1.5">
            Explore <i class="fa-solid fa-arrow-right text-[10px] transform group-hover:translate-x-1.5 transition-transform"></i>
          </span>
          <span class="text-[10px] font-mono text-stone-300">0${idx + 1}</span>
        </div>
      </a>
    `).join('');
  }

  // =========================================================================
  // 02 — PET PRODUCTS (PET Jars & PET Bottles)
  // =========================================================================
  const petGrid = document.getElementById('pet-products-grid');
  if (petGrid) {
    petGrid.innerHTML = INDUSTRIAL_DATA.petProducts.map(prod => `
      <div class="ind-card group flex flex-col md:flex-row items-center overflow-hidden">
        <div class="w-full md:w-1/2 h-64 md:h-80 bg-stone-100 relative overflow-hidden flex items-center justify-center p-8">
          <div class="w-24 h-24 rounded-full bg-white/80 shadow-md text-navy flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-500">
            <i class="${prod.icon}"></i>
          </div>
          <span class="absolute top-4 left-4 text-[10px] font-heading font-bold uppercase tracking-wider text-stone-500 bg-white/90 backdrop-blur px-2.5 py-1 rounded">
            ${prod.material} Material
          </span>
        </div>
        <div class="w-full md:w-1/2 p-8 lg:p-10 flex flex-col justify-between h-full">
          <div>
            <span class="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-gold block mb-1">
              CONTAINER COMPONENT
            </span>
            <h4 class="font-heading font-extrabold text-2xl lg:text-3xl text-navy group-hover:text-gold transition-colors">
              ${prod.name}
            </h4>
            <p class="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed mt-3">
              ${prod.description}
            </p>
          </div>
          <div class="pt-6 mt-6 border-t border-stone-150 flex items-center justify-between">
            <a href="enquiry-industrial.html?subject=${encodeURIComponent(prod.name)}" class="text-xs font-heading font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors flex items-center gap-1.5">
              Explore →
            </a>
            <span class="text-[11px] font-sans text-stone-400">B2B Sourcing</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 03 — CAPS & CLOSURES (Aluminium Caps & PP Caps)
  // =========================================================================
  const capsGrid = document.getElementById('caps-closures-grid');
  if (capsGrid) {
    capsGrid.innerHTML = INDUSTRIAL_DATA.capsAndClosures.map(cap => `
      <div class="ind-card group p-8 flex flex-col justify-between">
        <div>
          <div class="w-14 h-14 rounded-2xl bg-stone-100 text-navy flex items-center justify-center text-2xl mb-6 group-hover:bg-navy group-hover:text-gold transition-colors">
            <i class="${cap.icon}"></i>
          </div>
          <span class="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-gold block mb-1">
            ${cap.material} SPECIFICATION
          </span>
          <h4 class="font-heading font-extrabold text-2xl text-navy group-hover:text-gold transition-colors">
            ${cap.name}
          </h4>
          <p class="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed mt-3">
            ${cap.description}
          </p>
        </div>
        <div class="pt-6 mt-6 border-t border-stone-150 flex items-center justify-between">
          <a href="enquiry-industrial.html?subject=${encodeURIComponent(cap.name)}" class="text-xs font-heading font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors flex items-center gap-1.5">
            Enquire About Caps <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </a>
          <span class="text-[10px] font-mono text-stone-400 uppercase">${cap.material}</span>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 04 — PACKAGING SOLUTIONS (4 Cards)
  // =========================================================================
  const packagingGrid = document.getElementById('packaging-solutions-grid');
  if (packagingGrid) {
    packagingGrid.innerHTML = INDUSTRIAL_DATA.packagingSolutions.map(sol => `
      <div class="ind-card group p-7 flex flex-col justify-between">
        <div>
          <div class="w-12 h-12 rounded-xl bg-stone-100 text-navy flex items-center justify-center text-xl mb-5 group-hover:bg-navy group-hover:text-gold transition-colors">
            <i class="${sol.icon}"></i>
          </div>
          <span class="text-[10px] font-heading font-bold uppercase tracking-wider text-gold block mb-1">
            B2B CATALOGUE
          </span>
          <h4 class="font-heading font-bold text-xl text-navy group-hover:text-gold transition-colors">
            ${sol.name}
          </h4>
          <p class="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed mt-2.5">
            ${sol.description}
          </p>
        </div>
        <div class="pt-5 mt-6 border-t border-stone-100 flex items-center justify-between">
          <a href="enquiry-industrial.html?subject=${encodeURIComponent(sol.name)}" class="text-xs font-heading font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors flex items-center gap-1.5">
            Explore →
          </a>
          <span class="text-[10px] font-heading font-semibold text-stone-400 uppercase">Enterprise</span>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 08 — INDUSTRIAL DISCOVERY / FILTER
  // =========================================================================
  const discSearch = document.getElementById('ind-search');
  const discCategory = document.getElementById('ind-category-filter');
  const discMaterial = document.getElementById('ind-material-filter');
  const discClearBtn = document.getElementById('ind-clear-btn');
  const discResultsGrid = document.getElementById('ind-discovery-results');
  const discCount = document.getElementById('ind-results-count');

  // Mobile drawer elements
  const mobileFilterBtn = document.getElementById('ind-mobile-filter-btn');
  const mobileDrawer = document.getElementById('ind-filter-drawer');
  const mobileBackdrop = document.getElementById('ind-filter-backdrop');
  const mobileCloseBtn = document.getElementById('ind-filter-close-btn');
  const mobileApplyBtn = document.getElementById('ind-mobile-apply-btn');

  function renderDiscovery() {
    if (!discResultsGrid) return;

    const query = discSearch ? discSearch.value.trim().toLowerCase() : '';
    const category = discCategory ? discCategory.value : 'All';
    const material = discMaterial ? discMaterial.value : 'All';

    const filtered = INDUSTRIAL_DATA.discoveryItems.filter(item => {
      const matchCat = category === 'All' || item.category === category;
      const matchMat = material === 'All' || item.material === material;
      const matchQuery = !query || 
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchCat && matchMat && matchQuery;
    });

    if (discCount) {
      discCount.textContent = `${filtered.length} Supplies Found`;
    }

    if (filtered.length === 0) {
      discResultsGrid.innerHTML = `
        <div class="col-span-full py-12 text-center bg-white rounded-2xl border border-stone-200 p-8">
          <div class="w-14 h-14 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-3 text-lg">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <h4 class="font-heading font-bold text-base text-navy">No Matches Found</h4>
          <p class="font-sans text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or reset the category/material filters.
          </p>
          <button type="button" onclick="resetIndustrialDiscovery()" class="mt-4 btn-premium-gold text-xs px-4 py-2">
            Clear Filters
          </button>
        </div>
      `;
      return;
    }

    discResultsGrid.innerHTML = filtered.map(item => `
      <div class="bg-white rounded-xl p-5 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between text-[10px] font-heading font-bold uppercase tracking-wider mb-2">
            <span class="text-gold bg-gold/10 px-2 py-0.5 rounded">${item.category}</span>
            <span class="text-stone-400">${item.material !== 'Other' ? item.material : 'Supply'}</span>
          </div>
          <h5 class="font-heading font-bold text-base text-navy group-hover:text-gold transition-colors">
            ${item.name}
          </h5>
          <p class="font-sans text-xs text-stone-500 mt-1.5 line-clamp-2">
            ${item.description}
          </p>
        </div>
        <div class="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
          <a href="${item.anchor}" class="text-xs font-heading font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors flex items-center gap-1">
            View Details <i class="fa-solid fa-arrow-right text-[9px] ml-1"></i>
          </a>
          <a href="enquiry-industrial.html?subject=${encodeURIComponent(item.name)}" class="text-[11px] text-stone-400 hover:text-gold transition-colors font-medium">
            Enquire
          </a>
        </div>
      </div>
    `).join('');
  }

  // Filter Event Listeners
  if (discSearch) discSearch.addEventListener('input', renderDiscovery);
  if (discCategory) discCategory.addEventListener('change', renderDiscovery);
  if (discMaterial) discMaterial.addEventListener('change', renderDiscovery);

  window.resetIndustrialDiscovery = function() {
    if (discSearch) discSearch.value = '';
    if (discCategory) discCategory.value = 'All';
    if (discMaterial) discMaterial.value = 'All';
    renderDiscovery();
  };

  if (discClearBtn) {
    discClearBtn.addEventListener('click', resetIndustrialDiscovery);
  }

  // Mobile Drawer Toggle
  function openMobileDrawer() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.add('active');
      mobileBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer && mobileBackdrop) {
      mobileDrawer.classList.remove('active');
      mobileBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileFilterBtn) mobileFilterBtn.addEventListener('click', openMobileDrawer);
  if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeMobileDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileDrawer);
  if (mobileApplyBtn) {
    mobileApplyBtn.addEventListener('click', () => {
      renderDiscovery();
      closeMobileDrawer();
    });
  }

  // Initial Discovery Render
  renderDiscovery();

  // =========================================================================
  // 09 — WHY CHOOSE BORA GROUP (4 Columns)
  // =========================================================================
  const whyGrid = document.getElementById('why-choose-us-grid');
  if (whyGrid) {
    whyGrid.innerHTML = INDUSTRIAL_DATA.whyChooseUs.map(point => `
      <div class="bg-white rounded-2xl p-7 border border-stone-200/80 shadow-sm flex flex-col justify-between group hover:border-gold/50 transition-colors">
        <div>
          <div class="w-12 h-12 rounded-xl bg-stone-100 text-navy group-hover:bg-navy group-hover:text-gold flex items-center justify-center text-xl mb-5 transition-colors">
            <i class="${point.icon}"></i>
          </div>
          <h4 class="font-heading font-bold text-base text-navy uppercase tracking-wider mb-2">
            ${point.title}
          </h4>
          <p class="font-sans text-xs text-stone-500 leading-relaxed">
            ${point.description}
          </p>
        </div>
      </div>
    `).join('');
  }
});
