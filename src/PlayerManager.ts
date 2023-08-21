import GameManager from "./GameManager";
import GlassesTerminal from "./GlassesTerminal";
import { Rectangle, Text, Widget } from "./lib/glasses";

export default class Player {
  glasses: GlassesTerminal;
  username: string;
  impostor: boolean = false;
  killTimer: number | null = null;
  alive = true;

  gui: PlayerGUI = {};
  
  game: GameManager;

  constructor(username: string, game: GameManager) {
    this.username = username;
    this.glasses = GlassesTerminal.fromUsername(username);
    this.game = game;
  }
}

interface PlayerGUI {
  tasks: {
    box: Rectangle;
    text: Widget[];
  }

  actions: {
    kill: TextBox;
    report: TextBox;
    sabotage: TextBox;
  }
}

interface TextBox {
  box: Rectangle;
  cooldownBox: Rectangle;
  text: Widget[];
}