(function () {
  'use strict';

  const LOCATIONS = [
    {
      id: 'sea',
      label: '🌏 Southeast Asia',
      subtitle: 'Rice & Manufacturing',
      description: 'Direct imports of organic jasmine rice, spices, and export distribution of garments & textiles.',
      left: 78.48,
      top: 61.75,
      curveFactor: -0.1
    },
    {
      id: 'me',
      label: '🌍 Middle East',
      subtitle: 'Primary Distribution Hub',
      description: 'Heavy export trade of fresh seasonal vegetables, high-volume spices, and basmati grain varieties.',
      left: 65.89,
      top: 49.70,
      curveFactor: -0.15
    },
    {
      id: 'africa',
      label: '🌍 Central Africa',
      subtitle: 'Resource & Cargo',
      description: 'Distributing wholesale industrial supplies and importing raw agricultural seeds.',
      left: 55.03,
      top: 66.15,
      curveFactor: 0.15
    },
    {
      id: 'na',
      label: '🌎 North America',
      subtitle: 'USA & Canada Export',
      description: 'Exporting agricultural grains, select spices, and custom textiles to key retail markets.',
      left: 25.34,
      top: 37.32,
      curveFactor: -0.2
    },
    {
      id: 'brazil',
      label: '🇧🇷 Brazil',
      subtitle: 'Sugar & Coffee Sourcing',
      description: 'Bulk imports of high-grade sugarcane products and raw arabica coffee beans for regional channels.',
      left: 33.23,
      top: 71.72,
      curveFactor: 0.2
    },
    {
      id: 'greenland',
      label: '🇬🇱 Greenland & Iceland',
      subtitle: 'Northern Distribution',
      description: 'Sourcing high-latitude niche supplies and coordinating climate-controlled cargo logistics.',
      left: 38.47,
      top: 16.86,
      curveFactor: -0.25
    },
    {
      id: 'eurasia',
      label: '🌏 Northern Eurasia',
      subtitle: 'Eurasian Trade Routes',
      description: 'Trade routes for raw commodities, industrial hardware, and agricultural grain shipments.',
      left: 64.04,
      top: 30.37,
      curveFactor: -0.18
    },
    {
      id: 'australia',
      label: '🇦🇺 Australia',
      subtitle: 'Oceanic Logistics',
      description: 'Exporting high-quality garments, wholesale spice blends, and custom trade shipments.',
      left: 83.53,
      top: 77.48,
      curveFactor: 0.22
    }
  ];

  function init() {
    const stage = document.getElementById('stage');
    if (!stage) return;

    const svg = document.getElementById('svg-overlay');
    const pinsContainer = document.getElementById('pins-container');
    if (!svg || !pinsContainer) return;

    // Clear previous dynamic content
    pinsContainer.innerHTML = '';
    
    // Clear dynamic SVG paths/circles (preserve defs)
    const dynamicElements = svg.querySelectorAll('.route-path, .comet');
    dynamicElements.forEach(el => el.remove());

    const hqLeft = 72.54;
    const hqTop = 51.82;
    const hqX = 1920 * (hqLeft / 100);
    const hqY = 1080 * (hqTop / 100);

    LOCATIONS.forEach(loc => {
      const destX = 1920 * (loc.left / 100);
      const destY = 1080 * (loc.top / 100);

      // Midpoint
      const midX = (hqX + destX) / 2;
      const midY = (hqY + destY) / 2;

      // Vectors
      const dx = destX - hqX;
      const dy = destY - hqY;
      const len = Math.sqrt(dx * dx + dy * dy);

      // Curved control point
      const offset = len * (loc.curveFactor || 0.15);
      const px = -dy / len * offset;
      const py = dx / len * offset;
      const ctrlX = midX + px;
      const ctrlY = midY + py;

      const pathD = `M${hqX},${hqY} Q${ctrlX},${ctrlY} ${destX},${destY}`;

      // 1. Create SVG Route Path
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('id', `route-${loc.id}`);
      path.setAttribute('class', 'route-path');
      path.setAttribute('d', pathD);
      svg.appendChild(path);

      // 2. Create SVG Comet
      const comet = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      comet.setAttribute('id', `comet-${loc.id}`);
      comet.setAttribute('class', 'comet');
      comet.setAttribute('r', '4.5');
      comet.style.offsetPath = `path('${pathD}')`;
      comet.style.webkitOffsetPath = `path('${pathD}')`;
      svg.appendChild(comet);

      // 3. Create HTML Pin
      const pin = document.createElement('div');
      pin.className = 'dest';
      pin.id = `pin-${loc.id}`;
      pin.style.left = `${loc.left}%`;
      pin.style.top = `${loc.top}%`;

      const cleanLabel = loc.label.replace(/[^\w\s\(\)&]/g, '').trim();
      pin.innerHTML = `
        <div class="dest-dot"></div>
        <div class="dest-tag">${cleanLabel}</div>
      `;
      pinsContainer.appendChild(pin);
    });

    // 4. Create Tooltip DOM Element
    const tooltipEl = document.createElement('div');
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.opacity = '0';
    tooltipEl.style.background = 'rgba(255, 255, 255, 0.95)';
    tooltipEl.style.backdropFilter = 'blur(12px)';
    tooltipEl.style.webkitBackdropFilter = 'blur(12px)';
    tooltipEl.style.border = '1px solid rgba(212, 175, 55, 0.4)';
    tooltipEl.style.borderRadius = '12px';
    tooltipEl.style.padding = '12px 14px';
    tooltipEl.style.color = '#333333';
    tooltipEl.style.fontSize = '12px';
    tooltipEl.style.fontFamily = "'Montserrat', sans-serif";
    tooltipEl.style.boxShadow = '0 10px 25px -5px rgba(212, 175, 55, 0.15)';
    tooltipEl.style.zIndex = '1000';
    tooltipEl.style.width = '240px';
    tooltipEl.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
    tooltipEl.style.transform = 'translateY(8px)';
    stage.appendChild(tooltipEl);

    // 5. Tooltip Event Binding
    const allPins = [
      {
        el: document.getElementById('pin-india'),
        label: '🇮🇳 India (HQ)',
        subtitle: 'Headquarters / Origin',
        description: 'Global headquarters. Central procurement, logistics core, and major production center for grains, textiles, and real estate.'
      },
      ...LOCATIONS.map(loc => ({
        el: document.getElementById(`pin-${loc.id}`),
        label: loc.label,
        subtitle: loc.subtitle,
        description: loc.description
      }))
    ];

    allPins.forEach(pinObj => {
      if (!pinObj.el) return;

      pinObj.el.addEventListener('mouseover', () => {
        tooltipEl.innerHTML = `
          <div style="font-weight: 700; color: #C89B3C; margin-bottom: 4px; font-size: 13px;">${pinObj.label}</div>
          <div style="color: #666666; margin-bottom: 6px; font-weight: 600; font-size: 11px;">${pinObj.subtitle}</div>
          <div style="color: #444444; font-weight: 400; line-height: 1.5; font-size: 11px;">${pinObj.description}</div>
        `;
        tooltipEl.style.opacity = '1';
        tooltipEl.style.transform = 'translateY(0)';
      });

      pinObj.el.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const tooltipWidth = tooltipEl.offsetWidth || 240;
        const tooltipHeight = tooltipEl.offsetHeight || 100;
        let left = e.clientX - rect.left - tooltipWidth / 2;
        let top = e.clientY - rect.top - tooltipHeight - 15;

        // Boundaries
        if (left < 10) left = 10;
        if (left + tooltipWidth > rect.width - 10) left = rect.width - tooltipWidth - 10;
        if (top < 10) top = e.clientY - rect.top + 20;

        tooltipEl.style.left = `${left}px`;
        tooltipEl.style.top = `${top}px`;
      });

      pinObj.el.addEventListener('mouseout', () => {
        tooltipEl.style.opacity = '0';
        tooltipEl.style.transform = 'translateY(8px)';
      });
    });

    // 6. Synchronized Route and Comet Animation Loop
    function triggerAnimations() {
      const paths = svg.querySelectorAll('.route-path');
      const comets = svg.querySelectorAll('.comet');
      const destPins = pinsContainer.querySelectorAll('.dest');

      // Clear animation classes
      paths.forEach(p => p.classList.remove('draw'));
      comets.forEach(c => c.classList.remove('run'));
      destPins.forEach(d => d.classList.remove('show'));

      // Reflow to restart CSS animations
      void stage.offsetWidth;

      // Add animation classes
      paths.forEach(p => p.classList.add('draw'));
      comets.forEach(c => c.classList.add('run'));
      destPins.forEach(d => d.classList.add('show'));
    }

    // Run animation loop (4s draw animation + 2s breathing pause = 6s cycle)
    triggerAnimations();
    setInterval(triggerAnimations, 6000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
