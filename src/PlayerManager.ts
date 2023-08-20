import GameManager from "./GameManager";
import GlassesTerminal from "./GlassesTerminal";

export default class Player {
  glasses: GlassesTerminal;
  username: string;
  impostor: boolean = false;
  killTimer: number | null = null;
  alive = true;
  
  game: GameManager;

  constructor(username: string, game: GameManager) {
    this.username = username;
    this.glasses = GlassesTerminal.fromUsername(username);
    this.game = game;
  }
}