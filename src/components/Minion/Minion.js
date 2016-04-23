import React, { Component, PropTypes } from 'react';
import { CardModel } from 'redux/modules/card';

export default class Minion extends Component {
  static propTypes = {
    card: PropTypes.instanceOf(CardModel).isRequired,
  }

  render() {
    const { attack, defense, portrait } = this.props.card;
    const styles = require('./Minion.scss');

    return (
      <div className={styles.Minion} style={{ backgroundImage: `url(${portrait})` }}>
        <div className={styles.MinionAttack}>{ attack || 0 }</div>
        <div className={styles.MinionDefense}>{ defense || 0 }</div>
      </div>
    );
  }
}
