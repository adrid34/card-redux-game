import { NEW_GAME } from './game';
import boardReducer from './board';
import characterReducer from './character';

function nameReducer(state = '', action) {
  return action.type === NEW_GAME ? action.opponentName : state;
}

function handCountReducer(state = 2) {
  return state;
}

function deckCountReducer(state = 30) {
  return state;
}

export default function opponentReducer(state = {}, action) {
  if (action.target && action.target !== 'OPPONENT') return state;

  return {
    name: nameReducer(state.name, action),
    character: characterReducer(state.character, action),
    handCount: handCountReducer(state.handCount, action),
    deckCount: deckCountReducer(state.deckCount, action),
    board: boardReducer(state.board, action),
  };
}
