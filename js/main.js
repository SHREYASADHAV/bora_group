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

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
            // Navbar visual transform on scroll
    if (navbar) {
      if (scrollPos > 50) {
        navbar.classList.remove('bg-transparent', 'py-6');
        navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'py-4', 'border-b', 'border-gray-100', 'shadow-sm');
        
        // Update brand logo image to black version
        const logoImg = navbar.querySelector('#navbar-logo');
        if (logoImg) {
          logoImg.src = 'images/logo_black.png';
        }

        // Update nav links to gray and brand blue
        navbar.querySelectorAll('nav a').forEach(a => {
          if (!a.classList.contains('text-gold')) {
            a.classList.remove('text-white/80', 'text-white');
            a.classList.add('text-gray-700', 'hover:text-navy');
          }
        });

        // Update mobile menu icon
        const menuBtnIcon = document.getElementById('mobile-menu-btn');
        if (menuBtnIcon) {
          menuBtnIcon.classList.remove('text-white');
          menuBtnIcon.classList.add('text-gray-900');
        }
      } else {
        navbar.classList.add('bg-transparent', 'py-6');
        navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'py-4', 'border-b', 'border-gray-100', 'shadow-sm');

        // Restore brand logo image to white version
        const logoImg = navbar.querySelector('#navbar-logo');
        if (logoImg) {
          logoImg.src = 'images/logo_white.png';
        }

        navbar.querySelectorAll('nav a').forEach(a => {
          if (!a.classList.contains('text-gold')) {
            a.classList.remove('text-gray-700', 'hover:text-navy');
            a.classList.add('text-white/80');
          }
        });

        const menuBtnIcon = document.getElementById('mobile-menu-btn');
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
  });

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
          const duration = 2000; // ms
          const stepTime = Math.abs(Math.floor(duration / targetVal));
          let currentVal = 0;
          
          const timer = setInterval(() => {
            currentVal += 1;
            target.textContent = currentVal + (target.getAttribute('data-suffix') || '');
            if (currentVal >= targetVal) {
              target.textContent = targetVal + (target.getAttribute('data-suffix') || '');
              clearInterval(timer);
            }
          }, stepTime);
          
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    counterElements.forEach(el => observer.observe(el));
  }

  // 8. Contact Form Animations & Handlers
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    // Add active animation to label focus
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      const parent = input.parentElement;
      input.addEventListener('focus', () => {
        parent.classList.add('border-gold');
      });
      input.addEventListener('blur', () => {
        if (!input.value) {
          parent.classList.remove('border-gold');
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Luxury Success Message Overlay
      const successOverlay = document.createElement('div');
      successOverlay.className = 'fixed inset-0 bg-[#05050A]/95 z-50 flex items-center justify-center p-6 text-center';
      successOverlay.innerHTML = `
        <div class="glass-panel-dark max-w-md w-full p-8 rounded-2xl border border-gold/20 flex flex-col items-center">
          <div class="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mb-6">
            <svg class="w-8 h-8 text-[#C5A880]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 class="font-heading text-2xl text-white font-bold mb-3">Message Received</h3>
          <p class="text-gray-400 text-sm mb-6 leading-relaxed">Thank you for contacting BORA GROUP. Your corporate inquiry has been routed to our corporate relations desk. A representative will respond within one business day.</p>
          <button id="close-success" class="btn-premium-gold w-full text-xs">Return to Page</button>
        </div>
      `;
      document.body.appendChild(successOverlay);
      document.body.style.overflow = 'hidden';

      document.getElementById('close-success').addEventListener('click', () => {
        successOverlay.remove();
        document.body.style.overflow = '';
        contactForm.reset();
      });
    });
  }

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


});

