"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _di = require("../../lib/di");

var _fetchList = _interopRequireDefault(require("../../lib/fetchList"));

var _DataFetcher2 = _interopRequireDefault(require("../../lib/DataFetcher"));

var _removeUri = _interopRequireDefault(require("../../lib/removeUri"));

var _selector = require("../../lib/selector");

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _getReducer = require("./getReducer");

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

/**
 * @typedef ExtensionData
 * @type {object}
 * @property {number} id
 * @property {string} extensionNumber
 */

/**
 * @typedef {Object} SimplePhoneNumber
 * @property {ExtensionData} extension
 * @property {number} id
 * @property {string} location
 * @property {string} paymentType
 * @property {string} phoneNumber
 * @property {string} status
 * @property {string} type
 * @property {string} usageType
 */

/**
 * @typedef {Object} PhoneNumber
 * @property {string} uri
 * @property {number} id
 * @property {string} location
 * @property {string} paymentType
 * @property {string} phoneNumber
 * @property {string} status
 * @property {string} type
 * @property {string} usageType
 */

/**
 * @param {PhoneNumber} number
 * @returns {SimplePhoneNumber}
 */
function simplifyPhoneNumber(number) {
  return (0, _removeUri["default"])(number);
}
/**
 * @class
 * @description Accound phone number module to get account phone number list
 */


var AccountPhoneNumber = (_dec = (0, _di.Module)({
  deps: ['Client', 'RolesAndPermissions', {
    dep: 'AccountPhoneNumberOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_DataFetcher) {
  _inherits(AccountPhoneNumber, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   */
  function AccountPhoneNumber(_ref) {
    var _context2;

    var _this;

    var client = _ref.client,
        rolesAndPermissions = _ref.rolesAndPermissions,
        options = _objectWithoutProperties(_ref, ["client", "rolesAndPermissions"]);

    _classCallCheck(this, AccountPhoneNumber);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AccountPhoneNumber).call(this, _objectSpread({
      client: client,
      getDataReducer: _getReducer.getDataReducer,
      fetchFunction: function fetchFunction() {
        return regeneratorRuntime.async(function fetchFunction$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap((0, _fetchList["default"])(function (params) {
                  return client.account().phoneNumber().list(params);
                }));

              case 2:
                _context.t0 = simplifyPhoneNumber;
                return _context.abrupt("return", _context.sent.map(_context.t0));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        });
      },
      readyCheckFn: function readyCheckFn() {
        return _this._rolesAndPermissions.ready;
      }
    }, options)));

    _initializerDefineProperty(_this, "numbers", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "extensionToPhoneNumberMap", _descriptor2, _assertThisInitialized(_this));

    console.warn('AccountPhoneNumber module is deprecated, please use CompanyContacts instead.');
    _this._rolesAndPermissions = (_context2 = _assertThisInitialized(_this), _ensureExist["default"]).call(_context2, rolesAndPermissions, 'rolesAndPermissions');
    return _this;
  }

  _createClass(AccountPhoneNumber, [{
    key: "_name",
    get: function get() {
      return 'accountPhoneNumber';
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return !!this._rolesAndPermissions.permissions.ReadCompanyPhoneNumbers;
    }
  }]);

  return AccountPhoneNumber;
}(_DataFetcher2["default"]), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "numbers", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;

    return [function () {
      return _this2.data;
    }, function (data) {
      return data || [];
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "extensionToPhoneNumberMap", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this3 = this;

    return [function () {
      return _this3.numbers;
    }, function (numbers) {
      var numberMap = {};
      numbers.forEach(function (number) {
        if (number.extension && number.extension.extensionNumber) {
          if (!numberMap[number.extension.extensionNumber]) {
            numberMap[number.extension.extensionNumber] = [];
          }

          numberMap[number.extension.extensionNumber].push(number);
        }
      });
      return numberMap;
    }];
  }
})), _class2)) || _class);
exports["default"] = AccountPhoneNumber;
//# sourceMappingURL=index.js.map
