import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { UserContext } from '../../context/useUserContext';
import LinkTo from '../linkto';
import styles from './header.module.css';

export default function Header({ children }) {
  const { setUser } = useContext(UserContext);

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
            onClick={() => setUser('')}
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

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
