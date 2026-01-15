import calleeTypes from '@ringcentral-integration/commons/enums/calleeTypes';
import type { LastCallInfo } from '@ringcentral-integration/commons/modules/ConferenceCall';
import sessionStatus from '@ringcentral-integration/commons/modules/Webphone/sessionStatus';
import clsx from 'clsx';
import React, { Component } from 'react';

import { CallAvatar } from '../CallAvatar';

import i18n, { I18nKey } from './i18n';
import styles from './styles.scss';

type MergeInfoProps = {
  currentLocale: string;
  timeCounter: JSX.Element;
  lastCallInfo?: LastCallInfo;
  currentCallTitle?: string;
  currentCallAvatarUrl?: string;
  showCallerIdName?: boolean;
  formatPhone?: (...args: any[]) => any;
  getAvatarUrl?: (...args: any[]) => any;
  checkLastCallInfoTimeout?: number;
};
type MergeInfoState = {
  lastCallAvatar: any | null;
  lastCallInfoTimeout: boolean;
};
class MergeInfo extends Component<MergeInfoProps, MergeInfoState> {
  mounted: any;
  timeout_clock: any;
  constructor(props: any) {
    super(props);
    this.state = {
      lastCallAvatar: null,
      lastCallInfoTimeout: false,
    };
    this.mounted = false;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    this.mounted = false;
    if (this.timeout_clock) {
      clearTimeout(this.timeout_clock);
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this.mounted = true;
    const { lastCallInfo, getAvatarUrl } = this.props;
    if (
      lastCallInfo &&
      !lastCallInfo.avatarUrl &&
      lastCallInfo.lastCallContact
    ) {
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      getAvatarUrl(lastCallInfo.lastCallContact).then((lastCallAvatar: any) => {
        if (this.mounted) {
          this.setState({
            lastCallAvatar,
          });
        }
      });
    }
    if (lastCallInfo && lastCallInfo.calleeType !== calleeTypes.conference) {
      const isSimplifiedCallAndLastCallInfoNotReady =
        !lastCallInfo.name || !lastCallInfo.phoneNumber;
      if (isSimplifiedCallAndLastCallInfoNotReady) {
        this.timeout_clock = setTimeout(() => {
          if (this.mounted) {
            this.setState({
              lastCallInfoTimeout: true,
            });
          }
        }, this.props.checkLastCallInfoTimeout);
      } else if (this.timeout_clock) {
        clearTimeout(this.timeout_clock);
      }
    }
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      currentLocale,
      timeCounter,
      lastCallInfo,
      currentCallTitle,
      currentCallAvatarUrl,
      showCallerIdName,
      formatPhone,
    } = this.props;
    if (!lastCallInfo) {
      return <div className={styles.userInfo} />;
    }
    const { lastCallAvatar, lastCallInfoTimeout } = this.state;
    const isLastCallInfoReady =
      !!lastCallInfo && (!!lastCallInfo.name || !!lastCallInfo.phoneNumber);
    const isLastCallEnded =
      lastCallInfo && lastCallInfo.status === sessionStatus.finished;
    const statusClasses = clsx({
      [styles.callee_status]: true,
      [styles.callee_status_disconnected]: !!isLastCallEnded,
    });
    const isOnConferenceCall = !!(
      lastCallInfo && lastCallInfo.calleeType === calleeTypes.conference
    );
    const isContacts = !!(
      lastCallInfo && lastCallInfo.calleeType === calleeTypes.contacts
    );

    const isUnknown = !!(
      lastCallInfo && lastCallInfo.calleeType === calleeTypes.unknown
    );

    const calleeName = isContacts
      ? lastCallInfo.name
      : showCallerIdName && isUnknown && lastCallInfo.name
      ? lastCallInfo.name
      : // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        formatPhone(lastCallInfo.phoneNumber);
    const loadingText = i18n.getString('loading');
    const loadingTimeoutText = i18n.getString('loadingTimeout');
    const showSpinner =
      !lastCallInfoTimeout && !isLastCallInfoReady && !isOnConferenceCall;

    // in conference layout, call would show 'on hold' or 'disconnected'
    // in transfer layout, if the call is ongoing status, should show 'Ongoing'
    let callStatus: I18nKey =
      lastCallInfo.status === sessionStatus.finished
        ? 'disconnected'
        : 'onHold';
    if (
      !isOnConferenceCall &&
      lastCallInfo.status === sessionStatus.connected
    ) {
      callStatus = 'ongoing';
    }

    return (
      <div className={styles.mergeInfo} data-sign="mergeInfo">
        <div className={styles.merge_item}>
          <div className={styles.callee_avatar}>
            <CallAvatar
              avatarUrl={
                isContacts && !lastCallInfo.avatarUrl
                  ? lastCallAvatar
                  : lastCallInfo.avatarUrl
              }
              extraNum={isOnConferenceCall ? lastCallInfo.extraNum : 0}
              isOnConferenceCall={isOnConferenceCall}
              spinnerMode={showSpinner}
            />
          </div>
          {(isLastCallInfoReady ||
            (!isLastCallInfoReady && isOnConferenceCall)) && (
            <div className={styles.callee_name}>
              {isOnConferenceCall ? (
                <span title={i18n.getString('conferenceCall', currentLocale)}>
                  {i18n.getString('conferenceCall', currentLocale)}
                </span>
              ) : (
                <span title={calleeName}>{calleeName}</span>
              )}
            </div>
          )}
          {!isLastCallInfoReady &&
            !isOnConferenceCall &&
            (lastCallInfoTimeout ? (
              <div className={styles.last_call_info_load_timeout}>
                <span title={loadingTimeoutText}>{loadingTimeoutText}</span>
              </div>
            ) : (
              <div className={styles.callee_name}>
                <span title={loadingText}>{loadingText}</span>
              </div>
            ))}

          {(isLastCallInfoReady ||
            (!isLastCallInfoReady && isOnConferenceCall)) && (
            <div className={statusClasses}>
              {i18n.getString(callStatus, currentLocale)}
            </div>
          )}
        </div>
        <div className={styles.merge_item_active}>
          <div className={styles.callee_avatar_active}>
            {currentCallAvatarUrl ? (
              <CallAvatar avatarUrl={currentCallAvatarUrl} />
            ) : (
              // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
              <CallAvatar avatarUrl={null} />
            )}
          </div>
          <div
            className={styles.callee_name_active}
            data-sign="activeCalleeName"
          >
            <span title={currentCallTitle}>{currentCallTitle}</span>
          </div>
          <div className={styles.callee_status_active}>{timeCounter}</div>
        </div>
      </div>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
MergeInfo.defaultProps = {
  lastCallInfo: { calleeType: calleeTypes.unknown },
  currentCallTitle: undefined,
  currentCallAvatarUrl: undefined,
  formatPhone: () => null,
  getAvatarUrl: () => null,
  /**
   * The timeout seconds to check if the last call info is received.
   */
  checkLastCallInfoTimeout: 30 * 1000,
};
export default MergeInfo;
