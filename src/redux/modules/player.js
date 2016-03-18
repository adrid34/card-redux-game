const NEW_GAME = 'NEW_GAME';

const initialState = '';

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NEW_GAME:
      return action.name;
    default:
      return state;
  }
}

export function newGame(name) {
  return {
    name,
    type: NEW_GAME,
  };
}
