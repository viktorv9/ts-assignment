import { AppleTile } from "./appletile";

export class Board {
    private grid;

    constructor() {
        let arraySize = 8;

        this.grid = []
        for (let x = 0; x < arraySize; x++) {
            this.grid.push(new Array(arraySize).fill(null))
        }
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