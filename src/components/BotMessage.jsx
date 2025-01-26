// NPM Dependencies
import copy from 'copy-to-clipboard';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { toast, Slide } from 'react-toastify';

// Utilities
import autoLink from '../utils/autoLink';

export default function BotMessage({ text }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (text) {
      setMessage(autoLink(text));
    }
  }, [text]);

  // Custom Link Renderer to open links in new tab
  function LinkRenderer(props) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    );
  }

  // Copy to Clipboard Notification
  const notify = () =>
    toast.success('Copied to Clipboard!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: 'light',
      transition: Slide
    });

  // Copy to Clipboard Function
  const copyToClipboard = async () => {
    if ('clipboard' in navigator) {
      await navigator.clipboard.writeText(message);
      notify();
    } else {
      copy(message);
      notify();
    }
  };

  return (
    <div className="message-container">
      <button type="button" className="copy-button bot" onClick={async () => await copyToClipboard()}>
        <DocumentDuplicateIcon width="24" height="24" />
      </button>

      <div className="bot-message">
        <ReactMarkdown components={{ a: LinkRenderer }}>{message}</ReactMarkdown>
      </div>
    </div>
  );
}
