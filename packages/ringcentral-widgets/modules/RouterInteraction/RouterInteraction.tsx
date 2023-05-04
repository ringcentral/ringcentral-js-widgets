// @ts-nocheck
import { createMemoryHistory, useRouterHistory } from 'react-router';
import {
  LOCATION_CHANGE,
  routerReducer,
  syncHistoryWithStore,
} from 'react-router-redux';

import moduleStatuses from '@ringcentral-integration/commons/enums/moduleStatuses';
import { Module } from '@ringcentral-integration/commons/lib/di';
import proxify from '@ringcentral-integration/commons/lib/proxy/proxify';
import RcModule from '@ringcentral-integration/commons/lib/RcModule';

function getDefaultHistory() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useRouterHistory(createMemoryHistory)();
}
/**
 * Known issues for browser history:
 * https://github.com/reactjs/react-router-redux/issues/570
 * https://github.com/ReactTraining/history/issues/427
 */
@Module({
  deps: [{ dep: 'RouterInteractionOptions', optional: true, spread: true }],
})
export default class RouterInteraction extends RcModule {
  constructor({ history = getDefaultHistory(), ...options }) {
    super({ ...options });
    this._reducer = routerReducer;
    this._history = history;
  }

  initialize() {
    this._history = syncHistoryWithStore(this._history, this.store, {
      selectLocationState: () => this.state,
    });
  }

  initializeProxy() {
    this._history = syncHistoryWithStore(this._history, this.store, {
      selectLocationState: () => this.state,
    });
  }

  get _actionTypes() {
    /* no action types */
    return null;
  }

  _onStateChange() {
    /* do nothing */
  }

  get history() {
    return this._history;
  }

  get currentPath(): string {
    return this.state.locationBeforeTransitions.pathname;
  }

  get status() {
    return moduleStatuses.ready;
  }

  @proxify
  async push(...args) {
    this._history.push(...args);
  }

  @proxify
  async replace(...args) {
    this._history.replace(...args);
  }

  @proxify
  async goBack(...args) {
    this._history.goBack(...args);
  }

  @proxify
  async go(...args) {
    this._history.go(...args);
  }

  get actionTypes() {
    return {
      locationChange: LOCATION_CHANGE,
    };
  }
}
