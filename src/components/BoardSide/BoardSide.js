import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget as dropTarget } from 'react-dnd';
import { List } from 'immutable';
import { MinionDropTarget } from 'containers';

export class BoardSide extends Component {
  static propTypes = {
    board: PropTypes.instanceOf(List),
    connectDropTarget: PropTypes.func.isRequired,
    playCard: PropTypes.func.isRequired,
  }

  render() {
    const { board, connectDropTarget, playCard } = this.props;
    const styles = require('./BoardSide.scss');

    const minions = board.map((card, index) => (
      <MinionDropTarget
        key={index}
        index={index}
        card={card}
        boardSize={board.size}
        playCard={playCard}
      />
    ));

    return connectDropTarget(
      <div className={styles.BoardSide}>
        { minions }
      </div>
    );
  }
}

const boardTarget = {
  canDrop(props) {
    if (props.board.size >= 7) {
      return false;
    }
    return true;
  },

  drop(props, monitor, component) {
    const card = monitor.getItem();
    const droppedOnBoard = monitor.isOver({ shallow: true });

    if (!droppedOnBoard) return undefined;

    const componentRect = findDOMNode(component).getBoundingClientRect();
    const boardMiddleX = componentRect.width / 2;
    const mousePosition = monitor.getClientOffset();
    const mousePositionInMinion = mousePosition.x - componentRect.left;

    // Mouse is on the right side of the minion
    if (mousePositionInMinion > boardMiddleX) {
      return props.playCard({ ...card, boardIndex: props.board.size });
    }

    return props.playCard(card);
  },
};

function collect(connect) {
  return { connectDropTarget: connect.dropTarget() };
}

export default dropTarget('CARD', boardTarget, collect)(BoardSide);
