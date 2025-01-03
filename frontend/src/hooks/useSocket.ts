import { useEffect, useState } from "react";

export const useSocket = () => {
  const WS_URL = "ws://localhost:8080/";
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    const handleOpen = () => {
      console.log("WebSocket connected");
      setSocket(ws);
    };

    const handleClose = () => {
      console.log("WebSocket disconnected");
      setSocket(null);
    };

    const handleError = (event: Event) => {
      console.error("WebSocket error:", event);
    };

    const handleMessage = (event: MessageEvent) => {
      console.log("Message received:", event.data);
    };

    ws.addEventListener("open", handleOpen);
    ws.addEventListener("close", handleClose);
    ws.addEventListener("error", handleError);
    ws.addEventListener("message", handleMessage);

    return () => {
      ws.removeEventListener("open", handleOpen);
      ws.removeEventListener("close", handleClose);
      ws.removeEventListener("error", handleError);
      ws.removeEventListener("message", handleMessage);
      ws.close();
    };
  }, []);

  return socket;
};
