import React, { PropTypes } from 'react';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { List } from 'immutable';
import { BoardSideDropTarget, CustomDragLayer } from 'containers';
import { Hand, BoardSide } from 'components';

export const Player = ({ name, hand, board, actions }) => {
  const styles = require('./Player.scss');

  return (
    <div className={styles.Player}>
      <CustomDragLayer />
      <BoardSide>
        <BoardSideDropTarget board={board} playCard={actions.playCard} />
      </BoardSide>
      <h1 className={styles.PlayerName} onClick={actions.drawCard}>
        { name || 'Unnamed' }
      </h1>
      <div className={styles.PlayerHandWrapper}>
        <Hand cards={hand} />
      </div>
    </div>
  );
};

Player.propTypes = {
  name: PropTypes.string,
  hand: PropTypes.instanceOf(List),
  deck: PropTypes.array,
  board: PropTypes.instanceOf(List),
  actions: PropTypes.shape({
    playCard: PropTypes.func.isRequired,
    drawCard: PropTypes.func.isRequired,
  }).isRequired,
};

export default dragDropContext(HTML5Backend)(Player);
