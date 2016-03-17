import React, { Component, PropTypes } from 'react';

export default class Card extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    mana: PropTypes.number,
    attack: PropTypes.number,
    defense: PropTypes.number
  }

  render() {
    const { name, mana, attack, defense } = this.props;
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
