// NPM Dependencies
import React, { useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

export default function User({ setUserName }) {
  const [name, setName] = useState('');
  const [nameInvalid, setNameInvalid] = useState(false);

  // Handle form submit
  const onSubmit = (e) => {
    e.preventDefault();

    // Exit if the name is empty
    if (!name || name === '') return;

    if (/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(name) === false) {
      setNameInvalid(true);
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

  return (
    <div className="login-ui">
      <form onSubmit={onSubmit} className={`login-form ${nameInvalid ? 'invalid' : 'valid'}`}>
        <input type="text" placeholder="Your first name" value={name} onChange={handleNameChange} />
        <button type="submit">
          <UserIcon width="24" height="24" />
        </button>
      </form>
      {nameInvalid && <span className="invalid">Invalid Name</span>}
    </div>
  );
}
