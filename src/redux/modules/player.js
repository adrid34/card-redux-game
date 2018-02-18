import name from './name';
import ready from './ready';
import character from './character';
import hand from './hand';
import board from './board';

export default function playerReducer(state = {}, action) {
  if (action.target && action.target !== 'PLAYER') return state;

  return {
    name: name(state.name, action),
    ready: ready(state.ready, action),
    character: character(state.character, action),
    hand: hand(state.hand, action),
    board: board(state.board, action),
  };
}
