import { Observable } from "rxjs";
import { LeaderboardEntry } from "./leaderboard";

export interface LeaderboardProvider {
  listLeaderboard(): Promise<Array<LeaderboardEntry>>;
  createLeaderboard(leaderboard: LeaderboardEntry): Promise<void>;
}
