export const DRAW_CARD = 'DRAW_CARD';

export function drawCard({ target }) {
  return {
    target,
    type: DRAW_CARD,
  };
}
