import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import {
  RcMenuItem,
  RcMenuList,
  RcPopover,
  useResultRef,
} from '@ringcentral/juno';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import EndIcon from '../../assets/images/Hangup.svg';
import LogClickIcon from '../../assets/images/LogClick.svg';
import LogUnclickIcon from '../../assets/images/LogUnclick.svg';
import VoicemailRed from '../../assets/images/VoicemailRed.svg';
import { Button } from '../Button';

import i18n from './i18n';
import styles from './styles.scss';

const CallIcon = ({ title, iconClassName }: any) => (
  <span className={clsx(iconClassName, styles.iconSize)} title={title} />
);

CallIcon.propTypes = {
  title: PropTypes.string,
  iconClassName: PropTypes.string,
};

CallIcon.defaultProps = {
  title: '',
  iconClassName: '',
};

const callIconMap = {
  [callDirections.inbound]: dynamicsFont.inbound,
  [callDirections.outbound]: dynamicsFont.outbound,
};
const LogNotification = ({
  formatPhone,
  currentLog,
  currentLocale,
  showLogButton,
  isExpand,
  onDiscard,
  onSave,
  onExpand,
  currentSession,
  onReject,
  onHangup,
  showEndButton = true,
  shrinkNotification,
  showLogOptions = true,
}: any) => {
  const anchorEl = React.useRef(null);
  const viewport = useResultRef(() => document.querySelector('div#viewport'));

  const renderEndButton =
    showEndButton && currentSession
      ? () => {
          const { callStatus, direction } = currentSession;
          const isInComingCall =
            callDirections.inbound === direction &&
            telephonyStatuses.ringing === callStatus;
          const endTitle = isInComingCall
            ? i18n.getString('reject', currentLocale)
            : i18n.getString('hangup', currentLocale);
          const endAction = isInComingCall ? onReject : onHangup;
          const isRinging = telephonyStatuses.ringing === callStatus;
          return (
            <Button
              tooltip={endTitle}
              onClick={endAction}
              className={clsx(styles.endBtn, styles.actionItem)}
            >
              {isRinging ? <VoicemailRed /> : <EndIcon />}
            </Button>
          );
        }
      : null;
  const renderLogButton = showLogButton
    ? () => {
        if (showLogOptions) {
          return (
            <>
              <div ref={anchorEl}>
                <Button
                  tooltip={i18n.getString('log', currentLocale)}
                  disabled={isExpand}
                  onClick={() => onExpand()}
                  className={clsx(styles.logBtn, styles.actionItem)}
                >
                  {!isExpand ? <LogUnclickIcon /> : <LogClickIcon />}
                </Button>
              </div>
              <RcPopover
                open={!!anchorEl.current && isExpand}
                anchorEl={anchorEl.current}
                onClose={() => shrinkNotification()}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                closeAfterTransition
                container={viewport.current}
                className={styles.modalAnimation}
              >
                <RcMenuList>
                  <RcMenuItem
                    onClick={() => onSave()}
                    className={styles.menuItem}
                  >
                    {i18n.getString('save', currentLocale)}
                  </RcMenuItem>
                  <RcMenuItem
                    onClick={() => onDiscard()}
                    className={styles.menuItem}
                  >
                    {i18n.getString('discard', currentLocale)}
                  </RcMenuItem>
                </RcMenuList>
              </RcPopover>
            </>
          );
        }
        return (
          <div ref={anchorEl}>
            <Button
              tooltip={i18n.getString(
                'saveDraftAndCreateNewLog',
                currentLocale,
              )}
              onClick={() => onDiscard()}
              className={clsx(styles.logBtn, styles.actionItem)}
              dataSign="saveDraftAndCreateNewLog"
            >
              <LogUnclickIcon />
            </Button>
          </div>
        );
      }
    : null;

  const { call, logName } = currentLog;
  const { direction, to, from } = call;
  const callIconTitle =
    direction === 'Inbound'
      ? i18n.getString('Inbound', currentLocale)
      : i18n.getString('Outbound', currentLocale);
  const number =
    direction === callDirections.outbound
      ? to && (to.phoneNumber || to.extensionNumber)
      : from && (from.phoneNumber || from.extensionNumber);
  const formatNumber = formatPhone(number);
  return (
    <div className={styles.container}>
      <div className={styles.callInfo}>
        <div className={styles.callIcon}>
          <CallIcon
            title={callIconTitle}
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            iconClassName={callIconMap[direction]}
          />
        </div>
        <div className={styles.contactInfo}>
          <p className={styles.contactName} data-sign="logNotificationContactName">{logName}</p>
          <p
            className={styles.phoneNumber}
            data-sign="logNotificationPhoneNumber"
          >
            {formatNumber}
          </p>
        </div>
        <div className={styles.callActions}>
          {renderLogButton && renderLogButton()}
          {renderEndButton && renderEndButton()}
        </div>
      </div>
    </div>
  );
};

LogNotification.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  showLogButton: PropTypes.bool,
  currentLog: PropTypes.object,
  formatPhone: PropTypes.func,
  isExpand: PropTypes.bool,
  onDiscard: PropTypes.func,
  onSave: PropTypes.func,
  onExpand: PropTypes.func,
  currentSession: PropTypes.object,
  onReject: PropTypes.func,
  onHangup: PropTypes.func,
  showEndButton: PropTypes.bool,
  shrinkNotification: PropTypes.func,
  showLogOptions: PropTypes.bool,
};

LogNotification.defaultProps = {
  showLogButton: true,
  currentLog: {},
  formatPhone: undefined,
  isExpand: undefined,
  onDiscard: undefined,
  onSave: undefined,
  onExpand: undefined,
  currentSession: undefined,
  onReject: () => null,
  onHangup: () => null,
  showEndButton: false,
  shrinkNotification: undefined,
};

export default LogNotification;
