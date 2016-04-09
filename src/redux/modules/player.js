import { combineReducers } from 'redux';
import hand from './hand';
import character from './character';
import board from './board';
import { NEW_GAME } from './game';

function name(state = '', action) {
  return action.type === NEW_GAME ? action.yourName : state;
}

export default combineReducers({
  name,
  character,
  hand,
  board,
});
