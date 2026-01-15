// src/scripts/mouse-glow.js
(function () {
  const root = document.documentElement;
  let raf = 0;
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 3;

  function update() {
    raf = 0;
    root.style.setProperty("--mx", x + "px");
    root.style.setProperty("--my", y + "px");
  }

  window.addEventListener(
    "mousemove",
    (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    },
    { passive: true }
  );

  // 触屏：用 touchmove
  window.addEventListener(
    "touchmove",
    (e) => {
      if (!e.touches || !e.touches[0]) return;
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
      if (!raf) raf = requestAnimationFrame(update);
    },
    { passive: true }
  );

  // 初始化一次
  update();
})();
