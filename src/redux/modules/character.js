import { HIT_FACE } from './minion';
import { Record } from 'immutable';

const ADD_MANA = 'ADD_MANA';

export function addMana({ target, amount = 1 }) {
  return {
    target,
    amount,
    type: ADD_MANA,
  };
}

const manaReducerInitialState = new Record({
  max: 0,
  spendableMana: 0,
});

function manaReducer(state = manaReducerInitialState(), action) {
  switch (action.type) {
    case ADD_MANA:
      return state.update('max', max => max + action.amount);
    default:
      return state;
  }
}

const initialState = new Record({
  health: 30,
  mana: manaReducer(undefined, {}),
});

export default function characterReducer(state = initialState(), action) {
  switch (action.type) {
    case HIT_FACE:
      return state.update('health', health => health - action.damage);
    case ADD_MANA:
      return state.update('mana', mana => manaReducer(mana, action));
    default:
      return state;
  }
}
