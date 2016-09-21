# ringcentral-js-widget

[![Build Status](https://travis-ci.org/ringcentral/ringcentral-js-widget.svg?branch=master)](https://travis-ci.org/ringcentral/ringcentral-js-widget)[![Coverage Status](https://coveralls.io/repos/github/ringcentral/ringcentral-js-widget/badge.svg?branch=master)](https://coveralls.io/github/ringcentral/ringcentral-js-widget?branch=master)



Ringcentral-js-widget is a set of reusable widgets written in React library. You must use  Ringcentral-js-widget with Ringcentral-js-integration-commons.

## Table of Contents

- [Getting Started](#getting-started)
- [Contribute](#contribute)

## Getting Started

Install:

```shell
npm install --save ringcentral-js-widget
```

Import:

```javascript
import widgets from 'ringcentral-js-widget'
const { ActiveCall, Flip } = widgets
```



## Contribute

#### Clone

```sh
git clone https://github.com/ringcentral/ringcentral-js-widget.git
```

#### Install dependencies

```sh
npm install
```

#### Create `config.js` in the project root

```javascript
export default {
  appKey: 'YOUR_APP_KEY',
  appSecret: 'YOUR_APP_SECRET',
  redirectUri: 'REDIRECTED_URL_FOR_YOUR_APP',
};
```

#### Build

```sh
npm run build
```

### Project Structure

Each component's folder structure should look like:

```
ActiveCall/
	index.js
	index.css
	selector.js
	spec.js
	actions.js
	reducer.js
```

**index.js**

Components implementation details.

**index.css**

Components styles, the class will be prefixed and bundled to a bundles CSS files.

**selector.js**

The bridge between `props` of components and RingCentral-js-integration-commons.

**spec.js**

Good kids will write some tests.

**actions.js**

If the widgets have some UI specific actions (like switch tabs), it will have some actions defined in this file.

**reducer.js**

reducer