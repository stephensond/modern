import React from 'react';
import HeaderUnauthed from '../../common/header-unauthed';
import LinkTo from '../../common/linkto';
import styles from './home-unauthed.module.css';

export default function HomeUnauthed() {
  return (
    <HeaderUnauthed>
      <div className={styles.buttons}>
        <LinkTo href="/login" className={styles.link}>
          Log in
        </LinkTo>
        <LinkTo href="/newuser" className={styles.link}>
          Sign up
        </LinkTo>
      </div>
    </HeaderUnauthed>
  );
}
