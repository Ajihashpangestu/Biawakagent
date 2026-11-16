import { cpSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const repositoryDir = fileURLToPath(new URL('.', import.meta.url));
const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? '/output');

mkdirSync(outputDir, { recursive: true });
for (const directory of ['game', 'screenshots']) {
  cpSync(join(repositoryDir, directory), join(outputDir, directory), {
    recursive: true,
  });
}

const dossierBytes = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  game_max_files: 993,
  game_max_bytes: 50331648,
  game_path_max_bytes: 1000,
});
const dossier = JSON.parse(new TextDecoder().decode(dossierBytes));
writeFileSync(join(outputDir, 'dossier.json'), JSON.stringify(dossier));
