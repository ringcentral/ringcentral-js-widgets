import clsx from 'clsx';
import React from 'react';

import styles from './styles.scss';

type LineProps = {
  dataSign?: string;
  className?: string;
  onClick?: (...args: any[]) => any;
  horizontal?: boolean;
  noBorder?: boolean;
};

const Line: React.FC<LineProps> = ({
  dataSign,
  className,
  onClick,
  horizontal,
  noBorder,
  children,
}) => {
  return (
    <div
      data-sign={dataSign}
      className={clsx(
        styles.root,
        className,
        onClick && styles.clickable,
        horizontal && styles.horizontal,
        noBorder && styles.noborder,
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Line;
