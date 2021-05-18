import { ValidationResult } from "./validationResult";
import isStrongPassword from "validator/lib/isStrongPassword";

export class Password {
  private _value: string;

  get value(): string {
    return this._value;
  }

  get isValid():boolean {
    return this.validate().success;
  }

  constructor(initial: string) {
    this._value = initial;
  }

  validate(): ValidationResult {
    if (!isStrongPassword(this._value, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
      return new ValidationResult(false, new Error("Choose a strong password"));
    }

    return new ValidationResult(true, null);
  }
}
