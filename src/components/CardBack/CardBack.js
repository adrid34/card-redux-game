import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class CardBack extends Component {
  static propTypes = {
    margin: PropTypes.number.isRequired,
    className: PropTypes.string,
  }

  render() {
    const { margin, className } = this.props;
    const cardStyles = require('./../Card/Card.scss');
    const cardBackStyles = require('./CardBack.scss');
    const marginStyle = `-${margin}px`;
    const classes = classnames(cardStyles.Card, cardBackStyles.CardBackDefault, className);

    return <div className={classes} style={{ margin: `auto ${marginStyle}` }} />;
  }
}
