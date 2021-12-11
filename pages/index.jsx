import React, { useContext } from 'react';
import Draft from '../components/draft';
import LinkTo from '../components/linkto';
import Welcome from '../components/welcome';
import { UserContext } from '../context/useUserContext';
import styles from './index.module.css';

export default function Home() {
  const { user } = useContext(UserContext);

  if (user) {
    return <Draft />;
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
