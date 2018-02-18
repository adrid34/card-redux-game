import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import formStyles from 'styles/base/forms.scss';

// Disable reason: React refs dont work on functional components
// https://facebook.github.io/react/docs/refs-and-the-dom.html#the-ref-callback-attribute
//
// eslint-disable-next-line react/prefer-stateless-function
class FormInput extends Component {
  handleRef = refHandler => (node) => {
    if (refHandler) {
      this.node = node;
      refHandler(node);
    }
  }

  render() {
    const { base, isGrouped, full, inputRef, ...rest } = this.props;
    const inputStyles = classNames(formStyles.input, {
      [formStyles['input--base']]: base,
      [formStyles['input--group__input']]: isGrouped,
      [formStyles['input--full']]: full,
    });

    return (
      <input
        {...rest}
        ref={this.handleRef(inputRef)}
        className={inputStyles}
      />
    );
  }
}

FormInput.propTypes = {
  base: PropTypes.bool,
  isGrouped: PropTypes.bool,
  full: PropTypes.bool,
  inputRef: PropTypes.func,
};

export default FormInput;
