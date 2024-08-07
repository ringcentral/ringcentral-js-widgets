import clsx from 'clsx';
import type {
  ComponentType,
  DOMAttributes,
  FunctionComponent,
  ReactElement,
} from 'react';
import React from 'react';

import { Tooltip } from '../Rcui/Tooltip';

import styles from './styles.scss';

type NavigationButtonIconProps = {
  currentPath?: string;
};

export type NavigationButtonIcon =
  | ReactElement
  | ComponentType<NavigationButtonIconProps>;

export interface NavigationButtonProps {
  icon: NavigationButtonIcon;
  activeIcon: NavigationButtonIcon;
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
  id?: string;
  tooltipForceHide?: boolean;
  dataSign?: string;
}

export const NavigationButton: FunctionComponent<NavigationButtonProps> = ({
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
  id,
  tooltipForceHide,
  dataSign,
}) => {
  let notice = null;
  if (noticeCounts && noticeCounts > 0) {
    if (noticeCounts > 99) {
      notice = (
        <div className={styles.notices} data-sign="navigationNoticeCount">
          99+
        </div>
      );
    } else {
      notice = (
        <div className={styles.notice} data-sign="navigationNoticeCount">
          {noticeCounts}
        </div>
      );
    }
  }

  return (
    <div
      onClick={onClick}
      className={clsx(styles.navigationButton, active && styles.active)}
      style={{
        width,
        height,
      }}
      id={id}
    >
      <Tooltip title={label} tooltipForceHide={tooltipForceHide}>
        <div className={styles.iconHolder} data-sign={dataSign ?? label}>
          <div
            className={clsx(
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
      </Tooltip>
    </div>
  );
};

NavigationButton.defaultProps = {
  active: false,
  keepStyle: false,
};

export default NavigationButton;
