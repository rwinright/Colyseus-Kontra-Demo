import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {

  onCreate(options: any) {

    this.setState(new MyRoomState());

    this.onMessage("move", (client, data) => {
      this.state.moveEntity(client.sessionId, data);
    });



  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.state.createEntity(client.sessionId)
  }

  onLeave(client: Client, consented: boolean) {
    this.state.removeEntitity(client.sessionId)
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
