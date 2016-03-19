import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import { connect } from 'react-redux';

import { drawCard } from 'redux/modules/deck';
import { playCard } from 'redux/modules/hand';
import { Hand } from 'components';

export class Player extends Component {
  static propTypes = {
    name: PropTypes.string,
    hand: PropTypes.instanceOf(List),
    deck: PropTypes.array,
    actions: PropTypes.shape({
      playCard: PropTypes.func.isRequired,
      drawCard: PropTypes.func.isRequired,
    }).isRequired,
  }

  render() {
    const { name, hand, actions } = this.props;
    const styles = require('./Player.scss');

    return (
      <div className={styles.Player}>
        <div className={styles.PlayerHandWrapper}>
          <h1 className={styles.PlayerName} onClick={actions.drawCard}>
            { name || 'Unnamed' }
          </h1>
          <Hand cards={hand} playCard={actions.playCard} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { name, hand } }) => ({ name, hand });
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ playCard, drawCard }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);
