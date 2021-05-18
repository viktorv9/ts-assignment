import firebase from "firebase/app";
import "firebase/firestore";
import { LeaderboardProvider } from "./leaderboard-provider";
import { Observable } from "rxjs";
import { Leaderboard } from "./leaderboard";

export class FirestoreLeaderboardProvider implements LeaderboardProvider {
  private firestore: firebase.firestore.Firestore;
  private collectionReference: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor() {
    this.firestore = firebase.firestore();
    this.collectionReference = this.firestore.collection("leaderboard");
  }

  public async listLeaderboard(
    startAt: any | null,
    limit: number,
    orderBy: any,
    order: "asc" | "desc"
  ): Promise<Observable<Array<Leaderboard>>> {
    throw new Error("method not implemented");
  }

  createLeaderboard(leaderboard: Leaderboard): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
