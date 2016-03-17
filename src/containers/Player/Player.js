import React, { Component, PropTypes } from 'react';
import { Hand } from 'components';

export default class Player extends Component {
  static propTypes = {
    name: PropTypes.string,
    hand: PropTypes.array,
    deck: PropTypes.array
  }

  render() {
    const { name, hand, deck } = this.props;
    const styles = require('./Player.scss');

    return (
      <div className={styles.Player}>
        <div className={styles.PlayerHandWrapper}>
          <h1 className={styles.PlayerName}>{ name || 'Unnamed' }</h1>
          <Hand />
        </div>
      </div>
    );
  }
}
