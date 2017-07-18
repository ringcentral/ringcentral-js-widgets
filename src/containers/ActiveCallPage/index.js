import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import Webphone from 'ringcentral-integration/modules/Webphone';
import Locale from 'ringcentral-integration/modules/Locale';
import RegionSettings from 'ringcentral-integration/modules/RegionSettings';
import ForwardingNumber from 'ringcentral-integration/modules/ForwardingNumber';

import callDirections from 'ringcentral-integration/enums/callDirections';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';

import ActiveCallPanel from '../../components/ActiveCallPanel';
import IncomingCallPanel from '../../components/IncomingCallPanel';
import ActiveCallBadge from '../../components/ActiveCallBadge';

import i18n from './i18n';

class ActiveCallPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badgeOffsetX: 0,
      badgeOffsetY: 0,
      selectedMatcherIndex: 0,
      avatarUrl: null,
    };

    this.onSelectMatcherName = (_, index) => {
      // `remember last matcher contact` will finish in next ticket
      this.setState({
        selectedMatcherIndex: (index - 1),
        avatarUrl: null,
      });
      const nameMatches = this.props.session.direction === callDirections.outbound ?
        this.props.toMatches : this.props.fromMatches;
      const contact = nameMatches && nameMatches[index - 1];
      if (contact) {
        this.props.getAvatarUrl(contact).then((avatarUrl) => {
          this.setState({ avatarUrl });
        });
      }
    };

    this.updatePositionOffset = (x, y) => {
      this.setState({
        badgeOffsetX: x,
        badgeOffsetY: y,
      });
    };

    this.answer = () =>
      this.props.answer(this.props.session.id);
    this.reject = () =>
      this.props.reject(this.props.session.id);
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
    this.hangup = () =>
      this.props.hangup(this.props.session.id);
    this.onKeyPadChange = value =>
      this.props.sendDTMF(value, this.props.session.id);
    this.toVoiceMail = () =>
      this.props.toVoiceMail(this.props.session.id);
    this.replyWithMessage = message =>
      this.props.replyWithMessage(this.props.session.id, message);
    this.onForward = forwardNumber =>
      this.props.onForward(this.props.session.id, forwardNumber);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.session.id !== nextProps.session.id) {
      this.setState({
        selectedMatcherIndex: 0,
        avatarUrl: null,
      });
      const nameMatches = nextProps.session.direction === callDirections.outbound ?
        nextProps.toMatches : nextProps.fromMatches;
      const contact = nameMatches && nameMatches[0];
      if (contact) {
        nextProps.getAvatarUrl(contact).then((avatarUrl) => {
          this.setState({ avatarUrl });
        });
      }
    }
  }

  render() {
    const session = this.props.session;
    const active = !!session.id;
    if (!active) {
      return null;
    }
    if (this.props.minimized) {
      return (
        <ActiveCallBadge
          onClick={this.props.toggleMinimized}
          offsetX={this.state.badgeOffsetX}
          offsetY={this.state.badgeOffsetY}
          updatePositionOffset={this.updatePositionOffset}
          title={i18n.getString('activeCall', this.props.currentLocale)}
        />
      );
    }
    let isRinging = false;
    if (
      session.direction === callDirections.inbound &&
      session.callStatus === sessionStatus.connecting
    ) {
      isRinging = true;
    }
    // isRinging = true;
    const phoneNumber = session.direction === callDirections.outbound ?
      session.to : session.from;
    const nameMatches = session.direction === callDirections.outbound ?
      this.props.toMatches : this.props.fromMatches;
    let fallbackUserName;
    if (session.direction === callDirections.inbound && session.from === 'anonymous') {
      fallbackUserName = i18n.getString('anonymous', this.props.currentLocale);
    }
    if (!fallbackUserName) {
      fallbackUserName = i18n.getString('unknown', this.props.currentLocale);
    }
    if (isRinging) {
      return (
        <IncomingCallPanel
          currentLocale={this.props.currentLocale}
          nameMatches={nameMatches}
          fallBackName={fallbackUserName}
          phoneNumber={phoneNumber}
          answer={this.answer}
          reject={this.reject}
          replyWithMessage={this.replyWithMessage}
          toVoiceMail={this.toVoiceMail}
          formatPhone={this.props.formatPhone}
          areaCode={this.props.areaCode}
          countryCode={this.props.countryCode}
          selectedMatcherIndex={this.state.selectedMatcherIndex}
          onSelectMatcherName={this.onSelectMatcherName}
          avatarUrl={this.state.avatarUrl}
          onBackButtonClick={this.props.toggleMinimized}
          forwardingNumbers={this.props.forwardingNumbers}
          onForward={this.onForward}
        >
          {this.props.children}
        </IncomingCallPanel>
      );
    }
    return (
      <ActiveCallPanel
        backButtonLabel={i18n.getString('activeCalls', this.props.currentLocale)}
        currentLocale={this.props.currentLocale}
        formatPhone={this.props.formatPhone}
        phoneNumber={phoneNumber}
        sessionId={session.id}
        callStatus={session.callStatus}
        startTime={session.startTime}
        isOnMute={session.isOnMute}
        isOnHold={session.isOnHold}
        isOnRecord={session.isOnRecord}
        onBackButtonClick={this.props.toggleMinimized}
        onMute={this.onMute}
        onUnmute={this.onUnmute}
        onHold={this.onHold}
        onUnhold={this.onUnhold}
        onRecord={this.onRecord}
        onStopRecord={this.onStopRecord}
        onKeyPadChange={this.onKeyPadChange}
        hangup={this.hangup}
        onAdd={this.props.onAdd}
        nameMatches={nameMatches}
        fallBackName={fallbackUserName}
        areaCode={this.props.areaCode}
        countryCode={this.props.countryCode}
        selectedMatcherIndex={this.state.selectedMatcherIndex}
        onSelectMatcherName={this.onSelectMatcherName}
        avatarUrl={this.state.avatarUrl}
      >
        {this.props.children}
      </ActiveCallPanel>
    );
  }
}

ActiveCallPage.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string,
    direction: PropTypes.string,
    startTime: PropTypes.number,
    isOnMute: PropTypes.bool,
    isOnHold: PropTypes.bool,
    isOnRecord: PropTypes.bool,
    to: PropTypes.string,
    from: PropTypes.string,
  }).isRequired,
  currentLocale: PropTypes.string.isRequired,
  minimized: PropTypes.bool.isRequired,
  toggleMinimized: PropTypes.func.isRequired,
  onMute: PropTypes.func.isRequired,
  onUnmute: PropTypes.func.isRequired,
  onHold: PropTypes.func.isRequired,
  onUnhold: PropTypes.func.isRequired,
  onRecord: PropTypes.func.isRequired,
  onStopRecord: PropTypes.func.isRequired,
  hangup: PropTypes.func.isRequired,
  answer: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  sendDTMF: PropTypes.func.isRequired,
  toVoiceMail: PropTypes.func.isRequired,
  replyWithMessage: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  children: PropTypes.node,
  toMatches: PropTypes.array.isRequired,
  fromMatches: PropTypes.array.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  getAvatarUrl: PropTypes.func.isRequired,
  forwardingNumbers: PropTypes.array.isRequired,
  onForward: PropTypes.func.isRequired,
};

ActiveCallPage.defaultProps = {
  children: undefined,
};

function mapToProps(_, {
  webphone,
  locale,
  contactMatcher,
  regionSettings,
  forwardingNumber,
}) {
  const currentSession = webphone.currentSession || {};
  const contactMapping = contactMatcher && contactMatcher.dataMapping;
  return {
    fromMatches: (contactMapping && contactMapping[currentSession.from]) || [],
    toMatches: (contactMapping && contactMapping[currentSession.to]) || [],
    currentLocale: locale.currentLocale,
    session: currentSession,
    minimized: webphone.minimized,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    forwardingNumbers: forwardingNumber.forwardingNumbers,
  };
}

function mapToFunctions(_, {
  webphone,
  regionSettings,
  router,
  getAvatarUrl,
}) {
  return {
    formatPhone: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
    }),
    hangup: sessionId => webphone.hangup(sessionId),
    answer: sessionId => webphone.answer(sessionId),
    reject: sessionId => webphone.reject(sessionId),
    onMute: sessionId => webphone.mute(sessionId),
    onUnmute: sessionId => webphone.unmute(sessionId),
    onHold: sessionId => webphone.hold(sessionId),
    onUnhold: sessionId => webphone.unhold(sessionId),
    onRecord: sessionId => webphone.startRecord(sessionId),
    onStopRecord: sessionId => webphone.stopRecord(sessionId),
    onAdd: () => {
      router.push('/');
      webphone.toggleMinimized();
    },
    sendDTMF: (value, sessionId) => webphone.sendDTMF(value, sessionId),
    toVoiceMail: sessionId => webphone.toVoiceMail(sessionId),
    onForward: (sessionId, forwardNumber) => webphone.forward(sessionId, forwardNumber),
    replyWithMessage: (sessionId, message) => webphone.replyWithMessage(sessionId, message),
    toggleMinimized: () => webphone.toggleMinimized(),
    getAvatarUrl,
  };
}

const ActiveCallContainer = connect(
  mapToProps,
  mapToFunctions,
)(ActiveCallPage);

ActiveCallContainer.propTypes = {
  webphone: PropTypes.instanceOf(Webphone).isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
  regionSettings: PropTypes.instanceOf(RegionSettings).isRequired,
  forwardingNumber: PropTypes.instanceOf(ForwardingNumber).isRequired,
  getAvatarUrl: PropTypes.func,
};

ActiveCallContainer.defaultProps = {
  getAvatarUrl: () => null,
};

export default ActiveCallContainer;

