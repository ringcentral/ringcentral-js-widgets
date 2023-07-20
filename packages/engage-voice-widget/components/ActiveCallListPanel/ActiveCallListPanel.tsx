import type { FunctionComponent } from 'react';
import React from 'react';

import classNames from 'classnames';

import type {
  EvActiveCallListUIFunctions,
  EvActiveCallListUIProps,
} from '../../interfaces';
import { formatPhoneNumber } from '../../lib/FormatPhoneNumber';
import { BackHeader } from '../SelectList';
import {
  HangUpButton,
  HoldCallButton,
  MuteCallButton,
} from '../SmallCallControl';
import i18n from './i18n';
import styles from './styles.scss';

export type ActiveCallListPanelProps = EvActiveCallListUIProps &
  EvActiveCallListUIFunctions;

const ActiveCallListPanel: FunctionComponent<ActiveCallListPanelProps> = ({
  currentLocale,
  isOnMute,
  showMuteButton,
  callList,
  goBack,
  onHangup,
  onUnHold,
  onHold,
  onMute,
  onUnmute,
  userName,
  isInbound,
}) => {
  const callListRender = () => {
    if (callList.length < 2) return null;
    const [everyoneCaller, ownCall, ...transferCalls] = callList;
    return (
      <>
        <div className={styles.item} data-sign="callItem">
          <span className={styles.emphasisCallInfo}>
            {i18n.getString('everyone', currentLocale)}
          </span>
          <div className={styles.controlButtons}>
            <HangUpButton
              currentLocale={currentLocale}
              onHangup={() => onHangup(everyoneCaller)}
              className={styles.button}
              size="small"
            />
          </div>
        </div>
        <div className={styles.item} data-sign="callItem">
          <span className={classNames(styles.otherCallInfo, styles.children)}>
            {formatPhoneNumber({
              phoneNumber: everyoneCaller.session.phone,
              currentLocale,
            })}
            {`(${i18n.getString(
              isInbound ? 'caller' : 'callee',
              currentLocale,
            )})`}
          </span>
          <div className={styles.controlButtons}>
            <HoldCallButton
              currentLocale={currentLocale}
              isOnHold={everyoneCaller.isHold}
              onUnHold={() => onUnHold(everyoneCaller)}
              onHold={() => onHold(everyoneCaller)}
              className={styles.button}
              size="small"
            />
            <HangUpButton
              currentLocale={currentLocale}
              onHangup={() => onHangup(everyoneCaller)}
              className={styles.button}
              size="small"
            />
          </div>
        </div>
        <div className={styles.item} data-sign="callItem">
          <span
            className={classNames(styles.emphasisCallInfo, styles.children)}
          >
            {`${ownCall.agentName || userName || ''}(${i18n.getString(
              'me',
              currentLocale,
            )})`}
          </span>
          <div className={styles.controlButtons}>
            {showMuteButton && (
              <MuteCallButton
                isOnMute={isOnMute}
                onMute={onMute}
                onUnmute={onUnmute}
                currentLocale={currentLocale}
                className={styles.button}
                size="small"
              />
            )}
            <HangUpButton
              currentLocale={currentLocale}
              onHangup={() => onHangup(ownCall)}
              className={styles.button}
              size="small"
            />
          </div>
        </div>
        {transferCalls.map((callItem, key) => {
          const destination =
            callItem.session.transferSessions?.[callItem.session.sessionId]
              ?.destination;
          return (
            <div className={styles.item} data-sign="callItem" key={key}>
              <span
                className={classNames(styles.otherCallInfo, styles.children)}
              >
                {formatPhoneNumber({
                  phoneNumber: destination,
                  currentLocale,
                })}
              </span>
              <div className={styles.controlButtons}>
                <HoldCallButton
                  currentLocale={currentLocale}
                  isOnHold={callItem.isHold}
                  onUnHold={() => onUnHold(callItem)}
                  onHold={() => onHold(callItem)}
                  className={styles.button}
                  size="small"
                />
                <HangUpButton
                  currentLocale={currentLocale}
                  onHangup={() => onHangup(callItem)}
                  className={styles.button}
                  size="small"
                />
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <BackHeader
        currentLocale={currentLocale}
        title={i18n.getString('activeCall', currentLocale)}
        onBackClick={goBack}
      />
      <div className={styles.list} data-sign="callList">
        {callListRender()}
      </div>
    </>
  );
};

export { ActiveCallListPanel };
