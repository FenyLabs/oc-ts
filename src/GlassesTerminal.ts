import { AllWidgetProps, CubeProps, GlassesTerminalComponent, VetexData2D, VetexData3D, Widget } from "./glasses";
import * as component from "component";

export default class GlassesTerminal {
  component: GlassesTerminalComponent;

  constructor(component: GlassesTerminalComponent, clear = true) {
    this.component = component;
  }

  addCube(props: Partial<CubeProps>) {
    const widget = this.component.addCube3D();
    GlassesTerminal.setWidgetProps(widget, props);
    return widget;
  }

  addDot(props: Partial<CubeProps>) {
    const widget = this.component.addDot3D();
    GlassesTerminal.setWidgetProps(widget, props);
    return widget;
  }

  addFloatingText(props: Partial<CubeProps>) {
    const widget = this.component.addFloatingText();
    GlassesTerminal.setWidgetProps(widget, props);
    return widget;
  }

  addLine(props: Partial<CubeProps>, vertexData: VetexData3D) {
    const widget = this.component.addLine3D();
    GlassesTerminal.setWidgetProps(widget, props);
    return widget;
  }

  addQuad(props: Partial<CubeProps>, vertexData: VetexData3D) {
    const widget = this.component.addQuad3D();
    GlassesTerminal.setWidgetProps(widget, props);
    return widget;
  }

  addTriangle(props: Partial<CubeProps>, vertexData: VetexData3D) {
    const widget = this.component.addTriangle3D();
    GlassesTerminal.setWidgetProps(widget, props);
    return widget;
  }

  addDot2D(props: Partial<CubeProps>) {
    const widget = this.component.addDot();
    GlassesTerminal.setWidgetProps(widget, props);
    return widget;
  }

  addTriangle2D(props: Partial<CubeProps>, vertexData: VetexData2D) {
    const widget = this.component.addTriangle();
    GlassesTerminal.setWidgetProps(widget, props);
    return widget;
  }

  addRect(props: Partial<CubeProps>) {
    const widget = this.component.addRect();
    GlassesTerminal.setWidgetProps(widget, props);
    return widget;
  }

  addQuad2D(props: Partial<CubeProps>, vertexData: VetexData2D) {
    const widget = this.component.addQuad();
    GlassesTerminal.setWidgetProps(widget, props);
    return widget;
  }

  addTextLabel(props: Partial<CubeProps>) {
    const widget = this.component.addTextLabel();
    GlassesTerminal.setWidgetProps(widget, props);
    return widget;
  }

  removeWidget(widget: Widget) {
    this.component.removeObject(widget.getId());
  }

  removeAll() {
    this.component.removeAll();
  }

  private static setWidgetProps(widget: Widget, props: Partial<AllWidgetProps>) {
    for (const entry of (Object.entries(props) as Entries<AllWidgetProps>)) {
      this.setWidgetProp(widget, entry);
    }
  }

  private static setWidgetProp(widget: any, [key, value]: [string, any]) {
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
      case "visibleThroughObject":
        widget.setVisibleThroughObjects(value);
        break;
      case "size":
        widget.setSize(value);
        break;
    }
  }
}

type Entry<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T];

type Entries<T> = Entry<T>[];