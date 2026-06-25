document.addEventListener('DOMContentLoaded', () => {
  // 1. Desktop Cursor Glow Effect
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  // 2. Sticky Navbar & Progress Bar
  const navbar = document.getElementById('navbar');
  const scrollIndicator = document.getElementById('scroll-indicator');
  const isDarkNavbarPage = window.location.pathname.includes('garments.html') || window.location.pathname.includes('history.html');

  const handleScroll = () => {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Navbar visual transform on scroll
    if (navbar) {
      const logoImg = navbar.querySelector('#navbar-logo');
      const menuBtnIcon = document.getElementById('mobile-menu-btn');

      if (scrollPos > 50) {
        navbar.classList.remove('py-6');
        navbar.classList.add('py-2');
        
        if (isDarkNavbarPage) {
          // Dark background, white text, white logo for garments and history pages
          navbar.classList.add('backdrop-blur-md', 'border-b', 'shadow-sm', 'bg-[#05050A]/95', 'border-white/5');
          navbar.classList.remove('bg-transparent', 'bg-white/95', 'bg-black/40', 'border-gray-100');
          
          if (logoImg) {
            logoImg.src = 'images/logo_white.svg';
          }
          
          navbar.querySelectorAll('nav a').forEach(a => {
            if (!a.classList.contains('text-gold')) {
              a.classList.remove('text-gray-700', 'hover:text-navy');
              a.classList.add('text-white/80', 'hover:text-white');
            }
          });
          
          if (menuBtnIcon) {
            menuBtnIcon.classList.remove('text-gray-900');
            menuBtnIcon.classList.add('text-white');
          }
        } else {
          // Standard white background on other pages
          navbar.classList.add('backdrop-blur-md', 'border-b', 'shadow-sm', 'bg-white/95', 'border-gray-100');
          navbar.classList.remove('bg-transparent', 'bg-black/40', 'border-white/5', 'bg-[#05050A]/95');
          
          if (logoImg) {
            logoImg.src = 'images/logo_black.svg';
          }
          
          navbar.querySelectorAll('nav a').forEach(a => {
            if (!a.classList.contains('text-gold')) {
              a.classList.remove('text-white/80', 'text-white', 'hover:text-white');
              a.classList.add('text-gray-700', 'hover:text-navy');
            }
          });
          
          if (menuBtnIcon) {
            menuBtnIcon.classList.remove('text-white');
            menuBtnIcon.classList.add('text-gray-900');
          }
        }
      } else {
        navbar.classList.add('bg-transparent', 'py-6');
        navbar.classList.remove('bg-white/95', 'bg-black/40', 'backdrop-blur-md', 'py-2', 'border-b', 'border-gray-100', 'border-white/5', 'shadow-sm', 'bg-[#05050A]/95');

        if (logoImg) {
          logoImg.src = 'images/logo_white.svg';
        }

        navbar.querySelectorAll('nav a').forEach(a => {
          if (!a.classList.contains('text-gold')) {
            a.classList.remove('text-gray-700', 'hover:text-navy');
            a.classList.add('text-white/80', 'hover:text-white');
          }
        });

        if (menuBtnIcon) {
          menuBtnIcon.classList.remove('text-gray-900');
          menuBtnIcon.classList.add('text-white');
        }
      }
    }

    // Scroll progress bar
    if (scrollIndicator && docHeight > 0) {
      const scrolled = (scrollPos / docHeight) * 100;
      scrollIndicator.style.width = scrolled + '%';
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // 3. Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('translate-x-0');
      if (isOpen) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        document.body.style.overflow = '';
      } else {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Close mobile menu on clicking links
  const mobileLinks = document.querySelectorAll('#mobile-menu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  // 4. Interactive Product Categories (Import Export Page)
  const categoryButtons = document.querySelectorAll('.cat-btn');
  const categoryContents = document.querySelectorAll('.cat-content');

  if (categoryButtons.length > 0) {
    categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetCategory = btn.getAttribute('data-category');

        // Toggle active button styles
        categoryButtons.forEach(b => {
          b.classList.remove('bg-orange-500', 'text-white');
          b.classList.add('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
        });
        btn.classList.remove('bg-gray-100', 'text-gray-700', 'hover:bg-gray-200');
        btn.classList.add('bg-orange-500', 'text-white');

        // Toggle category display
        categoryContents.forEach(content => {
          if (content.id === `cat-${targetCategory}`) {
            content.classList.remove('hidden');
            content.classList.add('grid');
            // Re-trigger visual animations inside elements if needed
          } else {
            content.classList.add('hidden');
            content.classList.remove('grid');
          }
        });
      });
    });
  }

  // 5. Certification Modal Popup
  const certCards = document.querySelectorAll('.cert-card');
  const certModal = document.getElementById('cert-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');

  if (certCards.length > 0 && certModal) {
    certCards.forEach(card => {
      card.addEventListener('click', () => {
        const certName = card.getAttribute('data-cert');
        const certFullName = card.querySelector('h4').textContent;
        const certText = card.querySelector('p').textContent;
        
        // Populate modal contents
        modalTitle.textContent = certFullName;
        modalDesc.textContent = `Official authentication certificate from the respective governing authority - confirming BORA GROUP's adherence to professional criteria and compliance standard: ${certText}.`;
        
        // Generate placeholder vector cert layout in modal
        modalImg.innerHTML = `
          <div class="w-full h-72 border-8 border-amber-800 bg-amber-50 flex flex-col items-center justify-between p-6 text-center text-amber-950 font-serif shadow-inner relative overflow-hidden">
            <div class="absolute -right-16 -top-16 w-48 h-48 rounded-full border-4 border-dashed border-amber-900/10 flex items-center justify-center"></div>
            <div class="absolute -left-16 -bottom-16 w-48 h-48 rounded-full border-4 border-dashed border-amber-900/10 flex items-center justify-center"></div>
            <div class="text-xs uppercase tracking-widest text-amber-700 font-sans">Certificate of Compliance</div>
            <div>
              <h3 class="text-2xl font-bold tracking-tight mb-2">${certName}</h3>
              <p class="text-xs italic text-amber-800 px-6">This document certifies that the operational divisions of BORA GROUP successfully satisfy the designated criteria and global industry guidelines.</p>
            </div>
            <div class="w-full flex justify-between items-end border-t border-amber-950/20 pt-4 font-sans text-[10px] uppercase tracking-wider text-amber-700">
              <div>BORA GROUP BOARD</div>
              <div class="w-10 h-10 rounded-full bg-amber-600/20 flex items-center justify-center text-amber-900 font-bold border-2 border-dashed border-amber-800">SEAL</div>
              <div>VERIFIED COMPLIANCE</div>
            </div>
          </div>
        `;
        
        // Show modal
        certModal.classList.remove('hidden');
        certModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      });
    });

    modalClose.addEventListener('click', () => {
      certModal.classList.add('hidden');
      certModal.classList.remove('flex');
      document.body.style.overflow = '';
    });

    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        certModal.classList.add('hidden');
        certModal.classList.remove('flex');
        document.body.style.overflow = '';
      }
    });
  }

  // 6. Interactive Real Estate Testimonial Slider
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  let currentSlide = 0;

  function showSlide(index) {
    if (slides.length === 0) return;
    
    slides.forEach((slide, i) => {
      slide.classList.add('hidden', 'opacity-0');
      slide.classList.remove('opacity-100');
    });

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.remove('hidden');
    // Subtle timeout to let display set before opacity transition
    setTimeout(() => {
      slides[currentSlide].classList.add('opacity-100');
    }, 20);
  }

  if (slides.length > 0) {
    showSlide(currentSlide);
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    }

    // Auto rotate
    setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6000);
  }

  // 7. Interactive Animated Counters
  const counterElements = document.querySelectorAll('.counter-val');
  
  if (counterElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const targetVal = parseInt(target.getAttribute('data-target'), 10);
          if (isNaN(targetVal)) return;

          const startVal = parseInt(target.getAttribute('data-start'), 10) || 0;
          const prefix = target.getAttribute('data-prefix') || '';
          const suffix = target.getAttribute('data-suffix') || '';
          const duration = 2000; // ms
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Premium quadratic ease-out curves
            const easeProgress = progress * (2 - progress);
            const currentVal = Math.floor(startVal + (easeProgress * (targetVal - startVal)));

            target.textContent = prefix + currentVal + suffix;

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              target.textContent = prefix + targetVal + suffix;
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => observer.observe(el));
  }

  // 8. Form Animations & Handlers Helper
  const setupFormHandler = (formId, successTitle, successMessage, whatsappPhone = '917304733333') => {
    const form = document.getElementById(formId);
    if (!form) return;

    // Add active animation to label focus
    const formInputs = form.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
      const parent = input.parentElement;
      
      // Initial check in case fields are pre-filled
      if (input.value) {
        parent.classList.add('border-gold');
      }

      input.addEventListener('focus', () => {
        parent.classList.add('border-gold');
      });
      input.addEventListener('blur', () => {
        if (!input.value) {
          parent.classList.remove('border-gold');
        }
      });
      input.addEventListener('change', () => {
        if (input.value) {
          parent.classList.add('border-gold');
        } else {
          parent.classList.remove('border-gold');
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Grab all field inputs for WhatsApp transmission
      let formDetails = `*${successTitle.toUpperCase()}*\n\n`;
      formInputs.forEach(input => {
        const labelText = input.previousElementSibling ? input.previousElementSibling.textContent.trim() : input.id;
        if (input.value && labelText) {
          formDetails += `• *${labelText}*: ${input.value}\n`;
        }
      });

      // Show Premium Success Message Overlay
      const successOverlay = document.createElement('div');
      successOverlay.className = 'fixed inset-0 bg-[#05050A]/95 z-[9999] flex items-center justify-center p-6 text-center';
      successOverlay.innerHTML = `
        <div class="glass-panel-dark max-w-md w-full p-8 rounded-2xl border border-gold/20 flex flex-col items-center">
          <div class="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-[#C5A880]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="font-heading text-xl text-white font-bold mb-3">${successTitle}</h3>
          <p class="text-gray-400 text-xs mb-6 leading-relaxed">${successMessage}</p>
          <div class="flex flex-col sm:flex-row gap-4 w-full">
            <button id="whatsapp-submit" class="btn-premium-gold w-full text-[10px] flex items-center justify-center gap-2 py-3">
              <i class="fa-brands fa-whatsapp text-sm"></i> Send on WhatsApp
            </button>
            <button id="close-success" class="btn-premium-outline hover:!border-gold w-full text-[10px] py-3">Close</button>
          </div>
        </div>
      `;
      document.body.appendChild(successOverlay);
      document.body.style.overflow = 'hidden';

      // WhatsApp Handler
      document.getElementById('whatsapp-submit').addEventListener('click', () => {
        const waUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(formDetails)}`;
        window.open(waUrl, '_blank');
        successOverlay.remove();
        document.body.style.overflow = '';
        form.reset();
        formInputs.forEach(input => {
          input.parentElement.classList.remove('border-gold');
        });
      });

      // Close Button Handler
      document.getElementById('close-success').addEventListener('click', () => {
        successOverlay.remove();
        document.body.style.overflow = '';
        form.reset();
        formInputs.forEach(input => {
          input.parentElement.classList.remove('border-gold');
        });
      });
    });
  };

  // Initialize Handlers for all Forms
  setupFormHandler('contact-form', 'Inquiry Transmitted', 'Thank you for contacting BORA GROUP. Your corporate inquiry has been routed to our corporate relations desk. A representative will respond within one business day.');
  setupFormHandler('enquiry-export-form', 'Export Quote Request', 'Thank you for your bulk export specification request. Our Overseas Trade Desk has received your request. We will review port logistics and pricing metrics immediately.');
  setupFormHandler('enquiry-real-estate-form', 'Property Enquiry Received', 'Thank you for your interest in BORA GROUP Real Estate. Your property consultation request has been logged. Our sales coordinates will verify schedule options for your site visit.');
  setupFormHandler('enquiry-industrial-form', 'Industrial Supply Inquiry', 'Your industrial supply quote request has been transmitted. Our technical sourcing desk will check material listings, quantities, and lead times to compile a proposal.');
  setupFormHandler('enquiry-garments-form', 'Textile & Garment Inquiry', 'Thank you for your apparel sourcing request. Our textile division has logged your categories, branding requirements, and bulk count metrics. We will contact you soon.');
  setupFormHandler('enquiry-hotel-form', 'Hotel Booking Request', 'Your reservation request at Hotel Divya Palace has been compiled. Our front desk coordinator will confirm room/venue availability and secure check-in arrangements.');


  // 9. Mobile Navigation Accordion Dropdowns
  const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
  mobileDropdownBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('i');
      
      // Close all other open dropdowns for a clean accordion effect
      mobileDropdownBtns.forEach(otherBtn => {
        if (otherBtn !== btn) {
          const otherContent = otherBtn.nextElementSibling;
          const otherIcon = otherBtn.querySelector('i');
          if (otherContent) {
            otherContent.style.maxHeight = null;
          }
          if (otherIcon) {
            otherIcon.classList.remove('rotate-180');
          }
        }
      });

      // Toggle current accordion height
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        if (icon) icon.classList.remove('rotate-180');
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });

  // 10. Direct Reviews Hash Selector
  const handleReviewsTab = () => {
    if (window.location.hash === '#reviews') {
      const toggleReviews = document.getElementById('toggle-reviews');
      if (toggleReviews) {
        toggleReviews.click();
      }
    }
  };
  window.addEventListener('hashchange', handleReviewsTab);
  setTimeout(handleReviewsTab, 200);

  // 11. Real Estate Projects Carousel
  const projectsTrack = document.getElementById('projects-carousel-track');
  const projectCards = document.querySelectorAll('.project-card-slide');
  const prevProjectBtn = document.getElementById('prev-project');
  const nextProjectBtn = document.getElementById('next-project');
  const projectDotsContainer = document.getElementById('projects-carousel-dots');

  if (projectsTrack && projectCards.length > 0) {
    let currentIndex = 0;
    let itemsPerView = window.innerWidth >= 1024 ? 2 : 1;
    let maxIndex = Math.max(0, projectCards.length - itemsPerView);
    let autoplayTimer = null;

    function getItemsPerView() {
      return window.innerWidth >= 1024 ? 2 : 1;
    }

    function setupDots() {
      if (!projectDotsContainer) return;
      projectDotsContainer.innerHTML = '';
      itemsPerView = getItemsPerView();
      maxIndex = Math.max(0, projectCards.length - itemsPerView);
      
      const numDots = maxIndex + 1;
      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('button');
        dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-gold w-6' : 'bg-gray-300 hover:bg-gold/50'}`;
        dot.setAttribute('aria-label', `Go to project slide ${i + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoplay();
        });
        projectDotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      itemsPerView = getItemsPerView();
      maxIndex = Math.max(0, projectCards.length - itemsPerView);
      
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }
      if (currentIndex < 0) {
        currentIndex = 0;
      }

      const percentage = (currentIndex * 100) / itemsPerView;
      projectsTrack.style.transform = `translateX(-${percentage}%)`;

      // Update dots styling
      const dots = projectDotsContainer.querySelectorAll('button');
      dots.forEach((dot, i) => {
        if (i === currentIndex) {
          dot.classList.remove('bg-gray-300', 'hover:bg-gold/50', 'w-2');
          dot.classList.add('bg-gold', 'w-6');
        } else {
          dot.classList.remove('bg-gold', 'w-6');
          dot.classList.add('bg-gray-300', 'hover:bg-gold/50', 'w-2');
        }
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    function nextSlide() {
      itemsPerView = getItemsPerView();
      maxIndex = Math.max(0, projectCards.length - itemsPerView);
      if (currentIndex >= maxIndex) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }
      updateCarousel();
    }

    function prevSlide() {
      itemsPerView = getItemsPerView();
      maxIndex = Math.max(0, projectCards.length - itemsPerView);
      if (currentIndex <= 0) {
        currentIndex = maxIndex;
      } else {
        currentIndex--;
      }
      updateCarousel();
    }

    if (nextProjectBtn) {
      nextProjectBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    if (prevProjectBtn) {
      prevProjectBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    function startAutoplay() {
      stopAutoplay();
      autoplayTimer = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function resetAutoplay() {
      startAutoplay();
    }

    // Resize handling
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const prevItems = itemsPerView;
        itemsPerView = getItemsPerView();
        if (prevItems !== itemsPerView) {
          setupDots();
          updateCarousel();
        }
      }, 100);
    });

    setupDots();
    updateCarousel();
    startAutoplay();
  }

  // 13. History Page Hero Slideshow
  const historyHeroSlides = document.querySelectorAll('.history-hero-slide');
  if (historyHeroSlides.length > 0) {
    let currentHeroSlide = 0;
    setInterval(() => {
      historyHeroSlides[currentHeroSlide].classList.remove('opacity-100');
      historyHeroSlides[currentHeroSlide].classList.add('opacity-0');
      currentHeroSlide = (currentHeroSlide + 1) % historyHeroSlides.length;
      historyHeroSlides[currentHeroSlide].classList.remove('opacity-0');
      historyHeroSlides[currentHeroSlide].classList.add('opacity-100');
    }, 3000);
  }

  // 14. Garments Page Hero Slideshow
  const garmentsHeroSlides = document.querySelectorAll('.garments-hero-slide');
  if (garmentsHeroSlides.length > 0) {
    let currentGarmentsHeroSlide = 0;
    setInterval(() => {
      garmentsHeroSlides[currentGarmentsHeroSlide].classList.remove('opacity-100');
      garmentsHeroSlides[currentGarmentsHeroSlide].classList.add('opacity-0');
      currentGarmentsHeroSlide = (currentGarmentsHeroSlide + 1) % garmentsHeroSlides.length;
      garmentsHeroSlides[currentGarmentsHeroSlide].classList.remove('opacity-0');
      garmentsHeroSlides[currentGarmentsHeroSlide].classList.add('opacity-100');
    }, 3000);
  }

});

