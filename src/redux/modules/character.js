import { Record } from 'immutable';
import { HIT_FACE } from './minion';

const ADD_MAX_MANA = 'ADD_MANA';
const ADD_SPENDABLE_MANA = 'ADD_SPENDABLE_MANA';
const FILL_MAX_MANA = 'FILL_MAX_MANA';
const SPEND_MANA = 'SPEND_MANA';

export function addMaxMana({ target, fromServer, amount = 1 }) {
  return {
    target,
    amount,
    fromServer,
    type: ADD_MAX_MANA,
  };
}

export function addSpendableMana({ target, amount = 1 }) {
  return {
    target,
    amount,
    type: ADD_SPENDABLE_MANA,
  };
}

export function fillMaxMana({ target, fromServer }) {
  return {
    target,
    fromServer,
    type: FILL_MAX_MANA,
  };
}

export function addAndFillMana({ target, fromServer }) {
  return (dispatch) => {
    dispatch(addMaxMana({ target, fromServer }));
    dispatch(fillMaxMana({ target, fromServer }));
  };
}

export function spendMana({ target, amount }) {
  return {
    target,
    amount,
    type: SPEND_MANA,
  };
}

const manaReducerInitialState = new Record({
  max: 0,
  spendableMana: 0,
});

function manaReducer(state = manaReducerInitialState(), action) {
  switch (action.type) {
    case ADD_MAX_MANA:
      return state.update('max', max => max + action.amount);
    case ADD_SPENDABLE_MANA:
      return state.update('spendableMana', spendableMana => spendableMana + action.amount);
    case FILL_MAX_MANA:
      return state.set('spendableMana', state.get('max'));
    case SPEND_MANA:
      return state.update('spendableMana', spendableMana => spendableMana - action.amount);
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
    case ADD_MAX_MANA:
    case ADD_SPENDABLE_MANA:
    case FILL_MAX_MANA:
    case SPEND_MANA:
      return state.update('mana', mana => manaReducer(mana, action));
    default:
      return state;
  }
}
