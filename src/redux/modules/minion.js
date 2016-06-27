export const HIT_MINION = 'HIT_MINION';
export const HIT_FACE = 'HIT_FACE';
export const KILL_MINION = 'KILL_MINION';

export function hitMinion({ minionId, damage }) {
  return {
    minionId,
    damage,
    type: HIT_MINION,
  };
}

export function killMinion({ target, minionId }) {
  return {
    target,
    minionId,
    type: KILL_MINION,
  };
}

export function attackMinion({ target, targetMinion, source, sourceMinion }) {
  return dispatch => {
    dispatch(hitMinion({ minionId: targetMinion.id, damage: sourceMinion.attack }));
    dispatch(hitMinion({ minionId: sourceMinion.id, damage: targetMinion.attack }));

    if (targetMinion.defense - sourceMinion.attack <= 0) {
      dispatch(killMinion({ target, minionId: targetMinion.id }));
    }

    if (sourceMinion.defense - targetMinion.attack <= 0) {
      dispatch(killMinion({ target: source, minionId: sourceMinion.id }));
    }
  };
}

export function hitFace({ target, damage }) {
  return {
    target,
    damage,
    type: HIT_FACE,
  };
}
