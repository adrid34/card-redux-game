import React, { Component, PropTypes } from 'react';
import { DragLayer as dragLayer } from 'react-dnd';
import { Card } from 'components';

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

  console.log('X:', currentOffset.x, 'Y:', currentOffset.y);

  const { x, y } = currentOffset;
  // const calcX = x - 100;
  // const calcY = y - 50;
  // const transform = `translate(${x}px, ${y}px)`;
  return {};
  return {
    transform,
    WebkitTransform: transform,
  };
}

class CustomDragLayer extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemType: PropTypes.string,
    currentOffset: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    isDragging: PropTypes.bool.isRequired,
  }
  render() {
    const { item, itemType, isDragging } = this.props;

    if (!isDragging || itemType !== 'CARD') {
      return null;
    }

    return (
      <div style={layerStyles}>
        <div style={getItemStyles(this.props)}>
          <Card card={item.card} />
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
