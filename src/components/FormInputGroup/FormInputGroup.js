import React, { PropTypes } from 'react';
import classNames from 'classnames';

import formStyles from 'styles/base/forms.scss';

const FormGroup = (props) => {
  const inputGroupStyles = classNames(
    formStyles.input,
    formStyles['input--group'],
    formStyles['input--full']
  );

  return <div {...props} className={inputGroupStyles} />;
};

FormGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default FormGroup;
