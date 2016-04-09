import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { Hand, BoardSide } from 'components';

export default class Player extends Component {
  static propTypes = {
    name: PropTypes.string,
    hand: PropTypes.instanceOf(List),
    deck: PropTypes.array,
    board: PropTypes.instanceOf(List),
    actions: PropTypes.shape({
      playCard: PropTypes.func.isRequired,
      drawCard: PropTypes.func.isRequired,
    }).isRequired,
  }

  render() {
    const { name, hand, board, actions } = this.props;
    const styles = require('./Player.scss');
    const sharedStyles = require('./../shared/styles.scss');

    return (
      <div className={sharedStyles.fullSize}>
        <BoardSide board={board} />
        <div className={styles.Player}>
          <div className={styles.PlayerHandWrapper}>
            <h1 className={styles.PlayerName} onClick={actions.drawCard}>
              { name || 'Unnamed' }
            </h1>
            <Hand cards={hand} playCard={actions.playCard} />
          </div>
        </div>
      </div>
    );
  }
}
