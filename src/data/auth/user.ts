export class User {
  private _id: string;
  private _displayName: string;

  public get id() {
    return this._id;
  }

  public get displayName() {
    return this._displayName;
  }

  constructor(id: string, displayName: string) {
    this._id = id;
    this._displayName = displayName;
  }

  public toMap(): Map<string, any> {
    return new Map(
      Object.entries({
        id: this._id,
        displayName: this._displayName,
      })
    );
  }

  public static fromMap(map: Map<string, any>): User {
    return new User((map?.get("id") as string) ?? "", (map?.get("displayName") as string) ?? "");
  }
}
