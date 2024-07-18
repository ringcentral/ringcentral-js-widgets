import clsx from 'clsx';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

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
      className={clsx(styles.root, open ? styles.active : null, className)}
      style={style}
    >
      {children}
    </div>
  );
};
