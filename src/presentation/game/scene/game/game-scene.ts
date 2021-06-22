import { Context } from "../../../context";
import { PixiScene } from "../pixi-scene";
import { PixiSceneManager } from "../pixi-scene-manager";
import { Board } from "../../../../logic/game/board";
import * as PIXI from "pixi.js";
// import { PixiAnimatedSprite } from "../../pixi/pixi-animated-sprite";

// import { GameBoard } from "./board";

export class GameScene extends PixiScene {

  private boardScale = 0.8; // game scale kinda hinges on this. does make zooming possible
  private tileSize = 80 * this.boardScale; // 80 is based on the size of a tile

  constructor(context: Context, manager: PixiSceneManager) {
    super(manager);
    this.drawScene(context);
  }

  drawScene(context: Context) {
    const boardTexture = context.pixiAssetLoader.getResource("board");

    const board = new PIXI.Sprite(boardTexture.texture);
    board.position.set(0, context.appSize.y * 0.2);
    board.scale.set(this.boardScale);
    this.container.addChild(board);

    let gameBoard = new Board();
    for (let x = 0; x < 48; x++) {
      gameBoard.spawnApple();
    }

    let gameGrid = gameBoard.getGrid;

    for (let x = 0; x < gameGrid.length; x++) {
      for (let y = 0; y < gameGrid.length; y++) {

        let tileObject = gameGrid[x][y];
        if (tileObject != null) {
          this.drawObject(tileObject, context);
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

  drawObject(object : any, context: Context) {
    
    const appleTexture = context.pixiAssetLoader.getResource("apple");
    const apple = new PIXI.Sprite(appleTexture.texture);
    apple.scale.set(this.boardScale);
    apple.anchor.set(0.5, 0.5);

    apple.angle = object.rotation;
    let xOffset = this.tileSize * object.x + this.tileSize / 2;
    let yOffset = this.tileSize * object.y + this.tileSize / 2;
    
    // apple.anchor.set(0, 0);
    apple.position.set(0 + xOffset, context.appSize.y * 0.2 + yOffset);

    this.container.addChild(apple);
  }
}
