import createReducer from 'redux/utils/createReducer';
import newCardByName, { newRandomCard } from 'redux/utils/cards';
import { List } from 'immutable';
import { DRAW_CARD } from './deck';

const MAX_CARDS = 10;
export const PLAY_CARD = 'PLAY_CARD';

const initialState = new List([
  newCardByName('Anima Golem'),
  newCardByName('Abusive Sergeant'),
  newCardByName('Acolyte of Pain'),
  newCardByName('Azure Drake'),
]);

export function playCard({ target, card, handIndex, boardIndex, source }) {
  return {
    target,
    card,
    handIndex,
    boardIndex,
    source,
    type: PLAY_CARD,
  };
}

function drawCardHandler(state, action) {
  if (state.size + 1 > MAX_CARDS) return state;
  if (action.name) {
    return state.push(newCardByName(action.name));
  }
  return state.push(newRandomCard());
}

function playCardHandler(state, action) {
  return state.delete(action.handIndex);
}

const handlers = {
  [DRAW_CARD]: drawCardHandler,
  [PLAY_CARD]: playCardHandler,
};

export default createReducer(initialState, handlers);
