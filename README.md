# ringcentral-js-integration-commons

[![Build Status](https://travis-ci.org/ringcentral/ringcentral-js-integration-commons.svg?branch=master)](https://travis-ci.org/ringcentral/ringcentral-js-integration-commons)
[![Coverage Status](https://coveralls.io/repos/github/ringcentral/ringcentral-js-integration-commons/badge.svg?branch=master)](https://coveralls.io/github/ringcentral/ringcentral-js-integration-commons?branch=master)
[![NPM Version](https://img.shields.io/npm/v/ringcentral-integration.svg?style=flat-square)](https://www.npmjs.com/package/ringcentral-integration)


## Introduction

RingCentral integration common library aims to provide reusable modules to allow developers to integrate RingCentral unified communication service into third party processes or tools more easily.

This project is built based on [RingCentral Client](https://www.npmjs.com/package/ringcentral-client) and [Redux](https://github.com/reactjs/redux). The basic idea is to wrap [RingCentral REST API](https://developer.ringcentral.com/) into highly reusable modules based on common application scenarios and provide an unified application state. 

## Get Started

To use this library, please follow below steps

Install from NPM

```bash
npm install ringcentral-integration
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

Notice that you can provide any query param specified in API documentation, which allows you to fetch call log in the way you like.

But in `RingCentral Integration Common Library`, the parameters are limited based on common application use cases. As shown in the code below, you can only fetch call log by specifying from and to date.

```javascript
_fetch({ dateFrom, dateTo }) {
	fetchList(params => (
		this._client.account().extension().callLog().list({
			...params,
			dateFrom,
			dateTo,
		})
	));
}
```

Obviously, It kind of limits the flexibility. But it also allows you to fetch call log without much knowledge about API.
This library actually consists of a collection of modules. But module could not work by itself, it needs to be added into a Phone object before using(see section below).

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

## Play with Development Server

A development server is delivered with source so that developers can use it to get familiar with the project or do further development. To get development server running

Clone the repo

```bash
git clone https://github.com/ringcentral/ringcentral-js-integration-commons.git
```

Create a file named config.js in following format in folder `dev-server` to specify app related info 

```javascript
export default {
  api: {
    appKey: ${app key},
    appSecret: ${app secret},
    server: ${server url},
  }
};
```

Run following command to start development server

```bash
npm run dev-server
```

The development server is listening on port 8190 by default. Open up your browser and access `localhost:8190` to see how it works. 

## Modules
---

- [x] AccountExtension
- [x] AccountInfo
- [x] Alert
- [x] Auth
- [x] BlockedNumber
- [x] Brand
- [x] Call
- [x] CallingSettings
- [x] ComposeText
- [x] ConnectivityMonitor
- [x] Conversation
- [x] ContactSearch
- [x] DialingPlan
- [x] Environment
- [x] ExtensionInfo
- [x] ExtensionPhoneNumber
- [x] GlobalStorage
- [x] Locale
- [x] MessageSender
- [x] MessageStore
- [x] Messages
- [x] NumberValidate
- [x] Presence
- [x] RateLimiter
- [x] RagionSettings
- [x] Ringout
- [x] Ringout
- [x] RolesAndPermissions
- [x] Softphone
- [x] Storage
- [x] Subscription
- [x] TabManager
- [ ] DialingPlan
- [ ] PhoneNumbers
- more...

## Contribution
---

Please fork the project and read the following:

- [Contribution Guide](docs/contribute.md)

