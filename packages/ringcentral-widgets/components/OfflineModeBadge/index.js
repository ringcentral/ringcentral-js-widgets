import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Draggable from '../Draggable';
import Badge from '../Badge';
import i18n from './i18n';
import styles from './styles.scss';

export default function OfflineModeBadge({
  className,
  offline,
  badgeTitle,
  currentLocale,
  showOfflineAlert,
}) {
  if (offline) {
    return (
      <Draggable className={styles.root}>
        <Badge
          className={classnames(className, styles.badge)}
          name={i18n.getString(badgeTitle, currentLocale)}
          onClick={showOfflineAlert}
        >
          {i18n.getString(badgeTitle, currentLocale)}
        </Badge>
      </Draggable>
    );
  }
  return null;
}

OfflineModeBadge.propTypes = {
  offline: PropTypes.bool.isRequired,
  badgeTitle: PropTypes.string,
  showOfflineAlert: PropTypes.func.isRequired,
  currentLocale: PropTypes.string.isRequired,
  className: PropTypes.string,
};

OfflineModeBadge.defaultProps = {
  className: null,
  badgeTitle: 'offlineMode',
};
