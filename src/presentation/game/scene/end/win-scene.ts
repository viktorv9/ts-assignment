import { Color } from "../../../../logic/rendering/color";
import { Context } from "../../../context";
import { PixiScene } from "../pixi-scene";
import { PixiSceneManager } from "../pixi-scene-manager";
import { PixiAnimatedSprite } from "../../pixi/pixi-animated-sprite";
import * as PIXI from "pixi.js";

export class WinScene extends PixiScene {

  constructor(context: Context, manager: PixiSceneManager) {
    super(manager);
    this.draw(context);
  }

  draw(context: Context) {
    const text = new PIXI.Text("Congratulations!!", {fontSize: 65, fill: Color.white().hexCode});
    text.anchor.set(0.5, 0.7);
    text.position.set(context.appSize.x * 0.5, context.appSize.y * 0.2)
    this.container.addChild(text);

    const text2 = new PIXI.Text("You collected 20 apples!", {fontSize: 40, fill: Color.white().hexCode});
    text2.anchor.set(0.5, 0.7);
    text2.position.set(context.appSize.x * 0.5, context.appSize.y * 0.5)
    this.container.addChild(text2);

    const text3 = new PIXI.Text("Press 'space' to restart.", {fontSize: 45, fill: Color.white().hexCode});
    text3.anchor.set(0.5, 0.7);
    text3.position.set(context.appSize.x * 0.5, context.appSize.y * 0.8)
    this.container.addChild(text3);

    
    const apeAnimation = context.pixiAssetLoader.getResource("someAnimation");
    
    const animatedRunner1 = new PixiAnimatedSprite("Run", apeAnimation);
    animatedRunner1.position.set(context.appSize.x * 0.5, context.appSize.y * 0.35);
    animatedRunner1.anchor.set(0.5, 0.5);
    animatedRunner1.scale.set(1.5);
    animatedRunner1.anim.animationSpeed = 0.3;
    animatedRunner1.play();

    const animatedRunner2 = new PixiAnimatedSprite("Run", apeAnimation);
    animatedRunner2.position.set(context.appSize.x * 0.5, context.appSize.y * 0.65);
    animatedRunner2.anchor.set(0.5, 0.5);
    animatedRunner2.scale.set(1.5);
    animatedRunner2.anim.animationSpeed = 0.3;
    animatedRunner2.play();

    this.container.addChild(animatedRunner1.anim);
    this.container.addChild(animatedRunner2.anim);
  }
}
