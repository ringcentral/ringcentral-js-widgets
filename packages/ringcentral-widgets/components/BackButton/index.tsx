import clsx from 'clsx';
import React from 'react';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';

import styles from './styles.scss';

type BackButtonProps = {
  label?: string;
  showIcon?: boolean;
};
const BackButton: React.FC<BackButtonProps> = ({ label, showIcon }) => {
  return (
    <span className={styles.backButton}>
      {showIcon ? (
        <i
          data-sign="backButton"
          className={clsx(dynamicsFont.arrow, styles.backIcon)}
        />
      ) : null}
      {label ? (
        <span data-sign="backButtonLabel" className={styles.backLabel}>
          {label}
        </span>
      ) : null}
    </span>
  );
};
BackButton.defaultProps = {
  label: undefined,
  showIcon: true,
};
export default BackButton;
