import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
const URL = "http://127.0.0.1:3005";
const socket = io(URL);
export default function WS() {
  const [ids, setIds] = useState([]);
  const [reciver_id, setId] = useState("");
  const handleNewUserMessage = (msg) => {
    socket.emit("msgToSpecific", { reciver_id, msg });
  };

  useEffect(() => {
    socket.on("onconnected", (list) =>
      setIds(list.filter((id) => id !== socket.id))
    );
    socket.on("updateYourList", (list) =>
      setIds(list.filter((id) => id !== socket.id))
    );
    socket.on("msgfromSpecific", (msg) => {
      addResponseMessage(msg);
    });
  }, []);
  return (
    <>
      <ul>
        {ids.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
      <input value={reciver_id} onChange={(e) => setId(e.target.value)} />
      <Widget handleNewUserMessage={handleNewUserMessage} />
    </>
  );
}
