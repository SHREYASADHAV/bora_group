// BORA GROUP — GSAP Scroll & Parallax Animations

document.addEventListener('DOMContentLoaded', () => {
  // Gracefully verify GSAP availability
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn("GSAP or ScrollTrigger CDN resources are offline. Falling back to CSS transitions.");
    
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

  // 2. Cinematic Hero Entry (Fade + Blur Reveal)
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroText = document.querySelector('.hero-text');
  const heroCTAs = document.querySelector('.hero-ctas');

  const hasTradePreloader = document.getElementById('trade-loader') !== null;
  const heroTimeline = gsap.timeline({ paused: hasTradePreloader });
  window.heroTimeline = heroTimeline;

  if (heroTitle) {
    heroTimeline.fromTo(heroTitle, 
      { opacity: 0, y: 50, filter: 'blur(10px)' }, 
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: "power3.out" }
    );
  }
  if (heroSubtitle) {
    heroTimeline.fromTo(heroSubtitle, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      "-=0.8"
    );
  }
  if (heroText) {
    heroTimeline.fromTo(heroText, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      "-=0.6"
    );
  }
  if (heroCTAs) {
    heroTimeline.fromTo(heroCTAs, 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      "-=0.6"
    );
  }

  // 3. Homepage 3D Scroll Animations
  const heroContent3D = document.querySelector('.hero-content-3d');
  const splineContainer = document.querySelector('.hero-spline-container');

  if (heroContent3D && splineContainer) {
    gsap.timeline({
      scrollTrigger: {
        trigger: 'section.perspective-container', // Hero section
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      }
    })
    .to(heroContent3D, {
      z: 600,
      opacity: 0,
      ease: 'none'
    }, 0)
    .to(splineContainer, {
      scale: 0.8,
      opacity: 0.1,
      ease: 'none'
    }, 0);
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
  const chairmanCard = document.getElementById('chairman-card-3d');
  const directorCard = document.getElementById('director-card-3d');

  if (chairmanCard) {
    gsap.fromTo(chairmanCard,
      { rotationY: -20, z: -80, opacity: 0 },
      {
        rotationY: 0,
        z: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: chairmanCard,
          start: 'top 95%',
          end: 'top 65%',
          scrub: 1,
        }
      }
    );
  }

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

  // 6. Staggered 3D Core Values Y-Axis flip
  const valueCards = document.querySelectorAll('.value-card-3d');
  if (valueCards.length > 0) {
    gsap.fromTo(valueCards,
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
          trigger: '.gsap-stagger-container',
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
});

