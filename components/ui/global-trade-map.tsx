import { useEffect, useRef } from "react";
import { Map, MapGeoJSON } from "./map";
import { WORLD_GEOJSON } from "../../lib/use-world-data";
import * as d3 from "d3";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register GSAP MotionPathPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

const INDIA = { name: "India", lat: 20.5937, lng: 78.9629 };

const DESTINATIONS = [
  { name: "China", lat: 35.8617, lng: 104.1954 },
  { name: "Japan", lat: 36.2048, lng: 138.2529 },
  { name: "South Korea", lat: 35.9078, lng: 127.7669 },
  { name: "Singapore", lat: 1.3521, lng: 103.8198 },
  { name: "Thailand", lat: 15.87, lng: 100.9925 },
  { name: "Vietnam", lat: 14.0583, lng: 108.2772 },
  { name: "Malaysia", lat: 4.2105, lng: 101.9758 },
  { name: "UAE", lat: 23.4241, lng: 53.8478 },
  { name: "Saudi Arabia", lat: 23.8859, lng: 45.0792 },
  { name: "Qatar", lat: 25.3548, lng: 51.1839 },
  { name: "Oman", lat: 21.4735, lng: 55.9754 },
  { name: "Egypt", lat: 26.8206, lng: 30.8025 },
  { name: "Kenya", lat: -0.0236, lng: 37.9062 },
  { name: "Tanzania", lat: -6.369, lng: 34.8888 },
  { name: "South Africa", lat: -30.5595, lng: 22.9375 },
  { name: "Germany", lat: 51.1657, lng: 10.4515 },
  { name: "France", lat: 46.2276, lng: 2.2137 },
  { name: "Italy", lat: 41.8719, lng: 12.5674 },
  { name: "Netherlands", lat: 52.1326, lng: 5.2913 },
  { name: "United Kingdom", lat: 55.3781, lng: -3.436 },
  { name: "USA", lat: 39.8283, lng: -98.5795 },
  { name: "Canada", lat: 56.1304, lng: -106.3468 },
  { name: "Mexico", lat: 23.6345, lng: -102.5528 },
  { name: "Brazil", lat: -14.235, lng: -51.9253 },
  { name: "Chile", lat: -35.6751, lng: -71.543 },
  { name: "Australia", lat: -25.2744, lng: 133.7751 },
  { name: "New Zealand", lat: -40.9006, lng: 174.886 },
];

export default function GlobalTradeMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Create SVG Definitions for filters, gradients, and glows
    const defs = svg.append("defs");

    // Continent Shimmer Gradient (champagne gold base with moving highlights)
    const shimmerGrad = defs.append("linearGradient")
      .attr("id", "shimmerGrad")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    shimmerGrad.append("stop").attr("offset", "0%").attr("stop-color", "#E7D7A8");
    shimmerGrad.append("stop").attr("offset", "40%").attr("stop-color", "#E7D7A8");
    shimmerGrad.append("stop").attr("offset", "50%").attr("stop-color", "#FFF2CC"); // Highlight shimmer
    shimmerGrad.append("stop").attr("offset", "60%").attr("stop-color", "#D4AF37");
    shimmerGrad.append("stop").attr("offset", "100%").attr("stop-color", "#D4AF37");

    // Route Gradient (Gold fade out)
    const routeGrad = defs.append("linearGradient")
      .attr("id", "routeGrad")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%");
    routeGrad.append("stop").attr("offset", "0%").attr("stop-color", "#D4AF37").attr("stop-opacity", "0.85");
    routeGrad.append("stop").attr("offset", "100%").attr("stop-color", "#FFF2CC").attr("stop-opacity", "0.3");

    // Particle Radial Gradient (Glowing center)
    const particleGrad = defs.append("radialGradient")
      .attr("id", "particleGrad")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");
    particleGrad.append("stop").attr("offset", "0%").attr("stop-color", "#FFF8DC").attr("stop-opacity", "1");
    particleGrad.append("stop").attr("offset", "40%").attr("stop-color", "#D4AF37").attr("stop-opacity", "0.8");
    particleGrad.append("stop").attr("offset", "100%").attr("stop-color", "#D4AF37").attr("stop-opacity", "0");

    // Ambient background radial glow
    const ambientGlow = defs.append("radialGradient")
      .attr("id", "ambientGlow")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%");
    ambientGlow.append("stop").attr("offset", "0%").attr("stop-color", "#D4AF37").attr("stop-opacity", "0.14");
    ambientGlow.append("stop").attr("offset", "100%").attr("stop-color", "#D4AF37").attr("stop-opacity", "0");

    // Soft drop shadow filter for continents (retina quality)
    const shadowFilter = defs.append("filter")
      .attr("id", "subtleShadow")
      .attr("x", "-10%")
      .attr("y", "-10%")
      .attr("width", "120%")
      .attr("height", "120%");
    shadowFilter.append("feDropShadow")
      .attr("dx", "0")
      .attr("dy", "3")
      .attr("stdDeviation", "4")
      .attr("flood-color", "#D4AF37")
      .attr("flood-opacity", "0.12");

    // Soft glow filter for routes and markers
    const glowFilter = defs.append("filter")
      .attr("id", "softGlow")
      .attr("x", "-20%")
      .attr("y", "-20%")
      .attr("width", "140%")
      .attr("height", "140%");
    glowFilter.append("feGaussianBlur")
      .attr("stdDeviation", "2.5")
      .attr("result", "blur");
    const feMerge = glowFilter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "blur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    // 1. Ambient Glow Background Rect
    svg.append("rect")
      .attr("width", "1200")
      .attr("height", "600")
      .attr("fill", "url(#ambientGlow)");

    // D3 Projection and Path Generator
    const projection = d3.geoNaturalEarth1()
      .scale(170)
      .translate([600, 300]);

    const path = d3.geoPath(projection);

    // 2. Continents Group with Premium Shimmer and Shadows
    const continentsG = svg.append("g")
      .attr("id", "continents-layer")
      .attr("filter", "url(#subtleShadow)");

    continentsG.selectAll("path")
      .data(WORLD_GEOJSON.features)
      .join("path")
      .attr("d", path as any)
      .attr("fill", "url(#shimmerGrad)")
      .attr("stroke", "#D4AF37")
      .attr("stroke-width", "0.4")
      .attr("stroke-opacity", "0.6")
      .style("transform-origin", "center");

    const indiaPoint = projection([INDIA.lng, INDIA.lat]);
    if (!indiaPoint) return;

    // 3. Trade Routes & Particles Group
    const routesG = svg.append("g").attr("id", "routes-layer");
    const particlesG = svg.append("g").attr("id", "particles-layer");
    const markersG = svg.append("g").attr("id", "markers-layer");

    // Master Timeline for simultaneous synced loops
    const masterTimeline = gsap.timeline({ repeat: -1 });

    // Draw destinations and animate paths
    DESTINATIONS.forEach((country, index) => {
      const p = projection([country.lng, country.lat]);
      if (!p) return;

      // Draw curved Bezier path route
      const routePathId = `route-${index}`;
      
      // Calculate control points for clean Bezier curves
      const dx = p[0] - indiaPoint[0];
      const dy = p[1] - indiaPoint[1];
      const dr = Math.sqrt(dx * dx + dy * dy);
      
      // Curving factor (higher = more curved)
      const curve = 1.6; 
      const pathD = `M${indiaPoint[0]},${indiaPoint[1]} A${dr * curve},${dr * curve} 0 0,1 ${p[0]},${p[1]}`;

      const routeLine = routesG.append("path")
        .attr("id", routePathId)
        .attr("d", pathD)
        .attr("fill", "none")
        .attr("stroke", "url(#routeGrad)")
        .attr("stroke-width", "1.2")
        .attr("stroke-linecap", "round")
        .attr("filter", "url(#softGlow)")
        .attr("opacity", "0.75");

      const pathEl = routeLine.node();
      if (!pathEl) return;
      const length = pathEl.getTotalLength();

      // Configure dash offsets for drawing animation
      routeLine
        .attr("stroke-dasharray", length)
        .attr("stroke-dashoffset", length);

      // Create glowing particle moving along route
      const particle = particlesG.append("circle")
        .attr("r", "3.5")
        .attr("fill", "url(#particleGrad)")
        .attr("filter", "url(#softGlow)");

      // Animate line drawing
      masterTimeline.fromTo(routeLine, 
        { strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 4, ease: "none" },
        0
      );

      // Animate particle along route using MotionPathPlugin
      masterTimeline.to(particle, {
        duration: 4,
        ease: "none",
        motionPath: {
          path: `#${routePathId}`,
          autoRotate: false
        }
      }, 0);

      // Destination dots and text labels
      markersG.append("circle")
        .attr("cx", p[0])
        .attr("cy", p[1])
        .attr("r", "2")
        .attr("fill", "#C89B3C");

      markersG.append("text")
        .attr("x", p[0] + 6)
        .attr("y", p[1] - 4)
        .text(country.name)
        .attr("font-size", "9px")
        .attr("fill", "#7A6130")
        .attr("font-family", "Inter, sans-serif")
        .attr("font-weight", "500")
        .attr("opacity", "0.85")
        .attr("letter-spacing", "0.05em");
    });

    // 4. India HQ Marker Group (Solid Center, Ring, Pulsing Halo)
    const hqG = svg.append("g")
      .attr("id", "hq-group")
      .attr("filter", "url(#softGlow)");

    // Pulsing Halo Circle
    const hqHalo = hqG.append("circle")
      .attr("cx", indiaPoint[0])
      .attr("cy", indiaPoint[1])
      .attr("r", "6")
      .attr("fill", "none")
      .attr("stroke", "#D4AF37")
      .attr("stroke-width", "2")
      .attr("opacity", "0.8");

    // Outer Fixed Ring
    hqG.append("circle")
      .attr("cx", indiaPoint[0])
      .attr("cy", indiaPoint[1])
      .attr("r", "7")
      .attr("fill", "none")
      .attr("stroke", "#C89B3C")
      .attr("stroke-width", "1");

    // Solid Gold Center Dot
    hqG.append("circle")
      .attr("cx", indiaPoint[0])
      .attr("cy", indiaPoint[1])
      .attr("r", "3.5")
      .attr("fill", "#C89B3C");

    // Animate HQ Halo (pulsing every 2s)
    gsap.fromTo(hqHalo, 
      { attr: { r: 6 }, opacity: 0.8 },
      { attr: { r: 24 }, opacity: 0, duration: 2, repeat: -1, ease: "power2.out" }
    );

    // Animate Shimmer across continents (gradient animation)
    gsap.fromTo("#shimmerGrad",
      { attr: { x1: "-100%", x2: "0%" } },
      { attr: { x1: "100%", x2: "200%" }, duration: 6, repeat: -1, ease: "none" }
    );

    // 5. Subtle Floating Animation for the entire map
    gsap.to(svgRef.current, {
      y: -8,
      duration: 5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });

    // 6. Viewport Entrance Fade-in Animation
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(containerRef.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      masterTimeline.kill();
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* Soft Background blur layer */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0%, transparent 70%)"
        }}
      />
      <svg
        ref={svgRef}
        width="1200"
        height="600"
        viewBox="0 0 1200 600"
        className="w-full h-auto relative z-10 select-none"
      />
    </div>
  );
}
