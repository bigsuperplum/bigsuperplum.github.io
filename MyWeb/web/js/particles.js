// particles.js — 简单画布粒子系统，读取 CSS 变量 --particle-color
(function(){
  const canvas = document.getElementById('particles');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let w=0,h=0,particles=[];

  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }

  function getColor(){
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--particle-color') || 'rgba(43,144,255,0.75)';
    return raw.trim();
  }

  function createParticle(){
    return {
      x: Math.random()*w,
      y: Math.random()*h,
      vx: (Math.random()-0.5)*0.6,
      vy: (Math.random()-0.5)*0.6,
      r: 1+Math.random()*3,
      life: 60+Math.random()*240
    };
  }

  function init(n){
    particles = [];
    for(let i=0;i<n;i++) particles.push(createParticle());
  }

  function step(){
    ctx.clearRect(0,0,w,h);
    const color = getColor();
    for(let p of particles){
      p.x += p.vx; p.y += p.vy; p.life -= 1;
      if(p.x<0||p.x>w) p.vx *= -1;
      if(p.y<0||p.y>h) p.vy *= -1;
      if(p.life<=0){
        Object.assign(p, createParticle());
        p.x = Math.random()*w; p.y = Math.random()*h;
      }
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.9*(p.r/4);
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
  }

  function handleResize(){
    resize();
    // 根据屏幕大小调整数量
    const base = Math.max(30, Math.floor((w*h)/50000));
    init(base);
  }

  window.addEventListener('resize', handleResize);
  document.addEventListener('themechange', ()=>{}); // particles read CSS var each frame
  // 启动
  resize();
  init(Math.max(30, Math.floor((w*h)/50000)));
  requestAnimationFrame(step);
})();
