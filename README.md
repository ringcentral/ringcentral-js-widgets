# ringcentral-js-widgets

[![Build Status](https://github.com/ringcentral/ringcentral-js-widgets/workflows/CI%20Pipeline/badge.svg?branch=master)](https://github.com/ringcentral/ringcentral-js-widgets/actions)
[![NPM Version](https://img.shields.io/npm/v/@ringcentral-integration/commons.svg?style=flat-square)](https://www.npmjs.com/package/@ringcentral-integration/commons)
[![NPM Version](https://img.shields.io/npm/v/@ringcentral-integration/widgets.svg?style=flat-square)](https://www.npmjs.com/package/@ringcentral-integration/widgets)

## Introduction

RingCentral integration widgets aim to provide reusable RingCentral service module and UI components to allow developers to integrate RingCentral unified communication service into third party processes or tools more easily.

This project includes [RingCentral Integration Common Library](packages/ringcentral-integration/README.md) and [RingCentral Widgets Library](packages/ringcentral-widgets/README.md). The basic idea is to connect modules in RingCentral Integration Common Library with React components to provide ready to use UI widgets.

## Get Started

We use [RingCentral Widgets CLI](packages/ringcentral-widgets-cli/README.md) to startup a RingCentral Widgets based app.

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

[Update `.env` file in project root path](packages/ringcentral-widgets-cli/README.md#start-developement-server).

### Start development server

```
$ yarn start
```
Visit on [http://localhost:8080](http://localhost:8080) in browser.

For production build and deploy, please get more information in [here](packages/ringcentral-widgets-cli/README.md).

### Tutorials

This is a [demo](https://github.com/ringcentral-tutorials/ringcentral-widgets-demo) and [step-by-step tutorials](https://ringcentral-tutorials.github.io/ringcentral-widgets-demo/) show how to use this library.

## Contribution and Development

We use [Lerna.js](https://github.com/lerna/lerna) to manage packages source. And we require Node.js > 8.

Clone the repo:

```bash
$ git clone https://github.com/ringcentral/ringcentral-js-widgets.git
$ cd ringcentral-js-widgets
```

Install dependent libraries:

```bash
$ npm ci
```

After adding or upgrading any `@ringcentral/*` dependency, run `npm run lockfile:fix`. Some of these packages have a different build under the same version on internal registries, so `package-lock.json` keeps both integrity hashes to stay installable from public npm. CI runs `npm run lockfile:check` to enforce this. If registry.npmjs.org is not reachable from your network, set `PUBLIC_REGISTRY` to a mirror of it.

Test:

```bash
$ npm test -w @ringcentral-integration/next-core # Run one package's tests
```

Commit:

```bash
$ git add .
$ yarn commit
or
$ yarn git-cz
```

Release:

Push a tag and GitHub Actions publishes to npm (see `scripts/publishPackages.mjs`):

- `1.0.0`, `1.1.0-rc.0`: every package except the ones below, at that version. Prereleases go to the `next` dist-tag.
- `i18n@2.4.0`, `locale-loader@2.3.4`, `phone-number@1.2.1`: one package on its own version line. Bump its `package.json` first, because the tag must match it.

### Play with Development Server

A development server is delivered with source so that developers can use it to get familiar with the project or do further development. To get development server running：

Create a file named `api-config.js` in following format in folder `packages/ringcentral-widgets-demo/dev-server` to specify app related info

```javascript
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

- [RingCentral Embeddable](https://github.com/ringcentral/ringcentral-embeddable)
- [RingCentral for Google Extension 4.0](https://chrome.google.com/webstore/detail/ringcentral-for-google/fddhonoimfhgiopglkiokmofecgdiedb)
