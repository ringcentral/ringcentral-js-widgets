# ringcentral-js-widget

[![Build Status](https://travis-ci.org/ringcentral/ringcentral-js-widget.svg?branch=master)](https://travis-ci.org/ringcentral/ringcentral-js-widget)[![Coverage Status](https://coveralls.io/repos/github/ringcentral/ringcentral-js-widget/badge.svg?branch=master)](https://coveralls.io/github/ringcentral/ringcentral-js-widget?branch=master)

## Getting Started

#### Build

1. ```shell
   npm install
   ```

2. Create `config.js`

   ```json
   export default {
     appKey: 'PUT_YOUR_APP_KEY',
     appSecret: 'PUT_YOUR_APP_SECRET',
     redirectUri: 'REDIRECT_URL_FOR_YOUR_APP',
   };
   ```

3. ```shell
   npm run build
   ```

4. This will produce 2 build:

   1. `./dist/applications/standalone.js`
   2. `./dist/applications/showcase.js`(experimental stage)

5. Copy the html snippet

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

6. Enjoy your phone widgets!

#### Other commands

Take a look of `package.json` for avaliable npm commands.

We use webpack for bundling tool, see `webpack.config.js` for further configuration.



## Contribute

   #### Project Structure

RingCentral-js-widget has 3 levels of archtecture:

**Application > Widgets > (React)Component**

   1. Applications (`src/applications/`)
      1. Combine several widget to have a applications. Normally applications are coupled with RingCentral-js-integration-commons.
      2. Use custom `connect` from Redux to support data passing from Redux store and RingCentral-js-integration-commons.
   2. Components (`src/components/`)
      1. The logic-free UI components wrote in React framework.
      2. We group components based on types. For common widgets we put it `src/components/commons`. For some specific usage, we group them into **widgets** and put into `src/components/widgets`.
      3. For different type of widgets, we separate into different sub-directory, such as `src/components/widgets/auth` and `src/components/widgets/webphone`. Each widget will contain an components tree with an root component.
      4. Use Redux to manage some global state, such as locale, application state.
      5. Use PostCSS with CSS module with folder name as class name prefix. Support theme.
   3. Other tools (`cli` and `src/utils`)


#### Steps to fellow

##### How to add a new widgets?

1. Widgets represent a indenpently functionality module, such as auth, contacts, or webphone.
2. Discuss first.

##### How to add a new components?

1. If you want to add some new components for specific widgets, first check that if there's any similiar widgets can be used or generalized.
2. If you want to add some new components for common purpose, discuss first.

##### How to add test?

1. We use mocha with enzyme to test widgets. The folder structrue is to be discussed.

##### How to add an application?

1. Normally the application in this repo is for demo purpose. You can download the ringcentral-js-widget via NPM (not yet) and compose several widgets and components into an application.


   #### Components Design Guideline

1.    Stateless functional component as possible.

2.    Don't use Redux store without further discussion.

      1. Use moduler CSS anytime.

      2. Define strict `propTypes` for each components.

         ​