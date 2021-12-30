import React from 'react';

import classnames from 'classnames';

import { Button } from '../Button';
import i18n from './i18n';
import styles from './styles.scss';

type SaveButtonProps = {
  className?: string;
  currentLocale: string;
  disabled?: boolean;
  onClick?: (...args: any[]) => any;
};
const SaveButton: React.SFC<SaveButtonProps> = ({
  className,
  currentLocale,
  disabled,
  onClick,
}) => {
  return (
    <Button
      dataSign="saveButton"
      className={classnames(
        styles.root,
        disabled ? styles.disabled : null,
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {i18n.getString('save', currentLocale)}
    </Button>
  );
};
SaveButton.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined,
};
export default SaveButton;
