import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
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
    isFax
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
      sessionId,
      id
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
  isFax: PropTypes.bool
};

LogIcon.defaultProps = {
  sessionId: undefined,
  id: undefined,
  viewTask: undefined,
  isSaving: false,
  disabled: false,
  isFax: false
};
