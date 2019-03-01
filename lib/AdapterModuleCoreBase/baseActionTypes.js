"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

var _Enum = _interopRequireDefault(require("ringcentral-integration/lib/Enum"));

var _moduleActionTypes = _interopRequireDefault(require("ringcentral-integration/enums/moduleActionTypes"));

var _proxyActionTypes = _interopRequireDefault(require("ringcentral-integration/enums/proxyActionTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _default = new _Enum.default([].concat(_toConsumableArray(Object.keys(_moduleActionTypes.default)), _toConsumableArray(Object.keys(_proxyActionTypes.default)), ['syncClosed', 'syncMinimized', 'syncSize', 'syncFocus', 'syncPosition', 'showAdapter']), 'adapterModuleCore');

exports.default = _default;
//# sourceMappingURL=baseActionTypes.js.map