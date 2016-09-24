export const EXHAUST_MINION = 'EXHAUST_MINION';
export const ATTACK_MINION = 'ATTACK_MINION';
export const HIT_MINION = 'HIT_MINION';
export const HIT_FACE = 'HIT_FACE';
export const KILL_MINION = 'KILL_MINION';

function exhaustMinion({ source, minionId }) {
  return {
    source,
    minionId,
    type: EXHAUST_MINION,
  };
}

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
  return (dispatch) => {
    dispatch({ target, targetMinion, source, sourceMinion, type: ATTACK_MINION });
    dispatch(exhaustMinion({ source, minionId: sourceMinion.id }));
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

export function hitFace({ source, sourceMinionId, target, damage }) {
  return (dispatch) => {
    dispatch(exhaustMinion({ source, minionId: sourceMinionId }));
    dispatch({ target, damage, type: HIT_FACE });
  };
}
