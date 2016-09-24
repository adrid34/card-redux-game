import React, { PropTypes } from 'react';
import { List } from 'immutable';
import { TargetableHero, BoardSideDropTarget, CustomDragLayer } from 'containers';
import { Hand, BoardSide } from 'components';

import styles from './Player.scss';

const Player = ({ name, character, hand, board, exhaustedMinionIds, yourTurn, actions }) => {
  const { mana, health } = character;
  const isBoardFull = board.size >= 7;

  return (
    <div className={styles.Player}>
      <CustomDragLayer />
      <BoardSide>
        <BoardSideDropTarget
          board={board}
          exhaustedMinionIds={exhaustedMinionIds}
          yourTurn={yourTurn}
          isBoardFull={isBoardFull}
          playCard={actions.playCardWithCost}
        />
      </BoardSide>
      <h1 className={styles.PlayerName}>
        { name || 'Unnamed' } - Mana: { mana.spendableMana }/{ mana.max } and Health: { health }
        <TargetableHero ownedBy="PLAYER" health={health} hitFace={actions.hitFace} />
      </h1>
      <div className={styles.PlayerHandWrapper}>
        <Hand cards={hand} yourTurn={yourTurn} spendableMana={mana.spendableMana} />
      </div>
    </div>
  );
};

Player.propTypes = {
  name: PropTypes.string,
  character: PropTypes.shape({
    health: PropTypes.number.isRequired,
    mana: PropTypes.shape({
      max: PropTypes.number.isRequired,
      spendableMana: PropTypes.number.isRequired,
    }),
  }),
  hand: PropTypes.instanceOf(List),
  deck: PropTypes.arrayOf(),
  board: PropTypes.instanceOf(List),
  exhaustedMinionIds: PropTypes.instanceOf(List),
  yourTurn: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    playCardWithCost: PropTypes.func.isRequired,
    drawCard: PropTypes.func.isRequired,
    hitFace: PropTypes.func.isRequired,
  }).isRequired,
};

export default Player;
