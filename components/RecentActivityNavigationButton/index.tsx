import React from 'react';

import classnames from 'classnames';

import { StyledTab } from '../MessageTabButton/MessageTabButton';
import styles from './styles.scss';

type NavigationButtonProps = {
  icon: React.ReactNode;
  active?: boolean;
  label?: string;
  noticeCounts?: number;
  width: number | string;
  onClick?: (...args: any[]) => any;
};

const NavigationButton: React.FC<NavigationButtonProps> = ({
  active,
  icon,
  label,
  noticeCounts,
  onClick,
  width,
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
    <StyledTab
      onClick={onClick}
      className={classnames(styles.navigationButton)}
      // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
      $active={active}
      style={{
        width,
      }}
    >
      <div className={styles.iconHolder} title={label}>
        <div className={styles.icon}>{icon}</div>
        {notice}
      </div>
    </StyledTab>
  );
};

NavigationButton.defaultProps = {
  active: false,
  label: undefined,
  noticeCounts: undefined,
  onClick: undefined,
};

export default NavigationButton;
