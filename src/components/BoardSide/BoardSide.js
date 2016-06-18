import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';

export default class BoardSide extends Component {
  static propTypes = {
    board: PropTypes.instanceOf(List),
    playCard: PropTypes.func.isRequired,
    minionComponent: PropTypes.element.isRequired,
  }

  render() {
    const { board, playCard, minionComponent: MinionComponent } = this.props;

    const minions = board.map((card, index) => (
      <MinionComponent
        key={index}
        index={index}
        card={card}
        boardSize={board.size}
        playCard={playCard}
      />
    ));

    return (
      <div>
        { minions }
      </div>
    );
  }
}
