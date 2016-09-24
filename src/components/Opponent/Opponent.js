import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { TargetableHero, TargetableMinion } from 'containers';
import { OpponentHand, MinionsOnBoard, BoardSide } from 'components';

import styles from './Opponent.scss';

const Opponent = ({ name, character, handCount, board, actions }) => {
  const { mana, health } = character;

  const minions = board.map((card, index) => (
    <TargetableMinion key={index} index={index} card={card} attackMinion={actions.attackMinion} />
  ));

  return (
    <div className={styles.Opponent}>
      <h1 className={styles.OpponentName}>
        { name || 'Unnamed' } - Mana: { mana.spendableMana }/{ mana.max } and Health: { health }
        <TargetableHero ownedBy="OPPONENT" health={health} hitFace={actions.hitFace} />
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
  character: PropTypes.shape({
    health: PropTypes.number.isRequired,
    mana: PropTypes.shape({
      max: PropTypes.number.isRequired,
      spendableMana: PropTypes.number.isRequired,
    }),
  }),
  handCount: PropTypes.number,
  deckCount: PropTypes.number,
  board: PropTypes.instanceOf(List),
  actions: PropTypes.shape({
    playCardWithCost: PropTypes.func.isRequired,
    drawCard: PropTypes.func.isRequired,
    hitFace: PropTypes.func.isRequired,
    attackMinion: PropTypes.func.isRequired,
  }).isRequired,
};

export default Opponent;
