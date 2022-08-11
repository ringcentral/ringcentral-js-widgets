import React from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import telephonyStatuses from '@ringcentral-integration/commons/enums/telephonyStatus';
import { RcMenuItem, RcMenuList, RcPopover } from '@ringcentral/juno';

import dynamicsFont from '../../assets/DynamicsFont/DynamicsFont.scss';
import EndIcon from '../../assets/images/Hangup.svg';
import LogClickIcon from '../../assets/images/LogClick.svg';
import LogUnclickIcon from '../../assets/images/LogUnclick.svg';
import VoicemailRed from '../../assets/images/VoicemailRed.svg';
import { Button } from '../Button';
import callControlI18n from '../SmCallControl/i18n';
import i18n from './i18n';
import styles from './styles.scss';

const viewport = document.querySelector('div#viewport');
const CallIcon = ({ title, iconClassName }: any) => (
  <span className={classnames(iconClassName, styles.iconSize)} title={title} />
);

CallIcon.propTypes = {
  title: PropTypes.string,
  iconClassName: PropTypes.string.isRequired,
};

CallIcon.defaultProps = {
  title: '',
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
}: any) => {
  const anchorEl = React.useRef(null);
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
              tooltip={callControlI18n.getString(endTitle, currentLocale)}
              onClick={endAction}
              className={classnames(styles.endBtn, styles.actionItem)}
            >
              {isRinging ? <VoicemailRed /> : <EndIcon />}
            </Button>
          );
        }
      : null;
  const renderLogButton = showLogButton
    ? () => {
        return (
          <>
            <div ref={anchorEl}>
              <Button
                tooltip={i18n.getString('log', currentLocale)}
                disabled={isExpand}
                onClick={() => onExpand()}
                className={classnames(styles.logBtn, styles.actionItem)}
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
              container={viewport}
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
          <p className={styles.contactName}>{logName}</p>
          <p className={styles.phoneNumber}>{formatNumber}</p>
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
