import { Schema, type } from "@colyseus/schema";

export class Entity extends Schema {
  @type('number')
  x: number;
  @type('number')
  y: number;
  @type('string')
  name: string;

  constructor(x: number, y: number, name: string) {
    super();
    this.x = x;
    this.y = y;
    this.name = name;
  }
}