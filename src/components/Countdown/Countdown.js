import React, { PropTypes } from 'react';
import { Portal } from 'react-portal';

import styles from './Countdown.scss';

const Countdown = ({ children }) => (
  <Portal>
    <div className={styles.Countdown}>
      <div className={styles.CountdownText}>{children}</div>
    </div>
  </Portal>
);

Countdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Countdown;
