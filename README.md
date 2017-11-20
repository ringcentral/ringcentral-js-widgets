# ringcentral-js-widgets

[![Build Status](https://travis-ci.org/ringcentral/ringcentral-js-widgets.svg?branch=master)](https://travis-ci.org/ringcentral/ringcentral-js-widgets)
[![Coverage Status](https://coveralls.io/repos/github/ringcentral/ringcentral-js-widgets/badge.svg?branch=master)](https://coveralls.io/github/ringcentral/ringcentral-js-widgets?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/81c5e5334eff454b9404b05b5c29e09b)](https://www.codacy.com/app/RingCentral/ringcentral-js-widgets?utm_source=github.com&utm_medium=referral&utm_content=ringcentral/ringcentral-js-widgets&utm_campaign=badger)


## Introduction

RingCentral integration widgets aim to provide reusable UI components to allow developers to integrate RingCentral unified communication service into third party processes or tools more easily.

This project is built based on [RingCentral Integration Common Library](https://www.npmjs.com/package/ringcentral-integration) and [React](https://facebook.github.io/react/). The basic idea is to connect modules in RingCentral Integration Common Library with React components to provide ready to use UI widgets.


## Play with Development Server

A development server is delivered with source so that developers can use it to get familiar with the project or do further development. To get development server running：

Clone the repo:

```bash
$ git clone https://github.com/ringcentral/ringcentral-js-widgets.git
$ cd ringcentral-js-widgets
```

Install dependent libraries:

```bash
$ yarn install
```

Create a file named `api-config.js` in following format in folder `dev-server` to specify app related info

```javascript
export default {
  appKey: ${app key},
  appSecret: ${app secret},
  server: ${server url},
};
```

Run following command to start development server

```bash
$ yarn dev-server
```

The development server is listening on port `8191` by default.
Open up your browser and access http://localhost:8191 to see how it works.

Note that the development server is using OAuth for authorization process.
Please make sure the app you specified in configuration above is setup with Redirect Uri `http://localhost:8191/redirect.html`.


## Test

Create `.env` file in `./test/` folder, with the following content:

```ini
appKey=your-appKey
appSecret=your-appSecret
server=sever-url
username=your-phone-number
extension=your-extension
password=your-password
receiver=testing-phone-number-to-receive-sms-fax-etc
```

Run:

```bash
$ yarn test
```

If you want to run it in watch mode:

```bash
$ brew install watchman
$ yarn test:watch
```

### Update mock data

Whenever there is major change to the design, you might need to update `test/state.json` and `test/storage.json`.

Launch the dev-server and visit the app in chrome browser. In console:

Run `JSON.stringify(phone.store.getState(), null, 2)` to generate content for `test/state.json`.

Run `JSON.stringify(localStorage, null, 2)` to generate content for `test/storage.json`


### About test coverage

WebRTC code is excluded from test coverage report. Because we are unable to run WebRTC in node.js.

We might need to do some mocking to cover this part in the future.
