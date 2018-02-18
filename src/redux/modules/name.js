const CHANGE_NAME = 'CHANGE_NAME';

export function setName({ name, target }) {
  return {
    name,
    target,
    type: CHANGE_NAME,
  };
}

export function setPlayerName(name) {
  return setName({ name, target: 'PLAYER' });
}

export function setOpponentName(name) {
  return setName({ name, target: 'OPPONENT' });
}

export default function nameReducer(state = '', action) {
  if (action.type === CHANGE_NAME) return action.name;

  return state;
}
