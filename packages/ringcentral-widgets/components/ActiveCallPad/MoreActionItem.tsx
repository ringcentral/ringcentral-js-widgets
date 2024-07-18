import clsx from 'clsx';
import React from 'react';

import styles from './styles.scss';

type MoreActionItemProps = {
  title: string;
  icon: (...args: any[]) => any;
  disabled: boolean;
  onClick: (...args: any[]) => any;
  dataSign?: string;
};
const MoreActionItem: React.FC<MoreActionItemProps> = ({
  title,
  icon: Icon,
  disabled,
  onClick,
  dataSign,
}) => {
  const iconClassName = clsx(
    styles.buttonIcon,
    disabled ? styles.buttonDisabled : styles.buttonActive,
  );
  return (
    // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | null' is not ass... Remove this comment to see the full error message
    <div className={styles.buttonItem} onClick={disabled ? null : onClick}>
      <div className={iconClassName} data-sign={dataSign}>
        <Icon />
      </div>
      <div className={styles.buttonName}>{title}</div>
    </div>
  );
};
MoreActionItem.defaultProps = {
  dataSign: '',
};
export default MoreActionItem;
