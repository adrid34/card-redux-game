import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget as dropTarget } from 'react-dnd';
import { CardModel } from 'redux/modules/card';
import { DraggableMinion } from 'containers';

import sharedStyles from 'components/shared/styles.scss';

export class MinionDropTarget extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    boardSize: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    yourTurn: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    card: PropTypes.instanceOf(CardModel).isRequired,
    exhausted: PropTypes.bool.isRequired,
    playCard: PropTypes.func.isRequired,
  }

  render() {
    const { yourTurn, connectDropTarget, card, exhausted } = this.props;

    return connectDropTarget(
      <div className={sharedStyles.fullHeight}>
        <DraggableMinion card={card} yourTurn={yourTurn} exhausted={exhausted} />
      </div>
    );
  }
}

const cardTarget = {
  canDrop(props) {
    return props.canDrop;
  },

  drop(props, monitor, component) {
    const minionIndex = props.index;
    const card = monitor.getItem();

    const componentRect = findDOMNode(component).getBoundingClientRect();
    const minionMiddleX = componentRect.width / 2;
    const mousePosition = monitor.getClientOffset();
    const mousePositionInMinion = mousePosition.x - componentRect.left;

    // Mouse is on the right side of the minion
    if (mousePositionInMinion > minionMiddleX) {
      return props.playCard({ ...card, boardIndex: minionIndex + 1 });
    }

    return props.playCard({ ...card, boardIndex: minionIndex });
  },
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

export default dropTarget('CARD', cardTarget, collect)(MinionDropTarget);
