import React, { Component, PropTypes } from 'react';
import { CardModel } from 'redux/modules/card';

export default class Minion extends Component {
  static propTypes = {
    card: PropTypes.instanceOf(CardModel),
  }

  render() {
    const { mana, attack, defense } = this.props.card;
    const styles = require('./Minion.scss');

    return (
      <div className={styles.Minion}>
        <p>Mana: { mana }</p>
        <p>Attack: { attack }</p>
        <p>Defense: { defense }</p>
      </div>
    );
  }
}
