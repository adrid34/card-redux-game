export const HIT_FACE = 'HIT_FACE';

export function hitFace({ damage }) {
  return {
    damage,
    type: HIT_FACE,
  };
}
