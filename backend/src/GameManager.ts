import { Chess, Move, Square } from "chess.js";
import { Game } from "./Game";
import { Status } from "./Status";
import { CREATE_GAME, JOIN_GAME, MOVE, RESTART_GAME } from "./constants";
import WebSocket from "ws";

export class GameManager {


  games:Game[]
  pendinguser:WebSocket|null
  users:WebSocket[]

  constructor(){
    this.games=[]
    this.pendinguser=null
    this.users=[]

  }

  /**
   * Starts a game by adding a second player to an available game.
   */

  addUser(ws:WebSocket){
    this.users.push(ws)
    this.addHandler(ws)

  }

  

  /**
   * Creates a new game and adds the first player to it.
   */
  

  removeUser(socket: WebSocket): string {
    this.users = this.users.filter(user => user !== socket);
    return "removed";
}

  

  /**
   * Restarts a game (to be implemented).
   */
  restartGame(socket: WebSocket): Game {
    throw new Error("Method not implemented.");
  }
  addHandler(socket: WebSocket) {
    console.log("Client connected");
    socket.on("message", (message: string) => {
        try {
            const parsedMessage = JSON.parse(message);

            if (parsedMessage.type === CREATE_GAME) {
              if (!this.pendinguser) {
                this.pendinguser = socket;
                socket.send(JSON.stringify({ type: "WAITING", message: "Waiting for opponent..." }));
            } else {
                const game = new Game(this.pendinguser, socket);
                this.games.push(game);
                this.pendinguser = null;
                socket.send(JSON.stringify({ type: "GAME_STARTED", message: "Game started!" }));
                game.player1.send(JSON.stringify({ type: "GAME_STARTED", color: "w" }));
                game.player2.send(JSON.stringify({ type: "GAME_STARTED", color: "b" }));
            }
            
            }

            if (parsedMessage.type === MOVE) {
                const currGame = this.games.find(
                    game => game.player1 === socket || game.player2 === socket
                );

                if (currGame) {
                  const move:string=parsedMessage.move
                  console.log(move)
                    currGame.makeMove(socket, move);
                } else {
                    socket.send(JSON.stringify({ type: "ERROR", message: "Game not found" }));
                }
            }
        } catch (error) {
            console.error("Error handling message:", error);
            socket.send(JSON.stringify({ type: "ERROR", message: error }));
        }
    });
}


}
