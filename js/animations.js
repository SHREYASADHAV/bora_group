// BORA GROUP — GSAP Scroll & Parallax Animations

document.addEventListener('DOMContentLoaded', () => {
  // Gracefully verify GSAP availability
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn("GSAP or ScrollTrigger CDN resources are offline. Falling back to CSS transitions.");
    
    // Force show subpage hero elements if GSAP is unavailable
    document.querySelectorAll('.hero-subtitle, .hero-title, .hero-text, .hero-ctas').forEach(el => {
      el.classList.remove('opacity-0');
    });

    // CSS-based intersection observer fallback
    const fadeSections = document.querySelectorAll('.fade-in-section');
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    fadeSections.forEach(sec => observer.observe(sec));
    return;
  }

  // 1. Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Universal Page Hero entrance animation for subpages (real-estate, overseas-trade, industrial-supply, hospitality, etc.)
  const subpageHeroSubtitle = document.querySelector('.hero-subtitle');
  const subpageHeroTitle = document.querySelector('.hero-title');
  const subpageHeroText = document.querySelector('.hero-text');
  const subpageHeroCtas = document.querySelector('.hero-ctas');

  if (subpageHeroSubtitle || subpageHeroTitle || subpageHeroText || subpageHeroCtas) {
    // Remove opacity-0 class before GSAP timeline starts so GSAP inline styles control opacity
    [subpageHeroSubtitle, subpageHeroTitle, subpageHeroText, subpageHeroCtas].forEach(el => {
      if (el) el.classList.remove('opacity-0');
    });

    const heroTimeline = gsap.timeline({ delay: 0.15 });
    
    if (subpageHeroSubtitle) {
      heroTimeline.fromTo(subpageHeroSubtitle, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
    if (subpageHeroTitle) {
      heroTimeline.fromTo(subpageHeroTitle, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }
    if (subpageHeroText) {
      heroTimeline.fromTo(subpageHeroText, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }
    if (subpageHeroCtas) {
      heroTimeline.fromTo(subpageHeroCtas, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }
  }

  // Initialize Lenis smooth scroll
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Bind Lenis scroll events directly to GSAP's ScrollTrigger engine
    lenis.on('scroll', ScrollTrigger.update);
  }

  // 2. Cinematic Hero Carousel & Slideshow Animation
  const heroCarouselSection = document.getElementById('hero-carousel-section');
  if (heroCarouselSection) {
    // Background slides remain inside the section
    const bgSlides = heroCarouselSection.querySelectorAll('.hero-bg-slide');
    // Cards, quotes, controls are now fixed-position elements outside the section
    const quoteItems = document.querySelectorAll('.hero-quote-item');
    const cards = document.querySelectorAll('.hero-card-item');
    const wrapper = document.getElementById('hero-cards-wrapper');
    const timerBar = document.getElementById('hero-timer-bar');
    const prevBtn = document.getElementById('hero-prev-btn');
    const nextBtn = document.getElementById('hero-next-btn');
    const quoteOuter = document.getElementById('hero-quote-outer');
    const controlsOuter = document.getElementById('hero-controls-outer');
    const total = cards.length;
    let activeIdx = -1;
    let timerTween = null;

    // Split each quote text into words wrapped in masks
    quoteItems.forEach(quote => {
      const text = quote.textContent.trim();
      const words = text.split(/\s+/);
      quote.innerHTML = words.map(word => 
        `<span class="word-wrapper" style="display: inline-block; overflow: hidden; vertical-align: bottom; padding-bottom: 4px; margin-bottom: -4px;">` +
        `<span class="word" style="display: inline-block;">${word}</span>` +
        `</span>`
      ).join(' ');
    });

    // Show/hide fixed overlays when hero section leaves the viewport
    const heroVisibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const vis = entry.isIntersecting;
        if (quoteOuter)    { quoteOuter.style.opacity    = vis ? '1' : '0'; quoteOuter.style.transition    = 'opacity 0.4s'; }
        if (controlsOuter) { controlsOuter.style.opacity = vis ? '1' : '0'; controlsOuter.style.transition = 'opacity 0.4s'; controlsOuter.style.pointerEvents = vis ? 'auto' : 'none'; }
        // Pause / resume timer when hero goes off screen
        if (!vis && timerTween) timerTween.pause();
        if (vis  && timerTween) timerTween.resume();
      });
    }, { threshold: 0.05 });
    heroVisibilityObserver.observe(heroCarouselSection);

    // Set initial states — DO NOT use x offset on cards; they are fixed-position,
    // so GSAP translateX on the card elements themselves breaks the carousel.
    gsap.set(bgSlides,    { opacity: 0, zIndex: 0 });
    gsap.set(quoteItems,  { opacity: 0 });
    if (timerBar)      gsap.set(timerBar,      { width: '0%' });
    if (quoteOuter)    gsap.set(quoteOuter,    { opacity: 0 });
    if (controlsOuter) gsap.set(controlsOuter, { opacity: 0 });
    // Pre-set wrapper translateX to 0 via GSAP so it owns the transform
    if (wrapper) gsap.set(wrapper, { x: 0 });

    // Simple fade-in entry — no x translation on individual cards
    const heroTimeline = gsap.timeline({
      onComplete: () => updateCarousel(0)
    });
    window.heroTimeline = heroTimeline;
    heroTimeline
      .to([quoteOuter, controlsOuter], { opacity: 1, duration: 0.6, ease: 'power2.out' });

    // Unified Update Function
    function updateCarousel(idx) {
      const isInitial = (activeIdx === -1);
      if (idx === activeIdx) return;
      activeIdx = idx;

      // 1. Background slideshow cross-fade
      bgSlides.forEach((slide, sIdx) => {
        gsap.to(slide, {
          opacity: sIdx === idx ? 1 : 0,
          zIndex:  sIdx === idx ? 10 : 0,
          duration: isInitial ? 0 : 0.9,
          ease: 'power2.inOut'
        });
      });

      // 2. Quote transition (Masked Word Reveal)
      quoteItems.forEach((quote, qIdx) => {
        const words = quote.querySelectorAll('.word');
        if (qIdx === idx) {
          gsap.killTweensOf(quote);
          gsap.killTweensOf(words);
          gsap.set(quote, { opacity: 1, y: 0, pointerEvents: 'auto' });
          
          if (isInitial) {
            gsap.set(words, { yPercent: 0, opacity: 1 });
          } else {
            gsap.fromTo(words, 
              { yPercent: 105, opacity: 0 }, 
              { 
                yPercent: 0, 
                opacity: 1, 
                duration: 0.85, 
                stagger: 0.08, 
                ease: 'power3.out' 
              }
            );
          }
        } else {
          gsap.killTweensOf(quote);
          gsap.killTweensOf(words);
          gsap.to(quote, { 
            opacity: 0, 
            y: -12, 
            duration: 0.35, 
            ease: 'power2.in',
            onComplete: () => {
              gsap.set(words, { yPercent: 105, opacity: 0 });
            }
          });
        }
      });

      // 3. Card carousel — translate only the WRAPPER (not individual cards)
      // Cards are w-[110px], gap-3 = 12px
      const cardWidth = 110;
      const gap = 12;
      gsap.to(wrapper, { x: -idx * (cardWidth + gap), duration: 0.55, ease: 'power2.out' });

      // 4. Active card highlight (scale + border only — no text/underline)
      cards.forEach((card, cIdx) => {
        const img = card.querySelector('img');
        if (cIdx === idx) {
          gsap.to(card, { scale: 1.06, borderColor: 'transparent', duration: 0.35, ease: 'power2.out' });
          card.classList.add('active-card');
          if (img) gsap.to(img, { opacity: 1, duration: 0.35 });
        } else {
          gsap.to(card, { scale: 0.95, borderColor: 'transparent', duration: 0.35, ease: 'power2.out' });
          card.classList.remove('active-card');
          if (img) gsap.to(img, { opacity: 0.55, duration: 0.35 });
        }
      });

      // 5. Timer Bar — 7 second autoplay
      if (timerTween) timerTween.kill();
      if (timerBar) {
        gsap.set(timerBar, { width: '0%' });
        timerTween = gsap.to(timerBar, {
          width: '100%',
          duration: 7,
          ease: 'none',
          onComplete: () => updateCarousel((activeIdx + 1) % total)
        });
      }
    }

    // Card click handlers
    cards.forEach((card, idx) => card.addEventListener('click', () => updateCarousel(idx)));

    // Arrow navigation
    if (prevBtn) prevBtn.addEventListener('click', () => updateCarousel((activeIdx - 1 + total) % total));
    if (nextBtn) nextBtn.addEventListener('click', () => updateCarousel((activeIdx + 1) % total));

    // Hover & Drag interactions for showing/hiding stacked preview cards
    const cardsContainer = document.getElementById('hero-cards-container');
    if (cardsContainer && controlsOuter) {
      let dragShowTimeout = null;

      const showCards = () => {
        if (dragShowTimeout) {
          clearTimeout(dragShowTimeout);
          dragShowTimeout = null;
        }
        cardsContainer.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
        cardsContainer.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
      };

      const hideCards = () => {
        cardsContainer.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        cardsContainer.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
      };

      // Hover on controls outer (arrows/timer bar area) to reveal cards
      controlsOuter.addEventListener('mouseenter', showCards);
      controlsOuter.addEventListener('mouseleave', () => {
        if (!dragShowTimeout) {
          hideCards();
        }
      });

      // Drag detection variables
      let isDragging = false;
      let startX = 0;
      let startY = 0;

      // Track drag on the slideshow background to reveal cards temporarily
      heroCarouselSection.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return; // Only track left clicks
        isDragging = false;
        startX = e.clientX;
        startY = e.clientY;
      });

      heroCarouselSection.addEventListener('mousemove', (e) => {
        if (e.buttons === 1) { // Left mouse button is down
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;
          if (Math.sqrt(dx * dx + dy * dy) > 8) {
            isDragging = true;
            showCards();
          }
        }
      });

      heroCarouselSection.addEventListener('mouseup', () => {
        if (isDragging) {
          if (dragShowTimeout) clearTimeout(dragShowTimeout);
          dragShowTimeout = setTimeout(() => {
            dragShowTimeout = null;
            if (!controlsOuter.matches(':hover')) {
              hideCards();
            }
          }, 4000);
        }
      });

      // Touch drag support for mobile
      heroCarouselSection.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      }, { passive: true });

      heroCarouselSection.addEventListener('touchmove', (e) => {
        const dx = e.touches[0].clientX - startX;
        const dy = e.touches[0].clientY - startY;
        if (Math.sqrt(dx * dx + dy * dy) > 8) {
          showCards();
          if (dragShowTimeout) clearTimeout(dragShowTimeout);
          dragShowTimeout = setTimeout(() => {
            dragShowTimeout = null;
            hideCards();
          }, 4000);
        }
      }, { passive: true });
    }
  }

  // 3b. Garments Page Hero 3D Scroll Animations
  const garmentsHeroSection = document.querySelector('.garments-hero-section');
  const garmentsHeroBg = document.querySelector('.garments-hero-bg');
  const garmentsHeroContent = document.querySelector('.garments-hero-content');

  if (garmentsHeroSection && garmentsHeroBg && garmentsHeroContent) {
    gsap.timeline({
      scrollTrigger: {
        trigger: garmentsHeroSection,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      }
    })
    .to(garmentsHeroContent, {
      z: 500,
      opacity: 0,
      ease: 'none'
    }, 0)
    .to(garmentsHeroBg, {
      scale: 1.15,
      y: 100,
      ease: 'none'
    }, 0);
  }

  // 4. Perspective Section Entry Reveals
  const sections3D = document.querySelectorAll('.perspective-container > section');
  sections3D.forEach(section => {
    gsap.fromTo(section, 
      {
        rotationX: 12,
        z: -120,
        opacity: 0
      },
      {
        rotationX: 0,
        z: 0,
        opacity: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'top 55%',
          scrub: 1,
          invalidateOnRefresh: true,
        }
      }
    );
  });

  // 5. Director Cards 3D entry Y-rotation & interactive mouse tilt
  const directorCard = document.getElementById('director-card-3d');

  if (directorCard) {
    gsap.fromTo(directorCard,
      { rotationY: 20, z: -80, opacity: 0 },
      {
        rotationY: 0,
        z: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: directorCard,
          start: 'top 95%',
          end: 'top 65%',
          scrub: 1,
        }
      }
    );
  }

  // 3D card tilt effect on hover
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xPercent = (x / rect.width) - 0.5;
      const yPercent = (y / rect.height) - 0.5;
      
      const rotateY = xPercent * 16;  // up to 16deg Y tilt
      const rotateX = -yPercent * 16; // up to 16deg X tilt
      
      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1200,
        ease: 'power1.out',
        duration: 0.3,
        overwrite: 'auto'
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        ease: 'power2.out',
        duration: 0.6,
        overwrite: 'auto'
      });
    });
  });

  // 6. Staggered 3D Core Values Horizontal Loop Scroll
  const loopTrack = document.querySelector('.values-loop-track');
  if (loopTrack) {
    const originalCards = Array.from(loopTrack.children);
    
    // Clone each card to create a seamless infinite loop marquee
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.classList.remove('gsap-stagger-item'); // Remove reveal trigger from clones
      loopTrack.appendChild(clone);
    });

    // Setup infinite horizontal translation marquee
    const loopTween = gsap.to(loopTrack, {
      xPercent: -50,
      ease: 'none',
      duration: 25, // speed of marquee (seconds per cycle)
      repeat: -1,
      paused: false
    });

    // Smooth hover deceleration & acceleration
    loopTrack.addEventListener('mouseenter', () => {
      gsap.to(loopTween, { timeScale: 0.15, duration: 0.8, ease: 'power2.out' });
    });
    loopTrack.addEventListener('mouseleave', () => {
      gsap.to(loopTween, { timeScale: 1, duration: 0.8, ease: 'power2.out' });
    });

    // Reveal stagger animation on page scroll (applied to original cards only)
    gsap.fromTo(originalCards,
      {
        rotationY: 75,
        z: -100,
        opacity: 0
      },
      {
        rotationY: 0,
        z: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.9,
        ease: 'back.out(1.1)',
        scrollTrigger: {
          trigger: '.values-loop-container',
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );
  }

  // 7. Stable Sidebar & Cinematic Full-Screen Timeline Scroll Animation
  const journeySection = document.getElementById('journey-timeline-section');
  const stableYearDisplay = document.getElementById('stable-year-display');
  const stableYearProgress = document.getElementById('stable-year-progress');
  const yearItems = document.querySelectorAll('.year-item');
  const journeySlides = document.querySelectorAll('.journey-slide');

  if (journeySection && yearItems.length > 0 && journeySlides.length > 0) {
    const totalMilestones = yearItems.length;

    // Create a GSAP timeline linked to ScrollTrigger
    const journeyTL = gsap.timeline({
      scrollTrigger: {
        trigger: journeySection,
        start: "top top",
        end: () => `+=${totalMilestones * 100}%`, // Scroll height proportional to slides
        pin: true,
        scrub: 1.2, // Smooth, cinematic catch-up inertia
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Programmatically determine active index based on scroll progress
          const progress = self.progress;
          const idx = Math.min(
            Math.round(progress * (totalMilestones - 1)),
            totalMilestones - 1
          );
          updateActiveYear(idx);
        }
      }
    });

    let currentActiveIndex = -1;

    // Dynamic Year Sidebar Updating function
    function updateActiveYear(idx) {
      if (idx === currentActiveIndex) return;
      currentActiveIndex = idx;

      if (idx < 0 || idx >= journeySlides.length) return;
      const activeSlide = journeySlides[idx];
      if (!activeSlide) return;
      const activeYear = activeSlide.dataset.year;
      
      // Update active classes to manage click pointer-events
      journeySlides.forEach((slide, sIdx) => {
        if (sIdx === idx) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
      
      // Smooth fade-transition for the stable year display in the left panel
      if (stableYearDisplay && stableYearDisplay.innerText !== activeYear) {
        gsap.killTweensOf(stableYearDisplay);
        gsap.timeline()
          .to(stableYearDisplay, { opacity: 0, scale: 0.85, duration: 0.15, ease: "power2.in" })
          .call(() => { stableYearDisplay.innerText = activeYear; })
          .to(stableYearDisplay, { opacity: 1, scale: 1, duration: 0.25, ease: "power2.out" });
      }
      
      // Highlight the static timeline progress items at bottom of sidebar
      yearItems.forEach((item, itemIdx) => {
        const num = item.querySelector('.year-number');
        const dot = item.querySelector('.year-dot');
        
        if (itemIdx === idx) {
          item.classList.add('active');
          if (num) {
            num.classList.add('text-gold');
            num.classList.remove('text-gray-400', 'text-white/40');
          }
          if (dot) {
            dot.classList.add('bg-gold', 'border-gold');
            dot.classList.remove('bg-white', 'border-gray-300', 'bg-white/10', 'border-white/20');
          }
        } else {
          item.classList.remove('active');
          if (num) {
            num.classList.remove('text-gold');
            num.classList.add('text-white/40');
          }
          if (dot) {
            dot.classList.remove('bg-gold', 'border-gold');
            dot.classList.add('bg-white/5', 'border-white/20');
          }
        }
      });

      // Update vertical progress line height in sidebar
      if (stableYearProgress) {
        const progressPercentage = (idx / (totalMilestones - 1)) * 100;
        gsap.to(stableYearProgress, {
          height: `${progressPercentage}%`,
          duration: 0.3,
          ease: "power1.out"
        });
      }
    }

    // Set initial sidebar and slide states
    gsap.set(journeySlides[0], { opacity: 1, autoAlpha: 1 });
    if (journeySlides[0].querySelector('.journey-info-card')) {
      gsap.set(journeySlides[0].querySelector('.journey-info-card'), { y: 0, opacity: 1 });
    }
    updateActiveYear(0);

    // Animate the full-screen slides and white glass detail cards sequentially
    yearItems.forEach((yearItem, idx) => {
      // Skip the first one since it starts visible
      if (idx === 0) return;

      const prevIdx = idx - 1;
      const prevSlide = journeySlides[prevIdx];
      const activeSlide = journeySlides[idx];
      
      // Scroll timeline steps
      journeyTL
        // Fade out previous full-screen slide and slide-up its info card
        .to(prevSlide, { opacity: 0, autoAlpha: 0, duration: 1 }, `step-${idx}`)
        .to(prevSlide.querySelector('.journey-info-card'), { y: -30, opacity: 0, duration: 0.8 }, `step-${idx}`)
        
        // Fade and zoom in active full-screen slide background
        .fromTo(activeSlide, 
          { opacity: 0, autoAlpha: 0 },
          { opacity: 1, autoAlpha: 1, duration: 1 }, 
          `step-${idx}`
        )
        .fromTo(activeSlide.querySelector('.journey-image'),
          { scale: 1.02 },
          { scale: 1.1, duration: 1.5, ease: "power1.out" },
          `step-${idx}`
        )
        // Slide up and fade in the white info glass card overlaid on image
        .fromTo(activeSlide.querySelector('.journey-info-card'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          `step-${idx}+=0.15`
        );
    });

    // Make sidebar items clickable to jump to slide
    yearItems.forEach((item, idx) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const start = journeyTL.scrollTrigger.start;
        const end = journeyTL.scrollTrigger.end;
        const range = end - start;
        const targetScroll = start + (idx / (totalMilestones - 1)) * range;
        
        window.scrollTo({
          top: targetScroll + 2, // offset slightly to ensure registration
          behavior: 'smooth'
        });
      });
    });
  }

  // 8. Staggered Pop Animation for Trade Map Markers
  const mapSection = document.querySelector('.map-container');
  if (mapSection) {
    const markers = mapSection.querySelectorAll('.map-marker');
    gsap.fromTo(markers,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: mapSection,
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // 9. Sticky Scroll Animation for Leadership (Chairman Vision Section)
  const leadershipSection = document.getElementById('leadership-3d-section');
  if (leadershipSection && window.innerWidth >= 1024) {
    const chairmanImg = leadershipSection.querySelector('#chairman-card-3d img');
    const quoteBox = leadershipSection.querySelector('blockquote');
    const quoteSpan = quoteBox.querySelector('span');
    const customLine = leadershipSection.querySelector('.chairman-divider');
    const authorDetails = leadershipSection.querySelector('.author-details');
    const authorName = authorDetails ? authorDetails.querySelector('h3') : null;

    const leadershipTL = gsap.timeline({
      scrollTrigger: {
        trigger: leadershipSection,
        start: 'top top',
        end: '+=60%',
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
      }
    });

    // Set initial states for clean color transition and quick line reveal
    gsap.set(quoteBox, { color: '#9ca3af' });
    if (quoteSpan) {
      gsap.set(quoteSpan, { color: '#9ca3af' });
    }
    if (customLine) {
      gsap.set(customLine, { scaleX: 0, backgroundColor: '#9ca3af', transformOrigin: "left center" });
    }
    if (authorName) {
      gsap.set(authorName, { color: '#9ca3af' });
    }
    if (authorDetails) {
      gsap.set(authorDetails, { opacity: 0, y: 15 });
    }
    
    leadershipTL
      // Quote color transitions (extremely fast, starting immediately)
      .to(quoteBox, { color: '#1f2937', duration: 0.15, ease: 'power1.out' }, 0.01)
      .to(quoteSpan, { color: '#053C8F', duration: 0.15, ease: 'power1.out' }, 0.01);

    if (customLine) {
      leadershipTL.to(customLine, { scaleX: 1, backgroundColor: '#1f2937', duration: 0.2, ease: 'power2.out' }, 0.01);
    }

    if (authorName && authorDetails) {
      leadershipTL
        .to(authorName, { color: '#111827', duration: 0.15, ease: 'power1.out' }, 0.05)
        .to(authorDetails, { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }, 0.05);
    }
  }

  // 10. Unified Tab Switcher for Our Businesses Section (No page pinning/scrolling transitions)
  const bizSection = document.getElementById('businesses-sticky-section');
  if (bizSection) {
    const panels = bizSection.querySelectorAll('.biz-slide-panel');
    const cardItems = bizSection.querySelectorAll('.biz-card-item');
    const segments = bizSection.querySelectorAll('.biz-segment');
    const totalSlides = panels.length;
    let activeIndex = 0;

    // Helper function to update active styles
    function updateActiveState(idx) {
      if (idx === activeIndex) return;
      activeIndex = idx;

      // Update card items active highlights
      cardItems.forEach((item, itemIdx) => {
        const iconWrapper = item.querySelector('.biz-icon-wrapper');
        const titleText = item.querySelector('.biz-card-title');
        const arrow = item.querySelector('.biz-card-arrow');
        const bgImg = item.querySelector('img');
        const line = item.querySelector('.biz-card-line');

        let baseClass = '';
        if (itemIdx === idx) {
          // Active state (sharp corners, solid navy outline, bright image, height is proper)
          baseClass = 'biz-card-item active relative overflow-hidden rounded-none border-2 border-transparent p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between h-[180px] group bg-black';
          if (iconWrapper) {
            iconWrapper.className = 'biz-icon-wrapper w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#053C8F] border border-gray-100 transition-all duration-300';
          }
          if (titleText) {
            titleText.className = 'biz-card-title font-heading font-extrabold text-sm text-white transition-colors';
          }
          if (arrow) {
            arrow.className = 'biz-card-arrow fa-solid fa-arrow-right text-white transition-transform group-hover:translate-x-1';
          }
          if (bgImg) {
            bgImg.className = 'absolute inset-0 w-full h-full object-cover opacity-100 pointer-events-none z-0';
          }
          if (line) {
            line.className = 'biz-card-line h-[1px] bg-white w-8 transition-all duration-300 origin-left';
          }
        } else {
          // Inactive state (sharp corners, borderless transparent spacer, dimmed image, height is proper)
          baseClass = 'biz-card-item relative overflow-hidden rounded-none border-2 border-transparent p-5 cursor-pointer transition-all duration-300 flex flex-col justify-between h-[180px] group bg-black';
          if (iconWrapper) {
            iconWrapper.className = 'biz-icon-wrapper w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400 border border-gray-100 transition-all duration-300';
          }
          if (titleText) {
            titleText.className = 'biz-card-title font-heading font-bold text-sm text-white/80 transition-colors';
          }
          if (arrow) {
            arrow.className = 'biz-card-arrow fa-solid fa-arrow-right text-white/50 transition-transform group-hover:translate-x-1';
          }
          if (bgImg) {
            bgImg.className = 'absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none z-0';
          }
          if (line) {
            line.className = 'biz-card-line h-[1px] bg-white w-0 group-hover:w-8 transition-all duration-300 origin-left';
          }
        }

        if (itemIdx === 4) {
          baseClass += ' col-span-2';
        }
        item.className = baseClass;
      });

      // Update progress segments
      segments.forEach((seg, segIdx) => {
        if (segIdx === idx) {
          seg.className = 'biz-segment w-12 h-[3px] bg-gray-900 rounded-full transition-all duration-300';
        } else {
          seg.className = 'biz-segment w-12 h-[3px] bg-gray-200 rounded-full transition-all duration-300';
        }
      });

      // Update text indicator if it exists
      const indicator = bizSection.querySelector('#biz-indicator-current');
      if (indicator) {
        indicator.textContent = String(idx + 1).padStart(2, '0');
      }
    }
    // Scroll Reveal: slide up the grid container and right slides column from bottom when section comes into view
    const bizGrid = bizSection.querySelector('.lg\\:col-span-8');
    const bizSlides = bizSection.querySelector('.lg\\:col-span-4');

    if (bizGrid) {
      gsap.fromTo(bizGrid,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bizSection,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    if (bizSlides) {
      gsap.fromTo(bizSlides,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bizSection,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // Initialize panel positions (Slide-up preparation)
    panels.forEach((panel, index) => {
      if (index !== 0) {
        gsap.set(panel, { yPercent: 100, opacity: 0, zIndex: 5 });
        panel.classList.add('invisible');
        panel.classList.remove('visible');
      } else {
        gsap.set(panel, { yPercent: 0, opacity: 1, zIndex: 10 });
        panel.classList.remove('invisible');
        panel.classList.add('visible');
      }
    });

    // Slide Switcher Function
    function showSlide(idx) {
      if (idx === activeIndex) return;

      const prevPanel = panels[activeIndex];
      const nextPanel = panels[idx];

      // Toggle visibility classes for proper rendering
      prevPanel.classList.add('invisible');
      prevPanel.classList.remove('visible');
      nextPanel.classList.remove('invisible');
      nextPanel.classList.add('visible');

      gsap.to(prevPanel, { yPercent: -100, opacity: 0, duration: 0.6, ease: "power2.out", zIndex: 5 });
      gsap.fromTo(nextPanel, 
        { yPercent: 100, opacity: 0, zIndex: 10 },
        { yPercent: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
      );

      updateActiveState(idx);
    }

    const bizUrls = [
      'real-estate.html',
      'overseas-trade.html',
      'industrial-supply.html',
      'garments.html',
      'hospitality.html'
    ];

    // Card item hover and click triggers
    cardItems.forEach((item, idx) => {
      // Hover switches preview slide
      item.addEventListener('mouseenter', () => {
        showSlide(idx);
      });

      // Click navigates to details page
      item.addEventListener('click', (e) => {
        window.location.href = bizUrls[idx];
      });
    });

    // Segment click triggers
    segments.forEach((seg, idx) => {
      seg.addEventListener('click', (e) => {
        e.preventDefault();
        showSlide(idx);
      });
    });

    // Arrow controls
    const prevBtn = bizSection.querySelector('#biz-prev-btn');
    const nextBtn = bizSection.querySelector('#biz-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const prevIdx = (activeIndex - 1 + totalSlides) % totalSlides;
        showSlide(prevIdx);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const nextIdx = (activeIndex + 1) % totalSlides;
        showSlide(nextIdx);
      });
    }
  }
});

