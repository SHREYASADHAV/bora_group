// BORA GROUP — Progressive GSAP ScrollTrigger Canvas Sequence Player
// Preloads 271 frames progressively in the background and scrubs them based on scroll

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("trade-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const totalFrames = 271;
  const images = [];
  let loadedCount = 0;

  // Helper to pad index numbers (e.g. 1 -> '001')
  const pad = (num) => {
    if (num < 10) return `00${num}`;
    if (num < 100) return `0${num}`;
    return `${num}`;
  };

  // Preload function (Progressive Background Loading)
  function preloadImages() {
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `./images/OVERSEAS/ezgif-frame-${pad(i)}.jpg`;
      img.onload = () => {
        loadedCount++;
        // Immediately draw the first frame when it's loaded to provide immediate visual background
        if (i === 1) {
          drawFrame(0);
        }
      };
      img.onerror = () => {
        loadedCount++;
      };
      images.push(img);
    }
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
    canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    
    // Draw current frame immediately on resize
    drawFrame(Math.floor(scrollObj.frame));
  }

  function drawFrame(index) {
    const img = images[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
    const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      // Canvas is wider than image
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      // Canvas is taller than image
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset scaling
  }

  const scrollObj = { frame: 0 };

  // Initialize Canvas layout and resize listener
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Setup GSAP ScrollTrigger timeline immediately (no preload block)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero-trigger",
      pin: true,
      scrub: 0.5,
      start: "top top",
      end: "+=250%",
      invalidateOnRefresh: true,
    }
  });

  // Animate frames from 0 to 270
  tl.to(scrollObj, {
    frame: totalFrames - 1,
    snap: "frame",
    ease: "none",
    onUpdate: () => {
      drawFrame(Math.floor(scrollObj.frame));
    }
  }, 0);

  // Fade out text content on scroll
  tl.to("#hero-content", {
    opacity: 0,
    y: -80,
    scale: 0.95,
    ease: "power1.inOut"
  }, 0);

  // Start progressive image preloading in the background
  preloadImages();
});
