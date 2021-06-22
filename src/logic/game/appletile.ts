export class AppleTile {

    private x;
    private y;
    private rotation;

    constructor(x : any, y : any, rotation = 0) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
    }

    public getTexture(context : any) {
        return context.pixiAssetLoader.getResource("apple");
    }

}