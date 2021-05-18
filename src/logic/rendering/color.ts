export class Color {
  public r: number;
  public g: number;
  public b: number;
  public a: number;

  constructor(r: number = 0, g: number = 0, b: number = 0, a: number = 1) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  private rgbToHex(rgb: number): string {
    var hex = Number(rgb).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  public get hex(): string {
    const red = this.rgbToHex(this.r);
    const green = this.rgbToHex(this.g);
    const blue = this.rgbToHex(this.b);

    return red + green + blue;
  }

  public get hexCode(): number {
    return Number.parseInt("0x" + this.hex);
  }

  public static hexToRbg(hex: string): Color {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (r, g, b) {
      return r + r + g + g + b + b;
    });

    return new Color();
  }

  public convertHex(hex: string) {
    const color = Color.hexToRbg(hex);
    this.r = color.r;
    this.g = color.g;
    this.b = color.b;
    return this;
  }

  public toString(): string {
    return JSON.stringify({ r: this.r, g: this.g, b: this.b, a: this.a });
  }

  static fromString(rgbString: string): Color {
    const parsed = JSON.parse(rgbString);
    return new Color(parsed.r, parsed.g, parsed.b, parsed.a);
  }

  public copy(): Color {
    return new Color(this.r, this.g, this.b, this.a);
  }

  static red(a = 1): Color {
    return new Color(255, 0, 0, a);
  }

  static green(a = 1): Color {
    return new Color(0, 255, 0, a);
  }

  static blue(a = 1): Color {
    return new Color(0, 0, 255, a);
  }

  static yellow(a = 1): Color {
    return new Color(255, 255, 0, a);
  }

  static black(a = 1): Color {
    return new Color(0, 0, 0, a);
  }

  static white(a = 1): Color {
    return new Color(255, 255, 255, a);
  }
}
