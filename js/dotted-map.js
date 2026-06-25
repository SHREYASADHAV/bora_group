/**
 * Dotted World Map — Vanilla JS + SVG
 * Animated sequential trade routes with pulsing markers
 * Lines flow one-by-one from India HQ → country 1 → country 2 → ... → last country
 */
(function () {
  'use strict';

  // ---------- CONFIGURATION ----------
  const MAP_WIDTH = 1000;
  const MAP_HEIGHT = 500;
  const LINE_COLOR = '#C5A880';   // gold
  const LINE_DRAW_DURATION = 1.8; // seconds to draw each line
  const PAUSE_BETWEEN = 0.4;      // pause between each line draw
  const PAUSE_AFTER_ALL = 2.0;    // pause after all lines drawn before restarting

  // Sequential trade route flow — India HQ to each country one by one
  const INDIA_HQ = { lat: 20.5937, lng: 78.9629, label: 'India (HQ)', subtitle: 'Central Trade Core', description: 'Global headquarters. Central procurement, logistics core, and major production center for grains and textiles.' };

  const DESTINATIONS = [
    { lat: 23.4241, lng: 53.8478, label: 'Middle East', subtitle: 'Primary Distribution Hub', description: 'Heavy export trade of fresh seasonal vegetables, high-volume spices, and basmati grain varieties.' },
    { lat: -4.0383, lng: 21.7587, label: 'Central Africa', subtitle: 'Resource & Cargo', description: 'Distributing wholesale industrial supplies and importing raw agricultural seeds.' },
    { lat: -14.235, lng: -51.9253, label: 'Brazil', subtitle: 'Sugar & Coffee Sourcing', description: 'Bulk imports of high-grade sugarcane products and raw arabica coffee beans for regional channels.' },
    { lat: 40.7128, lng: -74.006, label: 'North America', subtitle: 'USA & Canada Export', description: 'Exporting agricultural grains, select spices, and custom textiles to key retail markets.' },
    { lat: 64.1355, lng: -21.8954, label: 'Greenland & Iceland', subtitle: 'Northern Distribution', description: 'Sourcing high-latitude niche supplies and coordinating climate-controlled cargo logistics.' },
    { lat: 61.524, lng: 105.3188, label: 'Northern Eurasia', subtitle: 'Eurasian Trade Routes', description: 'Providing trade routes for raw commodities, industrial hardware, and agricultural grain shipments.' },
    { lat: 15.87, lng: 100.9925, label: 'Southeast Asia', subtitle: 'Rice & Manufacturing', description: 'Direct imports of organic jasmine rice, spices, and export distribution of textiles.' },
    { lat: -25.2744, lng: 133.7751, label: 'Australia', subtitle: 'Oceanic Logistics', description: 'Exporting high-quality garments, wholesale spice blends, and custom trade shipments.' }
  ];

  /**
   * Convert lat/lng to x/y on our SVG canvas (equirectangular)
   */
  function latLngToXY(lat, lng) {
    const x = ((lng + 180) / 360) * MAP_WIDTH;
    const y = ((90 - lat) / 180) * MAP_HEIGHT;
    return { x, y };
  }

  /**
   * Create a curved Bézier path between two points
   */
  function createCurvedPath(startXY, endXY) {
    const dx = endXY.x - startXY.x;
    const dy = endXY.y - startXY.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const midX = (startXY.x + endXY.x) / 2;
    // Curve arcs upward. Arc height scales with distance.
    const midY = Math.min(startXY.y, endXY.y) - dist * 0.22;
    return `M ${startXY.x} ${startXY.y} Q ${midX} ${midY} ${endXY.x} ${endXY.y}`;
  }

  /**
   * Initialize the Dotted Map
   */
  function initDottedMap(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // ---- 1. Insert the real world map PNG as background ----
    const mapImg = document.createElement('img');
    mapImg.src = 'images/world_map_detailed.png';
    mapImg.alt = 'Bora Group Global Overseas Trade Map';
    mapImg.className = 'dotted-map-bg-img';
    mapImg.draggable = false;
    container.appendChild(mapImg);

    // ---- 2. Create SVG overlay for lines + markers ----
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`);
    svg.setAttribute('class', 'dotted-map-svg');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Defs: glow filters
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');

    // Line glow
    const lineGlow = createSVGFilter('line-glow', 4);
    defs.appendChild(lineGlow);

    // Marker glow
    const markerGlow = createSVGFilter('marker-glow', 6);
    defs.appendChild(markerGlow);

    // Gradient for animated lines
    const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    grad.setAttribute('id', 'line-grad');
    grad.innerHTML = `<stop offset="0%" stop-color="${LINE_COLOR}" stop-opacity="0.2"/>
                      <stop offset="50%" stop-color="${LINE_COLOR}" stop-opacity="1"/>
                      <stop offset="100%" stop-color="${LINE_COLOR}" stop-opacity="0.6"/>`;
    defs.appendChild(grad);

    svg.appendChild(defs);

    // ---- 3. Build all route paths and markers ----
    const linesGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    const markersGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    const hqXY = latLngToXY(INDIA_HQ.lat, INDIA_HQ.lng);

    // Store path elements for sequential animation
    const routeData = [];

    DESTINATIONS.forEach((dest) => {
      const destXY = latLngToXY(dest.lat, dest.lng);
      const pathD = createCurvedPath(hqXY, destXY);

      // Static faint background path (always visible)
      const bgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      bgPath.setAttribute('d', pathD);
      bgPath.setAttribute('fill', 'none');
      bgPath.setAttribute('stroke', LINE_COLOR);
      bgPath.setAttribute('stroke-width', '0.8');
      bgPath.setAttribute('opacity', '0.1');
      bgPath.setAttribute('stroke-dasharray', '4 6');
      linesGroup.appendChild(bgPath);

      // Animated path (drawn sequentially)
      const animPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      animPath.setAttribute('d', pathD);
      animPath.setAttribute('fill', 'none');
      animPath.setAttribute('stroke', LINE_COLOR);
      animPath.setAttribute('stroke-width', '2');
      animPath.setAttribute('stroke-linecap', 'round');
      animPath.setAttribute('filter', 'url(#line-glow)');
      animPath.setAttribute('opacity', '0');
      linesGroup.appendChild(animPath);

      // Travelling glow dot
      const travelDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      travelDot.setAttribute('r', '3.5');
      travelDot.setAttribute('fill', '#fff');
      travelDot.setAttribute('filter', 'url(#marker-glow)');
      travelDot.setAttribute('opacity', '0');
      linesGroup.appendChild(travelDot);

      routeData.push({ animPath, travelDot, destXY });
    });

    svg.appendChild(linesGroup);

    // ---- 4. Draw markers ----
    // India HQ marker (special — larger, white ring)
    drawMarker(markersGroup, hqXY, true);
    // Destination markers
    DESTINATIONS.forEach((dest) => {
      const destXY = latLngToXY(dest.lat, dest.lng);
      drawMarker(markersGroup, destXY, false);
    });

    svg.appendChild(markersGroup);
    container.appendChild(svg);

    // ---- 5. HTML hotspot tooltips ----
    // India HQ
    createHotspot(container, hqXY, INDIA_HQ);
    // Destinations
    DESTINATIONS.forEach((dest) => {
      const destXY = latLngToXY(dest.lat, dest.lng);
      createHotspot(container, destXY, dest);
    });

    // ---- 6. Sequential animation loop ----
    requestAnimationFrame(() => startSequentialAnimation(routeData));
  }

  /**
   * Create an SVG gaussian-blur glow filter
   */
  function createSVGFilter(id, blur) {
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', id);
    filter.setAttribute('x', '-100%');
    filter.setAttribute('y', '-100%');
    filter.setAttribute('width', '300%');
    filter.setAttribute('height', '300%');
    filter.innerHTML = `
      <feGaussianBlur stdDeviation="${blur}" result="glow"/>
      <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
    `;
    return filter;
  }

  /**
   * Draw a pulsing marker circle at a position
   */
  function drawMarker(group, xy, isHQ) {
    // Outer pulse ring
    const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    pulse.setAttribute('cx', xy.x.toFixed(1));
    pulse.setAttribute('cy', xy.y.toFixed(1));
    pulse.setAttribute('r', isHQ ? '7' : '5');
    pulse.setAttribute('fill', 'none');
    pulse.setAttribute('stroke', LINE_COLOR);
    pulse.setAttribute('stroke-width', '1.2');
    pulse.classList.add('pulse-ring');
    group.appendChild(pulse);

    // Glow halo
    const halo = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    halo.setAttribute('cx', xy.x.toFixed(1));
    halo.setAttribute('cy', xy.y.toFixed(1));
    halo.setAttribute('r', isHQ ? '5' : '3.5');
    halo.setAttribute('fill', LINE_COLOR);
    halo.setAttribute('opacity', '0.3');
    halo.setAttribute('filter', 'url(#marker-glow)');
    group.appendChild(halo);

    // Solid dot
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', xy.x.toFixed(1));
    dot.setAttribute('cy', xy.y.toFixed(1));
    dot.setAttribute('r', isHQ ? '4' : '3');
    dot.setAttribute('fill', isHQ ? '#fff' : LINE_COLOR);
    dot.setAttribute('stroke', isHQ ? LINE_COLOR : 'none');
    dot.setAttribute('stroke-width', isHQ ? '2' : '0');
    group.appendChild(dot);
  }

  /**
   * Create an HTML hotspot with hover tooltip
   */
  function createHotspot(container, xy, data) {
    const hotspot = document.createElement('div');
    hotspot.className = 'dotted-map-hotspot';
    hotspot.style.left = `${(xy.x / MAP_WIDTH) * 100}%`;
    hotspot.style.top = `${(xy.y / MAP_HEIGHT) * 100}%`;

    const tooltip = document.createElement('div');
    tooltip.className = 'dotted-map-tooltip';
    tooltip.innerHTML = `
      <div class="dmt-name">${data.label}</div>
      <div class="dmt-subtitle">${data.subtitle}</div>
      <p class="dmt-desc">${data.description}</p>
    `;
    hotspot.appendChild(tooltip);

    const label = document.createElement('div');
    label.className = 'dotted-map-label';
    label.textContent = data.label;
    hotspot.appendChild(label);

    container.appendChild(hotspot);
  }

  /**
   * Sequentially animate trade lines: 1st draws → 2nd draws → ... → last draws → pause → loop
   */
  function startSequentialAnimation(routes) {
    const totalPerRoute = (LINE_DRAW_DURATION + PAUSE_BETWEEN) * 1000;
    const totalCycleMs = routes.length * totalPerRoute + PAUSE_AFTER_ALL * 1000;

    function animate() {
      const now = performance.now();

      routes.forEach((route, idx) => {
        const routeStartMs = idx * totalPerRoute;
        const cycleElapsed = now % totalCycleMs;
        const routeElapsed = cycleElapsed - routeStartMs;

        const drawMs = LINE_DRAW_DURATION * 1000;
        const path = route.animPath;
        const dot = route.travelDot;

        if (routeElapsed < 0 || routeElapsed > drawMs + PAUSE_BETWEEN * 1000) {
          // Before this route's turn or after it finished in this cycle
          // Keep drawn lines visible after they complete (don't hide)
          if (routeElapsed > drawMs) {
            // Line is fully drawn — keep it visible
            const totalLength = path.getTotalLength();
            path.setAttribute('opacity', '0.6');
            path.style.strokeDasharray = totalLength;
            path.style.strokeDashoffset = '0';
            dot.setAttribute('opacity', '0');
          } else if (cycleElapsed > routes.length * totalPerRoute) {
            // In the pause-after-all zone — keep all visible then fade for restart
            const fadeProg = (cycleElapsed - routes.length * totalPerRoute) / (PAUSE_AFTER_ALL * 1000);
            if (fadeProg > 0.7) {
              const fadeOut = 1 - ((fadeProg - 0.7) / 0.3);
              path.setAttribute('opacity', (0.6 * Math.max(fadeOut, 0)).toFixed(2));
            }
            dot.setAttribute('opacity', '0');
          } else {
            // Not yet started
            path.setAttribute('opacity', '0');
            dot.setAttribute('opacity', '0');
          }
          return;
        }

        // Currently drawing this route
        const progress = Math.min(routeElapsed / drawMs, 1);
        // Ease out cubic
        const t = 1 - Math.pow(1 - progress, 3);

        const totalLength = path.getTotalLength();
        path.style.strokeDasharray = totalLength;
        path.style.strokeDashoffset = totalLength * (1 - t);
        path.setAttribute('opacity', (0.4 + 0.5 * t).toFixed(2));

        // Travelling dot follows the draw head
        if (t > 0.02 && t < 0.98) {
          const pt = path.getPointAtLength(t * totalLength);
          dot.setAttribute('cx', pt.x);
          dot.setAttribute('cy', pt.y);
          dot.setAttribute('opacity', '1');
          dot.setAttribute('r', (2.5 + Math.sin(t * Math.PI) * 1.5).toFixed(1));
        } else {
          dot.setAttribute('opacity', '0');
        }
      });

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  // ---------- INIT ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initDottedMap('dotted-world-map'));
  } else {
    initDottedMap('dotted-world-map');
  }

})();
