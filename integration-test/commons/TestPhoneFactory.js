'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = getTestPhone;

var _redux = require('redux');

var _Phone = require('./Phone');

var _Phone2 = _interopRequireDefault(_Phone);

var _apiConfig = require('./config/apiConfig');

var _apiConfig2 = _interopRequireDefault(_apiConfig);

var _brandConfig = require('./config/brandConfig');

var _brandConfig2 = _interopRequireDefault(_brandConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTestPhone() {
  var testPhone = new _Phone2.default((0, _extends3.default)({}, _apiConfig2.default, _brandConfig2.default, {
    prefix: Date.now().toString()
  }));
  var store = (0, _redux.createStore)(testPhone.reducer);
  testPhone.setStore(store);
  return testPhone;
}
//# sourceMappingURL=TestPhoneFactory.js.map
