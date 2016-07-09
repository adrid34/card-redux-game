import React, { Component, PropTypes } from 'react';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { DragSource as dragSource } from 'react-dnd';
import { CardModel } from 'redux/modules/card';
import { Card } from 'components';

export class DraggableCard extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    card: PropTypes.instanceOf(CardModel).isRequired,
    className: PropTypes.string,
    hoverable: PropTypes.bool,
    isDragging: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { connectDragPreview } = this.props;
    connectDragPreview(getEmptyImage());
  }

  render() {
    const { connectDragSource, isDragging, card, className } = this.props;

    return connectDragSource(
      <div style={{ display: isDragging ? 'none' : undefined }}>
        <Card card={card} className={className} />
      </div>
    );
  }
}

const cardSource = {
  canDrag(props) {
    return props.canDrag;
  },
  beginDrag(props) {
    return {
      card: props.card,
      handIndex: props.index,
      source: 'PLAYER',
      target: 'PLAYER',
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

export default dragSource('CARD', cardSource, collect)(DraggableCard);
