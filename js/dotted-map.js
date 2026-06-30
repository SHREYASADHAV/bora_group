/**
 * Bora Group — Interactive 3D Earth Globe
 * Built with Three.js + Globe.gl + Custom CSS Tooltips
 * Locations: India HQ → Southeast Asia, Middle East, Central Africa,
 *             North America, Brazil, Greenland & Iceland, Northern Eurasia, Australia
 */
(function () {
  'use strict';

  // ---------- CONFIGURATION & CONSTANTS ----------
  const GOLD = '#C5A880';
  const BLUE_GLOW = '#0095FF';

  // All coordinates
  const INDIA_HQ = { lat: 20.5937, lng: 78.9629 };

  const LOCATIONS = [
    {
      id: 'india',
      label: '🇮🇳 India (HQ)',
      subtitle: 'Headquarters / Origin',
      description: 'Global headquarters. Central procurement, logistics core, and major production center for grains, textiles, and real estate.',
      lat: INDIA_HQ.lat,
      lng: INDIA_HQ.lng,
      isHQ: true
    },
    {
      id: 'sea',
      label: '🌏 Southeast Asia',
      subtitle: 'Rice & Manufacturing',
      description: 'Direct imports of organic jasmine rice, spices, and export distribution of garments & textiles.',
      lat: 13.7563,
      lng: 100.5018
    },
    {
      id: 'me',
      label: '🌍 Middle East',
      subtitle: 'Primary Distribution Hub',
      description: 'Heavy export trade of fresh seasonal vegetables, high-volume spices, and basmati grain varieties.',
      lat: 24.4539,
      lng: 54.3773
    },
    {
      id: 'africa',
      label: '🌍 Central Africa',
      subtitle: 'Resource & Cargo',
      description: 'Distributing wholesale industrial supplies and importing raw agricultural seeds.',
      lat: -4.0383,
      lng: 21.7587
    },
    {
      id: 'na',
      label: '🌎 North America',
      subtitle: 'USA & Canada Export',
      description: 'Exporting agricultural grains, select spices, and custom textiles to key retail markets.',
      lat: 40.7128,
      lng: -74.0060
    },
    {
      id: 'brazil',
      label: '🇧🇷 Brazil',
      subtitle: 'Sugar & Coffee Sourcing',
      description: 'Bulk imports of high-grade sugarcane products and raw arabica coffee beans for regional channels.',
      lat: -14.2350,
      lng: -51.9253
    },
    {
      id: 'greenland',
      label: '🇬🇱 Greenland & Iceland',
      subtitle: 'Northern Distribution',
      description: 'Sourcing high-latitude niche supplies and coordinating climate-controlled cargo logistics.',
      lat: 64.1355,
      lng: -21.8954
    },
    {
      id: 'eurasia',
      label: '🌏 Northern Eurasia',
      subtitle: 'Eurasian Trade Routes',
      description: 'Trade routes for raw commodities, industrial hardware, and agricultural grain shipments.',
      lat: 55.7558,
      lng: 37.6173
    },
    {
      id: 'australia',
      label: '🇦🇺 Australia',
      subtitle: 'Oceanic Logistics',
      description: 'Exporting high-quality garments, wholesale spice blends, and custom trade shipments.',
      lat: -25.2744,
      lng: 133.7751
    }
  ];

  // Map destinations for arcs
  const ARCS_DATA = LOCATIONS.filter(l => !l.isHQ).map((dest, idx) => ({
    startLat: INDIA_HQ.lat,
    startLng: INDIA_HQ.lng,
    endLat: dest.lat,
    endLng: dest.lng,
    color: GOLD,
    // Slightly vary altitudes so arcs don't overlap perfectly
    altitude: 0.18 + (idx * 0.02)
  }));

  function initGlobe() {
    const container = document.getElementById('dotted-world-map');
    if (!container) return;

    // Check if libraries are loaded
    if (typeof Globe === 'undefined' || typeof THREE === 'undefined') {
      console.warn('Three.js or Globe.gl not loaded yet — retrying...');
      setTimeout(initGlobe, 200);
      return;
    }

    // Set height and clear background
    container.style.height = '100%';
    container.style.minHeight = '480px';
    container.innerHTML = ''; // Clean old contents

    // Detect touch device to optimize scrolling on mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Build the globe instance
    const myGlobe = Globe()(container)
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(true)
      .atmosphereColor(BLUE_GLOW)
      .atmosphereAltitude(0.18)
      
      // Arcs representing trade routes
      .arcsData(ARCS_DATA)
      .arcColor('color')
      .arcDashLength(0.35)
      .arcDashGap(0.2)
      .arcDashAnimateTime(2000)
      .arcStroke(1.2)
      .arcAltitude('altitude')
      
      // Custom HTML Elements for coordinates
      .htmlElementsData(LOCATIONS)
      .htmlElement(d => {
        const el = document.createElement('div');
        el.className = 'dotted-map-hotspot';
        
        // Solid pulse circle marker inside coordinates
        el.innerHTML = `
          <div class="absolute w-3 h-3 bg-gold rounded-full border-2 border-white flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
            <span class="absolute w-6 h-6 rounded-full border border-gold opacity-75 pulse-ring"></span>
          </div>
          <div class="dotted-map-tooltip">
            <div class="dmt-name">${d.label}</div>
            <div class="dmt-subtitle">${d.subtitle}</div>
            <p class="dmt-desc">${d.description}</p>
          </div>
          <div class="dotted-map-label" style="margin-top: 8px;">${d.label}</div>
        `;
        return el;
      });

    // Configure camera orbit controls for smooth auto-rotation
    const controls = myGlobe.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.4; // smooth slow rotation
      controls.enableZoom = false;    // prevent page scrolling disruption
      controls.enablePan = false;     // keep centered
      controls.minPolarAngle = Math.PI / 3; // restrict vertical viewing angles
      controls.maxPolarAngle = Math.PI / 1.5;

      // On touch devices, disable controls so scroll works cleanly without capturing touch
      if (isTouchDevice) {
        controls.enabled = false;
      }
    }

    // Add Clouds mesh layer on top of the main earth sphere
    const CLOUDS_IMG_URL = 'https://unpkg.com/three-globe/example/img/earth-clouds.png';
    const CLOUDS_ALT = 0.008; // slightly offset from earth
    const CLOUDS_ROT_SPEED = -0.003; // deg/s

    const cloudsLoader = new THREE.TextureLoader();
    cloudsLoader.load(CLOUDS_IMG_URL, cloudsTexture => {
      const cloudsGeom = new THREE.SphereGeometry(myGlobe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75);
      const cloudsMat = new THREE.MeshStandardMaterial({
        map: cloudsTexture,
        transparent: true,
        blending: THREE.NormalBlending
      });
      const cloudsMesh = new THREE.Mesh(cloudsGeom, cloudsMat);
      
      // Add clouds directly to Three.js scene
      myGlobe.scene().add(cloudsMesh);

      // Animation loop for cloud layer rotation
      (function rotateClouds() {
        cloudsMesh.rotation.y += (CLOUDS_ROT_SPEED * Math.PI / 180);
        requestAnimationFrame(rotateClouds);
      })();
    });

    // Resize handler
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      myGlobe.width(w);
      myGlobe.height(h);
    });
    resizeObserver.observe(container);

    // Initial camera position adjustment
    myGlobe.pointOfView({ lat: 20, lng: 50, altitude: 2.2 });
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobe);
  } else {
    initGlobe();
  }

})();
