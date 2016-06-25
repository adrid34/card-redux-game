import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { boardSelector } from 'redux/modules/board';
import { drawCard } from 'redux/modules/deck';
import { playCard } from 'redux/modules/hand';
import { hitFace, hitMinion } from 'redux/modules/minion';
import { Player, PlayerSide, Opponent } from 'components';

export const Board = ({ player, opponent, actions }) => {
  const styles = require('./Board.scss');

  return (
    <div className={styles.Board}>
      <PlayerSide>
        <Opponent {...opponent} actions={actions} />
      </PlayerSide>
      <PlayerSide>
        <Player {...player} actions={actions} />
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
  actions: PropTypes.shape({
    playCard: PropTypes.func.isRequired,
    drawCard: PropTypes.func.isRequired,
    hitFace: PropTypes.func.isRequired,
    hitMinion: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  player: Object.assign({}, state.player, { board: boardSelector(state, 'player') }),
  opponent: Object.assign({}, state.opponent, { board: boardSelector(state, 'opponent') }),
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ playCard, drawCard, hitFace, hitMinion }, dispatch),
});

export default dragDropContext(HTML5Backend)(
  connect(mapStateToProps, mapDispatchToProps)(Board)
);
