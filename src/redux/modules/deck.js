export const DRAW_CARD = 'DRAW_CARD';

export function drawCard({ name, target, fromServer }) {
  return {
    name,
    target,
    fromServer,
    type: DRAW_CARD,
  };
}
