// Deterministic scenery keeps decorative randomness out of the simulation.
const TAU = Math.PI * 2;
export function halo(c, x, y, radius, color) {
  const g = c.createRadialGradient(x, y, 0, x, y, radius);
  g.addColorStop(0, `${color}99`);
  g.addColorStop(.24, `${color}38`);
  g.addColorStop(1, `${color}00`);
  c.fillStyle = g;
  c.fillRect(x - radius, y - radius, radius * 2, radius * 2);
}
let backdrop, backdropWidth, backdropHeight;
export function drawBackground(c, w, h, t) {
  if (!backdrop || backdropWidth !== w || backdropHeight !== h) {
    backdrop = document.createElement('canvas');
    backdrop.width = backdropWidth = w;
    backdrop.height = backdropHeight = h;
    const b = backdrop.getContext('2d');
    const base = b.createLinearGradient(0, 0, w, h);
    base.addColorStop(0, '#030817');
    base.addColorStop(.5, '#10122f');
    base.addColorStop(1, '#020713');
    b.fillStyle = base;
    b.fillRect(0, 0, w, h);
    b.globalCompositeOperation = 'screen';
    for (let i = 0; i < 13; i++) {
      const x = w * (i / 12), y = h * (.62 - .23 * Math.sin(i * .35));
      halo(b, x, y, Math.max(w, h) * (.18 + .035 * Math.sin(i)), i % 3 === 0 ? '#253c66' : '#351b55');
    }
    b.globalCompositeOperation = 'source-over';
    const v = b.createRadialGradient(w * .5, h * .48, h * .15, w * .5, h * .5, Math.max(w, h) * .65);
    v.addColorStop(0, '#01030a00');
    v.addColorStop(1, '#01030ae8');
    b.fillStyle = v;
    b.fillRect(0, 0, w, h);
  }
  c.save();
  c.drawImage(backdrop, 0, 0, w, h);
  c.globalCompositeOperation = 'lighter';
  for (let layer = 0; layer < 3; layer++) {
    for (let i = 0; i < 100 - layer * 25; i++) {
      const seed = i + layer * 137;
      const x = ((Math.sin(seed * 127.1) * 43758.5453 % 1 + 1) * w + t * (2 + layer * 5)) % w;
      const y = ((Math.sin(seed * 269.5) * 18363.47 % 1 + 1) * h + t * ( .4 + layer * .7)) % h;
      const r = .45 + layer * .4;
      c.globalAlpha = (.24 + layer * .17) * (.75 + .25 * Math.sin(t * .8 + seed));
      c.fillStyle = i % 5 === 0 ? '#ffd3a1' : '#b7d9ff';
      c.fillRect(x, y, r * 1.4, r * 1.4);
      if (layer === 2 && i % 7 === 0) {
        halo(c, x, y, 9, '#6bafff');
        c.fillStyle = '#cbeaff';
        c.fillRect(x - 3, y, 7, .6);
        c.fillRect(x, y - 3, .6, 7);
      }
    }
  }
  c.restore();
}
export function drawVault(c, x, y, t) {
  c.save();
  c.translate(x, y);
  c.globalCompositeOperation = 'lighter';
  halo(c, 0, 0, 115, '#39dba4');
  c.strokeStyle = '#52bd98';
  c.lineWidth = 1;
  c.beginPath(); c.arc(0, 0, 79, 0, TAU); c.stroke();
  c.rotate(t * .23);
  c.shadowColor = '#65ffc1'; c.shadowBlur = 20;
  c.strokeStyle = '#b9ffe0'; c.lineWidth = 4;
  c.setLineDash([16, 9]);
  c.beginPath(); c.arc(0, 0, 64, 0, TAU); c.stroke();
  c.shadowBlur = 7; c.lineWidth = 1;
  c.strokeStyle = '#ffffff'; c.stroke();
  c.rotate(-t * .53);
  c.setLineDash([35, 12, 4, 12]);
  c.strokeStyle = '#55e9b3'; c.lineWidth = 2;
  c.beginPath(); c.arc(0, 0, 49, 0, TAU); c.stroke();
  c.setLineDash([]); c.shadowBlur = 0;
  for (let i = 0; i < 4; i++) {
    c.rotate(TAU / 4);
    c.fillStyle = '#baffdc'; c.fillRect(74, -3, 9, 6);
  }
  c.restore();
}
