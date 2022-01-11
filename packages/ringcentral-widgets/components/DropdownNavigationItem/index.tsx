import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type DropdownNavigationItemProps = {
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
  active?: boolean;
  isReverseFillIcon?: boolean;
  label?: string;
  title?: string;
  noticeCounts?: number;
  onClick?: (...args: any[]) => any;
  keepStyle?: boolean;
  dataSign?: string;
};

const DropdownNavigationItem: React.SFC<DropdownNavigationItemProps> = ({
  icon,
  activeIcon,
  active,
  isReverseFillIcon,
  label,
  title,
  noticeCounts,
  onClick,
  keepStyle,
  dataSign,
}) => {
  let notice = null;
  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = <div className={styles.notice}>99+</div>;
    } else {
      notice = <div className={styles.notice}>{noticeCounts}</div>;
    }
  }
  const styleClass = !keepStyle ? styles.iconStyles : null;
  return (
    <div
      title={title || label}
      data-sign={dataSign}
      onClick={onClick}
      className={classnames(
        styles.root,
        active && styles.active,
        isReverseFillIcon && styles.reverseFillIcon,
      )}
    >
      <div className={classnames(styles.iconHolder, styleClass)}>
        {active ? activeIcon : icon}
      </div>
      <div className={styles.labelHolder}>{label}</div>
      {notice}
    </div>
  );
};
DropdownNavigationItem.defaultProps = {
  active: false,
  isReverseFillIcon: false,
  label: undefined,
  title: undefined,
  noticeCounts: undefined,
  onClick: undefined,
  keepStyle: false,
};
export default DropdownNavigationItem;
