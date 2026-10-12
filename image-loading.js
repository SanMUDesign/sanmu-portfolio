/* Web-sized artwork, loaded near the viewport. Originals are not served here. */
const cardImageSizes = '(max-width: 700px) calc(100vw - 48px), 46vw';
function artworkImage(src, alt, sizes, eager = false, className = '') {
  const asset = imageManifest[src];
  const fallback = asset.variants.find(v => v.width >= 1280) || asset.variants.at(-1);
  const srcset = asset.variants.map(v => `${v.src} ${v.width}w`).join(', ');
  return `<img class="${className}" ${eager ? 'src' : 'data-src'}="${fallback.src}" ${eager ? 'srcset' : 'data-srcset'}="${srcset}" sizes="${sizes}" width="${asset.width}" height="${asset.height}" alt="${escapeHtml(alt)}" decoding="async" draggable="false" ${eager ? 'fetchpriority="high"' : ''}>`;
}
function loadArtworkNearViewport() {
  const images = [...document.querySelectorAll('img[data-src]')];
  const load = img => {
    img.srcset = img.dataset.srcset;
    img.src = img.dataset.src;
    delete img.dataset.src;
    delete img.dataset.srcset;
  };
  if (!('IntersectionObserver' in window)) { images.forEach(load); return null; }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { load(entry.target); observer.unobserve(entry.target); }
  }), { rootMargin: '250px 0px' });
  images.forEach(img => observer.observe(img));
  return observer;
}
function heroImageSource(project) {
  const variants = imageManifest[project.heroImage || project.image].variants;
  const width = Math.min(1600, innerWidth * Math.min(devicePixelRatio || 1, 2));
  return (variants.find(v => v.width >= width) || variants.at(-1)).src;
}

// Discourage routine image saving without interfering with navigation or text copying.
function isArtworkTarget(target) {
  return target instanceof Element && Boolean(target.closest('.artwork-protected, img, .hero-images'));
}
document.addEventListener('contextmenu', event => {
  if (isArtworkTarget(event.target)) event.preventDefault();
});
document.addEventListener('dragstart', event => {
  if (isArtworkTarget(event.target) || event.target.closest?.('.project-card')) event.preventDefault();
});
document.addEventListener('copy', event => {
  const selection = window.getSelection();
  const includesImage = selection && Array.from({length: selection.rangeCount}, (_, i) =>
    selection.getRangeAt(i).cloneContents()).some(fragment => fragment.querySelector('img'));
  if (isArtworkTarget(event.target) || includesImage) event.preventDefault();
});
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's' &&
      !event.target.closest?.('input, textarea, [contenteditable="true"]')) event.preventDefault();
});
