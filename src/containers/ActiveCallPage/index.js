import { connect } from 'react-redux';
import React, { PropTypes, Component } from 'react';

import Webphone from 'ringcentral-integration/modules/Webphone';
import Locale from 'ringcentral-integration/modules/Locale';

import callDirections from 'ringcentral-integration/enums/callDirections';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';

import ActiveCallPanel from '../../components/ActiveCallPanel';
import IncomingCallPanel from '../../components/IncomingCallPanel';
import ActiveCallBadge from '../../components/ActiveCallBadge';

class ActiveCallPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badgeOffsetX: 0,
      badgeOffsetY: 0,
      connectedAt: new Date(),
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
    const userName = 'Unknow';
    if (isRinging) {
      return (
        <IncomingCallPanel
          currentLocale={this.props.currentLocale}
          toggleMinimized={this.props.toggleMinimized}
          userName={userName}
          phoneNumber={phoneNumber}
          answer={this.answer}
          reject={this.reject}
          replyWithMessage={this.replyWithMessage}
          toVoiceMail={this.toVoiceMail}
        >
          {this.props.children}
        </IncomingCallPanel>
      );
    }
    return (
      <ActiveCallPanel
        currentLocale={this.props.currentLocale}
        phoneNumber={phoneNumber}
        userName={userName}
        sessionId={session.id}
        callStatus={session.callStatus}
        startTime={session.startTime}
        isOnMute={session.isOnMute}
        isOnHold={session.isOnHold}
        isOnRecord={session.isOnRecord}
        toggleMinimized={this.props.toggleMinimized}
        onMute={this.onMute}
        onUnmute={this.onUnmute}
        onHold={this.onHold}
        onUnhold={this.onUnhold}
        onRecord={this.onRecord}
        onStopRecord={this.onStopRecord}
        onKeyPadChange={this.onKeyPadChange}
        hangup={this.hangup}
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
  children: PropTypes.node,
};

ActiveCallPage.defaultProps = {
  children: undefined,
};

function mapToProps(_, {
  webphone,
  locale,
}) {
  const currentSession = webphone.currentSession || {};
  return {
    currentLocale: locale.currentLocale,
    session: currentSession,
    minimized: webphone.minimized,
  };
}

function mapToFunctions(_, {
  webphone,
}) {
  return {
    hangup: webphone.hangup,
    answer: webphone.answer,
    reject: webphone.reject,
    onMute: sessionId => webphone.mute(sessionId),
    onUnmute: sessionId => webphone.unmute(sessionId),
    onHold: sessionId => webphone.hold(sessionId),
    onUnhold: sessionId => webphone.unhold(sessionId),
    onRecord: sessionId => webphone.startRecord(sessionId),
    onStopRecord: sessionId => webphone.stopRecord(sessionId),
    sendDTMF: (value, sessionId) => webphone.sendDTMF(value, sessionId),
    toVoiceMail: sessionId => webphone.toVoiceMail(sessionId),
    replyWithMessage: (sessionId, message) => webphone.replyWithMessage(sessionId, message),
    toggleMinimized: webphone.toggleMinimized,
  };
}

const ActiveCallContainer = connect(
  mapToProps,
  mapToFunctions,
)(ActiveCallPage);

ActiveCallContainer.propTypes = {
  webphone: PropTypes.instanceOf(Webphone).isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
};

export default ActiveCallContainer;

