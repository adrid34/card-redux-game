import { createSelector } from 'reselect';
import { List } from 'immutable';
import { PLAY_CARD } from './hand';

// const MAX_CARDS_ON_BOARD = 7;
const initialState = new List;

export default function boardReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_CARD:
      return state.insert(action.boardIndex, action.card.id);
    default:
      return state;
  }
}

const getBoard = (state, props) => state[props].board;
const getMinions = (state) => state.entities.minions;
export const boardSelector = createSelector([getBoard, getMinions], (board, minions) => (
  board.map(minionId => minions.get(minionId))
));
