export const NEW_GAME = 'NEW_GAME';

export function newGame({ yourName, opponentName }) {
  return {
    yourName,
    opponentName,
    type: NEW_GAME,
  };
}
