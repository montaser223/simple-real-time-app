import { useEffect, useState } from "react";

export default function LongPulling() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const submit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:3000/long", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }).then((res) => setMessage(""));
  };

  useEffect(() => {
    fetch("http://127.0.0.1:3000/long", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMessages(messages.concat(data)));
  }, [messages]);

  return (
    <div>
      <form onSubmit={submit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>

      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m.message}</li>
        ))}
      </ul>
    </div>
  );
}
