import React, { FunctionComponent } from 'react';

import classNames from 'classnames';
import formatMessage from 'format-message';

import Loglink from './assets/loglink.svg';
import i18n from './i18n';
import styles from './styles.scss';

export interface LogLinkButtonProps {
  crmName: string;
  onClick: () => any;
  disabled: boolean;
}

const LogLinkButton: FunctionComponent<LogLinkButtonProps> = ({
  crmName,
  onClick,
  disabled,
}) => {
  const onClickFunc = (e) => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    onClick();
  };
  const toolTip = formatMessage(i18n.getString('toolTip'), {
    crmName,
  });
  return (
    <div
      className={classNames(styles.logLink, disabled ? styles.disabled : null)}
      onClick={onClickFunc}
      title={toolTip}
    >
      <Loglink />
    </div>
  );
};

LogLinkButton.defaultProps = {
  crmName: '',
  onClick: () => {},
  disabled: true,
};

export default LogLinkButton;
