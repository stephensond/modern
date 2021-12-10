import PropTypes from 'prop-types';
import React from 'react';

export default function Header({ onClick }) {
  const loggedIn = false;
  if (loggedIn) {

  }

  return (
    <div className="Header">
      <h1 className="title">Modern Fantasy</h1>
      <ul className="headerList">
        <li className="headerItem">
          <button type="button" className="headerContent">Home</button>
        </li>
        <li className="headerItem">
          <button type="button" className="headerContent">Leagues</button>
        </li>
        <li className="headerItem">
          <button type="button" className="headerContent">Draft</button>
        </li>
        <li className="headerItem">
          <button type="button" className="headerContent">About</button>
        </li>
        <li className="headerItem">
          <button type="button" className="headerContent" onClick={onClick}>
            New Draft
          </button>
        </li>
      </ul>
    </div>
  );
}

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};
