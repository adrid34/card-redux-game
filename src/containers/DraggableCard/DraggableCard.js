import React, { Component, PropTypes } from 'react';
import { DragSource as dragSource } from 'react-dnd';
import { CardModel } from 'redux/modules/card';
import { Card } from 'components';

export class DraggableCard extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    card: PropTypes.instanceOf(CardModel).isRequired,
    margin: PropTypes.number.isRequired,
  }

  render() {
    const { connectDragSource, card, index, margin } = this.props;

    return connectDragSource(
      <div>
        <Card card={card} index={index} margin={margin} />
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

function collect(connect) {
  return {
    connectDragSource: connect.dragSource(),
  };
}

export default dragSource('CARD', cardSource, collect)(DraggableCard);
