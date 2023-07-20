import React, { Component } from 'react';

import { formatDuration } from '@ringcentral-integration/commons/lib/formatDuration';

type DurationCounterProps = {
  className?: string;
  startTime: number;
  offset?: number;
};
type DurationCounterState = {
  duration: number;
};
class DurationCounter extends Component<
  DurationCounterProps,
  DurationCounterState
> {
  interval: any;
  constructor(props: any) {
    super(props);
    this.state = this.calculateState();
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(this.calculateState());
    }, 1000);
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  calculateState() {
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const startTime = this.props.startTime + this.props.offset;
    return {
      duration: Math.round((new Date().getTime() - startTime) / 1000),
    };
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  render() {
    return (
      <span className={this.props.className}>
        {formatDuration(this.state.duration)}
      </span>
    );
  }
}
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
DurationCounter.defaultProps = {
  className: null,
  offset: 0,
};
export default DurationCounter;
