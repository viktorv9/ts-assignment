import { Context } from "../../../context";
import { PixiScene } from "../pixi-scene";
import { PixiSceneManager } from "../pixi-scene-manager";
import { Board } from "../../../../logic/game/board";
import * as PIXI from "pixi.js";
// import { PixiAnimatedSprite } from "../../pixi/pixi-animated-sprite";

// import { GameBoard } from "./board";

export class GameScene extends PixiScene {

  private boardScale = 0.7; // game scale kinda hinges on this. does make zooming possible

  constructor(context: Context, manager: PixiSceneManager) {
    super(manager);
    this.draw(context);
  }

  draw(context: Context) {
    const boardTexture = context.pixiAssetLoader.getResource("board");

    const board = new PIXI.Sprite(boardTexture.texture);
    board.position.set(context.appSize.x * 0.5, context.appSize.y * 0.5);
    board.scale.set(this.boardScale);
    board.anchor.set(0.5, 0.5);
    this.container.addChild(board);

    let gameBoard = new Board();
    gameBoard.spawnApple();

    let gameGrid = gameBoard.getGrid;

    for (let x = 0; x < gameGrid.length; x++) {
      for (let y = 0; y < gameGrid.length; y++) {

        let tileObject = gameGrid[x][y];
        if (tileObject != null) {
          tileObject.draw();
        }

      }
    }

    // const apeAnimation = context.pixiAssetLoader.getResource("someAnimation");
    
    // const animatedRunner = new PixiAnimatedSprite("Run", apeAnimation);
    // animatedRunner.position.set(context.appSize.x * 0.5, context.appSize.y * 0.6);
    // animatedRunner.anchor.set(0.5, 0.5);
    // animatedRunner.anim.animationSpeed = 0.3;
    // animatedRunner.play();

    // this.container.addChild(animatedRunner.anim);
  }
}
