const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');
const themeToggle = document.querySelector('#themeToggle');
const body = document.body;
const parallaxItems = document.querySelectorAll('[data-parallax-speed]');

function activateTab(tabId) {
  tabButtons.forEach((button) => {
    const active = button.dataset.tab === tabId;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-selected', String(active));
  });

  panels.forEach((panel) => {
    panel.classList.toggle('is-active', panel.id === tabId);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener('click', () => activateTab(button.dataset.tab));
});

function toggleTheme() {
  const currentTheme = body.dataset.theme;
  body.dataset.theme = currentTheme === 'aurora' ? 'default' : 'aurora';
}

themeToggle.addEventListener('click', toggleTheme);


function updateDebateParallax() {
  const scrollY = window.scrollY;
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallaxSpeed || 0);
    const offset = scrollY * speed;
    item.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  });
}

const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
let viewportHeight = window.innerHeight;

function createStar() {
  const depth = Math.random() * 0.9 + 0.1;
  return {
    x: Math.random(),
    y: Math.random(),
    depth,
    size: (Math.random() * 1.2 + 0.3) * depth,
    twinkleSpeed: Math.random() * 1.8 + 0.7,
    phase: Math.random() * Math.PI * 2,
  };
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  viewportHeight = window.innerHeight;
  stars = Array.from({ length: Math.min(240, Math.floor(window.innerWidth / 5)) }, createStar);
}

function drawStarfield(timestamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const scrollY = window.scrollY;

  for (const star of stars) {
    const x = star.x * canvas.width;
    const parallaxY = (star.y * viewportHeight + scrollY * star.depth * 0.35) % (viewportHeight + 30);
    const y = parallaxY - 15;
    const alpha = 0.25 + Math.abs(Math.sin(timestamp * 0.001 * star.twinkleSpeed + star.phase)) * 0.7;

    ctx.beginPath();
    ctx.arc(x, y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
    ctx.fill();
  }

  requestAnimationFrame(drawStarfield);
}

resizeCanvas();
updateDebateParallax();
requestAnimationFrame(drawStarfield);
window.addEventListener('resize', () => {
  resizeCanvas();
  updateDebateParallax();
});
window.addEventListener('scroll', updateDebateParallax, { passive: true });
