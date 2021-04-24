import { useEffect, useState } from "react";

export default function ShortPulling() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [date, setDate] = useState(Date.now());
  const submit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:3000/short", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    }).then((res) => setMessage(""));
  };

  useEffect(() => {
    setDate(Date.now());
  }, []);

  useEffect(() => {
    setInterval(() => {
      fetch("http://127.0.0.1:3000/short/" + date, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setMessages((msg) => [...msg, ...data]));
    }, 5000);
  }, []);

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
