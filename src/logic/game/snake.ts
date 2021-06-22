import { GameScene } from "../../presentation/game/scene/game/game-scene";
import { Board } from "./board";
import { SnakeTile } from "./snaketile";

export class Snake {

    private direction = "UP";
    private rotation = 90;
    private prevDirection = "LEFT";
    private headLocationX = 3;
    private headLocationY = 4;

    public nextFrame(gameBoard : Board) {
        this.moveSnake(gameBoard);

    }

    private moveSnake(gameBoard : Board) {

        gameBoard.setGridTile(this.headLocationX, this.headLocationY, new SnakeTile(this.headLocationX, this.headLocationY, "body", 90));

        switch(this.direction) {
            case "UP":
                this.rotation = 0;
                this.headLocationY -= 1;
                break;
            case "RIGHT":
                this.rotation = 90;
                this.headLocationX -= 1;
                break;
            case "DOWN":
                this.rotation = 180;
                this.headLocationY += 1;
                break;
            case "LEFT":
                this.rotation = 270;
                this.headLocationX += 1;
                break;
            default:
                throw new Error("Invalid snake direction");
        }

        gameBoard.setGridTile(this.headLocationX, this.headLocationY, new SnakeTile(this.headLocationX, this.headLocationY, "head", this.rotation));
    }    
}