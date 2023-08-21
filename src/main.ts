import * as component from "component";
import * as sides from "sides";
import GlassesTerminal from "./GlassesTerminal";
import { GlassesTerminalComponent } from "./lib/glasses";
import Player from "./PlayerManager";
import GameManager from "./GameManager";

const game = new GameManager({});

game.startLoop();