import { AuthProvider } from "./auth-provider";
import { User } from "./user";
import { Email } from "../../logic/validation/email";
import { Password } from "../../logic/validation/password";

export class AuthRepository {
  private _provider: AuthProvider;

  constructor(provider: AuthProvider) {
    this._provider = provider;
  }

  async signUpWithEmailAndPassword(email: Email, password: Password): Promise<User> {
    return this._provider.signUpWithEmailAndPassword(email, password);
  }

  async signInWithEmailAndPassword(email: Email, password: Password): Promise<User> {
    return this._provider.signInWithEmailAndPassword(email, password);
  }

  async signOut(): Promise<void> {
    return this._provider.signOut();
  }
}
