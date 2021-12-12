import React, { useContext } from 'react';
import HeaderAuthed from '../../common/header-authed';
import { UserContext } from '../../context/useUserContext';
import styles from './home-authed.module.css';

export default function HomeAuthed() {
  const { user } = useContext(UserContext);

  return (
    <HeaderAuthed>
      <div className={styles['welcome-back']}>
        Welcome back,
        {' '}
        {user}
        !
      </div>
    </HeaderAuthed>
  );
}
