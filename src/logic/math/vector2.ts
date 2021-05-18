import { Mathf } from "./mathf";

export type Vector2Type = {
  x: number;
  y: number;
};

export class Vector2 {
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  public static get HALF(): Vector2 {
    return new Vector2(0.5, 0.5);
  }

  public static get UP(): Vector2 {
    return new Vector2(0, 1);
  }

  public static get DOWN(): Vector2 {
    return new Vector2(0, -1);
  }

  public static get LEFT(): Vector2 {
    return new Vector2(-1, 0);
  }

  public static get RIGHT(): Vector2 {
    return new Vector2(1, 0);
  }

  public static get ZERO(): Vector2 {
    return new Vector2(0, 0);
  }

  public static direction(from: Vector2, to: Vector2): Vector2 {
    return new Vector2(to.x - from.x, to.y - from.y).normalized();
  }

  public static distance(from: Vector2, to: Vector2): number {
    return new Vector2(from.x - to.x, from.y - to.y).magnitude();
  }

  public static angle(from: Vector2, to: Vector2): number {
    return Vector2.dot(from, to) / (from.magnitude() * to.magnitude());
  }

  public static lerp(from: Vector2, to: Vector2, interpolation: number): Vector2 {
    return new Vector2(Mathf.lerp(from.x, from.y, interpolation), Mathf.lerp(from.y, to.y, interpolation));
  }

  public static lerpUnclamped(from: Vector2, to: Vector2, interpolation: number): Vector2 {
    return new Vector2(
      Mathf.lerpUnclamped(from.x, from.y, interpolation),
      Mathf.lerpUnclamped(from.y, to.y, interpolation)
    );
  }

  public static dot(first: Vector2, second: Vector2): number {
    return first.x * second.x + first.y * second.y;
  }

  public static fromAngle(radians: number): Vector2 {
    return new Vector2(Math.cos(radians), Math.sin(radians));
  }

  public magnitude(): number {
    return Math.sqrt(this.sqrtMagnitude());
  }

  public sqrtMagnitude(): number {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  public normalized(): Vector2 {
    const magnitude = this.magnitude();
    return magnitude > 0 ? new Vector2(this.x / magnitude, this.y / magnitude) : new Vector2(0, 0);
  }

  public clamp(maxLength: number): Vector2 {
    return this.normalized().scale(maxLength);
  }

  public clampMagnitude(min: number, max: number): number {
    return Mathf.clamp(this.magnitude(), min, max);
  }

  public distance(target: Vector2): number {
    return new Vector2(target.x - this.x, target.y - this.y).magnitude();
  }

  public max(): Vector2 {
    return this.x > this.y ? new Vector2(this.x, this.x) : new Vector2(this.y, this.y);
  }

  public min(): Vector2 {
    return this.x < this.y ? new Vector2(this.x, this.x) : new Vector2(this.y, this.y);
  }

  public perpendicularClockwise(): Vector2 {
    return new Vector2(this.y, -this.x);
  }

  public perpendicularCounterClockwise(): Vector2 {
    return new Vector2(-this.y, this.x);
  }

  public static reflect(inDirection: Vector2, inNormal: Vector2): Vector2 {
    inNormal = inNormal.normalized();
    const dot = Vector2.dot(inDirection, inNormal) * 2;
    return inDirection.subtract(inNormal.scale(dot));
  }

  public scale(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  public shrink(scalar: number): Vector2 {
    return new Vector2(this.x / scalar, this.y / scalar);
  }

  public invert(): Vector2 {
    return new Vector2(-this.x, -this.y);
  }

  public invertX(): Vector2 {
    return new Vector2(-this.x, this.y);
  }

  public invertY(): Vector2 {
    return new Vector2(this.x, -this.y);
  }

  public average(other: Vector2): Vector2 {
    return new Vector2((this.x + other.x) * 0.5, (this.y + other.y) * 0.5);
  }

  public round(): Vector2 {
    return new Vector2(Math.round(this.x), Math.round(this.y));
  }

  public floor(): Vector2 {
    return new Vector2(Math.floor(this.x), Math.floor(this.y));
  }

  public ceil(): Vector2 {
    return new Vector2(Math.ceil(this.x), Math.ceil(this.y));
  }

  public equals(other: Vector2): boolean {
    return this.x === other.x && this.y === other.y;
  }

  public equalsWithMargin(other: Vector2, margin: number): boolean {
    return (
      this.x >= other.x - margin &&
      this.x <= other.x + margin &&
      this.y >= other.y - margin &&
      this.y <= other.y + margin
    );
  }

  public add(other: Vector2): Vector2 {
    this.x += other.x;
    this.y += other.y;
    return this;
  }

  public subtract(other: Vector2): Vector2 {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }

  public multiply(other: Vector2): Vector2 {
    this.x *= other.x;
    this.y *= other.y;
    return this;
  }

  public divide(other: Vector2): Vector2 {
    this.x /= other.x;
    this.y /= other.y;
    return this;
  }

  public addXY(x: number, y: number): Vector2 {
    return new Vector2(this.x + x, this.y + y);
  }

  public subtractXY(x: number, y: number): Vector2 {
    return new Vector2(this.x - x, this.y - y);
  }

  public multiplyXY(x: number, y: number): Vector2 {
    return new Vector2(this.x * x, this.y * y);
  }

  public divideXY(x: number, y: number): Vector2 {
    return new Vector2(this.x / x, this.y / y);
  }

  public getCopy(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  public toString(): string {
    return JSON.stringify({ x: this.x, y: this.y });
  }

  public fromString(vectorString: string): void {
    const parsed = JSON.parse(vectorString);
    this.x = parsed.x;
    this.y = parsed.y;
  }

  public static fromString(vectorString: string): Vector2 {
    const vec = new Vector2();
    vec.fromString(vectorString);
    return vec;
  }
}
