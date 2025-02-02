// NPM Dependencies
import React, { useState, useRef, useEffect } from 'react';
import md5 from 'md5';
import { LockOpenIcon } from '@heroicons/react/24/outline';

// Configuration
import config from '../config';

export default function Login({ setIsVerified }) {
  const [login, setLogin] = useState('');
  const [loginInvalid, setLoginInvalid] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  // Handle Password Check
  const checkPw = (e) => {
    setLoading(true);
    e.preventDefault();

    // Exit if the login is empty
    if (!login || login === '') return;

    // Hash the login
    const hashed = md5(login);

    // Check if the password is correct
    if (hashed === config.appPassword) {
      setLoginInvalid(false);
      setIsVerified(true);
      localStorage.setItem('isVerified', hashed);
    } else {
      setLoginInvalid(true);
      setLoading(false);
    }

    // Reset the login field
    setLogin('');
  };

  // Handle Login Change
  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className={`login-ui ${loading ? 'loading' : ''}`}>
      <form onSubmit={checkPw} className={`login-form ${loginInvalid ? 'invalid' : 'valid'}`}>
        <input
          autoFocus={true}
          ref={inputRef}
          id="password"
          type="password"
          placeholder={loading ? 'Loading' : 'Enter password'}
          value={login}
          onChange={handleLoginChange}
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
            // Lock Icon
            <LockOpenIcon width="28" height="28" />
          )}
        </button>
      </form>
      {loginInvalid && <span className="invalid">Invalid Password</span>}
    </div>
  );
}
