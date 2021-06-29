export class LeaderboardEntry {
  userId: string;
  score: number;
  characterUsed: number;
  username: string;

  constructor(userId: string, score: number, characterUsed: number, username: string) {
    this.userId = userId;
    this.score = score;
    this.username = username;
    this.characterUsed = characterUsed;
  }

  public toMap(): Map<string, any> {
    return new Map(
      Object.entries({
        userId: this.userId,
        score: this.score,
        username: this.username,
        characterUsed: this.characterUsed
      })
    );
  }

  public static fromMap(map: Map<string, any>): LeaderboardEntry {
    return new LeaderboardEntry(
      (map?.get("userId") as string) ?? "",
      (map?.get("score") as number) ?? -1,
      (map?.get("characterUsed") as number) ?? "",
      (map?.get("username") as string) ?? ""
    );
  }
}
