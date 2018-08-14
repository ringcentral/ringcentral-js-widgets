import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import calleeTypes from 'ringcentral-integration/enums/calleeTypes';
import styles from './styles.scss';
import i18n from './i18n';
import CallAvatar from '../CallAvatar';

class MergeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastCallAvatar: null,
      lastCallInfoTimeout: false
    };
    this.mounted = false;
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.timeout_clock) {
      clearTimeout(this.timeout_clock);
    }
  }

  componentDidMount() {
    this.mounted = true;
    const { lastCallInfo, getAvatarUrl } = this.props;
    if (lastCallInfo && !lastCallInfo.avatarUrl && lastCallInfo.lastCallContact) {
      getAvatarUrl(lastCallInfo.lastCallContact).then((lastCallAvatar) => {
        if (this.mounted) {
          this.setState({
            lastCallAvatar,
          });
        }
      });
    }
    if (
      lastCallInfo && lastCallInfo.calleeType !== calleeTypes.conference
    ) {
      const isSimplifiedCallAndLastCallInfoNotReady = (
        !lastCallInfo.name || !lastCallInfo.phoneNumber
      );

      if (isSimplifiedCallAndLastCallInfoNotReady) {
        this.timeout_clock = setTimeout(() => {
          if (this.mounted) {
            this.setState({
              lastCallInfoTimeout: true
            });
          }
        }, this.props.checkLastCallInfoTimeout);
      } else if (this.timeout_clock) {
        clearTimeout(this.timeout_clock);
      }
    }
  }

  render() {
    const {
      currentLocale,
      timeCounter,
      lastCallInfo,
      currentCallTitle,
      currentCallAvatarUrl,
      formatPhone,
    } = this.props;
    if (!lastCallInfo) {
      return null;
    }
    const { lastCallAvatar, lastCallInfoTimeout } = this.state;
    const isLastCallInfoReady = (
      !!lastCallInfo && (!!lastCallInfo.name || !!lastCallInfo.phoneNumber)
    );
    const isLastCallEnded = lastCallInfo && lastCallInfo.status === sessionStatus.finished;
    const statusClasses = classnames({
      [styles.callee_status]: true,
      [styles.callee_status_disconnected]: !!isLastCallEnded,
    });

    const isOnConferenceCall = !!(
      lastCallInfo && lastCallInfo.calleeType === calleeTypes.conference
    );
    const isContacts = !!(
      lastCallInfo && lastCallInfo.calleeType === calleeTypes.contacts
    );
    const calleeName = isContacts ? lastCallInfo.name : formatPhone(lastCallInfo.phoneNumber);
    const loadingText = i18n.getString('loading');
    const loadingTimeoutText = i18n.getString('loadingTimeout');
    const showSpinner = !lastCallInfoTimeout && !isLastCallInfoReady && !isOnConferenceCall;
    return (
      <div className={styles.mergeInfo}>
        <div className={styles.merge_item}>
          <div className={styles.callee_avatar}>
            <CallAvatar
              avatarUrl={isContacts && !lastCallInfo.avatarUrl
                ? lastCallAvatar
                : lastCallInfo.avatarUrl}
              extraNum={isOnConferenceCall ? lastCallInfo.extraNum : 0}
              isOnConferenceCall={isOnConferenceCall}
              spinnerMode={showSpinner}
            />
          </div>
          {
            (isLastCallInfoReady || (!isLastCallInfoReady && isOnConferenceCall)) && (
              <div className={styles.callee_name}>
                {
                  isOnConferenceCall
                    ? (
                      <span title={i18n.getString('conferenceCall', currentLocale)}>
                        {i18n.getString('conferenceCall', currentLocale)}
                      </span>
                    )
                    : (
                      <span title={calleeName}>{calleeName}</span>
                    )
                }
              </div>
            )
          }
          {
            (!isLastCallInfoReady && !isOnConferenceCall) && (
              lastCallInfoTimeout ? (
                <div className={styles.last_call_info_load_timeout}>
                  <span title={loadingTimeoutText}>{loadingTimeoutText}</span>
                </div>
              ) : (
                <div className={styles.callee_name}>
                  <span title={loadingText}>{loadingText}</span>
                </div>
              )
            )
          }

          {
            (isLastCallInfoReady || (!isLastCallInfoReady && isOnConferenceCall)) && (
              <div className={statusClasses}>
                {
                  lastCallInfo.status === sessionStatus.finished
                    ? i18n.getString('disconnected', currentLocale)
                    : i18n.getString('onHold', currentLocale)
                }
              </div>
            )
          }

        </div>
        <div className={styles.merge_item_active}>
          <div className={styles.callee_avatar_active} >
            {
              currentCallAvatarUrl
                ? <CallAvatar avatarUrl={currentCallAvatarUrl} />
                : <CallAvatar avatarUrl={null} />
            }
          </div>
          <div className={styles.callee_name_active}>
            <span title={currentCallTitle}>{currentCallTitle}</span>
          </div>
          <div className={styles.callee_status_active}>
            {timeCounter}
          </div>
        </div>
      </div>
    );
  }
}

MergeInfo.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  timeCounter: PropTypes.element.isRequired,
  lastCallInfo: PropTypes.object,
  currentCallTitle: PropTypes.string,
  currentCallAvatarUrl: PropTypes.string,
  formatPhone: PropTypes.func,
  getAvatarUrl: PropTypes.func,
  checkLastCallInfoTimeout: PropTypes.number,
};

MergeInfo.defaultProps = {
  lastCallInfo: { calleeType: calleeTypes.unknow },
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
