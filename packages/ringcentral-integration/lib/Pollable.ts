import RcModule from './RcModule';
import { Library } from './di';

@Library({
  deps: [{ dep: 'PollableOptions', optional: true }],
})
export default class Pollable extends RcModule {
  _tabManager: any;
  _timeoutId: any;
  constructor({ ...options }) {
    super({
      ...options,
    });
    this._timeoutId = null;
  }

  get timestamp() {
    throw new Error('timestamp is not defined');
  }

  get ttl() {
    throw new Error('ttl is not defined');
  }

  get pollingInterval() {
    return this.ttl;
  }

  get timeToRetry() {
    throw new Error('timeToRetry is not defined');
  }

  fetchData() {
    throw new Error('fetchData is not implemented');
  }

  _clearTimeout() {
    if (this._timeoutId) clearTimeout(this._timeoutId);
  }

  // @ts-expect-error TS(2365): Operator '+' cannot be applied to types 'void' and... Remove this comment to see the full error message
  _startPolling(t = this.timestamp + this.pollingInterval + 10 - Date.now()) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (!this._tabManager || this._tabManager.active) {
        // @ts-expect-error TS(1345): An expression of type 'void' cannot be tested for ... Remove this comment to see the full error message
        if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
          this.fetchData();
        } else {
          this._startPolling();
        }
        // @ts-expect-error TS(1345): An expression of type 'void' cannot be tested for ... Remove this comment to see the full error message
      } else if (this.timestamp && Date.now() - this.timestamp < this.ttl) {
        this._startPolling();
      } else {
        // @ts-expect-error TS(2345): Argument of type 'void' is not assignable to param... Remove this comment to see the full error message
        this._startPolling(this.timeToRetry);
      }
    }, t);
  }

  _retry(t = this.timeToRetry) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      // @ts-expect-error TS(1345): An expression of type 'void' cannot be tested for ... Remove this comment to see the full error message
      if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
        if (!this._tabManager || this._tabManager.active) {
          this.fetchData();
        } else {
          // continue retry checks in case tab becomes main tab
          this._retry();
        }
      }
      // @ts-expect-error TS(2769): No overload matches this call.
    }, t);
  }
}
