import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { drawCard } from 'redux/modules/deck';
import { playCard } from 'redux/modules/hand';
import { Player, Opponent } from 'components';

export class Board extends Component {
  static propTypes = {
    player: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    opponent: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    playerActions: PropTypes.shape({
      playCard: PropTypes.func.isRequired,
      drawCard: PropTypes.func.isRequired,
    }),
  }

  render() {
    const { player, opponent, playerActions } = this.props;
    const styles = require('./Board.scss');

    return (
      <div className={styles.Board}>
        <Opponent {...opponent} />
        <Player {...player} actions={playerActions} />
      </div>
    );
  }
}

const mapStateToProps = ({ player, opponent }) => ({ player, opponent });
const mapDispatchToProps = (dispatch) => ({
  playerActions: bindActionCreators({ playCard, drawCard }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
