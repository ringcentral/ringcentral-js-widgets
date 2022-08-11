import React from 'react';

import classnames from 'classnames';

import MessagesLog from '../../assets/images/MessagesLog.svg';
import i18n from './i18n';
import styles from './styles.scss';

type MessagesLogIconProps = {
  currentLocale: string;
  disabled?: boolean;
  onClick?: (...args: any[]) => any;
};

const MessagesLogIcon: React.FC<MessagesLogIconProps> = ({
  disabled,
  onClick,
  currentLocale,
}) => {
  const tooltip = i18n.getString('log', currentLocale);
  return (
    <div
      className={classnames(
        styles.messageLog,
        disabled && styles.disabledMessageLog,
      )}
      onClick={(e) => {
        e.stopPropagation();
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        if (!disabled) onClick();
      }}
      data-sign="smsLog"
      title={tooltip}
    >
      <MessagesLog className={styles.logIcon} />
    </div>
  );
};

MessagesLogIcon.defaultProps = {
  disabled: false,
  onClick() {},
};

export default MessagesLogIcon;
