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
    currentLocale
  }
) {
  const loggedIcon = <LoggedIcon width={23} className={styles.loggedIcon} />;
  const unLoggedIcon = <UnloggedIcon width={23} className={styles.unloggedIcon} />;
  const tooltip = i18n.getString(id ? 'logged' : 'unlogged', currentLocale);
  const onClick = (e) => {
    e.stopPropagation();
    viewTask({
      sessionId,
      id
    });
  };
  const logIconClassName = classnames(
    styles.logIcon,
    isSaving ? styles.isSaving : null
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
  isSaving: PropTypes.bool
};

LogIcon.defaultProps = {
  sessionId: undefined,
  id: undefined,
  viewTask: undefined,
  isSaving: false,
};
