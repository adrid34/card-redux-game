import handReducer from './hand';

const NEW_GAME = 'NEW_GAME';

export function newGame(name) {
  return { name, type: NEW_GAME };
}

function nameReducer(state = '', action) {
  return action.type === NEW_GAME ? action.name : state;
}

export default function playerReducer(state = {}, action) {
  return {
    name: nameReducer(state.name, action),
    hand: handReducer(state.hand, action),
  };
}
