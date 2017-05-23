import React, { PropTypes } from 'react';

import Badge from '../Badge';
import i18n from './i18n';

export default function OfflineModeBadge({
  className,
  offline,
  currentLocale,
  showOfflineAlert,
}) {
  if (offline) {
    return (
      <Badge
        className={className}
        name={'offline'}
        onClick={showOfflineAlert}
      >
        {i18n.getString('offlineMode', currentLocale)}
      </Badge>
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
