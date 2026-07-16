import json
import os

countries_file = "/Users/shreyasadhav/Downloads/B GROUP/js/world-countries.json"
ts_dest_file = "/Users/shreyasadhav/Downloads/B GROUP/lib/use-world-data.ts"
js_dest_file = "/Users/shreyasadhav/Downloads/B GROUP/js/dotted-map.js"

with open(countries_file, 'r', encoding='utf-8') as f:
    countries_data = json.load(f)

# 1. Update lib/use-world-data.ts
with open(ts_dest_file, 'w', encoding='utf-8') as f:
    f.write('export const WORLD_GEOJSON = ')
    json.dump(countries_data, f)
    f.write(';\n')
print(f"Successfully updated {ts_dest_file}")

# 2. Update js/dotted-map.js (with inlined countries GeoJSON)
script_content = f"""(function () {{
  'use strict';

  const WORLD_GEOJSON = {json.dumps(countries_data)};

  const LOCATIONS = [
    {{
      id: 'india', label: '🇮🇳 India (HQ)', subtitle: 'Headquarters / Origin',
      description: 'Global headquarters. Central procurement, logistics core, and major production center for grains, textiles, and real estate.',
      lat: 20.5937, lng: 78.9629, isHQ: true
    }},
    {{
      id: 'sea', label: '🌏 Southeast Asia', subtitle: 'Rice & Manufacturing',
      description: 'Direct imports of organic jasmine rice, spices, and export distribution of garments & textiles.',
      lat: 13.7563, lng: 100.5018
    }},
    {{
      id: 'me', label: '🌍 Middle East', subtitle: 'Primary Distribution Hub',
      description: 'Heavy export trade of fresh seasonal vegetables, high-volume spices, and basmati grain varieties.',
      lat: 24.4539, lng: 54.3773
    }},
    {{
      id: 'africa', label: '🌍 Central Africa', subtitle: 'Resource & Cargo',
      description: 'Distributing wholesale industrial supplies and importing raw agricultural seeds.',
      lat: -4.0383, lng: 21.7587
    }},
    {{
      id: 'na', label: '🌎 North America', subtitle: 'USA & Canada Export',
      description: 'Exporting agricultural grains, select spices, and custom textiles to key retail markets.',
      lat: 40.7128, lng: -74.0060
    }},
    {{
      id: 'brazil', label: '🇧🇷 Brazil', subtitle: 'Sugar & Coffee Sourcing',
      description: 'Bulk imports of high-grade sugarcane products and raw arabica coffee beans for regional channels.',
      lat: -14.2350, lng: -51.9253
    }},
    {{
      id: 'greenland', label: '🇬🇱 Greenland & Iceland', subtitle: 'Northern Distribution',
      description: 'Sourcing high-latitude niche supplies and coordinating climate-controlled cargo logistics.',
      lat: 64.1355, lng: -21.8954
    }},
    {{
      id: 'eurasia', label: '🌏 Northern Eurasia', subtitle: 'Eurasian Trade Routes',
      description: 'Trade routes for raw commodities, industrial hardware, and agricultural grain shipments.',
      lat: 55.7558, lng: 37.6173
    }},
    {{
      id: 'australia', label: '🇦🇺 Australia', subtitle: 'Oceanic Logistics',
      description: 'Exporting high-quality garments, wholesale spice blends, and custom trade shipments.',
      lat: -25.2744, lng: 133.7751
    }}
  ];

  function init() {{
    const container = document.getElementById('dotted-world-map');
    if (!container) return;

    container.innerHTML = '';
    container.style.position = 'relative';
    container.style.height = 'auto';
    container.style.minHeight = '400px';
    container.style.width = '100%';
    container.style.background = '#ffffff';
    container.style.opacity = '0'; // Set up for fade-in

    // 1. Create Tooltip DOM Element with White/Frosted Glass Gold-border Style
    const tooltipEl = document.createElement('div');
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.opacity = '0';
    tooltipEl.style.background = 'rgba(255, 255, 255, 0.9)';
    tooltipEl.style.backdropFilter = 'blur(12px)';
    tooltipEl.style.webkitBackdropFilter = 'blur(12px)';
    tooltipEl.style.border = '1px solid rgba(212, 175, 55, 0.4)';
    tooltipEl.style.borderRadius = '14px';
    tooltipEl.style.padding = '14px 16px';
    tooltipEl.style.color = '#333333';
    tooltipEl.style.fontSize = '12px';
    tooltipEl.style.fontFamily = \"'Montserrat', sans-serif\";
    tooltipEl.style.boxShadow = '0 10px 30px -5px rgba(212, 175, 55, 0.15)';
    tooltipEl.style.zIndex = '1000';
    tooltipEl.style.width = '240px';
    tooltipEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    tooltipEl.style.transform = 'translateY(10px)';
    container.appendChild(tooltipEl);

    // 2. Setup D3 SVG
    const svg = d3.select(container)
      .append('svg')
      .attr('width', 1200)
      .attr('height', 600)
      .attr('viewBox', '0 0 1200 600')
      .style('width', '100%')
      .style('height', 'auto')
      .style('display', 'block')
      .style('transform-origin', 'center');

    // 3. Definitions for Shimmer, Glows, and Shadows
    const defs = svg.append('defs');

    // Continent Shimmer Gradient (Champagne Gold Base with Highlight)
    const shimmerGrad = defs.append('linearGradient')
      .attr('id', 'shimmerGrad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%');
    shimmerGrad.append('stop').attr('offset', '0%').attr('stop-color', '#E7D7A8');
    shimmerGrad.append('stop').attr('offset', '40%').attr('stop-color', '#E7D7A8');
    shimmerGrad.append('stop').attr('offset', '50%').attr('stop-color', '#FFF2CC'); // Highlight shimmer
    shimmerGrad.append('stop').attr('offset', '60%').attr('stop-color', '#D4AF37');
    shimmerGrad.append('stop').attr('offset', '100%').attr('stop-color', '#D4AF37');

    // Route Gradient (Gold fade out)
    const routeGrad = defs.append('linearGradient')
      .attr('id', 'routeGrad')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%');
    routeGrad.append('stop').attr('offset', '0%').attr('stop-color', '#D4AF37').attr('stop-opacity', '0.85');
    routeGrad.append('stop').attr('offset', '100%').attr('stop-color', '#FFF2CC').attr('stop-opacity', '0.3');

    // Particle Radial Gradient
    const particleGrad = defs.append('radialGradient')
      .attr('id', 'particleGrad')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');
    particleGrad.append('stop').attr('offset', '0%').attr('stop-color', '#FFF8DC').attr('stop-opacity', '1');
    particleGrad.append('stop').attr('offset', '40%').attr('stop-color', '#D4AF37').attr('stop-opacity', '0.8');
    particleGrad.append('stop').attr('offset', '100%').attr('stop-color', '#D4AF37').attr('stop-opacity', '0');

    // Ambient radial background glow
    const ambientGlow = defs.append('radialGradient')
      .attr('id', 'ambientGlow')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');
    ambientGlow.append('stop').attr('offset', '0%').attr('stop-color', '#D4AF37').attr('stop-opacity', '0.14');
    ambientGlow.append('stop').attr('offset', '100%').attr('stop-color', '#D4AF37').attr('stop-opacity', '0');

    // Soft drop shadow for continents
    const shadowFilter = defs.append('filter')
      .attr('id', 'subtleShadow')
      .attr('x', '-10%')
      .attr('y', '-10%')
      .attr('width', '120%')
      .attr('height', '120%');
    shadowFilter.append('feDropShadow')
      .attr('dx', '0')
      .attr('dy', '3')
      .attr('stdDeviation', '4')
      .attr('flood-color', '#D4AF37')
      .attr('flood-opacity', '0.12');

    // Soft glow filter
    const glowFilter = defs.append('filter')
      .attr('id', 'softGlow')
      .attr('x', '-20%')
      .attr('y', '-20%')
      .attr('width', '140%')
      .attr('height', '140%');
    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '2.5')
      .attr('result', 'blur');
    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'blur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Draw background rect
    svg.append('rect')
      .attr('width', 1200)
      .attr('height', 600)
      .attr('fill', 'url(#ambientGlow)');

    // Projection & Path Setup
    const projection = d3.geoNaturalEarth1()
      .scale(170)
      .translate([600, 300]);

    const pathGen = d3.geoPath(projection);

    // Draw Countries directly from inlined GeoJSON data (with white country borders)
    const continentsG = svg.append('g')
      .attr('id', 'continents-layer')
      .attr('filter', 'url(#subtleShadow)');

    continentsG.selectAll('path')
      .data(WORLD_GEOJSON.features)
      .join('path')
      .attr('d', pathGen)
      .attr('fill', 'url(#shimmerGrad)')
      .attr('stroke', '#ffffff') // Outlined country boundaries in white like user's image
      .attr('stroke-width', '0.45')
      .attr('stroke-opacity', '0.9');

    const hq = LOCATIONS.find(l => l.isHQ);
    const indiaPoint = projection([hq.lng, hq.lat]);

    // Layers groups
    const routesG = svg.append('g').attr('id', 'routes-layer');
    const particlesG = svg.append('g').attr('id', 'particles-layer');
    const markersG = svg.append('g').attr('id', 'markers-layer');

    // Register MotionPathPlugin with GSAP
    if (typeof gsap !== 'undefined' && typeof MotionPathPlugin !== 'undefined') {{
      gsap.registerPlugin(MotionPathPlugin);
    }}

    // Master GSAP Timeline for synced routes
    const masterTimeline = gsap.timeline({{ repeat: -1 }});

    LOCATIONS.forEach((loc, index) => {{
      const p = projection([loc.lng, loc.lat]);
      if (!p) return;

      // Draw Route Line and animate (HQ to destinations only)
      if (!loc.isHQ) {{
        const routePathId = `vanilla-route-${{index}}`;
        const dx = p[0] - indiaPoint[0];
        const dy = p[1] - indiaPoint[1];
        const dr = Math.sqrt(dx * dx + dy * dy);
        const curve = 1.6;
        const pathD = `M${{indiaPoint[0]}},${{indiaPoint[1]}} A${{dr * curve}},${{dr * curve}} 0 0,1 ${{p[0]}},${{p[1]}}`;

        const routeLine = routesG.append('path')
          .attr('id', routePathId)
          .attr('d', pathD)
          .attr('fill', 'none')
          .attr('stroke', 'url(#routeGrad)')
          .attr('stroke-width', '1.2')
          .attr('stroke-linecap', 'round')
          .attr('filter', 'url(#softGlow)')
          .attr('opacity', '0.75');

        const pathEl = routeLine.node();
        const length = pathEl.getTotalLength();

        routeLine
          .attr('stroke-dasharray', length)
          .attr('stroke-dashoffset', length);

        const particle = particlesG.append('circle')
          .attr('r', '3.5')
          .attr('fill', 'url(#particleGrad)')
          .attr('filter', 'url(#softGlow)');

        // Animate line drawing
        masterTimeline.fromTo(routeLine,
          {{ strokeDashoffset: length }},
          {{ strokeDashoffset: 0, duration: 4, ease: 'none' }},
          0
        );

        // Animate particle along path
        masterTimeline.to(particle, {{
          duration: 4,
          ease: 'none',
          motionPath: {{
            path: `#${{routePathId}}`,
            autoRotate: false
          }}
        }}, 0);
      }}

      // Draw Location Marker Group
      const markerGroup = markersG.append('g')
        .attr('class', 'map-marker')
        .attr('style', 'cursor: pointer;')
        .on('mouseover', function (e) {{
          tooltipEl.innerHTML = `<div style="font-weight: 700; color: #C89B3C; margin-bottom: 4px; font-size: 13px;">${{loc.label}}</div>
                                 <div style="color: #666666; margin-bottom: 6px; font-weight: 600; font-size: 11px;">${{loc.subtitle}}</div>
                                 <div style="color: #444444; font-weight: 400; line-height: 1.5; font-size: 11px;">${{loc.description}}</div>`;
          tooltipEl.style.opacity = '1';
          tooltipEl.style.transform = 'translateY(0)';
        }})
        .on('mousemove', function (e) {{
          const rect = container.getBoundingClientRect();
          const tooltipWidth = tooltipEl.offsetWidth || 240;
          const tooltipHeight = tooltipEl.offsetHeight || 100;
          let left = e.clientX - rect.left - tooltipWidth / 2;
          let top = e.clientY - rect.top - tooltipHeight - 15;

          // Bound checks
          if (left < 10) left = 10;
          if (left + tooltipWidth > rect.width - 10) left = rect.width - tooltipWidth - 10;
          if (top < 10) top = e.clientY - rect.top + 20;

          tooltipEl.style.left = left + 'px';
          tooltipEl.style.top = top + 'px';
        }})
        .on('mouseout', function () {{
          tooltipEl.style.opacity = '0';
          tooltipEl.style.transform = 'translateY(10px)';
        }});

      if (loc.isHQ) {{
        // India HQ pulsing halo
        const hqHalo = markerGroup.append('circle')
          .attr('cx', p[0])
          .attr('cy', p[1])
          .attr('r', '6')
          .attr('fill', 'none')
          .attr('stroke', '#D4AF37')
          .attr('stroke-width', '2')
          .attr('opacity', '0.8');

        markerGroup.append('circle')
          .attr('cx', p[0])
          .attr('cy', p[1])
          .attr('r', '7')
          .attr('fill', 'none')
          .attr('stroke', '#C89B3C')
          .attr('stroke-width', '1');

        markerGroup.append('circle')
          .attr('cx', p[0])
          .attr('cy', p[1])
          .attr('r', '3.5')
          .attr('fill', '#C89B3C');

        // HQ pulse animation
        gsap.fromTo(hqHalo,
          {{ attr: {{ r: 6 }}, opacity: 0.8 }},
          {{ attr: {{ r: 24 }}, opacity: 0, duration: 2, repeat: -1, ease: 'power2.out' }}
        );
      }} else {{
        // Destination Dot
        markerGroup.append('circle')
          .attr('cx', p[0])
          .attr('cy', p[1])
          .attr('r', '3')
          .attr('fill', '#C89B3C');
        
        markerGroup.append('circle')
          .attr('cx', p[0])
          .attr('cy', p[1])
          .attr('r', '6')
          .attr('fill', 'none')
          .attr('stroke', '#D4AF37')
          .attr('stroke-width', '0.5')
          .attr('opacity', '0.5');
      }}

      // Location text labels (clean up emojis)
      const labelText = loc.label.replace(/[\\uE000-\\uF8FF]|\\uD83C[\\uDC00-\\uDFFF]|\\uD83D[\\uDC00-\\uDFFF]|[\\u2011-\\u26FF]|\\uD83E[\\uDD10-\\uDDFF]/g, '').trim();

      markerGroup.append('text')
        .attr('x', p[0] + 7)
        .attr('y', p[1] - 4)
        .text(labelText)
        .attr('font-size', '10px')
        .attr('fill', '#7A6130')
        .attr('font-family', \"'Montserrat', sans-serif\")
        .attr('font-weight', '600')
        .attr('opacity', '0.85')
        .attr('letter-spacing', '0.04em');
    }});

    // Animate Shimmer across continents
    gsap.fromTo("#shimmerGrad",
      {{ attr: {{ x1: "-100%", x2: "0%" }} }},
      {{ attr: {{ x1: "100%", x2: "200%" }}, duration: 6, repeat: -1, ease: "none" }}
    );

    // Subtle Floating Animation for the entire map
    gsap.to(svg.node(), {{
      y: -8,
      duration: 5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    }});

    // Viewport Entrance Animation using IntersectionObserver
    const observer = new IntersectionObserver((entries) => {{
      entries.forEach(entry => {{
        if (entry.isIntersecting) {{
          gsap.fromTo(container,
            {{ opacity: 0, y: 20 }},
            {{ opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }}
          );
          observer.unobserve(entry.target);
        }}
      }});
    }}, {{ threshold: 0.1 }});

    observer.observe(container);
  }}

  // Initialize
  if (document.readyState === 'loading') {{
    document.addEventListener('DOMContentLoaded', init);
  }} else {{
    init();
  }}

}})();
"""

with open(js_dest_file, 'w', encoding='utf-8') as f:
    f.write(script_content)
print(f"Successfully updated {js_dest_file} with inline country boundaries GeoJSON!")
