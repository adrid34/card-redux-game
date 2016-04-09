import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { List } from 'immutable';
import { Minion } from 'components';

const boardTarget = {
  drop(props, monitor) {
    props.playCard(monitor.getItem());
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

export class BoardSide extends Component {
  static propTypes = {
    board: PropTypes.instanceOf(List),
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
  }

  render() {
    const { board, isOver, connectDropTarget } = this.props;
    const styles = require('./BoardSide.scss');

    const minions = board.map((card, index) => (
      card ? <Minion key={index} card={card} /> : <div key={index} />
    ));

    return connectDropTarget(
      <div className={styles.BoardSide} style={{ backgroundColor: 'red' }}>
        { minions }
        {isOver &&
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            zIndex: 1,
            opacity: 0.5,
            backgroundColor: 'yellow',
          }} />
        }
      </div>
    );
  }
}

export default DropTarget('CARD', boardTarget, collect)(BoardSide);
