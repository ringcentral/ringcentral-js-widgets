import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'

import RcPhone from 'ringcentral-js-integration-commons'
import config from '../config'

import App from './components/app.react'

var phone = new RcPhone({
  sdkSettings: {
    ...config.app,
    "server": "https://platform.ringcentral.com"
  }
})

ReactDOM.render(
  <Provider store={phone.store}>
    <App phone={phone}/>
  </Provider>, 
  document.getElementById('container')
)
