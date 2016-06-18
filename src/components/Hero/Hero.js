import React, { PropTypes } from 'react';

const styles = {
  width: '150px',
  height: '75px',
  backgroundColor: 'red',
  borderRadius: '5px',
};

const Hero = ({ health }) => (
  <div style={styles}>
    { health }
  </div>
);

Hero.propTypes = {
  health: PropTypes.number.isRequired,
};

export default Hero;
