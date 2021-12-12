import React, { useContext } from 'react';
import HomeAuthed from '../components/home-authed';
import HomeUnauthed from '../components/home-unauthed';
import { UserContext } from '../context/useUserContext';

export default function Index() {
  const { user, loadingUser } = useContext(UserContext);

  if (loadingUser) {
    return null;
  }

  return user ? <HomeAuthed /> : <HomeUnauthed />;
}
