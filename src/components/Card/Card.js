import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { CardModel } from 'redux/modules/card';

export default class Card extends Component {
  static propTypes = {
    index: PropTypes.number,
    card: PropTypes.instanceOf(CardModel).isRequired,
    cardsLength: PropTypes.number,
  }

  render() {
    const { index, cardsLength } = this.props;
    const { name, mana, attack, defense, portrait } = this.props.card;
    const styles = require('./Card.scss');
    const cardClass = classNames(styles.Card, styles.CardYours, {
      [styles[`CardTotal-${cardsLength}`]]: cardsLength,
      [styles[`CardNumber-${index + 1}-of-${cardsLength}`]]: (typeof index !== undefined),
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
