import * as PIXI from "pixi.js";

export interface AssetProvider<T> {
  readonly _paths: Map<string, string>;
  resources: Map<string, T>;
  _loader: PIXI.Loader;
  progress: number;
  load(): Promise<void>;
  getResource(resourceName: string): any;
}