import { combineReducers } from 'redux';
import hand from './hand';
import character from './character';
import { NEW_GAME } from './game';

function name(state = '', action) {
  return action.type === NEW_GAME ? action.yourName : state;
}

export default combineReducers({
  name,
  character,
  hand,
});
