export const NEW_GAME = 'NEW_GAME';

export function newGame(name) {
  return { name, type: NEW_GAME };
}
