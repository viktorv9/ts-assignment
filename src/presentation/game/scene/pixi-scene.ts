import { PixiContainerItem } from "../pixi/pixi-container-item";
import { PixiSceneManager } from "./pixi-scene-manager";

export abstract class PixiScene extends PixiContainerItem {
  protected manager: PixiSceneManager;

  constructor(manager: PixiSceneManager) {
    super();
    this.manager = manager;
  }
}
