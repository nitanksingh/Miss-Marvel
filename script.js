document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('surpriseBtn');
  btn.addEventListener('click', showLove);
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  const confettiPieces = [];
  const PIECE_COUNT = Math.min(180, Math.floor(window.innerWidth / 6));
  for (let i = 0; i < PIECE_COUNT; i++) {
    confettiPieces.push(randomConfetti());
  }
  let animating = false;
  function randomConfetti() {
    const size = Math.random() * 10 + 6;
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: size,
      h: size * (0.6 + Math.random() * 0.8),
      color: `hsl(${Math.random() * 360}, 85%, ${45 + Math.random() * 10}%)`,
      speed: 2 + Math.random() * 4,
      rotate: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2
    };
  }
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiPieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x + p.w/2, p.y + p.h/2);
      ctx.rotate(p.rotate);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
      p.y += p.speed;
      p.rotate += p.rotationSpeed;
      if (p.y > canvas.height + 50) {
        Object.assign(p, randomConfetti(), { y: -20 });
      }
    });
    if (animating) requestAnimationFrame(draw);
  }
  function startConfetti() {
    if (!animating) {
      animating = true;
      draw();
      setTimeout(() => animating = false, 6000);
    }
  }
  function showLove() {
    showToast("You’re my Marvelous Stree ❤️ The best part of every universe I can imagine.");
    startConfetti();
  }
  function showToast(text, duration = 3500) {
    const t = document.createElement('div');
    t.textContent = text;
    t.style.position = 'fixed';
    t.style.left = '50%';
    t.style.top = '12%';
    t.style.transform = 'translateX(-50%)';
    t.style.padding = '12px 18px';
    t.style.background = 'rgba(255,255,255,0.96)';
    t.style.color = '#2a5298';
    t.style.borderRadius = '10px';
    t.style.fontWeight = '700';
    t.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    t.style.zIndex = 9999;
    t.style.opacity = '0';
    t.style.transition = 'opacity .25s ease, transform .25s ease';
    document.body.appendChild(t);
    requestAnimationFrame(() => {
      t.style.opacity = '1';
      t.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      t.style.opacity = '0';
      t.style.transform = 'translateX(-50%) translateY(-10px)';
      setTimeout(() => document.body.removeChild(t), 300);
    }, duration);
  }
});