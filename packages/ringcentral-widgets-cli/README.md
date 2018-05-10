# ringcentral-widgets-cli [![NPM version][npm-image]][npm-url]

CLI tool for [RingCentral Widgets](https://github.com/ringcentral/ringcentral-js-widgets) based app.

## Dependences

* Node.js >= 8
* yarn or NPM

## Installation

First, install using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js > 8](https://nodejs.org/)) or yarn.

```bash
npm install -g ringcentral-widgets-cli
```

## Usage

```bash
rc-widgets -h
```

### Create a new project

```
rc-widgets new your_project_name
cd your_project_name
yarn install
```

#### Start Developement server

Before you start, you need to create a [RingCentral developer free account](https://developer.ringcentral.com) and create a new RingCentral app with platform type - "Browser Based" with permissions that you need. For base app, it requires `Read Accounts` and `Subscription Webhook` permissions.

#### Update `.env` file in project root path

```
$ vim .env
```

```
RINGCENTRAL_CLIENT_ID=your ringcentral app client id
RINGCENTRAL_CLIENT_SECRET=your ringcentral app client secret
RINGCENTRAL_SERVER_URL=ringcentral api server, eg: https://platform.devtest.ringcentral.com
REDIRECT_URI=your redirect uri, eg: http://localhost:8080/redirect.html
```

`RINGCENTRAL_CLIENT_ID` is your ringcentral app client id.

`RINGCENTRAL_CLIENT_SECRET` is your ringcentral app client secret.

`RINGCENTRAL_SERVER_URL` is ringcentral api server, `https://platform.devtest.ringcentral.com` for sandbox environment and `https://platform.ringcentral.com` for production.

`REDIRECT_URI` is redirect uri that needs to add in your app settings in RingCentral Developer Website. For development in local, it should be `http://localhost:8080/redirect.html`. After your deploy this app to network space, it should be `your_host_address/redirect.html`.

#### Start development server

```
$ yarn start
```

Visit on [http://localhost:8080](http://localhost:8080) in browser

#### Build for production

* Update `.env` file with production config, such as `RINGCENTRAL_SERVER_URL` and `REDIRECT_URI`.
* Build project

```
$ yarn build
```

* Upload files in release folder to your network space and visit it in browser.

### Add new module to extend feature

```bash
$ rc-widgets generate Module ModuleName
# Create a new module with dependences
$ rc-widgets generate Module ModuleName -d DependenceName -d DependenceName
```

## Tutotial

* [How to build a RingCentral App with RingCentral Widgets](https://embbnux.github.io/ringcentral-widgets-demo/)

### Read more

* The genarated app project is based on [RingCentral Commons](https://github.com/ringcentral/ringcentral-js-integration-commons) and [RingCentral Widgets](https://github.com/ringcentral/ringcentral-js-widgets).

* Commons modules are built with [RcModule](https://github.com/ringcentral/ringcentral-js-integration-commons/blob/master/docs/creating-modules.md) and [Dependency Injection](https://github.com/ringcentral/ringcentral-js-integration-commons/blob/master/docs/dependency-injection.md).

* RingCentral Commons depend on [Redux](https://redux.js.org/).

* RingCentral Widgets depend on [React](https://github.com/facebook/react) and [RingCentral Commons](https://github.com/ringcentral/ringcentral-js-integration-commons).

* The genarated app project is built with [Webpack](https://webpack.js.org/).

[npm-image]: https://badge.fury.io/js/ringcentral-widgets-cli.svg
[npm-url]: https://npmjs.org/package/ringcentral-widgets-cli
