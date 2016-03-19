import React, { Component, PropTypes } from 'react';
import { CardModel } from 'redux/modules/card';

export default class Card extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    card: PropTypes.instanceOf(CardModel).isRequired,
  }

  render() {
    const { name, mana, attack, defense } = this.props.card;
    const styles = require('./Card.scss');

    return (
      <div className={styles.Card}>
        <div className={styles.CardMana}>{ mana || 0 }</div>
        <h1 className={styles.CardName}>{ name }</h1>
        { attack ? <div className={styles.CardAttack}>{ attack }</div> : null }
        { defense ? <div className={styles.CardDefense}>{ defense }</div> : null }
      </div>
    );
  }
}
