const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = -100, my = -100, rx = -100, ry = -100;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animCursor() {
  cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
  requestAnimationFrame(animCursor);
}
animCursor();

const revealText = document.getElementById('revealText');
const words = revealText.querySelectorAll('.rword');
const totalWords = words.length;

function updateWordReveal() {
  const rect = revealText.getBoundingClientRect();
  const vh = window.innerHeight;
  const start = vh * 0.85;
  const end = vh * 0.1;
  if (rect.top > start) { words.forEach(w => w.classList.remove('lit')); return; }
  if (rect.bottom < end) { words.forEach(w => w.classList.add('lit')); return; }
  const progress = (start - rect.top) / (start - end + rect.height);
  const litCount = Math.round(progress * totalWords);
  words.forEach((w, i) => {
    if (i < litCount) w.classList.add('lit');
    else w.classList.remove('lit');
  });
}

const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.15 });

document.querySelectorAll('.scroll-fade, .stagger-children').forEach(el => obs.observe(el));

window.addEventListener('scroll', updateWordReveal, { passive: true });
updateWordReveal();

let lastScrollY = window.scrollY;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {

  if (window.scrollY > lastScrollY && window.scrollY > 100) {
    nav.classList.add('hide-nav');
  } else {
    nav.classList.remove('hide-nav');
  }

  lastScrollY = window.scrollY;
});