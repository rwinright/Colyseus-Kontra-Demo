import { init, GameLoop, initKeys, keyPressed } from 'kontra';
import Entity from './Entity';
import * as Colyseus from 'colyseus.js'

let room;
//create the canvas
let { canvas } = init();

const client = new Colyseus.Client('ws://localhost:2567');


//So... we wrap everything with the game loop in this, I guess?
client.joinOrCreate("my_room").then(room_instance => {
  room = room_instance

  let entities = {}

  //Add entities to the deal
  room.state.entities.onAdd = function (ent, key) {
    const colors = ['blue', 'green', 'red', 'orange', 'black'];
    new Entity({
      x: ent.x,
      y: ent.y,
      name: ent.name,
      color: colors[Math.floor(Math.random() * colors.length)],
      height: 20,
      width: 20
    })

    //Track changes to state
    ent.onChange = (changes) => {
      let chosenEnt = Entity.entities.find(en => en.name === ent.name);
      changes.forEach(change => {
        chosenEnt[change.field] = change.value;
      })
    }
  }

  //Remove entities from the deal
  room.state.entities.onRemove = function (ent, key) {
    Entity.entities = Entity.entities.filter(x => x.name != ent.name)
  }

});

initKeys();

const handleInput = () => {
  let dirX = keyPressed("d") - keyPressed("a");
  let dirY = keyPressed("s") - keyPressed("w");

  if((dirX || dirY) && room) {
    room.send("move", {
      x: dirX,
      y: dirY
    });
  }
}

let loop = GameLoop({  // create the main game loop
  update: function () { // update the game state
    handleInput();
    Entity.entities.forEach(ent => ent.update());
  },
  render: function () { // render the game state
    Entity.entities.forEach(ent => ent.render());
  }
});

loop.start();    // start the game
