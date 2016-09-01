'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AuthPanel = require('../../../widgets/auth/AuthPanel');

var _AuthPanel2 = _interopRequireDefault(_AuthPanel);

var _integration = require('./../../../utils/integration/');

var _config = require('../../../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _integration.connect)(function (state, props, phone) {
  return {
    login: function login() {
      var _phone$auth;

      return (_phone$auth = phone.auth).login.apply(_phone$auth, arguments);
    },
    authorize: function authorize() {
      var _phone$auth2;

      return (_phone$auth2 = phone.auth).authorize.apply(_phone$auth2, arguments);
    },
    loginUrl: function loginUrl(options) {
      return phone.auth.loginUrl(options);
    },
    parseLoginUrl: function parseLoginUrl(url) {
      return phone.auth.parseLoginUrl(url);
    },
    redirectUri: _config2.default.redirectUri
  };
})(_AuthPanel2.default);

// TODO: import the cred info from other places?