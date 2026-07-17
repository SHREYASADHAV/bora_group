(function () {
  'use strict';

  const LOCATIONS = [
    {
      id: 'india',
      label: '🇮🇳 India (HQ)',
      subtitle: 'Headquarters / Origin',
      description: 'Global headquarters. Central procurement, logistics core, and major production center for grains, textiles, and real estate.',
      lat: 20.5937,
      lng: 78.9629,
      isHQ: true
    },
    {
      id: 'sea',
      label: '🌏 Southeast Asia',
      subtitle: 'Singapore Hub',
      description: 'Direct imports of organic jasmine rice, spices, and export distribution of garments & textiles.',
      lat: 1.3521,
      lng: 103.8198
    },
    {
      id: 'me',
      label: '🌍 Middle East',
      subtitle: 'UAE Distribution Hub',
      description: 'Heavy export trade of fresh seasonal vegetables, high-volume spices, and basmati grain varieties.',
      lat: 24.4539,
      lng: 54.3773
    },
    {
      id: 'africa',
      label: '🌍 Central Africa',
      subtitle: 'Kenya Resource & Cargo',
      description: 'Distributing wholesale industrial supplies and importing raw agricultural seeds.',
      lat: -1.2921,
      lng: 36.8219
    },
    {
      id: 'na',
      label: '🌎 North America',
      subtitle: 'New York Export',
      description: 'Exporting agricultural grains, select spices, and custom textiles to key retail markets.',
      lat: 40.7128,
      lng: -74.0060
    },
    {
      id: 'brazil',
      label: '🇧🇷 Brazil',
      subtitle: 'São Paulo Sourcing',
      description: 'Bulk imports of high-grade sugarcane products and raw arabica coffee beans for regional channels.',
      lat: -23.5505,
      lng: -46.6333
    },
    {
      id: 'greenland',
      label: '🇬🇱 Greenland & Iceland',
      subtitle: 'Reykjavík Logistics',
      description: 'Sourcing high-latitude niche supplies and coordinating climate-controlled cargo logistics.',
      lat: 64.1466,
      lng: -21.9426
    },
    {
      id: 'eurasia',
      label: '🌏 Northern Eurasia',
      subtitle: 'Novosibirsk Trade Routes',
      description: 'Trade routes for raw commodities, industrial hardware, and agricultural grain shipments.',
      lat: 55.0084,
      lng: 82.9357
    },
    {
      id: 'australia',
      label: '🇦🇺 Australia',
      subtitle: 'Sydney Logistics',
      description: 'Exporting high-quality garments, wholesale spice blends, and custom trade shipments.',
      lat: -33.8688,
      lng: 151.2093
    }
  ];

  // Standard Equirectangular projection matching the world_map_detailed.png image (2:1 aspect ratio)
  const projection = d3.geoEquirectangular()
    .scale(1200 / (2 * Math.PI))
    .translate([600, 300]);

  function init() {
    const container = document.getElementById('stage');
    if (!container) return;

    // Clear previous SVG overlays but preserve the backdrop image and color overlay
    container.querySelectorAll('svg').forEach(el => el.remove());
    container.style.position = 'relative';

    // 1. Create Tooltip DOM Element (frosted glass style)
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
    container.appendChild(tooltipEl);

    // 2. Setup D3 SVG Canvas with 'overlay' class to absolute-position it over the image
    const svg = d3.select(container)
      .append('svg')
      .attr('class', 'overlay')
      .attr('width', 1200)
      .attr('height', 600)
      .attr('viewBox', '0 0 1200 600')
      .style('width', '100%')
      .style('height', 'auto')
      .style('display', 'block')
      .style('background', 'transparent');

    const defs = svg.append('defs');

    // Route Gradient (Gold fade out)
    const routeGrad = defs.append('linearGradient')
      .attr('id', 'routeGrad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');
    routeGrad.append('stop').attr('offset', '0%').attr('stop-color', '#ffd166').attr('stop-opacity', '0.85');
    routeGrad.append('stop').attr('offset', '100%').attr('stop-color', '#ff9f1c').attr('stop-opacity', '0.3');

    // Dot Gradient matching radial-gradient(circle at 35% 30%, #fff6d8, #ffd166 55%, #b3801a 100%)
    const dotGrad = defs.append('radialGradient')
      .attr('id', 'dotGrad')
      .attr('cx', '35%')
      .attr('cy', '30%')
      .attr('r', '75%');
    dotGrad.append('stop').attr('offset', '0%').attr('stop-color', '#fff6d8');
    dotGrad.append('stop').attr('offset', '55%').attr('stop-color', '#ffd166');
    dotGrad.append('stop').attr('offset', '100%').attr('stop-color', '#b3801a');

    // Backdrop image is loaded statically in HTML and overlayed by svg.overlay

    const hq = LOCATIONS.find(l => l.isHQ);
    const hqPoint = projection([hq.lng, hq.lat]);

    // Layers groups
    const routesG = svg.append('g').attr('id', 'routes-layer');
    const particlesG = svg.append('g').attr('id', 'particles-layer');
    const markersG = svg.append('g').attr('id', 'markers-layer');

    // Register MotionPathPlugin with GSAP
    if (typeof gsap !== 'undefined' && typeof MotionPathPlugin !== 'undefined') {
      gsap.registerPlugin(MotionPathPlugin);
    }

    // Master GSAP Timeline for synchronized 4s loops
    const masterTimeline = gsap.timeline({ repeat: -1 });

    LOCATIONS.forEach((loc, index) => {
      const p = projection([loc.lng, loc.lat]);
      if (!p) return;

      const markerGroup = markersG.append('g')
        .attr('class', 'map-marker')
        .attr('style', 'cursor: pointer;')
        .on('mouseover', function (e) {
          tooltipEl.innerHTML = `
            <div style="font-weight: 700; color: #C89B3C; margin-bottom: 4px; font-size: 13px;">${loc.label}</div>
            <div style="color: #666666; margin-bottom: 6px; font-weight: 600; font-size: 11px;">${loc.subtitle}</div>
            <div style="color: #444444; font-weight: 400; line-height: 1.5; font-size: 11px;">${loc.description}</div>
          `;
          tooltipEl.style.opacity = '1';
          tooltipEl.style.transform = 'translateY(0)';
        })
        .on('mousemove', function (e) {
          const rect = container.getBoundingClientRect();
          const tooltipWidth = tooltipEl.offsetWidth || 240;
          const tooltipHeight = tooltipEl.offsetHeight || 100;
          let left = e.clientX - rect.left - tooltipWidth / 2;
          let top = e.clientY - rect.top - tooltipHeight - 15;

          // Boundary checks
          if (left < 10) left = 10;
          if (left + tooltipWidth > rect.width - 10) left = rect.width - tooltipWidth - 10;
          if (top < 10) top = e.clientY - rect.top + 20;

          tooltipEl.style.left = left + 'px';
          tooltipEl.style.top = top + 'px';
        })
        .on('mouseout', function () {
          tooltipEl.style.opacity = '0';
          tooltipEl.style.transform = 'translateY(8px)';
        });

      if (loc.isHQ) {
        // Pulse animation for HQ
        const hqPulse = markerGroup.append('circle')
          .attr('cx', p[0])
          .attr('cy', p[1])
          .attr('r', '5')
          .attr('fill', 'none')
          .attr('stroke', '#ffd166')
          .attr('stroke-width', '1.5');

        markerGroup.append('circle')
          .attr('cx', p[0])
          .attr('cy', p[1])
          .attr('r', '6')
          .attr('fill', 'url(#dotGrad)')
          .attr('stroke', '#ffffff')
          .attr('stroke-width', '1.5');

        gsap.fromTo(hqPulse.node(),
          { attr: { r: 5 }, opacity: 0.9 },
          { attr: { r: 24 }, opacity: 0, duration: 2, repeat: -1, ease: 'power2.out' }
        );
      } else {
        // Destination Dot: solid gold circle with solid white stroke
        const destDot = markerGroup.append('circle')
          .attr('id', `marker-${loc.id}`)
          .attr('cx', p[0])
          .attr('cy', p[1])
          .attr('r', '4.5')
          .attr('fill', 'url(#dotGrad)')
          .attr('stroke', '#ffffff')
          .attr('stroke-width', '1.5');

        // Draw Route Line
        const routePathId = `route-line-${index}`;
        const dx = p[0] - hqPoint[0];
        const dy = p[1] - hqPoint[1];
        const dr = Math.sqrt(dx * dx + dy * dy);
        
        // Curved path
        const curve = 1.8;
        const pathD = `M${hqPoint[0]},${hqPoint[1]} A${dr * curve},${dr * curve} 0 0,1 ${p[0]},${p[1]}`;

        const routeLine = routesG.append('path')
          .attr('id', routePathId)
          .attr('d', pathD)
          .attr('fill', 'none')
          .attr('stroke', 'url(#routeGrad)')
          .attr('stroke-width', '2.0')
          .attr('stroke-linecap', 'round')
          .attr('opacity', '0');

        const pathEl = routeLine.node();
        const length = pathEl.getTotalLength();
        routeLine.attr('stroke-dasharray', length).attr('stroke-dashoffset', length);

        // Comet particle
        const comet = particlesG.append('circle')
          .attr('r', '3.5')
          .attr('fill', '#ffd166')
          .attr('opacity', '0');

        // GSAP Synchronized Loop (duration 3.2s draw + 0.8s pause = 4s loop)
        masterTimeline.fromTo(routeLine.node(),
          { strokeDashoffset: length, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.8, duration: 3.2, ease: 'power1.inOut' },
          0
        );

        masterTimeline.to(comet.node(), {
          duration: 3.2,
          ease: 'power1.inOut',
          motionPath: {
            path: `#${routePathId}`,
            autoRotate: false
          }
        }, 0);

        masterTimeline.fromTo(comet.node(),
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          0
        );
        masterTimeline.to(comet.node(), { opacity: 0, duration: 0.2 }, 3.0);

        masterTimeline.fromTo(destDot.node(),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
          2.6
        );
      }

      // Add label text in clean solid white (#ffffff)
      const cleanLabel = loc.label.replace(/[^\w\s\(\)&]/g, '').trim();
      markerGroup.append('text')
        .attr('x', p[0])
        .attr('y', loc.isHQ ? p[1] - 12 : p[1] + 15)
        .text(cleanLabel)
        .attr('text-anchor', 'middle')
        .attr('fill', '#ffffff')
        .attr('font-size', '9px')
        .attr('font-family', "'Montserrat', sans-serif")
        .attr('font-weight', '600')
        .attr('letter-spacing', '0.04em')
        .style('pointer-events', 'none');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
