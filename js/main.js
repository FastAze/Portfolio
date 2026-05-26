/* =========================================================
   Portfolio FastAze · Catppuccin Mocha
   ========================================================= */

// Horloge style tmux dans la statusbar
function updateClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  el.textContent = `${hh}:${mm}`;
}
updateClock();
setInterval(updateClock, 30 * 1000);

// Typewriter hero fastfetch
const twEl = document.getElementById('tw');
if (twEl) {
  const phrases = [
    "Étudiant en BTS SIO, développeur full-stack.",
    "Self-hosted homelab.",
    "Bidouilleur de systèmes.",
    "Recherche d'alternance :("
  ];
  let pi = 0, ci = 0, deleting = false, wait = 0;
  function tick() {
    const phrase = phrases[pi];
    if (wait > 0) { wait--; setTimeout(tick, 80); return; }
    if (!deleting) {
      twEl.textContent = phrase.slice(0, ci + 1);
      ci++;
      if (ci === phrase.length) { wait = 28; deleting = true; setTimeout(tick, 80); }
      else setTimeout(tick, 55);
    } else {
      twEl.textContent = phrase.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; wait = 6; setTimeout(tick, 80); }
      else setTimeout(tick, 30);
    }
  }
  tick();
}

// Smooth scroll sur les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Effet "tape" simple sur les commandes au scroll (révélation)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.prompt-line').forEach(line => {
  line.style.opacity = '0';
  line.style.transition = 'opacity 0.4s ease';
  observer.observe(line);
});
