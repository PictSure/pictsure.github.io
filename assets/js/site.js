// Reading time (200 wpm) + TOC builder
(function() {
  const article = document.getElementById('post-body');
  const rt = document.getElementById('reading-time');
  if (article && rt) {
    const words = (article.innerText || '').trim().split(/\s+/).length;
    rt.textContent = Math.max(1, Math.round(words / 200));
  }

  const toc = document.getElementById('toc');
  if (article && toc) {
    // If server-side TOC already rendered (has children), skip client-side build.
    if (toc.children.length === 0) {
      const hs = article.querySelectorAll('h2, h3');
      hs.forEach(h => {
        if (!h.id) h.id = h.textContent.trim().toLowerCase().replace(/[^\w]+/g,'-');
        const a = document.createElement('a');
        a.href = `#${h.id}`;
        a.textContent = h.textContent;
        a.className = 'block hover:underline';
        if (h.tagName === 'H3') a.className += ' ml-3 opacity-80';
        toc.appendChild(a);
      });
    }
  }

  // Horizontal scroller buttons on home
  const scroller = document.getElementById('cards');
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  if (scroller && prev && next) {
    const step = 420 + 24; // approx card width + gap
    prev.addEventListener('click', () => scroller.scrollBy({ left: -step, behavior: 'smooth' }));
    next.addEventListener('click', () => scroller.scrollBy({ left: step, behavior: 'smooth' }));
  }
})();
