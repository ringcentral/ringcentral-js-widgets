import RcModule from '../../lib/RcModule';
import { Module } from '../../lib/di';
import actionTypes from './actionTypes';
import getVideoReducer from './getVideoReducer';

@Module({
  deps: [
    'Client',
  ]
})
export default class RCVideo extends RcModule {
  _client: any;
  constructor({
    client,
    reducers,
    ...options
  }) {
    super({
      ...options,
      actionTypes: options.actionTypes || actionTypes,
    });
    this._client = client;
    this._reducer = getVideoReducer(this.actionTypes, reducers);
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this._init();
    }
  }

  _shouldInit() {
    return this.pending;
  }

  _init() {
    this.store.dispatch({
      type: this.actionTypes.initSuccess
    });
  }

  async createMeeting(client, params) {
    console.log('params', params);
    const meetingResult = await client.service.platform().post('/rcvideo/v1/bridges', params);
    console.log('result', meetingResult);
  }

  get status() {
    return this.state.status;
  }
}
