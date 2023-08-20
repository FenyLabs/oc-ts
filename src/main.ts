import * as component from "component";
import * as sides from "sides";
import GlassesTerminal from "./GlassesTerminal";
import { GlassesTerminalComponent } from "./lib/glasses";
import Player from "./PlayerManager";

interface Transposer {
  transferItem(
    this: void,
    from: number,
    to: number,
    count: number,
    slot?: number,
    toSlot?: number
  ): void;
  getAllStacks(this: void, side: number): { getAll(this: void): any[] };
}