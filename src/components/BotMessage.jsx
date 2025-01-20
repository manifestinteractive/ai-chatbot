import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

import autoLink from '../utils/autoLink';

export default function BotMessage({ text }) {
  const [message, setMessage] = useState('');

  const el = useRef(null);
  useEffect(() => {
    el.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
  });

  useEffect(() => {
    if (text) {
      setMessage(autoLink(text));
      el.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  }, [text]);

  function LinkRenderer(props) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  }

  return (
    <div className="message-container">
      <div className="bot-message" ref={el}>
        <ReactMarkdown components={{ a: LinkRenderer }}>{message}</ReactMarkdown>
      </div>
    </div>
  );
}
