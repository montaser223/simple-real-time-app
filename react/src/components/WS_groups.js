import { React, useState, useEffect } from "react";
import { io } from "socket.io-client";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
const URL = "http://127.0.0.1:3005";
const socket = io(URL);
export default function WS() {
  const [group, setGroup] = useState("");
  useEffect(() => {
    socket.on("messageFromServer", (data) => {
      addResponseMessage(data);
    });
  }, []);

  const handleNewUserMessage = (msg) => {
    socket.emit("messageToGroup", [msg, group]);
  };

  const joinGroup = () => {
    socket.emit("joinGroup", group);
  };

  return (
    <>
      <Widget handleNewUserMessage={handleNewUserMessage} />
      <input
        type="text"
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        onBlur={joinGroup}
      />
      <h1>Your group : {group}</h1>
    </>
  );
}
