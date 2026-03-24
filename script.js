(function initGlow(){
  const light = document.getElementById("light");
  if(!light) return;

  document.body.classList.add("has-glow");

  let mx = innerWidth * 0.5, my = innerHeight * 0.5;
  let lx = mx, ly = my;

  const lerp = (a, b, t) => a + (b - a) * t;

  addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  function tick(){
    const dx = mx - lx;
    const dy = my - ly;
    const dist = Math.hypot(dx, dy);

    // dist 越大追越快：0.22 ~ 0.55
    const t = Math.min(0.55, 0.22 + dist / 1200);

    lx = lerp(lx, mx, t);
    ly = lerp(ly, my, t);

    light.style.left = lx + "px";
    light.style.top = ly + "px";

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

(function initFadeUp(){
  const els = document.querySelectorAll(".fade-up");
  if(!els.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.2 }
  );

  els.forEach(el => observer.observe(el));
})();
