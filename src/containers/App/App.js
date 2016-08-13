import React from 'react';
import sharedStyles from 'components/shared/styles.scss';

export default ({ children }) => (
  <div className={sharedStyles.fullSize}>
    { children }
  </div>
);
