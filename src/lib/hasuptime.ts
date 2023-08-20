import * as computer from "computer";

export type ComputerWithUptime = typeof computer & { uptime(): number };