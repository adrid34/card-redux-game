export const HIT_FACE = 'HIT_FACE';

export function hitFace({ target, damage }) {
  return {
    target,
    damage,
    type: HIT_FACE,
  };
}
