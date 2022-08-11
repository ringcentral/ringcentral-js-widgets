import React, { Component } from 'react';

import { sleep } from '@ringcentral-integration/commons/utils';

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
  mounted: any;
  constructor(props: any) {
    super(props);
    this.mounted = false;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this.mounted = true;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    this.mounted = false;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  UNSAFE_componentWillReceiveProps(nextProps: any) {
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
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    // @ts-expect-error TS(2741): Property 'currentLocale' is missing in type '{ par... Remove this comment to see the full error message
    return <ConferenceParticipantPanel {...this.props} />;
  }
}
export { ConferenceParticipantContainer };
