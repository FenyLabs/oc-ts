/** @noSelf **/
declare namespace OC {
  interface ComponentMap {
    glasses: GlassesTerminalComponent;
  }
}

export interface GlassesTerminalComponent {
  addCube3D(): Cube;
  addDot3D(): Dot3D;
  addFloatingText(): FloatingText3D;
  addLine3D(): Line3D;
  addQuad3D(): Quad3D;
  addTriangle3D(): Triangle3D;

  addDot(): Dot;
  addTriangle(): Triangle;
  addRect(): Rectangle;
  addQuad(): Quad;
  addTextLabel(): Text;

  removeObject(id: number): void;
  removeAll(): void;
}

type GetterSetter<P extends Record<string, any>> = {
  [K in keyof P as `${K extends boolean ? "is" : "get"}${Capitalize<
    string & K
  >}`]: () => P[K] extends any[] ? LuaMultiReturn<P[K]> : P[K];
} & {
  [K in keyof P as `set${Capitalize<string & K>}`]: P[K] extends any[]
    ? (this: void, ...args: P[K]) => void
    : (this: void, value: P[K]) => void;
};

type GetterSetterWithId<P extends Record<string, any>> = GetterSetter<P> & {
  getId: () => number;
};

type alpha = { alpha: number };
type color = { color: [number, number, number] };
type position = { position: [number, number] };
type position3D = { "3DPos": [number, number, number] };
type scale = { scale: number };
type text = { text: string };
type viewDistance = { viewDistance: number };
type visibleThroughObject = { visibleThroughObject: boolean };
type size = { size: [number, number] };
type visible = { visible: boolean };

type BaseWidgetProps = visible & alpha & color;
type Base3DWidgetProps = BaseWidgetProps & visibleThroughObject;

export type AllWidgetProps = alpha &
  color &
  position &
  position3D &
  scale &
  text &
  viewDistance &
  visible &
  visibleThroughObject &
  size;

export type CubeProps = Base3DWidgetProps & position3D & viewDistance & scale;
export type Dot3DProps = Base3DWidgetProps & position3D & viewDistance & scale;
export type FloatingText3DProps = Base3DWidgetProps &
  position3D &
  viewDistance &
  scale &
  text;
export type Line3DProps = Base3DWidgetProps & scale;
export type Quad3DProps = Base3DWidgetProps;
export type Triangle3DProps = Base3DWidgetProps;

export type DotProps = BaseWidgetProps & position & scale;
export type TriangleProps = BaseWidgetProps;
export type RectangleProps = BaseWidgetProps & position & size;
export type QuadProps = BaseWidgetProps;
export type TextProps = BaseWidgetProps & position & scale & text;

type LookingAtFunctions = {
  getLookingAt(): LuaMultiReturn<[number, number, number, boolean]>;
  setLookingAt(activated: boolean): void;
  setLookingAt(x: number, y: number, z: number): void;
};

type Vertex2DFunctions = {
  setVertex(index: number, x: number, y: number): void;
  getVertexCount(): number;
};

type Vertex3DFunctions = {
  setVertex(index: number, x: number, y: number, z: number): void;
  getVertexCount(): number;
};

export type VetexData2D = [number, number][];
export type VetexData3D = [number, number, number][];

export type Cube = GetterSetterWithId<CubeProps> & LookingAtFunctions;
export type Dot3D = GetterSetterWithId<Dot3DProps>;
export type FloatingText3D = GetterSetterWithId<FloatingText3DProps>;
export type Line3D = GetterSetterWithId<Line3DProps> & Vertex3DFunctions;
export type Quad3D = GetterSetterWithId<Quad3DProps> & Vertex3DFunctions;
export type Triangle3D = GetterSetterWithId<Triangle3DProps> &
  Vertex3DFunctions;

export type Dot = GetterSetterWithId<DotProps>;
export type Triangle = GetterSetterWithId<TriangleProps> & Vertex2DFunctions;
export type Rectangle = GetterSetterWithId<RectangleProps>;
export type Quad = GetterSetterWithId<QuadProps> & Vertex2DFunctions;
export type Text = GetterSetterWithId<TextProps>;

export type Widget =
  | Cube
  | Dot3D
  | FloatingText3D
  | Line3D
  | Quad3D
  | Triangle3D
  | Dot
  | Triangle
  | Rectangle
  | Quad
  | Text;
