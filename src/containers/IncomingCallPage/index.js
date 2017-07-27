import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Brand from 'ringcentral-integration/modules/Brand';
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

  componentDidMount() {
    this._updateAvatarAndMatchIndex(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.session.id !== nextProps.session.id) {
      this._updateAvatarAndMatchIndex(nextProps);
    }
  }

  _updateAvatarAndMatchIndex(props) {
    let selectedMatcherIndex = 0;
    let contact = props.session.contactMatch;
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
        this.setState({ avatarUrl });
      });
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
        brand={this.props.brand}
        showContactDisplayPlaceHolder={this.props.showContactDisplayPlaceHolder}
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
  showContactDisplayPlaceHolder: PropTypes.bool.isRequired,
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
  brand,
  showContactDisplayPlaceHolder,
}) {
  const currentSession = webphone.currentSession || {};
  const contactMapping = contactMatcher && contactMatcher.dataMapping;
  const fromMatches = (contactMapping && contactMapping[currentSession.from]) || [];
  const toMatches = (contactMapping && contactMapping[currentSession.to]) || [];
  const nameMatches =
    currentSession.direction === callDirections.outbound ? toMatches : fromMatches;
  return {
    brand: brand.fullName,
    nameMatches,
    currentLocale: locale.currentLocale,
    session: currentSession,
    minimized: webphone.minimized,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    forwardingNumbers: forwardingNumber.forwardingNumbers,
    showContactDisplayPlaceHolder,
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
  showContactDisplayPlaceHolder: PropTypes.bool,
  webphone: PropTypes.instanceOf(Webphone).isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
  brand: PropTypes.instanceOf(Brand).isRequired,
  regionSettings: PropTypes.instanceOf(RegionSettings).isRequired,
  forwardingNumber: PropTypes.instanceOf(ForwardingNumber).isRequired,
  getAvatarUrl: PropTypes.func,
  children: PropTypes.node,
};

IncomingCallContainer.defaultProps = {
  getAvatarUrl: () => null,
  showContactDisplayPlaceHolder: false,
  children: undefined,
};

export default IncomingCallContainer;

