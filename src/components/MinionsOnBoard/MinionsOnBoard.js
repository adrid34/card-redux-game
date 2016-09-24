import React, { PropTypes } from 'react';
import styles from './MinionsOnBoard.scss';

const MinionsOnBoard = ({ children }) => (
  <div className={styles.MinionsOnBoard}>
    { children }
  </div>
);

MinionsOnBoard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MinionsOnBoard;
