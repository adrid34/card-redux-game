import { List } from 'immutable';
import { PLAY_CARD } from './hand';

const MAX_CARDS_ON_BOARD = 7;
const initialState = new List([null, null, null, null, null, null, null]);

// FIX ME: Ugly ass function...
function findPlaceToAddCard(list) {
  for (let i = 0; i < MAX_CARDS_ON_BOARD; i++) {
    if (list.get(i) === null) {
      return i;
    }
  }
  return undefined;
}

export default function boardReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_CARD:
      // FIX ME: Ugly ass way of doing this...
      const freeIndex = findPlaceToAddCard(state);
      if (freeIndex !== undefined) {
        return state.set(freeIndex, action.card);
      } else {
        return state;
      }
    default:
      return state;
  }
}
