# ringcentral-js-widgets

[![Build Status](https://travis-ci.org/ringcentral/ringcentral-js-widgets.svg?branch=master)](https://travis-ci.org/ringcentral/ringcentral-js-widgets)
[![NPM Version](https://img.shields.io/npm/v/@ringcentral-integration/commons.svg?style=flat-square)](https://www.npmjs.com/package/@ringcentral-integration/commons)
[![NPM Version](https://img.shields.io/npm/v/@ringcentral-integration/widgets.svg?style=flat-square)](https://www.npmjs.com/package/@ringcentral-integration/widgets)

## Introduction

RingCentral integration widgets aim to provide reusable RingCentral service module and UI components to allow developers to integrate RingCentral unified communication service into third party processes or tools more easily.

This project includes [RingCentral Integration Common Library](https://github.com/ringcentral/ringcentral-js-widgets/blob/master/packages/ringcentral-integration/README.md) and [RingCentral Widgets Library](https://github.com/ringcentral/ringcentral-js-widgets/blob/master/packages/ringcentral-widgets/README.md). The basic idea is to connect modules in RingCentral Integration Common Library with React components to provide ready to use UI widgets.

## Get Started

We use [RingCentral Widgets CLI](https://github.com/ringcentral/ringcentral-js-widgets/blob/master/packages/ringcentral-widgets-cli/README.md) to startup a RingCentral Widgets based app.

```bash
$ npm install -g ringcentral-widgets-cli
$ rc-widgets -h
```

### Create a new project

```bash
$ rc-widgets new your_project_name
$ cd your_project_name
$ yarn
```

[Update `.env` file in project root path](https://github.com/ringcentral/ringcentral-js-widgets/blob/master/packages/ringcentral-widgets-cli/README.md#start-developement-server).

### Start development server

```bash
$ yarn start
```

Visit on [http://localhost:8080](http://localhost:8080) in browser.

For production build and deploy, please get more information in [here](https://github.com/ringcentral/ringcentral-js-widgets/blob/master/packages/ringcentral-widgets-cli/README.md).

### Tutorials

This is a [demo](https://github.com/embbnux/ringcentral-widgets-demo) and [step-by-step tutorials](https://embbnux.github.io/ringcentral-widgets-demo/) show how to use this library.

## Contribution and Development

Clone the repo:

```bash
$ git clone https://github.com/ringcentral/ringcentral-js-widgets.git
$ cd ringcentral-js-widgets
```

Install dependent libraries:

```bash
$ yarn install
$ yarn test # Run tests
```

### Play with Development Server

A development server is delivered with source so that developers can use it to get familiar with the project or do further development. To get development server running：

Create a file named `api-config.js` in following format in folder `packages/ringcentral-widgets-demo/dev-server` to specify app related info

```js
export default {
  appKey: ${app key},
  appSecret: ${app secret},
  server: ${server url},
};
```

Run following command to start development server

```bash
$ yarn start
```

The development server is listening on port `8080` by default.
Open up your browser and access http://localhost:8080 to see how it works.

Note that the development server is using OAuth for authorization process.
Please make sure the app you specified in configuration above is setup with Redirect Uri `http://localhost:8080/redirect.html`.

## Projects which use this library

- [RingCentral Embeddable Voice](https://github.com/ringcentral/ringcentral-embeddable-voice)
- [RingCentral for Google Extension 4.0](https://chrome.google.com/webstore/detail/ringcentral-for-google/fddhonoimfhgiopglkiokmofecgdiedb)
