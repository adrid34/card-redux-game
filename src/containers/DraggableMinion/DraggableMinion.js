import React, { Component, PropTypes } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource as dragSource } from 'react-dnd';
import { CardModel } from 'redux/modules/card';
import { Minion } from 'components';

import sharedStyles from 'components/shared/styles.scss';

export class DraggableMinion extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    yourTurn: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    card: PropTypes.instanceOf(CardModel).isRequired,
    exhausted: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { connectDragPreview } = this.props;
    connectDragPreview(getEmptyImage());
  }

  render() {
    const { connectDragSource, isDragging, card, exhausted } = this.props;

    return connectDragSource(
      <div className={sharedStyles.fullHeight} style={{ opacity: isDragging ? 0 : 1 }}>
        <Minion card={card} exhausted={exhausted} />
      </div>
    );
  }
}

const minionSource = {
  beginDrag(props) {
    return {
      card: props.card,
    };
  },

  canDrag(props) {
    if (!props.yourTurn) return false;
    if (props.exhausted) return false;
    if (props.card.attack <= 0) return false;
    return true;
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

export default dragSource('MINION', minionSource, collect)(DraggableMinion);
