// NPM Dependencies
import React, { useEffect, useRef } from 'react';

// React Components
import BotMessage from './BotMessage';
import UserMessage from './UserMessage';

export default function Messages({ messages }) {
  const el = useRef(null);

  // Scroll to bottom of messages on load
  useEffect(() => {
    setTimeout(() => {
      el.current.scrollIntoView();
    }, 1);
  });

  // Scroll to bottom of messages after update
  useEffect(() => {
    setTimeout(() => {
      el.current.scrollIntoView();
    }, 1);
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((message, index) => {
        if (message.role === 'assistant') {
          return <BotMessage key={index} text={message.content} sources={message.sources} />;
        } else if (message.role === 'user') {
          return <UserMessage key={index} text={message.content} />;
        }
        return null;
      })}
      <div id={'el'} ref={el} />
    </div>
  );
}
