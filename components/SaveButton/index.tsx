import clsx from 'clsx';
import React from 'react';

import { Button } from '../Button';

import i18n from './i18n';
import styles from './styles.scss';

type SaveButtonProps = {
  className?: string;
  currentLocale: string;
  disabled?: boolean;
  onClick?: (...args: any[]) => any;
};
export const SaveButton: React.FC<SaveButtonProps> = ({
  className,
  currentLocale,
  disabled = false,
  onClick,
}) => {
  return (
    <Button
      dataSign="saveButton"
      className={clsx(
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

export default SaveButton;
