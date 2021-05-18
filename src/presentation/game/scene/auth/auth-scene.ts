import { Email } from "../../../../logic/validation/email";
import { Password } from "../../../../logic/validation/password";
import { Context } from "../../../context";
import { PixiScene } from "../pixi-scene";
import { PixiSceneManager } from "../pixi-scene-manager";

export class AuthScene extends PixiScene {
  private _formNode: HTMLElement;

  constructor(context: Context, manager: PixiSceneManager) {
    super(manager);
    this._formNode = document.createElement("div");
    this.draw(context);
  }

  draw(context: Context): void {
    this.drawForm(context);
  }

  drawForm(context: Context): void {
    const html = `
    <div class="login-box">
      <h2>Login</h2>
      <form autocomplete="false" action="">
        <div class="user-box">
          <input id="email-field" type="mail" name="" required="" readonly onfocus="this.removeAttribute('readonly');">
          <div id="email-field-tooltip" class="invalid-tooltip">Enter a valid email</div>
          <label>Email</label>
        </div>
        <div class="user-box">
          <input id="password-field" type="password" name="" required="" readonly onfocus="this.removeAttribute('readonly');">
          <div id="password-field-tooltip" class="invalid-tooltip">Enter a password with a length of 6 that contains letters, numbers, a uppercase letter and a special sign</div>
          <label>Password</label>
        </div>
        <a id="submit-button" href="">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Submit
        </a>
      </form>
    </div>
    `;

    this._formNode.innerHTML = html;
    document.body.appendChild(this._formNode);

    const submitButton = this._formNode.querySelector("#submit-button");
    if (!submitButton) throw Error("AuthScene.drawForm(): missing submit button element");
    submitButton.addEventListener("click", (event) => this.handleFormSubmit(event, context));
  }

  async handleFormSubmit(event: Event, context: Context): Promise<void> {
    event.preventDefault();
    context.audioManager.playSound("someSound");

    const emailField = this._formNode.querySelector("#email-field") as HTMLInputElement;
    const emailFieldTooltip = this._formNode.querySelector("#email-field-tooltip") as HTMLInputElement;
    const passwordField = this._formNode.querySelector("#password-field") as HTMLInputElement;
    const passwordFieldTooltip = this._formNode.querySelector("#password-field-tooltip") as HTMLInputElement;
    if (!emailField || !passwordField || !emailFieldTooltip || !passwordFieldTooltip)
      throw Error("AuthScene.drawForm(): input elements are missing");

    const email = new Email(emailField.value);
    emailFieldTooltip.style.display = !email.isValid ? "block" : "none";

    const password = new Password(passwordField.value);
    passwordFieldTooltip.style.display = !password.isValid ? "block" : "none";

    if (!email.isValid || !password.isValid) return;

    try {
      await context.authRepository.signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") throw error;
      await context.authRepository.signUpWithEmailAndPassword(email, password);
    }
  }

  async onDestroy(): Promise<void> {
    this._formNode?.remove();
  }
}
