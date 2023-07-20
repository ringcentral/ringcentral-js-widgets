import type { FunctionComponent } from 'react';
import React, { Component } from 'react';

import classnames from 'classnames';

import { telephonySessionStatus } from '@ringcentral-integration/commons/enums/telephonySessionStatus';
import {
  isInbound,
  isRinging,
} from '@ringcentral-integration/commons/lib/callLogHelpers';
import { isHolding as isTelephonySessionOnHold } from '@ringcentral-integration/commons/modules/ActiveCallControl';
import sessionStatus from '@ringcentral-integration/commons/modules/Webphone/sessionStatus';
import { isOnHold } from '@ringcentral-integration/commons/modules/Webphone/webphoneHelper';
import { format } from '@ringcentral-integration/utils';

import AnswerIcon from '../../assets/images/Answer.svg';
import EndIcon from '../../assets/images/End.svg';
import HoldIcon from '../../assets/images/Hold.svg';
import HoldAnswerIcon from '../../assets/images/HoldAnswer.svg';
import IgnoreIcon from '../../assets/images/Ignore.svg';
import SwitchImage from '../../assets/images/img_call_switch.svg';
import MergeIntoConferenceIcon from '../../assets/images/MergeIntoConferenceIcon.svg';
import SwitchIcon from '../../assets/images/Switch.svg';
import TransferIcon from '../../assets/images/Transfer.svg';
import VoicemailIcon from '../../assets/images/Voicemail.svg';
import i18n from '../ActiveCallItem/i18n';
import CallIcon from '../CallIcon';
import CircleButton from '../CircleButton';
import ContactDisplay from '../ContactDisplay';
import DurationCounter from '../DurationCounter';
import MediaObject from '../MediaObject';
import type {
  ActiveCallControlButtonsProps,
  ActiveCallItemProps,
  ActiveCallItemState,
  ModalContentProps,
  WebphoneButtonsProps,
} from './ActiveCallItem.interface';
import styles from './styles.scss';

export const ModalContent: FunctionComponent<ModalContentProps> = ({
  currentLocale,
  contactName,
}) => {
  return (
    <div>
      <div className={styles.switchDialogImage}>
        <SwitchImage width="116" height="69" />
      </div>
      <div className={styles.switchDialogContent}>
        {format(i18n.getString('comfirmContext', currentLocale), {
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
  isConnecting = false,
}) => {
  if (!session) {
    return null;
  }

  let answerBtn;
  let ignoreBtn;
  let endBtn;

  // @ts-expect-error TS(2345): Argument of type 'WebPhoneSession' is not assignab... Remove this comment to see the full error message
  if (isInbound(session) && session.callStatus === sessionStatus.connecting) {
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
            data-sign="holdAndAnswer"
            onClick={(e) => {
              e.stopPropagation();
              webphoneAnswer(session.id, telephonySessionId, true);
            }}
          >
            <HoldAnswerIcon className={styles.answerHoldButton} />
          </span>
        )}
      </span>
    );
    endBtn = (
      <span
        title={i18n.getString('toVoicemail', currentLocale)}
        className={styles.webphoneButton}
        data-sign="toVoiceMail"
      >
        <CircleButton
          className={styles.rejectButton}
          onClick={(e) => {
            e.stopPropagation();
            webphoneReject(session.id, telephonySessionId);
          }}
          iconWidth={260}
          iconX={120}
          icon={VoicemailIcon}
          showBorder={false}
          disabled={disableLinks}
        />
      </span>
    );

    if (showIgnoreBtn) {
      const ignoreTitle = i18n.getString('ignore', currentLocale);
      ignoreBtn = (
        <span
          title={i18n.getString('ignore', currentLocale)}
          className={styles.webphoneButton}
          data-sign="ignore"
        >
          <CircleButton
            className={classnames({
              [styles.mergeButton]: true,
              [styles.disabled]: disableLinks,
            })}
            onClick={(e) => {
              e.stopPropagation();
              // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
              webphoneIgnore(telephonySessionId);
            }}
            iconWidth={260}
            iconX={120}
            icon={IgnoreIcon}
            showBorder
            disabled={disableLinks}
          />
        </span>
      );
    }
  } else {
    endBtn = (
      <span
        title={i18n.getString('hangup', currentLocale)}
        className={styles.webphoneButton}
        data-sign="hangup"
      >
        <CircleButton
          className={styles.rejectButton}
          onClick={(e) => {
            e.stopPropagation();
            webphoneHangup(session.id, telephonySessionId);
          }}
          iconWidth={260}
          iconX={120}
          icon={EndIcon}
          showBorder={false}
          disabled={disableLinks}
        />
      </span>
    );
  }

  let holdBtn;
  let mergeBtn;

  if (showHold) {
    if (isOnHold(session)) {
      holdBtn = (
        <span
          title={i18n.getString('unhold', currentLocale)}
          className={styles.webphoneButton}
          data-sign="unhold"
        >
          <CircleButton
            className={classnames(styles.holdButton, styles.active, {
              [styles.disabled]: disableLinks || isConnecting,
            })}
            onClick={(e) => {
              e.stopPropagation();
              webphoneResume(session.id, telephonySessionId);
            }}
            iconWidth={260}
            iconX={120}
            icon={HoldIcon}
            disabled={disableLinks || isConnecting}
            showBorder
          />
        </span>
      );
    } else {
      holdBtn = (
        <span
          title={i18n.getString('hold', currentLocale)}
          className={styles.webphoneButton}
          data-sign="hold"
        >
          <CircleButton
            className={classnames(styles.holdButton, {
              [styles.disabled]: disableLinks || isConnecting,
            })}
            onClick={(e) => {
              e.stopPropagation();
              webphoneHold(session.id, telephonySessionId);
            }}
            iconWidth={260}
            iconX={120}
            icon={HoldIcon}
            disabled={disableLinks || isConnecting}
            showBorder
          />
        </span>
      );
    }
  }

  if (showMergeCall) {
    mergeBtn = (
      <span
        title={i18n.getString('mergeToConference', currentLocale)}
        className={styles.webphoneButton}
        data-sign="merge"
      >
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
        />
      </span>
    );
  }

  return (
    <div className={styles.webphoneButtons}>
      {ignoreBtn}
      {mergeBtn}
      {holdBtn}
      {endBtn}
      {answerBtn}
    </div>
  );
};

const ActiveCallControlButtons: FunctionComponent<ActiveCallControlButtonsProps> =
  ({
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
    isConnecting = false,
    clickSwitchTrack = () => {},
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
                clickSwitchTrack();
                // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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

    let endBtn;
    let holdBtn;

    const inComingCall = inbound && ringing;
    if (inComingCall) {
      const rejectTitle = i18n.getString('reject', currentLocale);
      endBtn = (
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
      endBtn = (
        <span
          title={i18n.getString('hangup', currentLocale)}
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

      const disabled = disableLinks || isConnecting || ringing;
      if (session) {
        // @ts-expect-error TS(2345): Argument of type 'object' is not assignable to par... Remove this comment to see the full error message
        if (isTelephonySessionOnHold(session)) {
          holdBtn = (
            <span
              title={i18n.getString('unhold', currentLocale)}
              className={styles.webphoneButton}
              data-sign="unhold"
            >
              <CircleButton
                className={classnames(styles.holdButton, styles.active, {
                  [styles.disabled]: disabled,
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                  webphoneResume('', telephonySessionId);
                }}
                iconWidth={260}
                iconX={120}
                icon={HoldIcon}
                disabled={disabled}
                showBorder
              />
            </span>
          );
        } else {
          holdBtn = (
            <span
              title={i18n.getString('hold', currentLocale)}
              className={classnames(styles.webphoneButton)}
              data-sign="hold"
            >
              <CircleButton
                className={classnames(styles.holdButton, {
                  [styles.disabled]: disabled,
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
                  webphoneHold('', telephonySessionId);
                }}
                iconWidth={260}
                iconX={120}
                icon={HoldIcon}
                disabled={disabled}
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
        {endBtn}
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
    renderSubContactName: undefined,
    renderExtraButton: undefined,
    contactDisplayStyle: '',
    isOnConferenceCall: false,
    onClick: undefined,
    showAvatar: true,
    getAvatarUrl: undefined,
    showMergeCall: false,
    showHold: true,
    disableMerge: false,
    onMergeCall: (i: any) => i,
    showCallDetail: false,
    updateSessionMatchedContact: (i: any) => i,
    showRingoutCallControl: false,
    showMultipleMatch: false,
    showSwitchCall: false,
    showTransferCall: true,
    showHoldOnOtherDevice: false,
    isOnHold,
  };

  _userSelection: boolean;
  // @ts-expect-error TS(2564): Property 'toVoicemailTimeout' has no initializer a... Remove this comment to see the full error message
  toVoicemailTimeout: number;
  // @ts-expect-error TS(2564): Property '_mounted' has no initializer and is not ... Remove this comment to see the full error message
  _mounted: boolean;
  webphoneToVoicemail: (sessionId: string, telephonySessionId: string) => any;
  // @ts-expect-error TS(2564): Property 'modalId' has no initializer and is not d... Remove this comment to see the full error message
  modalId: string;

  constructor(props: ActiveCallItemProps) {
    super(props);
    this.state = {
      selected: 0,
      isLogging: false,
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
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
      // @ts-expect-error TS(2345): Argument of type 'number | null' is not assignable... Remove this comment to see the full error message
      selected,
    );
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this._mounted = true;
    this.setContact();
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: ActiveCallItemProps) {
    if (this.getContactMatches(nextProps) !== this.getContactMatches()) {
      this.setContact(nextProps);
    }
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    this._mounted = false;
    if (this.toVoicemailTimeout) {
      window.clearTimeout(this.toVoicemailTimeout);
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'number'.
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

    // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
    const telephonyStatusInfo = i18n.getString(telephonyStatus, currentLocale);
    const callStatusComp = (
      <>
        <span className={styles.split}>|</span>
        <span title={telephonyStatusInfo}>{telephonyStatusInfo}</span>
      </>
    );
    if (useCallDetailV2) {
      return (
        <div className={styles.callDetail} data-sign="duration">
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
      : // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this.props.call.to.name;
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
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2339): Property 'contactMatch' does not exist on type 'We... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2538): Type 'null' cannot be used as an index type.
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
      : // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        this.props.call.to.phoneNumber || this.props.call.to.extensionNumber;
  }

  onClickSwitchBtn = () => {
    const {
      renderContactName,
      call,
      modalConfirm,
      isWide,
      currentLocale,
      webphoneSwitchCall,
    } = this.props;
    const contactName =
      typeof renderContactName === 'function'
        ? renderContactName(call)
        : undefined;
    // !refactor
    // TODO: Consider refactoring modalConfirm out of UI components!!!!!!!!!!!!!!
    this.modalId = modalConfirm({
      childrenSize: isWide ? 'medium' : 'small',
      title: i18n.getString('callSwitch', currentLocale),
      className: styles.switchDialog,
      contentProps: {
        // @ts-expect-error TS(2339): Property 'title' does not exist on type 'string'.
        contactName: contactName?.title || contactName || this.getPhoneNumber(),
      },
      confirmButtonText: i18n.getString('comfirmOKButton', currentLocale),
      cancelButtonText: i18n.getString('comfirmCancelButton', currentLocale),
      onConfirm: () => {
        webphoneSwitchCall(call);
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
        this.modalId = null;
      },
      onCancel: () => {
        // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string'.
        this.modalId = null;
      },
    });
  };

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      warmTransferRole,
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
      renderSubContactName,
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
      clickSwitchTrack,
      formatPhone,
    } = this.props;

    const { avatarUrl, extraNum } = this.state;
    const phoneNumber = this.getPhoneNumber();
    const contactMatches = this.getContactMatches();
    const fallbackContactName = this.getFallbackContactName();
    // @ts-expect-error TS(2345): Argument of type 'Call' is not assignable to param... Remove this comment to see the full error message
    const ringing = isRinging(this.props.call);
    const inbound = isInbound(this.props.call);
    const contactName =
      typeof renderContactName === 'function'
        ? renderContactName(this.props.call)
        : undefined;
    const subContactName =
      typeof renderSubContactName === 'function'
        ? renderSubContactName(this.props.call)
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
    // real outbound call status
    const isConnecting =
      telephonySession?.otherParties[0]?.status?.code ===
      telephonySessionStatus.proceeding;

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
            // @ts-expect-error TS(2322): Type '((...args: any[]) => any) | null' is not ass... Remove this comment to see the full error message
            <div onClick={hasCallControl && onClick ? onClick : null}>
              <CallIcon
                direction={direction}
                ringing={ringing}
                // @ts-expect-error TS(2322): Type '{ direction: "Inbound" | "Outbound"; ringing... Remove this comment to see the full error message
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
              data-sign="callNameAndDurationWrap"
              onClick={hasCallControl && onClick ? onClick : undefined}
              className={styles.strechVertical}
            >
              <ContactDisplay
                warmTransferRole={warmTransferRole}
                formatPhone={formatPhone}
                isOnConferenceCall={isOnConferenceCall}
                contactName={showMultipleMatch ? undefined : contactName}
                subContactName={subContactName}
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
                // @ts-expect-error TS(2322): Type 'object | undefined' is not assignable to typ... Remove this comment to see the full error message
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
                  isConnecting={isConnecting}
                  // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
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
                  // @ts-expect-error TS(2322): Type '((session: object) => boolean) | undefined' ... Remove this comment to see the full error message
                  isOnHold={isOnHold}
                  webphoneIgnore={webphoneIgnore}
                  showIgnoreBtn={showIgnoreBtn}
                  showHoldAnswerBtn={showHoldAnswerBtn}
                />
              ) : (
                <ActiveCallControlButtons
                  session={telephonySession}
                  // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
                  showSwitchCall={!webphoneSession && showSwitchCall}
                  onClickSwitchBtn={this.onClickSwitchBtn}
                  // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
                  showRingoutCallControl={showRingoutCallControl}
                  // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
                  telephonySessionId={telephonySessionId}
                  disableLinks={disableLinks}
                  currentLocale={currentLocale}
                  ringing={ringing}
                  inbound={inbound}
                  ringoutReject={ringoutReject}
                  ringoutHangup={ringoutHangup}
                  ringoutTransfer={ringoutTransfer}
                  // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
                  showTransferCall={showTransferCall}
                  // @ts-expect-error TS(2322): Type 'boolean | undefined' is not assignable to ty... Remove this comment to see the full error message
                  showHoldOnOtherDevice={showHoldOnOtherDevice}
                  webphoneResume={webphoneResume}
                  webphoneHold={webphoneHold}
                  isConnecting={isConnecting}
                  clickSwitchTrack={clickSwitchTrack}
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
