/**
 * BORA GROUP — Garments & Textile Interactive Engine
 * Handles tabs, filter matrices, discovery search, marquee, and mobile filter drawers.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof GARMENTS_DATA === 'undefined') {
    console.error('GARMENTS_DATA is not defined. Ensure js/garments-data.js is loaded first.');
    return;
  }

  // =========================================================================
  // 1. SHOP BY CATEGORY SECTION (Render & Smooth Jump)
  // =========================================================================
  const categoryGrid = document.getElementById('shop-category-grid');
  if (categoryGrid) {
    categoryGrid.innerHTML = GARMENTS_DATA.shopCategories.map((cat, idx) => `
      <a href="${cat.anchor}" data-category-id="${cat.id}" data-tab="${cat.filterTab || ''}" class="shop-cat-card group relative bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div class="absolute -top-12 -right-12 w-32 h-32 bg-gold/5 rounded-full blur-2xl group-hover:bg-gold/15 transition-all duration-500 pointer-events-none"></div>
        
        <div>
          <div class="flex items-center justify-between mb-5">
            <span class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-stone-100 text-stone-800 group-hover:bg-gold group-hover:text-white transition-all duration-300 shadow-sm">
              <i class="${cat.icon} text-lg"></i>
            </span>
            <span class="text-[10px] font-heading font-bold uppercase tracking-widest text-gold bg-gold/10 px-3 py-1 rounded-full">
              ${cat.tag}
            </span>
          </div>

          <h3 class="font-heading font-bold text-xl sm:text-2xl text-navy group-hover:text-gold transition-colors duration-300">
            ${cat.title}
          </h3>
          <p class="font-sans text-xs sm:text-sm text-stone-500 font-normal leading-relaxed mt-2.5">
            ${cat.description}
          </p>
        </div>

        <div class="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
          <span class="text-xs font-heading font-bold uppercase tracking-widest text-navy group-hover:text-gold transition-colors flex items-center gap-1.5">
            Explore <i class="fa-solid fa-arrow-right text-[10px] transform group-hover:translate-x-1.5 transition-transform duration-300"></i>
          </span>
          <span class="text-[10px] font-mono text-stone-400 font-medium">0${idx + 1}</span>
        </div>
      </a>
    `).join('');

    // Clicking category cards that link to tabs activates the tab
    categoryGrid.querySelectorAll('.shop-cat-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const tab = card.getAttribute('data-tab');
        if (tab) {
          switchReadyMadeTab(tab);
        }
      });
    });
  }

  // =========================================================================
  // 2. READY-MADE COLLECTION (Tabs: MEN | WOMEN | KIDS)
  // =========================================================================
  const readyMadeContainer = document.getElementById('ready-made-container');
  const readyMadeTabs = document.querySelectorAll('.ready-made-tab');

  function renderReadyMade(gender) {
    if (!readyMadeContainer || !GARMENTS_DATA.readyMade[gender]) return;
    const groups = GARMENTS_DATA.readyMade[gender];

    readyMadeContainer.innerHTML = `
      <div class="space-y-12 animate-fade-in">
        ${groups.map(group => `
          <div class="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200/80 shadow-sm">
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 mb-6 border-b border-stone-150">
              <div>
                <span class="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-gold block mb-1">
                  Ready-Made • ${gender.toUpperCase()}
                </span>
                <h4 class="font-heading font-extrabold text-2xl text-navy">
                  ${group.subgroup}
                </h4>
              </div>
              <p class="font-sans text-xs text-stone-500 max-w-md">
                ${group.description}
              </p>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              ${group.items.map(item => `
                <div class="product-tile group cursor-pointer hover:border-gold/60" onclick="triggerDiscoverySearch('${item.name}')">
                  <div class="w-10 h-10 rounded-xl bg-stone-50 text-stone-700 flex items-center justify-center mb-3 group-hover:bg-gold/15 group-hover:text-gold transition-colors">
                    <i class="${item.icon} text-sm"></i>
                  </div>
                  <h5 class="font-heading font-bold text-sm text-stone-800 group-hover:text-gold transition-colors">
                    ${item.name}
                  </h5>
                  <p class="font-sans text-[11px] text-stone-400 mt-1 line-clamp-1">
                    ${item.note}
                  </p>
                  <div class="mt-3 flex items-center gap-1 text-[10px] font-heading font-bold uppercase tracking-wider text-stone-400 group-hover:text-gold transition-colors">
                    Explore <i class="fa-solid fa-arrow-right text-[8px] transform group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function switchReadyMadeTab(gender) {
    readyMadeTabs.forEach(btn => {
      if (btn.getAttribute('data-tab') === gender) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });
    renderReadyMade(gender);
  }

  readyMadeTabs.forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      const gender = tabBtn.getAttribute('data-tab');
      switchReadyMadeTab(gender);
    });
  });

  // Initial render for Ready Made (Men)
  renderReadyMade('men');

  // =========================================================================
  // 3. SHIRTING FABRICS (Interactive Fabric & Design Filter Chips)
  // =========================================================================
  const fabricChipsContainer = document.getElementById('shirting-fabric-chips');
  const designChipsContainer = document.getElementById('shirting-design-chips');
  const shirtingCardsGrid = document.getElementById('shirting-cards-grid');
  const shirtingCounter = document.getElementById('shirting-results-count');

  let activeShirtingFabric = 'All';
  let activeShirtingDesign = 'All';

  function initShirtingFilters() {
    if (!fabricChipsContainer || !designChipsContainer) return;

    // Fabric chips
    const fabricList = ['All', ...GARMENTS_DATA.shirting.fabrics];
    fabricChipsContainer.innerHTML = fabricList.map(fab => `
      <button type="button" class="filter-chip ${fab === 'All' ? 'active' : ''}" data-type="fabric" data-val="${fab}">
        ${fab}
      </button>
    `).join('');

    // Design chips
    const designList = ['All', ...GARMENTS_DATA.shirting.designs];
    designChipsContainer.innerHTML = designList.map(des => `
      <button type="button" class="filter-chip ${des === 'All' ? 'active' : ''}" data-type="design" data-val="${des}">
        ${des}
      </button>
    `).join('');

    // Attach listeners
    fabricChipsContainer.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        fabricChipsContainer.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeShirtingFabric = btn.getAttribute('data-val');
        renderShirtingCards();
      });
    });

    designChipsContainer.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        designChipsContainer.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeShirtingDesign = btn.getAttribute('data-val');
        renderShirtingCards();
      });
    });

    renderShirtingCards();
  }

  function renderShirtingCards() {
    if (!shirtingCardsGrid) return;

    const filtered = GARMENTS_DATA.shirting.catalog.filter(item => {
      const matchFabric = activeShirtingFabric === 'All' || item.fabric === activeShirtingFabric;
      const matchDesign = activeShirtingDesign === 'All' || item.design === activeShirtingDesign;
      return matchFabric && matchDesign;
    });

    if (shirtingCounter) {
      shirtingCounter.textContent = `Showing ${filtered.length} of ${GARMENTS_DATA.shirting.catalog.length} Weaves`;
    }

    if (filtered.length === 0) {
      shirtingCardsGrid.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white rounded-3xl border border-stone-200/80 p-8">
          <div class="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4 text-xl">
            <i class="fa-solid fa-filter-circle-xmark"></i>
          </div>
          <h4 class="font-heading font-bold text-lg text-navy">No Fabric Matching Both Criteria</h4>
          <p class="font-sans text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try resetting either the Fabric type or Design pattern to see our signature shirting rolls.
          </p>
          <button type="button" id="reset-shirting-btn" class="mt-4 btn-premium-gold text-xs px-5 py-2">
            Reset Shirting Filters
          </button>
        </div>
      `;
      const resetBtn = document.getElementById('reset-shirting-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeShirtingFabric = 'All';
          activeShirtingDesign = 'All';
          fabricChipsContainer.querySelectorAll('.filter-chip').forEach(b => b.classList.toggle('active', b.getAttribute('data-val') === 'All'));
          designChipsContainer.querySelectorAll('.filter-chip').forEach(b => b.classList.toggle('active', b.getAttribute('data-val') === 'All'));
          renderShirtingCards();
        });
      }
      return;
    }

    shirtingCardsGrid.innerHTML = filtered.map(item => `
      <div class="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between gap-2 mb-4">
            <span class="text-[10px] font-heading font-bold uppercase tracking-widest text-gold bg-gold/10 px-2.5 py-1 rounded-md">
              ${item.badge}
            </span>
            <span class="text-[10px] font-mono text-stone-400 font-medium">${item.design}</span>
          </div>

          <!-- Subtle weave texture visualizer -->
          <div class="h-28 w-full rounded-xl swatch-pattern-cotton mb-5 border border-stone-200/60 p-4 flex flex-col justify-end group-hover:border-gold/50 transition-colors">
            <span class="text-[9px] font-heading font-semibold uppercase tracking-wider text-stone-500">Fabric Composition</span>
            <span class="text-xs font-heading font-bold text-stone-800">${item.fabric}</span>
          </div>

          <h4 class="font-heading font-bold text-base text-navy group-hover:text-gold transition-colors">
            ${item.name}
          </h4>
          <p class="font-sans text-xs text-stone-500 leading-relaxed mt-2">
            ${item.description}
          </p>

          <div class="mt-4 pt-3 border-t border-stone-100 text-[11px] font-sans text-stone-600 space-y-1">
            <p><span class="font-semibold text-stone-700">Specs:</span> ${item.characteristics}</p>
            <p><span class="font-semibold text-stone-700">Best For:</span> ${item.bestFor}</p>
          </div>
        </div>

        <div class="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
          <button type="button" onclick="triggerDiscoverySearch('${item.fabric}')" class="text-[11px] font-heading font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors flex items-center gap-1">
            Find Garments <i class="fa-solid fa-arrow-right text-[9px] transform group-hover:translate-x-1 transition-transform"></i>
          </button>
          <span class="text-[10px] font-heading text-stone-400 font-bold uppercase">Bora Sourced</span>
        </div>
      </div>
    `).join('');
  }

  initShirtingFilters();

  // =========================================================================
  // 4. SUITING FABRICS (8 Luxury Suiting Cards)
  // =========================================================================
  const suitingGrid = document.getElementById('suiting-fabrics-grid');
  if (suitingGrid) {
    suitingGrid.innerHTML = GARMENTS_DATA.suiting.fabrics.map((item, idx) => `
      <div class="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
        <div>
          <!-- Texture Swatch Banner -->
          <div class="h-20 w-full rounded-xl swatch-pattern-wool mb-5 border border-stone-800 p-4 flex items-center justify-between text-white">
            <div>
              <span class="text-[9px] font-heading font-bold tracking-widest text-gold uppercase block">Fine Weave</span>
              <span class="text-xs font-mono text-stone-300">${item.weight}</span>
            </div>
            <span class="text-xs font-heading font-semibold text-gold/80 px-2 py-1 bg-black/40 rounded border border-gold/20">
              ${item.weave}
            </span>
          </div>

          <span class="text-[10px] font-mono text-stone-400 block mb-1">SUITING BLEND 0${idx + 1}</span>
          <h4 class="font-heading font-bold text-xl text-navy group-hover:text-gold transition-colors">
            ${item.name}
          </h4>

          <div class="inline-block my-2 text-[11px] font-heading font-semibold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full">
            ${item.tagline}
          </div>

          <p class="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed mt-2">
            ${item.description}
          </p>
        </div>

        <div class="pt-5 mt-5 border-t border-stone-150 flex items-center justify-between">
          <button type="button" onclick="triggerDiscoverySearch('${item.name}')" class="text-xs font-heading font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors flex items-center gap-1.5">
            Explore Suiting <i class="fa-solid fa-arrow-right text-[9px] transform group-hover:translate-x-1.5 transition-transform"></i>
          </button>
          <i class="fa-solid fa-scissors text-stone-300 group-hover:text-gold transition-colors"></i>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 5. SHIRTING BRANDS (15 Brands Grid)
  // =========================================================================
  const shirtingBrandsGrid = document.getElementById('shirting-brands-grid');
  if (shirtingBrandsGrid) {
    shirtingBrandsGrid.innerHTML = GARMENTS_DATA.shirtingBrands.map(brand => `
      <div class="brand-tile group" onclick="triggerDiscoverySearch('${brand.name}')" role="button" tabindex="0" aria-label="Brand ${brand.name}">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-[9px] font-heading font-bold uppercase tracking-widest text-gold">${brand.heritage}</span>
            <span class="text-[9px] font-sans text-stone-400 font-medium">${brand.origin}</span>
          </div>
          <h4 class="font-heading font-extrabold text-lg sm:text-xl text-navy group-hover:text-gold transition-colors">
            ${brand.name}
          </h4>
          <p class="font-sans text-[11px] text-stone-500 mt-1.5 line-clamp-2">
            ${brand.specialty}
          </p>
        </div>
        <div class="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-[10px] font-heading font-bold uppercase tracking-wider text-stone-400 group-hover:text-gold transition-colors">
          <span>Official Mill Partner</span>
          <i class="fa-solid fa-arrow-right text-[8px] transform group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 6. SAREE BRANDS (7 Brands Grid)
  // =========================================================================
  const sareeBrandsGrid = document.getElementById('saree-brands-grid');
  if (sareeBrandsGrid) {
    sareeBrandsGrid.innerHTML = GARMENTS_DATA.sareeBrands.map(brand => `
      <div class="brand-tile group" onclick="triggerDiscoverySearch('${brand.name}')" role="button" tabindex="0" aria-label="Brand ${brand.name}">
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-[9px] font-heading font-bold uppercase tracking-widest text-gold">${brand.heritage}</span>
            <span class="text-[9px] font-sans text-stone-400 font-medium">${brand.origin}</span>
          </div>
          <h4 class="font-heading font-extrabold text-lg sm:text-xl text-navy group-hover:text-gold transition-colors">
            ${brand.name}
          </h4>
          <p class="font-sans text-[11px] text-stone-500 mt-1.5 line-clamp-2">
            ${brand.specialty}
          </p>
        </div>
        <div class="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between text-[10px] font-heading font-bold uppercase tracking-wider text-stone-400 group-hover:text-gold transition-colors">
          <span>Exclusive Collection</span>
          <i class="fa-solid fa-arrow-right text-[8px] transform group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 7. SAREE COLLECTION (7 Traditional Categories)
  // =========================================================================
  const sareeCollectionGrid = document.getElementById('saree-collection-grid');
  if (sareeCollectionGrid) {
    sareeCollectionGrid.innerHTML = GARMENTS_DATA.sareeCollection.map(saree => `
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
        <div>
          <!-- Silk Swatch Aesthetic Header -->
          <div class="h-24 w-full rounded-2xl swatch-pattern-silk p-4 flex flex-col justify-between border border-amber-200/60 mb-5 relative">
            <div class="flex items-center justify-between">
              <span class="text-[9px] font-heading font-bold uppercase tracking-[0.2em] text-amber-900 bg-white/70 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                ${saree.tag}
              </span>
              <i class="fa-solid fa-gem text-amber-700 text-xs"></i>
            </div>
            <span class="text-[11px] font-heading font-bold text-stone-800">${saree.origin}</span>
          </div>

          <h4 class="font-heading font-bold text-2xl text-navy group-hover:text-gold transition-colors">
            ${saree.name}
          </h4>
          <p class="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed mt-2.5">
            ${saree.description}
          </p>

          <div class="mt-4 py-2.5 px-3.5 rounded-xl bg-amber-50/60 border border-amber-100 text-[11px] font-heading font-medium text-amber-900">
            <i class="fa-solid fa-sparkles text-gold mr-1"></i> ${saree.details}
          </div>
        </div>

        <div class="pt-5 mt-6 border-t border-stone-150 flex items-center justify-between">
          <button type="button" onclick="triggerDiscoverySearch('${saree.name}')" class="text-xs font-heading font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors flex items-center gap-1.5">
            View Saree Styles <i class="fa-solid fa-arrow-right text-[9px] transform group-hover:translate-x-1.5 transition-transform"></i>
          </button>
          <span class="text-[10px] font-heading font-semibold text-stone-400 uppercase">Handloom Heritage</span>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 8. UNIFORMS SECTION (3 Cards: School, Corporate, Institutional)
  // =========================================================================
  const uniformsGrid = document.getElementById('uniforms-grid');
  if (uniformsGrid) {
    uniformsGrid.innerHTML = GARMENTS_DATA.uniforms.map(uni => `
      <div class="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
        <div>
          <div class="w-14 h-14 rounded-2xl bg-stone-100 text-navy group-hover:bg-navy group-hover:text-gold flex items-center justify-center text-xl transition-all duration-300 shadow-sm mb-6">
            <i class="${uni.icon}"></i>
          </div>

          <span class="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-gold block mb-1">
            ${uni.category}
          </span>
          <h4 class="font-heading font-extrabold text-2xl text-navy">
            ${uni.title}
          </h4>

          <p class="font-sans text-xs sm:text-sm text-stone-500 leading-relaxed mt-3">
            ${uni.description}
          </p>

          <ul class="mt-6 space-y-2.5 pt-4 border-t border-stone-100">
            ${uni.features.map(feat => `
              <li class="flex items-center text-xs font-sans text-stone-600">
                <i class="fa-solid fa-check text-gold text-[10px] mr-2.5"></i>
                <span>${feat}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div class="pt-6 mt-8 border-t border-stone-150">
          <a href="enquiry-garments.html?subject=${encodeURIComponent(uni.title)}" class="btn-premium-gold w-full text-center text-xs py-3 block shadow-sm">
            Enquire Now <i class="fa-solid fa-arrow-right text-[9px] ml-1.5"></i>
          </a>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 9. ACCESSORIES SECTION (Minimal Category Card)
  // =========================================================================
  const accessoriesItems = document.getElementById('accessories-items-grid');
  if (accessoriesItems) {
    accessoriesItems.innerHTML = GARMENTS_DATA.accessories.items.map(acc => `
      <div class="p-4 rounded-xl bg-stone-50 border border-stone-150 hover:border-gold/50 transition-colors">
        <h5 class="font-heading font-bold text-xs uppercase tracking-wider text-navy">${acc.name}</h5>
        <p class="text-[11px] font-sans text-stone-500 mt-1">${acc.note}</p>
      </div>
    `).join('');
  }

  // =========================================================================
  // 10. SMART FILTER / DISCOVERY BAR & MODAL
  // =========================================================================
  const filterCategory = document.getElementById('filter-category');
  const filterType = document.getElementById('filter-type');
  const filterFabric = document.getElementById('filter-fabric');
  const filterDesign = document.getElementById('filter-design');
  const filterBrand = document.getElementById('filter-brand');
  const filterSearch = document.getElementById('filter-search');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');
  const discoveryResultsGrid = document.getElementById('discovery-results-grid');
  const discoveryCount = document.getElementById('discovery-count');

  // Mobile Filter Drawer Elements
  const mobileFilterOpenBtn = document.getElementById('mobile-filter-open-btn');
  const mobileFilterCloseBtn = document.getElementById('mobile-filter-close-btn');
  const filterDrawer = document.getElementById('filter-drawer');
  const filterBackdrop = document.getElementById('filter-drawer-backdrop');
  const mobileApplyBtn = document.getElementById('mobile-apply-filters-btn');

  // Populate filter dropdowns dynamically
  function populateDiscoveryDropdowns() {
    if (!filterBrand) return;

    // Brands (All 22 brands)
    const brandOptions = GARMENTS_DATA.marqueeBrands.map(b => `<option value="${b}">${b}</option>`).join('');
    filterBrand.innerHTML = `<option value="All">All Brands</option>${brandOptions}`;

    // Shirting + Suiting fabrics
    const allFabrics = Array.from(new Set([
      ...GARMENTS_DATA.shirting.fabrics,
      ...GARMENTS_DATA.suiting.fabrics.map(s => s.name)
    ]));
    if (filterFabric) {
      filterFabric.innerHTML = `<option value="All">All Fabrics</option>` + allFabrics.map(f => `<option value="${f}">${f}</option>`).join('');
    }

    // Designs
    if (filterDesign) {
      filterDesign.innerHTML = `<option value="All">All Designs</option>` + GARMENTS_DATA.shirting.designs.map(d => `<option value="${d}">${d}</option>`).join('');
    }
  }

  populateDiscoveryDropdowns();

  function applyDiscoveryFilters() {
    if (!discoveryResultsGrid) return;

    const catVal = filterCategory ? filterCategory.value : 'All';
    const typeVal = filterType ? filterType.value : 'All';
    const fabVal = filterFabric ? filterFabric.value : 'All';
    const desVal = filterDesign ? filterDesign.value : 'All';
    const brandVal = filterBrand ? filterBrand.value : 'All';
    const searchVal = filterSearch ? filterSearch.value.trim().toLowerCase() : '';

    const results = GARMENTS_DATA.discoveryCatalog.filter(item => {
      const matchCat = catVal === 'All' || item.category.toLowerCase() === catVal.toLowerCase();
      const matchType = typeVal === 'All' || item.type.toLowerCase() === typeVal.toLowerCase();
      const matchFab = fabVal === 'All' || item.fabric.toLowerCase() === fabVal.toLowerCase();
      const matchDes = desVal === 'All' || item.design.toLowerCase() === desVal.toLowerCase();
      const matchBrand = brandVal === 'All' || item.brand.toLowerCase() === brandVal.toLowerCase();
      
      const matchSearch = !searchVal || 
        item.title.toLowerCase().includes(searchVal) ||
        item.category.toLowerCase().includes(searchVal) ||
        item.fabric.toLowerCase().includes(searchVal) ||
        item.design.toLowerCase().includes(searchVal) ||
        item.brand.toLowerCase().includes(searchVal) ||
        item.note.toLowerCase().includes(searchVal);

      return matchCat && matchType && matchFab && matchDes && matchBrand && matchSearch;
    });

    if (discoveryCount) {
      discoveryCount.textContent = `${results.length} Products & Fabrics Found`;
    }

    if (results.length === 0) {
      discoveryResultsGrid.innerHTML = `
        <div class="col-span-full py-16 text-center bg-white rounded-3xl border border-stone-200/80 p-8">
          <div class="w-16 h-16 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-4 text-xl">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <h4 class="font-heading font-bold text-lg text-navy">No Matches Found</h4>
          <p class="font-sans text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            We couldn't find items matching your current criteria. Try adjusting your filters or resetting the search.
          </p>
          <button type="button" onclick="resetDiscoveryFilters()" class="mt-4 btn-premium-gold text-xs px-5 py-2">
            Clear All Filters
          </button>
        </div>
      `;
      return;
    }

    discoveryResultsGrid.innerHTML = results.map(item => `
      <div class="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between text-[10px] font-heading font-bold uppercase tracking-wider mb-3">
            <span class="text-gold bg-gold/10 px-2.5 py-0.5 rounded-full">${item.type}</span>
            <span class="text-stone-400">${item.category}</span>
          </div>

          <h5 class="font-heading font-bold text-base text-navy group-hover:text-gold transition-colors">
            ${item.title}
          </h5>
          <p class="font-sans text-xs text-stone-500 mt-1">
            ${item.note}
          </p>

          <div class="mt-4 pt-3 border-t border-stone-100 flex flex-wrap gap-1.5 text-[10px] font-heading font-semibold">
            <span class="px-2 py-0.5 rounded bg-stone-100 text-stone-700">Fabric: ${item.fabric}</span>
            <span class="px-2 py-0.5 rounded bg-stone-100 text-stone-700">Design: ${item.design}</span>
            <span class="px-2 py-0.5 rounded bg-stone-100 text-stone-700">Brand: ${item.brand}</span>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <a href="enquiry-garments.html?subject=${encodeURIComponent(item.title + ' - ' + item.brand)}" class="text-[11px] font-heading font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors flex items-center gap-1">
            Inquire Fabric <i class="fa-solid fa-arrow-right text-[8px] ml-1"></i>
          </a>
          <span class="text-[10px] font-mono text-stone-400">#${item.id}</span>
        </div>
      </div>
    `).join('');
  }

  // Filter Event Listeners
  [filterCategory, filterType, filterFabric, filterDesign, filterBrand].forEach(el => {
    if (el) el.addEventListener('change', applyDiscoveryFilters);
  });

  if (filterSearch) {
    filterSearch.addEventListener('input', () => {
      applyDiscoveryFilters();
    });
  }

  window.resetDiscoveryFilters = function() {
    if (filterCategory) filterCategory.value = 'All';
    if (filterType) filterType.value = 'All';
    if (filterFabric) filterFabric.value = 'All';
    if (filterDesign) filterDesign.value = 'All';
    if (filterBrand) filterBrand.value = 'All';
    if (filterSearch) filterSearch.value = '';
    applyDiscoveryFilters();
  };

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', resetDiscoveryFilters);
  }

  // Global trigger function to jump into discovery from any card
  window.triggerDiscoverySearch = function(query) {
    const discoverySec = document.getElementById('discovery-section');
    if (discoverySec) {
      discoverySec.scrollIntoView({ behavior: 'smooth' });
    }
    if (filterSearch) {
      filterSearch.value = query;
      applyDiscoveryFilters();
    }
  };

  // Mobile Filter Drawer Toggle
  function openMobileDrawer() {
    if (filterDrawer && filterBackdrop) {
      filterDrawer.classList.add('active');
      filterBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (filterDrawer && filterBackdrop) {
      filterDrawer.classList.remove('active');
      filterBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileFilterOpenBtn) mobileFilterOpenBtn.addEventListener('click', openMobileDrawer);
  if (mobileFilterCloseBtn) mobileFilterCloseBtn.addEventListener('click', closeMobileDrawer);
  if (filterBackdrop) filterBackdrop.addEventListener('click', closeMobileDrawer);
  if (mobileApplyBtn) {
    mobileApplyBtn.addEventListener('click', () => {
      applyDiscoveryFilters();
      closeMobileDrawer();
    });
  }

  // Initial render of discovery catalog
  applyDiscoveryFilters();

  // =========================================================================
  // 11. HORIZONTALLY SCROLLING BRAND MARQUEE (All 22 Brands)
  // =========================================================================
  const marqueeTrack = document.getElementById('marquee-track');
  if (marqueeTrack) {
    // Generate two sets for infinite seamless loop
    const brandsDoubled = [...GARMENTS_DATA.marqueeBrands, ...GARMENTS_DATA.marqueeBrands];
    marqueeTrack.innerHTML = brandsDoubled.map(b => `
      <div class="marquee-item" onclick="triggerDiscoverySearch('${b}')" role="button" tabindex="0">
        <span class="w-1.5 h-1.5 rounded-full bg-gold"></span>
        <span>${b}</span>
      </div>
    `).join('');
  }
});
