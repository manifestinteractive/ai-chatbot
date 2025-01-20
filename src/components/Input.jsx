import React, { useState, useEffect, useRef } from 'react';

export default function Input({ onSubmit, loading }) {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  const updateScroll = () => {
    const nodes = document.querySelectorAll('.message-container');
    const last = nodes[nodes.length - 1];
    last.scrollIntoView({ block: 'end', behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    const $input = document.querySelector('div.input');
    const $messages = document.querySelector('div.messages');

    if (e.target.scrollHeight > e.target.clientHeight && !$input.classList.contains('tall')) {
      $input.classList.add('tall');
      $messages.classList.add('short');
      updateScroll();
    }

    if (e.target.value === '' && $input.classList.contains('tall')) {
      $input.classList.remove('tall');
      $messages.classList.remove('short');
      updateScroll();
    }
  };

  const handleKeyDown = (e) => {
    var key = e.keyCode;

    if (key === 13) {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || text === '') return;
    onSubmit(text);
  };

  useEffect(() => {
    if (!loading) {
      setText('');
      document.querySelector('div.input').classList.remove('tall');
      document.querySelector('div.messages').classList.remove('short');
      inputRef.current.focus();
    }
  }, [loading]);

  return (
    <div className={loading ? 'input loading' : 'input ready'}>
      <form onSubmit={handleSubmit}>
        <textarea
          ref={inputRef}
          className={loading ? 'loading' : 'ready'}
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={text}
          placeholder="Enter your message here"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100">
              <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
                <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"></animate>
              </circle>
              <circle fill="#fff" stroke="none" cx="26" cy="50" r="6">
                <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"></animate>
              </circle>
              <circle fill="#fff" stroke="none" cx="46" cy="50" r="6">
                <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"></animate>
              </circle>
            </svg>
          ) : (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 500 500">
              <g>
                <g>
                  <polygon fill="currentColor" points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
                </g>
              </g>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
