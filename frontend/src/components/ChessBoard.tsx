import { Color, PieceSymbol, Square } from "chess.js";
import "../output.css";
import {  useState } from "react";

interface ChessboardProps {
    chessboard: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
}

export const ChessBoard = ({ chessboard, socket }: ChessboardProps) => {
    const [from, setFrom] = useState<Square | null>(null);
    const [to, setTo] = useState<Square | null>(null);

    // useEffect(() => {
    //     if (from && to) {
    //         // Send the move to the server only when both `from` and `to` are set
    //         socket.send(JSON.stringify({ type: "MOVE", move: { from, to } }));
    //         console.log(`Move sent: from ${from} to ${to}`);
    //         setFrom(null);
    //         setTo(null);
    //     }
    // }, [to, socket]);

    return (
        <div>
            <div className="text-white-200">
                {chessboard.map((row, i) => (
                    <div key={i} className="flex">
                        {row.map((square, j) => (
                            <div
                                key={j}
                                className={`w-8 h-8 ${
                                    (i + j) % 2 === 0
                                        ? "bg-green-500"
                                        : "bg-green-300"
                                } flex justify-center items-center`}
                                onClick={() => {
                                    // console.log("clicked", i, j);
                                    if (!from) {
                                        setFrom(square?.square ?? null);
                                    } else {
                                        console.log("from", from);
                                        console.log("to",to)
                                        const temp=String.fromCharCode(97 + i) +""+ i
                                        console.log(temp)
                                        setTo((temp) as Square);
                                        socket.send(JSON.stringify({ type: "MOVE", move: { from, to } }));
                                        console.log(`Move sent: from ${from} to ${to}`);
                                        setFrom(null);
                                    }
                                }}
                            >
                                {square?.square ? square.square : ""}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
