import { AuthProvider } from "./auth-provider";
import firebase from "firebase/app";
import "firebase/auth";
import { Email } from "../../logic/validation/email";
import { Password } from "../../logic/validation/password";
import { User } from "./user";

export class FirebaseAuthProvider implements AuthProvider {
  private _auth: firebase.auth.Auth;

  constructor() {
    this._auth = firebase.auth();
  }

  async signUpWithEmailAndPassword(email: Email, password: Password): Promise<User> {
    const credential = await this._auth.createUserWithEmailAndPassword(email.value, password.value);
    if (!credential.user) throw Error("FirebaseAuthProvider.signInWithEmailAndPassword(): user missing in credential");
    return new User(credential.user.uid, credential.user.displayName ?? "");
  }

  async signInWithEmailAndPassword(email: Email, password: Password): Promise<User> {
    const credential = await this._auth.signInWithEmailAndPassword(email.value, password.value);
    if (!credential.user) throw Error("FirebaseAuthProvider.signInWithEmailAndPassword(): user missing in credential");
    return new User(credential.user.uid, credential.user.displayName ?? "");
  }

  async signOut(): Promise<void> {
    return this._auth.signOut();
  }
}
