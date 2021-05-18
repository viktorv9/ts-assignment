import * as PIXI from "pixi.js";

export abstract class PixiContainerItem {
  protected _container: PIXI.Container;

  public get container(): PIXI.Container {
    return this._container;
  }

  constructor() {
    this._container = new PIXI.Container();
  }

  public destroy() {
    this._container.destroy({ children: true, texture: false, baseTexture: false });
    this.onDestroy();
  }

  protected async onDestroy(): Promise<void> {}
}
