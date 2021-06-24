import { AppleTile } from "./appletile";
import { SnakeTile } from "./snaketile";

export class Board {
    private grid;

    constructor() {
        let arraySize = 8;

        this.grid = []
        for (let x = 0; x < arraySize; x++) {
            this.grid.push(new Array(arraySize).fill(null))
        }

        this.grid[0][4] = new SnakeTile(0, 4, "tail", 90)
        this.grid[1][4] = new SnakeTile(1, 4, "body", 90)
        this.grid[2][4] = new SnakeTile(2, 4, "body", 90)
        this.grid[3][4] = new SnakeTile(3, 4, "head", 90)
    }

    spawnApple() {
        let possibleSpawns = [];

        for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] == null) {
                    possibleSpawns.push([i, j])
                }
            }
        }

        let spawnLocationNumber = Math.floor(Math.random() * possibleSpawns.length);

        let spawnLocation = possibleSpawns[spawnLocationNumber]

        this.grid[spawnLocation[0]][spawnLocation[1]] = new AppleTile(spawnLocation[0], spawnLocation[1]);
    }

    public setGridTile(x : any, y : any, to : any) : any {
        this.grid[x][y] = to;
        return this.grid;
    }
    
    public get getGrid() {
        return this.grid
    }
    
}