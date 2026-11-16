import {halo} from './rendering.js';
export class Ship{constructor(x,y){this.x=x;this.y=y;this.vx=0;this.vy=0;this.r=14;this.hull=3;this.tether=null;this.inv=0}update(dt,keys,mouse,w,h){let ax=(keys.a||keys.ArrowLeft?-1:0)+(keys.d||keys.ArrowRight?1:0),ay=(keys.w||keys.ArrowUp?-1:0)+(keys.s||keys.ArrowDown?1:0);this.vx+=ax*260*dt;this.vy+=ay*260*dt;this.vx*=.985;this.vy*=.985;this.x+=this.vx*dt;this.y+=this.vy*dt;this.x=Math.max(22,Math.min(w-22,this.x));this.y=Math.max(22,Math.min(h-22,this.y));if(this.inv>0)this.inv-=dt}draw(c,aim){
  const t=performance.now()/1000, speed=Math.hypot(this.vx,this.vy);
  c.save();c.translate(this.x,this.y);c.rotate(Math.atan2(aim.y-this.y,aim.x-this.x));
  c.globalCompositeOperation='lighter';
  halo(c,-8,0,38,'#16b9ee');
  const flame=25+Math.min(45,speed*.15)+7*Math.sin(t*43)+4*Math.sin(t*71);
  const trail=c.createLinearGradient(-10,0,-10-flame,0);
  trail.addColorStop(0,'#c5ffff');trail.addColorStop(.25,'#39dfffaa');trail.addColorStop(1,'#197bff00');
  c.fillStyle=trail;c.beginPath();c.moveTo(-10,-6);c.quadraticCurveTo(-flame*.6,-7,-10-flame,0);c.quadraticCurveTo(-flame*.6,7,-10,6);c.fill();
  c.shadowBlur=15;c.shadowColor='#34eaff';c.fillStyle='#143e59';c.strokeStyle='#8df7ff';c.lineWidth=1.8;
  c.beginPath();c.moveTo(19,0);c.lineTo(-12,-10);c.lineTo(-7,0);c.lineTo(-12,10);c.closePath();c.fill();c.stroke();
  c.fillStyle='#e6ffff';c.beginPath();c.moveTo(10,0);c.lineTo(-3,-3);c.lineTo(-3,3);c.closePath();c.fill();
  if(this.inv>0){c.globalAlpha=.35+.25*Math.sin(t*35);c.strokeStyle='#a9efff';c.beginPath();c.arc(0,0,24,0,Math.PI*2);c.stroke()}
  c.restore();}}

export function makeEmbers(n,w,h){return Array.from({length:n},(_,i)=>({x:80+Math.random()*(w-160),y:100+Math.random()*(h-190),vx:(Math.random()-.5)*55,vy:(Math.random()-.5)*55,r:8,got:false,id:i}))}export function updateEmbers(es,dt,w,h){for(const e of es)if(!e.got){e.x+=e.vx*dt;e.y+=e.vy*dt;if(e.x<30||e.x>w-30)e.vx*=-1;if(e.y<70||e.y>h-40)e.vy*=-1}}export function drawEmbers(c,es){
  const t=performance.now()/1000;c.save();c.globalCompositeOperation='lighter';
  for(const e of es)if(!e.got){
    const pulse=1+.12*Math.sin(t*3+e.id*2);
    halo(c,e.x,e.y,38*pulse,'#ff7926');
    c.save();c.translate(e.x,e.y);c.rotate(t*.5+e.id);
    c.shadowBlur=17;c.shadowColor='#ff8b25';c.fillStyle='#ffab43';c.strokeStyle='#ffe6ac';c.lineWidth=1.2;
    c.beginPath();for(let i=0;i<6;i++){const a=i*Math.PI/3;const x=Math.cos(a)*e.r,y=Math.sin(a)*e.r;i?c.lineTo(x,y):c.moveTo(x,y)}c.closePath();c.fill();c.stroke();
    c.fillStyle='#fff5d3';c.beginPath();c.arc(0,0,3.5,0,7);c.fill();
    c.shadowBlur=0;c.strokeStyle='#ffa84b66';c.beginPath();c.arc(0,0,15*pulse,.2,2.7);c.stroke();c.restore();
  }c.restore();}

export function makeDrones(n,w,h){return Array.from({length:n},(_,i)=>({x:Math.random()*w,y:80+Math.random()*(h-120),a:Math.random()*7,s:35+Math.random()*35,r:13}))}export function updateDrones(ds,dt){for(const d of ds){d.a+=dt;d.x+=Math.cos(d.a*1.2)*d.s*dt;d.y+=Math.sin(d.a)*d.s*dt}}export function drawDrones(c,ds){
  const t=performance.now()/1000;c.save();c.globalCompositeOperation='lighter';
  for(const [i,d] of ds.entries()){
    const pulse=.5+.5*Math.sin(t*3+i*1.7);
    halo(c,d.x,d.y,38+pulse*7,'#993cff');
    c.save();c.translate(d.x,d.y);c.rotate(-t*.6+i);
    c.shadowBlur=14;c.shadowColor='#b34cff';c.strokeStyle='#e08cff';c.lineWidth=2;
    c.beginPath();c.arc(0,0,d.r,0,7);c.stroke();
    c.globalAlpha=.3+pulse*.4;c.lineWidth=1;c.beginPath();c.arc(0,0,d.r+6+pulse*3,0,7);c.stroke();c.globalAlpha=1;
    c.fillStyle='#d99aff';for(let j=0;j<3;j++){c.rotate(Math.PI*2/3);c.beginPath();c.moveTo(13,-4);c.lineTo(20,0);c.lineTo(13,4);c.fill()}
    c.fillStyle='#f5ccff';c.beginPath();c.arc(0,0,4,0,7);c.fill();c.restore();
  }c.restore();}
