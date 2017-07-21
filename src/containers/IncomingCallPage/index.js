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

import IncomingCallPanel from '../../components/IncomingCallPanel';

import i18n from './i18n';

class IncomingCallPage extends Component {
  constructor(props) {
    super(props);

    let selectedMatcherIndex = 0;
    if (props.session.contactMatch) {
      selectedMatcherIndex = props.nameMatches.findIndex(match =>
        match.id === props.session.contactMatch.id
      );
    }
    this.state = {
      selectedMatcherIndex,
      avatarUrl: null,
    };

    this.onSelectMatcherName = (_, index) => {
      // `remember last matcher contact` will finish in next ticket
      this.setState({
        selectedMatcherIndex: (index - 1),
        avatarUrl: null,
      });
      const nameMatches = this.props.nameMatches;
      const contact = nameMatches && nameMatches[index - 1];
      if (contact) {
        this.props.updateSessionMatchedContact(this.props.session.id, contact);
        this.props.getAvatarUrl(contact).then((avatarUrl) => {
          this.setState({ avatarUrl });
        });
      }
    };

    this.answer = () =>
      this.props.answer(this.props.session.id);
    this.reject = () =>
      this.props.reject(this.props.session.id);
    this.toVoiceMail = () =>
      this.props.toVoiceMail(this.props.session.id);
    this.replyWithMessage = message =>
      this.props.replyWithMessage(this.props.session.id, message);
    this.onForward = forwardNumber =>
      this.props.onForward(this.props.session.id, forwardNumber);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.session.id !== nextProps.session.id) {
      let selectedMatcherIndex = 0;
      let contact = nextProps.session.contactMatch;
      if (!contact) {
        contact = nextProps.nameMatches && nextProps.nameMatches[0];
      } else {
        selectedMatcherIndex = nextProps.nameMatches.findIndex(match =>
          match.id === contact.id
        );
      }
      this.setState({
        selectedMatcherIndex,
        avatarUrl: null,
      });
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
      return null;
    }
    let isRinging = false;
    if (
      session.direction === callDirections.inbound &&
      session.callStatus === sessionStatus.connecting
    ) {
      isRinging = true;
    }
    // isRinging = true;
    if (!isRinging) {
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
    return (
      <IncomingCallPanel
        currentLocale={this.props.currentLocale}
        nameMatches={this.props.nameMatches}
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
}

IncomingCallPage.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.string,
    direction: PropTypes.string,
    startTime: PropTypes.number,
    isOnMute: PropTypes.bool,
    isOnHold: PropTypes.bool,
    isOnRecord: PropTypes.bool,
    to: PropTypes.string,
    from: PropTypes.string,
    contactMatch: PropTypes.object,
  }).isRequired,
  currentLocale: PropTypes.string.isRequired,
  minimized: PropTypes.bool.isRequired,
  toggleMinimized: PropTypes.func.isRequired,
  answer: PropTypes.func.isRequired,
  reject: PropTypes.func.isRequired,
  toVoiceMail: PropTypes.func.isRequired,
  replyWithMessage: PropTypes.func.isRequired,
  formatPhone: PropTypes.func.isRequired,
  children: PropTypes.node,
  nameMatches: PropTypes.array.isRequired,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  getAvatarUrl: PropTypes.func.isRequired,
  forwardingNumbers: PropTypes.array.isRequired,
  onForward: PropTypes.func.isRequired,
  updateSessionMatchedContact: PropTypes.func.isRequired,
};

IncomingCallPage.defaultProps = {
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
  const fromMatches = (contactMapping && contactMapping[currentSession.from]) || [];
  const toMatches = (contactMapping && contactMapping[currentSession.to]) || [];
  const nameMatches =
    currentSession.direction === callDirections.outbound ? toMatches : fromMatches;
  return {
    nameMatches,
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
  getAvatarUrl,
}) {
  return {
    formatPhone: phoneNumber => formatNumber({
      phoneNumber,
      areaCode: regionSettings.areaCode,
      countryCode: regionSettings.countryCode,
    }),
    answer: sessionId => webphone.answer(sessionId),
    reject: sessionId => webphone.reject(sessionId),
    toVoiceMail: sessionId => webphone.toVoiceMail(sessionId),
    onForward: (sessionId, forwardNumber) => webphone.forward(sessionId, forwardNumber),
    replyWithMessage: (sessionId, message) => webphone.replyWithMessage(sessionId, message),
    toggleMinimized: () => webphone.toggleMinimized(),
    updateSessionMatchedContact: (sessionId, contact) =>
      webphone.updateSessionMatchedContact(sessionId, contact),
    getAvatarUrl,
  };
}

const IncomingCallContainer = connect(
  mapToProps,
  mapToFunctions,
)(IncomingCallPage);

IncomingCallContainer.propTypes = {
  webphone: PropTypes.instanceOf(Webphone).isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
  regionSettings: PropTypes.instanceOf(RegionSettings).isRequired,
  forwardingNumber: PropTypes.instanceOf(ForwardingNumber).isRequired,
  getAvatarUrl: PropTypes.func,
};

IncomingCallContainer.defaultProps = {
  getAvatarUrl: () => null,
};

export default IncomingCallContainer;

