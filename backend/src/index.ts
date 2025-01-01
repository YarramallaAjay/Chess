import WebSocket, { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
import { CREATE_GAME,JOIN_GAME, UPDATE_GAME } from "./constants";

const gm=new GameManager()
const wss =new WebSocketServer({port:8080})

try{
    wss.on("connection", function connection(ws:WebSocket) {
        ws.send("You are connected!");
        gm.addUser(ws)
        ws.on("disconnected",(data)=>{
         ws.send(`disconnected ${data}`)
        })
     });
     console.log("connected")


}
catch(e){
    console.error(e)

}
       





