// NPM Dependencies
import copy from 'copy-to-clipboard';
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import { toast, Slide } from 'react-toastify';

// Utilities
import autoLink from '../utils/autoLink';
import autoSourceLinks from '../utils/autoSourceLinks';

export default function BotMessage({ text, sources }) {
  const [message, setMessage] = useState('');
  const [sourceLinks, setSourceLinks] = useState('');

  useEffect(() => {
    if (text) {
      setMessage(autoLink(text));
    }
    if (sources) {
      setSourceLinks(autoSourceLinks(sources));
    }
  }, [text, sources]);

  // Custom Link Renderer to open links in new tab
  function LinkRenderer(props) {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    );
  }

  // Custom Summary Renderer to scroll to Source Links
  function SummaryRenderer(props) {
    return (
      <summary
        onClick={() => {
          // Scroll to Source Links after it has had time to expand/collapse
          setTimeout(() => {
            const $elm = document.getElementById(props['data-trigger']);
            if (typeof $elm.scrollIntoViewIfNeeded === 'function') {
              $elm.scrollIntoViewIfNeeded();
            } else {
              $elm.scrollIntoView();
            }
          }, 100);
        }}
      >
        {props.children}
      </summary>
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
        <ReactMarkdown rehypePlugins={[rehypeRaw]} components={{ a: LinkRenderer, summary: SummaryRenderer }}>{`${message}${sourceLinks}`}</ReactMarkdown>
      </div>
    </div>
  );
}
