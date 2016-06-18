import React, { PropTypes } from 'react';

const PlayerSide = ({ children }) => {
  const styles = require('./PlayerSide.scss');

  return (
    <div className={styles.PlayerSide}>
      { children }
    </div>
  );
};

PlayerSide.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PlayerSide;
