import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import { Minion } from 'components';

export default class BoardSide extends Component {
  static propTypes = {
    board: PropTypes.instanceOf(List),
  }

  render() {
    const { board } = this.props;
    const styles = require('./BoardSide.scss');

    const minions = board.map((card, index) => (
      card ? <Minion key={index} card={card} /> : <div key={index} />
    ));

    return (
      <div className={styles.BoardSide}>
        { minions }
      </div>
    );
  }
}
