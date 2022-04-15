import { Schema, type, MapSchema } from "@colyseus/schema";
import { Entity } from "./EntityState";

interface IMovement{
  x: number;
  y: number;
}

export class MyRoomState extends Schema {
  @type({map: Entity})
  entities = new MapSchema();

  createEntity(sessionId: string) {
    let spawnArea = (this.entities.size * 10) + 10
    this.entities.set(sessionId, new Entity(spawnArea, spawnArea, sessionId));
  }

  removeEntitity(sessionId: string) {
    this.entities.delete(sessionId);
  }

  moveEntity(sessionId: string, movement: IMovement) {
    const chosenEnt = this.entities.get(sessionId);
    chosenEnt.x += movement.x * 10;
    chosenEnt.y += movement.y * 10;
  }

}
