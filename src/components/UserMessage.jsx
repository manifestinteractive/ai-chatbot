import React from "react";
import ReactMarkdown from 'react-markdown';

export default function UserMessage({ text }) {
  return (
    <div className="message-container">
      <div className="user-message">
        <ReactMarkdown>
          {text}
        </ReactMarkdown>
      </div>
    </div>
  );
}
