import nameReducer from './name';
import readyReducer from './ready';
import characterReducer from './character';
import boardReducer from './board';

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
    ready: readyReducer(state.ready, action),
    character: characterReducer(state.character, action),
    handCount: handCountReducer(state.handCount, action),
    deckCount: deckCountReducer(state.deckCount, action),
    board: boardReducer(state.board, action),
  };
}
