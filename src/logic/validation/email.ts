import isEmail from "validator/lib/isEmail";
import { ValidationResult } from "./validationResult";

export class Email {
  private _value: string;

  get value(): string {
    return this._value;
  }

  get isValid():boolean {
    return this.validate().success;
  }

  constructor(defaultValue: string) {
    this._value = defaultValue;
  }

  validate(): ValidationResult {
    const isValidated = isEmail(this._value);
    if (!isValidated) return new ValidationResult(isValidated, new Error("Invalid email"));

    return new ValidationResult(isValidated, null);
  }
}
