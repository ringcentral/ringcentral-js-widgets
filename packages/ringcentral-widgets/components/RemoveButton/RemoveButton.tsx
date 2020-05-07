import React, { MouseEvent, FunctionComponent } from 'react';
import classnames from 'classnames';
import rcFont from '../../assets/RcFont/RcFont.scss';
import styles from './styles.scss';

export interface RemoveButtonProps {
  className?: string;
  visibility?: boolean;
  onClick: (ev: MouseEvent) => void;
}

export const RemoveButton: FunctionComponent<RemoveButtonProps> = ({
  className,
  onClick,
  visibility,
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
      <i className={rcFont.uni2471} />
    </span>
  );
};

RemoveButton.defaultProps = {
  className: null,
  visibility: true,
};
