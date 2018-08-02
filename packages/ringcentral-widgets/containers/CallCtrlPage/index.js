import { find } from 'ramda';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import calleeTypes from 'ringcentral-integration/enums/calleeTypes';
import callDirections from 'ringcentral-integration/enums/callDirections';
import callingModes from 'ringcentral-integration/modules/CallingSettings/callingModes';
import withPhone from '../../lib/withPhone';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import CallCtrlPanel from '../../components/CallCtrlPanel';
import i18n from './i18n';

class CallCtrlPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMatcherIndex: 0,
      avatarUrl: null,
    };

    this.onSelectMatcherName = (option) => {
      const nameMatches = this.props.nameMatches || [];
      let selectedMatcherIndex = nameMatches.findIndex(
        match => match.id === option.id
      );
      if (selectedMatcherIndex < 0) {
        selectedMatcherIndex = 0;
      }
      this.setState({
        selectedMatcherIndex,
        avatarUrl: null,
      });
      const contact = nameMatches[selectedMatcherIndex];
      if (contact) {
        this.props.updateSessionMatchedContact(this.props.session.id, contact);
        this.props.getAvatarUrl(contact).then((avatarUrl) => {
          this.setState({ avatarUrl });
        });
      }
    };

    this.onMute = () =>
      this.props.onMute(this.props.session.id);
    this.onUnmute = () =>
      this.props.onUnmute(this.props.session.id);
    this.onHold = () =>
      this.props.onHold(this.props.session.id);
    this.onUnhold = () =>
      this.props.onUnhold(this.props.session.id);
    this.onRecord = () =>
      this.props.onRecord(this.props.session.id);
    this.onStopRecord = () =>
      this.props.onStopRecord(this.props.session.id);
    this.onHangup = () =>
      this.props.onHangup(this.props.session.id);
    this.onKeyPadChange = value =>
      this.props.sendDTMF(value, this.props.session.id);
    this.onFlip = value =>
      this.props.onFlip(value, this.props.session.id);
    this.onTransfer = value =>
      this.props.onTransfer(value, this.props.session.id);
    this.onPark = () =>
      this.props.onPark(this.props.session.id);
    this.onAdd = () =>
      this.props.onAdd(this.props.session.id);
    this.onMerge = () =>
      this.props.onMerge(this.props.session.id);
    this.onBeforeMerge = () =>
      this.props.onBeforeMerge(this.props.session.id);
  }

  componentDidMount() {
    this._mounted = true;
    this._updateAvatarAndMatchIndex(this.props);
    if (
      this.props.conferenceCallId
      && this.props.layout === callCtrlLayouts.conferenceCtrl
    ) {
      this.props.loadConference(this.props.conferenceCallId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.layout === callCtrlLayouts.mergeCtrl &&
      nextProps.session.direction === callDirections.inbound
    ) {
      nextProps.onIncomingCallCaptured();
    }
    if (this.props.session.id !== nextProps.session.id) {
      this._updateAvatarAndMatchIndex(nextProps);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  _updateAvatarAndMatchIndex(props) {
    let contact = props.session.contactMatch;
    let selectedMatcherIndex = 0;
    if (!contact) {
      contact = props.nameMatches && props.nameMatches[0];
    } else {
      selectedMatcherIndex = props.nameMatches.findIndex(match =>
        match.id === contact.id
      );
    }
    this.setState({
      selectedMatcherIndex,
      avatarUrl: null,
    });
    if (contact) {
      props.getAvatarUrl(contact).then((avatarUrl) => {
        if (!this._mounted) {
          return;
        }
        this.setState({ avatarUrl });
      });
    }
  }

  render() {
    const { session } = this.props;
    if (!session.id) {
      return null;
    }

    const phoneNumber = session.direction === callDirections.outbound ?
      session.to : session.from;

    let fallbackUserName;
    if (session.direction === callDirections.inbound && session.from === 'anonymous') {
      fallbackUserName = i18n.getString('anonymous', this.props.currentLocale);
    }
    if (!fallbackUserName) {
      fallbackUserName = i18n.getString('unknown', this.props.currentLocale);
    }

    const backButtonLabel = this.props.backButtonLabel
      ? this.props.backButtonLabel
      : i18n.getString('activeCalls', this.props.currentLocale);

    return (
      <CallCtrlPanel
        currentLocale={this.props.currentLocale}
        formatPhone={this.props.formatPhone}
        phoneNumber={phoneNumber}
        sessionId={session.id}
        callStatus={session.callStatus}
        startTime={session.startTime}
        isOnMute={session.isOnMute}
        isOnHold={session.isOnHold}
        isOnFlip={session.isOnFlip}
        isOnTransfer={session.isOnTransfer}
        recordStatus={session.recordStatus}
        showBackButton={this.props.showBackButton}
        backButtonLabel={backButtonLabel}
        onBackButtonClick={this.props.onBackButtonClick}
        onMute={this.onMute}
        onUnmute={this.onUnmute}
        onHold={this.onHold}
        onUnhold={this.onUnhold}
        onRecord={this.onRecord}
        onStopRecord={this.onStopRecord}
        onKeyPadChange={this.onKeyPadChange}
        onHangup={this.onHangup}
        onAdd={this.onAdd}
        onMerge={this.onMerge}
        onBeforeMerge={this.onBeforeMerge}
        onFlip={this.onFlip}
        onTransfer={this.onTransfer}
        onPark={this.onPark}
        nameMatches={this.props.nameMatches}
        fallBackName={fallbackUserName}
        areaCode={this.props.areaCode}
        countryCode={this.props.countryCode}
        selectedMatcherIndex={this.state.selectedMatcherIndex}
        onSelectMatcherName={this.onSelectMatcherName}
        avatarUrl={this.state.avatarUrl}
        brand={this.props.brand}
        showContactDisplayPlaceholder={this.props.showContactDisplayPlaceholder}
        flipNumbers={this.props.flipNumbers}
        sourceIcons={this.props.sourceIcons}
        searchContactList={this.props.searchContactList}
        searchContact={this.props.searchContact}
        phoneTypeRenderer={this.props.phoneTypeRenderer}
        recipientsContactInfoRenderer={this.props.recipientsContactInfoRenderer}
        recipientsContactPhoneRenderer={this.props.recipientsContactPhoneRenderer}
        layout={this.props.layout}
        showSpinner={this.props.showSpinner}
        direction={session.direction}
        addDisabled={this.props.addDisabled}
        mergeDisabled={this.props.mergeDisabled}
        conferenceCallEquipped={this.props.conferenceCallEquipped}
        hasConferenceCall={this.props.hasConferenceCall}
        conferenceCallParties={this.props.conferenceCallParties}
        lastCallInfo={this.props.lastCallInfo}
        getAvatarUrl={this.props.getAvatarUrl}
        gotoParticipantsCtrl={this.props.gotoParticipantsCtrl}
      >
        {this.props.children}
      </CallCtrlPanel>
    );
  }
}

CallCtrlPage.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string,
    direction: PropTypes.string,
    startTime: PropTypes.number,
    isOnMute: PropTypes.bool,
    isOnHold: PropTypes.bool,
    isOnFlip: PropTypes.bool,
    isOnTransfer: PropTypes.bool,
    recordStatus: PropTypes.string,
    to: PropTypes.string,
    from: PropTypes.string,
    contactMatch: PropTypes.object,
  }).isRequired,
  currentLocale: PropTypes.string.isRequired,
  onMute: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onUnhold: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  onStopRecord: PropTypes.func.isRequired,
  onHangup: PropTypes.func.isRequired,
  sendDTMF: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  onAdd: PropTypes.func,
  onMerge: PropTypes.func,
  onBeforeMerge: PropTypes.func,
  onFlip: PropTypes.func.isRequired,
  onPark: PropTypes.func.isRequired,
  onTransfer: PropTypes.func.isRequired,
  children: PropTypes.node,
  nameMatches: PropTypes.array.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  getAvatarUrl: PropTypes.func.isRequired,
  updateSessionMatchedContact: PropTypes.func.isRequired,
  showBackButton: PropTypes.bool,
  backButtonLabel: PropTypes.string,
  onBackButtonClick: PropTypes.func,
  brand: PropTypes.string.isRequired,
  showContactDisplayPlaceholder: PropTypes.bool.isRequired,
  flipNumbers: PropTypes.array.isRequired,
  sourceIcons: PropTypes.object,
  searchContactList: PropTypes.array.isRequired,
  searchContact: PropTypes.func.isRequired,
  phoneTypeRenderer: PropTypes.func,
  recipientsContactInfoRenderer: PropTypes.func,
  recipientsContactPhoneRenderer: PropTypes.func,
  layout: PropTypes.string.isRequired,
  showSpinner: PropTypes.bool,
  addDisabled: PropTypes.bool,
  mergeDisabled: PropTypes.bool,
  conferenceCallParties: PropTypes.array,
  conferenceCallEquipped: PropTypes.bool,
  hasConferenceCall: PropTypes.bool,
  lastCallInfo: PropTypes.object,
  onIncomingCallCaptured: PropTypes.func,
  conferenceCallId: PropTypes.string,
  gotoParticipantsCtrl: PropTypes.func,
  loadConference: PropTypes.func,
};

CallCtrlPage.defaultProps = {
  children: undefined,
  showBackButton: false,
  backButtonLabel: null,
  onBackButtonClick: null,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
  onAdd: undefined,
  onMerge: undefined,
  onBeforeMerge: undefined,
  showSpinner: false,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  conferenceCallParties: undefined,
  lastCallInfo: { calleeType: calleeTypes.unknow },
  onIncomingCallCaptured: i => i,
  conferenceCallId: null,
  gotoParticipantsCtrl: i => i,
  loadConference: i => i,
};

function mapToProps(_, {
  phone: {
    webphone,
    locale,
    contactMatcher,
    regionSettings,
    brand,
    forwardingNumber,
    contactSearch,
    conferenceCall,
    callingSettings,
  },
  layout = callCtrlLayouts.normalCtrl,
}) {
  const currentSession = webphone.activeSession || {};
  const contactMapping = contactMatcher && contactMatcher.dataMapping;
  const fromMatches = (contactMapping && contactMapping[currentSession.from]) || [];
  const toMatches = (contactMapping && contactMapping[currentSession.to]) || [];
  const nameMatches =
    currentSession.direction === callDirections.outbound ? toMatches : fromMatches;

  const isWebRTC = callingSettings.callingMode === callingModes.webphone;
  let mergeDisabled = !(currentSession.partyData) || !isWebRTC;
  let addDisabled = !isWebRTC || currentSession.direction === callDirections.inbound;

  let isOnConference = false;
  let hasConferenceCall = false;
  let isMerging = false;
  let conferenceCallParties;
  let conferenceCallId = null;
  if (conferenceCall) {
    isOnConference = conferenceCall.isConferenceSession(currentSession.id);
    const conferenceData = Object.values(conferenceCall.conferences)[0];

    isMerging = conferenceCall.isMerging && !!(
      Object
        .values(conferenceCall.mergingPair)
        .find(id => id === currentSession.id)
      || (isOnConference)
    );

    if (conferenceData && isWebRTC) {
      conferenceCallId = conferenceData.conference.id;

      const newVal = conferenceCall.isOverload(conferenceCallId)
        // in case webphone.activeSession has not been updated yet
        || !(currentSession.partyData);
      // update
      mergeDisabled = newVal || !(currentSession.partyData);
      addDisabled = newVal;
    }

    hasConferenceCall = !!conferenceData;
    conferenceCallParties = conferenceCall.partyProfiles;
  }

  layout = isOnConference ? callCtrlLayouts.conferenceCtrl : layout;
  return {
    brand: brand.fullName,
    nameMatches,
    currentLocale: locale.currentLocale,
    session: currentSession,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    flipNumbers: forwardingNumber.flipNumbers,
    showBackButton: true, // callMonitor.calls.length > 0,
    searchContactList: contactSearch.sortedResult,
    layout,
    showSpinner: isMerging,
    addDisabled,
    mergeDisabled,
    conferenceCallEquipped: !!conferenceCall,
    hasConferenceCall,
    conferenceCallParties,
    conferenceCallId,
  };
}

function mapToFunctions(_, {
  phone: {
    webphone,
    regionSettings,
    contactSearch,
    conferenceCall,
    routerInteraction,
    callMonitor,
  },
  getAvatarUrl,
  onBackButtonClick,
  phoneTypeRenderer,
  recipientsContactInfoRenderer,
  recipientsContactPhoneRenderer,
}) {
  const currentSession = webphone.activeSession || {};
  let currentConferenceSession;
  if (conferenceCall) {
    const conferenceData = Object.values(conferenceCall.conferences)[0];
    if (conferenceData) {
      currentConferenceSession = webphone._sessions.get(conferenceData.sessionId);
    }
  }
  return {
    formatPhone: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
    }),
    onHangup: sessionId => webphone.hangup(sessionId),
    onMute: sessionId => webphone.mute(sessionId),
    onUnmute: sessionId => webphone.unmute(sessionId),
    onHold: sessionId => webphone.hold(sessionId),
    onUnhold: sessionId => webphone.unhold(sessionId),
    onRecord: sessionId => webphone.startRecord(sessionId),
    onStopRecord: sessionId => webphone.stopRecord(sessionId),
    sendDTMF: (value, sessionId) => webphone.sendDTMF(value, sessionId),
    updateSessionMatchedContact: (sessionId, contact) => (
      webphone.updateSessionMatchedContact(sessionId, contact)
    ),
    getAvatarUrl,
    onBackButtonClick,
    onFlip: (flipNumber, sessionId) => webphone.flip(flipNumber, sessionId),
    onTransfer: (transferNumber, sessionId) => webphone.transfer(transferNumber, sessionId),
    onPark: sessionId => webphone.park(sessionId),
    searchContact: searchString => (
      contactSearch.debouncedSearch({ searchString })
    ),
    phoneTypeRenderer,
    recipientsContactInfoRenderer,
    recipientsContactPhoneRenderer,
    onAdd(sessionId) {
      if (!currentSession || webphone.isCallRecording(currentSession)) {
        return;
      }
      const sessionData = find(x => x.id === sessionId, webphone.sessions);
      if (sessionData) {
        conferenceCall.setMergeParty({ fromSessionId: sessionId });
        const outBoundOnholdCalls = callMonitor.activeOnHoldCalls
          .filter(call => call.direction === callDirections.outbound);
        if (outBoundOnholdCalls.length) {
          // goto 'calls on hold' page
          routerInteraction
            .push(`/conferenceCall/callsOnhold/${sessionData.fromNumber}/${sessionData.id}`);
        } else { // goto dialer directly
          routerInteraction.push(`/conferenceCall/dialer/${sessionData.fromNumber}`);
        }
      }
    },
    onBeforeMerge() {
      if (!currentSession || webphone.isCallRecording(currentSession)) {
        return false;
      }
      if (currentConferenceSession && webphone.isCallRecording(currentConferenceSession)) {
        return false;
      }
      return true;
    },
    async onMerge(sessionId) {
      const conferenceData = await conferenceCall.onMerge({ sessionId });
      if (!conferenceData) {
        routerInteraction.push('/conferenceCall/mergeCtrl');
      }
    },
    onIncomingCallCaptured() {
      routerInteraction.push('/calls/active');
    },
    gotoParticipantsCtrl() {
      routerInteraction.push('/conferenceCall/participants');
    },
    loadConference(confId) {
      conferenceCall.loadConference(confId);
    },
  };
}

const CallCtrlContainer = withPhone(connect(
  mapToProps,
  mapToFunctions,
)(CallCtrlPage));

CallCtrlContainer.propTypes = {
  getAvatarUrl: PropTypes.func,
  onBackButtonClick: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  backButtonLabel: PropTypes.string,
  children: PropTypes.node,
  showContactDisplayPlaceholder: PropTypes.bool,
  sourceIcons: PropTypes.object,
};

CallCtrlContainer.defaultProps = {
  getAvatarUrl: () => null,
  showContactDisplayPlaceholder: false,
  children: undefined,
  sourceIcons: undefined,
};

export {
  mapToProps,
  mapToFunctions,
  CallCtrlPage,
  CallCtrlContainer as default,
};
