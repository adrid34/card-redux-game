import React, { Component, PropTypes } from 'react';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { List } from 'immutable';
import { BoardSideDropTarget } from 'containers';
import { Hand } from 'components';

export class Player extends Component {
  static propTypes = {
    name: PropTypes.string,
    hand: PropTypes.instanceOf(List),
    deck: PropTypes.array,
    board: PropTypes.instanceOf(List),
    actions: PropTypes.shape({
      playCard: PropTypes.func.isRequired,
      drawCard: PropTypes.func.isRequired,
    }).isRequired,
  }

  render() {
    const { name, hand, board, actions } = this.props;
    const styles = require('./Player.scss');

    return (
      <div className={styles.Player}>
        <BoardSideDropTarget board={board} playCard={actions.playCard} />
        <h1 className={styles.PlayerName} onClick={actions.drawCard}>
          { name || 'Unnamed' }
        </h1>
        <div className={styles.PlayerHandWrapper}>
          <Hand cards={hand} />
        </div>
      </div>
    );
  }
}

export default dragDropContext(HTML5Backend)(Player);
