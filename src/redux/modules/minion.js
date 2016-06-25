export const HIT_MINION = 'HIT_MINION';
export const HIT_FACE = 'HIT_FACE';

export function hitMinion({ target, boardIndex, damage }) {
  return {
    target,
    boardIndex,
    damage,
    type: HIT_MINION,
  };
}

export function hitFace({ target, damage }) {
  return {
    target,
    damage,
    type: HIT_FACE,
  };
}
