import React, { PropTypes } from 'react';
import ReactModal from 'react-modal';

import styles from './Modal.scss';

const Modal = ({ children, size = '90%', ...rest }) => (
  <ReactModal
    overlayClassName={styles.ModalOverlay}
    className={styles.Modal}
    style={{
      content: {
        width: size,
      },
    }}
    {...rest}
  >
    { children }
  </ReactModal>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.string,
  maxWidth: PropTypes.string,
};

export default Modal;
