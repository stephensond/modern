import React, { useContext } from 'react';
import Home from '../components/home';
import LinkTo from '../components/linkto';
import Welcome from '../components/welcome';
import { UserContext } from '../context/useUserContext';
import styles from './index.module.css';

export default function Index() {
  const { user, loadingUser } = useContext(UserContext);

  if (loadingUser) {
    return null;
  }

  if (user) {
    return <Home />;
  }

  return (
    <Welcome>
      <div className={styles.buttons}>
        <LinkTo href="/login" className={styles.link}>
          Log in
        </LinkTo>
        <LinkTo href="/newuser" className={styles.link}>
          Sign up
        </LinkTo>
      </div>
    </Welcome>
  );
}
