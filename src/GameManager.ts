import Player from "./PlayerManager";
import { ComputerWithUptime } from "./lib/hasuptime";
import * as computer from "computer";
import * as component from "component";

const uptime = (computer as ComputerWithUptime).uptime;

enum GameState {
  Unstarted,
  Starting,
  Playing,
  Meeting,
  Ended
}

export default class GameManager {
  config: GameConfig;
  gameState: GameState = GameState.Unstarted;
  players: Player[] = [];

  constructor(config: Partial<GameConfig>) {
    this.config = { ...defaultConfig, ...config };
  }

  addPlayer(username: string) {
    this.players.push(new Player(username, this));
  }

  removePlayer(username: string) {
    this.players = this.players.filter(p => p.username !== username); 
  }

  updateConfig(config: Partial<GameConfig>) {
    this.config = { ...this.config, ...config };
  }

  start() {
    this.gameState = GameState.Starting;

    // choose impostors
    let impostors = this.config.impostors;
    while (impostors > 0) {
      const player = this.players[Math.floor(Math.random() * this.players.length)];
      if (!player.impostor) {
        player.impostor = true;
        player.killTimer = uptime() + this.config.startupTime;
        impostors--;
      }
    }

    // set player speed
    const redstone = component.redstone;
    redstone.setWirelessFrequency(this.config.playerSpeed);
    redstone.setWirelessOutput(true);
  }
}

const defaultConfig: GameConfig = {
  impostors: 1,
  confirmEjects: true,
  emergencyMeetings: 1,
  anonymousVoting: false,
  emergencyCooldown: 15,
  discussionTime: 15,
  votingTime: 120,
  playerSpeed: 0,
  killCooldown: 30,
  machineTasks: 1,
  craftingTasks: 2,
  miscTasks: 2,
  startupTime: 5,
};

export interface GameConfig {
  impostors: number;
  confirmEjects: boolean;
  emergencyMeetings: number;
  anonymousVoting: boolean;
  emergencyCooldown: number;
  discussionTime: number;
  votingTime: number;
  playerSpeed: number;
  killCooldown: number;
  machineTasks: number;
  craftingTasks: number;
  miscTasks: number;
  startupTime: number;
}
