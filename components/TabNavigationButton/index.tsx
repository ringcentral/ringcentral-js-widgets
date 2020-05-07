import classnames from 'classnames';
import React, { DOMAttributes, FunctionComponent, ReactNode } from 'react';

import styles from './styles.scss';

export interface NavigationButtonProps {
  icon: ReactNode;
  activeIcon: ReactNode;
  active?: boolean;
  label: string;
  noticeCounts?: number;
  width: number | string;
  height: number | string;
  onClick: DOMAttributes<HTMLDivElement>['onClick'];
  keepStyle: boolean;
  activeClassName: string;
  inActiveClassName: string;
  className?: string;
}

const NavigationButton: FunctionComponent<NavigationButtonProps> = ({
  active,
  activeIcon,
  icon,
  label,
  noticeCounts,
  onClick,
  width,
  height,
  keepStyle,
  className,
  activeClassName,
  inActiveClassName,
}) => {
  let notice = null;
  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = <div className={styles.notices}>99+</div>;
    } else {
      notice = <div className={styles.notice}>{noticeCounts}</div>;
    }
  }

  return (
    <div
      onClick={onClick}
      className={classnames(styles.navigationButton, active && styles.active)}
      style={{
        width,
        height,
      }}
    >
      <div className={styles.iconHolder} title={label} data-sign={label}>
        <div
          className={classnames(
            styles.icon,
            !keepStyle ? styles.iconStyles : null,
            className,
            active ? activeClassName : inActiveClassName,
          )}
        >
          {active ? activeIcon : icon}
        </div>
        {notice}
      </div>
    </div>
  );
};

NavigationButton.defaultProps = {
  active: false,
  keepStyle: false,
};

export default NavigationButton;
