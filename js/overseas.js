/**
 * BORA GROUP — Overseas Trade Interactive Controller
 * Architectural layouts with sharp box point edges (no rounded corners),
 * accurate high-res photography, and real-time procurement discovery.
 */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof OVERSEAS_DATA === 'undefined') {
    console.error('OVERSEAS_DATA not loaded. Ensure js/overseas-data.js is included.');
    return;
  }

  // =========================================================================
  // 01 — EXPORT SECTORS OVERVIEW (Sharp Category Grid with Photography)
  // =========================================================================
  const categoryGrid = document.getElementById('overseas-category-grid');
  if (categoryGrid) {
    categoryGrid.innerHTML = OVERSEAS_DATA.categories.map((cat, idx) => `
      <a href="${cat.anchor}" class="trade-card box-point-edge group trade-sharp" aria-label="${cat.name}">
        <!-- High-Res Photo Frame -->
        <div class="trade-img-frame h-56 sm:h-60">
          <img src="${cat.image}" alt="${cat.name}" loading="lazy" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity"></div>
          <span class="absolute top-4 left-4 text-[9px] font-heading font-bold uppercase tracking-[0.2em] text-white bg-black/85 px-3 py-1 trade-sharp border-l-2 border-gold">
            ${cat.tag}
          </span>
          <span class="absolute bottom-4 right-4 text-[10px] font-mono text-white/90 bg-black/70 px-2 py-0.5 trade-sharp">
            ${cat.itemCount}
          </span>
        </div>

        <div class="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-white">
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-[10px] font-mono text-stone-400 font-semibold">${cat.sector}</span>
              <span class="text-[10px] font-heading font-semibold uppercase tracking-wider text-gold">${cat.sub}</span>
            </div>

            <h3 class="font-heading font-bold text-xl text-navy group-hover:text-gold transition-colors duration-200">
              ${cat.name}
            </h3>
            <p class="font-sans text-xs sm:text-sm text-stone-600 font-normal leading-relaxed mt-2.5">
              ${cat.description}
            </p>
          </div>

          <div class="pt-5 mt-6 border-t border-stone-150 flex items-center justify-between">
            <span class="trade-action-link">
              Explore Specifications <i class="fa-solid fa-arrow-right text-[10px] transform group-hover:translate-x-1.5 transition-transform duration-200"></i>
            </span>
          </div>
        </div>
      </a>
    `).join('');
  }

  // Helper for generating standardized product card markup
  function createProductCardMarkup(item) {
    return `
      <div class="trade-card box-point-edge group trade-sharp flex flex-col justify-between border border-stone-200 bg-white">
        <div>
          <!-- Photo Frame -->
          <div class="trade-img-frame h-52 relative">
            <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover">
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity"></div>
            <span class="absolute top-3 left-3 text-[9px] font-heading font-bold uppercase tracking-wider text-white bg-black/80 px-2.5 py-1 border-l-2 border-gold trade-sharp">
              HS: ${item.hsCode}
            </span>
            <span class="absolute top-3 right-3 text-[9px] font-mono uppercase text-gold bg-stone-900/90 px-2 py-0.5 trade-sharp">
              ${item.category}
            </span>
          </div>

          <!-- Product Details -->
          <div class="p-6">
            <div class="flex items-center justify-between text-[10px] font-mono text-stone-400 mb-1">
              <span>ORIGIN: ${item.origin}</span>
            </div>

            <h4 class="font-heading font-extrabold text-lg sm:text-xl text-navy group-hover:text-gold transition-colors duration-200">
              ${item.name}
            </h4>
            <div class="text-[11px] font-serif italic text-stone-400 mt-0.5 mb-3">${item.scientific || ''}</div>

            <p class="font-sans text-xs text-stone-600 leading-relaxed mb-4">
              ${item.description}
            </p>

            <!-- Technical Specification Table Box -->
            <div class="bg-stone-50 border border-stone-200 p-3 space-y-1.5 text-[11px] font-sans trade-sharp">
              <div class="flex justify-between items-start gap-2">
                <span class="font-heading font-bold text-[9px] uppercase tracking-wider text-stone-500">Grade:</span>
                <span class="font-medium text-stone-800 text-right">${item.grade}</span>
              </div>
              <div class="flex justify-between items-start gap-2 border-t border-stone-200/60 pt-1.5">
                <span class="font-heading font-bold text-[9px] uppercase tracking-wider text-stone-500">Packaging:</span>
                <span class="font-medium text-stone-800 text-right">${item.packaging}</span>
              </div>
              <div class="flex justify-between items-start gap-2 border-t border-stone-200/60 pt-1.5">
                <span class="font-heading font-bold text-[9px] uppercase tracking-wider text-stone-500">Parameters:</span>
                <span class="font-medium text-stone-800 text-right">${item.moisture}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 pt-0 mt-2">
          <a href="enquiry-export.html?subject=${encodeURIComponent(item.name + ' Export Enquiry')}" class="w-full btn-premium-gold text-[11px] py-2.5 trade-sharp flex items-center justify-center gap-2">
            <span>Request Specification & Quote</span>
            <i class="fa-solid fa-arrow-right text-[9px]"></i>
          </a>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 02 — DETAILED SECTOR PRODUCT GRIDS
  // =========================================================================
  const vegGrid = document.getElementById('vegetables-grid');
  if (vegGrid) {
    vegGrid.innerHTML = OVERSEAS_DATA.vegetables.map(createProductCardMarkup).join('');
  }

  const grainsGrid = document.getElementById('grains-grid');
  if (grainsGrid) {
    grainsGrid.innerHTML = OVERSEAS_DATA.grains.map(createProductCardMarkup).join('');
  }

  const spicesGrid = document.getElementById('spices-grid');
  if (spicesGrid) {
    spicesGrid.innerHTML = OVERSEAS_DATA.spices.map(createProductCardMarkup).join('');
  }

  const garmentsGrid = document.getElementById('garments-grid');
  if (garmentsGrid) {
    garmentsGrid.innerHTML = OVERSEAS_DATA.garments.map(createProductCardMarkup).join('');
  }

  // =========================================================================
  // 03 — RAPID PROCUREMENT FILTER (Search & Real-time Live Discovery)
  // =========================================================================
  const searchInput = document.getElementById('trade-search');
  const categoryFilter = document.getElementById('trade-category-filter');
  const resultsGrid = document.getElementById('trade-discovery-results');
  const resultsCount = document.getElementById('trade-results-count');
  const clearBtn = document.getElementById('trade-clear-btn');

  function renderDiscoveryResults() {
    if (!resultsGrid) return;

    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const selectedCategory = categoryFilter ? categoryFilter.value : 'All';

    const filtered = OVERSEAS_DATA.allProducts.filter(item => {
      const matchesSearch = !searchTerm || 
        item.name.toLowerCase().includes(searchTerm) ||
        (item.scientific && item.scientific.toLowerCase().includes(searchTerm)) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.hsCode.toLowerCase().includes(searchTerm) ||
        item.origin.toLowerCase().includes(searchTerm) ||
        item.grade.toLowerCase().includes(searchTerm);

      const matchesCat = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCat;
    });

    if (resultsCount) {
      resultsCount.textContent = `${filtered.length} Product${filtered.length === 1 ? '' : 's'} Available`;
    }

    if (filtered.length === 0) {
      resultsGrid.innerHTML = `
        <div class="col-span-full py-16 text-center bg-stone-900 border border-stone-800 trade-sharp">
          <i class="fa-solid fa-box-archive text-3xl text-gold/40 mb-3"></i>
          <h4 class="font-heading font-bold text-white text-base uppercase tracking-wider">No matching export commodities found</h4>
          <p class="text-xs text-stone-400 mt-1 max-w-md mx-auto">Try adjusting your keyword (e.g. "onions", "rice", "chillies", "cotton", "turmeric") or resetting filters.</p>
          <button type="button" onclick="resetOverseasDiscovery()" class="mt-4 btn-premium-gold text-xs px-5 py-2 trade-sharp">Reset All Filters</button>
        </div>
      `;
      return;
    }

    resultsGrid.innerHTML = filtered.map(item => `
      <div class="trade-card box-point-edge group trade-sharp border border-stone-800 bg-[#16171B] text-white flex flex-col justify-between">
        <div>
          <div class="trade-img-frame h-44 relative">
            <img src="${item.image}" alt="${item.name}" loading="lazy" class="w-full h-full object-cover">
            <span class="absolute top-2.5 left-2.5 text-[9px] font-heading font-bold uppercase tracking-wider text-white bg-black/85 px-2 py-0.5 border-l border-gold trade-sharp">
              HS: ${item.hsCode}
            </span>
            <span class="absolute top-2.5 right-2.5 text-[9px] font-mono uppercase text-gold bg-black/80 px-2 py-0.5 trade-sharp">
              ${item.category}
            </span>
          </div>

          <div class="p-5">
            <div class="text-[9px] font-mono text-stone-400 mb-1">ORIGIN: ${item.origin}</div>
            <h4 class="font-heading font-bold text-base text-white group-hover:text-gold transition-colors duration-200">
              ${item.name}
            </h4>
            <div class="text-[10px] font-serif italic text-stone-400 mb-2">${item.scientific || ''}</div>
            <p class="font-sans text-xs text-stone-400 line-clamp-2 leading-relaxed mb-3">
              ${item.description}
            </p>
            <div class="text-[10px] font-mono text-stone-300 border-t border-stone-800 pt-2 flex justify-between">
              <span class="text-stone-500">GRADE:</span>
              <span class="text-stone-200">${item.grade.split('(')[0]}</span>
            </div>
          </div>
        </div>

        <div class="p-5 pt-0">
          <a href="enquiry-export.html?subject=${encodeURIComponent(item.name + ' Export Enquiry')}" class="w-full btn-premium-gold text-[10px] py-2 trade-sharp flex items-center justify-center gap-1.5">
            <span>Enquire Spec</span>
            <i class="fa-solid fa-arrow-right text-[8px]"></i>
          </a>
        </div>
      </div>
    `).join('');
  }

  if (searchInput) {
    searchInput.addEventListener('input', renderDiscoveryResults);
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', renderDiscoveryResults);
  }

  window.resetOverseasDiscovery = function() {
    if (searchInput) searchInput.value = '';
    if (categoryFilter) categoryFilter.value = 'All';
    renderDiscoveryResults();
  };

  if (clearBtn) {
    clearBtn.addEventListener('click', window.resetOverseasDiscovery);
  }

  // Initial Discovery Render
  renderDiscoveryResults();

  // Mobile Filter Drawer Toggle
  const mobileFilterBtn = document.getElementById('trade-mobile-filter-btn');
  const filterDrawer = document.getElementById('trade-filter-drawer');
  const filterBackdrop = document.getElementById('trade-filter-backdrop');
  const filterCloseBtn = document.getElementById('trade-filter-close-btn');
  const mobileApplyBtn = document.getElementById('trade-mobile-apply-btn');

  function openFilterDrawer() {
    if (filterDrawer && filterBackdrop) {
      filterDrawer.classList.add('active');
      filterBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeFilterDrawer() {
    if (filterDrawer && filterBackdrop) {
      filterDrawer.classList.remove('active');
      filterBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileFilterBtn) mobileFilterBtn.addEventListener('click', openFilterDrawer);
  if (filterCloseBtn) filterCloseBtn.addEventListener('click', closeFilterDrawer);
  if (filterBackdrop) filterBackdrop.addEventListener('click', closeFilterDrawer);
  if (mobileApplyBtn) {
    mobileApplyBtn.addEventListener('click', () => {
      renderDiscoveryResults();
      closeFilterDrawer();
    });
  }

  // =========================================================================
  // 04 — CERTIFICATIONS & COMPLIANCE MODAL (Sharp Architectural Modal)
  // =========================================================================
  const certCards = document.querySelectorAll('.cert-card');
  const certModal = document.getElementById('cert-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalImg = document.getElementById('modal-img');

  if (certCards.length > 0 && certModal) {
    certCards.forEach(card => {
      card.addEventListener('click', () => {
        const certName = card.getAttribute('data-cert');
        const certData = OVERSEAS_DATA.certifications.find(c => c.name.toLowerCase().includes(certName.toLowerCase()) || certName.toLowerCase().includes(c.id));

        if (certData) {
          modalTitle.textContent = certData.name;
          modalDesc.textContent = certData.description;
          modalImg.innerHTML = `
            <div class="p-6 bg-stone-900 border border-stone-800 trade-sharp text-left space-y-3">
              <div class="flex justify-between items-center text-[10px] font-mono text-gold border-b border-stone-800 pb-2">
                <span>AUTHORITY VERIFICATION</span>
                <span>STATUS: ACTIVE</span>
              </div>
              <div class="text-sm font-heading font-bold text-white tracking-wider">${certData.code}</div>
              <div class="text-xs text-stone-300 font-sans">${certData.badge}</div>
              <div class="pt-3 border-t border-stone-800 flex justify-between items-center text-[10px] text-stone-400">
                <span>GOVERNMENT OF INDIA</span>
                <span class="text-gold font-bold">CERTIFIED EXPORT DESK</span>
              </div>
            </div>
          `;
        } else {
          modalTitle.textContent = certName;
          modalDesc.textContent = 'Accredited government quality certification assuring compliance with international trade protocols.';
          modalImg.innerHTML = `
            <div class="p-6 bg-stone-900 border border-stone-800 trade-sharp text-left">
              <span class="text-xs font-mono text-gold uppercase">OFFICIAL EXPORT REGISTRATION</span>
              <div class="text-sm font-heading font-bold text-white mt-1">${certName}</div>
            </div>
          `;
        }

        certModal.classList.remove('hidden');
        certModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', () => {
        certModal.classList.add('hidden');
        certModal.classList.remove('flex');
        document.body.style.overflow = '';
      });
    }

    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        certModal.classList.add('hidden');
        certModal.classList.remove('flex');
        document.body.style.overflow = '';
      }
    });
  }

  // =========================================================================
  // 05 — TESTIMONIALS SLIDER (Sharp Navigation)
  // =========================================================================
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevTestimonial = document.getElementById('prev-testimonial');
  const nextTestimonial = document.getElementById('next-testimonial');

  if (testimonialSlides.length > 0) {
    let currentSlide = 0;

    function showSlide(index) {
      testimonialSlides.forEach((slide, idx) => {
        if (idx === index) {
          slide.classList.remove('hidden', 'opacity-0');
          slide.classList.add('block', 'opacity-100');
        } else {
          slide.classList.add('hidden', 'opacity-0');
          slide.classList.remove('block', 'opacity-100');
        }
      });
    }

    showSlide(currentSlide);

    if (nextTestimonial) {
      nextTestimonial.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
      });
    }

    if (prevTestimonial) {
      prevTestimonial.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
      });
    }
  }

  // =========================================================================
  // 06 — NUMBER COUNTER ANIMATION
  // =========================================================================
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length > 0 && typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10) || 0;
          const suffix = el.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1500;
          const increment = Math.ceil(target / (duration / 30));

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              count = target;
              clearInterval(timer);
            }
            el.textContent = count + suffix;
          }, 30);

          obs.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    counters.forEach(c => observer.observe(c));
  }
});
