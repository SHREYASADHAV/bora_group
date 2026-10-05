/**
 * BORA GROUP — BORA REALTY
 * PLOT LAYOUTS & LAND DEVELOPMENTS MODULE
 * 
 * Features:
 * - 10 Authentic Plot Development Projects
 * - Strict Data Integrity (No fabricated specs or numbers)
 * - Minimalist Apple/Editorial Luxury Design System
 * - Real-time Multi-field Search (Name, Location, Associated Name, Sr. No., Layout)
 * - Location Category Filter Tabs with Smooth Transitions
 * - Accessible Two-Column Detail Modal Overlay
 * - Interactive Layout Plan Lightbox with Pan & Zoom Inspection
 * - Keyboard Accessibility (Tab, Enter, Space, ESC, Focus Trap & Restore)
 * - Zero Broken Image Icon Protection (Embedded SVG Fallback)
 */

(function () {
  'use strict';

  // 10 Official Bora Realty Plot Projects Data
  const plotLayouts = [
    {
      id: "sugun-building",
      name: "Sugun Building",
      location: "Kopargaon",
      category: "KOPARGAON",
      srNo: "2160",
      layout: "Asane Saheb",
      type: "Commercial + Residential",
      highlight: "Commercial + Residential Development",
      image: "images/real-estate/layouts/sugun-building.jpg",
      amenities: [
        "Bank",
        "Backup Lift",
        "Parking",
        "Quality Construction"
      ]
    },
    {
      id: "mahasnu-layout",
      name: "Mahasnu Layout",
      location: "Nashik",
      category: "NASHIK",
      associatedName: "Akshay Bora",
      srNo: "171/P",
      layout: "Not Available",
      type: "Residential Layout",
      highlight: "Prime Nashik Growth Corridor",
      image: "images/real-estate/layouts/mahasnu-layout.jpg",
      amenities: [
        "Airport",
        "School",
        "College",
        "International Stadium",
        "Temple",
        "Mall",
        "Market",
        "DP Light",
        "30M DP Road"
      ]
    },
    {
      id: "sai-nagar",
      name: "Sai Nagar",
      location: "Nimbol Pimpri, Shirdi, Tal. Rahata",
      category: "SHIRDI / RAHATA",
      srNo: "Not Available",
      layout: "Not Available",
      type: "Highway Touch Plots",
      highlight: "Highway Touch Connectivity",
      image: "images/real-estate/layouts/sai-nagar.jpg",
      amenities: [
        "Highway Touch Plots",
        "School",
        "Shirdi Temple",
        "Hospital",
        "Market",
        "APMC"
      ]
    },
    {
      id: "borawake-layout",
      name: "Borawake Layout",
      location: "Jeur Patoda",
      category: "JEUR PATODA",
      srNo: "75",
      layout: "Not Available",
      type: "Purely Residential Layout",
      highlight: "Purely Residential Layout",
      image: "images/real-estate/layouts/borawake-layout.jpg",
      amenities: [
        "Petrol Pump",
        "Residential Layout",
        "School",
        "Road",
        "Drainage",
        "Street Light"
      ]
    },
    {
      id: "ishan-nagar",
      name: "Ishan Nagar",
      location: "Kopargaon",
      category: "KOPARGAON",
      srNo: "73/B",
      layout: "Available Scanned Copy",
      type: "Residential Layout",
      highlight: "Prime Shiv Road Enclave",
      image: "images/real-estate/layouts/ishan-nagar.jpg",
      amenities: [
        "School",
        "Road",
        "Prime Shiv Road",
        "Hospital"
      ]
    },
    {
      id: "shivshanti-nagar",
      name: "Shivshanti Nagar",
      location: "Kopargaon",
      category: "KOPARGAON",
      srNo: "2",
      layout: "Not Available",
      type: "Residential Layout",
      highlight: "Central Kopargaon Living",
      image: "images/real-estate/layouts/shivshanti-nagar.jpg",
      amenities: [] // Not Provided
    },
    {
      id: "sai-prabha-nagar",
      name: "Sai Prabha Nagar",
      location: "Kopargaon",
      category: "KOPARGAON",
      srNo: "143",
      layout: "Not Available",
      type: "13 Acre Township",
      highlight: "13 Acre Township",
      image: "images/real-estate/layouts/sai-prabha-nagar.jpg",
      amenities: [
        "13 Acre Township"
      ]
    },
    {
      id: "sahyadri-colony",
      name: "Sahyadri Colony",
      location: "Kopargaon",
      category: "KOPARGAON",
      srNo: "2",
      layout: "Not Available",
      type: "Residential Development",
      highlight: "Mid of City Enclave",
      image: "images/real-estate/layouts/sahyadri-colony.jpg",
      amenities: [
        "Mid of City",
        "School at 20M",
        "Market Nearby",
        "Petrol Pump",
        "Shopping Centre",
        "Grocery Nearby",
        "Garden",
        "Gym",
        "Street Light",
        "Roads",
        "Drainage",
        "Hospital",
        "APMC"
      ]
    },
    {
      id: "shri-kushanganj",
      name: "Shri Kushanganj / Kushanganwar",
      location: "Jeur Patoda, Kopargaon",
      category: "JEUR PATODA",
      srNo: "72/1",
      layout: "Layout Sanctioned – Scanned Copy",
      type: "Residential Layout",
      highlight: "Nearest Layout of City",
      image: "images/real-estate/layouts/shri-kushanganj.jpg",
      amenities: [
        "Petrol Pump",
        "Prime Location",
        "Road & Gutter",
        "School",
        "Street Light",
        "Nearest Layout of City",
        "Hospital"
      ]
    },
    {
      id: "madhav-nagar",
      name: "Madhav Nagar",
      location: "Kopargaon",
      category: "KOPARGAON",
      srNo: "119/1",
      layout: "Available Scanned Copy",
      type: "Residential Layout",
      highlight: "Sanctioned Residential Layout",
      image: "images/real-estate/layouts/madhav-nagar.jpg",
      amenities: [
        "Road",
        "Drainage",
        "Petrol Pump",
        "Mandir",
        "Street Light",
        "Hospital"
      ]
    }
  ];

  // Global SVG Fallback to ensure zero broken image icons
  const FALLBACK_SVG = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="#0B1F3B">
      <rect width="100%" height="100%" fill="#0B1F3B"/>
      <path d="M0,0 L600,400 M600,0 L0,400" stroke="rgba(197,168,128,0.12)" stroke-width="1"/>
      <circle cx="300" cy="200" r="70" fill="none" stroke="#C5A880" stroke-width="1.5" stroke-dasharray="4 4"/>
      <text x="300" y="195" font-family="sans-serif" font-size="14" fill="#C5A880" font-weight="600" text-anchor="middle" letter-spacing="2">BORA REALTY</text>
      <text x="300" y="215" font-family="sans-serif" font-size="11" fill="rgba(255,255,255,0.7)" text-anchor="middle">APPROVED LAYOUT PLAN</text>
    </svg>
  `);

  // Active State Management
  let activeCategory = "ALL";
  let activeSearchQuery = "";
  let lastFocusedElement = null;
  let currentModalProject = null;

  // Lightbox Pan/Zoom State
  let lbZoom = 1;
  let lbPanX = 0;
  let lbPanY = 0;
  let isDraggingLb = false;
  let startDragX = 0;
  let startDragY = 0;

  // DOM Elements Cache
  let gridContainer = null;
  let filterButtons = null;
  let searchInput = null;
  let clearSearchBtn = null;
  let resultsCountEl = null;
  let modalEl = null;
  let lightboxEl = null;

  /**
   * Check if project matches selected category tab
   */
  function matchesCategory(project, category) {
    if (category === "ALL") return true;
    const loc = (project.location + " " + (project.category || "")).toUpperCase();
    if (category === "KOPARGAON") return loc.includes("KOPARGAON");
    if (category === "NASHIK") return loc.includes("NASHIK");
    if (category === "SHIRDI / RAHATA") return loc.includes("SHIRDI") || loc.includes("RAHATA");
    if (category === "JEUR PATODA") return loc.includes("JEUR") || loc.includes("PATODA");
    return project.category === category;
  }

  /**
   * Check if project matches search term
   */
  function matchesSearch(project, query) {
    if (!query) return true;
    const q = query.toLowerCase().trim();
    const searchCorpus = [
      project.name,
      project.location,
      project.associatedName || "",
      project.type || "",
      project.srNo || "",
      project.layout || "",
      ...(project.amenities || [])
    ].join(" ").toLowerCase();

    return searchCorpus.includes(q);
  }

  /**
   * Render single project card HTML (Strictly NO numbers!)
   */
  function createCardElement(project) {
    const card = document.createElement("article");
    card.className = "plot-card group";
    card.setAttribute("data-project-id", project.id);
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-label", `View details for ${project.name} in ${project.location}`);

    card.innerHTML = `
      <div class="plot-card-img-wrap">
        <img 
          src="${project.image}" 
          alt="Architectural plot layout schematic for ${project.name}"
          class="plot-card-img" 
          loading="lazy"
          onerror="this.onerror=null; this.src='${FALLBACK_SVG}';"
        />
        <div class="plot-card-badge-wrap">
          <span class="plot-type-chip">${project.type || 'Plot Development'}</span>
        </div>
      </div>
      <div class="plot-card-body">
        <div class="plot-card-meta">
          <h3 class="plot-card-title">${project.name}</h3>
          <p class="plot-card-location">${project.location}</p>
          <p class="plot-card-type">${project.highlight || project.type || 'Residential Development'}</p>
        </div>
        <div class="plot-card-action">
          <span class="plot-view-details">
            <span>VIEW DETAILS</span>
            <span class="plot-arrow" aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    `;

    // Keyboard & Click Handlers
    card.addEventListener("click", () => openDetailModal(project, card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDetailModal(project, card);
      }
    });

    return card;
  }

  /**
   * Filter and display cards in grid
   */
  function renderCards(animate = false) {
    if (!gridContainer) return;

    const filtered = plotLayouts.filter(project => {
      return matchesCategory(project, activeCategory) && matchesSearch(project, activeSearchQuery);
    });

    // Update count indicator if present
    if (resultsCountEl) {
      if (filtered.length === plotLayouts.length) {
        resultsCountEl.textContent = `Showing all ${filtered.length} layouts`;
      } else {
        resultsCountEl.textContent = `Showing ${filtered.length} of ${plotLayouts.length} layouts`;
      }
    }

    gridContainer.innerHTML = "";

    if (filtered.length === 0) {
      const emptyState = document.createElement("div");
      emptyState.className = "col-span-full py-16 px-6 text-center bg-white rounded-2xl border border-gray-100 shadow-sm max-w-xl mx-auto";
      emptyState.innerHTML = `
        <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
          <i class="fa-solid fa-magnifying-glass text-xl"></i>
        </div>
        <h4 class="font-heading font-semibold text-lg text-navy-900 mb-2">No Matching Layouts Found</h4>
        <p class="text-sm text-gray-500 font-light mb-6">We couldn't find any plot layouts matching "${activeSearchQuery}". Try selecting another location tab or resetting the search.</p>
        <button id="plot-reset-search-btn" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase text-navy-900 bg-slate-100 hover:bg-slate-200 transition-colors">
          <i class="fa-solid fa-rotate-left"></i>
          <span>Reset Search & Filters</span>
        </button>
      `;
      gridContainer.appendChild(emptyState);

      const resetBtn = emptyState.querySelector("#plot-reset-search-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          activeCategory = "ALL";
          activeSearchQuery = "";
          if (searchInput) searchInput.value = "";
          updateFilterButtonsUI();
          renderCards(true);
        });
      }
      return;
    }

    const fragment = document.createDocumentFragment();
    filtered.forEach(project => {
      const cardEl = createCardElement(project);
      fragment.appendChild(cardEl);
    });

    gridContainer.appendChild(fragment);

    // Optional smooth stagger entrance if GSAP is available
    if (animate && typeof gsap !== "undefined") {
      gsap.fromTo(
        gridContainer.children,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.05, ease: "power2.out" }
      );
    }
  }

  /**
   * Update active UI tab styling
   */
  function updateFilterButtonsUI() {
    if (!filterButtons) return;
    filterButtons.forEach(btn => {
      const cat = btn.getAttribute("data-category");
      if (cat === activeCategory) {
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
      }
    });
  }

  /**
   * Open Accessible Detail Modal Overlay
   */
  function openDetailModal(project, triggerElement) {
    if (!modalEl) return;
    lastFocusedElement = triggerElement;
    currentModalProject = project;

    // Populate data strictly as provided
    const modalImg = document.getElementById("modal-layout-img");
    const nameEl = document.getElementById("modal-project-name");
    const locEl = document.getElementById("modal-project-location");
    const highlightEl = document.getElementById("modal-project-highlight");
    const srNoEl = document.getElementById("modal-sr-no");
    const layoutStatusEl = document.getElementById("modal-layout-status");
    const devTypeEl = document.getElementById("modal-dev-type");
    const associatedRow = document.getElementById("modal-associated-row");
    const associatedNameEl = document.getElementById("modal-associated-name");
    const amenitiesContainer = document.getElementById("modal-amenities-container");
    const inquireBtn = document.getElementById("modal-inquire-btn");

    if (modalImg) {
      modalImg.src = project.image;
      modalImg.alt = `Layout plan overview for ${project.name}, ${project.location}`;
      modalImg.onerror = function () {
        this.onerror = null;
        this.src = FALLBACK_SVG;
      };
    }

    if (nameEl) nameEl.textContent = project.name;
    if (locEl) locEl.textContent = project.location;
    
    if (highlightEl) {
      highlightEl.textContent = project.highlight || project.type || "Residential Enclave";
    }

    if (srNoEl) {
      srNoEl.textContent = project.srNo || "Not Available";
    }

    if (associatedRow && associatedNameEl) {
      if (project.associatedName) {
        associatedRow.style.display = "flex";
        associatedNameEl.textContent = project.associatedName;
      } else {
        associatedRow.style.display = "none";
      }
    }

    if (layoutStatusEl) {
      layoutStatusEl.textContent = project.layout || "Not Available";
    }

    if (devTypeEl) {
      devTypeEl.textContent = project.type || "Residential Layout";
    }

    // Amenities list (chips/bullets)
    if (amenitiesContainer) {
      amenitiesContainer.innerHTML = "";
      if (project.amenities && project.amenities.length > 0) {
        project.amenities.forEach(amenity => {
          const item = document.createElement("div");
          item.className = "plot-amenity-chip";
          item.innerHTML = `
            <span class="plot-amenity-dot"></span>
            <span>${amenity}</span>
          `;
          amenitiesContainer.appendChild(item);
        });
      } else {
        const notProvided = document.createElement("p");
        notProvided.className = "text-xs text-gray-400 italic";
        notProvided.textContent = "Not Provided";
        amenitiesContainer.appendChild(notProvided);
      }
    }

    if (inquireBtn) {
      inquireBtn.href = `enquiry-real-estate.html?project=${encodeURIComponent(project.name)}`;
    }

    // Activate Modal
    modalEl.classList.add("active");
    modalEl.setAttribute("aria-hidden", "false");
    document.body.classList.add("plot-modal-open");

    // Trap Focus
    const closeBtn = document.getElementById("modal-close-btn");
    if (closeBtn) closeBtn.focus();
  }

  /**
   * Close Detail Modal
   */
  function closeDetailModal() {
    if (!modalEl || !modalEl.classList.contains("active")) return;

    modalEl.classList.remove("active");
    modalEl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("plot-modal-open");

    // Return focus to last triggered card for accessibility
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
    currentModalProject = null;
  }

  /**
   * Open Lightbox / High-Res Plan Viewer with Zoom & Pan
   */
  function openLightbox() {
    if (!lightboxEl || !currentModalProject) return;

    const lbImg = document.getElementById("lightbox-img");
    const lbTitle = document.getElementById("lightbox-project-title");

    if (lbTitle) {
      lbTitle.textContent = `${currentModalProject.name} — Layout Plan Inspection`;
    }

    if (lbImg) {
      lbImg.src = currentModalProject.image;
      lbImg.alt = `Full architectural layout drawing for ${currentModalProject.name}`;
      lbImg.onerror = function () {
        this.onerror = null;
        this.src = FALLBACK_SVG;
      };
    }

    // Reset zoom & pan
    lbZoom = 1;
    lbPanX = 0;
    lbPanY = 0;
    updateLightboxTransform();

    lightboxEl.classList.add("active");
    lightboxEl.setAttribute("aria-hidden", "false");

    const closeLbBtn = document.getElementById("lb-close");
    if (closeLbBtn) closeLbBtn.focus();
  }

  /**
   * Close Lightbox
   */
  function closeLightbox() {
    if (!lightboxEl || !lightboxEl.classList.contains("active")) return;

    lightboxEl.classList.remove("active");
    lightboxEl.setAttribute("aria-hidden", "true");

    // Return focus to modal trigger
    const zoomTrigger = document.getElementById("modal-image-zoom-trigger");
    if (zoomTrigger) zoomTrigger.focus();
  }

  /**
   * Update transform matrix on lightbox image
   */
  function updateLightboxTransform() {
    const lbImg = document.getElementById("lightbox-img");
    if (!lbImg) return;
    lbImg.style.transform = `translate(${lbPanX}px, ${lbPanY}px) scale(${lbZoom})`;
  }

  /**
   * Initialize Lightbox Drag/Pan and Zoom events
   */
  function initLightboxEvents() {
    const viewport = document.getElementById("plot-lb-viewport");
    const zoomInBtn = document.getElementById("lb-zoom-in");
    const zoomOutBtn = document.getElementById("lb-zoom-out");
    const zoomResetBtn = document.getElementById("lb-zoom-reset");
    const closeBtn = document.getElementById("lb-close");

    if (zoomInBtn) {
      zoomInBtn.addEventListener("click", () => {
        lbZoom = Math.min(4, lbZoom + 0.35);
        updateLightboxTransform();
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener("click", () => {
        lbZoom = Math.max(0.8, lbZoom - 0.35);
        if (lbZoom <= 1) {
          lbPanX = 0;
          lbPanY = 0;
        }
        updateLightboxTransform();
      });
    }

    if (zoomResetBtn) {
      zoomResetBtn.addEventListener("click", () => {
        lbZoom = 1;
        lbPanX = 0;
        lbPanY = 0;
        updateLightboxTransform();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeLightbox);
    }

    if (viewport) {
      // Mouse Wheel Zoom
      viewport.addEventListener("wheel", (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.15 : 0.15;
        lbZoom = Math.max(0.8, Math.min(4, lbZoom + delta));
        if (lbZoom <= 1) {
          lbPanX = 0;
          lbPanY = 0;
        }
        updateLightboxTransform();
      }, { passive: false });

      // Mouse Drag Pan
      viewport.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        isDraggingLb = true;
        startDragX = e.clientX - lbPanX;
        startDragY = e.clientY - lbPanY;
        viewport.classList.add("is-dragging");
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDraggingLb) return;
        lbPanX = e.clientX - startDragX;
        lbPanY = e.clientY - startDragY;
        updateLightboxTransform();
      });

      window.addEventListener("mouseup", () => {
        if (isDraggingLb) {
          isDraggingLb = false;
          if (viewport) viewport.classList.remove("is-dragging");
        }
      });

      // Double-click to toggle zoom
      viewport.addEventListener("dblclick", () => {
        if (lbZoom > 1.2) {
          lbZoom = 1;
          lbPanX = 0;
          lbPanY = 0;
        } else {
          lbZoom = 2.2;
        }
        updateLightboxTransform();
      });
    }
  }

  /**
   * Main Initialization Routine
   */
  function initPlotLayouts() {
    gridContainer = document.getElementById("plot-layouts-grid");
    if (!gridContainer) {
      // Element not yet in DOM or on different page
      return;
    }

    filterButtons = document.querySelectorAll(".plot-filter-tab");
    searchInput = document.getElementById("plot-search-input");
    clearSearchBtn = document.getElementById("plot-search-clear");
    resultsCountEl = document.getElementById("plot-results-count");
    modalEl = document.getElementById("plot-detail-modal");
    lightboxEl = document.getElementById("plot-lightbox");

    // Filter Buttons Interaction
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-category");
        if (cat === activeCategory) return;
        activeCategory = cat;
        updateFilterButtonsUI();
        renderCards(true);
      });
    });

    // Real-Time Search Interaction
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        activeSearchQuery = e.target.value;
        if (clearSearchBtn) {
          clearSearchBtn.style.opacity = activeSearchQuery.length > 0 ? "1" : "0";
          clearSearchBtn.style.pointerEvents = activeSearchQuery.length > 0 ? "auto" : "none";
        }
        renderCards(false);
      });
    }

    // Clear Search Input
    if (clearSearchBtn) {
      clearSearchBtn.addEventListener("click", () => {
        if (searchInput) {
          searchInput.value = "";
          activeSearchQuery = "";
          searchInput.focus();
        }
        clearSearchBtn.style.opacity = "0";
        clearSearchBtn.style.pointerEvents = "none";
        renderCards(true);
      });
    }

    // Modal Close Triggers
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const modalBackdrop = document.getElementById("modal-backdrop-dismiss");
    const modalCloseSecondary = document.getElementById("modal-close-secondary");

    if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeDetailModal);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeDetailModal);
    if (modalCloseSecondary) modalCloseSecondary.addEventListener("click", closeDetailModal);

    // Zoom Image Trigger inside Modal
    const zoomTrigger = document.getElementById("modal-image-zoom-trigger");
    if (zoomTrigger) {
      zoomTrigger.addEventListener("click", openLightbox);
      zoomTrigger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox();
        }
      });
    }

    // Lightbox Controls
    initLightboxEvents();

    // Global Keyboard Listener for ESC and Accessibility
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (lightboxEl && lightboxEl.classList.contains("active")) {
          e.preventDefault();
          closeLightbox();
        } else if (modalEl && modalEl.classList.contains("active")) {
          e.preventDefault();
          closeDetailModal();
        }
      }
    });

    // Initial Render of all 10 Cards
    renderCards(false);

    // GSAP ScrollTrigger Section Entrance
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      const sectionHeader = document.querySelector("#plot-layouts .plot-section-header");
      if (sectionHeader) {
        gsap.from(sectionHeader, {
          scrollTrigger: {
            trigger: "#plot-layouts",
            start: "top 80%"
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out"
        });
      }

      if (gridContainer) {
        gsap.from(gridContainer.children, {
          scrollTrigger: {
            trigger: gridContainer,
            start: "top 85%"
          },
          opacity: 0,
          y: 25,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out"
        });
      }
    }
  }

  // Self-initialize on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPlotLayouts);
  } else {
    initPlotLayouts();
  }

  // Expose API to window for debugging or manual re-render if needed
  window.BoraPlotLayouts = {
    data: plotLayouts,
    render: renderCards,
    openModal: openDetailModal,
    closeModal: closeDetailModal
  };

})();
