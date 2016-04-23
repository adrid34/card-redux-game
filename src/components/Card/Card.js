import React, { Component, PropTypes } from 'react';
import { CardModel } from 'redux/modules/card';

export default class Card extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    card: PropTypes.instanceOf(CardModel).isRequired,
    margin: PropTypes.number.isRequired,
  }

  render() {
    const { margin } = this.props;
    const { name, mana, attack, defense } = this.props.card;
    const styles = require('./Card.scss');
    const statStyles = require('components/shared/Stats.scss');
    const marginStyle = `-${margin}px`;
    const rootClass = `${styles.Card} ${styles.CardYours}`;

    return (
      <div className={rootClass} style={{ margin: `auto ${marginStyle}` }}>
        <div className={statStyles.CardMana}>{ mana || 0 }</div>
        <h1 className={styles.CardName}>{ name }</h1>
        { attack ? <div className={statStyles.AttackStat}>{ attack }</div> : null }
        { defense ? <div className={statStyles.DefenseStat}>{ defense }</div> : null }
      </div>
    );
  }
}
