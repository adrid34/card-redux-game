import React, { PropTypes } from 'react';
import { getDisplayName } from 'helpers';

const withSocket = (WrappedComponent) => {
  const withSocketDisplayName = `withSocket(${getDisplayName(WrappedComponent)})`;

  const WithSocket = (props, { socket }) => (
    <WrappedComponent {...props} socket={socket} />
  );

  WithSocket.displayName = withSocketDisplayName;
  WithSocket.contextTypes = {
    socket: PropTypes.object.isRequired,
  };

  return WithSocket;
};

export default withSocket;
