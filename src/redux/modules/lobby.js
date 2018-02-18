import friendInviteModal from './friendInviteModal';

const initialState = {
  friendInviteModal: friendInviteModal(undefined, {}),
};
export default function lobbyReducer(state = initialState, action) {
  return {
    friendInviteModal: friendInviteModal(state.friendInviteModal, action),
  };
}
