import React, { Component, PropTypes } from 'react';
import { OpponentHand } from 'components';

export default class Opponent extends Component {
  static propTypes = {
    name: PropTypes.string,
    handCount: PropTypes.number,
    deckCount: PropTypes.number,
  }

  render() {
    const { name, handCount } = this.props;
    const styles = require('./Opponent.scss');

    return (
      <div className={styles.Opponent}>
        <div className={styles.OpponentHandWrapper}>
          <h1 className={styles.OpponentName}>
            { name || 'Unnamed' }
          </h1>
          <OpponentHand handCount={handCount} />
        </div>
      </div>
    );
  }
}
