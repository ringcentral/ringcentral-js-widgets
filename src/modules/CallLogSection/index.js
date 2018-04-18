import RcModule from 'ringcentral-integration/lib/RcModule';
import { Module } from 'ringcentral-integration/lib/di';
import getter from 'ringcentral-integration/lib/getter';
import { createSelector } from 'reselect';
import getThirdPartyCallReducer from './getCallLogSectionReducer';
import getStorageReducer from './getStorageReducer';
import actionTypes from './actionTypes';

@Module({
  name: 'CallLogSection',
  deps: [
    'Storage',
  ]
})
export default class CallLogSection extends RcModule {
  constructor(
    {
      storage,
      ...options,
    }
  ) {
    super(
      {
        storage,
        actionTypes,
        ...options,
      }
    );
    this._storage = storage;
    this._storageReducer = getStorageReducer(this.actionTypes);
    this._storageKey = 'callLogSection';
    this._storage.registerReducer({
      key: this._storageKey,
      reducer: this._storageReducer,
    });
    this._reducer = getThirdPartyCallReducer(this.actionTypes);
  }

  _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }

  _shouldInit() {
    return (
      this._storage.ready &&
      this.pending
    );
  }

  _shouldReset() {
    return (
      (
        !this._storage.ready
      ) && this.ready
    );
  }

  _showCallLogSection([call] = []) {
    if (call && !this.show) {
      this.showLogSection(call.sessionId);
    }
  }

  updateCall({ task, ...call }, sessionId) {
    this.store.dispatch({
      type: this.actionTypes.update,
      call,
      task,
      sessionId,
    });
  }

  logCall({ sessionId }) {
    const loggedCall = {
      isSaved: true,
      isLogged: true,
      isSaving: false
    };
    this.store.dispatch({
      type: this.actionTypes.update,
      call: loggedCall,
      sessionId,
    });
  }

  showLogSection(sessionId) {
    this.store.dispatch({
      type: this.actionTypes.showLogSection,
      sessionId
    });
  }

  hideLogSection() {
    if (this.show) {
      this.store.dispatch({
        type: this.actionTypes.hideLogSection
      });
    }
  }

  get status() {
    return this.state.status;
  }

  @getter
  calls = createSelector(
    () => this.callsMapping,
    () => this.tasksMapping,
    (callsMapping, tasksMapping) => Object
      .entries(callsMapping)
      .reduce(
        (calls, [sessionId, call]) => Object
          .assign(
            calls,
            {
              [sessionId]: {
                ...call,
                task: tasksMapping[sessionId],
              }
            }
          ),
        {}
      ),
  );

  get callsMapping() {
    return this._storage.getItem(this._storageKey).calls;
  }

  get tasksMapping() {
    return this._storage.getItem(this._storageKey).tasks;
  }

  get currentSessionId() {
    return this._storage.getItem(this._storageKey).currentSessionId;
  }

  get show() {
    return this._storage.getItem(this._storageKey).show;
  }
}
