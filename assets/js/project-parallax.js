(() => {
  const backgrounds = [...document.querySelectorAll('[data-project-parallax]')].map(section => ({
    section,
    image: section.querySelector('.project-parallax-image'),
    speed: Number(section.dataset.projectParallax)
  })).filter(background => background.image);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let frame;
  function render() {
    frame = null;
    const viewport = document.documentElement.clientHeight;
    for (const { section, image, speed } of backgrounds) {
      const rect = section.getBoundingClientRect();
      const travel = reducedMotion.matches ? 0 : viewport * speed;
      const progress = Math.max(0, Math.min(1, (viewport - rect.top) / (viewport + rect.height)));
      image.style.height = `${rect.height + travel}px`;
      image.style.transform = `translate3d(0, ${-travel * (1 - progress)}px, 0)`;
    }
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(render);
  }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  reducedMotion.addEventListener('change', schedule);
  const observer = new ResizeObserver(schedule);
  backgrounds.forEach(({ section }) => observer.observe(section));
  render();
})();
