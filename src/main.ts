import './styles/base.css';
import './styles/hud.css';
import { Game } from './game/Game';

const root = document.querySelector<HTMLDivElement>('#app');

if (!root) {
  throw new Error('App root not found.');
}

const game = new Game(root);
void game.bootstrap();
