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
  className: null,
  name: null,
  onClick: () => null,
};
export default Badge;
