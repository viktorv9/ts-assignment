import { AssetProvider } from "./asset-provider";
import * as PIXI from "pixi.js";
import { LoaderResource } from "pixi.js";

export class PixiAssetProvider implements AssetProvider<LoaderResource> {
  readonly _paths: Map<string, string>;
  _loader: PIXI.Loader;

  public get resources(): Map<string, LoaderResource> {
    return new Map<string, LoaderResource>(Object.entries(this._loader.resources));
  }

  public get progress(): number {
    return this._loader.progress;
  }

  constructor(paths: Map<string, string>) {
    this._paths = paths;
    this._loader = new PIXI.Loader();
  }

  public async load(): Promise<void> {
    await Object.entries(Object.fromEntries(this._paths)).forEach((val) => {
      this._loader.add(val[0], val[1] as string);
    });
    this._loader.load();
    return new Promise((resolve, reject) => {
      this._loader.onError.add((error) => {
        console.log(error.message);
        reject();
      });
      this._loader.onComplete.add(() => {
        resolve();
      });
    });
  }

  public getResource(resourceName: string) {
    const resource = this.resources.get(resourceName);
    if (!resource)
      throw new Error("PixiAssetProvider.getResource(): " + resourceName + " is not loaded in loader");
    
    return resource;
  }
}
