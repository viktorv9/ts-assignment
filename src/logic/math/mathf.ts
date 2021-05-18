export class Mathf {
  public static calculateAngleRadians(x: number, y: number): number {
    return Math.atan2(y, x);
  }
  public static calculateAngleDegrees(x: number, y: number): number {
    return Mathf.radiansToDegrees(Math.atan2(y, x));
  }
  public static radiansToDegrees(radians: number): number {
    return radians * (180 / Math.PI);
  }
  public static degreesToRadians(degrees: number): number {
    return (degrees / 180) * Math.PI;
  }
  public static clamp(value: number, min: number, max: number): number {
    return value < min ? min : value > max ? max : value;
  }
  public static lerp(from: number, to: number, interpolation: number): number {
    return this.clamp(this.lerpUnclamped(from, to, interpolation), from, to);
  }
  public static lerpUnclamped(from: number, to: number, interpolation: number): number {
    return (1 - interpolation) * from + interpolation * to;
  }
  public static randomRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
