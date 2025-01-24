import React, { useState, useEffect, useRef, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { PaperAirplaneIcon, MicrophoneIcon as MicrophoneIconSolid } from '@heroicons/react/24/solid';
import { MicrophoneIcon as MicrophoneIconOutline } from '@heroicons/react/24/outline';

export default function Input({ onSubmit, loading }) {
  const [text, setText] = useState('');

  const inputRef = useRef(null);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  // Update scroll position
  const updateScroll = () => {
    // Get Messages container
    const messages = document.querySelector('.messages');

    // Scroll messages to bottom
    messages.scrollTo(0, messages.scrollHeight);

    // Scroll to bottom of page ( for mobile devices that might have keyboard open )
    window.scrollTo(0, document.body.scrollHeight);
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

  const handleSubmit = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
      }

      if (!text || text === '') return;
      onSubmit(text);
      setText('');
      resetTranscript();
      document.querySelector('div.input').classList.remove('tall');
      document.querySelector('div.messages').classList.remove('short');
    },
    [onSubmit, text, resetTranscript]
  );

  const startListening = () => {
    setText('');
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    handleSubmit();
  };

  useEffect(() => {
    if (!loading) {
      inputRef.current.focus();
    }
  }, [loading]);

  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  useEffect(() => {
    if (!listening && transcript) {
      handleSubmit();
    }
  }, [listening, transcript, handleSubmit]);

  return (
    <div className={`input ${loading ? 'loading' : 'ready'} ${browserSupportsSpeechRecognition ? 'mic-supported' : 'mic-unsupported'}`}>
      <form onSubmit={handleSubmit}>
        {browserSupportsSpeechRecognition && (
          <button type="button" className={`mic-button ${listening ? 'listening' : 'not-listening'}`} disabled={loading}>
            {listening ? (
              <MicrophoneIconSolid width="28" height="28" onClick={() => stopListening()} />
            ) : (
              <MicrophoneIconOutline width="28" height="28" onClick={() => startListening()} />
            )}
          </button>
        )}
        <textarea
          autoFocus
          ref={inputRef}
          className={loading ? 'loading' : 'ready'}
          type="text"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={text}
          placeholder={loading ? 'Sending message' : 'Enter your message here'}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="38" height="48" viewBox="0 0 100 100">
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
            <PaperAirplaneIcon width="28" height="28" />
          )}
        </button>
      </form>
    </div>
  );
}
