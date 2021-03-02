# @ringcentral-integration/core

The foundation package for RingCentral Integration products.

## Usage

```sh
yarn add @ringcentral-integration/core
```

## APIs

- [@ringcentral-integration/core](#ringcentral-integrationcore)
  - [Usage](#usage)
  - [APIs](#apis)
    - [RcModule APIs](#rcmodule-apis)
      - [state API](#state-api)
      - [action API](#action-api)
      - [computed API](#computed-api)
    - [RcUIModule APIs](#rcuimodule-apis)
    - [Dependency Injection](#dependency-injection)
    - [Storage and GlobalStorage APIs](#storage-and-globalstorage-apis)
    - [Tracking APIs](#tracking-apis)
    - [State Subscription APIs](#state-subscription-apis)

### RcModule APIs

`@ringcentral-integration/core` provides `RcModuleV2` base module, decorators `state`, `action`, `computed`, `storage` and `globalStorage`.

The decorator `storage` depends on `Storage` Module, And  The decorator `globalStorage` depends on `GlobalStorage` Module.

> You should have access to all the dependency modules via `this._deps.fooBar`.

- onInit()

`onInit` life cycle for current initialization after all deps modules are all ready.

- onInitOnce()

`onInitOnce` once life cycle for current initialization after all deps modules are all ready.

- onInitSuccess()

`onInitSuccess` life cycle for current initialization after this module is ready.

- onReset()

`onReset` life cycle for current reset after one of deps modules is not ready.

- onStateChange()

`onStateChange` each Redux dispatch action will trigger it once.

For example:

```ts
import {
  RcModuleV2,
  state,
  action,
  computed,
} from '@ringcentral-integration/core';

class Auth extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @state
  connected = '';

  @action
  changeConnection(connected) {
    this.connected = connected;
  }

  async connect() {
    await this._deps.client.connect();
    this.changeConnection(true);
  }

  @computed<Auth>((that) => [that.connected])
  get permissions() {
    return { writeable: this.connected, readable: true };
  }
}
```

#### state API

`@state` is used to decorate a module state, which is based on the Redux reducer.

#### action API

`@action` is used to decorate a method that changes the state of the module (Executing it will dispatch a Redux action), and it does **NOT** support asynchronous methods.

#### computed API

Use `@computed(callback)`, you should make sure that the return value of its callback function is an `Array` of dependency collections.

```ts
class Auth extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @state
  connected = '';

  @state
  readable = false;

  @computed<Auth>(({ connected, readable }) => [connected, readable])
  get permissions() {
    return { writeable: getWriteable(this.connected), readable: this.readable };
  }
}
```

### RcUIModule APIs

`@ringcentral-integration/core` provides `RcUIModuleV2` base module and all decorators in `RcModuleV2`.

For example:

```ts
import {
  RcUIModuleV2,
  computed,
} from '@ringcentral-integration/core';

class DialerUI extends RcUIModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  @computed<DialerUI>((that) => [
    that._deps.dialer.toNumber,
    that._deps.call.callType
  ])
  get toNumber() {
    if (that._deps.call.callType === 'WebRTC') {
      return that._deps.call.toNumber;
    }
    return this._deps.dialer.toNumber;
  }

  getUIProps(): DialerUIProps {
    return {
      toNumber: this.toNumber,
    };
  }

  getUIFunctions(): DialerUIFunctions {
    return {
      dialout: () => this.dialout(),
    };
  }
}
```

> Note: RcUIModule should **NOT** import any React components.

### Dependency Injection

In `ringcentral-integration/lib/di`, We should reassign `constructor` arguments for harmony with `RcModuleV2` or `RcUIModuleV2`.

```ts
@Module({
  name: 'Auth',
  deps: [
    'Alert',
  ],
})
class Auth extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }
}
```

> Note: All module options based on RcModuleV2 have `{ spread: true }` disabled on the DI settings.

### Storage and GlobalStorage APIs

`Storage` or `GlobalStorage` should be injected in module with `ringcentral-integration/lib/di`.

And You should pass parameters `enableCache`, `enableGlobalCache` and `storageKey` in `constructor` for `super` args.

If you only use `@storage`, then you only need to pass `enableCache`.

If you only use `@globalStorage`, then you only need to pass `enableGlobalCache`.

For example:

```js
@Module({
  name: 'Auth',
  deps: [
    'Storage',
    { dep: 'AuthOptions', optional: true },
  ],
})
class Auth extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
      enableCache: deps.authOptions?.enableCache ?? true,
      enableGlobalCache: deps.authOptions?.enableGlobalCache ?? true,
      storageKey: 'Auth',
    });
  }

  @storage
  @state
  connected = '';

  @globalStorage
  @state
  token = {};

  @action
  changeConnection(connected) {
    this.connected = connected;
  }
}
```

### Tracking APIs

`Analytics` or `AnalyticsOptions` should injection in the factory module, and You can use `@track` to decorate a class method.

For example:

```ts
class Call extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
  }

  // Pass a tracking event type
  @track(trackEvents.inbound)
  inboundCall() {
    //
  }

  // Pass a function that returns an array `[customTrackEvent, trackProps]`
  @track((that: Call, phoneNumber: string) => [
    trackEvents.outbound,
    { loginType: that.callType, phoneNumber },
  ])
  async dialout(phoneNumber: string) {
    //
  }

  // Pass a higher-order function and the sub-function has access to the `analytics` module
  @track(() => (analytics) => {
    analytics.setUserId();
    return [trackEvents.authentication];
  })
  @action
  setLoginSuccess(token: TokenInfo) {
    //
  }
}
```

### State Subscription APIs

- `watch`

It is used to subscribe to some state or `@computed` to get the derived computed state, which returns a callback function that can be used to cancel the subscription.

> This subscription will only be triggered if the state value of the subscription has been changed.

```ts
class Counter extends RcModuleV2<Deps> {
  constructor(deps: Deps) {
    super({
      deps,
    });
    watch(
      this,
      () => this.count,
      (newValue, oldValue) => {
        // do something
      },
    );
  }

  doSomething() {}

  @state
  count = 0;

  @action
  increase() {
    this.count += 1;
  }
}
```
