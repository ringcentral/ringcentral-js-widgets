import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../Button';
import i18n from './i18n';
import styles from './styles.scss';

export default function SaveButton({
  className,
  currentLocale,
  disabled,
  onClick,
}) {
  return (
    <Button
      className={classnames(
        styles.root,
        disabled ? styles.disabled : null,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {i18n.getString('save', currentLocale)}
    </Button>
  );
}
SaveButton.propTypes = {
  className: PropTypes.string,
  currentLocale: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
SaveButton.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined,
};
