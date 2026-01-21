/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-static-element-interactions */
import DeleteCircleIcon from '@ringcentral-integration/widgets/assets/images/DeleteCircle.svg';
import RemoveIcon from '@ringcentral-integration/widgets/assets/images/RemoveIcon.svg';
import clsx from 'clsx';
import type { FunctionComponent, MouseEvent } from 'react';
import React from 'react';

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
      className={clsx(
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
