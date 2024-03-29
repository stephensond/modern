import PropTypes from 'prop-types';
import React from 'react';
import styles from './header-unauthed.module.css';

export default function HeaderUnauthed({ children }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Welcome to Modern Fantasy!</p>
      <p className={styles['sub-title']}>A flexible platform for your league&#39;s fantasy football draft.</p>
      {children}
    </div>
  );
}

HeaderUnauthed.propTypes = {
  children: PropTypes.node.isRequired,
};
