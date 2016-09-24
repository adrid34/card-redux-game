import React, { PropTypes } from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { boardSelector } from 'redux/modules/board';
import { endTurn } from 'redux/modules/yourTurn';
import { drawCard } from 'redux/modules/deck';
import { playCardWithCost } from 'redux/modules/hand';
import { hitFace, attackMinion } from 'redux/modules/minion';
import { Player, PlayerSide, Opponent } from 'components';

import styles from './Board.scss';

export const Board = ({ yourTurn, player, opponent, actions }) => (
  <div className={styles.Board}>
    <PlayerSide>
      <Opponent {...opponent} opponentsTurn={!yourTurn} actions={actions} />
    </PlayerSide>
    <PlayerSide>
      <Player {...player} yourTurn={yourTurn} actions={actions} />
    </PlayerSide>
    <button onClick={actions.endTurn} disabled={!yourTurn}>End turn</button>
  </div>
);

Board.propTypes = {
  yourTurn: PropTypes.bool.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  opponent: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  actions: PropTypes.shape({
    playCardWithCost: PropTypes.func.isRequired,
    drawCard: PropTypes.func.isRequired,
    hitFace: PropTypes.func.isRequired,
    attackMinion: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = state => ({
  yourTurn: state.yourTurn,
  player: {
    ...state.player,
    board: boardSelector(state, 'player'),
    exhaustedMinionIds: state.player.board.exhaustedMinionIds,
  },
  opponent: {
    ...state.opponent,
    board: boardSelector(state, 'opponent'),
    exhaustedMinionIds: state.player.board.exhaustedMinionIds,
  },
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    playCardWithCost,
    drawCard,
    hitFace,
    attackMinion,
    endTurn,
  }, dispatch),
});

export default compose(
  dragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps),
)(Board);
