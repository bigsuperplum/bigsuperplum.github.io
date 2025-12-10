// theme.js — 处理主题切换与持久化
(function(){
  function applyTheme(t){
    if(t==='dark') document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.removeAttribute('data-theme');
    document.dispatchEvent(new CustomEvent('themechange',{detail:{theme:t}}));
    // 更新所有切换按钮状态 (aria-pressed) 并设置图标
    const isDark = (t==='dark');
    document.querySelectorAll('.theme-toggle').forEach(btn=>{
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      if(isDark) btn.classList.add('on'); else btn.classList.remove('on');
      setButtonIcon(btn, isDark);
    });
  }

  // SVG 图标（使用 currentColor）
  // 太阳：空心圆并在周围绘制发散的小线条（使用 stroke=currentColor）
  // 太阳：空心圆并在周围绘制发散的小线条（使用 stroke=currentColor）
  const sunSVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" role="img"><title>太阳</title>'+
    '<circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'+
    '<g stroke="currentColor" stroke-width="1.4" stroke-linecap="round">'+
      '<line x1="12" y1="1.8" x2="12" y2="4.2" />'+
      '<line x1="12" y1="19.8" x2="12" y2="22.2" />'+
      '<line x1="1.8" y1="12" x2="4.2" y2="12" />'+
      '<line x1="19.8" y1="12" x2="22.2" y2="12" />'+
      '<line x1="4.2" y1="4.2" x2="5.8" y2="5.8" />'+
      '<line x1="18.2" y1="18.2" x2="19.8" y2="19.8" />'+
      '<line x1="4.2" y1="19.8" x2="5.8" y2="18.2" />'+
      '<line x1="18.2" y1="5.8" x2="19.8" y2="4.2" />'+
    '</g>'+
  '</svg>';
  const moonSVG = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" role="img"><title>月亮</title><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';

  function setButtonIcon(btn, dark){
    // inject appropriate SVG, keep an accessible label via aria-label
    btn.innerHTML = dark ? moonSVG : sunSVG;
  }

  // 初始化
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);

  // 确保按钮显示图标（处理旧结构）
  document.querySelectorAll('.theme-toggle').forEach(btn=>{
    // set initial icon according to current theme
    const darkNow = document.documentElement.getAttribute('data-theme') === 'dark';
    setButtonIcon(btn, darkNow);
  });

  // 点击事件代理（页面可能有多个按钮）
  document.addEventListener('click', function(e){
    const btn = e.target.closest && e.target.closest('.theme-toggle');
    if(!btn) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    theme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  });
})();
