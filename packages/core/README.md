# @ringcentral-integration/core

## Usage

```sh
yarn add @ringcentral-integration/core
```

### RcModule APIs

* `@ringcentral-integration/core` provides `RcModuleV2` base module, decorators `state`, `action`, `computed`, `storage` and `globalStorage`.

 The decorator `storage` depends on `Storage` Module, And  The decorator `globalStorage` depends on `GlobalStorage` Module.

> If you use `@computed(callback)`, you should make sure that the return value of its callback function is an Array of dependency collections.

> You should have access to all the dependency modules via `this._deps.xx`.

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

> Note: `@action` does **NOT** support asynchronous methods.

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

### Storage and GlobalStorage APIs

`Storage` or `GlobalStorage` should injection in module with `ringcentral-integration/lib/di` if you need.

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

  @track(trackEvents.inbound)
  inboundCall() {
    //
  }

  @track((that: Call, phoneNumber: string) => [
    trackEvents.outbound,
    { loginType: that.callType, phoneNumber },
  ])
  async dialout(phoneNumber: string) {
    //
  }
}
```

### State Subscription APIs

* `watch`

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
