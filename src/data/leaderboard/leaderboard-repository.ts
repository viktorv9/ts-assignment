import { Observable } from "rxjs";
import { Leaderboard } from "./leaderboard";
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
  ): Promise<Observable<Array<Leaderboard>>> {
    return this.provider.listLeaderboard(startAt, limit, orderBy, order);
  }

  createLeaderboard(leaderboard: Leaderboard): Promise<void>{
    return this.provider.createLeaderboard(leaderboard);
  };
}
