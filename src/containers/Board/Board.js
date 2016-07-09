import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { boardSelector } from 'redux/modules/board';
import { endTurn } from 'redux/modules/yourTurn';
import { drawCard } from 'redux/modules/deck';
import { playCard } from 'redux/modules/hand';
import { hitFace, attackMinion } from 'redux/modules/minion';
import { Player, PlayerSide, Opponent } from 'components';

export const Board = ({ yourTurn, player, opponent, actions }) => {
  const styles = require('./Board.scss');

  return (
    <div className={styles.Board}>
      <PlayerSide>
        <Opponent {...opponent} opponentsTurn={!yourTurn} actions={actions} />
      </PlayerSide>
      <PlayerSide>
        <Player {...player} yourTurn={yourTurn} actions={actions} />
      </PlayerSide>
      <button onClick={actions.endTurn} disabled={!yourTurn}>End turn (yours)</button>
      <button onClick={actions.endTurn} disabled={yourTurn}>End turn (enemy)</button>
    </div>
  );
};

Board.propTypes = {
  yourTurn: PropTypes.bool.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  opponent: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  actions: PropTypes.shape({
    playCard: PropTypes.func.isRequired,
    drawCard: PropTypes.func.isRequired,
    hitFace: PropTypes.func.isRequired,
    attackMinion: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  yourTurn: state.yourTurn,
  player: Object.assign({}, state.player, {
    board: boardSelector(state, 'player'),
    exhaustedMinionIds: state.player.board.exhaustedMinionIds,
  }),
  opponent: Object.assign({}, state.opponent, {
    board: boardSelector(state, 'opponent'),
    exhaustedMinionIds: state.player.board.exhaustedMinionIds,
  }),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ playCard, drawCard, hitFace, attackMinion, endTurn }, dispatch),
});

export default dragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps)(Board)
);
