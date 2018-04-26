#Creating Modules

All integration modules are based on RcModule base class. Which is deeply tied to redux. Here we'll use the Call module as an example to walk through the basics of module creation. Please note that the code shown here may not be the latest implementation of Call module.

Typical Folder Structure
---
```
    Call/
        - index.js => where the module class is written
        - actionTypes.js => where the redux actions are defined
        - callStatus.js => where the status definition of the module is
        - callErrors.js => where all the errors of the module is defined
        - getCallReducer.js => where the reducer of the module is written
        - getCallReducer.test.js => where the test of the reducer is written
        - index.test.js => where the unit test of index file is written
```

Define Actions
---

Here we defined all the redux action types for the module by using the Enum helper class.

And we defined the module status related action types in moduleActionTypes enums.

```javascript
import Enum from '../../lib/Enum';
import moduleActionTypes from '../../enums/moduleActionTypes';

export default new Enum([
  ...Object.keys(moduleActionTypes),
  'connect',
  'connectSuccess',
  'connectError',
], 'callActionTypes'); // prefix the actions with the module name

/* the result is similar to:
{
    init: 'callActionTypes-init',
    initSuccess: 'callActionTypes-initSuccess',
    reset: 'callActionTypes-reset',
    resetSuccess: 'callActionTypes-resetSuccess',
    connect: 'callActionTypes-connect',
    connectSuccess: 'callActionTypes-connectSuccess',
    connectError: 'callActionTypes-connectError',
}
*/

```

Define Reducers
---

Reducers are the core of redux. It is what defines an redux application. In the modules design, we are not ruling the possibility of running multiple instances of phones in the same application. Therefore all the reducers needs to support prefixed actions.

```javascript
import { combineReducers } from 'redux';
import getModuleStatusReducer from '../../lib/getModuleStatusReducer';
import callStatus from './callStatus';

export function getCallStatusReducer(types) {
  return (state = callStatus.idle, { type }) => {
    switch (type) {
      case types.connect:
        return callStatus.connecting;

      case types.connectSuccess:
      case types.connectError:
        return callStatus.idle;

      default:
        return state;
    }
  };
}

export default function getCallReducer(types) {
  return combineReducers({
    status: getModuleStatusReducer(types),
    callStatus: getCallStatusReducer(types),
  });
}
```

The bottom line is that we should treat the state object as immutable object, even though it is not implemented as an immutable object.


The Module Definition
---

Here we extend the RcModule class to create the Call module. There are some key points in module creation.

```javascript
import RcModule from '../../lib/RcModule';
import callingModes from '../CallingSettings/callingModes';
import moduleStatuses from '../../enums/moduleStatuses';
import proxify from '../../lib/proxy/proxify';
import callActionTypes from './actionTypes';
import getCallReducer, {
  getLastCallNumberReducer,
} from './getCallReducer';

import callStatus from './callStatus';
import callErrors from './callErrors';
import ringoutErrors from '../Ringout/ringoutErrors';


export default class Call extends RcModule {
  constructor({
    alert,
    client,
    storage,
    ...options
  }) {
    super({
      ...options,
      actionTypes: callActionTypes,
      // remember to pass action definitions into super
      // RcModule will automatically bind the prefixed result as this.actionTypes
    });
    this._alert = alert;
    this._client = client;
    this._storage = storage;
    this._storageKey = 'lastCallNumber';
    // set reducers to this._reducer, this is required by RcModule
    this._reducer = getCallReducer(this.actionTypes);

    // bind lastCallNumber state to storage
    this._storage.registerReducer({
      key: this._storageKey,
      reducer: getLastCallNumberReducer(this.actionTypes),
    });
  }

  initialize() {
    // subscribe state change.
    this.store.subscribe(() => this._onStateChange());
  }

  async _onStateChange() {
    // update status on state change.
    if (
      this._alert.ready &&
      this._storage.ready &&
      this._client.ready &&
      this.pending
    ) {
      this.store.dispatch({
        type: this.actionTypes.init,
      });
      await this._initCallModule();
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (
      (
        !this._alert.ready ||
        !this._storage.ready ||
        !this._client.ready
      ) &&
      this.ready
    ) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }

  // get last call number from storage
  get lastCallNumber() {
    return this._storage.getItem(this._storageKey) || '';
  }

  // The proxify decorator will be explained in the proxy guide.
  @proxify
  async onCall() {
    // do something on call
  }

  // Simple getters to state looks like this.
  // Getters can also include some business logic such as filtering or sorting results.
  // Getters should not modify the state however.
  get status() {
    return this.state.status;
  }

  get ready() {
    return this.state.status === moduleStatuses.ready;
  }

  get pending() {
    return this.state.status === moduleStatuses.pending;
  }

  // Provide getters to the callStatus state
  get callStatus() {
    return this.state.callStatus;
  }
}
```

Using Modules
---

Let's go through some demo code to see how modules are used.

```javascript
import SDK from 'ringcentral';
import RingCentralClient from 'ringcentral-client';
import { combineReducers, createStore } from 'redux';
import RcModule  from '../src/lib/RcModule';

import Alert from '../src/modules/Alert';
import Storage from '../src/modules/Storage';
import Call from '../src/modules/DialingPlan';

import config from './config';

// Phone objects are actually RcModules as well. We want to reuse as much code as possible.
class DemoPhone extends RcModule {
  constructor() {
    super();

    const reducers = {};
    // addModule helper function binds the sub module object to the parent.
    this.addModule('client', new RingCentralClient(new SDK({
      ...config,
    })));

    this.addModule('alert', new Alert({
      getState: () => this.state.alert,
    }));
    reducers.alert = this.alert.reducer;

    this.addModule('auth', new Auth({
      alert: this.alert,
      client: this.client,
      getState: () => this.state.auth,
    }));
    reducers.auth = this.auth.reducer;

    this.addModule('storage', new Storage({
      auth: this.auth,
      reducers.storage = this.storage.reducer;
    }));

    // Here we bind the call module to the parent. We also pass in
    // the dependencies here.
    // It is import to note that the getState function is mandatory.
    // This function simply returns the part of the state that belongs to the sub module.
    this.addModule('call', new Call({
      alert: this.alert,
      client: this.client,
      storage: this.storage,
      getState: () => this.state.call,
    }));
    reducers.call = this.call.reducer;

    // Here we create the phone reducer by combining the reducers of sub modules.
    // We also bind it to the phone object with a symbol.
    this._reducer = combineReducers({
      ...reducers,
    });
  }
}

// To use the phone object, first we initiate an instance
const phone = new DemoPhone();

// We then create a store with the reducers. Note that you may
// further combine the phone reducer with more reducers before creating the store.
// You may have UI states that you want to manage with redux as well, or other kind of
// states.
const store = createStore(phone.reducer);

// Use the setStore helper function to set the store into the modules and
// initialize them.
phone.setStore(store);

// You can also use store's subscribe function to monitor every state change.
store.subscribe(() => {
  console.log(store.getState());
});

if (typeof window !== 'undefined') {
  window.phone = phone;
}

// Here we demo how the phone instance is used
(async () => {
  if (!phone.auth.loggedIn) {
    await phone.auth.login({
      ...config.user,
    });
  }
  await phone.call.call('phoneNumber');
})();

```

Further Reading
---

- [Local Development](local-development.md)
