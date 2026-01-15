import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import {
  isInbound,
  isRinging,
} from '@ringcentral-integration/commons/lib/callLogHelpers';
import parseNumber from '@ringcentral-integration/commons/lib/parseNumber';
import sessionStatus from '@ringcentral-integration/commons/modules/Webphone/sessionStatus';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import AnswerIcon from '../../assets/images/Answer.svg';
import EndIcon from '../../assets/images/End.svg';
import VoicemailIcon from '../../assets/images/Voicemail.svg';
import ActionMenu from '../ActionMenu';
import CallIcon from '../CallIcon';
import CircleButton from '../CircleButton';
import ContactDisplay from '../ContactDisplay';
import { DurationCounter } from '../DurationCounter';

import i18n from './i18n';
import styles from './styles.scss';

const WebphoneButtons = ({
  currentLocale,
  session,
  webphoneAnswer,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
  showAnswer,
}: any) => {
  if (!session || !webphoneAnswer || !webphoneHangup) {
    return null;
  }
  let hangupFunc = webphoneHangup;
  let resumeFunc = webphoneResume;
  let endIcon = EndIcon;
  let rejectTitle = i18n.getString('hangup', currentLocale);
  const acceptTitle = i18n.getString('accept', currentLocale);
  if (
    session.direction === callDirections.inbound &&
    session.callStatus === sessionStatus.connecting
  ) {
    hangupFunc = webphoneReject;
    resumeFunc = webphoneAnswer;
    endIcon = VoicemailIcon;
    rejectTitle = i18n.getString('toVoicemail', currentLocale);
  }
  return (
    <div className={styles.webphoneButtons}>
      <span title={rejectTitle} className={styles.webphoneButton}>
        <CircleButton
          className={styles.rejectButton}
          onClick={(e) => {
            e.stopPropagation();
            hangupFunc(session.id);
          }}
          iconWidth={260}
          iconX={120}
          icon={endIcon}
          showBorder={false}
        />
      </span>
      {showAnswer ? (
        <span title={acceptTitle} className={styles.webphoneButton}>
          <CircleButton
            className={styles.answerButton}
            onClick={(e) => {
              e.stopPropagation();
              resumeFunc(session.id);
            }}
            icon={AnswerIcon}
            showBorder={false}
          />
        </span>
      ) : null}
    </div>
  );
};

WebphoneButtons.propTypes = {
  currentLocale: PropTypes.string.isRequired,
  session: PropTypes.object,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  showAnswer: PropTypes.bool,
};

WebphoneButtons.defaultProps = {
  session: undefined,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  showAnswer: true,
};

class ActiveCallItem extends Component {
  _mounted: any;
  _userSelection: any;
  contactDisplay: any;
  toVoicemailTimeout: any;
  toggleExtended: any;
  webphoneToVoicemail: any;
  constructor(props: any) {
    super(props);
    this.state = {
      selected: 0,
      isLogging: false,
      extended: false,
      isCreating: false,
    };
    this._userSelection = false;
    this.contactDisplay = null;

    this.toggleExtended = (e: any) => {
      // @ts-expect-error TS(2339): Property 'isOnConferenceCall' does not exist on ty... Remove this comment to see the full error message
      if (this.props.isOnConferenceCall) {
        return;
      }
      if (this.contactDisplay && this.contactDisplay.contains(e.target)) {
        return;
      }
      this.setState((preState) => ({
        // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
        extended: !preState.extended,
      }));
    };

    this.webphoneToVoicemail = (sessionId: any) => {
      // @ts-expect-error TS(2339): Property 'webphoneToVoicemail' does not exist on t... Remove this comment to see the full error message
      if (typeof this.props.webphoneToVoicemail !== 'function') {
        return;
      }
      // @ts-expect-error TS(2339): Property 'webphoneToVoicemail' does not exist on t... Remove this comment to see the full error message
      this.props.webphoneToVoicemail(sessionId);
      this.toVoicemailTimeout = setTimeout(() => {
        // @ts-expect-error TS(2339): Property 'webphoneReject' does not exist on type '... Remove this comment to see the full error message
        this.props.webphoneReject(sessionId);
      }, 3000);
    };
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this._mounted = true;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    this._mounted = false;
    if (this.toVoicemailTimeout) {
      clearTimeout(this.toVoicemailTimeout);
      this.toVoicemailTimeout = null;
    }
  }

  onSelectContact = (value: any) => {
    const nameMatches = this.getContactMatches();
    const selected = nameMatches.findIndex(
      (match: any) => match.id === value.id,
    );
    this._userSelection = true;
    this.setState({
      selected,
    });
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    if (this.props.call.activityMatches.length > 0 && this.props.autoLog) {
      this.logCall({ redirect: false, selected });
    }
  };

  getFallbackContactName() {
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    return isInbound(this.props.call)
      ? // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.props.call.from.name
      : // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.props.call.to.name;
  }

  // @ts-expect-error TS(2339): Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
  getSelectedContact = (selected = this.state.selected) => {
    const contactMatches = this.getContactMatches();
    return (
      (selected > -1 && contactMatches[selected]) ||
      (contactMatches.length === 1 && contactMatches[0]) ||
      null
    );
  };

  getContactMatches(nextProps = this.props) {
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    return isInbound(nextProps.call)
      ? // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        nextProps.call.fromMatches
      : // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        nextProps.call.toMatches;
  }

  getPhoneNumber() {
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    return isInbound(this.props.call)
      ? // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.props.call.from.phoneNumber || this.props.call.from.extensionNumber
      : // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.props.call.to.phoneNumber || this.props.call.to.extensionNumber;
  }

  getMyPhoneNumber() {
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    return isInbound(this.props.call)
      ? // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.props.call.to.phoneNumber || this.props.call.to.extensionNumber
      : // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        this.props.call.from.phoneNumber ||
          // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
          this.props.call.from.extensionNumber;
  }

  getCallInfo() {
    const {
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      call: { telephonyStatus, startTime, webphoneSession, offset },
      // @ts-expect-error TS(2339): Property 'disableLinks' does not exist on type 'Re... Remove this comment to see the full error message
      disableLinks,
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      currentLocale,
      // @ts-expect-error TS(2339): Property 'formatPhone' does not exist on type 'Rea... Remove this comment to see the full error message
      formatPhone,
      // @ts-expect-error TS(2339): Property 'showCallDetail' does not exist on type '... Remove this comment to see the full error message
      showCallDetail,
    } = this.props;

    if (!showCallDetail) {
      return null;
    }
    const myPhoneNumber = this.getMyPhoneNumber();

    if (webphoneSession) {
      return (
        <div className={styles.callDetail}>
          <span className={styles.label}>
            {/* @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message */}
            {isInbound(this.props.call)
              ? i18n.getString('to', currentLocale)
              : i18n.getString('from', currentLocale)}
            :
          </span>
          {myPhoneNumber
            ? formatPhone(myPhoneNumber)
            : i18n.getString('anonymous', currentLocale)}
        </div>
      );
    }
    const telephonyStatusInfo = i18n.getString(telephonyStatus, currentLocale);
    return (
      <div className={styles.callDetail}>
        {disableLinks ? (
          i18n.getString('unavailable', currentLocale)
        ) : (
          <DurationCounter startTime={startTime} offset={offset} />
        )}
        <span className={styles.split}>|</span>
        <span title={telephonyStatusInfo}>{telephonyStatusInfo}</span>
      </div>
    );
  }

  clickToSms = () => {
    // @ts-expect-error TS(2339): Property 'onClickToSms' does not exist on type 'Re... Remove this comment to see the full error message
    if (this.props.onClickToSms) {
      const phoneNumber = this.getPhoneNumber();
      const contact = this.getSelectedContact();
      if (contact) {
        // @ts-expect-error TS(2339): Property 'onClickToSms' does not exist on type 'Re... Remove this comment to see the full error message
        this.props.onClickToSms({
          ...contact,
          phoneNumber,
        });
      } else {
        // @ts-expect-error TS(2339): Property 'formatPhone' does not exist on type 'Rea... Remove this comment to see the full error message
        const formatted = this.props.formatPhone(phoneNumber);
        // @ts-expect-error TS(2339): Property 'onClickToSms' does not exist on type 'Re... Remove this comment to see the full error message
        this.props.onClickToSms(
          {
            // @ts-expect-error TS(2339): Property 'enableContactFallback' does not exist on... Remove this comment to see the full error message
            name: this.props.enableContactFallback
              ? this.getFallbackContactName()
              : formatted,
            phoneNumber,
          },
          true,
        );
      }
    }
  };

  createSelectedContact = async (entityType: any) => {
    // console.log('click createSelectedContact!!', entityType);
    if (
      // @ts-expect-error TS(2339): Property 'onCreateContact' does not exist on type ... Remove this comment to see the full error message
      typeof this.props.onCreateContact === 'function' &&
      this._mounted &&
      // @ts-expect-error TS(2339): Property 'isCreating' does not exist on type 'Read... Remove this comment to see the full error message
      !this.state.isCreating
    ) {
      this.setState({
        isCreating: true,
      });
      // console.log('start to create: isCreating...', this.state.isCreating);
      const phoneNumber = this.getPhoneNumber();
      // @ts-expect-error TS(2339): Property 'onCreateContact' does not exist on type ... Remove this comment to see the full error message
      await this.props.onCreateContact({
        phoneNumber,
        // @ts-expect-error TS(2339): Property 'enableContactFallback' does not exist on... Remove this comment to see the full error message
        name: this.props.enableContactFallback
          ? this.getFallbackContactName()
          : '',
        entityType,
      });

      if (this._mounted) {
        this.setState({
          isCreating: false,
        });
        // console.log('created: isCreating...', this.state.isCreating);
      }
    }
  };

  viewSelectedContact = () => {
    // @ts-expect-error TS(2339): Property 'onViewContact' does not exist on type 'R... Remove this comment to see the full error message
    if (typeof this.props.onViewContact === 'function') {
      // @ts-expect-error TS(2339): Property 'onViewContact' does not exist on type 'R... Remove this comment to see the full error message
      this.props.onViewContact({
        contact: this.getSelectedContact(),
      });
    }
  };

  async logCall({ redirect = true, selected }: any) {
    if (
      // @ts-expect-error TS(2339): Property 'onLogCall' does not exist on type 'Reado... Remove this comment to see the full error message
      typeof this.props.onLogCall === 'function' &&
      this._mounted &&
      // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
      !this.state.isLogging
    ) {
      this.setState({
        isLogging: true,
      });
      // @ts-expect-error TS(2339): Property 'onLogCall' does not exist on type 'Reado... Remove this comment to see the full error message
      await this.props.onLogCall({
        contact: this.getSelectedContact(selected),
        // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        call: this.props.call,
        redirect,
      });
      if (this._mounted) {
        this.setState({
          isLogging: false,
        });
      }
    }
  }

  // @ts-expect-error TS(2300): Duplicate identifier 'logCall'.
  logCall = this.logCall.bind(this);

  // @ts-expect-error TS(2339): Property 'externalViewEntity' does not exist on ty... Remove this comment to see the full error message
  externalViewEntity = () => this.props.externalViewEntity(this.props.call);
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const {
      // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
      call: { direction, activityMatches, webphoneSession },
      // @ts-expect-error TS(2339): Property 'disableLinks' does not exist on type 'Re... Remove this comment to see the full error message
      disableLinks,
      // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
      currentLocale,
      // @ts-expect-error TS(2339): Property 'areaCode' does not exist on type 'Readon... Remove this comment to see the full error message
      areaCode,
      // @ts-expect-error TS(2339): Property 'countryCode' does not exist on type 'Rea... Remove this comment to see the full error message
      countryCode,
      // @ts-expect-error TS(2339): Property 'outboundSmsPermission' does not exist on... Remove this comment to see the full error message
      outboundSmsPermission,
      // @ts-expect-error TS(2339): Property 'internalSmsPermission' does not exist on... Remove this comment to see the full error message
      internalSmsPermission,
      // @ts-expect-error TS(2339): Property 'enableContactFallback' does not exist on... Remove this comment to see the full error message
      enableContactFallback,
      // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
      isLogging,
      // @ts-expect-error TS(2339): Property 'brand' does not exist on type 'Readonly<... Remove this comment to see the full error message
      brand,
      // @ts-expect-error TS(2339): Property 'showContactDisplayPlaceholder' does not ... Remove this comment to see the full error message
      showContactDisplayPlaceholder,
      // @ts-expect-error TS(2339): Property 'onClickToSms' does not exist on type 'Re... Remove this comment to see the full error message
      onClickToSms,
      // @ts-expect-error TS(2339): Property 'onViewContact' does not exist on type 'R... Remove this comment to see the full error message
      onViewContact,
      // @ts-expect-error TS(2339): Property 'onCreateContact' does not exist on type ... Remove this comment to see the full error message
      onCreateContact,
      // @ts-expect-error TS(2339): Property 'createEntityTypes' does not exist on typ... Remove this comment to see the full error message
      createEntityTypes,
      // @ts-expect-error TS(2339): Property 'onLogCall' does not exist on type 'Reado... Remove this comment to see the full error message
      onLogCall,
      // @ts-expect-error TS(2339): Property 'webphoneAnswer' does not exist on type '... Remove this comment to see the full error message
      webphoneAnswer,
      // @ts-expect-error TS(2339): Property 'webphoneHangup' does not exist on type '... Remove this comment to see the full error message
      webphoneHangup,
      // @ts-expect-error TS(2339): Property 'webphoneResume' does not exist on type '... Remove this comment to see the full error message
      webphoneResume,
      // @ts-expect-error TS(2339): Property 'sourceIcons' does not exist on type 'Rea... Remove this comment to see the full error message
      sourceIcons,
      // @ts-expect-error TS(2339): Property 'phoneTypeRenderer' does not exist on typ... Remove this comment to see the full error message
      phoneTypeRenderer,
      // @ts-expect-error TS(2339): Property 'phoneSourceNameRenderer' does not exist ... Remove this comment to see the full error message
      phoneSourceNameRenderer,
      // @ts-expect-error TS(2339): Property 'renderContactName' does not exist on typ... Remove this comment to see the full error message
      renderContactName,
      // @ts-expect-error TS(2339): Property 'renderExtraButton' does not exist on typ... Remove this comment to see the full error message
      renderExtraButton,
      // @ts-expect-error TS(2339): Property 'contactDisplayStyle' does not exist on t... Remove this comment to see the full error message
      contactDisplayStyle,
      // @ts-expect-error TS(2339): Property 'externalViewEntity' does not exist on ty... Remove this comment to see the full error message
      externalViewEntity,
      // @ts-expect-error TS(2339): Property 'externalHasEntity' does not exist on typ... Remove this comment to see the full error message
      externalHasEntity,
      // @ts-expect-error TS(2339): Property 'readTextPermission' does not exist on ty... Remove this comment to see the full error message
      readTextPermission,
      // @ts-expect-error TS(2339): Property 'isOnConferenceCall' does not exist on ty... Remove this comment to see the full error message
      isOnConferenceCall,
      // @ts-expect-error TS(2339): Property 'hasActionMenu' does not exist on type 'R... Remove this comment to see the full error message
      hasActionMenu,
      // @ts-expect-error TS(2339): Property 'showAnswer' does not exist on type 'Read... Remove this comment to see the full error message
      showAnswer,
      // @ts-expect-error TS(2339): Property 'avatarUrl' does not exist on type 'Reado... Remove this comment to see the full error message
      avatarUrl,
      // @ts-expect-error TS(2339): Property 'showAvatar' does not exist on type 'Read... Remove this comment to see the full error message
      showAvatar,
      // @ts-expect-error TS(2339): Property 'formatPhone' does not exist on type 'Rea... Remove this comment to see the full error message
      formatPhone,
    } = this.props;
    const phoneNumber = this.getPhoneNumber();
    const parsedInfo = parseNumber({
      phoneNumber,
      countryCode,
      areaCode,
    });
    const isExtension =
      !parsedInfo.hasPlus && parsedInfo.number && parsedInfo.number.length <= 6;
    const disableClickToSms = !(
      onClickToSms &&
      (isExtension ? internalSmsPermission : outboundSmsPermission)
    );
    const contactMatches = this.getContactMatches();
    const fallbackContactName = this.getFallbackContactName();
    // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
    const ringing = isRinging(this.props.call);
    const callDetail = this.getCallInfo();
    const contactName =
      typeof renderContactName === 'function'
        ? // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
          renderContactName(this.props.call)
        : undefined;
    const extraButton =
      typeof renderExtraButton === 'function'
        ? // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
          renderExtraButton(this.props.call)
        : undefined;

    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div className={styles.root} onClick={this.toggleExtended}>
        <div className={styles.wrapper}>
          <CallIcon
            direction={direction}
            ringing={ringing}
            // @ts-expect-error TS(2322): Type '{ direction: any; ringing: boolean; active: ... Remove this comment to see the full error message
            active
            missed={false}
            inboundTitle={i18n.getString('inboundCall', currentLocale)}
            outboundTitle={i18n.getString('outboundCall', currentLocale)}
            missedTitle={i18n.getString('missedCall', currentLocale)}
            isOnConferenceCall={isOnConferenceCall}
            showAvatar={showAvatar}
            avatarUrl={avatarUrl}
          />
          <div className={styles.infoWrapper}>
            <ContactDisplay
              formatPhone={formatPhone}
              isOnConferenceCall={isOnConferenceCall}
              contactName={contactName}
              className={
                isOnConferenceCall
                  ? clsx(styles.conferenceContactDisplay)
                  : clsx(styles.contactDisplay, contactDisplayStyle)
              }
              contactMatches={contactMatches}
              // @ts-expect-error TS(2339): Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
              selected={this.state.selected}
              onSelectContact={this.onSelectContact}
              disabled={disableLinks}
              // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
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
              // @ts-expect-error TS(2322): Type '{ formatPhone: any; isOnConferenceCall: any;... Remove this comment to see the full error message
              phoneTypeRenderer={phoneTypeRenderer}
              phoneSourceNameRenderer={phoneSourceNameRenderer}
              stopPropagation
            />
            {isOnConferenceCall ? null : callDetail}
          </div>
          <WebphoneButtons
            session={webphoneSession}
            webphoneAnswer={webphoneAnswer}
            webphoneReject={this.webphoneToVoicemail}
            webphoneHangup={webphoneHangup}
            webphoneResume={webphoneResume}
            currentLocale={currentLocale}
            showAnswer={showAnswer}
          />
          {extraButton}
        </div>
        {hasActionMenu ? (
          <ActionMenu
            // @ts-expect-error TS(2339): Property 'extended' does not exist on type 'Readon... Remove this comment to see the full error message
            extended={this.state.extended}
            onToggle={this.toggleExtended}
            currentLocale={currentLocale}
            disableLinks={disableLinks}
            phoneNumber={phoneNumber}
            onClickToSms={
              readTextPermission
                ? // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
                  () => this.clickToSms({ countryCode, areaCode })
                : undefined
            }
            hasEntity={!!contactMatches.length}
            onViewEntity={onViewContact && this.viewSelectedContact}
            onCreateEntity={onCreateContact && this.createSelectedContact}
            createEntityTypes={createEntityTypes}
            textTitle={i18n.getString('text', currentLocale)}
            onLog={onLogCall}
            // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
            isLogging={isLogging || this.state.isLogging}
            isLogged={activityMatches.length > 0}
            // @ts-expect-error TS(2339): Property 'isCreating' does not exist on type 'Read... Remove this comment to see the full error message
            isCreating={this.state.isCreating}
            addLogTitle={i18n.getString('addLog', currentLocale)}
            editLogTitle={i18n.getString('editLog', currentLocale)}
            createEntityTitle={i18n.getString('addEntity', currentLocale)}
            viewEntityTitle={i18n.getString('viewDetails', currentLocale)}
            externalViewEntity={externalViewEntity && this.externalViewEntity}
            externalHasEntity={
              // @ts-expect-error TS(2339): Property 'call' does not exist on type 'Readonly<{... Remove this comment to see the full error message
              externalHasEntity && externalHasEntity(this.props.call)
            }
            disableClickToSms={disableClickToSms}
          />
        ) : null}
      </div>
    );
  }
}

// @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ActiveCallItem.propTypes = {
  call: PropTypes.shape({
    direction: PropTypes.string.isRequired,
    telephonyStatus: PropTypes.string,
    startTime: PropTypes.number.isRequired,
    activityMatches: PropTypes.array.isRequired,
    fromMatches: PropTypes.array.isRequired,
    toMatches: PropTypes.array.isRequired,
    from: PropTypes.shape({
      phoneNumber: PropTypes.string,
      extensionNumber: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
    to: PropTypes.shape({
      phoneNumber: PropTypes.string,
      extensionNumber: PropTypes.string,
      name: PropTypes.string,
    }),
    webphoneSession: PropTypes.object,
  }).isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  currentLocale: PropTypes.string.isRequired,
  disableLinks: PropTypes.bool,
  outboundSmsPermission: PropTypes.bool,
  internalSmsPermission: PropTypes.bool,
  isLogging: PropTypes.bool,
  webphoneAnswer: PropTypes.func,
  webphoneReject: PropTypes.func,
  webphoneHangup: PropTypes.func,
  webphoneResume: PropTypes.func,
  webphoneToVoicemail: PropTypes.func,
  enableContactFallback: PropTypes.bool,
  autoLog: PropTypes.bool,
  brand: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  formatPhone: PropTypes.func.isRequired,
  onClickToSms: PropTypes.func,
  onCreateContact: PropTypes.func,
  createEntityTypes: PropTypes.array,
  onLogCall: PropTypes.func,
  onViewContact: PropTypes.func,
  sourceIcons: PropTypes.object,
  phoneTypeRenderer: PropTypes.func,
  phoneSourceNameRenderer: PropTypes.func,
  renderContactName: PropTypes.func,
  renderExtraButton: PropTypes.func,
  contactDisplayStyle: PropTypes.string,
  externalViewEntity: PropTypes.func,
  externalHasEntity: PropTypes.func,
  readTextPermission: PropTypes.bool,
  isOnConferenceCall: PropTypes.bool,
  hasActionMenu: PropTypes.bool,
  showAnswer: PropTypes.bool,
  avatarUrl: PropTypes.string,
  showAvatar: PropTypes.bool,
  showCallDetail: PropTypes.bool,
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ActiveCallItem.defaultProps = {
  onLogCall: undefined,
  onClickToSms: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  createEntityTypes: undefined,
  isLogging: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  disableLinks: false,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneToVoicemail: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
  isOnConferenceCall: false,
  hasActionMenu: true,
  showAnswer: true,
  avatarUrl: null,
  showAvatar: false,
  showCallDetail: true,
};

export default ActiveCallItem;
