import { createSelector } from 'reselect';
import { Record, List } from 'immutable';
import { END_TURN } from './game';
import { PLAY_CARD } from './hand';
import { EXHAUST_MINION, KILL_MINION } from './minion';

// const MAX_CARDS_ON_BOARD = 7;
const initialState = new Record({
  minionIds: new List,
  exhaustedMinionIds: new List,
});

export default function boardReducer(state = initialState(), action) {
  switch (action.type) {
    case PLAY_CARD:
      return state.update('minionIds', minionIds => (
        minionIds.insert(action.boardIndex, action.card.id)
      )).update('exhaustedMinionIds', exhausted => (
        exhausted.push(action.card.id)
      ));
    case KILL_MINION:
      return state.update('minionIds', minionIds => (
        minionIds.filter((id) => id !== action.minionId)
      ));
    case EXHAUST_MINION:
      return state.update('exhaustedMinionIds', exhausted => (
        exhausted.push(action.minionId)
      ));
    case END_TURN:
      return state.update('exhaustedMinionIds', exhausted => (
        exhausted.clear()
      ));
    default:
      return state;
  }
}

const getBoard = (state, props) => state[props].board.minionIds;
const getMinions = (state) => state.entities.minions;
export const boardSelector = createSelector([getBoard, getMinions], (minionIds, minions) => (
  minionIds.map(minionId => minions.get(minionId))
));
