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
    cardsLength: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    const { connectDragPreview } = this.props;
    connectDragPreview(getEmptyImage());
  }

  render() {
    const { connectDragSource, isDragging, card, index, cardsLength } = this.props;

    return connectDragSource(
      <div style={{ display: isDragging ? 'none' : undefined }}>
        <Card card={card} index={index} cardsLength={cardsLength} />
      </div>
    );
  }
}

const cardSource = {
  beginDrag(props) {
    return {
      card: props.card,
      handIndex: props.index,
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
