import { Map, Record } from 'immutable';
import { PLAY_CARD } from './hand';

const initialState = new Record({
  minions: new Map(),
});

export default function entities(state = initialState(), action) {
  if (action.type === PLAY_CARD) {
    return state.update('minions', (minions) => (
      minions.set(action.card.id, action.card)
    ));
  }

  return state;
}
