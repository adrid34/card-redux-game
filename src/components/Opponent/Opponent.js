import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { OpponentHand, MinionsOnBoard, BoardSide, Minion } from 'components';

const Opponent = ({ name, handCount, board }) => {
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
      <BoardSide>
        <MinionsOnBoard>
          { minions }
        </MinionsOnBoard>
      </BoardSide>
    </div>
  );
};

Opponent.propTypes = {
  name: PropTypes.string,
  handCount: PropTypes.number,
  deckCount: PropTypes.number,
  board: PropTypes.instanceOf(List),
};

export default Opponent;
