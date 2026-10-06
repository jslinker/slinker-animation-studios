// Responsive section curves and text accents, without a platform runtime.
(() => {
  const sections = [...document.querySelectorAll('.page-section')];
  const dividers = sections.filter(s => s.dataset.divider).map(s => [s.dataset.sectionId, Number(s.dataset.dividerHeight), s.dataset.divider]);
  const highlights = [...document.querySelectorAll('.sqsrte-text-highlight')];
  const ns = 'http://www.w3.org/2000/svg';
  const accents = highlights.map((span) => {
    const shape = span.dataset.accent;
    const svg = document.createElementNS(ns, 'svg');
    svg.classList.add('project-text-accent');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('viewBox', '0 0 200 60');
    svg.setAttribute('preserveAspectRatio', 'none');
    const path = document.createElementNS(ns, 'path');
    path.setAttribute('d', shape === 'circle'
      ? 'M66,61 C110,64 210,60 210,31 C210,6 144,0 98,0 S-9,6 -9,30 S42,67 152,64'
      : shape === 'enclose'
        ? 'M0,13 C35,12 65,10 100,12 S165,11 200,14 M0,58 C35,60 65,57 100,59 S165,59 200,58'
      : shape === 'wave'
        ? 'M0,58 '+Array(20).fill(0).map((_,i)=>`c2.5,0 2.5,${i%2 ? 7 : -7} 10,${i%2 ? 7 : -7}`).join(' ')
      : shape === 'jagged'
        ? 'M0,58 '+Array(20).fill('l8,-7 l-3,7').join(' ')
      : shape === 'curve'
        ? 'M0,59.4 C25,57.75 50,54.3 100,52.8 S176,52.8 200,53.4 C204.8,53.52 196.2,55.11 196,55.2'
        : 'M0,52.8 C15,52.53 70,50.82 100,51 C130,51.18 197,54 200,54 S147,50.55 120,51 S23,56.28 20,57 S79,55.8 100,55.8 S160,56.37 160,57 S115,59.55 100,60 S66,60 60,60');
    path.setAttribute('vector-effect', 'non-scaling-stroke');
    svg.append(path);
    span.closest('.sqs-block-content').append(svg);
    return [svg];
  });
  function render() {
    dividers.forEach(([id, percent, shape]) => {
      const section = sections.find(s => s.dataset.sectionId === id);
      section.style.setProperty('--divider-height', `${percent}vw`);
      section.style.setProperty('--z-index', sections.length - sections.indexOf(section));
      const next = sections[sections.indexOf(section) + 1];
      if (next) next.style.setProperty('--previous-section-divider-offset', `${percent}vw`);
      const h = section.querySelector('.section-background').getBoundingClientRect().height;
      const q = Math.round(percent / 100 * document.documentElement.clientWidth / h * 1000) / 1000;
      const y = 1 - q;
      let d = shape === 'wave'
        ? `M-1,${y} L-1,${y} ${Array(3).fill(`l0,0 c0,0 .25,${q} .5,${q} s.5,${-q} .5,${-q} l0,0`).join('')} L1,-1 L0,-1 z`
        : shape === 'step'
          ? `M2,${y} L2,1 ${Array(3).fill(`l0,0 l-1,${-q} l0,${q}`).join('')} L-1,-1 L2,-1 z`
          : shape === 'slope'
            ? `M-1,${y} L-1,1 ${Array(3).fill(`l0,0 l1,${-q} l0,${q}`).join('')} L2,-1 L-1,-1 z`
          : shape === 'triangle'
            ? `M-1.3165,${y} L-1.3165,1 ${Array(3).fill(`l0,0 l.5,${-q} l.5,${q}`).join('')} L1,-1 L0,-1 z`
          : `M-1,${y} L-1,1 ${Array(3).fill(`l0,0 c.25,0 .5,0 1,${-q} l0,${q}`).join('')} L2,-1 L-1,-1 z`;
      section.querySelector('.section-divider-clip').setAttribute('d', d);
    });
    highlights.forEach((span, i) => {
      // Inline text can wrap: decorate each line instead of the union of its boxes.
      const fontSize = parseFloat(getComputedStyle(span).fontSize);
      const boxes = [...span.getClientRects()];
      const rects = boxes.filter(rect => rect.height && rect.width > (boxes.length > 1 ? fontSize * .3 : 0));
      const container = span.closest('.sqs-block-content');
      const parent = container.getBoundingClientRect();
      const svgs = accents[i];
      while (svgs.length < rects.length) {
        const svg = svgs[0].cloneNode(true);
        container.append(svg);
        svgs.push(svg);
      }
      svgs.forEach((svg, line) => {
        const rect = rects[line];
        svg.style.display = rect ? '' : 'none';
        if (!rect) return;
        Object.assign(svg.style, {
          left: `${rect.left - parent.left}px`, top: `${rect.top - parent.top}px`,
          width: `${rect.width}px`, height: `${rect.height}px`,
          strokeWidth: `${fontSize * .1}px`
        });
        if (span.dataset.accent === 'jagged') {
          const padding = Math.round(fontSize * .1);
          const width = Math.round(rect.width) + padding * 2;
          const height = Math.round(rect.height);
          const tooth = fontSize * .25;
          const rise = fontSize * .12;
          const count = Math.max(1, Math.floor(width / (tooth * .7)));
          svg.style.left = `${rect.left - parent.left - padding}px`;
          svg.style.width = `${width}px`;
          svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
          svg.firstElementChild.setAttribute('d', `M0,${height * .97} ${Array(count).fill(`c${tooth * .25},${-rise * .25} ${tooth * .825},${-rise} ${tooth},${-rise} c${tooth * .175},0 ${-tooth * .225},${rise * .75} ${-tooth * .3},${rise}`).join(' ')}`);
        }
      });
    });
  }
  let pending = false;
  const schedule = () => {
    if (!pending) requestAnimationFrame(() => { pending = false; render(); });
    pending = true;
  };
  const observer = new ResizeObserver(schedule);
  sections.forEach(section => observer.observe(section));
  window.addEventListener('resize', schedule);
  document.fonts.ready.then(schedule);
  render();
  // Only the decorative header clip autoplays; embedded films remain user-controlled.
  document.querySelectorAll('video[data-video-src]').forEach(video => {
    const button = video.closest('.page-section').querySelector('.project-video-control');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      const label = video.paused ? 'Play animation' : 'Pause animation';
      button.textContent = label;
      button.setAttribute('aria-label', label);
    };
    const play = async () => {
      if (!video.src) video.src = video.dataset.videoSrc;
      try { await video.play(); } catch { update(); }
    };
    video.addEventListener('playing', () => { video.classList.add('is-playing'); update(); });
    video.addEventListener('pause', update);
    video.addEventListener('error', () => { video.classList.remove('is-playing'); update(); });
    button.addEventListener('click', () => video.paused ? play() : video.pause());
    motion.addEventListener('change', () => { if (motion.matches) video.pause(); });
    if (!motion.matches && !navigator.connection?.saveData) play();
  });
})();
