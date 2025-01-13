import React, { useState } from "react";

export default function Input({ onSend }) {
  const [text, setText] = useState("");

  const updateScroll = () => {
    const nodes = document.querySelectorAll('.message-container');
    const last = nodes[nodes.length - 1];
    last.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  const handleInputChange = e => {
    setText(e.target.value);
    const $input = document.querySelector('div.input');
    const $messages = document.querySelector('div.messages');

    if (e.target.scrollHeight > e.target.clientHeight && !$input.classList.contains('tall')) {
      $input.classList.add('tall');
      $messages.classList.add('short');
    }

    if (e.target.value === '' && $input.classList.contains('tall')) {
      $input.classList.remove('tall');
      $messages.classList.remove('short');
    }

    updateScroll();
  };

  const handleKeyDown = e => {
    var key = e.keyCode;

    if (key === 13) {
      handleSend(e);
    }
  };

  const handleSend = e => {
    e.preventDefault();
    if (!text || text === "") return;
    
    onSend(text);
    setText("");
    document.querySelector('div.input').classList.remove('tall');
    document.querySelector('div.messages').classList.remove('short');
  };

  return (
    <div className="input">
      <form onSubmit={handleSend}>
        <textarea
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={text}
          placeholder="Enter your message here"
        />
        <button>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 500 500"
          >
            <g>
              <g>
                <polygon fill="currentColor" points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
              </g>
            </g>
          </svg>
        </button>
      </form>
    </div>
  );
}
