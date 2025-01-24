import React, { useEffect, useRef } from 'react';

import BotMessage from './BotMessage';
import UserMessage from './UserMessage';

export default function Messages({ messages }) {
  const el = useRef(null);

  useEffect(() => {
    el.current.scrollTo(0, el.current.scrollHeight);
  });

  return (
    <div className="messages" ref={el}>
      {messages.map((message, index) => {
        if (message.role === 'assistant') {
          return <BotMessage key={index} text={message.content} />;
        } else if (message.role === 'user') {
          return <UserMessage key={index} text={message.content} />;
        }
        return null;
      })}
    </div>
  );
}
