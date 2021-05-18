import { Email } from "../../logic/validation/email";
import { Password } from "../../logic/validation/password";
import { User } from "./user";

export interface AuthProvider {
  signUpWithEmailAndPassword(email: Email, password:Password): Promise<User>;
  signInWithEmailAndPassword(email: Email, password: Password): Promise<User>;
  signOut(): Promise<void>;
}
