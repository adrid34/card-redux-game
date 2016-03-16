import React, { Component } from 'react';

export default class Board extends Component {
  render() {
    const styles = require('./Board.scss');
    return (
      <div className={styles.Board}>This board</div>
    );
  }
}
