import React, { PropTypes } from 'react';

const MinionsOnBoard = ({ children }) => {
  const styles = require('./MinionsOnBoard.scss');

  return (
    <div className={styles.MinionsOnBoard}>
      { children }
    </div>
  );
};

MinionsOnBoard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MinionsOnBoard;
