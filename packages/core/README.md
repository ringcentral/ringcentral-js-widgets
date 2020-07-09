# @ringcentral-integration/core

## Usage

```sh
yarn add @ringcentral-integration/core
```

### RcModule APIs

`@ringcentral-integration/core` provides `RcModuleV2` base module, decorators `state`, `action`, `computed`, `storage` and `globalStorage`.

 The decorator `storage` depends on `Storage` Module, And  The decorator `globalStorage` depends on `GlobalStorage` Module.

> If you use `@computed(callback)`, you should make sure that the return value of its callback function is an Array of dependency collections.

For example:

```js
import {
  RcModuleV2,
  state,
  action,
  computed,
} from '@ringcentral-integration/core';

class Auth extends RcModuleV2 {
  @state
  connected = '';

  @action
  changeConnection(connected) {
    this.connected = connected;
  }

  @computed(({ connected }: Auth) => [connected])
  get permissions() {
      return { writeable: this.connected, readable: true };
  }
}
```

### RcUIModule APIs

`@ringcentral-integration/core` provides `RcUIModuleV2` base module and all decorators in `RcModuleV2`.

For example:

```js
import {
  RcUIModuleV2,
  state,
  action,
} from '@ringcentral-integration/core';

class DialerUI extends RcUIModuleV2 {
  getUIProps() {
    return {
      toNumber: this.toNumber,
    };
  }

  getUIFunctions() {
    return {
      dialout: () => this.dialout(),
    };
  }
}
```

### Dependency Injection

In `ringcentral-integration/lib/di`, We should reassign `constructor` arguments for harmony with `RcModuleV2` or `RcUIModuleV2`.

```js
@Module({
  name: 'Auth',
  deps: [
    'Alert',
  ],
})
class Auth extends RcModuleV2 {
  constructor({
    alert,
  }) {
    super({
      modules: {
        alert,
      },
    });
  }
}
```

### Storage and GlobalStorage APIs

`Storage` or `GlobalStorage` should injection in module with `ringcentral-integration/lib/di` if you need.

And You should pass parameters `enableCache` and `storageKey` in `constructor` for `super` args.

For example:

```js
@Module({
  name: 'Auth',
  deps: [
    'Storage',
    { dep: 'AuthOptions', optional: true },
  ],
})
class Auth extends RcModuleV2 {
  constructor({
    storage,
    enableCache = true,
  }) {
    super({
      modules: {
        storage,
      },
      enableCache,
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
