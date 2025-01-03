import { useEffect, useState } from "react"
import { useSocket } from "../hooks/useSocket"
import { Chess } from "chess.js"
import { ChessBoard } from "./ChessBoard"
import "../output.css"
import { Button } from "./Button"

export const CREATE_GAME='CREATE_GAME'
export const UPDATE_GAME='UPDATE_GAME'
export const JOIN_GAME='JOIN_GAME'
export const RESTART_GAME='RESTART_GAME'
export const MOVE="MOVE"
export const Game=()=>{


    const socket=useSocket()
    const chess=new Chess()
    const[board,setBoard]=useState(chess.board())
    useEffect(()=>{
        if(!socket) {
            return;
        }

        socket.onmessage=(event)=>{

            const message=JSON.parse(event.data)
            switch(message.type){
            case "CREATE_GAME":
                setBoard(chess.board())
                console.log(board);
                break
            case "MOVE":
                // const move=message.move
                console.log("Move",message.payload)
                break
            case "GAME_OVER":
                console.log("Game over")
                break
        }
    }
},[socket]);
if(!socket) return <div>{socket?<>connected</>:<>connecting...</>}</div>


    return (
        <div className="flex justify-center" >
            <div className="pt-8 max-w-screen-lg w-full ">
                <div className=" grid grid-cols-6 gap-4 w-full">
                    <div className="col-span-4  w-full flex justify-center">
                        return <ChessBoard chessboard={board} socket={socket} />
                    </div>
                    <div className=" col-span-2  w-full">
                        <div className=" pt-8 flex ">
                        <Button onClick={() => {
                            socket.send(JSON.stringify({ type: "CREATE_GAME" }));
                            console.log("Game started")
                            } } >Start Game</Button>

                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    )
}

