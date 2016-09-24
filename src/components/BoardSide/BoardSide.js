import React, { PropTypes } from 'react';
import styles from './BoardSide.scss';

const BoardSide = ({ children }) => (
  <div className={styles.BoardSide}>
    { children }
  </div>
);

BoardSide.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BoardSide;
