(() => {
  'use strict';
  const panel = document.querySelector('.av-panel');
  if (!panel) return;
  const steps = [...panel.querySelectorAll('[data-av-step]')];
  const prev = panel.querySelector('.av-prev');
  const next = panel.querySelector('.av-next');
  const count = panel.querySelector('.av-count');
  const board = panel.querySelector('.av-board-art');
  if (steps.length !== 7 || !board || !prev || !next || !count) return;

  const points = [
    [.49, .50],  // ESP32
    [.16, .82],  // MPU-6050
    [.10, .15],  // CN1 / power input
    [.91, .53],  // Servo connectors
    [.50, .88],  // U6/U7
    [.84, .79],  // KEY1-KEY4
    [.70, .27]   // BZ1 / indicators
  ];
  const en = [
    'Autonomous ESP32 controller for sensor input, flight state, onboard logging and planned recovery sequences. Up to 240 MHz, independent of the camera payload.',
    'Measures acceleration and angular velocity along three axes. Provides input for attitude estimation and analyzing rotation and turbulence.',
    'Planned battery input and regulated 5 V power supply for control electronics and actuators.',
    'PWM outputs for steering mechanisms and planned release functions.',
    'Smoothing capacitors to help absorb short load peaks. Actual stability still requires bench testing.',
    'Manual inputs for system checks, calibration and planned pre-flight preparation.',
    'Visual and acoustic status signals, with intended support for locating the vehicle after landing.'
  ];
  const copyEn = {
    heading:'Inside the flight computer.',
    intro:'Seven hardware groups, one flight controller. The ICARUS-M1 board shown is a prototype design and awaits bench validation.',
    'arch-heading':'Two systems. Separate responsibilities.',
    'arch-esp':'Flight control, sensor input, onboard logging and planned recovery activation. The flight controller is designed to operate independently of the video payload with a separate power supply.',
    'arch-pi':'Planned independent camera system with its own battery and voltage regulator. Multiple video angles are the target. Resolutions and simultaneous streams still require testing.',
    caution:'Development status: concept and prototype layout. The described functions and electrical separation are design goals, not flight-proven capabilities.'
  };
  const isEnglish = !(navigator.languages || [navigator.language || 'de']).some(x => String(x).toLowerCase().startsWith('de'));
  if (isEnglish) {
    document.querySelectorAll('[data-av]').forEach(el => {
      const key = el.dataset.av;
      if (copyEn[key]) el.textContent = copyEn[key];
    });
    steps.forEach((el,i) => { const p=el.querySelector('p'); if (p) p.textContent=en[i]; });
    prev.setAttribute('aria-label','Previous component');
    next.setAttribute('aria-label','Next component');
    panel.setAttribute('aria-label','Interactive flight computer components');
  }

  let active = 0, lastWheel = 0, wheelSum = 0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function setStep(i) {
    const target = Math.max(0,Math.min(steps.length-1,i));
    if (target === active) return;
    active=target;
    steps.forEach((el,n)=>{
      const selected=n===active;
      el.hidden=!selected;
      el.classList.toggle('is-active',selected);
    });
    count.textContent = `${active+1} / ${steps.length}`;
    prev.disabled = active === 0;
    next.disabled = active === steps.length-1;
    panel.style.setProperty('--mx',points[active][0]*100+'%');
    panel.style.setProperty('--my',points[active][1]*100+'%');
    board.style.setProperty('--ry',reduced ? '0deg' : ((active-3)*.12).toFixed(2)+'deg');
    board.style.setProperty('--rx',reduced ? '0deg' : ((active-3)*-.08).toFixed(2)+'deg');
    board.style.setProperty('--glint',reduced ? '-80%' : (-80+active*23)+'%');
  }

  prev.addEventListener('click',()=>setStep(active-1));
  next.addEventListener('click',()=>setStep(active+1));
  panel.addEventListener('keydown',event=>{
    if (['ArrowDown','ArrowRight','PageDown'].includes(event.key)) {
      if(active<steps.length-1){event.preventDefault();setStep(active+1);}
    } else if (['ArrowUp','ArrowLeft','PageUp'].includes(event.key)) {
      if(active>0){event.preventDefault();setStep(active-1);}
    } else if(event.key==='Home'){event.preventDefault();setStep(0);}
    else if(event.key==='End'){event.preventDefault();setStep(steps.length-1);}
  });

  // Each intentional wheel action snaps to ONE component. No 7x viewport spacers.
  // At the first/last component, wheel movement passes through to normal page scroll.
  panel.addEventListener('wheel', event => {
    if (event.ctrlKey || event.metaKey) return;
    const rect=panel.getBoundingClientRect();
    const center=innerHeight*.5;
    if (!(rect.top<=center && rect.bottom>=center)) return;
    const delta=event.deltaY * (event.deltaMode===1 ? 16 : event.deltaMode===2 ? innerHeight : 1);
    if (Math.abs(delta)<.1) return;
    const direction=Math.sign(delta);
    if ((direction>0 && active===steps.length-1)||(direction<0 && active===0)) {
      wheelSum=0;
      return;
    }
    event.preventDefault();
    const now=performance.now();
    if (now-lastWheel<470) return;
    if (Math.sign(wheelSum)!==direction)wheelSum=0;
    wheelSum+=delta;
    if(Math.abs(wheelSum)<35)return;
    wheelSum=0;
    lastWheel=now;
    setStep(active+direction);
  },{passive:false});

  // On touch devices, normal vertical page scrolling remains available.
  // Horizontal swipe changes exactly one component; buttons work for everyone.
  let touch=null;
  panel.addEventListener('touchstart',event=>{
    if(event.touches.length!==1)return;
    touch={x:event.touches[0].clientX,y:event.touches[0].clientY};
  },{passive:true});
  panel.addEventListener('touchend',event=>{
    if(!touch||event.changedTouches.length!==1){touch=null;return;}
    const dx=event.changedTouches[0].clientX-touch.x;
    const dy=event.changedTouches[0].clientY-touch.y;
    touch=null;
    if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.35)setStep(active+(dx<0?1:-1));
  },{passive:true});

  panel.style.setProperty('--mx',points[0][0]*100+'%');
  panel.style.setProperty('--my',points[0][1]*100+'%');
})();