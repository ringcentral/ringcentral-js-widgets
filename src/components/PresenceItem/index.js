import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import dndStatus from 'ringcentral-integration/modules/Presence/dndStatus';

import PresenceStatusIcon from '../PresenceStatusIcon';
import styles from './styles.scss';
import i18n from './i18n';

export function getPresenceStatusName(
  currentUserStatus,
  currentDndStatus,
  currentLocale
) {
  if (currentDndStatus === dndStatus.doNotAcceptAnyCalls) {
    return i18n.getString(currentDndStatus, currentLocale);
  }
  return i18n.getString(currentUserStatus, currentLocale);
}

export default function PresenceItem(props) {
  const className = classnames(
    styles.root,
    props.selected ? styles.selected : null,
    props.className,
  );
  const name = getPresenceStatusName(
    props.userStatus,
    props.dndStatus,
    props.currentLocale
  );
  return (
    <a className={className} onClick={props.onClick}>
      <PresenceStatusIcon
        className={styles.statusIcon}
        userStatus={props.userStatus}
        dndStatus={props.dndStatus}
      />
      <span>
        {name}
      </span>
    </a>
  );
}

PresenceItem.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  userStatus: PropTypes.string.isRequired,
  dndStatus: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  currentLocale: PropTypes.string.isRequired,
};

PresenceItem.defaultProps = {
  dndStatus: null,
  className: null,
};
