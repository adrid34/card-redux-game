import { HIT_FACE } from './minion';
import { Record } from 'immutable';

const initialState = new Record({
  health: 30,
  mana: 1,
});

export default function characterReducer(state = initialState(), action) {
  switch (action.type) {
    case HIT_FACE:
      return state.set('health', state.get('health') - action.damage);
    default:
      return state;
  }
}
