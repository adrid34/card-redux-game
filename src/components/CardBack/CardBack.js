import React, { PropTypes } from 'react';
import classnames from 'classnames';

const CardBack = ({ margin, className }) => {
  const cardStyles = require('./../Card/Card.scss');
  const cardBackStyles = require('./CardBack.scss');
  const marginStyle = `-${margin}px`;
  const classes = classnames(cardStyles.Card, cardBackStyles.CardBackDefault, className);

  return <div className={classes} style={{ margin: `auto ${marginStyle}` }} />;
};

CardBack.propTypes = {
  margin: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default CardBack;
