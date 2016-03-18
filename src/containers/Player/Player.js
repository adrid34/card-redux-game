import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Hand } from 'components';

export class Player extends Component {
  static propTypes = {
    name: PropTypes.string,
    hand: PropTypes.array,
    deck: PropTypes.array,
  }

  render() {
    const { name, hand } = this.props;
    const styles = require('./Player.scss');

    return (
      <div className={styles.Player}>
        <div className={styles.PlayerHandWrapper}>
          <h1 className={styles.PlayerName}>{ name || 'Unnamed' }</h1>
          <Hand cards={hand} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { name, hand = [] } }) => ({ name, hand });

export default connect(mapStateToProps)(Player);
