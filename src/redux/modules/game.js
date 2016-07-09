import { drawCard } from './deck';
import { addMana } from './character';

export const NEW_GAME = 'NEW_GAME';

export function newGame({ yourName, opponentName, isPlayerStarting }) {
  return dispatch => {
    dispatch(addMana({ target: isPlayerStarting ? 'PLAYER' : 'OPPONENT' }));
    dispatch(drawCard({ name: 'The Coin', target: isPlayerStarting ? 'OPPONENT' : 'PLAYER' }));

    return dispatch({
      yourName,
      opponentName,
      isPlayerStarting,
      type: NEW_GAME,
    });
  };
}
