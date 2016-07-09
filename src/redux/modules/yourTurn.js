export const END_TURN = 'END_TURN';

export function endTurn() {
  return {
    type: END_TURN,
  };
}

export default function yourTurn(state = true, action) {
  if (action.type !== END_TURN) return state;
  return !state;
}
