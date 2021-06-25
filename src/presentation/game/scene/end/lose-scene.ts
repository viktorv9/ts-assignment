import { Color } from "../../../../logic/rendering/color";
import { Context } from "../../../context";
import { PixiScene } from "../pixi-scene";
import { PixiSceneManager } from "../pixi-scene-manager";
import * as PIXI from "pixi.js";

export class LoseScene extends PixiScene {

  constructor(context: Context, manager: PixiSceneManager) {
    super(manager);
    this.draw(context);
  }

  draw(context: Context) {
    const text = new PIXI.Text("Too bad...", {fontSize: 100, fill: Color.white().hexCode});
    text.anchor.set(0.5, 0.7);
    text.position.set(context.appSize.x * 0.5, context.appSize.y * 0.2)
    this.container.addChild(text);

    const text2 = new PIXI.Text("You did not collect 20 apples.", {fontSize: 30, fill: Color.white().hexCode});
    text2.anchor.set(0.5, 0.7);
    text2.position.set(context.appSize.x * 0.5, context.appSize.y * 0.5)
    this.container.addChild(text2);

    const text3 = new PIXI.Text("Press 'space' to restart.", {fontSize: 45, fill: Color.white().hexCode});
    text3.anchor.set(0.5, 0.7);
    text3.position.set(context.appSize.x * 0.5, context.appSize.y * 0.8)
    this.container.addChild(text3);
  }
}
