import React, { PropTypes } from 'react';

const BoardSide = ({ children }) => {
  const styles = require('./BoardSide.scss');

  return (
    <div className={styles.BoardSide}>
      { children }
    </div>
  );
};

BoardSide.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BoardSide;
