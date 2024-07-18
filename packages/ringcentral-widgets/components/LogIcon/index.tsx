import clsx from 'clsx';
import React from 'react';

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
const LogIcon: React.FC<LogIconProps> = ({
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
  const onClick = (e: any) => {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    viewTask({
      sessionId,
      id,
    });
  };
  const logIconClassName = clsx(
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
      aria-disabled={disabled ? 'true' : 'false'}
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
