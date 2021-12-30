import React, { Component } from 'react';

import classnames from 'classnames';

import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';

import CloseIcon from '../../assets/images/CloseIcon.svg';
import { Button } from '../Button';
import LogNotification from '../LogNotificationV2';
import i18n from './i18n';
import styles from './styles.scss';

type NotificationSectionProps = {
  currentLocale: string;
  formatPhone: (...args: any[]) => any;
  logNotification?: object;
  onCloseNotification?: (...args: any[]) => any;
  onDiscardNotification?: (...args: any[]) => any;
  onSaveNotification?: (...args: any[]) => any;
  onExpandNotification?: (...args: any[]) => any;
  showNotiLogButton?: boolean;
  currentNotificationIdentify?: string;
  currentSession?: object;
  onReject: (...args: any[]) => any;
  onHangup: (...args: any[]) => any;
  shrinkNotification?: (...args: any[]) => any;
};
class NotificationSection extends Component<NotificationSectionProps, {}> {
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
export default NotificationSection;
