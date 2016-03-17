import React, { Component } from 'react';
import { Player } from 'containers';

export default class Board extends Component {
  render() {
    const styles = require('./Board.scss');
    return (
      <div className={styles.Board}>
        { /* <Player name='Opponent' /> */ }
        <Player />
      </div>
    );
  }
}
