import React from 'react';
import LinkTo from '../components/linkto';
import Welcome from '../components/welcome';
import styles from './index.module.css';

export default function Home() {
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
