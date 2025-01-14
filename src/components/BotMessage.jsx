import React, { useState, useEffect, useRef } from "react";

export default function BotMessage({ fetchMessage }) {
  const [isLoading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const el = useRef(null);
    useEffect(() => {
      el.current.scrollIntoView({ block: "end", behavior: "smooth" });
    });

  useEffect(() => {
    async function loadMessage() {
      const msg = await fetchMessage();
      setLoading(false);
      setMessage(msg);
      el.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
    loadMessage();
  }, [fetchMessage]);

  return (
    <div className="message-container">
      <div className="bot-message" ref={el}>{isLoading ? "..." : message}</div>
    </div>
  );
}
