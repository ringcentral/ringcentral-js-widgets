import React, { Component } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import {
  isInbound,
  isRinging,
} from '@ringcentral-integration/commons/lib/callLogHelpers';
import parseNumber from '@ringcentral-integration/commons/lib/parseNumber';
import sessionStatus from '@ringcentral-integration/commons/modules/Webphone/sessionStatus';

import AnswerIcon from '../../assets/images/Answer.svg';
import EndIcon from '../../assets/images/End.svg';
import VoicemailIcon from '../../assets/images/Voicemail.svg';
import ActionMenu from '../ActionMenu';
import CallIcon from '../CallIcon';
import CircleButton from '../CircleButton';
import ContactDisplay from '../ContactDisplay';
import DurationCounter from '../DurationCounter';
import i18n from './i18n';
import styles from './styles.scss';

function WebphoneButtons({
  currentLocale,
  session,
  webphoneAnswer,
  webphoneReject,
  webphoneHangup,
  webphoneResume,
  showAnswer,
}) {
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
}

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
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      isLogging: false,
      extended: false,
      isCreating: false,
    };
    this._userSelection = false;
    this.contactDisplay = null;

    this.toggleExtended = (e) => {
      if (this.props.isOnConferenceCall) {
        return;
      }
      if (this.contactDisplay && this.contactDisplay.contains(e.target)) {
        return;
      }
      this.setState((preState) => ({
        extended: !preState.extended,
      }));
    };

    this.webphoneToVoicemail = (sessionId) => {
      if (typeof this.props.webphoneToVoicemail !== 'function') {
        return;
      }
      this.props.webphoneToVoicemail(sessionId);
      this.toVoicemailTimeout = setTimeout(() => {
        this.props.webphoneReject(sessionId);
      }, 3000);
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
    if (this.toVoicemailTimeout) {
      clearTimeout(this.toVoicemailTimeout);
      this.toVoicemailTimeout = null;
    }
  }

  onSelectContact = (value) => {
    const nameMatches = this.getContactMatches();
    const selected = nameMatches.findIndex((match) => match.id === value.id);
    this._userSelection = true;
    this.setState({
      selected,
    });
    if (this.props.call.activityMatches.length > 0 && this.props.autoLog) {
      this.logCall({ redirect: false, selected });
    }
  };

  getFallbackContactName() {
    return isInbound(this.props.call)
      ? this.props.call.from.name
      : this.props.call.to.name;
  }

  getSelectedContact = (selected = this.state.selected) => {
    const contactMatches = this.getContactMatches();
    return (
      (selected > -1 && contactMatches[selected]) ||
      (contactMatches.length === 1 && contactMatches[0]) ||
      null
    );
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

  getMyPhoneNumber() {
    return isInbound(this.props.call)
      ? this.props.call.to.phoneNumber || this.props.call.to.extensionNumber
      : this.props.call.from.phoneNumber ||
          this.props.call.from.extensionNumber;
  }

  getCallInfo() {
    const {
      call: { telephonyStatus, startTime, webphoneSession, offset },
      disableLinks,
      currentLocale,
      formatPhone,
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
    if (this.props.onClickToSms) {
      const phoneNumber = this.getPhoneNumber();
      const contact = this.getSelectedContact();
      if (contact) {
        this.props.onClickToSms({
          ...contact,
          phoneNumber,
        });
      } else {
        const formatted = this.props.formatPhone(phoneNumber);
        this.props.onClickToSms(
          {
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

  createSelectedContact = async (entityType) => {
    // console.log('click createSelectedContact!!', entityType);
    if (
      typeof this.props.onCreateContact === 'function' &&
      this._mounted &&
      !this.state.isCreating
    ) {
      this.setState({
        isCreating: true,
      });
      // console.log('start to create: isCreating...', this.state.isCreating);
      const phoneNumber = this.getPhoneNumber();
      await this.props.onCreateContact({
        phoneNumber,
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
    if (typeof this.props.onViewContact === 'function') {
      this.props.onViewContact({
        contact: this.getSelectedContact(),
      });
    }
  };

  async logCall({ redirect = true, selected }) {
    if (
      typeof this.props.onLogCall === 'function' &&
      this._mounted &&
      !this.state.isLogging
    ) {
      this.setState({
        isLogging: true,
      });
      await this.props.onLogCall({
        contact: this.getSelectedContact(selected),
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

  logCall = this.logCall.bind(this);

  externalViewEntity = () => this.props.externalViewEntity(this.props.call);
  render() {
    const {
      call: { direction, activityMatches, webphoneSession },
      disableLinks,
      currentLocale,
      areaCode,
      countryCode,
      outboundSmsPermission,
      internalSmsPermission,
      enableContactFallback,
      isLogging,
      brand,
      showContactDisplayPlaceholder,
      onClickToSms,
      onViewContact,
      onCreateContact,
      createEntityTypes,
      onLogCall,
      webphoneAnswer,
      webphoneHangup,
      webphoneResume,
      sourceIcons,
      phoneTypeRenderer,
      phoneSourceNameRenderer,
      renderContactName,
      renderExtraButton,
      contactDisplayStyle,
      externalViewEntity,
      externalHasEntity,
      readTextPermission,
      isOnConferenceCall,
      hasActionMenu,
      showAnswer,
      avatarUrl,
      showAvatar,
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
    const ringing = isRinging(this.props.call);
    const callDetail = this.getCallInfo();
    const contactName =
      typeof renderContactName === 'function'
        ? renderContactName(this.props.call)
        : undefined;
    const extraButton =
      typeof renderExtraButton === 'function'
        ? renderExtraButton(this.props.call)
        : undefined;

    return (
      <div className={styles.root} onClick={this.toggleExtended}>
        <div className={styles.wrapper}>
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
          />
          <div className={styles.infoWrapper}>
            <ContactDisplay
              isOnConferenceCall={isOnConferenceCall}
              contactName={contactName}
              className={
                isOnConferenceCall
                  ? classnames(styles.conferenceContactDisplay)
                  : classnames(styles.contactDisplay, contactDisplayStyle)
              }
              contactMatches={contactMatches}
              selected={this.state.selected}
              onSelectContact={this.onSelectContact}
              disabled={disableLinks}
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
            extended={this.state.extended}
            onToggle={this.toggleExtended}
            currentLocale={currentLocale}
            disableLinks={disableLinks}
            phoneNumber={phoneNumber}
            onClickToSms={
              readTextPermission
                ? () => this.clickToSms({ countryCode, areaCode })
                : undefined
            }
            hasEntity={!!contactMatches.length}
            onViewEntity={onViewContact && this.viewSelectedContact}
            onCreateEntity={onCreateContact && this.createSelectedContact}
            createEntityTypes={createEntityTypes}
            textTitle={i18n.getString('text', currentLocale)}
            onLog={onLogCall}
            isLogging={isLogging || this.state.isLogging}
            isLogged={activityMatches.length > 0}
            isCreating={this.state.isCreating}
            addLogTitle={i18n.getString('addLog', currentLocale)}
            editLogTitle={i18n.getString('editLog', currentLocale)}
            createEntityTitle={i18n.getString('addEntity', currentLocale)}
            viewEntityTitle={i18n.getString('viewDetails', currentLocale)}
            externalViewEntity={externalViewEntity && this.externalViewEntity}
            externalHasEntity={
              externalHasEntity && externalHasEntity(this.props.call)
            }
            disableClickToSms={disableClickToSms}
          />
        ) : null}
      </div>
    );
  }
}

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
