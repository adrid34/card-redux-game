import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget as dropTarget } from 'react-dnd';
import { CardModel } from 'redux/modules/card';
import { Minion } from 'components';

export class MinionDropTarget extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    boardSize: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    card: PropTypes.instanceOf(CardModel).isRequired,
    playCard: PropTypes.func.isRequired,
  }

  render() {
    const { connectDropTarget, card } = this.props;

    return connectDropTarget(
      <div>
        <Minion card={card} />
      </div>
    );
  }
}

const cardTarget = {
  canDrop(props) {
    if (props.boardSize >= 7) {
      return false;
    }
    return true;
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
