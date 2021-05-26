import React, { MouseEvent, FunctionComponent } from 'react';
import classnames from 'classnames';
import RemoveIcon from '../../assets/images/RemoveIcon.svg';
import DeleteCircleIcon from '../../assets/images/DeleteCircle.svg';

import styles from './styles.scss';

export interface RemoveButtonProps {
  className?: string;
  visibility?: boolean;
  onClick: (ev: MouseEvent) => void;
  showWarningIcon?: boolean;
}

export const RemoveButton: FunctionComponent<RemoveButtonProps> = ({
  className,
  onClick,
  visibility,
  showWarningIcon = false,
}) => {
  return (
    <span
      data-sign="removeBtn"
      className={classnames(
        styles.container,
        className,
        !visibility && styles.hideRemoveButton,
      )}
      onClick={visibility ? onClick : null}
    >
      {showWarningIcon ? (
        <DeleteCircleIcon className={styles.deleteIcon} />
      ) : (
        <RemoveIcon className={styles.icon} />
      )}
    </span>
  );
};

RemoveButton.defaultProps = {
  className: null,
  visibility: true,
};
