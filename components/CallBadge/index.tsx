import React, { Component } from 'react';

import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import sessionStatus from '@ringcentral-integration/commons/modules/Webphone/sessionStatus';

import ActiveCallBadge from '../ActiveCallBadge';
import i18n from './i18n';
import { CallBadgeProps, CallBadgeState } from './types';

export default class CallBadge extends Component<
  CallBadgeProps,
  CallBadgeState
> {
  constructor(props) {
    super(props);

    this.state = {
      badgeOffsetX: props.defaultOffsetX || 0,
      badgeOffsetY: props.defaultOffsetY || 0,
    };
  }

  updatePositionOffset = (x, y) => {
    this.setState({
      badgeOffsetX: x,
      badgeOffsetY: y,
    });
  };

  onClick = () => {
    const isRinging = this._isRinging();
    const { session, toggleMinimized, goToCallCtrl } = this.props;
    if (isRinging) {
      toggleMinimized(session.id);
      return;
    }
    goToCallCtrl(session.id);
  };

  _isRinging() {
    let isRinging = false;
    const { session } = this.props;
    if (
      session.direction === callDirections.inbound &&
      session.callStatus === sessionStatus.connecting
    ) {
      isRinging = true;
    }
    return isRinging;
  }

  render() {
    const { session, hidden, currentLocale } = this.props;
    const { badgeOffsetX, badgeOffsetY } = this.state;
    const active = !!session.id;
    if (!active) {
      return null;
    }
    const isRinging = this._isRinging();
    if (isRinging && !session.minimized) {
      return null;
    }
    if (hidden) {
      return null;
    }
    return (
      <ActiveCallBadge
        onClick={this.onClick}
        offsetX={badgeOffsetX}
        offsetY={badgeOffsetY}
        updatePositionOffset={this.updatePositionOffset}
        title={i18n.getString('activeCall', currentLocale)}
      />
    );
  }
}
