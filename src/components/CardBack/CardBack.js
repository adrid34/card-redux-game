import React, { Component, PropTypes } from 'react';

export default class CardBack extends Component {
  static propTypes = {
    margin: PropTypes.number.isRequired,
    className: PropTypes.string,
  }

  render() {
    const { margin, className } = this.props;
    const cardStyles = require('./../Card/Card.scss');
    const marginStyle = `-${margin}px`;
    const rootClass = `${cardStyles.Card} ${className || ''}`;

    return <div className={rootClass} style={{ margin: `auto ${marginStyle}` }} />;
  }
}
