import { Map, Record } from 'immutable';
import { PLAY_CARD } from './hand';
import { HIT_MINION } from './minion';

const initialState = new Record({
  minions: new Map(),
});

export default function entities(state = initialState(), action) {
  switch (action.type) {
    case PLAY_CARD:
      return state.update('minions', (minions) => (
        minions.set(action.card.id, action.card)
      ));
    case HIT_MINION:
      return state.update('minions', (minions) => (
        minions.update(action.targetMinionId, (minion) => (
          minion.update('defense', (defense) => defense - action.damage)
        ))
      ));
    default:
      return state;
  }
}
