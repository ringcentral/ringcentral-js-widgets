import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type BadgeProps = {
  onClick?: (...args: any[]) => any;
  className?: string;
  name: string;
};
const Badge: React.SFC<BadgeProps> = ({
  className,
  name,
  children,
  onClick,
}) => {
  return (
    <div
      title={name}
      className={classnames(styles.root, className)}
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
