import React from 'react';

import classnames from 'classnames';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import styles from './styles.scss';

type BackButtonProps = {
  label?: string;
  showIcon?: boolean;
};
const BackButton: React.SFC<BackButtonProps> = ({ label, showIcon }) => {
  return (
    <span className={styles.backButton}>
      {showIcon ? (
        <i
          data-sign="backButton"
          className={classnames(dynamicsFont.arrow, styles.backIcon)}
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
