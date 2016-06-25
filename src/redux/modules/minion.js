export const HIT_MINION = 'HIT_MINION';
export const HIT_FACE = 'HIT_FACE';
export const KILL_MINION = 'KILL_MINION';

export function killMinion({ target, minionId }) {
  return {
    target,
    minionId,
    type: KILL_MINION,
  };
}

export function hitMinion({ target, targetMinionId, damage }) {
  return (dispatch, getState) => {
    const { entities: { minions } } = getState();

    if (minions.get(targetMinionId).defense - damage <= 0) {
      return dispatch(killMinion({ target, minionId: targetMinionId }));
    }

    return dispatch({
      target,
      targetMinionId,
      damage,
      type: HIT_MINION,
    });
  };
}

export function hitFace({ target, damage }) {
  return {
    target,
    damage,
    type: HIT_FACE,
  };
}
