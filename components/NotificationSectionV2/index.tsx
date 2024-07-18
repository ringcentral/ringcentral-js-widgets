import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import clsx from 'clsx';
import React, { Component } from 'react';

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
  showLogOptions?: boolean;
};
class NotificationSection extends Component<NotificationSectionProps, {}> {
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillUpdate(nextProps: any) {
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
      showLogOptions,
    } = this.props;
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'object | u... Remove this comment to see the full error message
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
      <div className={clsx(styles.root)}>
        <div className={styles.notificationModal} data-sign="notificationModal">
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
            // @ts-expect-error TS(2532): Object is possibly 'undefined'.
            isExpand={logNotification.notificationIsExpand}
            onSave={onSaveNotification}
            onExpand={onExpandNotification}
            onDiscard={onDiscardNotification}
            onReject={() => onReject(currentNotificationIdentify)}
            onHangup={() => onHangup(currentNotificationIdentify)}
            currentSession={currentSession}
            shrinkNotification={shrinkNotification}
            showLogOptions={showLogOptions}
          />
        </div>
      </div>
    );
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    return this.renderLogSection();
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
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
