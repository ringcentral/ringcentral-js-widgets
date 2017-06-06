import RcModule from 'ringcentral-integration/lib/RcModule';
import { useRouterHistory, createMemoryHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import proxify from 'ringcentral-integration/lib/proxy/proxify';

function getDefaultHistory() {
  // if (typeof window !== 'undefined') {
  //   console.debug('hashHistory');
  //   return hashHistory;
  // }
  // console.debug('memoryHistory');
  return useRouterHistory(createMemoryHistory)();
}

export default class RouterInteraction extends RcModule {
  constructor({
    history = getDefaultHistory(),
    ...options
  }) {
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
    console.log('@@@ augment history');
    this._history = syncHistoryWithStore(this._history, this.store, {
      selectLocationState: () => this.state,
    });
    console.log('@@@ after augment history');
  }

  get history() {
    return this._history;
  }

  get currentPath() {
    return this.state.locationBeforeTransitions.pathname;
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
}
