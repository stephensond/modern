import { useRouter } from 'next/router';
import React, { useCallback, useContext, useState } from 'react';
import httpRequest from '../../api';
import HeaderUnauthed from '../../common/header-unauthed';
import LinkTo from '../../common/linkto';
import { UserContext } from '../../context/useUserContext';
import styles from './login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
  const { setUser } = useContext(UserContext);

  const userLogin = useCallback(async (e) => {
    e.preventDefault();

    if (!username || !pass) {
      setError('Please enter your username and password.');
      return;
    }

    const { ok, status, responseBody } = await httpRequest({
      method: 'POST',
      requestBody: JSON.stringify({ username, pass }),
      endpoint: '/login',
    });

    if (!status) {
      setError('Sorry, we are unable to log you in at this time.');
      return;
    }

    if (!ok) {
      setError('Invalid username or password');
      return;
    }

    const { username: responseUsername } = responseBody;

    if (!responseUsername) {
      setError('Sorry, we are unable to log you in at this time.');
      return;
    }

    setUser(responseUsername);
    router.push('/');
  }, [username, pass, router, setUser]);

  const updateUsername = (event) => {
    setError('');
    setUsername(event.target.value);
  };

  const updatePass = (event) => {
    setError('');
    setPass(event.target.value);
  };

  return (
    <HeaderUnauthed>
      <form onSubmit={userLogin} className={styles.container}>
        <p className={styles.login}>Log in</p>
        {error && (<p className={styles.error}>{error}</p>)}
        <label htmlFor="username" className={styles['input-box']}>
          Username
          <input
            type="text"
            onChange={updateUsername}
            id="username"
            className={styles.input}
            placeholder="Enter username"
          />
        </label>
        <label htmlFor="password" className={styles['input-box']}>
          Password
          <input
            type="password"
            onChange={updatePass}
            id="password"
            className={styles.input}
            placeholder="Enter password"
          />
        </label>
        <button
          className={styles.submit}
          type="submit"
        >
          Submit
        </button>
        <LinkTo href="/" className={styles['go-back']}>
          Go Back
        </LinkTo>
      </form>
    </HeaderUnauthed>
  );
}
