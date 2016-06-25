import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { drawCard } from 'redux/modules/deck';
import { playCard } from 'redux/modules/hand';
import { hitFace } from 'redux/modules/minion';
import { Player, PlayerSide, Opponent } from 'components';

export const Board = ({ player, opponent, playerActions }) => {
  const styles = require('./Board.scss');

  return (
    <div className={styles.Board}>
      <PlayerSide>
        <Opponent {...opponent} actions={playerActions} />
      </PlayerSide>
      <PlayerSide>
        <Player {...player} actions={playerActions} />
      </PlayerSide>
    </div>
  );
};

Board.propTypes = {
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
};

const mapStateToProps = ({ player, opponent }) => ({ player, opponent });
const mapDispatchToProps = (dispatch) => ({
  playerActions: bindActionCreators({ playCard, drawCard, hitFace }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
