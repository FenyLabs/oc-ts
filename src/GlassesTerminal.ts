import { AllWidgetProps, CubeProps, GlassesTerminalComponent, SuperWidget, VetexData2D, VetexData3D, Widget } from "./lib/glasses";
import * as component from "component";

export default class GlassesTerminal {

  public static fromUsername(username: string): GlassesTerminal {
    let success: GlassesTerminalComponent | null = null;
    for (const [address, type] of component.list()) {
      if (type === "glasses" && component.invoke(address, "getBindPlayers") === username) {
        success = component.proxy(address);
        break;
      }
    }
    if (!success) {
      throw new Error(`No glasses terminal found for ${username}`);
    }
    return new GlassesTerminal(success);
  }

  private component: GlassesTerminalComponent;

  constructor(component: GlassesTerminalComponent, clear = true) {
    this.component = component;
    clear && this.removeAll();
  }

  addCube(props: Partial<CubeProps>) {
    const widget = this.component.addCube3D();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addDot(props: Partial<CubeProps>) {
    const widget = this.component.addDot3D();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addFloatingText(props: Partial<CubeProps>) {
    const widget = this.component.addFloatingText();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addLine(props: Partial<CubeProps>, vertexData: VetexData3D) {
    const widget = this.component.addLine3D();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addQuad(props: Partial<CubeProps>, vertexData: VetexData3D) {
    const widget = this.component.addQuad3D();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addTriangle(props: Partial<CubeProps>, vertexData: VetexData3D) {
    const widget = this.component.addTriangle3D();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addDot2D(props: Partial<CubeProps>) {
    const widget = this.component.addDot();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addTriangle2D(props: Partial<CubeProps>, vertexData: VetexData2D) {
    const widget = this.component.addTriangle();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addRect(props: Partial<CubeProps>) {
    const widget = this.component.addRect();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addQuad2D(props: Partial<CubeProps>, vertexData: VetexData2D) {
    const widget = this.component.addQuad();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addTextLabel(props: Partial<CubeProps>) {
    const widget = this.component.addTextLabel();
    this.setWidgetProps(widget, props);
    return widget;
  }

  removeWidget(widget: Widget) {
    this.component.removeObject(widget.getId());
  }

  removeAll() {
    this.component.removeAll();
  }

  private setWidgetProps(widget: Widget, props: Partial<AllWidgetProps>) {
    for (const entry of (Object.entries(props) as Entries<AllWidgetProps>)) {
      this.setWidgetProp(widget as SuperWidget, entry);
    }
  }

  private setWidgetProp(widget: SuperWidget, [key, value]: Entry<AllWidgetProps>) {
    switch (key) {
      case "alpha":
        widget.setAlpha(value);
        break;
      case "color":
        widget.setColor(...value);
        break;
      case "position":
        widget.setPosition(...value)
        break;
      case "3DPos":
        widget.set3DPos(...value);
        break;
      case "scale":
        widget.setScale(value);
        break;
      case "text":
        widget.setText(value);
        break;
      case "viewDistance":
        widget.setViewDistance(value);
        break;
      case "visible":
        widget.setVisible(value);
        break;
      case "visibleThroughObjects":
        widget.setVisibleThroughObjects(value);
        break;
      case "size":
        widget.setSize(...value);
        break;
    }
  }
}

type Entry<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T];

type Entries<T> = Entry<T>[];