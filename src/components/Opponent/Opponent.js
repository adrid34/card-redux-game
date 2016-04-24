import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { OpponentHand, BoardSide, Minion } from 'components';

export default class Opponent extends Component {
  static propTypes = {
    name: PropTypes.string,
    handCount: PropTypes.number,
    deckCount: PropTypes.number,
    board: PropTypes.instanceOf(List),
  }

  opponentPlayCard(e) {
    console.log('The opponent played a card', e);
  }

  render() {
    const { name, handCount, board } = this.props;
    const styles = require('./Opponent.scss');
    const sharedStyles = require('./../shared/styles.scss');

    return (
      <div className={styles.Opponent}>
        <h1 className={styles.OpponentName}>
          { name || 'Unnamed' }
        </h1>
        <div className={styles.OpponentHandWrapper}>
          <OpponentHand handCount={handCount} />
        </div>
        <BoardSide board={board} playCard={this.opponentPlayCard} minionComponent={Minion} />
      </div>
    );
  }
}
