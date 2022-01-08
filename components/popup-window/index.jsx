import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import popupStyles from './popup-window.module.css';

export default function PopupWindow({
  title, show, onClose, children,
}) {
  const [visible, setVisible] = useState(false);

  const closeHandler = () => {
    setVisible(false);
    onClose(false);
  };

  useEffect(() => {
    setVisible(show);
  }, [show]);

  return (
    <div
      style={{
        visibility: visible ? 'visible' : 'hidden',
        opacity: visible ? '1' : '0',
      }}
      className={popupStyles.overlay}
    >
      <div className={popupStyles.popup}>
        <h2>{title}</h2>
        <span role="button" className={popupStyles.close} onClick={closeHandler} onKeyDown={closeHandler}>
          &times;
        </span>
        <div className={popupStyles.content}>{children}</div>
      </div>
    </div>
  );
}

PopupWindow.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
