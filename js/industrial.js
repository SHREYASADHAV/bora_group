/**
 * BORA GROUP — Industrial Supply Interactive Controller
 * Clean, architectural layouts with sharp edges (no rounded corners) and realistic photography.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof INDUSTRIAL_DATA === 'undefined') {
    console.error('INDUSTRIAL_DATA not loaded. Ensure js/industrial-data.js is included.');
    return;
  }

  // =========================================================================
  // 01 — SHOP BY CATEGORY (Clean Sharp Cards with Photography)
  // =========================================================================
  const categoryGrid = document.getElementById('industrial-category-grid');
  if (categoryGrid) {
    categoryGrid.innerHTML = INDUSTRIAL_DATA.categories.map((cat, idx) => `
      <a href="${cat.anchor}" class="ind-card group ind-sharp" aria-label="${cat.name}">
        <!-- Realistic Product Image Frame -->
        <div class="ind-img-frame h-52 sm:h-56">
          <img src="${cat.image}" alt="${cat.name}" loading="lazy" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
          <span class="absolute top-4 left-4 text-[9px] font-heading font-bold uppercase tracking-[0.2em] text-white bg-black/75 px-2.5 py-1 ind-sharp border-l-2 border-gold">
            ${cat.tag}
          </span>
        </div>

        <div class="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-white">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-[10px] font-mono text-stone-400 font-medium">SECTOR 0${idx + 1}</span>
              <span class="text-[10px] font-heading font-semibold uppercase tracking-wider text-gold">${cat.material}</span>
            </div>

            <h3 class="font-heading font-bold text-xl text-navy group-hover:text-gold transition-colors duration-200">
              ${cat.name}
            </h3>
            <p class="font-sans text-xs sm:text-sm text-stone-600 font-normal leading-relaxed mt-2.5">
              ${cat.description}
            </p>
          </div>

          <div class="pt-5 mt-6 border-t border-stone-100 flex items-center justify-between">
            <span class="ind-action-link">
              Explore <i class="fa-solid fa-arrow-right text-[10px] transform group-hover:translate-x-1.5 transition-transform duration-200"></i>
            </span>
          </div>
        </div>
      </a>
    `).join('');
  }

  // =========================================================================
  // 02 — PET PRODUCTS (Large Creative Split Layout with Photography)
  // =========================================================================
  const petGrid = document.getElementById('pet-products-grid');
  if (petGrid) {
    petGrid.innerHTML = INDUSTRIAL_DATA.petProducts.map(prod => `
      <div class="ind-card group ind-sharp flex flex-col md:flex-row overflow-hidden border border-stone-200">
        <div class="w-full md:w-1/2 ind-img-frame h-64 md:h-auto min-h-[260px]">
          <img src="${prod.image}" alt="${prod.name}" loading="lazy" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
        </div>
        <div class="w-full md:w-1/2 p-8 lg:p-10 flex flex-col justify-between bg-white">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-[9px] font-heading font-bold uppercase tracking-[0.2em] text-gold block">
                POLYETHYLENE TEREPHTHALATE
              </span>
              <span class="text-[10px] font-mono text-stone-400">100% RECYCLABLE</span>
            </div>
            <h4 class="font-heading font-extrabold text-2xl lg:text-3xl text-navy group-hover:text-gold transition-colors duration-200">
              ${prod.name}
            </h4>
            <p class="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed mt-3.5">
              ${prod.description}
            </p>
          </div>
          <div class="pt-6 mt-8 border-t border-stone-150 flex items-center justify-between">
            <a href="enquiry-industrial.html?subject=${encodeURIComponent(prod.name)}" class="ind-action-link">
              Explore <i class="fa-solid fa-arrow-right text-[10px] transform group-hover:translate-x-1 transition-transform"></i>
            </a>
            <span class="text-[10px] font-heading font-bold uppercase tracking-wider text-stone-400">B2B Standard</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 03 — CAPS & CLOSURES (Premium Photo Cards)
  // =========================================================================
  const capsGrid = document.getElementById('caps-closures-grid');
  if (capsGrid) {
    capsGrid.innerHTML = INDUSTRIAL_DATA.capsAndClosures.map(cap => `
      <div class="ind-card group ind-sharp border border-stone-200">
        <div class="ind-img-frame h-64 sm:h-72">
          <img src="${cap.image}" alt="${cap.name}" loading="lazy" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <span class="absolute bottom-4 left-4 text-[9px] font-heading font-bold uppercase tracking-[0.2em] text-white bg-black/80 px-3 py-1 border-l-2 border-gold">
            ${cap.material} Closure
          </span>
        </div>
        <div class="p-8 flex flex-col justify-between flex-1 bg-white">
          <div>
            <h4 class="font-heading font-extrabold text-2xl text-navy group-hover:text-gold transition-colors duration-200">
              ${cap.name}
            </h4>
            <p class="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed mt-3">
              ${cap.description}
            </p>
          </div>
          <div class="pt-6 mt-6 border-t border-stone-150 flex items-center justify-between">
            <a href="enquiry-industrial.html?subject=${encodeURIComponent(cap.name)}" class="ind-action-link">
              Enquire About Caps <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </a>
            <span class="text-[10px] font-mono text-stone-400 uppercase">Sealing Solution</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 04 — PACKAGING SOLUTIONS (4 Clean Sharp Cards with Photography)
  // =========================================================================
  const packagingGrid = document.getElementById('packaging-solutions-grid');
  if (packagingGrid) {
    packagingGrid.innerHTML = INDUSTRIAL_DATA.packagingSolutions.map(sol => `
      <div class="ind-card group ind-sharp border border-stone-200 flex flex-col justify-between">
        <div>
          <div class="ind-img-frame h-48">
            <img src="${sol.image}" alt="${sol.name}" loading="lazy" class="w-full h-full object-cover">
            <span class="absolute top-3 left-3 text-[9px] font-heading font-bold uppercase tracking-wider text-white bg-black/70 px-2 py-0.5">
              ${sol.category}
            </span>
          </div>

          <div class="p-6">
            <h4 class="font-heading font-bold text-lg text-navy group-hover:text-gold transition-colors duration-200">
              ${sol.name}
            </h4>
            <p class="font-sans text-xs text-stone-600 leading-relaxed mt-2">
              ${sol.description}
            </p>
          </div>
        </div>

        <div class="px-6 pb-6 pt-2 border-t border-stone-100 flex items-center justify-between">
          <a href="enquiry-industrial.html?subject=${encodeURIComponent(sol.name)}" class="ind-action-link">
            Explore <i class="fa-solid fa-arrow-right text-[9px] transform group-hover:translate-x-1 transition-transform"></i>
          </a>
          <span class="text-[9px] font-mono text-stone-400 uppercase">Catalogue</span>
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
        <div class="col-span-full py-16 text-center bg-stone-900 border border-stone-800 p-8 ind-sharp">
          <h4 class="font-heading font-bold text-lg text-white">No Matches Found</h4>
          <p class="font-sans text-xs text-stone-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or clear filters to view the full product index.
          </p>
          <button type="button" onclick="resetIndustrialDiscovery()" class="mt-5 btn-premium-gold text-xs px-5 py-2.5 ind-sharp">
            Clear Filters
          </button>
        </div>
      `;
      return;
    }

    discResultsGrid.innerHTML = filtered.map(item => `
      <div class="bg-stone-900 border border-stone-800 hover:border-gold/50 transition-all flex flex-col justify-between ind-sharp group">
        <div class="ind-img-frame h-36">
          <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover">
          <span class="absolute top-2 left-2 text-[9px] font-heading font-bold uppercase tracking-wider text-white bg-black/80 px-2 py-0.5">
            ${item.category}
          </span>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <span class="text-[9px] font-mono text-gold block mb-1 uppercase tracking-wider">${item.material !== 'Other' ? item.material : 'Supply'}</span>
            <h5 class="font-heading font-bold text-sm text-white group-hover:text-gold transition-colors">
              ${item.name}
            </h5>
            <p class="font-sans text-xs text-stone-400 mt-1.5 line-clamp-2">
              ${item.description}
            </p>
          </div>

          <div class="pt-4 mt-4 border-t border-stone-800 flex items-center justify-between">
            <a href="${item.anchor}" class="text-[11px] font-heading font-bold uppercase tracking-wider text-gold hover:text-white transition-colors flex items-center gap-1">
              View Section <i class="fa-solid fa-arrow-right text-[8px] ml-1"></i>
            </a>
            <a href="enquiry-industrial.html?subject=${encodeURIComponent(item.name)}" class="text-[11px] text-stone-500 hover:text-white transition-colors font-medium">
              Enquire
            </a>
          </div>
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
  // 09 — WHY CHOOSE BORA GROUP (Clean Sharp Minimalist Layout)
  // =========================================================================
  const whyGrid = document.getElementById('why-choose-us-grid');
  if (whyGrid) {
    whyGrid.innerHTML = INDUSTRIAL_DATA.whyChooseUs.map(point => `
      <div class="bg-white p-8 border border-stone-200 ind-sharp flex flex-col justify-between group hover:border-gold transition-colors duration-200">
        <div>
          <span class="font-mono text-2xl font-bold text-stone-300 group-hover:text-gold transition-colors block mb-4">
            ${point.stat}
          </span>
          <h4 class="font-heading font-bold text-base text-navy uppercase tracking-wider mb-2.5">
            ${point.title}
          </h4>
          <p class="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
            ${point.description}
          </p>
        </div>
        <div class="pt-6 mt-6 border-t border-stone-100">
          <span class="text-[9px] font-heading font-bold uppercase tracking-widest text-stone-400">Bora Standard</span>
        </div>
      </div>
    `).join('');
  }
});
