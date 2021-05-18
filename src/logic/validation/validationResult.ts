export class ValidationResult {
  private _success: boolean;
  private _error: Error | null;

  public get success(): boolean {
    return this._success;
  }

  public get error(): Error | null {
    return this._error;
  }

  constructor(success: boolean, error: Error | null) {
    this._success = success;
    this._error = error;
  }
}
