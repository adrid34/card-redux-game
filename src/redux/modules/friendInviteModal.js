import { Record as record } from 'immutable';

const TOGGLE_FRIEND_INVITE_MODAL = 'TOGGLE_FRIEND_INVITE_MODAL';
const OPEN_FRIEND_INVITE_MODAL = 'OPEN_FRIEND_INVITE_MODAL';
const CLOSE_FRIEND_INVITE_MODAL = 'CLOSE_FRIEND_INVITE_MODAL';

export function toggleFriendInviteModal() {
  return { type: TOGGLE_FRIEND_INVITE_MODAL };
}

export function openFriendInviteModal() {
  return { type: OPEN_FRIEND_INVITE_MODAL };
}

export function closeFriendInviteModal() {
  return { type: CLOSE_FRIEND_INVITE_MODAL };
}

const initialState = record({
  isOpen: false,
});
export default function friendInviteModalReducer(state = initialState(), action) {
  switch (action.type) {
    case TOGGLE_FRIEND_INVITE_MODAL:
      return state.update('isOpen', isOpen => !isOpen);
    case OPEN_FRIEND_INVITE_MODAL:
      return state.set('isOpen', true);
    case CLOSE_FRIEND_INVITE_MODAL:
      return state.set('isOpen', false);
    default:
      return state;
  }
}
