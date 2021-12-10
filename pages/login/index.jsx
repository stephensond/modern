import Link from 'next/link';
import React, { useState } from 'react';
import Welcome from '../../components/welcome';

export default function Login() {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');

  const userLogin = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, pass }),
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/login`, requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        setUsername(data.username);
        return data;
      }

      return 'hello';
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateUsername = (event) => {
    setUsername(event.target.value);
  };

  const updatePass = (event) => {
    setPass(event.target.value);
  };

  return (
    <Welcome>
      <div className="Login">
        <h1>Log in!</h1>
        <label htmlFor="username">
          Username
          <input type="text" onChange={updateUsername} id="username" />
        </label>
        <label htmlFor="password">
          Password
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

    </Welcome>
  );
}
