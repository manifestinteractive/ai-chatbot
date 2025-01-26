// NPM Dependencies
import copy from 'copy-to-clipboard';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { toast, Slide } from 'react-toastify';

export default function UserMessage({ text }) {
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
      await navigator.clipboard.writeText(text);
      notify();
    } else {
      copy(text);
      notify();
    }
  };

  return (
    <div className="message-container">
      <button type="button" className="copy-button user" onClick={async () => await copyToClipboard()}>
        <DocumentDuplicateIcon width="24" height="24" />
      </button>
      <div className="user-message">
        <ReactMarkdown>{text}</ReactMarkdown>
      </div>
    </div>
  );
}
