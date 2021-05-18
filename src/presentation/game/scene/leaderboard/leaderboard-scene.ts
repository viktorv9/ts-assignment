import { Color } from "../../../../logic/rendering/color";
import { Context } from "../../../context";
import { PixiScene } from "../pixi-scene";
import { PixiSceneManager } from "../pixi-scene-manager";
import * as PIXI from "pixi.js";

export class LeaderboardScene extends PixiScene {
  constructor(context: Context, manager: PixiSceneManager) {
    super(manager);
    this.draw(context);
  }

  draw(context: Context) {
    const text = new PIXI.Text("Leaderboard Scene", {fontSize: 50, fill: Color.white().hexCode});
    text.anchor.set(0.5, 0.5);
    text.position.set(context.appSize.x * 0.5, context.appSize.y * 0.5)
    this.container.addChild(text);
  }
}
