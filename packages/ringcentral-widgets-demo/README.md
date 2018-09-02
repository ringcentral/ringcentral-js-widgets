# RingCentral Widgets Demo

This project is a development server is delivered with source so that developers can use it to get familiar with the project or do further development. To get development server running：

## Clone the repo:

```bash
$ git clone https://github.com/ringcentral/ringcentral-js-widgets.git
$ cd ringcentral-js-widgets
```

## Install dependent libraries:

```bash
$ yarn install
```

## Add config file

Create a file named `api-config.js` in following format in folder `dev-server` to specify app related info

```javascript
export default {
  appKey: ${app key},
  appSecret: ${app secret},
  server: ${server url},
};
```

## Start development server

Run following command to start development server

```bash
$ yarn start
```

The development server is listening on port `8080` by default.
Open up your browser and access http://localhost:8080 to see how it works.

Note that the development server is using OAuth for authorization process.
Please make sure the app you specified in configuration above is setup with Redirect Uri `http://localhost:8080/redirect.html`.
