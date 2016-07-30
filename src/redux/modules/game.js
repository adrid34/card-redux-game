import { drawCard } from './deck';
import { addAndFillMana } from './character';

export const NEW_GAME = 'NEW_GAME';

function newGameAction({ yourName, opponentName, isPlayerStarting }) {
  return {
    yourName,
    opponentName,
    isPlayerStarting,
    type: NEW_GAME,
  };
}

export function newGame({ yourName, opponentName, isPlayerStarting }) {
  return dispatch => {
    dispatch(newGameAction({ yourName, opponentName, isPlayerStarting }));
    dispatch(addAndFillMana({ target: isPlayerStarting ? 'PLAYER' : 'OPPONENT' }));
    dispatch(drawCard({ name: 'The Coin', target: isPlayerStarting ? 'OPPONENT' : 'PLAYER' }));
  };
}
