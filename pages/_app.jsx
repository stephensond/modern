import PropTypes from 'prop-types';
import React from 'react';
import useUserContext, { UserContext } from '../context/useUserContext';
import './app.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserContext.Provider value={useUserContext()}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
