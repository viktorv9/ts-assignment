import { Observable } from "rxjs";
import { LeaderboardEntry } from "./leaderboard";
import { LeaderboardProvider } from "./leaderboard-provider";

export class LeaderboardRepository {
  provider: LeaderboardProvider;

  constructor(provider: LeaderboardProvider) {
    this.provider = provider;
  }

  public async listLeaderboard(
    startAt: any | null,
    limit: number,
    orderBy: any,
    order: string
  ): Promise<Array<LeaderboardEntry>> {
    return this.provider.listLeaderboard();
  }

  createLeaderboard(leaderboard: LeaderboardEntry): Promise<void>{
    return this.provider.createLeaderboard(leaderboard);
  };
}
