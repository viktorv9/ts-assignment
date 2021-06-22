export class SnakeTile {

    private x;
    private y;
    private rotation;
    private type;

    constructor(x : any, y : any, type : any, rotation = 0) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.type = type;
    }

    public getTexture(context : any) {
        if (this.type == "head") return context.pixiAssetLoader.getResource("head");
        if (this.type == "body") return context.pixiAssetLoader.getResource("body");
        if (this.type == "bend") return context.pixiAssetLoader.getResource("bend");
        if (this.type == "tail") return context.pixiAssetLoader.getResource("tail");
        return "Snake object has invalid type";
    }

}