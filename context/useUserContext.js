import React, { useEffect, useState } from 'react';

const UserContext = React.createContext();

const useUserContext = () => {
  const [userContext, setUserContext] = useState('');

  const getUserFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('user');
    }

    return null;
  };

  const addUserToLocalStorage = (newUser) => {
    setUserContext(newUser);

    if (typeof window !== 'undefined') {
      window.localStorage.setItem('user', newUser);
    }
  };

  useEffect(() => {
    const localUser = getUserFromLocalStorage();

    if (localUser) {
      setUserContext(localUser);
    }
  }, []);

  return { user: userContext, setUser: addUserToLocalStorage };
};

export { UserContext };
export default useUserContext;
