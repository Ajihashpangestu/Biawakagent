# Game brief — "Magmavault" (working title, agent may rename)

## Hard constraints (from bounty best-game-01)
- Static files under `game/`: `game/index.html` is the entry. No build step, no network requests at runtime.
- Desktop browser, keyboard + mouse. WebGL not required; 2D canvas is fine.
- Complete: start screen → gameplay → win/lose/score → restart. Feedback on every action.
- Original: own name, art (procedural/canvas-drawn), sounds (WebAudio-synthesized, no audio files), no copying commercial games.
- Everything must work when opened via a static file server serving `game/`.

## Concept
An arcade "gravity-well heist" game, one run = one heist:
- You pilot a small ship that can latch its grappling tether to drifting glowing cores ("embers") and sling them.
- Goal: collect N embers and deliver them to the vault gate before the vault collapses (timer).
- Hazards: patrolling warden drones (touch = lose a hull point, 3 hull = game over), and the gravity wells themselves pull you in if you drift too close (lose momentum, risk death).
- Mouse steers/aims the tether, keyboard (WASD/arrows) thrusts. Space or right-click releases the tether with a burst.
- Score: embers delivered × combo for consecutive deliveries within a time window; end screen shows score, best score (localStorage), and "Press R to run it again".

## Look & feel (this is what the judge SEES — prioritize)
- Dark starfield backdrop with parallax dust; deep indigo-to-black gradient vignette.
- Neon vector art drawn in canvas: glowing embers (orange-gold radial glow), cyan player ship with thruster trails, violet danger drones, pale-green vault gate ring.
- Additive glow (shadowBlur / globalCompositeOperation 'lighter'), particle bursts on every pickup, delivery, and hit. Screen shake on damage. Subtle CRT scanline overlay optional.
- Juicy HUD: hull pips, ember count, timer bar, combo meter — all crisp vector-styled, not plain text dumps.
- Title screen must look poster-like: game name in big stylized type, "Press ENTER to begin the heist", small controls legend.

## Sound
WebAudio: synthesized blip on pickup (rising), deep thud on delivery (with pitch drop), alarm on hit, ambient low drone. Mute toggle (M).

## Structure suggestions (agent's choice)
- Vanilla ES modules under game/, e.g. main.js, but keep it a few clean files (each file's declarations count in the judge's outline: aim for readable, purposeful modules like ship.js, embers.js, drones.js, audio.js, particles.js, hud.js).
- 60 fps loop with fixed-timestep physics; canvas resize to window.
- No external libraries — zero dependencies keeps the references check trivially clean.
