import RcModule from './RcModule';
import { Library } from './di';

@Library({
  deps: [{ dep: 'PollableOptions', optional: true }]
})
export default class Pollable extends RcModule {
  constructor({
    ...options
  }) {
    super({
      ...options,
    });
    this._timeoutId = null;
  }
  // eslint-disable-next-line class-methods-use-this
  get timestamp() {
    throw new Error('timestamp is not defined');
  }
  // eslint-disable-next-line class-methods-use-this
  get ttl() {
    throw new Error('ttl is not defined');
  }
  // eslint-disable-next-line class-methods-use-this
  get timeToRetry() {
    throw new Error('timeToRetry is not defined');
  }
  // eslint-disable-next-line class-methods-use-this
  fetchData() {
    throw new Error('fetchData is not implemented');
  }

  _clearTimeout() {
    if (this._timeoutId) clearTimeout(this._timeoutId);
  }

  _startPolling(t = (this.timestamp + this.ttl + 10) - Date.now()) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (!this._tabManager || this._tabManager.active) {
        if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
          this.fetchData();
        } else {
          this._startPolling();
        }
      } else if (this.timestamp && Date.now() - this.timestamp < this.ttl) {
        this._startPolling();
      } else {
        this._startPolling(this.timeToRetry);
      }
    }, t);
  }
  _retry(t = this.timeToRetry) {
    this._clearTimeout();
    this._timeoutId = setTimeout(() => {
      this._timeoutId = null;
      if (!this.timestamp || Date.now() - this.timestamp > this.ttl) {
        if (!this._tabManager || this._tabManager.active) {
          this.fetchData();
        } else {
          // continue retry checks in case tab becomes main tab
          this._retry();
        }
      }
    }, t);
  }
}
