// NPM Dependencies
import React, { useState, useEffect, useRef, useCallback } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { MicrophoneIcon as MicrophoneIconOutline } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon, MicrophoneIcon as MicrophoneIconSolid } from '@heroicons/react/24/solid';

export default function Input({ onSubmit, loading }) {
  const [text, setText] = useState('');
  const [hasFocus, setHasFocus] = useState(false);

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

  // Handle Input Change
  const handleInputChange = (e) => {
    // Update text state
    setText(e.target.value);

    // Get Input and Messages elements
    const $input = document.querySelector('div.input');
    const $messages = document.querySelector('div.messages');

    // If input is getting a bit long, make it taller
    if (e.target.scrollHeight > e.target.clientHeight && !$input.classList.contains('tall')) {
      $input.classList.add('tall');
      $messages.classList.add('short');
      updateScroll();
    }

    // If input is getting shorter, make it shorter
    if (e.target.value === '' && $input.classList.contains('tall')) {
      $input.classList.remove('tall');
      $messages.classList.remove('short');
      updateScroll();
    }
  };

  // Listen for Enter Key
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  // Submit Input
  const handleSubmit = useCallback(
    (e) => {
      if (e) {
        e.preventDefault();
      }

      // If text is empty, return
      if (!text || text === '') return;

      // Update State
      onSubmit(text);
      setText('');
      resetTranscript();

      // Update UI
      document.querySelector('div.input').classList.remove('tall');
      document.querySelector('div.messages').classList.remove('short');
    },
    [onSubmit, text, resetTranscript]
  );

  // Listen for Speech
  const startListening = () => {
    setText('');
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false, language: 'en-US' });
  };

  // Stop Listening for Speech
  const stopListening = () => {
    SpeechRecognition.stopListening();
    handleSubmit();
  };

  // Focus on Input when loading is done
  useEffect(() => {
    if (!loading && hasFocus) {
      inputRef.current.focus();
    }
  }, [loading, hasFocus]);

  // Update Text when Speech is detected
  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  // Submit when Speech is complete and something was said
  useEffect(() => {
    if (!listening && transcript) {
      handleSubmit();
    }
  }, [listening, transcript, handleSubmit]);

  return (
    <div className={`input ${loading ? 'loading' : 'ready'} ${browserSupportsSpeechRecognition ? 'mic-supported' : 'mic-unsupported'}`}>
      <form onSubmit={handleSubmit}>
        {/* Microphone Button */}
        {browserSupportsSpeechRecognition && (
          <button type="button" className={`mic-button ${listening ? 'listening' : 'not-listening'}`} disabled={loading}>
            {listening ? (
              <MicrophoneIconSolid width="28" height="28" onClick={() => stopListening()} />
            ) : (
              <MicrophoneIconOutline width="28" height="28" onClick={() => startListening()} />
            )}
          </button>
        )}
        {/* Chat Input */}
        <textarea
          ref={inputRef}
          className={loading ? 'loading' : 'ready'}
          type="text"
          onClick={() => {
            SpeechRecognition.stopListening();
          }}
          onFocus={() => {
            setHasFocus(true);
          }}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={text}
          placeholder={loading ? 'Sending message' : 'Enter your message here'}
          disabled={loading}
        />
        {/* Submit Button */}
        <button type="submit" disabled={loading}>
          {loading ? (
            // Loading Spinner
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
            // Send Icon
            <PaperAirplaneIcon width="28" height="28" />
          )}
        </button>
      </form>
    </div>
  );
}
