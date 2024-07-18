import callDirections from '@ringcentral-integration/commons/enums/callDirections';
import sessionStatus from '@ringcentral-integration/commons/modules/Webphone/sessionStatus';
import React, { Component } from 'react';

import ActiveCallBadge from '../ActiveCallBadge';

import i18n from './i18n';
import type { CallBadgeProps, CallBadgeState } from './types';

export default class CallBadge extends Component<
  CallBadgeProps,
  CallBadgeState
> {
  constructor(props: any) {
    super(props);

    this.state = {
      badgeOffsetX: props.defaultOffsetX || 0,
      badgeOffsetY: props.defaultOffsetY || 0,
    };
  }

  updatePositionOffset = (x: any, y: any) => {
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

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    const { session, hidden, currentLocale } = this.props;
    const { badgeOffsetX, badgeOffsetY } = this.state;
    const active = !!session.id;
    if (!active) {
      return null;
    }
    const isRinging = this._isRinging();
    // @ts-expect-error TS(2339): Property 'minimized' does not exist on type 'Sessi... Remove this comment to see the full error message
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
