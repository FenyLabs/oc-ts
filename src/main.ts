import * as component from "component";
import GlassesTerminal from "./GlassesTerminal";
import { GlassesTerminalComponent } from "./glasses";

const terminal = new GlassesTerminal(component.glasses as GlassesTerminalComponent);

const cube = terminal.addCube({
  "3DPos": [0, 1, 0],
  scale: 1,
  color: [100, 200, 200],
  alpha: 0.5,
  visibleThroughObject: true,
});

while (true) {
  let alpha = 0.5 + Math.sin(computer.uptime()) / 2;
  cube.setAlpha(alpha);
}