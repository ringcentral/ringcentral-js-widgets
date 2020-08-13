/**
 * @file simplify active call control page
 * detail: https://jira.ringcentral.com/browse/RCINT-8256
 */

import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import formatNumber from 'ringcentral-integration/lib/formatNumber';
import callDirections from 'ringcentral-integration/enums/callDirections';

import withPhone from '../../lib/withPhone';

import CallCtrlPanel from '../../components/CallCtrlPanel';
import callCtrlLayouts from '../../enums/callCtrlLayouts';
import { ACTIONS_CTRL_MAP } from '../../components/ActiveCallPad';
import i18n from './i18n';
import { pickFallBackInfo } from './utils';

function mapToProps(
  _,
  {
    phone: { activeCallControl, regionSettings, locale, brand, analytics },
    params,
    renderContactName,
  },
) {
  const { sessionId } = params;
  const { activeSession } = activeCallControl;
  let nameMatches = [];
  if (activeSession && !renderContactName) {
    nameMatches =
      activeSession.direction === callDirections.outbound
        ? activeSession.toMatches
        : activeSession.fromMatches;
  }
  let phoneNumber;
  if (activeSession) {
    phoneNumber =
      activeSession.direction === callDirections.outbound
        ? activeSession.to
        : activeSession.from;
  }
  let fallBackName = i18n.getString('Unknown', locale.currentLocale);
  if (renderContactName) {
    const {
      fallBackName: fallBackNameFromThirdParty,
      fallBackNumber,
    } = pickFallBackInfo(
      activeSession,
      renderContactName({
        sessionId: activeSession && activeSession.sessionId,
        telephonySessionId: sessionId,
      }),
      locale.currentLocale,
    );
    phoneNumber = fallBackNumber;
    fallBackName = fallBackNameFromThirdParty;
  }
  return {
    currentLocale: locale.currentLocale,
    activeSession,
    sessionId,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    nameMatches,
    phoneNumber,
    fallBackName,
    brand: brand.fullName,
    activeCallControl,
    controlBusy: activeCallControl.busy,
    analytics,
  };
}

function mapToFunctions(
  _,
  { phone: { routerInteraction, activeCallControl } },
) {
  return {
    onBackButtonClick() {
      routerInteraction.goBack();
    },
    setActiveSessionId(sessionId) {
      activeCallControl.setActiveSessionId(sessionId);
    },
    onTransfer(sessionId) {
      routerInteraction.push(`/transfer/${sessionId}/active`);
    },
  };
}

const { muteCtrl, transferCtrl, holdCtrl } = ACTIONS_CTRL_MAP;
// const actions = [muteCtrl, transferCtrl, holdCtrl]
class ActiveCallControlPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMatcherIndex: 0,
    };

    this.onMute = () => this.props.activeCallControl.mute(this.props.sessionId);
    this.onUnmute = () =>
      this.props.activeCallControl.unmute(this.props.sessionId);
    this.onHold = () => this.props.activeCallControl.hold(this.props.sessionId);
    this.onUnhold = () =>
      this.props.activeCallControl.unhold(this.props.sessionId);
    this.onHangup = () => {
      this.props.activeCallControl.hangUp(this.props.sessionId);
      this.props.analytics.track('Call Control: Hang up/Small call control');
    };

    this.formatPhone = (phoneNumber) =>
      formatNumber({
        phoneNumber,
        areaCode: this.props.areaCode,
        countryCode: this.props.countryCode,
      });

    this.onSelectMatcherName = (option) => {
      const nameMatches = this.props.nameMatches || [];
      let selectedMatcherIndex = nameMatches.findIndex(
        (match) => match.id === option.id,
      );
      if (selectedMatcherIndex < 0) {
        selectedMatcherIndex = 0;
      }
      this.setState({
        selectedMatcherIndex,
      });
    };
  }

  componentDidMount() {
    this.loadActCall();
  }

  loadActCall() {
    this.props.setActiveSessionId(this.props.sessionId);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.activeSession) {
      this.props.onBackButtonClick();
    }
  }

  render() {
    if (!this.props.activeSession) {
      // or using skeleton screen here
      return null;
    }

    return (
      <CallCtrlPanel
        sessionId={this.props.sessionId}
        currentLocale={this.props.currentLocale}
        fallBackName={this.props.fallBackName}
        phoneNumber={this.props.phoneNumber}
        onMute={this.onMute}
        onUnmute={this.onUnmute}
        onHold={this.onHold}
        onUnhold={this.onUnhold}
        onHangup={this.onHangup}
        onTransfer={this.props.onTransfer}
        showBackButton
        backButtonLabel={i18n.getString('allCalls', this.props.currentLocale)}
        onBackButtonClick={this.props.onBackButtonClick}
        formatPhone={this.formatPhone}
        areaCode={this.props.areaCode}
        countryCode={this.props.countryCode}
        selectedMatcherIndex={this.state.selectedMatcherIndex}
        layout={callCtrlLayouts.normalCtrl}
        startTime={this.props.activeSession.startTime}
        actions={this.props.actions}
        isOnMute={this.props.activeSession.isOnMute}
        isOnHold={this.props.activeSession.isOnHold}
        nameMatches={this.props.nameMatches}
        onSelectMatcherName={this.onSelectMatcherName}
        brand={this.props.brand}
        showContactDisplayPlaceholder={this.props.showContactDisplayPlaceholder}
        controlBusy={this.props.controlBusy}
      />
    );
  }
}

ActiveCallControlPanel.propTypes = {
  setActiveSessionId: PropTypes.func,
  currentLocale: PropTypes.string,
  sessionId: PropTypes.string,
  areaCode: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  activeSession: PropTypes.object,
  onBackButtonClick: PropTypes.func.isRequired,
  activeCallControl: PropTypes.object,
  nameMatches: PropTypes.array,
  fallBackName: PropTypes.string,
  phoneNumber: PropTypes.string,
  showContactDisplayPlaceholder: PropTypes.bool,
  brand: PropTypes.string.isRequired,
  onTransfer: PropTypes.func.isRequired,
  controlBusy: PropTypes.bool,
  actions: PropTypes.array,
  analytics: PropTypes.object,
};

ActiveCallControlPanel.defaultProps = {
  setActiveSessionId() {},
  currentLocale: 'en-US',
  activeCallControl: {},
  activeSession: null,
  sessionId: null,
  nameMatches: [],
  fallBackName: '',
  phoneNumber: '',
  showContactDisplayPlaceholder: false,
  controlBusy: false,
  actions: [muteCtrl, transferCtrl, holdCtrl],
  analytics: {},
};

export default withPhone(
  connect(mapToProps, mapToFunctions)(ActiveCallControlPanel),
);
