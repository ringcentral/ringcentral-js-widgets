# ringcentral-js-widget

[![Build Status](https://travis-ci.org/ringcentral/ringcentral-js-widget.svg?branch=master)](https://travis-ci.org/ringcentral/ringcentral-js-widget)

[![Coverage Status](https://coveralls.io/repos/github/ringcentral/ringcentral-js-widget/badge.svg?branch=master)](https://coveralls.io/github/ringcentral/ringcentral-js-widget?branch=master)



### Getting Started

#### Install

```shell
npm install
```

#### Build

Take a look of `package.json` for avaliable npm commands.

We use webpack for bundling tool, see `webpack.config.js` for further configuration.


### Project Structure
RingCentral-js-widget is composed of 3 parts:

1. Components (`src/component/`)
   1. The logic-free UI components wrote in React framework.
   2. Use Redux to manage some global state, such as locale, application state.
   3. Use PostCSS with CSS module with folder name as class name prefix. Support theme.
2. Applications (`src/applications/`)
   1. Combine several widget to have a applications. Normally applications are coupled with RingCentral-js-integration-commons.
   2. Use custom `connect` from Redux to support data passing from Redux store and RingCentral-js-integration-commons.
3. Other tools (`cli` and `src/utils`)



### Component Design Guideline

1. Stateless functional component as possible.

2. Don't use Redux store without further discussion.

3. Use moduler CSS anytime.

4. Define strict `propTypes` in each components.

   ​