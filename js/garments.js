/**
 * BORA GROUP — Garments & Textile Interactive Engine
 * Architectural Layout, Crisp Real Photography, Authentic Brand Logos, Zero Rounded Corners.
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
      <a href="${cat.anchor}" data-category-id="${cat.id}" data-tab="${cat.filterTab || ''}" class="shop-cat-card garment-sharp group bg-white border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
        <div>
          <!-- Crisp Photographic Header Frame -->
          <div class="garment-img-frame h-48 sm:h-52 w-full border-b border-stone-200 relative">
            <img src="${cat.image}" alt="${cat.title}" loading="lazy" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <span class="absolute top-3 right-3 text-[10px] font-heading font-bold uppercase tracking-widest text-white bg-black/60 backdrop-blur-sm px-3 py-1 border border-white/20">
              ${cat.tag}
            </span>
            <span class="absolute bottom-3 left-4 text-[10px] font-mono text-white/80 font-medium">0${idx + 1}</span>
          </div>

          <div class="p-6">
            <h3 class="font-heading font-bold text-xl sm:text-2xl text-navy group-hover:text-gold transition-colors duration-300">
              ${cat.title}
            </h3>
            <p class="font-sans text-xs sm:text-sm text-stone-500 font-normal leading-relaxed mt-2.5">
              ${cat.description}
            </p>
          </div>
        </div>

        <div class="p-6 pt-0 mt-auto">
          <div class="pt-4 border-t border-stone-150 flex items-center justify-between">
            <span class="text-xs font-heading font-bold uppercase tracking-widest text-navy group-hover:text-gold transition-colors flex items-center gap-1.5">
              Explore Collection <i class="fa-solid fa-arrow-right text-[10px] transform group-hover:translate-x-1.5 transition-transform duration-300"></i>
            </span>
          </div>
        </div>
      </a>
    `).join('');

    // Clicking category cards that link to tabs activates the tab
    categoryGrid.querySelectorAll('.shop-cat-card').forEach(card => {
      card.addEventListener('click', () => {
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
          <div class="bg-white border border-stone-200 p-6 sm:p-8 lg:p-10 shadow-sm garment-sharp">
            <!-- Group Header with Real Photography & Info -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6 mb-8 border-b border-stone-200">
              <div class="lg:col-span-8 flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="w-2 h-2 bg-gold inline-block"></span>
                    <span class="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-gold">
                      Ready-Made • ${gender.toUpperCase()}
                    </span>
                  </div>
                  <h4 class="font-heading font-extrabold text-2xl sm:text-3xl text-navy">
                    ${group.subgroup}
                  </h4>
                  <p class="font-sans text-xs sm:text-sm text-stone-600 max-w-xl leading-relaxed mt-2.5">
                    ${group.description}
                  </p>
                </div>
                <div class="mt-4 pt-4 border-t border-stone-100 flex items-center gap-4 text-xs font-heading font-bold text-stone-500 uppercase tracking-wider">
                  <span>${group.items.length} Curated Styles</span>
                  <span class="text-stone-300">•</span>
                  <span>Premium Grade Textiles</span>
                </div>
              </div>

              <!-- Photographic Frame for Subgroup -->
              <div class="lg:col-span-4">
                <div class="garment-img-frame h-44 sm:h-52 w-full border border-stone-200 relative">
                  <img src="${group.image}" alt="${group.subgroup}" loading="lazy" class="w-full h-full object-cover">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <span class="absolute bottom-2.5 left-3 text-[10px] font-heading font-bold uppercase tracking-wider text-white bg-black/60 px-2 py-0.5 backdrop-blur-sm">
                    ${group.subgroup} Showcase
                  </span>
                </div>
              </div>
            </div>

            <!-- Clean Architectural Product Tiles -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              ${group.items.map(item => `
                <div class="product-tile garment-sharp group cursor-pointer hover:border-gold/80" onclick="triggerDiscoverySearch('${item.name}')">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-[9px] font-mono text-stone-400 uppercase tracking-wider">BORA READY-WEAR</span>
                    <span class="w-1.5 h-1.5 bg-gold/50 group-hover:bg-gold transition-colors"></span>
                  </div>
                  <h5 class="font-heading font-bold text-sm sm:text-base text-stone-900 group-hover:text-gold transition-colors">
                    ${item.name}
                  </h5>
                  <p class="font-sans text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    ${item.note}
                  </p>
                  <div class="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[10px] font-heading font-bold uppercase tracking-wider text-stone-400 group-hover:text-gold transition-colors">
                    <span>Explore Fabric</span>
                    <i class="fa-solid fa-arrow-right text-[8px] transform group-hover:translate-x-1 transition-transform"></i>
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
      <button type="button" class="filter-chip garment-sharp ${fab === 'All' ? 'active' : ''}" data-type="fabric" data-val="${fab}">
        ${fab}
      </button>
    `).join('');

    // Design chips
    const designList = ['All', ...GARMENTS_DATA.shirting.designs];
    designChipsContainer.innerHTML = designList.map(des => `
      <button type="button" class="filter-chip garment-sharp ${des === 'All' ? 'active' : ''}" data-type="design" data-val="${des}">
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
        <div class="col-span-full py-16 text-center bg-white border border-stone-200 p-8 garment-sharp">
          <div class="w-12 h-12 bg-stone-100 text-stone-600 flex items-center justify-center mx-auto mb-4 text-xl border border-stone-300">
            <i class="fa-solid fa-filter"></i>
          </div>
          <h4 class="font-heading font-bold text-lg text-navy">No Fabric Matching Both Criteria</h4>
          <p class="font-sans text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try resetting either the Fabric type or Design pattern to view our signature shirting rolls.
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
      <div class="garment-card garment-sharp bg-white border border-stone-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
        <div>
          <!-- Real Photographic Fabric Weave Frame -->
          <div class="garment-img-frame h-36 w-full mb-5 border border-stone-200 relative">
            <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <span class="absolute top-2.5 right-2.5 text-[9px] font-heading font-bold uppercase tracking-widest text-gold bg-black/80 px-2 py-0.5 border border-gold/30">
              ${item.badge}
            </span>
            <div class="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
              <span class="text-xs font-heading font-bold">${item.fabric}</span>
              <span class="text-[10px] font-mono text-stone-300">${item.design}</span>
            </div>
          </div>

          <h4 class="font-heading font-bold text-base text-navy group-hover:text-gold transition-colors">
            ${item.name}
          </h4>
          <p class="font-sans text-xs text-stone-500 leading-relaxed mt-2">
            ${item.description}
          </p>

          <div class="mt-4 pt-3 border-t border-stone-150 text-[11px] font-sans text-stone-600 space-y-1">
            <p><span class="font-semibold text-stone-800">Specs:</span> ${item.characteristics}</p>
            <p><span class="font-semibold text-stone-800">Best For:</span> ${item.bestFor}</p>
          </div>
        </div>

        <div class="mt-5 pt-4 border-t border-stone-150 flex items-center justify-between">
          <button type="button" onclick="triggerDiscoverySearch('${item.fabric}')" class="text-[11px] font-heading font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors flex items-center gap-1">
            Find Garments <i class="fa-solid fa-arrow-right text-[9px] transform group-hover:translate-x-1 transition-transform"></i>
          </button>
          <span class="text-[10px] font-heading text-stone-400 font-bold uppercase">Bora Mill Sourced</span>
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
      <div class="garment-card garment-sharp bg-white border border-stone-200 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
        <div>
          <!-- Real Photographic Suiting Roll Frame -->
          <div class="garment-img-frame h-36 w-full mb-5 border border-stone-200 relative">
            <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
            <div class="absolute top-2.5 left-2.5">
              <span class="text-[9px] font-mono uppercase tracking-widest text-gold bg-black/80 px-2 py-0.5 border border-gold/30">
                SUITING 0${idx + 1}
              </span>
            </div>
            <div class="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white">
              <span class="text-xs font-mono text-stone-200">${item.weight}</span>
              <span class="text-[10px] font-heading font-semibold text-gold bg-black/60 px-2 py-0.5 border border-gold/30">
                ${item.weave}
              </span>
            </div>
          </div>

          <h4 class="font-heading font-bold text-xl text-navy group-hover:text-gold transition-colors">
            ${item.name}
          </h4>

          <div class="inline-block my-2 text-[10px] font-heading font-bold uppercase tracking-wider text-gold bg-gold/10 px-2.5 py-1 border border-gold/20">
            ${item.tagline}
          </div>

          <p class="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
            ${item.description}
          </p>
        </div>

        <div class="pt-5 mt-5 border-t border-stone-150 flex items-center justify-between">
          <button type="button" onclick="triggerDiscoverySearch('${item.name}')" class="text-xs font-heading font-bold uppercase tracking-wider text-navy group-hover:text-gold transition-colors flex items-center gap-1.5">
            Explore Suiting <i class="fa-solid fa-arrow-right text-[9px] transform group-hover:translate-x-1.5 transition-transform"></i>
          </button>
          <span class="text-[10px] font-mono text-stone-400">#SUIT-0${idx + 1}</span>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 5. SHIRTING BRANDS (15 Brands Grid with Authentic Logos)
  // =========================================================================
  const shirtingBrandsGrid = document.getElementById('shirting-brands-grid');
  if (shirtingBrandsGrid) {
    shirtingBrandsGrid.innerHTML = GARMENTS_DATA.shirtingBrands.map(brand => `
      <div class="brand-tile garment-sharp group cursor-pointer" onclick="triggerDiscoverySearch('${brand.name}')" role="button" tabindex="0" aria-label="Brand ${brand.name}">
        <div>
          <!-- Authentic Brand Logo Frame -->
          <div class="brand-logo-frame border-b border-stone-100 pb-3 mb-3">
            <img src="${brand.logo}" alt="${brand.name} logo" loading="lazy">
          </div>

          <div class="flex items-center justify-between mb-1.5 text-[9px] font-heading font-bold uppercase tracking-wider">
            <span class="text-gold">${brand.heritage}</span>
            <span class="text-stone-400 font-sans">${brand.origin}</span>
          </div>

          <p class="font-sans text-[11px] text-stone-500 line-clamp-2 leading-relaxed mt-1">
            ${brand.specialty}
          </p>
        </div>

        <div class="pt-3 mt-3 border-t border-stone-150 flex items-center justify-between text-[10px] font-heading font-bold uppercase tracking-wider text-stone-400 group-hover:text-gold transition-colors">
          <span>Official Mill Partner</span>
          <i class="fa-solid fa-arrow-right text-[8px] transform group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 6. SAREE BRANDS (7 Brands Grid with Authentic Logos)
  // =========================================================================
  const sareeBrandsGrid = document.getElementById('saree-brands-grid');
  if (sareeBrandsGrid) {
    sareeBrandsGrid.innerHTML = GARMENTS_DATA.sareeBrands.map(brand => `
      <div class="brand-tile garment-sharp group cursor-pointer" onclick="triggerDiscoverySearch('${brand.name}')" role="button" tabindex="0" aria-label="Brand ${brand.name}">
        <div>
          <!-- Authentic Brand Logo Frame -->
          <div class="brand-logo-frame border-b border-stone-100 pb-3 mb-3">
            <img src="${brand.logo}" alt="${brand.name} logo" loading="lazy">
          </div>

          <div class="flex items-center justify-between mb-1.5 text-[9px] font-heading font-bold uppercase tracking-wider">
            <span class="text-gold">${brand.heritage}</span>
            <span class="text-stone-400 font-sans">${brand.origin}</span>
          </div>

          <p class="font-sans text-[11px] text-stone-500 line-clamp-2 leading-relaxed mt-1">
            ${brand.specialty}
          </p>
        </div>

        <div class="pt-3 mt-3 border-t border-stone-150 flex items-center justify-between text-[10px] font-heading font-bold uppercase tracking-wider text-stone-400 group-hover:text-gold transition-colors">
          <span>Exclusive Collection</span>
          <i class="fa-solid fa-arrow-right text-[8px] transform group-hover:translate-x-1 transition-transform"></i>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 7. SAREE COLLECTION (7 Traditional Categories with Real Photos)
  // =========================================================================
  const sareeCollectionGrid = document.getElementById('saree-collection-grid');
  if (sareeCollectionGrid) {
    sareeCollectionGrid.innerHTML = GARMENTS_DATA.sareeCollection.map(saree => `
      <div class="garment-card garment-sharp bg-white border border-stone-200 p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
        <div>
          <!-- Crisp Real Photography Frame for Saree -->
          <div class="garment-img-frame h-52 sm:h-60 w-full mb-5 border border-stone-200 relative">
            <img src="${saree.image}" alt="${saree.name}" loading="lazy" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
            <span class="absolute top-3 left-3 text-[9px] font-heading font-bold uppercase tracking-[0.2em] text-white bg-black/70 px-2.5 py-1 border border-white/20 backdrop-blur-sm">
              ${saree.tag}
            </span>
            <span class="absolute bottom-3 left-3 text-xs font-heading font-bold text-white drop-shadow-sm">
              ${saree.origin}
            </span>
          </div>

          <h4 class="font-heading font-bold text-2xl text-navy group-hover:text-gold transition-colors">
            ${saree.name}
          </h4>
          <p class="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed mt-2.5">
            ${saree.description}
          </p>

          <div class="mt-4 py-2.5 px-3.5 bg-stone-50 border border-stone-200 text-[11px] font-heading font-medium text-stone-700">
            <span class="text-gold font-bold uppercase tracking-wider block text-[9px] mb-0.5">Weave &amp; Craft Details</span>
            ${saree.details}
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
      <div class="garment-card garment-sharp bg-white border border-stone-200 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
        <div>
          <!-- Real Photography Frame for Uniforms -->
          <div class="garment-img-frame h-48 sm:h-52 w-full mb-6 border border-stone-200 relative">
            <img src="${uni.image}" alt="${uni.title}" loading="lazy" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <span class="absolute bottom-3 left-3 text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-white bg-black/70 px-2.5 py-1 border border-white/20">
              ${uni.category}
            </span>
          </div>

          <h4 class="font-heading font-extrabold text-2xl text-navy">
            ${uni.title}
          </h4>

          <p class="font-sans text-xs sm:text-sm text-stone-600 leading-relaxed mt-3">
            ${uni.description}
          </p>

          <ul class="mt-6 space-y-2.5 pt-4 border-t border-stone-150">
            ${uni.features.map(feat => `
              <li class="flex items-center text-xs font-sans text-stone-700">
                <span class="w-1.5 h-1.5 bg-gold inline-block mr-2.5"></span>
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
  // 9. ACCESSORIES SECTION (Architectural Layout with Photo)
  // =========================================================================
  const accessoriesItems = document.getElementById('accessories-items-grid');
  if (accessoriesItems) {
    accessoriesItems.innerHTML = GARMENTS_DATA.accessories.items.map(acc => `
      <div class="p-4 bg-white border border-stone-200 hover:border-gold transition-colors garment-sharp flex flex-col justify-between">
        <div>
          <h5 class="font-heading font-bold text-xs uppercase tracking-wider text-navy">${acc.name}</h5>
          <p class="text-[11px] font-sans text-stone-500 mt-1 leading-relaxed">${acc.note}</p>
        </div>
        <span class="text-[9px] font-mono text-gold font-bold uppercase mt-3 pt-2 border-t border-stone-100">BORA CURATED</span>
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
        <div class="col-span-full py-16 text-center bg-white border border-stone-200 p-8 garment-sharp">
          <div class="w-12 h-12 bg-stone-100 text-stone-600 flex items-center justify-center mx-auto mb-4 text-xl border border-stone-300">
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
      <div class="garment-card garment-sharp bg-white p-5 border border-stone-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
        <div>
          ${item.image ? `
            <div class="garment-img-frame h-32 w-full mb-3 border border-stone-150">
              <img src="${item.image}" alt="${item.title}" loading="lazy" class="w-full h-full object-cover">
            </div>
          ` : ''}

          <div class="flex items-center justify-between text-[10px] font-heading font-bold uppercase tracking-wider mb-2">
            <span class="text-gold bg-gold/10 px-2 py-0.5 border border-gold/20">${item.type}</span>
            <span class="text-stone-400 font-mono">${item.category}</span>
          </div>

          <h5 class="font-heading font-bold text-base text-navy group-hover:text-gold transition-colors">
            ${item.title}
          </h5>
          <p class="font-sans text-xs text-stone-500 mt-1 leading-relaxed">
            ${item.note}
          </p>

          <div class="mt-4 pt-3 border-t border-stone-150 flex flex-wrap gap-1.5 text-[10px] font-heading font-semibold">
            <span class="px-2 py-0.5 bg-stone-100 text-stone-700 border border-stone-200">Fabric: ${item.fabric}</span>
            <span class="px-2 py-0.5 bg-stone-100 text-stone-700 border border-stone-200">Design: ${item.design}</span>
            <span class="px-2 py-0.5 bg-stone-100 text-stone-700 border border-stone-200">Brand: ${item.brand}</span>
          </div>
        </div>

        <div class="mt-4 pt-3 border-t border-stone-150 flex items-center justify-between">
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
      <div class="marquee-item cursor-pointer" onclick="triggerDiscoverySearch('${b}')" role="button" tabindex="0">
        <span class="w-1.5 h-1.5 bg-gold inline-block"></span>
        <span>${b}</span>
      </div>
    `).join('');
  }
});
