import { Color } from "../../../../logic/rendering/color";
import { Context } from "../../../context";
import { PixiScene } from "../pixi-scene";
import { PixiSceneManager } from "../pixi-scene-manager";
import * as PIXI from "pixi.js";

export class PregameScene extends PixiScene {

  private keyboardListener : any;


  constructor(context: Context, manager: PixiSceneManager) {
    super(manager);
    this.setupInputHandler();
    this.draw(context);
  }

  private setupInputHandler() {

    this.keyboardListener = (event: { code: any; }) => {

      if (event.code == "Space") {
        this.manager.goTo(3);
      }

    };

    document.addEventListener("keydown", this.keyboardListener);
  }

  draw(context: Context) {
    const text = new PIXI.Text("Press 'space' to play!", {fontSize: 50, fill: Color.white().hexCode});
    text.anchor.set(0.5, 0.7);
    text.position.set(context.appSize.x * 0.5, context.appSize.y * 0.5)
    this.container.addChild(text);
  }
}
