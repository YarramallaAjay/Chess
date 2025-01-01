import { Chess, Color, Move } from "chess.js";
import { Status } from "./Status";
import { WebSocket } from "ws";

export class Game{
    player1: WebSocket;
    player2: WebSocket;
    board: Chess;
    status: Status;
    moveRes=''

    constructor(player1:WebSocket,player2:WebSocket){
        this.board = new Chess();
        this.player1=player1;
        this.player2=player2;
        this.status=Status.CREATED
    }
    makeMove(ws: WebSocket, movedata: string) {
        console.log(`Move received: ${movedata}`);
    
        const currentTurn = this.board.turn(); // 'w' or 'b'
    
        // Validate player's turn
        if (this.player1 === ws && currentTurn !== 'w') {
            this.player1.send(JSON.stringify({
                type: "INVALID_USER_MOVE",
                move: movedata,
            }));
            return;
        }
    
        if (this.player2 === ws && currentTurn !== 'b') {
            this.player2.send(JSON.stringify({
                type: "INVALID_USER_MOVE",
                move: movedata,
            }));
            return;
        }
    
        try {
            const result = this.board.move(movedata); // Make the move
            if (!result) {
                throw new Error("Invalid move");
            }
            this.moveRes = JSON.stringify(result); // Serialize properly
        } catch (error) {
            console.error("Invalid move:", error);
            ws.send(JSON.stringify({ type: "INVALID_MOVE", error: error }));
            return;
        }
        
    
        // Check for game over
        if (this.board.isGameOver()) {
            const winner = currentTurn === 'w' ? 'Black' : 'White'; // Opponent is the winner
            const message = JSON.stringify({
                type: "Game Over",
                message: `Winner: ${winner}`,
            });
            this.player1.send(message);
            this.player2.send(message);
            return;
        }
    
        // Notify both players of the move and the next turn
        const turn = this.board.turn(); // Next turn
        this.player1.send(JSON.stringify({
            type: "MOVE_MADE",
            move: this.moveRes,
            nextTurn: turn,
        }));
        this.player2.send(JSON.stringify({
            type: "MOVE_MADE",
            move: this.moveRes,
            nextTurn: turn,
        }));
        
    
        return this.moveRes;
    }
    


}

