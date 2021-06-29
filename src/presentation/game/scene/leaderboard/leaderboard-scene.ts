import { Color } from "../../../../logic/rendering/color";
import { Context } from "../../../context";
import { PixiScene } from "../pixi-scene";
import { PixiSceneManager } from "../pixi-scene-manager";
import { LeaderboardProvider } from "../../../../data/leaderboard/leaderboard-provider";
import { FirestoreLeaderboardProvider } from "../../../../data/leaderboard/firestore-leaderboard-provider";
import * as PIXI from "pixi.js";
import { LeaderboardEntry } from "../../../../data/leaderboard/leaderboard";

export class LeaderboardScene extends PixiScene {
  private leaderboardProvider : LeaderboardProvider;
  private context : Context;

  constructor(context: Context, manager: PixiSceneManager) {
    super(manager);

    this.context = context;
    this.leaderboardProvider = new FirestoreLeaderboardProvider;

    this.draw();
    this.getScores().then(scores => {
      this.drawScores(scores);
    });
  }
  
  async getScores() : Promise<Array<LeaderboardEntry>> {
    return await this.leaderboardProvider.listLeaderboard();
  }

  drawScores(scores : Array<LeaderboardEntry>) {
    let leaderboardNumber = 1;
    for (let scoreEntry of scores) { 
      const text = new PIXI.Text(leaderboardNumber + ". " + scoreEntry.username + " with " + scoreEntry.score + " apples.", {fontSize: 30, fill: Color.white().hexCode});
      text.anchor.set(0, 0.5);
      text.position.set(this.context.appSize.x * 0.1, (this.context.appSize.y * 0.2) + (this.context.appSize.y * leaderboardNumber/20))
      this.container.addChild(text);
      leaderboardNumber++;
    }
  }


  draw() {
    const text = new PIXI.Text("Leaderboard", {fontSize: 50, fill: Color.white().hexCode});
    text.anchor.set(0.5, 0.5);
    text.position.set(this.context.appSize.x * 0.5, this.context.appSize.y * 0.1)
    this.container.addChild(text);

    const text2 = new PIXI.Text("Press 'space' to restart.", {fontSize: 45, fill: Color.white().hexCode});
    text2.anchor.set(0.5, 0.7);
    text2.position.set(this.context.appSize.x * 0.5, this.context.appSize.y * 0.9)
    this.container.addChild(text2);
  }
}
