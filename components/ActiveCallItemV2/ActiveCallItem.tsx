import React, { Component, FunctionComponent } from 'react';
import classnames from 'classnames';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import {
  isInbound,
  isRinging,
} from 'ringcentral-integration/lib/callLogHelpers';
import { isOnHold } from 'ringcentral-integration/modules/Webphone/webphoneHelper';
import { isHolding as isTelephonySessionOnHold } from 'ringcentral-integration/modules/ActiveCallControlV2/helpers';
import formatMessage from 'format-message';
import CallIcon from '../CallIcon';
import ContactDisplay from '../ContactDisplay';
import CircleButton from '../CircleButton';
import EndIcon from '../../assets/images/End.svg';
import HoldIcon from '../../assets/images/Hold.svg';
import SwitchIcon from '../../assets/images/Switch.svg';
import VoicemailIcon from '../../assets/images/Voicemail.svg';
import AnswerIcon from '../../assets/images/Answer.svg';
import MergeIntoConferenceIcon from '../../assets/images/MergeIntoConferenceIcon.svg';
import TransferIcon from '../../assets/images/Transfer.svg';
import MediaObject from '../MediaObject';
import DurationCounter from '../DurationCounter';
import SwitchImage from '../../assets/images/img_call_switch.svg';
import IgnoreIcon from '../../assets/images/Ignore.svg';
import HoldAnswerIcon from '../../assets/images/HoldAnswer.svg';
import {
  ModalContentProps,
  WebphoneButtonsProps,
  ActiveCallControlButtonsProps,
  ActiveCallItemProps,
  ActiveCallItemState,
} from './ActiveCallItem.interface';
import styles from './styles.scss';
import i18n from '../ActiveCallItem/i18n';

export const ModalContent: FunctionComponent<ModalContentProps> = ({
  currentLocale,
  contactName,
}) => {
  return (
    <div className={styles.switchDialogContent}>
      <div className={styles.switchDialogImage}>
        <SwitchImage width="116" height="69" />
      </div>
      <div>
        {formatMessage(i18n.getString('comfirmContext', currentLocale), {
          // displayName: activeCall.name,
          displayName: contactName,
        })}
      </div>
    </div>
  );
};

const WebphoneButtons: FunctionComponent<WebphoneButtonsProps> = ({
  currentLocale,
  session = undefined,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
  webphoneAnswer,
  webphoneHold,
  showMergeCall = false,
  showHold = true,
  disableMerge = true,
  onMergeCall = (i) => i,
  disableLinks = false,
  isOnHold,
  telephonySessionId,
  webphoneIgnore,
  showHoldAnswerBtn,
  showIgnoreBtn,
}) => {
  if (!session) {
    return null;
  }
  let hangupFunc = webphoneHangup;
  let endIcon = EndIcon;
  let answerBtn = null;
  let ignoreBtn;
  let rejectTitle = i18n.getString('hangup', currentLocale);
  const holdTitle = i18n.getString('hold', currentLocale);
  const unholdTitle = i18n.getString('unhold', currentLocale);

  if (isInbound(session) && session.callStatus === sessionStatus.connecting) {
    hangupFunc = webphoneReject;
    endIcon = VoicemailIcon;
    rejectTitle = i18n.getString('toVoicemail', currentLocale);
    showHold = false;
    answerBtn = (
      <span
        title={i18n.getString('accept', currentLocale)}
        className={styles.webphoneButton}
        data-sign="accept"
      >
        {!showHoldAnswerBtn ? (
          <CircleButton
            className={styles.answerButton}
            onClick={(e) => {
              e.stopPropagation();
              webphoneAnswer(session.id, telephonySessionId);
            }}
            icon={AnswerIcon}
            showBorder={false}
            disabled={disableLinks}
          />
        ) : (
          <span
            title={i18n.getString('holdAndAnswer', currentLocale)}
            onClick={(e) => {
              e.stopPropagation();
              webphoneAnswer(session.id, telephonySessionId);
            }}
          >
            <HoldAnswerIcon className={styles.answerHoldButton} />
          </span>
        )}
      </span>
    );
    if (showIgnoreBtn) {
      const ignoreTitle = i18n.getString('ignore', currentLocale);
      ignoreBtn = (
        <span title={ignoreTitle} className={styles.webphoneButton}>
          <CircleButton
            className={classnames({
              [styles.mergeButton]: true,
              [styles.disabled]: disableLinks,
            })}
            onClick={(e) => {
              e.stopPropagation();
              webphoneIgnore(telephonySessionId);
            }}
            iconWidth={260}
            iconX={120}
            icon={IgnoreIcon}
            showBorder
            disabled={disableLinks}
            dataSign={ignoreTitle}
          />
        </span>
      );
    }
  }

  let holdBtn;
  let mergeBtn;
  if (showHold) {
    if (isOnHold(session)) {
      holdBtn = (
        <span title={unholdTitle} className={styles.webphoneButton}>
          <CircleButton
            className={classnames(styles.holdButton, styles.active)}
            onClick={(e) => {
              e.stopPropagation();
              webphoneResume(session.id, telephonySessionId);
            }}
            iconWidth={260}
            iconX={120}
            icon={HoldIcon}
            disabled={disableLinks}
            showBorder
          />
        </span>
      );
    } else {
      holdBtn = (
        <span title={holdTitle} className={styles.webphoneButton}>
          <CircleButton
            className={styles.holdButton}
            onClick={(e) => {
              e.stopPropagation();
              webphoneHold(session.id, telephonySessionId);
            }}
            iconWidth={260}
            iconX={120}
            icon={HoldIcon}
            disabled={disableLinks}
            showBorder
          />
        </span>
      );
    }
  }

  if (showMergeCall) {
    const mergeTitle = i18n.getString('mergeToConference', currentLocale);

    mergeBtn = (
      <span title={mergeTitle} className={styles.webphoneButton}>
        <CircleButton
          className={classnames({
            [styles.mergeButton]: true,
            [styles.disabled]: disableMerge,
          })}
          onClick={(e) => {
            e.stopPropagation();
            onMergeCall(session.id);
          }}
          iconWidth={260}
          iconX={120}
          icon={MergeIntoConferenceIcon}
          showBorder
          disabled={disableMerge || disableLinks}
          dataSign={mergeTitle}
        />
      </span>
    );
  }
  return (
    <div className={styles.webphoneButtons}>
      {ignoreBtn}
      {mergeBtn}
      {holdBtn}
      <span
        title={rejectTitle}
        data-sign="toVoiceMail"
        className={styles.webphoneButton}
      >
        <CircleButton
          className={styles.rejectButton}
          onClick={(e) => {
            e.stopPropagation();
            hangupFunc(session.id, telephonySessionId);
          }}
          iconWidth={260}
          iconX={120}
          icon={endIcon}
          showBorder={false}
          disabled={disableLinks}
        />
      </span>
      {answerBtn}
    </div>
  );
};

const ActiveCallControlButtons: FunctionComponent<ActiveCallControlButtonsProps> = ({
  session = undefined,
  showRingoutCallControl,
  showSwitchCall,
  showTransferCall,
  showHoldOnOtherDevice,
  currentLocale,
  disableLinks = false,
  telephonySessionId,
  ringoutHangup,
  ringoutReject,
  ringoutTransfer = undefined,
  ringing,
  inbound,
  onClickSwitchBtn = undefined,
  webphoneResume = undefined,
  webphoneHold = undefined,
}) => {
  if (!showRingoutCallControl && !showSwitchCall) return null;
  let switchCallButton;
  if (showSwitchCall) {
    const disabled = disableLinks || ringing;
    switchCallButton = (
      <span
        title={i18n.getString('switchCall', currentLocale)}
        className={classnames(styles.ringoutButton, styles.cursorPointer)}
        data-sign="switchCall"
      >
        <SwitchIcon
          className={classnames({
            [styles.switchButton]: true,
            [styles.disabled]: disabled,
          })}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (!disabled) {
              onClickSwitchBtn();
            }
          }}
        />
      </span>
    );
  }

  if (!showRingoutCallControl) {
    return <div className={styles.ringoutButtons}>{switchCallButton}</div>;
  }

  let endButton;
  let holdBtn = null;
  const inComingCall = inbound && ringing;
  if (inComingCall) {
    const rejectTitle = i18n.getString('reject', currentLocale);
    endButton = (
      <span
        title={rejectTitle}
        className={styles.ringoutButton}
        data-sign="hangup"
      >
        <CircleButton
          disabled={disableLinks}
          className={classnames({
            [styles.endButton]: true,
            [styles.disabled]: disableLinks,
          })}
          onClick={(e) => {
            e.stopPropagation();
            ringoutReject(telephonySessionId);
          }}
          icon={EndIcon}
          showBorder={false}
        />
      </span>
    );
  } else {
    const hangupTitle = i18n.getString('hangup', currentLocale);
    endButton = (
      <span
        title={hangupTitle}
        className={styles.ringoutButton}
        data-sign="hangup"
      >
        <CircleButton
          disabled={disableLinks}
          className={classnames({
            [styles.endButton]: true,
            [styles.disabled]: disableLinks,
          })}
          onClick={(e) => {
            e.stopPropagation();
            ringoutHangup(telephonySessionId);
          }}
          icon={EndIcon}
          showBorder={false}
        />
      </span>
    );
    const holdTitle = i18n.getString('hold', currentLocale);
    const unholdTitle = i18n.getString('unhold', currentLocale);
    if (session) {
      if (isTelephonySessionOnHold(session)) {
        holdBtn = (
          <span title={unholdTitle} className={styles.webphoneButton}>
            <CircleButton
              className={classnames(styles.holdButton, styles.active)}
              onClick={(e) => {
                e.stopPropagation();
                webphoneResume('', telephonySessionId);
              }}
              iconWidth={260}
              iconX={120}
              icon={HoldIcon}
              disabled={disableLinks}
              showBorder
            />
          </span>
        );
      } else {
        holdBtn = (
          <span title={holdTitle} className={styles.webphoneButton}>
            <CircleButton
              className={styles.holdButton}
              onClick={(e) => {
                e.stopPropagation();
                webphoneHold('', telephonySessionId);
              }}
              iconWidth={260}
              iconX={120}
              icon={HoldIcon}
              disabled={disableLinks}
              showBorder
            />
          </span>
        );
      }
    }
  }

  let transferBtn;
  if (ringoutTransfer && !inComingCall) {
    const transferTitle = i18n.getString('transfer', currentLocale);

    transferBtn = (
      <span
        title={transferTitle}
        className={styles.ringoutButton}
        data-sign="transfer"
      >
        <CircleButton
          disabled={disableLinks}
          className={classnames({
            [styles.transferButton]: true,
            [styles.disabled]: disableLinks,
          })}
          onClick={(e) => {
            e.stopPropagation();
            ringoutTransfer(telephonySessionId);
          }}
          icon={TransferIcon}
        />
      </span>
    );
  }

  return (
    <div className={styles.ringoutButtons}>
      {showHoldOnOtherDevice && holdBtn}
      {showTransferCall && transferBtn}
      {switchCallButton}
      {endButton}
    </div>
  );
};

/**
 * TODO: Gradually replace <ActiveCallItem/> with this component
 */
export class ActiveCallItem extends Component<
  ActiveCallItemProps,
  ActiveCallItemState
> {
  static defaultProps = {
    isLogging: false,
    disableLinks: false,
    enableContactFallback: false,
    brand: 'RingCentral',
    showContactDisplayPlaceholder: true,
    sourceIcons: {},
    phoneTypeRenderer: undefined,
    phoneSourceNameRenderer: undefined,
    renderContactName: undefined,
    renderExtraButton: undefined,
    contactDisplayStyle: '',
    isOnConferenceCall: false,
    onClick: undefined,
    showAvatar: true,
    getAvatarUrl: undefined,
    showMergeCall: false,
    showHold: true,
    disableMerge: false,
    onMergeCall: (i) => i,
    showCallDetail: false,
    updateSessionMatchedContact: (i) => i,
    showRingoutCallControl: false,
    showMultipleMatch: false,
    showSwitchCall: false,
    showTransferCall: true,
    showHoldOnOtherDevice: false,
    isOnHold,
  };

  _userSelection: boolean;
  toVoicemailTimeout: number;
  _mounted: boolean;
  webphoneToVoicemail: (sessionId: string, telephonySessionId: string) => any;
  modalId: string;

  constructor(props: ActiveCallItemProps) {
    super(props);
    this.state = {
      selected: 0,
      isLogging: false,
      avatarUrl: null,
      extraNum: 0,
    };
    this._userSelection = false;
    // this.contactDisplay = null;

    this.webphoneToVoicemail = (sessionId, telephonySessionId) => {
      if (typeof this.props.webphoneToVoicemail !== 'function') {
        return;
      }
      this.props.webphoneToVoicemail(sessionId, telephonySessionId);
      this.toVoicemailTimeout = window.setTimeout(() => {
        this.props.webphoneReject(sessionId, telephonySessionId);
      }, 3000);
    };
  }

  setContact(nextProps = this.props) {
    const { isOnConferenceCall, conferenceCallParties } = nextProps;

    if (isOnConferenceCall) {
      this.setState({
        avatarUrl: conferenceCallParties.map((profile) => profile.avatarUrl)[0],
        extraNum:
          conferenceCallParties.length > 0
            ? conferenceCallParties.length - 1
            : 0,
      });
      return;
    }

    const selected = this.getSelectedContactIdx(nextProps);
    this.onSelectContact(
      this.getSelectedContact(selected, nextProps),
      selected,
    );
  }

  componentDidMount() {
    this._mounted = true;
    this.setContact();
  }

  UNSAFE_componentWillReceiveProps(nextProps: ActiveCallItemProps) {
    if (this.getContactMatches(nextProps) !== this.getContactMatches()) {
      this.setContact(nextProps);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
    if (this.toVoicemailTimeout) {
      window.clearTimeout(this.toVoicemailTimeout);
      this.toVoicemailTimeout = null;
    }
    if (this.modalId) {
      this.props.modalClose(this.modalId);
    }
  }

  getCallInfo() {
    const {
      call: { telephonyStatus, startTime, offset },
      disableLinks,
      currentLocale,
      showCallDetail,
      useCallDetailV2,
    } = this.props;

    if (!showCallDetail) {
      return null;
    }

    const telephonyStatusInfo = i18n.getString(telephonyStatus, currentLocale);
    const callStatusComp = (
      <>
        <span className={styles.split}>|</span>
        <span title={telephonyStatusInfo}>{telephonyStatusInfo}</span>
      </>
    );
    if (useCallDetailV2) {
      return (
        <div className={styles.callDetail}>
          <DurationCounter startTime={startTime} offset={offset} />
        </div>
      );
    }
    return (
      <div className={styles.callDetail}>
        {disableLinks ? (
          i18n.getString('unavailable', currentLocale)
        ) : (
          <DurationCounter startTime={startTime} offset={offset} />
        )}
        {callStatusComp}
      </div>
    );
  }

  getFallbackContactName() {
    return isInbound(this.props.call)
      ? this.props.call.from.name
      : this.props.call.to.name;
  }

  onSelectContact = (value: any, idx: number) => {
    if (!value || typeof this.props.getAvatarUrl !== 'function') {
      return;
    }

    this._userSelection = true;
    this.setState({
      selected: idx,
    });
    if (value) {
      this.props.getAvatarUrl(value).then((avatarUrl: string) => {
        if (this._mounted) {
          this.setState({ avatarUrl });
        }
      });
      if (this.props.call.webphoneSession) {
        this.props.updateSessionMatchedContact(
          this.props.call.webphoneSession.id,
          value,
        );
      }
    }
  };

  getSelectedContactIdx = (nextProps = this.props) => {
    const contactMatches = this.getContactMatches(nextProps);
    let selected = null;

    if (!nextProps.call.webphoneSession) {
      selected = 0;
    } else if (contactMatches && contactMatches.length) {
      const contact = nextProps.call.webphoneSession.contactMatch;
      if (contact) {
        selected = contactMatches.findIndex((match) => match.id === contact.id);
      }
      if (selected === -1 || !contact) {
        selected = 0;
      }
    }
    return selected;
  };

  getSelectedContact = (
    selected = this.getSelectedContactIdx(),
    nextProps = this.props,
  ) => {
    const contactMatches = this.getContactMatches(nextProps);
    return (contactMatches && contactMatches[selected]) || null;
  };

  getContactMatches(nextProps = this.props) {
    return isInbound(nextProps.call)
      ? nextProps.call.fromMatches
      : nextProps.call.toMatches;
  }

  getPhoneNumber() {
    return isInbound(this.props.call)
      ? this.props.call.from.phoneNumber || this.props.call.from.extensionNumber
      : this.props.call.to.phoneNumber || this.props.call.to.extensionNumber;
  }

  onClickSwitchBtn = () => {
    const contactName =
      typeof this.props.renderContactName === 'function'
        ? this.props.renderContactName(this.props.call)
        : undefined;
    this.modalId = this.props.modalConfirm({
      size: 'small',
      title: i18n.getString('callSwitch', this.props.currentLocale),
      dialogProps: { className: styles.switchDialog },
      content: (
        <ModalContent
          currentLocale={this.props.currentLocale}
          contactName={contactName}
        />
      ),
      okText: i18n.getString('comfirmOKButton', this.props.currentLocale),
      cancelText: i18n.getString(
        'comfirmCancelButton',
        this.props.currentLocale,
      ),
      onOK: () => this.props.webphoneSwitchCall(this.props.call),
    });
  };

  render() {
    const {
      call: {
        direction,
        webphoneSession,
        telephonySessionId,
        telephonySession,
      },
      disableLinks,
      currentLocale,
      areaCode,
      countryCode,
      enableContactFallback,
      isLogging,
      brand,
      showContactDisplayPlaceholder,
      webphoneHangup,
      webphoneResume,
      sourceIcons,
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      renderContactName,
      renderExtraButton,
      contactDisplayStyle,
      isOnConferenceCall,
      webphoneHold,
      onClick,
      showMergeCall,
      showHold,
      showAvatar,
      disableMerge,
      onMergeCall,
      showCallDetail,
      webphoneAnswer,
      ringoutHangup,
      ringoutTransfer,
      ringoutReject,
      showRingoutCallControl,
      showSwitchCall,
      showTransferCall,
      showHoldOnOtherDevice,
      showMultipleMatch,
      isOnHold,
      newCallIcon,
      webphoneIgnore,
      showHoldAnswerBtn,
      showIgnoreBtn,
    } = this.props;

    const { avatarUrl, extraNum } = this.state;
    const phoneNumber = this.getPhoneNumber();
    const contactMatches = this.getContactMatches();
    const fallbackContactName = this.getFallbackContactName();
    const ringing = isRinging(this.props.call);
    const inbound = isInbound(this.props.call);
    const contactName =
      typeof renderContactName === 'function'
        ? renderContactName(this.props.call)
        : undefined;
    const extraButton =
      typeof renderExtraButton === 'function' ? (
        <div className={styles.extraButton}>
          {renderExtraButton(this.props.call)}
        </div>
      ) : undefined;
    const hasCallControl = !!(
      webphoneSession ||
      showRingoutCallControl ||
      showSwitchCall
    );
    const cursorPointer = hasCallControl && !!onClick;
    return (
      <div data-sign="callItem" className={styles.callItemContainer}>
        <MediaObject
          containerCls={styles.wrapper}
          bodyCls={classnames({
            [styles.content]: true,
            [styles.cursorPointer]: cursorPointer,
            [styles.cursorUnset]: !cursorPointer,
            [styles.disabled]: hasCallControl && disableLinks,
          })}
          leftCls={classnames({
            [styles.cursorPointer]: cursorPointer,
            [styles.cursorUnset]: !cursorPointer,
            [styles.disabled]: hasCallControl && disableLinks,
          })}
          mediaLeft={
            <div onClick={hasCallControl && onClick ? onClick : null}>
              <CallIcon
                direction={direction}
                ringing={ringing}
                active
                missed={false}
                inboundTitle={i18n.getString('inboundCall', currentLocale)}
                outboundTitle={i18n.getString('outboundCall', currentLocale)}
                missedTitle={i18n.getString('missedCall', currentLocale)}
                isOnConferenceCall={isOnConferenceCall}
                showAvatar={showAvatar}
                avatarUrl={avatarUrl}
                extraNum={extraNum}
                newCallIcon={newCallIcon}
              />
            </div>
          }
          mediaBody={
            <div
              onClick={hasCallControl && onClick ? onClick : null}
              className={styles.strechVertical}
            >
              <ContactDisplay
                isOnConferenceCall={isOnConferenceCall}
                contactName={showMultipleMatch ? undefined : contactName}
                className={classnames(
                  styles.contactDisplay,
                  contactDisplayStyle,
                )}
                contactMatches={contactMatches}
                selected={this.state.selected}
                onSelectContact={this.onSelectContact}
                disabled={!showMultipleMatch}
                iconClassName={
                  showMultipleMatch ? undefined : styles.selectIcon
                }
                isLogging={isLogging || this.state.isLogging}
                fallBackName={fallbackContactName}
                enableContactFallback={enableContactFallback}
                areaCode={areaCode}
                countryCode={countryCode}
                phoneNumber={phoneNumber}
                currentLocale={currentLocale}
                brand={brand}
                showPlaceholder={showContactDisplayPlaceholder}
                showType={false}
                sourceIcons={sourceIcons}
                phoneTypeRenderer={phoneTypeRenderer}
                phoneSourceNameRenderer={phoneSourceNameRenderer}
              />
              {showCallDetail ? this.getCallInfo() : null}
            </div>
          }
          mediaRight={
            <div className={styles.actionIconsBox}>
              {webphoneSession ? (
                <WebphoneButtons
                  session={webphoneSession}
                  telephonySessionId={telephonySessionId}
                  webphoneReject={this.webphoneToVoicemail}
                  webphoneHangup={webphoneHangup}
                  webphoneResume={webphoneResume}
                  webphoneHold={webphoneHold}
                  currentLocale={currentLocale}
                  showMergeCall={showMergeCall}
                  showHold={showHold}
                  disableMerge={disableMerge}
                  onMergeCall={onMergeCall}
                  webphoneAnswer={webphoneAnswer}
                  isOnHold={isOnHold}
                  webphoneIgnore={webphoneIgnore}
                  showIgnoreBtn={showIgnoreBtn}
                  showHoldAnswerBtn={showHoldAnswerBtn}
                />
              ) : (
                <ActiveCallControlButtons
                  session={telephonySession}
                  showSwitchCall={!webphoneSession && showSwitchCall}
                  onClickSwitchBtn={this.onClickSwitchBtn}
                  showRingoutCallControl={showRingoutCallControl}
                  telephonySessionId={telephonySessionId}
                  disableLinks={disableLinks}
                  currentLocale={currentLocale}
                  ringing={ringing}
                  inbound={inbound}
                  ringoutReject={ringoutReject}
                  ringoutHangup={ringoutHangup}
                  ringoutTransfer={ringoutTransfer}
                  showTransferCall={showTransferCall}
                  showHoldOnOtherDevice={showHoldOnOtherDevice}
                  webphoneResume={webphoneResume}
                  webphoneHold={webphoneHold}
                />
              )}
              {extraButton}
            </div>
          }
        />
      </div>
    );
  }
}
