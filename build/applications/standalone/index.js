'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _integration = require('../../utils/integration/');

var _ringcentralJsIntegrationCommons = require('ringcentral-js-integration-commons');

var _ringcentralJsIntegrationCommons2 = _interopRequireDefault(_ringcentralJsIntegrationCommons);

var _config = require('../../../config');

var _config2 = _interopRequireDefault(_config);

var _locale = require('../../utils/locale/');

var _app = require('./app.react');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = void 0;
var phone = new _ringcentralJsIntegrationCommons2.default({
  sdkSettings: _extends({}, _config2.default, {
    server: 'https://platform.devtest.ringcentral.com'
  }),
  getStore: function getStore(reducer) {
    store = (0, _redux.createStore)((0, _redux.combineReducers)({
      common: reducer,
      locale: _locale.reducer
    }));
    return store;
  },
  stateMapper: function stateMapper(state) {
    return state.common;
  }
});

phone.store.subscribe(function () {
  console.log(phone.store.getState());
});

_reactDom2.default.render(_react2.default.createElement(
  _integration.PhoneProvider,
  { phone: phone },
  _react2.default.createElement(
    _integration.Provider,
    { store: phone.store },
    _react2.default.createElement(_app2.default, null)
  )
), document.getElementById('container'));