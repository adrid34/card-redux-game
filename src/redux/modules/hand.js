import createReducer from 'redux/utils/createReducer';
import newCardByName, { newRandomCard } from 'redux/utils/cards';
import { List } from 'immutable';
import { DRAW_CARD } from './deck';
import { spendMana } from './character';

const MAX_CARDS = 10;
export const PLAY_CARD = 'PLAY_CARD';
export const PLAY_CARD_WITH_COST = 'PLAY_CARD_WITH_COST';

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

export function playCardWithCost({ target, card, handIndex, boardIndex, source }) {
  return (dispatch, getState) => {
    const targetPlayer = target === 'PLAYER' ? 'player' : 'opponent';
    const { mana } = getState()[targetPlayer].character;

    if (mana.spendableMana < card.mana) return;
    dispatch(playCard({ target, card, handIndex, boardIndex, source }));
    dispatch(spendMana({ target, amount: card.mana }));
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
