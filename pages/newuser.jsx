import Link from 'next/link';
import React, { useState } from 'react';

export default function NewUser() {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const addUser = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, pass }),
    };
    fetch(`${process.env.REACT_APP_API}/addUser`, requestOptions)
      .then((res) => res.status)
      .then((status) => {
        if (status === 200) {
          alert('Account created');
        } else if (status === 400) {
          alert('Username taken');
        }
      })
      .catch((error) => console.log(error));
  };

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updatePass = (event) => {
    setPass(event.target.value);
  };

  return (
    <div className="SignUp">
      <h1>Sign Up!</h1>
      <label htmlFor="username">
        Username:
        <input type="text" onChange={updateUsername} id="username" />
      </label>
      <label htmlFor="username">
        Password:
        <input type="text" onChange={updatePass} id="username" />
      </label>
      <button
        onClick={addUser}
        className="createUser"
        type="button"
      >
        Submit
      </button>
      <div>
        <Link href="/">
          <h3>Go Back</h3>
        </Link>
      </div>
    </div>
  );
}
