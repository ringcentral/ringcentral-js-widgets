import React, { FunctionComponent, MouseEvent } from 'react';

import classnames from 'classnames';

import DeleteCircleIcon from '../../assets/images/DeleteCircle.svg';
import RemoveIcon from '../../assets/images/RemoveIcon.svg';
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
      // @ts-expect-error TS(2322): Type '((ev: MouseEvent<Element, MouseEvent>) => vo... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  visibility: true,
};
