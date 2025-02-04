// NPM Dependencies
import React, { useState, useEffect, useRef } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

export default function User({ setUserName }) {
  const [name, setName] = useState('');
  const [nameInvalid, setNameInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  // Handle form submit
  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    // Exit if the name is empty
    if (!name || name === '') return;

    if (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(name) === false) {
      setNameInvalid(true);
      setLoading(false);
      return false;
    }

    // Exit if the name is empty
    setNameInvalid(false);
    setUserName(name);
    localStorage.setItem('userName', name);

    // Reset the login field
    setName('');
  };

  // Handle Name Change
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={`login-ui ${loading ? 'loading' : ''}`}>
      <form onSubmit={onSubmit} className={`login-form ${nameInvalid ? 'invalid' : 'valid'}`}>
        <input
          ref={inputRef}
          type="text"
          autoFocus={true}
          placeholder={loading ? 'Loading' : 'Your first name'}
          value={name}
          onChange={handleNameChange}
          enterkeyhint="done"
        />
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
            // User Icon
            <UserIcon width="28" height="28" />
          )}
        </button>
      </form>
      {nameInvalid && <span className="invalid">Invalid Name</span>}
    </div>
  );
}
