# ringcentral-js-integration-commons

[![Build Status](https://travis-ci.org/ringcentral/ringcentral-js-widgets.svg?branch=master)](https://travis-ci.org/ringcentral/ringcentral-js-widgets)
[![Coverage Status](https://coveralls.io/repos/github/ringcentral/ringcentral-js-widgets/badge.svg?branch=master)](https://coveralls.io/github/ringcentral/ringcentral-js-widgets?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/39f7f85c990b4eeab98702c89cdd31d3)](https://www.codacy.com/app/RingCentral/ringcentral-js-widgets?utm_source=github.com&utm_medium=referral&utm_content=ringcentral/ringcentral-js-widgets&utm_campaign=badger)
[![NPM Version](https://img.shields.io/npm/v/@ringcentral-integration/commons.svg?style=flat-square)](https://www.npmjs.com/package/@ringcentral-integration/commons)


## Introduction

RingCentral integration common library aims to provide reusable modules to allow developers to integrate RingCentral unified communication service into third party processes or tools more easily.

This project is built based on [RingCentral Client](https://www.npmjs.com/package/ringcentral-client) and [Redux](https://github.com/reactjs/redux). The basic idea is to wrap [RingCentral REST API](https://developer.ringcentral.com/) into highly reusable modules based on common application scenarios and provide an unified application state.

## Get Started

To use this library, please follow below steps

Install from NPM

```bash
npm install @ringcentral-integration/commons
```

Create your own Phone object by adding modules

```javascript
import { combineReducers, createStore } from 'redux';

class Phone extends RcModule {
  constructor() {
    super();
    this.addModule('${module}');
    this._reducer = combineReducers({
      ${moduleName}: this.${module}.reducer,
    });
  }
}
const phone = new Phone();
const store = createStore(phone.reducer);
phone.setStore(store);

```

Now you are armed with a set of RingCentral services.

**Notice: If you have no idea what this section is talking about, which is the case most of the time, please reference next section for more info.**

## High Level Concept

### Module
Module is the basic component, which usually wraps one ore more API calls to provide common used features. A good example to understand module is to compare Call Log related features in `RingCentral JS Client` and `RingCentral Integration Common Library`. In `RingCentral JS Client`, you can get call log with following code

```javascript
client.account().extension().callLog().list({
	...param
})
```

There are three kind of modules:
1. Root module, which provides all other modules for app. Root module also have a duty to provide redux store, this will be discussed more in later sections.
2. Common modules, which holds a part of functions provided by api.
3. Custom modules, when common modules can not fulfill your need, you develop one yourself.

### Root Module

All needed common modules which are provided by `@ringcentral-integration/commons` can be listed here. And also other modules composed by you.
```javascript
import { Alert } from '@ringcentral-integration/commons/modules/AlertV2';
import { Brand } from '@ringcentral-integration/commons/modules/Brand';

// import other libs
// other variables initialized here

@ModuleFactory({
  providers: [
    { provide: 'Alert', useClass: Alert },
    { provide: 'Brand', useClass: Brand },
    {
      provide: 'SdkConfig',
      useValue: {
        ...apiConfig,
        cachePrefix: `sdk-${prefix}`,
        clearCacheOnRefreshError: false,
      },
    },
    {
      provide: 'ContactSources',
      useFactory: ({ glipContacts }) =>
        [glipContacts],
      deps: ['GlipContacts']
    },
  ]
})
export default class BaseRoot extends RcModule {}
```

#### Custom Modules
There are two ways to custom modules:
1. Extends `RcModule` and set dependencies by decorators
2. Extends directly a build-in module

##### Extends RcModule
```javascript
@Module({
  deps: [
    'CompanyContacts',
    'GlipPersons',
    { dep: 'GlipContactsOptions', optional: true }
  ]
})
export default class GlipContacts extends RcModule {
}
```

##### Extends Build-in Module
```javascript
@Module({
  deps: []
})
export default class NewGlipGroups extends GlipGroups {
}
```

#### Module Providers
Two steps to set providers for root module.

Step 1. Set common moduels
```javascript

@ModuleFactory({
  providers: [
    { provide: 'Alert', useClass: Alert },
    { provide: 'Brand', useClass: Brand },
  ]
})
export default class BaseRoot extends RcModule {
  initialize() {
    // ...initialize stuff here
  }
}
```
Step 2. Set self composed modules by HOC
```javascript
function createRootModule({ apiConfig, redirectUri }) {
  @ModuleFactory({
    providers: [
      {provide: 'SDKConfig', useValue: {...apiConfig, cachePrefix: `sdk-${prefex}`}},
      { provide: 'OAuthOptions', useValue: { redirectUri }, spread: true },
    ]
  })
  class Root extends RcModule {}

  return Root.create();
}
```

##### How It Works
There's no action creator in modules. All actions are in an Enum instance.

`RcModule`'s default implementation included a method: `initialize()`, it's definition is:
```javascript
  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }
```
Generally you dont have to do any thing to change this implementation. Just get your `_onStateChange`
method done.

```javascript
  _onStateChange() {
    if (this._shouldInit()) {
      this.store.dispatch({
        type: this.actionTypes.initSuccess,
      });
    } else if (this._shouldReset()) {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess,
      });
    }
  }
```

`_shouldInit()` checks if all dependencies are initialized and when all done, send an `initSuccess` action.
This action will inform the store that your own module is initialized successfuly. Although the action is named `initSuccess` but it has it's prefix, which is your module's name or something else you specified.

`_shouleReset()` is the same.

##### Selector

Get what you want from state.

#### Module Store

1. Store can only be set to **Root Module**.
2. Store can noly be set once

```javascript
  setStore(store) {
    if (this._modulePath !== 'root') {
      throw new Error('setStore should only be called on root module');
    }
    if (!store) {
      throw new Error('setStore must accept a store object');
    }
    if (this._store) {
      throw new Error('setStore should only be called once');
    }
    this._setStore(store);
    this._initModule();
  }

  _setStore(store) {
    this._store = store;
    for (const subModule in this) {
      if (
        Object.prototype.hasOwnProperty.call(this, subModule) &&
          this[subModule] instanceof RcModule
      ) {
        this[subModule]._setStore(store);
      }
    }
  }
```

`setStore` methods also triggers module initialization.

1. All sub modules' `_setStore` methods are called too.
2. All sub modules. And in every module, the `initizlize` methods is called.

```javascript
  setStore(store) {
    // ...
    this._setStore(store);
    this._initModule();
  }

    _initModule() {
    if (
      !this._suppressInit &&
      !this._initialized
    ) {
      this._initialized = true;
      this.initialize();
    }

    for (const subModule in this) {
      if (
        Object.prototype.hasOwnProperty.call(this, subModule) &&
          this[subModule] instanceof RcModule
      ) {
        this[subModule]._initModule();
      }
    }
  }

  initialize() {
    this.store.subscribe(() => this._onStateChange());
  }
```

In `initialize` method, it may subscribe the store to state change.

#### Module's create method
1. Get all modules' value (if this module is `ValueProvider`) or instances.
In this step. all providers are resolved and set them to Root Module instance, key is the provider's token and instance is the provider's instance.
2. Get all sub modules' reducers, combine them then set it to Root Module's `_reducer` field.

### Phone

Phone is an aggregator of modules which provides a full functional object in application level. As different application requires different features, the Phone object needs to be constructed in application level by adding required modules. A typical way to create Phone object is something like below

```javascript
class Phone extends RcModule {
  constructor() {
    super();
    this.addModule('${module}');
    this._reducer = combineReducers({
      ${moduleName}: this.${module}.reducer,
    });
  }
}
const phone = new Phone();
```

### Store
As Phone object is built up with Redux, after Phone object is created, you need to use following code to create Redux store

```javascript
const store = createStore(phone.reducer);
phone.setStore(store);
```

### Action
Actions are defined with ObjectMap class, which will be discussed in next section.
```javascript
export const ObjectMap.prefixKeys([
  ...ObjectMap.keys(moduleActionTypes),
  'alert',
  'dismiss',
  'dismissAll',
], 'alert');
```

The prefixKeys function is a factory function to create ObjectMap instances. The instance will have the object shape of:
```javascript
{
    alert: 'alert-alert',
    dismiss: 'alert-dismiss',
    dismissAll: 'alert-dismissAll',
    [key in moduleActionTypes]: `alert-${moduleActionTypes[key]}`,
}
```

You can use it like:
```javascript
export function getMessagesReducer(types) {
  return (state = [], type) => {
    switch (type) {
      case types.alert:
        return [
          ...state,
          {
            // ...
          },
        ];
      case types.dismiss:
        return // state
      case types.dismissAll:
        return [];
      default:
        return state;
    }
  };
}
```
Please notice `getMessagesReducer` is a high order function. It will return a function which is the reducer you want.

Every module has its needed actions defined within the module with `Enum`.

### ObjectMap

ObjectMap is a class representation of a read-only dictionary implemented with an object mapping. There are several uses of ObjectMaps:

1. Define a lookup table with an object definition:
```typescript
const table = ObjectMap.fromObject({
  foo: 'bar',
  alpha: 1,
  beta: 2,
  isObject: true,
} as const);
// with as const in typescript, the instance will clearly show the correct key-value relationship in its shape
```

2. Define a set of values by using the value as the key:
```typescript
const callResults = ObjectMap.fromKeys([
  'hangUp',
  'missed',
  'voicemail',
  'completed',
]);
/* The shape of the object would be as the following, with complete key-value shape in the typescript typing system.
{
    hangUp: 'hangUp',
    missed: 'missed',
    voicemail: 'voicemail',
    completed: 'completed',
}
*/
```

3. Prefix a set of values:
```typescript
const actionTypes = ObjectMap.prefixKeys([
    'init',
    'initSuccess',
    'reset',
    'resetSuccess'
], 'authModule');
/* The shape of the object would be the following:
{
    init: 'authModule-init',
    initSuccess: 'authModule-initSuccess',
    reset: 'authModule-reset',
    resetSuccess: 'authModule-resetSuccess',
}

However, in the typing system, the shape of the object is:
{
    init: string;
    initSuccess: string;
    reset: string;
    resetSuccess: string;
}

```

### DI
1. Module decorator ==> registerModule
2. Lib decorator ==> registerModule
3. ModuleFactory decorator ==> registerModuleFactory

What's in common is that all these registered modules are stored in a map instance with the `Class` as key
and `metadata` as the value.

When does DI work is when **Root Module** called `create()` method. In the method, `Injector` class started to handle those `Module`, `Library` and `ModuleFactory` decorator and to make dependency injection by its `addModule` method
.

In the same time, modules' reducers and state are also initialized and set to module by the methods prefixed by **_**.

#### Module
When one module has dependencies on other modules.

How to use:
```javascript
@Module({
  deps: [{ dep: 'AlertOptions', optional: true }]
})
export default class Alert extends RcModule {
  // ..
}

In the map, key is `Alert` class and value is `{ dep: 'AlertOptions', optional: true }.
```

#### Provider


#### ModuleFactory
This decorator can be used on any kind modules, no matter it's root module or not.

## Dependency Injection
Please refer to [Dependency Injection](docs/dependency-injection.md) for more details.

## Contribution
---

Please fork the project and read the following:

- [Contribution Guide](docs/contribute.md)

