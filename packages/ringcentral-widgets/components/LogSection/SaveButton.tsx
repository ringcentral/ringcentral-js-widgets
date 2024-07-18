import clsx from 'clsx';
import React from 'react';

import { Button } from '../Button';

import styles from './styles.scss';

type SaveButtonProps = {
  isSaving?: boolean;
  onClick?: (...args: any[]) => any;
  overlapped?: boolean;
};
export const SaveButton: React.FC<SaveButtonProps> = ({
  isSaving = false,
  onClick = () => {
    //
  },
  overlapped = false,
  children = null,
}) => (
  <div className={clsx(styles.buttonPanel, overlapped && styles.overlapped)}>
    <Button
      className={clsx(styles.primaryButton, isSaving && styles.disabled)}
      disabled={isSaving}
      onClick={onClick}
    >
      {children}
    </Button>
  </div>
);
