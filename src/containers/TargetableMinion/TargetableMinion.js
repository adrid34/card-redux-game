import React, { Component, PropTypes } from 'react';
import { DropTarget as dropTarget } from 'react-dnd';
import { CardModel } from 'redux/modules/card';

import { Minion } from 'components';

export class TargetableMinion extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    card: PropTypes.instanceOf(CardModel).isRequired,
    hitMinion: PropTypes.func.isRequired,
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

const minionTarget = {
  drop(props, monitor) {
    const sourceMinion = monitor.getItem().card;

    props.hitMinion({
      target: 'OPPONENT',
      targetMinionId: props.card.id,
      damage: sourceMinion.attack,
    });
  },
};

function collect(connect) {
  return { connectDropTarget: connect.dropTarget() };
}

export default dropTarget('MINION', minionTarget, collect)(TargetableMinion);
