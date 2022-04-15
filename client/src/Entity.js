import { Sprite } from "kontra";

class Entity {
  static entities = [];
  constructor(props) {
    Entity.entities.push(Sprite(props))
  }
}

export default Entity;