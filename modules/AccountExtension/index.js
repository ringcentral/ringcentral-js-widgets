"use strict";

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.date.now");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _di = require("../../lib/di");

var _DataFetcher2 = _interopRequireDefault(require("../../lib/DataFetcher"));

var _fetchList = _interopRequireDefault(require("../../lib/fetchList"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _selector = require("../../lib/selector");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getAccountExtensionReducer = require("./getAccountExtensionReducer");

var _accountExtensionHelper = require("./accountExtensionHelper");

var _subscriptionFilters = _interopRequireDefault(require("../../enums/subscriptionFilters"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _extensionTypes = _interopRequireDefault(require("../../enums/extensionTypes"));

var _dec, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var extensionRegExp = /.*\/extension$/;
var DEFAULT_TTL = 24 * 60 * 60 * 1000;
var DEFAULT_CHECK_STATUS = true; // Consider enable all extension types and filter through selector if
// we'll allow users to configure this through settings

var DEFAULT_TYPE_LIST = [_extensionTypes["default"].digitalUser, _extensionTypes["default"].user, _extensionTypes["default"].department];
/**
 * @class
 * @description Accound extension list managing module
 */

var AccountExtension = (_dec = (0, _di.Module)({
  deps: ['Client', 'RolesAndPermissions', {
    dep: 'AccountExtensionOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_DataFetcher) {
  _inherits(AccountExtension, _DataFetcher);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Number} params.ttl - local cache timestamp, default 24 hours
   */
  function AccountExtension(_ref) {
    var _context3;

    var _this;

    var client = _ref.client,
        rolesAndPermissions = _ref.rolesAndPermissions,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        _ref$checkStatus = _ref.checkStatus,
        checkStatus = _ref$checkStatus === void 0 ? DEFAULT_CHECK_STATUS : _ref$checkStatus,
        _ref$typeList = _ref.typeList,
        typeList = _ref$typeList === void 0 ? DEFAULT_TYPE_LIST : _ref$typeList,
        _ref$showNotActivated = _ref.showNotActivated,
        showNotActivated = _ref$showNotActivated === void 0 ? false : _ref$showNotActivated,
        options = _objectWithoutProperties(_ref, ["client", "rolesAndPermissions", "ttl", "checkStatus", "typeList", "showNotActivated"]);

    _classCallCheck(this, AccountExtension);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AccountExtension).call(this, _objectSpread({}, options, {
      client: client,
      ttl: ttl,
      getDataReducer: _getAccountExtensionReducer.getDataReducer,
      getTimestampReducer: _getAccountExtensionReducer.getTimestampReducer,
      subscriptionFilters: [_subscriptionFilters["default"].accountExtension],
      subscriptionHandler: function () {
        var _subscriptionHandler = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee(message) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _this._subscriptionHandleFn(message);

                case 1:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function subscriptionHandler(_x) {
          return _subscriptionHandler.apply(this, arguments);
        }

        return subscriptionHandler;
      }(),
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee2() {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _fetchList["default"])(function (params) {
                    var fetchRet = _this._client.account().extension().list(params);

                    return fetchRet;
                  });

                case 2:
                  _context2.t0 = function (ext) {
                    return _this._extensionFilter(ext);
                  };

                  _context2.t1 = _accountExtensionHelper.simplifyExtensionData;
                  return _context2.abrupt("return", _context2.sent.filter(_context2.t0).map(_context2.t1));

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }

        return fetchFunction;
      }(),
      readyCheckFn: function readyCheckFn() {
        return _this._rolesAndPermissions.ready;
      }
    })));

    _initializerDefineProperty(_this, "availableExtensions", _descriptor, _assertThisInitialized(_this));

    console.warn('AccountExtension module is deprecated, please use CompanyContacts instead.');
    _this._checkStatus = checkStatus;
    _this._typeList = typeList;
    _this._rolesAndPermissions = (_context3 = _assertThisInitialized(_this), _ensureExist["default"]).call(_context3, rolesAndPermissions, 'rolesAndPermissions');
    _this._showNotActivated = showNotActivated;
    return _this;
  }

  _createClass(AccountExtension, [{
    key: "_extensionFilter",
    value: function _extensionFilter(ext) {
      return (0, _accountExtensionHelper.hasExtensionNumber)(ext) && (!this._checkStatus || (0, _accountExtensionHelper.isEnabled)(ext) || this._showNotActivated && (0, _accountExtensionHelper.isNotActivated)(ext)) && !(0, _accountExtensionHelper.isFiltered)(ext, this._typeList);
    }
  }, {
    key: "_subscriptionHandleFn",
    value: function () {
      var _subscriptionHandleFn2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(message) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

        return regeneratorRuntime.wrap(function _callee3$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(message && extensionRegExp.test(message.event) && message.body && message.body.extensions)) {
                  _context4.next = 27;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context4.prev = 4;
                _iterator = message.body.extensions[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context4.next = 13;
                  break;
                }

                item = _step.value;
                _context4.next = 10;
                return this._processExtension(item);

              case 10:
                _iteratorNormalCompletion = true;
                _context4.next = 6;
                break;

              case 13:
                _context4.next = 19;
                break;

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](4);
                _didIteratorError = true;
                _iteratorError = _context4.t0;

              case 19:
                _context4.prev = 19;
                _context4.prev = 20;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 22:
                _context4.prev = 22;

                if (!_didIteratorError) {
                  _context4.next = 25;
                  break;
                }

                throw _iteratorError;

              case 25:
                return _context4.finish(22);

              case 26:
                return _context4.finish(19);

              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee3, this, [[4, 15, 19, 27], [20,, 22, 26]]);
      }));

      function _subscriptionHandleFn(_x2) {
        return _subscriptionHandleFn2.apply(this, arguments);
      }

      return _subscriptionHandleFn;
    }()
  }, {
    key: "_processExtension",
    value: function () {
      var _processExtension2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(item) {
        var extensionId, eventType, id, extensionData;
        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                extensionId = item.extensionId, eventType = item.eventType;
                id = parseInt(extensionId, 10);

                if (!(eventType === 'Delete')) {
                  _context5.next = 6;
                  break;
                }

                this._deleteExtension(id);

                _context5.next = 18;
                break;

              case 6:
                if (!(eventType === 'Create' || eventType === 'Update')) {
                  _context5.next = 18;
                  break;
                }

                _context5.prev = 7;
                _context5.next = 10;
                return this._fetchExtensionData(id);

              case 10:
                extensionData = _context5.sent;

                this._addOrDeleteExtension(extensionData, id);

                _context5.next = 16;
                break;

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5["catch"](7);

              case 16:
                _context5.next = 18;
                break;

              case 18:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, this, [[7, 14]]);
      }));

      function _processExtension(_x3) {
        return _processExtension2.apply(this, arguments);
      }

      return _processExtension;
    }()
  }, {
    key: "_addOrDeleteExtension",
    value: function _addOrDeleteExtension(extensionData, extensionId) {
      var essential = this._extensionFilter(extensionData);

      var alreadyExists = this.isAvailableExtension(extensionData.extensionNumber);

      if (essential && !alreadyExists) {
        this._addExtension(extensionData);
      } else if (!essential && alreadyExists) {
        this._deleteExtension(extensionId);
      } else if (essential && alreadyExists) {
        this._updateExtension(extensionId, extensionData);
      }
    }
  }, {
    key: "_addExtension",
    value: function _addExtension(data) {
      this.store.dispatch({
        type: this.actionTypes.add,
        data: (0, _accountExtensionHelper.simplifyExtensionData)(data),
        timestamp: Date.now()
      });
    }
  }, {
    key: "_deleteExtension",
    value: function _deleteExtension(id) {
      this.store.dispatch({
        type: this.actionTypes["delete"],
        id: id,
        timestamp: Date.now()
      });
    }
  }, {
    key: "_updateExtension",
    value: function _updateExtension(id, data) {
      this.store.dispatch({
        type: this.actionTypes.update,
        id: id,
        data: (0, _accountExtensionHelper.simplifyExtensionData)(data),
        timestamp: Date.now()
      });
    }
  }, {
    key: "_fetchExtensionData",
    value: function () {
      var _fetchExtensionData2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(id) {
        return regeneratorRuntime.wrap(function _callee5$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", this._client.account().extension(id).get());

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee5, this);
      }));

      function _fetchExtensionData(_x4) {
        return _fetchExtensionData2.apply(this, arguments);
      }

      return _fetchExtensionData;
    }()
  }, {
    key: "isAvailableExtension",
    value: function isAvailableExtension(extensionNumber) {
      return !!(0, _ramda.find)(function (item) {
        return item.ext === extensionNumber;
      }, this.availableExtensions);
    }
  }, {
    key: "_name",
    get: function get() {
      return 'accountExtension';
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      return _actionTypes["default"];
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return !!this._rolesAndPermissions.permissions.ReadExtensions;
    }
  }]);

  return AccountExtension;
}(_DataFetcher2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_fetchExtensionData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchExtensionData"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "availableExtensions", [_selector.selector], {
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
})), _class2)) || _class);
exports["default"] = AccountExtension;
//# sourceMappingURL=index.js.map
