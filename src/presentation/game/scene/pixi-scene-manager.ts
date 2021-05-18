import * as PIXI from "pixi.js";
import { PixiScene } from "./pixi-scene";

export class PixiSceneManager {
  public stage: PIXI.Container;
  public scenes: Array<(manager: PixiSceneManager) => PixiScene>;
  public currentScene!: PixiScene;
  public currentSceneIndex: number;
  public previousSceneIndex: number;
  private loadingScene: boolean = false;

  constructor(stage: PIXI.Container, scenes: Array<(manager: PixiSceneManager) => PixiScene>, startSceneIndex = 0) {
    if (scenes.length === 0) throw Error("PixiSceneManager: implement at least 1 scene");
    this.stage = stage;
    this.scenes = scenes;

    this.currentSceneIndex = startSceneIndex;
    this.previousSceneIndex = this.currentSceneIndex;
    this.loadInitial();
  }

  private async loadInitial() {
    this.currentScene = await this.scenes[0](this);
    this.stage.addChild(this.currentScene.container);
  }

  public async goTo(index: number) {
    const target = index;
    if (target > this.scenes.length - 1 || target < 0) throw Error("SceneManager.goTo(): scene does not exist");
    const nextScene = await this.scenes[target](this);
    this.loadScene(nextScene, target);
  }

  public async previous() {
    const previousIndex = this.currentSceneIndex - 1;
    if (previousIndex < 0) throw Error("SceneManager.previous(): scene does not exist");;
    const nextScene = await this.scenes[previousIndex](this);
    this.loadScene(nextScene, previousIndex);
  }

  public async next() {
    const next = this.currentSceneIndex + 1;
    if (next > this.scenes.length - 1) throw Error("SceneManager.next(): scene does not exist");;
    const nextScene = await this.scenes[next](this);
    this.loadScene(nextScene, next);
  }

  public async reload() {
    const nextScene = await this.scenes[this.currentSceneIndex](this);
    this.loadScene(nextScene, this.currentSceneIndex);
  }

  private loadScene(nextScene: PixiScene, index: number) {
    if(this.loadingScene) throw new Error('PixiSceneManager.loadScene(): cannot load multiple scenes simultaniously');

    this.loadingScene = true;
    this.currentScene.destroy();
    this.currentScene = nextScene;
    this.currentSceneIndex = index;
    this.stage.addChild(this.currentScene.container);
    this.loadingScene = false;
  }
}
