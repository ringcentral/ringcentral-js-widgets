import React, { Component } from 'react';

import { sleep } from '@ringcentral-integration/commons/lib/sleep';

import ConferenceParticipantPanel from '../ConferenceParticipantPanel';

type ConferenceParticipantContainerProps = {
  participants: any[];
  onBackButtonClick: (...args: any[]) => any;
  sessionCount: number;
};
// TODO: refactor ConferenceParticipantContainer and ConferenceParticipantPanel with Juno
class ConferenceParticipantContainer extends Component<
  ConferenceParticipantContainerProps,
  {}
> {
  constructor(props) {
    super(props);
    this.mounted = false;
  }
  componentDidMount() {
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!this.mounted) {
      return;
    }
    const { participants, onBackButtonClick, sessionCount } = this.props;
    if (
      !nextProps.participants.length &&
      nextProps.participants.length !== participants.length
    ) {
      sleep(750).then(() => {
        if (this.mounted && sessionCount) {
          onBackButtonClick();
        }
      });
    }
  }
  render() {
    return <ConferenceParticipantPanel {...this.props} />;
  }
}
export { ConferenceParticipantContainer };
