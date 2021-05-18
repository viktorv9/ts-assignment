import * as PIXI from "pixi.js";

export class PixiAnimatedSprite {
  private _anim: PIXI.AnimatedSprite;
  private _animationTextures: PIXI.Texture[][];
  private _animationNames: string[];
  private _currentAnimation: string;

  public get anim(): PIXI.AnimatedSprite {
    return this._anim;
  }

  public get currentAnimation(): string {
    return this._currentAnimation;
  }

  public get loop() {
    return this._anim.loop;
  }

  public get x() {
    return this._anim.x;
  }

  public get y() {
    return this._anim.y;
  }

  public get scale() {
    return this._anim.scale;
  }

  public get position() {
    return this._anim.position;
  }

  public get anchor() {
    return this._anim.anchor;
  }

  public set loop(looping: boolean) {
    this._anim.loop = looping;
  }

  public set x(xValue: number) {
    this._anim.x = xValue;
  }

  public set y(yValue: number) {
    this._anim.y = yValue;
  }

  constructor(animationName: string = "", json: any = "", lastFrameIndex: number = -1) {
    this._animationNames = [];
    this._animationTextures = [];
    this._currentAnimation = animationName;

    if (animationName != "") {
      this._anim = new PIXI.AnimatedSprite(this.addAnimation(animationName, json, lastFrameIndex));
    } else {
      this._anim = new PIXI.AnimatedSprite([PIXI.Texture.WHITE]);
    }
  }

  private putFramesInList(json: any, lastFrameIndex: number = -1): PIXI.Texture[] {
    if (json == "") {
      console.error("No valid json file given");
      return [];
    }

    const frames = [];
    const animations = [];

    for (let i in json.data.animations) animations.push([i, json.data.animations[i]]);

    if (animations.length === 0) throw new Error("SpriteAnimated.putFramesInList(): given JSON is not valid!");

    const framesList = animations[0][1];

    if (framesList.length > 0) {
      for (let index = 0; index < (lastFrameIndex < 0 ? framesList.length : lastFrameIndex); index++) {
        let element = framesList[index];
        frames.push(PIXI.Texture.from(element));
      }
    }

    return frames;
  }

  addAnimation(animationName: string, json: any, lastFrameIndex: number = -1): PIXI.Texture[] {
    const frames = this.putFramesInList(json, lastFrameIndex);

    return this.addAnimationTextures(animationName, frames);
  }

  addAnimationTextures(animationName: string, frames: PIXI.Texture[]) {
    this._animationTextures.push(frames);
    this._animationNames.push(animationName);

    return frames;
  }

  addFramesToExistingAnimation(
    animationName: string,
    json: any,
    frameName: string,
    switchToNewAnimationAndPlay: boolean = true,
    playAfterSwitch: boolean = true,
    lastFrameIndex: number = -1
  ) {
    const searchResult = this.findAnimation(animationName);

    if (searchResult.length == 0) return;

    const frames = this.putFramesInList(json, lastFrameIndex);

    for (let index = 0; index < frames.length; index++) {
      const element = frames[index];
      searchResult.push(element);
    }

    if (switchToNewAnimationAndPlay) {
      this._anim.textures = searchResult;
      this._currentAnimation = animationName;
      this._anim.play();
    }
  }

  findAnimation(searchName: string): PIXI.Texture[] {
    let searchIndex = -1;

    for (let index = 0; index < this._animationNames.length; index++) {
      const element = this._animationNames[index];

      if (element == searchName) {
        searchIndex = index;
        break;
      }
    }

    if (searchIndex < 0) return [];

    return this._animationTextures[searchIndex];
  }

  switchToAnimation(animationName: string, playAfterSwitch: boolean = false) {
    const searchResult = this.findAnimation(animationName);

    if (searchResult.length == 0) return;

    this._anim.textures = searchResult;
    this._currentAnimation = animationName;

    if (playAfterSwitch) {
      this._anim.play();
    }
  }

  play() {
    this._anim.play();
  }

  stop() {
    this._anim.stop();
  }
}
