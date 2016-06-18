import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { OpponentHand, MinionsOnBoard, BoardSideNew, Minion } from 'components';

export default class Opponent extends Component {
  static propTypes = {
    name: PropTypes.string,
    handCount: PropTypes.number,
    deckCount: PropTypes.number,
    board: PropTypes.instanceOf(List),
  }

  render() {
    const { name, handCount, board } = this.props;
    const styles = require('./Opponent.scss');

    const minions = board.map((card, index) => (
      <Minion key={index} card={card} />
    ));

    return (
      <div className={styles.Opponent}>
        <h1 className={styles.OpponentName}>
          { name || 'Unnamed' }
        </h1>
        <div className={styles.OpponentHandWrapper}>
          <OpponentHand handCount={handCount} />
        </div>
        <BoardSideNew>
          <MinionsOnBoard>
            { minions }
          </MinionsOnBoard>
        </BoardSideNew>
      </div>
    );
  }
}
