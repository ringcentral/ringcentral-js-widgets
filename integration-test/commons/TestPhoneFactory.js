"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getTestPhone;

var _redux = require("redux");

var _uuid = _interopRequireDefault(require("uuid"));

var _Phone = require("./Phone");

var _apiConfig = _interopRequireDefault(require("./config/apiConfig"));

var _brandConfig = _interopRequireDefault(require("./config/brandConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getTestPhone() {
  var testPhone = (0, _Phone.createPhone)({
    apiConfig: _apiConfig["default"],
    brandConfig: (0, _brandConfig["default"])(),
    prefix: _uuid["default"].v4()
  });
  var store = (0, _redux.createStore)(testPhone.reducer);
  testPhone.setStore(store);
  return testPhone;
}
//# sourceMappingURL=TestPhoneFactory.js.map
