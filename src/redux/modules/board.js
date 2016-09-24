import { createSelector } from 'reselect';
import { Record, List } from 'immutable';
import { END_TURN } from './yourTurn';
import { PLAY_CARD } from './hand';
import { EXHAUST_MINION, KILL_MINION } from './minion';

function minionIds(state = new List(), action) {
  switch (action.type) {
    case PLAY_CARD:
      return state.insert(action.boardIndex, action.card.id);
    case KILL_MINION:
      return state.filter(id => id !== action.minionId);
    default:
      return state;
  }
}

function exhaustedMinionIds(state = new List(), action) {
  switch (action.type) {
    case PLAY_CARD:
      return state.push(action.card.id);
    case EXHAUST_MINION:
      return state.push(action.minionId);
    case END_TURN:
      return state.clear();
    default:
      return state;
  }
}

// const MAX_CARDS_ON_BOARD = 7;
const initialState = new Record({
  minionIds: minionIds(undefined, {}),
  exhaustedMinionIds: exhaustedMinionIds(undefined, {}),
});
export default function boardReducer(state = initialState(), action) {
  switch (action.type) {
    case PLAY_CARD:
      return state.update('minionIds', minionIdsState => (
        minionIds(minionIdsState, action)
      )).update('exhaustedMinionIds', exhaustedState => (
        exhaustedMinionIds(exhaustedState, action)
      ));
    case KILL_MINION:
      return state.update('minionIds', minionIdsState => minionIds(minionIdsState, action));
    case EXHAUST_MINION:
    case END_TURN:
      return state.update('exhaustedMinionIds', exhaustedState => (
        exhaustedMinionIds(exhaustedState, action)
      ));
    default:
      return state;
  }
}

const getBoard = (state, props) => state[props].board.minionIds;
const getMinions = state => state.entities.minions;
export const boardSelector = createSelector([getBoard, getMinions], (minionIdsState, minions) => (
  minionIdsState.map(minionId => minions.get(minionId))
));
