import React, { Component, PropTypes } from 'react';
import { DragLayer as dragLayer } from 'react-dnd';
import { Minion, Card } from 'components';
import { CardModel } from 'redux/modules/card';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

function getItemStyles(props) {
  const { currentOffset } = props;
  if (!currentOffset) {
    return {
      display: 'none',
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.shape({
      card: PropTypes.instanceOf(CardModel),
    }),
    itemType: PropTypes.string,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired,
  }
  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          { itemType === 'CARD' ?
            <Card card={item.card} isDragging />
          : null }
          { itemType === 'MINION' ?
            <div style={{ width: '76.19px', height: '80.63px' }}>
              <Minion card={item.card} isDragging />
            </div>
          : null }
        </div>
      </div>
    );
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  };
}

export default dragLayer(collect)(CustomDragLayer);
