// Initialize theme from localStorage
const initTheme = () => {
  // Always start in dark mode for a new session.
  localStorage.removeItem('theme');
  document.body.classList.remove('light-mode');
  return 'dark';
};

let currentTheme = initTheme();

// Mode toggle functionality
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', currentTheme);

  // Optional: If you want to add a sound effect, you can add the logic here.
  // For example: document.getElementById('clickSound').play();
});

// 3D card tilt effect
const card = document.getElementById('card');
const wrap = document.getElementById('cardWrap');
wrap.addEventListener('mousemove', e => {
  const rect = wrap.getBoundingClientRect();
  const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
  const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
  card.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 14}deg)`;
});
wrap.addEventListener('mouseleave', () => { 
  card.style.transform = 'rotateY(0) rotateX(0)'; 
});

// Spider web animation
const canvas = document.getElementById('spiderCanvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;
window.addEventListener('resize', ()=>{
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
});

const nodes = [], rows = 6, cols = 10;
for(let i=0; i<rows; i++){
  nodes[i]=[];
  for(let j=0; j<cols; j++){
    nodes[i][j]={
      x: 50+j*(w-100)/(cols-1),
      y: 50+i*(h-100)/(rows-1)
    };
  }
}

class MathSymbol {
  constructor() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.symbols = ['∂', 'Σ', '∫', 'π', 'θ', '√', '∞', 'λ', '∆', 'α', 'β'];
    this.text = this.symbols[Math.floor(Math.random() * this.symbols.length)];
    this.size = 14 + Math.random() * 12;
    this.a = Math.random() * Math.PI * 2;
    this.s = 0.2 + Math.random() * 0.4;
    this.opacity = 0.2 + Math.random() * 0.4;
    this.rotate = Math.random() * 360;
  }

  update() {
    this.x += Math.cos(this.a) * this.s;
    this.y += Math.sin(this.a) * this.s;
    this.rotate += 0.5;

    if (this.x < -50) this.x = w + 50;
    if (this.x > w + 50) this.x = -50;
    if (this.y < -50) this.y = h + 50;
    if (this.y > h + 50) this.y = -50;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotate * Math.PI) / 180);
    ctx.font = `${this.size}px 'Times New Roman', serif`;
    const isDarkMode = currentTheme === 'dark';
    ctx.fillStyle = isDarkMode 
      ? `rgba(6,182,212,${this.opacity})` 
      : `rgba(2,132,199,${this.opacity})`;
    ctx.shadowBlur = 6;
    ctx.fillText(this.text, 0, 0);
    ctx.restore();
  }
}

const mathSymbols = [];
for (let i = 0; i < 20; i++) mathSymbols.push(new MathSymbol());

function animate() {
  ctx.clearRect(0, 0, w, h);

  const webStrokeColor = getComputedStyle(document.documentElement).getPropertyValue('--web-stroke');
  ctx.strokeStyle = webStrokeColor;

  // Draw web lines
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols - 1; j++) {
      ctx.beginPath();
      ctx.moveTo(nodes[i][j].x, nodes[i][j].y);
      ctx.lineTo(nodes[i][j + 1].x, nodes[i][j + 1].y);
      ctx.stroke();
    }
  }
  for (let j = 0; j < cols; j++) {
    for (let i = 0; i < rows - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(nodes[i][j].x, nodes[i][j].y);
      ctx.lineTo(nodes[i + 1][j].x, nodes[i + 1][j].y);
      ctx.stroke();
    }
  }

  // Animate symbols
  mathSymbols.forEach((s) => {
    s.update();
    s.draw();
  });

  requestAnimationFrame(animate);
}
animate();

// Typing animation
const nameEl = document.getElementById('particleName');
const roleEl = document.getElementById('particleRole');
const nameText = nameEl.textContent;
const roleText = roleEl.textContent;

let index = 0;
let roleIndex = 0;

nameEl.textContent = '';
roleEl.textContent = '';

function generateParticle(x, y, symbolList) {
  const particle = document.createElement('span');
  particle.className = 'particle';
  particle.textContent = symbolList[Math.floor(Math.random() * symbolList.length)];
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.fontSize = (12 + Math.random() * 12) + 'px';
  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 1500);
}

function typeName() {
  if (index < nameText.length) {
    const span = document.createElement('span');
    span.textContent = nameText[index];
    nameEl.appendChild(span);

    const rect = span.getBoundingClientRect();
    for (let i = 0; i < 4; i++) {
      const offsetX = Math.random() * rect.width - rect.width / 2;
      const offsetY = Math.random() * rect.height - rect.height / 2;
      generateParticle(rect.left + offsetX, rect.top + offsetY, ['∂', '∫', 'Σ', 'π', '∞', '√', '∆', 'θ', 'λ', 'α', 'β']);
    }

    index++;
    setTimeout(typeName, 100);
  } else {
    setTimeout(typeRole, 300);
  }
}

function typeRole() {
  if (roleIndex < roleText.length) {
    const span = document.createElement('span');
    span.textContent = roleText[roleIndex];
    roleEl.appendChild(span);

    const rect = span.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
      const offsetX = Math.random() * rect.width - rect.width / 2;
      const offsetY = Math.random() * rect.height - rect.height / 2;
      generateParticle(rect.left + offsetX, rect.top + offsetY, ['∂', '∫', 'Σ', 'π', '∞', '√', '∆', 'θ', 'λ', 'α', 'β']);
    }

    roleIndex++;
    setTimeout(typeRole, 100);
  }
}

typeName();

// Copy Email Button
const copyEmailBtn = document.getElementById('copyEmailBtn');
copyEmailBtn.addEventListener('click', () => {
  const email = 'khatrijr01@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    // Success feedback
    const originalText = copyEmailBtn.textContent;
    copyEmailBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyEmailBtn.textContent = originalText;
    }, 2000); // Revert back after 2 seconds
  }).catch(err => {
    // Error feedback
    console.error('Failed to copy email: ', err);
    alert('Failed to copy email. Please copy it manually: ' + email);
  });
});