import Link from 'next/link';
import React, { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const userLogout = () => {
    setUsername('');
    setPass('');
  };

  const userLogin = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, pass }),
    };
    console.log(process.env.NEXT_PUBLIC_API);
    fetch(`${process.env.NEXT_PUBLIC_API}/login`, requestOptions)
      .then((res) => {
        if (res.status === 200) {
          alert('Welcome back!');
          return res.json();
        }
        alert('Incorrect username/password');
        return null;
      })
      .then(() => {
        // setUser(j.username);
      })
      .catch((error) => console.log(error));
  };

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updatePass = (event) => {
    setPass(event.target.value);
  };

  if (true) {
    return (
      <div className="Login">
        <h1>Log in!</h1>
        <label htmlFor="username">
          Username:
          <input type="text" onChange={updateUsername} id="username" />
        </label>
        <label htmlFor="password">
          Password:
          <input type="text" onChange={updatePass} id="password" />
        </label>
        <Link href="/draft">
          <button
            onClick={userLogin}
            className="login"
            type="button"
          >
            Submit
          </button>
        </Link>
        <div>
          <Link href="/">
            <h3>Go Back</h3>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="Login">
      <h1>Log in!</h1>
      Logged in as
      <button
        className="logout"
        onClick={userLogout}
        type="button"
      >
        Logout
      </button>
    </div>
  );
}
