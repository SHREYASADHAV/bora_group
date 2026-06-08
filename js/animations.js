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

  // 2. Cinematic Hero Entry (Fade + Blur Reveal)
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroText = document.querySelector('.hero-text');
  const heroCTAs = document.querySelector('.hero-ctas');

  const heroTimeline = gsap.timeline();

  if (heroTitle) {
    heroTimeline.fromTo(heroTitle, 
      { opacity: 0, y: 50, filter: 'blur(10px)' }, 
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' }
    );
  }

  if (heroSubtitle) {
    heroTimeline.fromTo(heroSubtitle,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );
  }

  if (heroText) {
    heroTimeline.fromTo(heroText,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );
  }

  if (heroCTAs) {
    heroTimeline.fromTo(heroCTAs,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.4'
    );
  }

  // 3. Smooth Parallax Scrolling Banners
  const parallaxBgs = document.querySelectorAll('.parallax-bg');
  parallaxBgs.forEach(bg => {
    gsap.to(bg, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: bg.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // 4. Reveal sections on scroll (Fade and Lift)
  const scrollReveals = document.querySelectorAll('.gsap-reveal');
  scrollReveals.forEach(element => {
    gsap.fromTo(element, 
      { opacity: 0, y: 60, filter: 'blur(4px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // 5. Staggered reveal for grid items, core values, certifications, project cards
  const gridStaggers = document.querySelectorAll('.gsap-stagger-container');
  gridStaggers.forEach(container => {
    const children = container.querySelectorAll('.gsap-stagger-item');
    if (children.length > 0) {
      gsap.fromTo(children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
  });

  // 6. Floating Image Collage (Intro History Section)
  const collageImgs = document.querySelectorAll('.history-collage-img');
  collageImgs.forEach((img, index) => {
    gsap.to(img, {
      y: () => index % 2 === 0 ? 15 : -15,
      x: () => index % 3 === 0 ? 10 : -10,
      rotation: () => index % 2 === 0 ? 2 : -2,
      duration: 4 + index,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  });

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
          num.classList.add('text-gold', 'scale-110');
          num.classList.remove('text-gray-400');
          dot.classList.add('bg-gold', 'border-gold', 'scale-110');
          dot.classList.remove('bg-white', 'border-gray-300');
        } else {
          num.classList.remove('text-gold', 'scale-110');
          num.classList.add('text-gray-400');
          dot.classList.remove('bg-gold', 'border-gold', 'scale-110');
          dot.classList.add('bg-white', 'border-gray-300');
        }
      });

      // Update vertical progress line height
      if (stableYearProgress) {
        stableYearProgress.style.height = `${((idx + 1) / totalMilestones) * 100}%`;
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

    // Make static year progress indicators clickable to jump timeline
    yearItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
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

  // 7. Interactive Magnetic Hover effect for buttons
  const magneticBtns = document.querySelectorAll('.btn-premium-gold, .btn-premium-outline, .btn-premium-navy, .btn-premium-orange');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const bound = btn.getBoundingClientRect();
      const x = e.clientX - bound.left - (bound.width / 2);
      const y = e.clientY - bound.top - (bound.height / 2);
      
      // Pull button slightly towards mouse
      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      // Return button to center
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });

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
