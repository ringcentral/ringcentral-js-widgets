import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Webphone from 'ringcentral-integration/modules/Webphone';
import Locale from 'ringcentral-integration/modules/Locale';
import callDirections from 'ringcentral-integration/enums/callDirections';
import sessionStatus from 'ringcentral-integration/modules/Webphone/sessionStatus';

import ActiveCallBadge from '../../components/ActiveCallBadge';

import i18n from './i18n';

class CallBadge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badgeOffsetX: 0,
      badgeOffsetY: 0,
    };

    this.updatePositionOffset = (x, y) => {
      this.setState({
        badgeOffsetX: x,
        badgeOffsetY: y,
      });
    };

    this.onClick = () => {
      const isRinging = this._isRinging();
      if (isRinging) {
        this.props.toggleMinimized(this.props.session.id);
        return;
      }
      this.props.goToCallCtrl();
    };
  }

  _isRinging() {
    let isRinging = false;
    const session = this.props.session;
    if (
      session.direction === callDirections.inbound &&
      session.callStatus === sessionStatus.connecting
    ) {
      isRinging = true;
    }
    return isRinging;
  }

  render() {
    const session = this.props.session;
    const active = !!session.id;
    if (!active) {
      return null;
    }
    const isRinging = this._isRinging();
    if (isRinging && !session.minimized) {
      return null;
    }
    if (this.props.hidden) {
      return null;
    }
    return (
      <ActiveCallBadge
        onClick={this.onClick}
        offsetX={this.state.badgeOffsetX}
        offsetY={this.state.badgeOffsetY}
        updatePositionOffset={this.updatePositionOffset}
        title={i18n.getString('activeCall', this.props.currentLocale)}
      />
    );
  }
}

CallBadge.propTypes = {
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
  toggleMinimized: PropTypes.func.isRequired,
  goToCallCtrl: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired,
};

function mapToProps(_, {
  webphone,
  locale,
  hidden,
  goToCallCtrl,
}) {
  const currentSession =
    webphone.activeSession || webphone.ringSession || {};
  return {
    currentLocale: locale.currentLocale,
    session: currentSession,
    hidden,
    goToCallCtrl,
  };
}

function mapToFunctions(_, {
  webphone,
}) {
  return {
    toggleMinimized: sessionId => webphone.toggleMinimized(sessionId),
  };
}

const CallBadgeContainer = connect(
  mapToProps,
  mapToFunctions,
)(CallBadge);

CallBadgeContainer.propTypes = {
  webphone: PropTypes.instanceOf(Webphone).isRequired,
  hidden: PropTypes.bool.isRequired,
  goToCallCtrl: PropTypes.func.isRequired,
  locale: PropTypes.instanceOf(Locale).isRequired,
};

export default CallBadgeContainer;

