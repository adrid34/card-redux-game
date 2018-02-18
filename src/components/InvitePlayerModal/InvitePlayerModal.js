import React, { Component, PropTypes } from 'react';

import { Modal, FormInputGroup, FormInput } from 'components';

class InvitePlayerModal extends Component {
  select = () => {
    const inviteLinkInput = this.inviteLinkInput;

    inviteLinkInput.focus();
    inviteLinkInput.setSelectionRange(0, inviteLinkInput.value.length);
  }

  copy = () => {
    document.execCommand('copy');
  }

  selectAndCopy = () => {
    this.select();
    this.copy();
  }

  render() {
    const { inviteLink, isOpen, onClose } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        onAfterOpen={this.select}
        onRequestClose={onClose}
        contentLabel="Invite a player"
      >
        <button onClick={onClose}>close modal</button>
        <h1>Invite a player</h1>

        <FormInputGroup>
          <FormInput
            type="text"
            inputRef={(input) => { this.inviteLinkInput = input; }}
            value={inviteLink}
            onClick={this.select}
            full isGrouped readOnly
          />
          <button onClick={this.selectAndCopy}>
            Copy
          </button>
        </FormInputGroup>
      </Modal>
    );
  }
}

InvitePlayerModal.propTypes = {
  inviteLink: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default InvitePlayerModal;
