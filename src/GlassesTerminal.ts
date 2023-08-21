import * as t from "./lib/glasses";
import * as component from "component";

export default class GlassesTerminal {

  public static fromUsername(username: string): GlassesTerminal {
    let success: t.GlassesTerminalComponent | null = null;
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

  private component: t.GlassesTerminalComponent;

  constructor(component: t.GlassesTerminalComponent, clear = true) {
    this.component = component;
    clear && this.removeAll();
  }

  addCube(props: Partial<t.CubeProps>) {
    const widget = this.component.addCube3D();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addDot3D(props: Partial<t.Dot3DProps>) {
    const widget = this.component.addDot3D();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addFloatingText(props: Partial<t.FloatingText3DProps>) {
    const widget = this.component.addFloatingText();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addLine3D(props: Partial<t.Line3DProps>, vertexData: t.VertexData3D) {
    const widget = this.component.addLine3D();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addQuad3D(props: Partial<t.Quad3DProps>, vertexData: t.VertexData3D) {
    const widget = this.component.addQuad3D();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addTriangle3D(props: Partial<t.Triangle3DProps>, vertexData: t.VertexData3D) {
    const widget = this.component.addTriangle3D();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addDot(props: Partial<t.DotProps>) {
    const widget = this.component.addDot();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addTriangle(props: Partial<t.TriangleProps>, vertexData: t.VertexData2D) {
    const widget = this.component.addTriangle();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addRect(props: Partial<t.RectangleProps>) {
    const widget = this.component.addRect();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addQuad(props: Partial<t.QuadProps>, vertexData: t.VertexData2D) {
    const widget = this.component.addQuad();
    this.setWidgetProps(widget, props);
    return widget;
  }

  addText(props: Partial<t.TextProps>) {
    const widget = this.component.addTextLabel();
    this.setWidgetProps(widget, props);
    return widget;
  }

  removeWidget(widget: t.Widget) {
    this.component.removeObject(widget.getId());
  }

  removeAll() {
    this.component.removeAll();
  }

  private setWidgetProps(widget: t.Widget, props: Partial<t.AllWidgetProps>) {
    for (const entry of (Object.entries(props) as Entries<t.AllWidgetProps>)) {
      this.setWidgetProp(widget as t.SuperWidget, entry);
    }
  }

  private setWidgetProp(widget: t.SuperWidget, [key, value]: Entry<t.AllWidgetProps>) {
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

export interface TrackedWidget {
  widget: t.Widget;
  terminal: GlassesTerminal;
}