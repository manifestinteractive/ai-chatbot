// NPM Dependencies
import React, { useState } from 'react';
import md5 from 'md5';
import { LockOpenIcon } from '@heroicons/react/24/outline';

// Configuration
import config from '../config';

export default function Login({ setIsVerified }) {
  const [login, setLogin] = useState('');
  const [loginInvalid, setLoginInvalid] = useState(false);

  // Handle Password Check
  const checkPw = (e) => {
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
    }

    // Reset the login field
    setLogin('');
  };

  // Handle Login Change
  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  return (
    <div className="login-ui">
      <form onSubmit={checkPw} className={`login-form ${loginInvalid ? 'invalid' : 'valid'}`}>
        <input id="password" type="password" placeholder="Enter password" value={login} onChange={handleLoginChange} />
        <button type="submit">
          <LockOpenIcon width="24" height="24" />
        </button>
      </form>
      {loginInvalid && <span className="invalid">Invalid Password</span>}
    </div>
  );
}
