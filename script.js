// Initialize theme from localStorage
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('bg-dark').style.opacity = '0';
    document.getElementById('bg-light').style.opacity = '1';
  }
  return savedTheme;
};

let currentTheme = initTheme();

// Mode toggle functionality
const clickSound = document.getElementById('clickSound');
const modeToggle = document.getElementById('modeToggle');
modeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', currentTheme);

  // Update background opacity
  const isLight = currentTheme === 'light';
  document.getElementById('bg-dark').style.opacity = isLight ? '0' : '1';
  document.getElementById('bg-light').style.opacity = isLight ? '1' : '0';

  // Play sound
  clickSound.currentTime = 0;
  clickSound.play();
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

// Email modal
const emailBtn = document.getElementById('emailBtn');
const emailModal = document.getElementById('emailModal');
const closeBtn = document.querySelector('.close');
const copyBtn = document.getElementById('copyBtn');

emailBtn.addEventListener('click', () => {
  emailModal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
  emailModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target == emailModal) {
    emailModal.style.display = 'none';
  }
});

copyBtn.addEventListener('click', async () => {
  const emailInput = document.getElementById('emailInput');
  try {
    await navigator.clipboard.writeText(emailInput.value);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
});