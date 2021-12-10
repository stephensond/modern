import PropTypes from 'prop-types';
import React from 'react';
import styles from './welcome.module.css';

export default function Welcome({ children }) {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Welcome to Modern Fantasy!</p>
      <p className={styles['sub-title']}>A flexible platform for your league&#39;s fantasy football draft.</p>
      {children}
    </div>
  );
}

Welcome.propTypes = {
  children: PropTypes.node.isRequired,
};
