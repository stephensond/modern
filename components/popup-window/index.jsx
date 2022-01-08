import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import popupStyles from './popup-window.module.css';

export default function PopupWindow(props) {
  const [show, setShow] = useState(false);

  const closeHandler = () => {
    setShow(false);
    this.props.onClose(false);
  };

  useEffect(() => {
    setShow(this.props.show);
  }, [this.props.show]);

  return (
    <div
      style={{
        visibility: show ? 'visible' : 'hidden',
        opacity: show ? '1' : '0',
      }}
      className={popupStyles.overlay}
    >
      <div className={popupStyles.popup}>
        <h2>{this.props.title}</h2>
        <span className={popupStyles.close} onClick={closeHandler}>
          &times;
        </span>
        <div className={popupStyles.content}>{this.props.children}</div>
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
