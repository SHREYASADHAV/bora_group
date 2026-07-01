/**
 * Bora Group — Realistic 3D WebGL World Trade Map
 * Built with Three.js (local assets) + photorealistic textures & lighting
 * Locations: India HQ → Southeast Asia, Middle East, Central Africa,
 *             North America, Brazil, Greenland & Iceland, Northern Eurasia, Australia
 */
(function () {
  'use strict';

  // ---------- CONFIGURATION & DATA ----------
  const MAP_WHITE = 0xffffff;
  const MAP_WHITE_STR = '#ffffff';
  
  const LOCATIONS = [
    {
      id: 'india', label: '🇮🇳 India (HQ)', subtitle: 'Headquarters / Origin',
      description: 'Global headquarters. Central procurement, logistics core, and major production center for grains, textiles, and real estate.',
      lat: 20.5937, lng: 78.9629, isHQ: true
    },
    {
      id: 'sea', label: '🌏 Southeast Asia', subtitle: 'Rice & Manufacturing',
      description: 'Direct imports of organic jasmine rice, spices, and export distribution of garments & textiles.',
      lat: 13.7563, lng: 100.5018
    },
    {
      id: 'me', label: '🌍 Middle East', subtitle: 'Primary Distribution Hub',
      description: 'Heavy export trade of fresh seasonal vegetables, high-volume spices, and basmati grain varieties.',
      lat: 24.4539, lng: 54.3773
    },
    {
      id: 'africa', label: '🌍 Central Africa', subtitle: 'Resource & Cargo',
      description: 'Distributing wholesale industrial supplies and importing raw agricultural seeds.',
      lat: -4.0383, lng: 21.7587
    },
    {
      id: 'na', label: '🌎 North America', subtitle: 'USA & Canada Export',
      description: 'Exporting agricultural grains, select spices, and custom textiles to key retail markets.',
      lat: 40.7128, lng: -74.0060
    },
    {
      id: 'brazil', label: '🇧🇷 Brazil', subtitle: 'Sugar & Coffee Sourcing',
      description: 'Bulk imports of high-grade sugarcane products and raw arabica coffee beans for regional channels.',
      lat: -14.2350, lng: -51.9253
    },
    {
      id: 'greenland', label: '🇬🇱 Greenland & Iceland', subtitle: 'Northern Distribution',
      description: 'Sourcing high-latitude niche supplies and coordinating climate-controlled cargo logistics.',
      lat: 64.1355, lng: -21.8954
    },
    {
      id: 'eurasia', label: '🌏 Northern Eurasia', subtitle: 'Eurasian Trade Routes',
      description: 'Trade routes for raw commodities, industrial hardware, and agricultural grain shipments.',
      lat: 55.7558, lng: 37.6173
    },
    {
      id: 'australia', label: '🇦🇺 Australia', subtitle: 'Oceanic Logistics',
      description: 'Exporting high-quality garments, wholesale spice blends, and custom trade shipments.',
      lat: -25.2744, lng: 133.7751
    }
  ];

  let container, scene, camera, renderer, globeGroup;
  let earthMesh, cloudsMesh;
  const pulseRings = [];
  const collisionMeshes = [];
  const travelBullets = [];
  
  // Dragging & Interaction variables
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let autoRotate = true;
  let autoRotateTimeout;
  
  // Easing/Centering variables
  let isCentering = false;
  let targetRotX = 0;
  let targetRotY = 0;
  
  // Raycasting
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let hoveredLocation = null;
  let tooltipEl = null;

  // Globe dimensions (radius = 0.5 like turban's code)
  const radius = 0.5;
  const segments = 64;

  function init() {
    container = document.getElementById('dotted-world-map');
    if (!container) return;

    // Clear container (remove amCharts leftovers if any)
    container.innerHTML = '';
    
    // Set container styles
    container.style.position = 'relative';
    container.style.height = '520px';
    container.style.width = '100%';
    container.style.background = 'transparent';

    // ---- 1. Setup Three.js Scene, Camera, and Renderer ----
    scene = new THREE.Scene();

    const width = container.clientWidth || 960;
    const height = container.clientHeight || 520;
    
    camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    camera.position.z = 1.35; // Centered viewing distance

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    if (typeof renderer.setPixelRatio === 'function') {
      renderer.setPixelRatio(window.devicePixelRatio || 1);
    }
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent canvas background
    container.appendChild(renderer.domElement);

    // ---- 2. Lights (Realistic shading and terminator) ----
    scene.add(new THREE.AmbientLight(0x444444)); // Ambient fills shadows

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.25);
    sunLight.position.set(5, 3, 5); // Sun coming from the top-right-front
    scene.add(sunLight);

    // ---- 3. Create Globe Group ----
    globeGroup = new THREE.Object3D(); // Object3D is universally supported across Three.js versions
    // Rotate to face India by default
    const defaultHQ = LOCATIONS.find(l => l.isHQ);
    globeGroup.rotation.y = - (defaultHQ.lng + 140) * (Math.PI / 180);
    globeGroup.rotation.x = - (defaultHQ.lat - 10) * (Math.PI / 180);
    scene.add(globeGroup);

    // ---- 4. Create Earth Mesh ----
    earthMesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshPhongMaterial({
        map:         loadTexture('images/earth/2_no_clouds_4k.jpg'),
        bumpMap:     loadTexture('images/earth/elev_bump_4k.jpg'),
        bumpScale:   0.015, // Enhanced topographic depth
        specularMap: loadTexture('images/earth/water_4k.png'),
        specular:    new THREE.Color(0x222222), // Oceans reflect light, land is matte
        shininess:   12
      })
    );
    globeGroup.add(earthMesh);

    // ---- 5. Create Atmosphere Clouds Layer ----
    cloudsMesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius + 0.005, segments, segments),
      new THREE.MeshPhongMaterial({
        map:         loadTexture('images/earth/fair_clouds_4k.png'),
        transparent: true,
        opacity:     0.4, // Soft atmospheric clouds
        blending:    THREE.NormalBlending
      })
    );
    globeGroup.add(cloudsMesh);

    // ---- 6. Create Tooltip DOM Element ----
    tooltipEl = document.createElement('div');
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.opacity = '0';
    tooltipEl.style.background = 'rgba(5, 5, 10, 0.95)';
    tooltipEl.style.backdropFilter = 'blur(12px)';
    tooltipEl.style.webkitBackdropFilter = 'blur(12px)';
    tooltipEl.style.border = '1px solid rgba(255, 255, 255, 0.35)';
    tooltipEl.style.borderRadius = '10px';
    tooltipEl.style.padding = '12px 14px';
    tooltipEl.style.color = '#ffffff';
    tooltipEl.style.fontSize = '11px';
    tooltipEl.style.fontFamily = "'Montserrat', sans-serif";
    tooltipEl.style.boxShadow = '0 12px 32px -8px rgba(0, 0, 0, 0.6)';
    tooltipEl.style.zIndex = '1000';
    tooltipEl.style.width = '210px';
    tooltipEl.style.transition = 'opacity 0.25s ease';
    container.appendChild(tooltipEl);

    // ---- 7. Populate Locations (Markers, Pulses, Routes) ----
    const hq = LOCATIONS.find(l => l.isHQ);
    const hqPos = latLngToVector3(hq.lat, hq.lng, radius);

    LOCATIONS.forEach(loc => {
      const pos = latLngToVector3(loc.lat, loc.lng, radius);
      const normal = pos.clone().normalize();

      // Solid Core Dot
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(loc.isHQ ? 0.009 : 0.007, 16, 16),
        new THREE.MeshBasicMaterial({ color: MAP_WHITE })
      );
      dot.position.copy(pos);
      globeGroup.add(dot);

      // Pulse Ring (laid flat on sphere surface)
      const ringGeom = new THREE.RingGeometry(0.006, loc.isHQ ? 0.024 : 0.016, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: MAP_WHITE,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65
      });
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.copy(pos).add(normal.clone().multiplyScalar(0.001)); // offset slightly to prevent depth fighting
      setQuaternionFromUnitVectors(ring.quaternion, new THREE.Vector3(0, 0, 1), normal);
      globeGroup.add(ring);

      pulseRings.push({
        mesh: ring,
        speed: loc.isHQ ? 0.014 : 0.010
      });

      // Invisible larger raycast collision sphere (makes hover/click extremely responsive)
      const colMesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.028, 8, 8),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      colMesh.position.copy(pos);
      colMesh.userData = { data: loc };
      globeGroup.add(colMesh);
      collisionMeshes.push(colMesh);

      // Create Route Line and Bullet (only from HQ to destinations)
      if (!loc.isHQ) {
        // Curve construction
        const midPoint = new THREE.Vector3().addVectors(hqPos, pos).multiplyScalar(0.5);
        const distance = hqPos.distanceTo(pos);
        // Height of the route arc above the surface
        const arcHeight = radius + distance * 0.22;
        const controlPoint = midPoint.clone().normalize().multiplyScalar(arcHeight);

        const curve = new THREE.QuadraticBezierCurve3(hqPos, controlPoint, pos);
        const points = curve.getPoints(40);

        // Draw curved dashed-like route line
        let lineGeom;
        if (typeof THREE.BufferGeometry !== 'undefined' && typeof THREE.BufferGeometry.prototype.setFromPoints === 'function') {
          lineGeom = new THREE.BufferGeometry().setFromPoints(points);
        } else {
          lineGeom = new THREE.Geometry();
          lineGeom.vertices = points;
        }

        const lineMat = new THREE.LineBasicMaterial({
          color: MAP_WHITE,
          transparent: true,
          opacity: 0.5
        });
        const routeLine = new THREE.Line(lineGeom, lineMat);
        globeGroup.add(routeLine);

        // Animated travel bullet
        const bullet = new THREE.Mesh(
          new THREE.SphereGeometry(0.008, 8, 8),
          new THREE.MeshBasicMaterial({ color: MAP_WHITE })
        );
        globeGroup.add(bullet);
        travelBullets.push({
          mesh: bullet,
          curve: curve,
          progress: Math.random() // Start at random positions for natural flow
        });
      }
    });

    // ---- 8. Mouse & Touch Event Listeners ----
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    container.addEventListener('touchmove', onTouchMove, { passive: true });
    container.addEventListener('touchend', onTouchEnd);

    window.addEventListener('resize', onWindowResize);

    // ---- 9. Start Animation Loop ----
    animate();
  }

  // Helper: Load texture with fallback
  function loadTexture(url) {
    if (typeof THREE.ImageUtils !== 'undefined' && typeof THREE.ImageUtils.loadTexture === 'function') {
      return THREE.ImageUtils.loadTexture(url);
    } else if (typeof THREE.TextureLoader !== 'undefined') {
      return new THREE.TextureLoader().load(url);
    }
  }

  // Convert lat/lng to Vector3 on sphere
  function latLngToVector3(lat, lng, sphereRadius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = -(sphereRadius * Math.sin(phi) * Math.sin(theta));
    const y = sphereRadius * Math.cos(phi);
    const z = sphereRadius * Math.sin(phi) * Math.cos(theta);
    return new THREE.Vector3(x, y, z);
  }

  // Helper: Update raycaster position (handles older and newer Three.js versions)
  function updateRaycaster(mouse, camera, raycaster) {
    if (typeof raycaster.setFromCamera === 'function') {
      raycaster.setFromCamera(mouse, camera);
    } else {
      // Manual unproject for older Three.js (e.g. r61)
      const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
      if (typeof vector.unproject === 'function') {
        vector.unproject(camera);
      } else if (typeof THREE.Projector !== 'undefined') {
        const projector = new THREE.Projector();
        projector.unprojectVector(vector, camera);
      }
      raycaster.ray.set(camera.position, vector.sub(camera.position).normalize());
    }
  }

  // Helper: Set quaternion from unit vectors (handles older Three.js versions like r61)
  function setQuaternionFromUnitVectors(quaternion, vFrom, vTo) {
    if (typeof quaternion.setFromUnitVectors === 'function') {
      quaternion.setFromUnitVectors(vFrom, vTo);
    } else {
      const v1 = vFrom.clone().normalize();
      const v2 = vTo.clone().normalize();
      const r = v1.dot(v2) + 1;
      if (r < 0.0001) {
        if (Math.abs(v1.x) > Math.abs(v1.z)) {
          quaternion.set(-v1.y, v1.x, 0, 0).normalize();
        } else {
          quaternion.set(0, -v1.z, v1.y, 0).normalize();
        }
      } else {
        const cross = new THREE.Vector3().crossVectors(v1, v2);
        quaternion.set(cross.x, cross.y, cross.z, r).normalize();
      }
    }
  }

  // ---- EVENT HANDLERS ----

  function onMouseDown(e) {
    isDragging = true;
    isCentering = false;
    autoRotate = false;
    if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
    previousMousePosition = { x: e.clientX, y: e.clientY };
  }

  function onMouseMove(e) {
    // 1. Handle Dragging Rotation
    if (isDragging) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.004;
      globeGroup.rotation.x += deltaY * 0.004;
      
      // Clamp vertical rotation
      globeGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, globeGroup.rotation.x));
      previousMousePosition = { x: e.clientX, y: e.clientY };
      return;
    }

    // 2. Handle Raycast Hover (Tooltip)
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    updateRaycaster(mouse, camera, raycaster);
    const intersects = raycaster.intersectObjects(collisionMeshes);

    if (intersects.length > 0) {
      container.style.cursor = 'pointer';
      const loc = intersects[0].object.userData.data;
      if (hoveredLocation !== loc) {
        hoveredLocation = loc;
        tooltipEl.innerHTML = `<div style="font-weight: bold; color: ${MAP_WHITE_STR}; margin-bottom: 3px; font-size:12px;">${loc.label}</div>
                               <div style="color: #aaa; margin-bottom: 6px; font-weight: 500;">${loc.subtitle}</div>
                               <div style="color: #ddd; font-weight: 300; line-height: 1.4;">${loc.description}</div>`;
        tooltipEl.style.opacity = '1';
      }
      
      // Position tooltip relative to container
      const tooltipWidth = tooltipEl.offsetWidth || 210;
      const tooltipHeight = tooltipEl.offsetHeight || 80;
      let left = e.clientX - rect.left - tooltipWidth / 2;
      let top = e.clientY - rect.top - tooltipHeight - 15;

      // Bound checks
      if (left < 10) left = 10;
      if (left + tooltipWidth > rect.width - 10) left = rect.width - tooltipWidth - 10;
      if (top < 10) top = e.clientY - rect.top + 20;

      tooltipEl.style.left = left + 'px';
      tooltipEl.style.top = top + 'px';
    } else {
      container.style.cursor = 'default';
      hoveredLocation = null;
      tooltipEl.style.opacity = '0';
    }
  }

  function onMouseUp(e) {
    if (isDragging) {
      isDragging = false;
      // Click detection: if delta is tiny, consider it a click
      const rect = renderer.domElement.getBoundingClientRect();
      const clickMouse = new THREE.Vector2();
      clickMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      clickMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      updateRaycaster(clickMouse, camera, raycaster);
      const intersects = raycaster.intersectObjects(collisionMeshes);
      if (intersects.length > 0) {
        const loc = intersects[0].object.userData.data;
        triggerCenterOnLocation(loc);
      } else {
        resetAutoRotationTimer();
      }
    }
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      isDragging = true;
      isCentering = false;
      autoRotate = false;
      if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }

  function onTouchMove(e) {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.004;
      globeGroup.rotation.x += deltaY * 0.004;
      globeGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, globeGroup.rotation.x));
      
      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }

  function onTouchEnd(e) {
    isDragging = false;
    resetAutoRotationTimer();
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  // Trigger smooth centering transition
  function triggerCenterOnLocation(loc) {
    // Target rotations to align marker facing the camera
    targetRotY = - (loc.lng + 90) * (Math.PI / 180);
    targetRotX = - (loc.lat) * (Math.PI / 180);
    
    // Normalize targetRotY to prevent winding (rotating multiple circles)
    const currentY = globeGroup.rotation.y;
    const diff = (targetRotY - currentY) % (Math.PI * 2);
    const normalizedDiff = ((diff + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    targetRotY = currentY + normalizedDiff;

    isCentering = true;
    resetAutoRotationTimer(10000); // Wait 10 seconds of inactivity before auto-rotating again
  }

  // Reset auto-rotation timeout
  function resetAutoRotationTimer(delay = 4000) {
    if (autoRotateTimeout) clearTimeout(autoRotateTimeout);
    autoRotateTimeout = setTimeout(() => {
      autoRotate = true;
    }, delay);
  }

  // ---- ANIMATION LOOP ----
  function animate() {
    requestAnimationFrame(animate);

    // 1. Rotate Clouds (independently, slightly faster than auto-rotation)
    if (cloudsMesh) {
      cloudsMesh.rotation.y += 0.0004;
    }

    // 2. Globe Auto-Rotation
    if (autoRotate && !isDragging && !isCentering) {
      globeGroup.rotation.y += 0.0010; // smooth constant rotation
    }

    // 3. Smooth Centering Interpolation
    if (isCentering && !isDragging) {
      globeGroup.rotation.y += (targetRotY - globeGroup.rotation.y) * 0.06;
      globeGroup.rotation.x += (targetRotX - globeGroup.rotation.x) * 0.06;

      if (Math.abs(targetRotY - globeGroup.rotation.y) < 0.001 && 
          Math.abs(targetRotX - globeGroup.rotation.x) < 0.001) {
        isCentering = false;
      }
    }

    // 4. Animate Pulsing Rings
    pulseRings.forEach(p => {
      p.mesh.scale.addScalar(p.speed);
      p.mesh.material.opacity -= p.speed * 1.5;
      if (p.mesh.material.opacity <= 0) {
        p.mesh.scale.set(1, 1, 1);
        p.mesh.material.opacity = 0.65;
      }
    });

    // 5. Animate Travel Bullets along Curves
    travelBullets.forEach(b => {
      b.progress += 0.0035; // speed of route traffic
      if (b.progress > 1) b.progress = 0;
      const point = b.curve.getPointAt(b.progress);
      b.mesh.position.copy(point);
    });

    renderer.render(scene, camera);
  }

  // Initialize after page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
