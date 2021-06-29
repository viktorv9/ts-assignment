import { Observable } from "rxjs";
import { User } from "../../data/auth/user";
import firebase from "firebase/app";
import "firebase/auth";

export class AuthState {
  private _observable: Observable<User | null>;
  private _user: User | null;

  public get user(): User | null {
    return this._user;
  }

  public get observable(): Observable<User | null> {
    return this._observable;
  }

  constructor() {
    this._user = null;
    this._observable = new Observable<User | null>((subscriber) => {
      firebase.auth().onAuthStateChanged((user) => {
        let displayName : string;
        if (user?.displayName != null) {
          displayName = user?.displayName!;
        } else if (user?.email != null) {
          displayName = user?.email?.split('@')[0];
        } else {
          displayName = "undefined"
        }
        if (user) {
          subscriber.next(new User(user.uid, displayName));
        } else {
          subscriber.next(null);
        }
      });
    });
    this._observable.subscribe((user) => (this._user = user));
  }
}
