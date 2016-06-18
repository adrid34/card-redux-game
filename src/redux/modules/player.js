import hand from './hand';
import character from './character';
import board from './board';
import { NEW_GAME } from './game';

function name(state = '', action) {
  return action.type === NEW_GAME ? action.yourName : state;
}

export default function playerReducer(state = {}, action) {
  return {
    name: name(state.name, action),
    character: character(state.character, action),
    hand: hand(state.hand, action),
    board: board(state.board, action, 'PLAYER'),
  };
}
