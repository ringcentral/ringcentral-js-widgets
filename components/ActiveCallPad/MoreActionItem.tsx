import React from 'react';

import classnames from 'classnames';

import styles from './styles.scss';

type MoreActionItemProps = {
  title: string;
  icon: (...args: any[]) => any;
  disabled: boolean;
  onClick: (...args: any[]) => any;
  dataSign?: string;
};
const MoreActionItem: React.SFC<MoreActionItemProps> = ({
  title,
  icon: Icon,
  disabled,
  onClick,
  dataSign,
}) => {
  const iconClassName = classnames(
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
