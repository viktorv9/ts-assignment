import { Context } from "../../../context";
import { PixiScene } from "../pixi-scene";
import { PixiSceneManager } from "../pixi-scene-manager";
import { Board } from "../../../../logic/game/board";
import { Snake } from "../../../../logic/game/snake";
import * as PIXI from "pixi.js";
import { SnakeTile } from "../../../../logic/game/snaketile";

export class GameScene extends PixiScene {

  private manager;

  private boardScale = 0.813; // game scale kinda hinges on this, which isnt great but does make zooming possible
  private tileSize = 80 * this.boardScale; // 80 is based on the size of a tile

  private gameBoard = new Board();
  private snake = new Snake();

  private context : Context;
  private ticker = new PIXI.Ticker();
  private elapsedTicksSinceLastFrame = 0;

  private keyboardListener : any;
  private registeredDirection = "RIGHT";

  constructor(context: Context, manager: PixiSceneManager) {
    super(manager);
    this.manager = manager;
    this.context = context;

    this.gameBoard.spawnApple();
    this.setupInputHandler();

    this.ticker.autoStart = false;
    this.ticker.add(() => {
      this.gameLoop()
    });
    this.ticker.start();
  }

  private setupInputHandler() {

    this.keyboardListener = (event: { code: any; }) => {

      switch(event.code) {
        case "ArrowUp":
          if (this.snake.getCurrentDirection != "DOWN") {
            this.registeredDirection = "UP"
          }
          break;
        case "ArrowDown":
          if (this.snake.getCurrentDirection != "UP") {
            this.registeredDirection = "DOWN"
          }
          break;
        case "ArrowRight":
          if (this.snake.getCurrentDirection != "LEFT") {
            this.registeredDirection = "RIGHT"
          }
          break;
        case "ArrowLeft":
          if (this.snake.getCurrentDirection != "RIGHT") {
            this.registeredDirection = "LEFT"
          }
          break;
      }

    };

    document.addEventListener("keydown", this.keyboardListener);
  }

  private gameLoop() {

    // console.log(this.snake.currentDirection);

    this.elapsedTicksSinceLastFrame++;
    if (this.elapsedTicksSinceLastFrame > 10) {
      if (!this.snake.isAlive) {
        this.manager.goTo(3);
      } else {
        this.snake.addMovement(this.registeredDirection);
        this.snake.nextFrame(this.gameBoard, this.context);
        this.drawScene();
      }
      this.elapsedTicksSinceLastFrame = 0;
    }
  }

  private drawScene() {
    const boardTexture = this.context.pixiAssetLoader.getResource("board");

    const board = new PIXI.Sprite(boardTexture.texture);
    board.position.set(0, this.context.appSize.y * 0.2);
    board.scale.set(this.boardScale);
    this.container.addChild(board);

    let gameGrid = this.gameBoard.getGrid;

    for (let x = 0; x < gameGrid.length; x++) {
      for (let y = 0; y < gameGrid.length; y++) {

        let tileObject = gameGrid[x][y];
        if (tileObject != null) {
          this.drawObject(tileObject);
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

  drawObject(object : any) {
    
    const objectTexture = object.getTexture(this.context);
    const objectSprite = new PIXI.Sprite(objectTexture.texture);
    objectSprite.scale.set(this.boardScale);
    objectSprite.anchor.set(0.5, 0.5);

    objectSprite.angle = object.rotation;
    let xOffset = this.tileSize * object.x + this.tileSize / 2;
    let yOffset = this.tileSize * object.y + this.tileSize / 2;
    
    objectSprite.position.set(0 + xOffset, this.context.appSize.y * 0.2 + yOffset);

    this.container.addChild(objectSprite);
  }

}
