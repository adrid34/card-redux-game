import { drawCard } from './deck';
import { NEW_GAME } from './game';
import { addAndFillMana } from './character';

export const END_TURN = 'END_TURN';

export function endTurn() {
  return (dispatch, getState) => {
    const { yourTurn: currentYourTurn } = getState();
    const target = currentYourTurn ? 'OPPONENT' : 'PLAYER';

    dispatch(addAndFillMana({ target }));
    dispatch(drawCard({ target }));
    dispatch({ type: END_TURN });
  };
}

export default function yourTurn(state = true, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.isPlayerStarting;
    case END_TURN:
      return !state;
    default:
      return state;
  }
}
