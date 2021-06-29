import firebase from "firebase/app";
import "firebase/firestore";
import { LeaderboardProvider } from "./leaderboard-provider";
import { Observable } from "rxjs";
import { LeaderboardEntry } from "./leaderboard";

export class FirestoreLeaderboardProvider implements LeaderboardProvider {
  private firestore: firebase.firestore.Firestore;
  private collectionReference: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;

  constructor() {
    this.firestore = firebase.firestore();
    this.collectionReference = this.firestore.collection("leaderboard");
  }

  public async listLeaderboard(): Promise<Array<LeaderboardEntry>> {
    return new Promise((resolve, reject) => {
      this.collectionReference.orderBy("score", "desc").limit(10).get()
      .then((querySnapshot) => {
          let entries: LeaderboardEntry[] = [];
          querySnapshot.forEach((doc) => {
              entries.push(new LeaderboardEntry(doc.data().userId, doc.data().score, doc.data().characterUsed, doc.data().username));
              resolve(entries);
          });
      });
    });
  }

  createLeaderboard(leaderboard: LeaderboardEntry): Promise<void> {
    return new Promise((resolve, reject) => {
      this.collectionReference.add(Object.fromEntries(leaderboard.toMap()))
      .then(() => {
        resolve();
      })
    });
  }
}
