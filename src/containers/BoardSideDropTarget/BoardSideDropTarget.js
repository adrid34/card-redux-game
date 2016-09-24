import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget as dropTarget } from 'react-dnd';
import { List } from 'immutable';
import { MinionDropTarget } from 'containers';
import { MinionsOnBoard } from 'components';

import sharedStyles from 'components/shared/styles.scss';

export class BoardSideDropTarget extends Component {
  static propTypes = {
    board: PropTypes.instanceOf(List),
    exhaustedMinionIds: PropTypes.instanceOf(List),
    connectDropTarget: PropTypes.func.isRequired,
    yourTurn: PropTypes.bool.isRequired,
    isBoardFull: PropTypes.bool.isRequired,
    playCard: PropTypes.func.isRequired,
  }

  render() {
    const {
      yourTurn,
      isBoardFull,
      board,
      exhaustedMinionIds,
      connectDropTarget,
      playCard,
    } = this.props;

    const minions = board.map((card, index) => (
      <MinionDropTarget
        key={card.id}
        index={index}
        card={card}
        yourTurn={yourTurn}
        canDrop={!isBoardFull}
        exhausted={exhaustedMinionIds.includes(card.id)}
        boardSize={board.size}
        playCard={playCard}
      />
    ));

    return connectDropTarget(
      <div className={sharedStyles.fullSize}>
        <MinionsOnBoard>
          { minions }
        </MinionsOnBoard>
      </div>
    );
  }
}

const boardTarget = {
  canDrop(props) {
    return !props.isBoardFull;
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

export default dropTarget('CARD', boardTarget, collect)(BoardSideDropTarget);
