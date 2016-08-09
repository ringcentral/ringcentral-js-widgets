# ringcentral-js-widget

[![Build Status](https://travis-ci.org/ringcentral/ringcentral-js-widget.svg?branch=master)](https://travis-ci.org/ringcentral/ringcentral-js-widget)[![Coverage Status](https://coveralls.io/repos/github/ringcentral/ringcentral-js-widget/badge.svg?branch=master)](https://coveralls.io/github/ringcentral/ringcentral-js-widget?branch=master)



Ringcentral-js-widget is a set of reusable widgets written in React library. Widgets' functionality and interface are mostly phone related. You can use some React components in this project to combine to your own application.

## Table of Contents

- [Getting Started](#getting-started)
- [Contribute](#contribute)
  - [Project structure](#project-structure)
- [Questions](#questions)

## Getting Started

For now we don't have NPM registration, you'll need to clone the repo and build it by yourself.

In the future we will provide several widgets that can be easily embedded into web pages.

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
#### Create a html page and copy the snippet

```html
<!DOCTYPE html>
<html>
<head>
  <title></title>
  <link rel="stylesheet" type="text/css" href="bundle.css">
</head>
<body>
<div id='container'></div>
<script type='text/javascript' src='./dist/applications/standalone.js'></script>

</body>
</html>
```
#### Copy the snippet into your redirected page

```javascript
window.opener && window.opener.postMessage({
  type: 'oauth',
  value: document.URL
}, '*')
```

or setting your redirected url to [our redirected page](https://ringcentral.github.io/ringcentral-js-widget/page/redirect.html).

#### Enjoy your phone widgets!



## Contribute

The main purpose of this repo is to provide some reusable UI components for other application, normally is  phone system related. Following contents are some guidelines and principles we will keep in mind when contribute.

### Project Structure

RingCentral-js-widget has 3 levels of archtecture:

#### Applications

```
src/applications/
  showcase/
  standalone/
```

Combine several widget to have a applications. Normally applications are coupled with RingCentral-js-integration-commons.

Use custom `connect` from Redux to support data passing from Redux store and RingCentral-js-integration-commons.

#### Modules

```
src/widgets/modules/
  auth/
  webphone/
  contact/
  
src/widgets/shared/
  button/
  list/
```

Modules can be seem as a standalone app, such as webphone modules which can be used independently.

We group widgets based on types. For common modules we put it `src/widgets/shared`. For some specific usage, we group them`src/widgets/modules`.

Use Redux to manage some global state, such as locale, application state.

#### (React) Component

```
src/widgets/modules/webphone/presentation
  DialPad/
    DialPad.react.js
    DialPad.css
```

The logic-free UI components wrote in React framework.

For different type of widgets, we separate into different sub-directory, such as `src/widgets/modules/auth` and `src/widgets/modules/webphone`. Each widget will contain an components tree with an root component.

## Questions

#### How to add a new widgets?

Widgets represent a independently functionality module, such as `Auth`, `Contacts`, or `Webphone`.

You can add widgets in the folder `src/widgets/`.

#### How to add a new components?

If you want to add some new components, first check that if there's any similiar widgets can be used or generalized.

#### How to add test?

We use mocha with enzyme to test widgets. run `npm test` to check the test status.

#### How to add an application?

Normally applications in this repo is for demo purpose. You can download the `ringcentral-js-widget` via NPM (not yet) and compose several widgets and components into an application.

### Components Design Guideline

Stateless functional component as much as possible.

Don't use Redux store without further discussion.

Use moduler CSS anytime.

Define strict `propTypes` for each components.

