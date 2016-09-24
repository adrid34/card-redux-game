import { Map, Record } from 'immutable';
import { PLAY_CARD } from './hand';
import { HIT_MINION } from './minion';

function minions(state = new Map(), action) {
  switch (action.type) {
    case PLAY_CARD:
      return state.set(action.card.id, action.card);
    case HIT_MINION:
      return state.update(action.minionId, minion => (
        minion.update('defense', defense => defense - action.damage)
      ));
    default:
      return state;
  }
}

const initialState = new Record({
  minions: minions(undefined, {}),
});
export default function entities(state = initialState(), action) {
  switch (action.type) {
    case PLAY_CARD:
    case HIT_MINION:
      return state.update('minions', minionState => minions(minionState, action));
    default:
      return state;
  }
}
