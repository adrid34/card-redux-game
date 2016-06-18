import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { CardModel } from 'redux/modules/card';

export default class Card extends Component {
  static propTypes = {
    card: PropTypes.instanceOf(CardModel).isRequired,
    isDragging: PropTypes.bool,
    className: PropTypes.string,
  }

  render() {
    const { className, isDragging } = this.props;
    const { name, mana, attack, defense, portrait } = this.props.card;
    const styles = require('./Card.scss');
    const cardClass = classNames(styles.Card, {
      [styles.CardIsDragging]: isDragging,
      [className]: className,
    });

    return (
      <div className={cardClass}>
        <div
          className={styles.CardPortrait}
          style={{ backgroundImage: `url(${portrait})` }}
        />
        <div className={styles.CardMana}>{ mana || 0 }</div>
        <h1 className={styles.CardName}>{ name }</h1>
        { attack ? <div className={styles.CardAttack}>{ attack }</div> : null }
        { defense ? <div className={styles.CardDefense}>{ defense }</div> : null }
      </div>
    );
  }
}
