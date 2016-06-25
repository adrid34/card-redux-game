import { List } from 'immutable';
import { PLAY_CARD } from './hand';
import { HIT_MINION } from './minion';

// const MAX_CARDS_ON_BOARD = 7;
const initialState = new List;

function damageMinion(minion, damage) {
  return minion.set('defense', minion.defense - damage);
}

export default function boardReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_CARD:
      return state.insert(action.boardIndex, action.card);
    case HIT_MINION:
      return state.set(action.boardIndex,
                       damageMinion(state.get(action.boardIndex), action.damage));
    default:
      return state;
  }
}
