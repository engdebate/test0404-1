const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');
const themeToggle = document.querySelector('#themeToggle');
const body = document.body;

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

const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({ length: Math.min(150, Math.floor(window.innerWidth / 8)) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * 1.2 + 0.2,
    radius: Math.random() * 1.4 + 0.3,
  }));
}

function renderStarfield() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const star of stars) {
    star.y += 0.15 * star.z;
    if (star.y > canvas.height + 5) {
      star.y = -5;
      star.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius * star.z, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fill();
  }

  requestAnimationFrame(renderStarfield);
}

resizeCanvas();
renderStarfield();
window.addEventListener('resize', resizeCanvas);
