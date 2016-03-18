import createReducer from 'redux/utils/createReducer';

const NEW_GAME = 'NEW_GAME';
const initialState = '';

function NEW_GAME_HANDLER(state, action) {
  return action.name;
}

export function newGame(name) {
  return { name, type: NEW_GAME };
}


const handlers = {
  [NEW_GAME]: NEW_GAME_HANDLER,
};
export default createReducer(initialState, handlers);
