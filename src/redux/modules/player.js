import handReducer from './hand';
import { NEW_GAME } from './game';

function nameReducer(state = '', action) {
  return action.type === NEW_GAME ? action.yourName : state;
}

export default function playerReducer(state = {}, action) {
  return {
    name: nameReducer(state.name, action),
    hand: handReducer(state.hand, action),
  };
}
