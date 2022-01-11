import React, { FunctionComponent, HTMLAttributes } from 'react';

import classNames from 'classnames';

import styles from './styles.scss';

type AnimationPanelProps = {
  open: boolean;
  className?: string;
} & Pick<HTMLAttributes<HTMLDivElement>, 'style'>;
export const AnimationPanel: FunctionComponent<AnimationPanelProps> = ({
  children,
  className,
  open,
  style,
}) => {
  return (
    <div
      className={classNames(
        styles.root,
        open ? styles.active : null,
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
};
