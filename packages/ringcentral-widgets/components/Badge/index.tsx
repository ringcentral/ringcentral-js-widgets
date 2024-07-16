import clsx from 'clsx';
import React from 'react';

import styles from './styles.scss';

type BadgeProps = {
  onClick?: (...args: any[]) => any;
  className?: string;
  name: string;
  dataSign?: string;
};
const Badge: React.FC<BadgeProps> = ({
  className,
  name,
  children,
  onClick,
  dataSign,
}) => {
  return (
    <div
      data-sign={dataSign}
      title={name}
      className={clsx(styles.root, className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
Badge.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  className: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  name: null,
  onClick: () => null,
};
export default Badge;
