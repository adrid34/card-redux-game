import React, { Component, PropTypes } from 'react';
import { CardModel } from 'redux/modules/card';

export default class Card extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    card: PropTypes.instanceOf(CardModel).isRequired,
    margin: PropTypes.number.isRequired,
    onCardClick: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.playCard = this.playCard.bind(this);
  }

  playCard() {
    this.props.onCardClick(this.props.index);
  }

  render() {
    const { margin } = this.props;
    const { name, mana, attack, defense } = this.props.card;
    const styles = require('./Card.scss');
    const marginStyle = `-${margin}px`;

    return (
      <div className={styles.Card} style={{ margin: `auto ${marginStyle}` }} onClick={this.playCard}>
        <div className={styles.CardMana}>{ mana || 0 }</div>
        <h1 className={styles.CardName}>{ name }</h1>
        { attack ? <div className={styles.CardAttack}>{ attack }</div> : null }
        { defense ? <div className={styles.CardDefense}>{ defense }</div> : null }
      </div>
    );
  }
}
