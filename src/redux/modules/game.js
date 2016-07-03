export const NEW_GAME = 'NEW_GAME';
export const END_TURN = 'END_TURN';

export function newGame({ yourName, opponentName }) {
  return {
    yourName,
    opponentName,
    type: NEW_GAME,
  };
}
