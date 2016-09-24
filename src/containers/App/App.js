import React, { PropTypes } from 'react';
import sharedStyles from 'components/shared/styles.scss';

const App = ({ children }) => (
  <div className={sharedStyles.fullSize}>
    { children }
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;
