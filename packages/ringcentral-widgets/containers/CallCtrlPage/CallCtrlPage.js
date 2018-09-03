import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sleep from 'ringcentral-integration/lib/sleep';
import calleeTypes from 'ringcentral-integration/enums/calleeTypes';
import callDirections from 'ringcentral-integration/enums/callDirections';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import CallCtrlPanel from '../../components/CallCtrlPanel';
import i18n from './i18n';

class CallCtrlPage extends Component {
  constructor(props) {
    super(props);
    const layout = props.getInitialLayout(this.props);
    const { mergeDisabled, addDisabled } = this.disableMergeAndAdd(this.props, layout);
    this.state = {
      selectedMatcherIndex: 0,
      avatarUrl: null,
      layout,
      mergeDisabled,
      addDisabled,
    };

    this.onLastMergingCallEnded = this::this.onLastMergingCallEnded;

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

  static isLastCallEnded({ lastCallInfo }) {
    return !!(
      lastCallInfo && lastCallInfo.status === sessionStatus.finished
    );
  }

  componentDidMount() {
    this._mounted = true;
    this._updateAvatarAndMatchIndex(this.props);
    this._updateCurrentConferenceCall(this.props);
    this._updateMergingPairToSessionId();

    if (CallCtrlPage.isLastCallEnded(this.props)) {
      /**
       * if the last has already been terminated after rendering, need to trigger the callback at the point
       */
      this.onLastMergingCallEnded();
    }
  }

  disableMergeAndAdd(nextProps, layout) {
    const {
      lastCallInfo,
      isWebRTC,
      isConferenceCallOverload,
      session,
      hasConferenceCall,
    } = nextProps;

    const isInboundCall = session.direction === callDirections.inbound;
    const isMergeAndAddDisabled = !isWebRTC || isInboundCall || !session.partyData;

    let mergeDisabled = isMergeAndAddDisabled;
    let addDisabled = isMergeAndAddDisabled;
    if (
      layout === callCtrlLayouts.mergeCtrl
    && (!lastCallInfo || lastCallInfo.status === sessionStatus.finished)
    ) {
      mergeDisabled = true;
    }

    if (hasConferenceCall && isWebRTC && isConferenceCallOverload) {
      mergeDisabled = true;
      addDisabled = true;
    }

    return { mergeDisabled, addDisabled };
  }

  async onLastMergingCallEnded() {
    if (this._mounted) {
      await sleep(2000);

      if (this._mounted) {
        this.setState({
          layout: callCtrlLayouts.normalCtrl
        });
      }

      if (this.props.closeMergingPair) {
        this.props.closeMergingPair();
      }
    }
  }

  getLayout(lastProps, nextProps) {
    if (nextProps.showSpinner) {
      return callCtrlLayouts.conferenceCtrl;
    }
    return this.props.getInitialLayout(nextProps);
  }

  componentWillReceiveProps(nextProps, nextState) {
    this._updateMergingPairToSessionId(nextProps, nextState);

    let layout = this.state.layout;
    if (nextProps.session.id !== this.props.session.id) {
      layout = this.getLayout(this.props, nextProps);
      this.setState({
        layout,
      });

      if (
        layout === callCtrlLayouts.normalCtrl
      ) {
        this._updateAvatarAndMatchIndex(nextProps);
      }
    } else if (
      layout === callCtrlLayouts.mergeCtrl
        && CallCtrlPage.isLastCallEnded(this.props) === false
        && CallCtrlPage.isLastCallEnded(nextProps) === true
    ) {
      this.onLastMergingCallEnded();
    } else if (layout === callCtrlLayouts.conferenceCtrl &&
        this.props.conferenceCallParties !== nextProps.conferenceCallParties) {
      this._updateCurrentConferenceCall(nextProps);
    }
    this._updateMergeAddButtonDisabled(nextProps, layout);
  }

  _updateMergeAddButtonDisabled(nextProps, layout) {
    const { mergeDisabled, addDisabled } = this.disableMergeAndAdd(nextProps, layout);
    this.setState({
      mergeDisabled,
      addDisabled
    });
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

  _updateCurrentConferenceCall(props) {
    if (
      this.state.layout === callCtrlLayouts.conferenceCtrl
      && props.loadConference
    ) {
      props.loadConference(props.conferenceCallId);
    }
  }

  _updateMergingPairToSessionId(nextProps = this.props, nextState = this.state) {
    if (
      nextState.layout === callCtrlLayouts.mergeCtrl &&
      nextProps.lastCallInfo
    ) {
      nextProps.setMergeParty({ toSessionId: nextProps.session.id });
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
        layout={this.state.layout}
        showSpinner={this.props.showSpinner}
        direction={session.direction}
        addDisabled={this.state.addDisabled}
        mergeDisabled={this.state.mergeDisabled}
        conferenceCallEquipped={this.props.conferenceCallEquipped}
        hasConferenceCall={this.props.hasConferenceCall}
        conferenceCallParties={this.props.conferenceCallParties}
        lastCallInfo={this.props.lastCallInfo}
        getAvatarUrl={this.props.getAvatarUrl}
        gotoParticipantsCtrl={this.props.gotoParticipantsCtrl}
        confirmMergeClickCloseTrack={this.props.confirmMergeClickCloseTrack}
        confirmMergeClickMergeTrack={this.props.confirmMergeClickMergeTrack}
        callControlClickMergeTrack={this.props.callControlClickMergeTrack}
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
  layout: PropTypes.string,
  showSpinner: PropTypes.bool,
  conferenceCallParties: PropTypes.array,
  conferenceCallEquipped: PropTypes.bool,
  hasConferenceCall: PropTypes.bool,
  lastCallInfo: PropTypes.object,
  conferenceCallId: PropTypes.string,
  gotoParticipantsCtrl: PropTypes.func,
  loadConference: PropTypes.func,
  getInitialLayout: PropTypes.func,
  closeMergingPair: PropTypes.func,
  isWebRTC: PropTypes.bool,
  isConferenceCallOverload: PropTypes.bool,
  confirmMergeClickCloseTrack: PropTypes.func,
  confirmMergeClickMergeTrack: PropTypes.func,
  callControlClickMergeTrack: PropTypes.func,
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
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  conferenceCallParties: undefined,
  lastCallInfo: { calleeType: calleeTypes.unknow },
  conferenceCallId: null,
  gotoParticipantsCtrl: i => i,
  loadConference: i => i,
  getInitialLayout: () => callCtrlLayouts.normalCtrl,
  layout: callCtrlLayouts.normalCtrl,
  closeMergingPair: null,
  isWebRTC: false,
  isConferenceCallOverload: false,
  confirmMergeClickMergeTrack: i => i,
  confirmMergeClickCloseTrack: i => i,
  callControlClickMergeTrack: i => i,
};


export default CallCtrlPage;
