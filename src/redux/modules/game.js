import { drawCard } from './deck';
import { addAndFillMana } from './character';

export const NEW_GAME = 'NEW_GAME';

function newGameAction({ yourName, opponentName, isPlayerStarting, fromServer }) {
  return {
    yourName,
    opponentName,
    isPlayerStarting,
    fromServer,
    type: NEW_GAME,
  };
}

export function newGame({ yourName, opponentName, isPlayerStarting, fromServer }) {
  return (dispatch) => {
    dispatch(newGameAction({ yourName, opponentName, isPlayerStarting, fromServer }));
    dispatch(addAndFillMana({ fromServer, target: isPlayerStarting ? 'PLAYER' : 'OPPONENT' }));
    dispatch(drawCard({
      fromServer,
      name: 'The Coin',
      target: isPlayerStarting ? 'OPPONENT' : 'PLAYER',
    }));
  };
}
