import { Observable } from "rxjs";
import { Leaderboard } from "./leaderboard";

export interface LeaderboardProvider {
  listLeaderboard(
    startAt: any | null,
    limit: number,
    orderBy: any,
    order: string
  ): Promise<Observable<Array<Leaderboard>>>;
  createLeaderboard(leaderboard: Leaderboard): Promise<void>;
}
