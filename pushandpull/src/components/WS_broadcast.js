import { useEffect } from "react";
import io from "socket.io-client";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
const URL = "http://127.0.0.1:3005";
const socket = io(URL);
export default function WS() {
  const handleNewUserMessage = (msg) => {
    socket.emit("clientBroadCast", msg);
  };

  useEffect(() => {
    socket.on("serverBroadCast", (msg) => {
      addResponseMessage(msg);
    });
  }, []);
  return <Widget handleNewUserMessage={handleNewUserMessage} />;
}
