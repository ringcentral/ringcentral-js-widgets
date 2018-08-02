import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { path } from 'ramda';
import UnloggedIcon from '../../assets/images/UnloggedIcon.svg';
import LoggedIcon from '../../assets/images/LoggedIcon.svg';
import i18n from './i18n';
import styles from './styles.scss';


export default function LogIcon(
  {
    sessionId,
    id,
    viewTask,
    isSaving,
    currentLocale,
    disabled,
    isFax,
    call,
  }
) {
  const loggedIcon = <LoggedIcon width={19} className={styles.loggedIcon} />;
  const unLoggedIcon = <UnloggedIcon width={19} className={styles.unloggedIcon} />;
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
      ...call,
      sessionId,
      id,
      viewTask,
      isSaving,
      currentLocale,
      disabled,
      isFax,
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
      title={tooltip}>
      {id ? loggedIcon : unLoggedIcon}
    </div>
  );
}

LogIcon.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  sessionId: PropTypes.string,
  id: PropTypes.string,
  viewTask: PropTypes.func,
  isSaving: PropTypes.bool,
  disabled: PropTypes.bool,
  isFax: PropTypes.bool,
  call: PropTypes.shape({
    direction: PropTypes.string.isRequired,
    telephonyStatus: PropTypes.string,
    startTime: PropTypes.number.isRequired,
    activityMatches: PropTypes.array.isRequired,
    fromMatches: PropTypes.array.isRequired,
    toMatches: PropTypes.array.isRequired,
    from: PropTypes.shape({
      phoneNumber: PropTypes.string,
      extensionNumber: PropTypes.string,
      name: PropTypes.string,
    }),
    to: PropTypes.shape({
      phoneNumber: PropTypes.string,
      extensionNumber: PropTypes.string,
      name: PropTypes.string,
    }),
    webphoneSession: PropTypes.object,
  }),
};

LogIcon.defaultProps = {
  sessionId: undefined,
  id: undefined,
  viewTask: undefined,
  isSaving: false,
  disabled: false,
  isFax: false,
  call: undefined,
};
