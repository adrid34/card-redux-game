import React, { PropTypes } from 'react';

import styles from './PlayerSide.scss';

const PlayerSide = ({ children }) => (
  <div className={styles.PlayerSide}>
    { children }
  </div>
);

PlayerSide.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlayerSide;
