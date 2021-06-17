import { Context } from "../../../context";
import { PixiScene } from "../pixi-scene";
import { PixiSceneManager } from "../pixi-scene-manager";
import * as PIXI from "pixi.js";
// import { PixiAnimatedSprite } from "../../pixi/pixi-animated-sprite";

// import { GameBoard } from "./board";

export class GameScene extends PixiScene {
  constructor(context: Context, manager: PixiSceneManager) {
    super(manager);
    this.draw(context);
  }

  draw(context: Context) {
    const boardTexture = context.pixiAssetLoader.getResource("board");

    const sprite = new PIXI.Sprite(boardTexture.texture);
    sprite.position.set(context.appSize.x * 0.5, context.appSize.y * 0.5);
    sprite.scale.set(0.7)
    sprite.anchor.set(0.5, 0.5);
    this.container.addChild(sprite);

    // const apeAnimation = context.pixiAssetLoader.getResource("someAnimation");
    
    // const animatedRunner = new PixiAnimatedSprite("Run", apeAnimation);
    // animatedRunner.position.set(context.appSize.x * 0.5, context.appSize.y * 0.6);
    // animatedRunner.anchor.set(0.5, 0.5);
    // animatedRunner.anim.animationSpeed = 0.3;
    // animatedRunner.play();

    // this.container.addChild(animatedRunner.anim);
  }
}
