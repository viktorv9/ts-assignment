import { GameScene } from "../../presentation/game/scene/game/game-scene";
import { Context } from "../../presentation/context";
import { Board } from "./board";
import { SnakeTile } from "./snaketile";
import { AppleTile } from "./appletile";

export class Snake {

    private snakeLength = 3;
    private movementHistory = ["RIGHT", "RIGHT", "RIGHT"];
    private currentDirection = "RIGHT";
    private headLocationX = 3;
    private headLocationY = 4;
    private tailLocationX = 0;
    private tailLocationY = 4;

    private alive = true;

    private ateApple = false;

    public nextFrame(gameBoard : Board, context : Context) {

        this.currentDirection = this.movementHistory[this.snakeLength];

        this.checkCollision(gameBoard, context);

        if (!this.alive) return

        if (!this.ateApple) {
            this.moveTail(gameBoard);
        }
        this.moveSnake(gameBoard);
    }

    public addMovement(move : string) {
        this.movementHistory.push(move);
    }

    private checkCollision(gameBoard : Board, context : Context) {
        let currentGrid = gameBoard.getGrid
        let checkX = this.headLocationX;
        let checkY = this.headLocationY;

        switch(this.currentDirection) {
            case "UP":
                checkY -= 1;
                break;
            case "RIGHT":
                checkX += 1;
                break;
            case "DOWN":
                checkY += 1;
                break;
            case "LEFT":
                checkX -= 1;
                break;
        }

        if ((checkY > 7 || checkY < 0) || (checkX > 7 || checkX < 0)) {
            this.alive = false;
            context.audioManager.playSound("hit");
            return
        }

        if (currentGrid[checkX][checkY] != null) {
            if (currentGrid[checkX][checkY] instanceof AppleTile ) {
                this.ateApple = true;
                context.audioManager.playSound("apple");
                gameBoard.spawnApple();
            } else {
                this.alive = false;
                context.audioManager.playSound("hit");
            }
        }
        
    }

    private moveSnake(gameBoard : Board) {

        let rotation;

        gameBoard.setGridTile(this.headLocationX, this.headLocationY, this.decideBodyTile());

        switch(this.currentDirection) {
            case "UP":
                rotation = 0;
                this.headLocationY -= 1;
                break;
            case "RIGHT":
                rotation = 90;
                this.headLocationX += 1;
                break;
            case "DOWN":
                rotation = 180;
                this.headLocationY += 1;
                break;
            case "LEFT":
                rotation = 270;
                this.headLocationX -= 1;
                break;
            default:
                throw new Error("Invalid snake direction");
        }

        if (this.ateApple) {
            this.ateApple = false;
            this.snakeLength++;
        } else {
            this.movementHistory.shift();
        }

        gameBoard.setGridTile(this.headLocationX, this.headLocationY, new SnakeTile(this.headLocationX, this.headLocationY, "head", rotation));
    }

    private decideBodyTile() : SnakeTile {
        
        
        const isBend1 = ((this.movementHistory[this.snakeLength] == "UP" && this.movementHistory[this.snakeLength-1] == "LEFT")
            || (this.movementHistory[this.snakeLength] == "RIGHT" && this.movementHistory[this.snakeLength-1] == "DOWN"));
        const isBend2 = ((this.movementHistory[this.snakeLength] == "RIGHT" && this.movementHistory[this.snakeLength-1] == "UP")
            || (this.movementHistory[this.snakeLength] == "DOWN" && this.movementHistory[this.snakeLength-1] == "LEFT"));
        const isBend3 = ((this.movementHistory[this.snakeLength] == "LEFT" && this.movementHistory[this.snakeLength-1] == "UP")
            || (this.movementHistory[this.snakeLength] == "DOWN" && this.movementHistory[this.snakeLength-1] == "RIGHT"));
        const isBend4 = ((this.movementHistory[this.snakeLength] == "UP" && this.movementHistory[this.snakeLength-1] == "RIGHT")
            || (this.movementHistory[this.snakeLength] == "LEFT" && this.movementHistory[this.snakeLength-1] == "DOWN"));

        let rotation;
        let bodyType;

        if (this.movementHistory[this.snakeLength] == this.movementHistory[this.snakeLength-1]) {
            bodyType = "body";
            if (this.movementHistory[this.snakeLength] == "UP" || this.movementHistory[this.snakeLength] == "DOWN")
                rotation = 0;
            else
                rotation = 90;

        } else {
            bodyType = "bend"
            if (isBend1) {
                rotation = 0;
            } else if (isBend2) {
                rotation = 90;
            } else if (isBend3) {
                rotation = 180;
            } else if (isBend4) {
                rotation = 270;
            }
        }

        return new SnakeTile(this.headLocationX, this.headLocationY, bodyType, rotation)
    }

    private moveTail(gameBoard : Board) {

        let rotation;

        gameBoard.setGridTile(this.tailLocationX, this.tailLocationY, null);

        switch(this.movementHistory[0]) {
            case "UP":
                this.tailLocationY -= 1;
                break;
            case "RIGHT":
                this.tailLocationX += 1;
                break;
            case "DOWN":
                this.tailLocationY += 1;
                break;
            case "LEFT":
                this.tailLocationX -= 1;
                break;
            default:
                throw new Error("Invalid tail direction");
        }

        switch(this.movementHistory[1]) {
            case "UP":
                rotation = 0;
                break;
            case "RIGHT":
                rotation = 90;
                break;
            case "DOWN":
                rotation = 180;
                break;
            case "LEFT":
                rotation = 270;
                break;
            default:
                throw new Error("Invalid pretail direction");
        }

        gameBoard.setGridTile(this.tailLocationX, this.tailLocationY, new SnakeTile(this.tailLocationX, this.tailLocationY, "tail", rotation));
    }

    public get getCurrentDirection() {
        return this.currentDirection;
    }

    public get isAlive() {
        return this.alive;
    }

    public get score() {
        return this.snakeLength-3;
    }
}