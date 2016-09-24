import React, { PropTypes } from 'react';
import classnames from 'classnames';

import cardStyles from './../Card/Card.scss';
import cardBackStyles from './CardBack.scss';

const CardBack = ({ margin, className }) => {
  const marginStyle = `-${margin}px`;
  const classes = classnames(cardStyles.Card, cardBackStyles.CardBackDefault, className);

  return <div className={classes} style={{ margin: `auto ${marginStyle}` }} />;
};

CardBack.propTypes = {
  margin: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default CardBack;
