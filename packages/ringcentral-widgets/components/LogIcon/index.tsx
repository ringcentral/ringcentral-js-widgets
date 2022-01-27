import React from 'react';

import classnames from 'classnames';

import LoggedIcon from '../../assets/images/LoggedIcon.svg';
import UnloggedIcon from '../../assets/images/UnloggedIcon.svg';
import i18n from './i18n';
import styles from './styles.scss';

type LogIconProps = {
  currentLocale: string;
  sessionId?: string;
  id?: string;
  viewTask?: (...args: any[]) => any;
  isSaving?: boolean;
  disabled?: boolean;
  isFax?: boolean;
};
const LogIcon: React.SFC<LogIconProps> = ({
  sessionId,
  id,
  viewTask,
  isSaving,
  currentLocale,
  disabled,
  isFax,
}) => {
  const loggedIcon = <LoggedIcon width={19} className={styles.loggedIcon} />;
  const unLoggedIcon = (
    <UnloggedIcon width={19} className={styles.unloggedIcon} />
  );
  let tooltip = null;
  if (isFax) {
    tooltip = i18n.getString('faxNotSupported', currentLocale);
  } else {
    tooltip = i18n.getString(id ? 'logged' : 'unlogged', currentLocale);
  }
  const onClick = (e) => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    viewTask({
      sessionId,
      id,
    });
  };
  const logIconClassName = classnames(
    styles.logIcon,
    isSaving ? styles.isSaving : null,
    disabled ? styles.disabled : null,
  );
  return (
    <div
      className={logIconClassName}
      onClick={onClick}
      title={tooltip}
      data-sign="log"
    >
      {id ? loggedIcon : unLoggedIcon}
    </div>
  );
};
LogIcon.defaultProps = {
  sessionId: undefined,
  id: undefined,
  viewTask: undefined,
  isSaving: false,
  disabled: false,
  isFax: false,
};
export default LogIcon;