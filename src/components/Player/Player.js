import React, { Component, PropTypes } from 'react';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { List } from 'immutable';
import { Hand, BoardSide } from 'components';

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
    const sharedStyles = require('./../shared/styles.scss');

    return (
      <div className={sharedStyles.fullSize}>
        <BoardSide board={board} playCard={actions.playCard} />
        <div className={styles.Player}>
          <div className={styles.PlayerHandWrapper}>
            <h1 className={styles.PlayerName} onClick={actions.drawCard}>
              { name || 'Unnamed' }
            </h1>
            <Hand cards={hand} />
          </div>
        </div>
      </div>
    );
  }
}

export default dragDropContext(HTML5Backend)(Player);
