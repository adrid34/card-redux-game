import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import { connect } from 'react-redux';

import { drawCard } from 'redux/modules/deck';
import { Hand } from 'components';

export class Player extends Component {
  static propTypes = {
    name: PropTypes.string,
    hand: PropTypes.instanceOf(List),
    deck: PropTypes.array,
    drawACard: PropTypes.func.isRequired,
  }

  render() {
    const { name, hand, drawACard } = this.props;
    const styles = require('./Player.scss');

    return (
      <div className={styles.Player}>
        <div className={styles.PlayerHandWrapper}>
          <h1 className={styles.PlayerName} onClick={drawACard}>
            { name || 'Unnamed' }
          </h1>
          <Hand cards={hand} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { name, hand } }) => ({ name, hand });
const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ drawACard: drawCard }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Player);
