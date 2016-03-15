# ringcentral-js-widget
This is the personal repository to do some experimental implementation of UI widget based on RingCentral JS SDK

#### Installation process
`npm install`
`bower install`
#### Development process
`gulp`
#### Test process
`npm test`
[Demo](http://lingforcc.github.io/ringcentral-js-widget/demo/)

#### Actions lifecycle
1. `before` from users
2. `before` from widgets (can be disabled from users)
3. `method` from widgets
4. `method` from users (be triggered from 3)
5. `after` from users
6. `after` from widgets (can be disabled from users)
7. Any uncatched errors will trigger `error` lifecycle

## Widgets collection
#### Auth-panel
- Actions
  - login
  - showCountry
  - switchCountry
- Handlers
- props
  - dom
  - username
  - extension
  - password
  - country
#### Dial-pad
#### Call-panel
#### Call-log
