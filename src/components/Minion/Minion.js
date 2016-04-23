import React, { Component, PropTypes } from 'react';
import { CardModel } from 'redux/modules/card';

export default class Minion extends Component {
  static propTypes = {
    card: PropTypes.instanceOf(CardModel).isRequired,
  }

  render() {
    const { attack, defense } = this.props.card;
    const styles = require('./Minion.scss');
    const statStyles = require('components/shared/Stats.scss');

    return (
      <div className={styles.Minion}>
        <div className={statStyles.AttackStat}>{ attack || 0 }</div>
        <div className={statStyles.DefenseStat}>{ defense || 0 }</div>
      </div>
    );
  }
}
