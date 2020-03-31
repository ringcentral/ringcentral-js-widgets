import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import telephonyStatuses from 'ringcentral-integration/enums/telephonyStatus';
import callDirections from 'ringcentral-integration/enums/callDirections';
import CloseIcon from '../../assets/images/CloseIcon.svg';
import { Button } from '../Button';
import LogNotification from '../LogNotificationV2';

import styles from './styles.scss';
import i18n from './i18n';

export default class NotificationSection extends Component {
  componentWillUpdate(nextProps) {
    const {
      logNotification,
      onCloseNotification,
      currentNotificationIdentify,
    } = nextProps;
    if (currentNotificationIdentify) {
      const { call = {} } = logNotification;
      const { result } = call;
      if (result) {
        onCloseNotification();
      }
    }
  }

  renderLogSection() {
    const {
      formatPhone,
      currentLocale,
      logNotification,
      showNotiLogButton,
      onCloseNotification,
      onSaveNotification,
      onExpandNotification,
      onDiscardNotification,
      currentNotificationIdentify,
      currentSession,
      onReject,
      onHangup,
      shrinkNotification,
    } = this.props;
    const { call } = logNotification;
    const { result, telephonyStatus } = call;
    const status = result || telephonyStatus;
    let statusI18n = null;
    const isIncomingCall =
      status === telephonyStatuses.ringing &&
      call.direction === callDirections.inbound;
    if (isIncomingCall) {
      statusI18n = i18n.getString('ringing', currentLocale);
    } else {
      statusI18n = i18n.getString('callConnected', currentLocale);
    }
    return (
      <div className={classnames(styles.root)}>
        <div className={styles.notificationModal}>
          <div className={styles.modalHeader}>
            <div className={styles.modalTitle}>{statusI18n}</div>
            <div className={styles.modalCloseBtn}>
              <Button dataSign="closeButton" onClick={onCloseNotification}>
                <CloseIcon />
              </Button>
            </div>
          </div>
          <LogNotification
            showEndButton
            showLogButton={showNotiLogButton}
            currentLocale={currentLocale}
            formatPhone={formatPhone}
            currentLog={logNotification}
            isExpand={logNotification.notificationIsExpand}
            onSave={onSaveNotification}
            onExpand={onExpandNotification}
            onDiscard={onDiscardNotification}
            onReject={() => onReject(currentNotificationIdentify)}
            onHangup={() => onHangup(currentNotificationIdentify)}
            currentSession={currentSession}
            shrinkNotification={shrinkNotification}
          />
        </div>
      </div>
    );
  }

  render() {
    return this.renderLogSection();
  }
}

NotificationSection.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  formatPhone: PropTypes.func.isRequired,
  // - Notification
  logNotification: PropTypes.object,
  onCloseNotification: PropTypes.func,
  onDiscardNotification: PropTypes.func,
  onSaveNotification: PropTypes.func,
  onExpandNotification: PropTypes.func,
  showNotiLogButton: PropTypes.bool,
  currentNotificationIdentify: PropTypes.string,
  currentSession: PropTypes.object,
  onReject: PropTypes.func.isRequired,
  onHangup: PropTypes.func.isRequired,
  shrinkNotification: PropTypes.func,
};

NotificationSection.defaultProps = {
  // Notification
  logNotification: undefined,
  onCloseNotification: undefined,
  onDiscardNotification: undefined,
  onSaveNotification: undefined,
  onExpandNotification: undefined,
  showNotiLogButton: true,
  currentNotificationIdentify: '',
  currentSession: undefined,
  shrinkNotification: undefined,
};
