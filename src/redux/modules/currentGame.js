import { Record as record } from 'immutable';
const NEW_GAME_REQUEST = 'NEW_GAME_REQUEST';
const NEW_GAME_SUCCESS = 'NEW_GAME_SUCCESS';
const NEW_GAME_FAILURE = 'NEW_GAME_FAILURE';
const initialState = record({
  loading: false,
  gameId: '',
  hasOpponent: false,
  errors: [],
});
export default function currentGameReducer(state = initialState(), action) {
  switch (action.type) {
    case NEW_GAME_REQUEST:
      return state.set('loading', true);
    case NEW_GAME_SUCCESS:
      return state.merge({
        loading: false,
        gameId: action.gameId,
        errors: [],
      });
    case NEW_GAME_FAILURE:
      return state.merge({
        loading: false,
        gameId: '',
        errors: action.errors,
      });
    default:
      return state;
  }
}
