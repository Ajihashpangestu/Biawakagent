import {halo} from './rendering.js';

function panel(c, x, y, w, h, accent = '#63eaff') {
  c.fillStyle = '#080f22e8';
  c.strokeStyle = `${accent}55`;
  c.lineWidth = 1;
  c.beginPath(); c.roundRect(x, y, w, h, 16); c.fill(); c.stroke();
}
function text(c, value, x, y, size, color = '#e3faff', weight = 700) {
  c.font = `${weight} ${size}px system-ui, sans-serif`;
  c.fillStyle = color; c.fillText(value, x, y);
}
function bar(c, x, y, w, h, fraction, color) {
  c.beginPath(); c.roundRect(x, y, w, h, h / 2);
  c.fillStyle = '#ffffff10'; c.fill();
  const fill = Math.max(0, Math.min(1, fraction)) * w;
  if (fill > 0) {
    c.save(); c.shadowColor = color; c.shadowBlur = 14;
    c.beginPath(); c.roundRect(x, y, fill, h, Math.min(h / 2, fill / 2));
    c.fillStyle = color; c.fill(); c.restore();
  }
}
export function drawHud(c, w, h, state) {
  const {hull, delivered, total, score, combo, comboT, time} = state;
  c.save();
  // Scale the instrument strip as a unit on smaller windows.
  const scale = Math.min(1, (w - 24) / 900);
  c.translate(12, 12); c.scale(scale, scale);
  const width = (w - 24) / scale;
  panel(c, 0, 0, width, 104);
  text(c, 'HULL', 18, 27, 11, '#8aa7bc');
  for (let i = 0; i < 3; i++) {
    c.save(); c.shadowColor = '#6ff5ff'; c.shadowBlur = i < hull ? 12 : 0;
    c.fillStyle = i < hull ? '#8df8ff' : '#1b2a40';
    c.beginPath(); c.roundRect(66 + i * 28, 15, 21, 13, 5); c.fill(); c.restore();
  }
  text(c, `EMBER CARGO  ${delivered} / ${total}`, 18, 57, 13);
  text(c, String(score).padStart(5, '0'), 18, 88, 23, '#ffffff');
  text(c, 'SCORE', 104, 87, 10, '#8aa7bc');
  const middle = width / 2;
  c.textAlign = 'center';
  c.save(); c.shadowColor = '#dd82ff'; c.shadowBlur = combo > 1 ? 18 : 5;
  text(c, `×${combo}`, middle, 52, 35, '#efb5ff', 900); c.restore();
  text(c, 'SLING COMBO', middle, 19, 10, '#bb91d1');
  bar(c, middle - 95, 65, 190, 7, comboT / 4, '#d989ff');
  text(c, 'CHAIN EMBERS TO MULTIPLY', middle, 91, 9, '#8aa7bc');
  c.textAlign = 'left';
  const right = width - 242;
  const ratio = Math.max(0, time / 75);
  const color = ratio > .5 ? '#79ffc0' : ratio > .2 ? '#ffc66b' : '#ff557b';
  text(c, 'VAULT COLLAPSE', right, 26, 11, '#8aa7bc');
  text(c, `${Math.max(0, Math.ceil(time))}s`, right, 61, 29, color, 900);
  bar(c, right, 77, 220, 9, ratio, color);
  c.restore();
  c.save(); c.textAlign = 'center';
  text(c, 'WASD / ARROWS  Thrust    •    HOLD CLICK  Tether    •    RELEASE  Sling    •    M  Mute', w / 2, h - 22, Math.min(12, w / 65), '#94b2c9', 500);
  c.restore();
}

function posterEmber(c, x, y, radius, t) {
  c.save(); c.translate(x, y); c.rotate(t * .18);
  halo(c, 0, 0, radius * 5, '#ff8c36');
  c.shadowColor = '#ff963e'; c.shadowBlur = 26;
  c.fillStyle = '#ffc66f'; c.strokeStyle = '#fff0b8'; c.lineWidth = 2;
  c.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = i * Math.PI / 3;
    const px = Math.cos(angle) * radius, py = Math.sin(angle) * radius;
    if (i === 0) c.moveTo(px, py); else c.lineTo(px, py);
  }
  c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#fff5d1'; c.beginPath(); c.arc(-radius * .2, -radius * .2, radius * .26, 0, Math.PI * 2); c.fill();
  c.restore();
}
export function drawOverlay(c, w, h, screen, score, best, t) {
  c.save();
  // A fixed poster composition stays legible and fits short or narrow screens.
  const scale = Math.min(1, (w - 28) / 820, (h - 28) / 650);
  c.translate(w / 2, h / 2); c.scale(scale, scale);
  c.textAlign = 'center';
  halo(c, 0, -145, 380, '#226a95');
  for (let i = 0; i < 16; i++) {
    const x = Math.sin(i * 19.7) * 390;
    const y = 320 - ((t * (12 + i % 4 * 4) + i * 47) % 640);
    halo(c, x + Math.sin(t + i) * 12, y, 6, '#ff963e');
  }
  posterEmber(c, 285 + Math.sin(t * .6) * 9, -220 + Math.cos(t * .7) * 12, 23, t);
  text(c, 'A   G R A V I T Y - W E L L   H E I S T', 0, -250, 12, '#ffc477');
  c.font = '900 86px system-ui, sans-serif';
  c.lineJoin = 'round'; c.lineWidth = 8; c.strokeStyle = '#153951';
  c.strokeText('MAGMAVAULT', 0, -145);
  c.fillStyle = '#123d5b'; c.fillText('MAGMAVAULT', 0, -137);
  c.shadowColor = '#51dfff'; c.shadowBlur = 30;
  const logo = c.createLinearGradient(0, -225, 0, -140);
  logo.addColorStop(0, '#ffffff'); logo.addColorStop(.5, '#bdf7ff'); logo.addColorStop(1, '#48b9df');
  c.fillStyle = logo; c.fillText('MAGMAVAULT', 0, -145); c.shadowBlur = 0;
  text(c, 'STEAL THE FIRE. ESCAPE THE COLLAPSE.', 0, -104, 12, '#8eaec5');
  if (screen === 'title') {
    panel(c, -295, -57, 590, 204);
    text(c, 'THE HEIST / HOW TO PLAY', 0, -25, 12, '#ffc477');
    const rows = [ ['01', 'PILOT', 'WASD / arrows to thrust · mouse to aim'], ['02', 'TETHER', 'Hold left click near a glowing ember'], ['03', 'SLING', 'Release click to collect · chain for combos'] ];
    c.textAlign = 'left';
    rows.forEach(([number, title, detail], i) => {
      const y = 17 + i * 48;
      text(c, number, -268, y, 17, '#5ee9ff', 900);
      text(c, title, -223, y - 3, 11, '#e3faff');
      text(c, detail, -223, y + 15, 13, '#9bb4ca', 500);
    });
    c.textAlign = 'center';
    panel(c, -235, 175, 470, 60, '#77f9cf');
    c.save(); c.shadowColor = '#77f9cf'; c.shadowBlur = 10 + Math.sin(t * 2) * 4;
    text(c, 'ENTER  /  BEGIN THE HEIST', 0, 212, 19, '#bbffe2'); c.restore();
    text(c, '12 EMBERS  /  75 SECONDS  /  3 HULL', 0, 266, 11, '#849eb7');
    text(c, 'M  /  TOGGLE AUDIO', 0, 291, 10, '#627d96');
  } else {
    const won = screen === 'win', accent = won ? '#82ffc0' : '#ff7597';
    panel(c, -285, -62, 570, 309, accent);
    text(c, won ? 'HEIST COMPLETE' : 'SIGNAL LOST', 0, -26, 11, accent);
    c.save(); c.shadowColor = accent; c.shadowBlur = 20;
    text(c, won ? 'VAULT SECURED' : 'HEIST FAILED', 0, 22, 38, accent, 900); c.restore();
    text(c, won ? 'Every ember recovered. A clean getaway.' : 'The vault has claimed another pilot.', 0, 53, 14, '#9bb4ca', 500);
    c.fillStyle = `${accent}30`; c.fillRect(-245, 76, 490, 1);
    text(c, 'SCORE', -125, 107, 11, '#8eaec5');
    text(c, 'BEST SCORE', 125, 107, 11, '#8eaec5');
    text(c, String(score).padStart(5, '0'), -125, 148, 34, '#ffffff', 900);
    text(c, String(best).padStart(5, '0'), 125, 148, 34, '#ffe0a0', 900);
    bar(c, -220, 176, 440, 1, 1, accent);
    text(c, 'R  /  RUN IT AGAIN', 0, 218, 18, accent);
    text(c, 'ONE MORE RUN. ONE BIGGER SCORE.', 0, 282, 10, '#849eb7');
  }
  c.restore();
}
