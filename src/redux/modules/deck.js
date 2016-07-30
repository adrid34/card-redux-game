export const DRAW_CARD = 'DRAW_CARD';

export function drawCard({ name, target }) {
  return {
    name,
    target,
    type: DRAW_CARD,
  };
}
