import RcModule from 'ringcentral-integration/lib/RcModule';
import { useRouterHistory, createMemoryHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, LOCATION_CHANGE } from 'react-router-redux';

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
    syncHistoryWithStore(this._history, this.store, {
      selectLocationState: () => this.state,
    });
  }

  get history() {
    return this._history;
  }

  get currentPath() {
    return this.state.locationBeforeTransitions.pathname;
  }

  get actionTypes() {
    return {
      locationChange: LOCATION_CHANGE
    };
  }
}
