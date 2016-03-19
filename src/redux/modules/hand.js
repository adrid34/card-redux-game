import createReducer from 'redux/utils/createReducer';
import { List } from 'immutable';
import { DRAW_CARD } from './deck';
import { CardModel } from './card';

const PLAY_CARD = 'PLAY_CARD';

const initialState = new List([
  new CardModel({ id: 1, name: 'Gabria Warden', mana: 1, attack: 5, defense: 1 }),
  new CardModel({ id: 2, name: 'Abusive Sergeant', mana: 1, attack: 2, defense: 1 }),
  new CardModel({ id: 3, name: 'Acolyte of Pain', mana: 3 }),
  new CardModel({ id: 4, name: 'Azure Drake', mana: 5, attack: 4, defense: 4 }),
]);

export function playCard(index) {
  return { index, type: PLAY_CARD };
}

function drawCardHandler(state) {
  const newCard = new CardModel({ id: 1, name: 'Gabria Warden', mana: 1, attack: 5, defense: 1 });
  return state.push(newCard);
}

function playCardHandler(state, action) {
  return state.delete(action.index);
}

const handlers = {
  [DRAW_CARD]: drawCardHandler,
  [PLAY_CARD]: playCardHandler,
};

export default createReducer(initialState, handlers);
