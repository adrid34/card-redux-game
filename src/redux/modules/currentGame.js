import { Record as record } from 'immutable';
import { checkSuccessStatus, toJSON } from 'redux/utils/api';

const NEW_GAME_REQUEST = 'NEW_GAME_REQUEST';
const NEW_GAME_SUCCESS = 'NEW_GAME_SUCCESS';
const NEW_GAME_FAILURE = 'NEW_GAME_FAILURE';
const UPDATE_HAS_OPPONENT = 'UPDATE_HAS_OPPONENT';
const RESET_CURRENT_GAME = 'RESET_CURRENT_GAME';

function newGameRequest() {
  return { type: NEW_GAME_REQUEST };
}

function newGameSuccess({ gameId }) {
  return {
    gameId,
    type: NEW_GAME_SUCCESS,
  };
}

function newGameFailure({ errors }) {
  return {
    errors,
    type: NEW_GAME_FAILURE,
  };
}

function shouldFetchNewGame(state, force) {
  const { currentGame } = state;

  if (force) return true;
  if (currentGame.get('gameId')) return false;

  return true;
}

export function fetchNewGame(force = false) {
  return (dispatch, getState) => {
    if (!shouldFetchNewGame(getState(), force)) return Promise.resolve();

    dispatch(newGameRequest());

    return fetch('http://localhost:3000/api/game/new', { method: 'post' })
      .then(checkSuccessStatus)
      .then(toJSON)
      .then((json) => {
        dispatch(newGameSuccess(json));
        return json.gameId;
      })
      .catch((errors) => { dispatch(newGameFailure({ errors })); });
  };
}

export function joinGame(gameId) {
  return newGameSuccess({ gameId });
}

export function updateHasOpponent(hasOpponent) {
  return {
    hasOpponent,
    type: UPDATE_HAS_OPPONENT,
  };
}

export function resetCurrentGame() {
  return {
    type: RESET_CURRENT_GAME,
  };
}

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
    case UPDATE_HAS_OPPONENT:
      return state.merge({
        hasOpponent: action.hasOpponent,
      });
    case RESET_CURRENT_GAME:
      return initialState;
    default:
      return state;
  }
}
