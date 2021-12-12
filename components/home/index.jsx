import React, { useContext } from 'react';
import { UserContext } from '../../context/useUserContext';
import Header from '../header';
import styles from './home.module.css';

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <Header>
      <div className={styles['welcome-back']}>
        Welcome back,
        {' '}
        {user}
        !
      </div>
    </Header>
  );
}
