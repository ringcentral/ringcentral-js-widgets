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
<<<<<<< HEAD
    } else {
      setTimeout(() => {
        if (this.mounted) {
          this.setState({
            lastCallInfoTimeout: true
          });
        }
      }, this.props.checkLastCallInfoTimeout);
=======
    }
    if (
      lastCallInfo && lastCallInfo.calleeType !== calleeTypes.conference
    ) {
      const isSimplifiedCallAndLastCallInfoNotReady = !lastCallInfo || (
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
>>>>>>> fix(RCINT-8274): fix the loading text is displaying when it is on conference call in simplified call control page
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
    const isLastCallInfoReady = lastCallInfoTimeout || (
      !!lastCallInfo && (!!lastCallInfo.name || !!lastCallInfo.phoneNumber)
    );
    const isLastCallEnded = lastCallInfo && lastCallInfo.status === sessionStatus.finished;
    const statusClasses = classnames({
      [styles.callee_status]: true,
      [styles.callee_status_disconnected]: !!isLastCallEnded,
    });

    const isOnConferenCall = !!(
      lastCallInfo && lastCallInfo.calleeType === calleeTypes.conference
    );
    const isContacts = !!(
      lastCallInfo && lastCallInfo.calleeType === calleeTypes.contacts
    );
    const calleeName = isContacts ? lastCallInfo.name : formatPhone(lastCallInfo.phoneNumber);
    const loadingText = i18n.getString('loading');
    return (
      <div className={styles.mergeInfo}>
        <div className={styles.merge_item}>
          <div className={styles.callee_avatar}>
            <CallAvatar
              avatarUrl={isContacts && !lastCallInfo.avatarUrl
                ? lastCallAvatar
                : lastCallInfo.avatarUrl}
              extraNum={isOnConferenCall ? lastCallInfo.extraNum : 0}
              isOnConferenceCall={isOnConferenCall}
              spinnerMode={!isLastCallInfoReady}
            />
          </div>
          {
            (isLastCallInfoReady || (!isLastCallInfoReady && isOnConferenCall)) && (
              <div className={styles.callee_name}>
                {
                  isOnConferenCall
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
            (!isLastCallInfoReady && !isOnConferenCall) && (
              <div className={styles.callee_name}>
                <span title={loadingText}>{loadingText}</span>
              </div>
            )
          }

          {
            (isLastCallInfoReady || (!isLastCallInfoReady && isOnConferenCall)) && (
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
