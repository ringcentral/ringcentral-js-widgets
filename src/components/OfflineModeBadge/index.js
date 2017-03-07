import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './styles.scss';
import i18n from './i18n';

export default function OfflineModeBadge({
  className,
  offline,
  currentLocale,
  showOfflineAlert,
}) {
  if (offline) {
    return (
      <a
        href="#offline-badge"
        className={classnames(styles.root, className)}
        onClick={showOfflineAlert} >
        {i18n.getString('offlineMode', currentLocale)}
      </a>
    );
  }
  return null;
}

OfflineModeBadge.propTypes = {
  offline: PropTypes.bool.isRequired,
  showOfflineAlert: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
};

OfflineModeBadge.defaultProps = {
  className: null,
};
