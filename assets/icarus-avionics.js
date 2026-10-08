(()=>{
const section=document.querySelector('.av-experience'); const root=document.querySelector('.av-sticky');
const steps=[...document.querySelectorAll('.av-step')];const label=document.querySelector('.av-active-label');
if(!section||!root||!steps.length)return;
const lang=(navigator.languages||[navigator.language||'de']).some(l=>String(l).toLowerCase().startsWith('de'))?'de':'en';
const english=[
['PRIMARY PROCESSOR','Autonomous ESP32 controller for sensor input, flight state, onboard logging and planned recovery sequences. Up to 240 MHz, separately powered from the camera payload.'],
['SIX-AXIS INERTIAL SENSOR','Measures acceleration and angular velocity along three axes. Provides input for attitude estimation and for analyzing rotation and turbulence.'],
['POWER SUPPLY','Battery input through XT30 and a planned regulated 5 V supply for control electronics and actuators.'],
['ACTUATOR INTERFACES','Four planned PWM outputs for steering mechanisms and release functions.'],
['VOLTAGE BUFFERS','Smoothing capacitors intended to help handle short current peaks from the servos. Stability requires bench validation.'],
['PRE-FLIGHT INTERFACE','Manual controls for ground checks, sensor calibration and pre-flight operations.'],
['STATUS AND LOCATING','LEDs and buzzer for system status and intended acoustic support during recovery.']
];
const trans={
'.av-intro .av-kicker':'ASTREA / FLIGHT SYSTEMS / ICARUS-M1',
'.av-intro h1':'THE FLIGHT<br>COMPUTER.',
'.av-lead':'Prototype avionics layout for ICARUS-M1. Seven hardware groups, one control system. A design under development for a future M-1 test flight.',
'.av-intro-bottom a':'EXPLORE THE BOARD ↓',
'.av-architecture .av-kicker':'M-1 / SYSTEM ARCHITECTURE',
'.av-architecture h2':'TWO SYSTEMS.<br>SEPARATE RESPONSIBILITIES.',
'.av-architecture-grid article:first-child p':'Flight control, sensor input, local data logging and planned recovery activation. The flight controller is designed to operate independently from the video payload with a separate power supply.',
'.av-architecture-grid article:last-child p':'Planned separate camera payload with its own battery and voltage regulator. Multiple video perspectives are the design goal; recording formats and simultaneous stream capability still require testing.',
'.av-caution':'Development status: concept and prototype board layout. The described functions, electrical separation and performance targets have not yet been demonstrated in flight.',
'.av-back':'← BACK TO ICARUS-RLV'
};
if(lang==='en'){for(const [selector,html] of Object.entries(trans)){const e=document.querySelector(selector);if(e)e.innerHTML=html;}steps.forEach((s,i)=>{const tag=s.querySelector('.av-tag'),body=s.querySelector('div>p:last-child');if(tag)tag.textContent=english[i][0];if(body)body.textContent=english[i][1]})}
const points=[[.465,.505],[.145,.79],[.095,.13],[.955,.46],[.50,.88],[.83,.79],[.705,.28]];
const names=['ESP32 DEVKIT V1','MPU-6050','MICRO BEC & XT30','SERVO M1-M4','U6 / U7','KEY1-KEY4','BUZZER & RGB'];
let current=-1,ticking=false;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function frame(){
const height=Math.max(1,innerHeight), center=height*.50;
let best=0,dist=Infinity;
steps.forEach((el,i)=>{const r=el.getBoundingClientRect();const d=Math.abs((r.top+r.bottom)/2-center);if(d<dist){dist=d;best=i}});
if(best!==current){current=best;steps.forEach((el,i)=>el.classList.toggle('is-active',best===i));label.textContent=names[best];root.style.setProperty('--mx',(100*points[best][0])+'%');root.style.setProperty('--my',(100*points[best][1])+'%');root.style.setProperty('--marker-visible','1')}
if(!reduced){const rect=section.getBoundingClientRect(),progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-height)));root.style.setProperty('--rx',((.5-progress*1)).toFixed(2)+'deg');root.style.setProperty('--ry',((-1+progress*2)).toFixed(2)+'deg');root.style.setProperty('--zoom',(1+progress*.012).toFixed(3));root.style.setProperty('--glint',(-150+progress*300)+'%')}
ticking=false;
}
const onScroll=()=>{if(ticking)return;ticking=true;requestAnimationFrame(frame)};
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});frame();
})();