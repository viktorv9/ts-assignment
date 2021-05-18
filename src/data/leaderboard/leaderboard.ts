export class Leaderboard {
  id: string;
  userId: string;
  score: number;
  characterUsed: number;
  username: string;

  constructor(id: string, userId: string, score: number, characterUsed: number, username: string) {
    this.id = id;
    this.userId = userId;
    this.score = score;
    this.username = username;
    this.characterUsed = characterUsed;
  }

  public toMap(): Map<string, any> {
    return new Map(
      Object.entries({
        id: this.id,
        userId: this.userId,
        score: this.score,
      })
    );
  }

  public static fromMap(map: Map<string, any>): Leaderboard {
    return new Leaderboard(
      (map?.get("id") as string) ?? "",
      (map?.get("userId") as string) ?? "",
      (map?.get("score") as number) ?? -1,
      (map?.get("characterUsed") as number) ?? "",
      (map?.get("username") as string) ?? ""
    );
  }
}
