# ringcentral-js-widgets

[![Build Status](https://travis-ci.org/ringcentral/ringcentral-js-widgets.svg?branch=master)](https://travis-ci.org/ringcentral/ringcentral-js-widgets)
[![Coverage Status](https://coveralls.io/repos/github/ringcentral/ringcentral-js-widgets/badge.svg?branch=master)](https://coveralls.io/github/ringcentral/ringcentral-js-widgets?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/81c5e5334eff454b9404b05b5c29e09b)](https://www.codacy.com/app/RingCentral/ringcentral-js-widgets?utm_source=github.com&utm_medium=referral&utm_content=ringcentral/ringcentral-js-widgets&utm_campaign=badger)


## Introduction

RingCentral integration widgets aim to provide reusable UI components to allow developers to integrate RingCentral unified communication service into third party processes or tools more easily.

This project is built based on [RingCentral Integration Common Library](https://www.npmjs.com/package/ringcentral-integration) and [React](https://facebook.github.io/react/). The basic idea is to connect modules in RingCentral Integration Common Library with React components to provide ready to use UI widgets.


## Get Started

We use [RingCentral Widgets CLI](https://github.com/ringcentral/ringcentral-js-widgets/tree/master/packages/ringcentral-widgets-cli/README.md) to startup a RingCentral Widgets based app.

```
$ npm install -g ringcentral-widgets-cli
$ rc-widgets -h
```

### Create a new project

```
rc-widgets new your_project_name
cd your_project_name
yarn install
```

[Update `.env` file in project root path](https://github.com/ringcentral/ringcentral-js-widgets/tree/master/packages/ringcentral-widgets-cli/README.md#start-developement-server).

### Start development server

```
$ yarn start
```
Visit on [http://localhost:8080](http://localhost:8080) in browser.

For production build and deploy, please get more information in [here](https://github.com/ringcentral/ringcentral-js-widgets/tree/master/packages/ringcentral-widgets-cli/README.md).

### Tutorials

This is a [demo](https://github.com/embbnux/ringcentral-widgets-demo) and [step-by-step tutorials](https://embbnux.github.io/ringcentral-widgets-demo/) show how to use this library.

## Tests

This packages's tests are included in [RingCentral Widget Test](https://github.com/ringcentral/ringcentral-js-widgets/tree/master/packages/ringcentral-widgets-test/README.md)
