import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { UserContext } from '../../context/useUserContext';
import LinkTo from '../linkto';
import styles from './header-authed.module.css';

export default function HeaderAuthed({ children }) {
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  const signout = () => {
    setUser('');
    router.push('/');
  };

  if (!user) {
    return (
      <div className={styles['error-box']}>
        <p className={styles.error}>To view this page, you need to be signed in!</p>
        <div className={styles.buttons}>
          <LinkTo href="/login" className={styles.link}>
            Log in
          </LinkTo>
          <LinkTo href="/newuser" className={styles.link}>
            Sign up
          </LinkTo>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.header}>
      <div className={styles['header-list']}>
        <LinkTo
          href="/"
          className={styles['modern-fantasy']}
        >
          Modern Fantasy
        </LinkTo>
        <div className={styles['header-items']}>
          <LinkTo href="/create-league" className={styles['header-content']}>
            Create League
          </LinkTo>
          <LinkTo href="/draft" className={styles['header-content']}>
            Draft
          </LinkTo>
          <button
            type="button"
            className={`${styles['header-content']} ${styles.signout}`}
            onClick={signout}
          >
            Sign out
          </button>
        </div>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

HeaderAuthed.propTypes = {
  children: PropTypes.node.isRequired,
};
