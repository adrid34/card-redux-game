import createReducer from 'redux/utils/createReducer';
import { List } from 'immutable';
import { DRAW_CARD } from './deck';
import { CardModel } from './card';

const initialState = new List([
  new CardModel({ id: 1, name: 'Gabria Warden', mana: 1, attack: 5, defense: 1 }),
  new CardModel({ id: 2, name: 'Abusive Sergeant', mana: 1, attack: 2, defense: 1 }),
  new CardModel({ id: 3, name: 'Acolyte of Pain', mana: 3 }),
  new CardModel({ id: 4, name: 'Azure Drake', mana: 5, attack: 4, defense: 4 }),
]);

function drawCardHandler(state) {
  const newCard = new CardModel({ id: 1, name: 'Gabria Warden', mana: 1, attack: 5, defense: 1 });
  return state.push(newCard);
}

const handlers = {
  [DRAW_CARD]: drawCardHandler,
};

export default createReducer(initialState, handlers);
