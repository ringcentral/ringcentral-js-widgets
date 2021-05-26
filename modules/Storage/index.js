"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _di = require("../../lib/di");

var _StorageBase2 = _interopRequireDefault(require("../../lib/StorageBase"));

var _loginStatus = _interopRequireDefault(require("../Auth/loginStatus"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DEFAULT_DISABLE_ALLOW_INACTIVE_TABS_WRITE = false;
/**
 * @class
 * @description Alternative implementation of the Storage class.
 *  Allows registeration of reducers so that persisted states can be computed with reducers.
 */

var Storage = (_dec = (0, _di.Module)({
  deps: ['Auth', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'StorageOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_StorageBase) {
  _inherits(Storage, _StorageBase);

  var _super = _createSuper(Storage);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {disableAllowInactiveTabsWrite} params.disableAllowInactiveTabsWrite - disable Allow Inactive Tabs Write
   * @param {Auth} params.auth - auth module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   */
  function Storage(_ref) {
    var _this;

    var _ref$disableAllowInac = _ref.disableAllowInactiveTabsWrite,
        disableAllowInactiveTabsWrite = _ref$disableAllowInac === void 0 ? DEFAULT_DISABLE_ALLOW_INACTIVE_TABS_WRITE : _ref$disableAllowInac,
        auth = _ref.auth,
        tabManager = _ref.tabManager,
        options = _objectWithoutProperties(_ref, ["disableAllowInactiveTabsWrite", "auth", "tabManager"]);

    _classCallCheck(this, Storage);

    _this = _super.call(this, _objectSpread({
      name: 'storage'
    }, options));
    _this._disableAllowInactiveTabsWrite = disableAllowInactiveTabsWrite;
    _this._auth = auth;
    _this._tabManager = tabManager;
    return _this;
  }

  _createClass(Storage, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      var storedData = null;
      this.store.subscribe( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var storageKey, key, currentData, _key;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this2._auth.loginStatus === _loginStatus["default"].loggedIn && (!_this2._tabManager || _this2._tabManager.ready) && _this2.pending)) {
                  _context.next = 21;
                  break;
                }

                _this2.store.dispatch({
                  type: _this2.actionTypes.init
                });

                storageKey = "".concat(_this2.prefix ? "".concat(_this2.prefix, "-") : '', "storage-").concat(_this2._auth.ownerId);
                _this2._storage = new _this2._StorageProvider({
                  storageKey: storageKey
                });
                _context.next = 6;
                return _this2._storage.getData();

              case 6:
                storedData = _context.sent;
                _context.t0 = regeneratorRuntime.keys(storedData);

              case 8:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 16;
                  break;
                }

                key = _context.t1.value;

                if (_this2._reducers[key]) {
                  _context.next = 14;
                  break;
                }

                delete storedData[key];
                _context.next = 14;
                return _this2._storage.removeItem(key);

              case 14:
                _context.next = 8;
                break;

              case 16:
                _this2.store.dispatch({
                  type: _this2.actionTypes.initSuccess,
                  storageKey: storageKey,
                  // To fix same reference in redux store with storedData
                  data: _objectSpread(_objectSpread({}, _this2.data), storedData)
                });

                _this2._storageHandler = function (_ref3) {
                  var key = _ref3.key,
                      value = _ref3.value;

                  if (_this2.ready) {
                    storedData[key] = value;

                    _this2.store.dispatch({
                      type: _this2.actionTypes.sync,
                      key: key,
                      value: value
                    });
                  }
                };

                _this2._storage.on('storage', _this2._storageHandler);

                _context.next = 22;
                break;

              case 21:
                if ((!!_this2._tabManager && !_this2._tabManager.ready || _this2._auth.notLoggedIn) && _this2.ready) {
                  _this2.store.dispatch({
                    type: _this2.actionTypes.reset
                  });

                  if (_this2._storageHandler) {
                    if (_this2._storage.off) {
                      _this2._storage.off('storage', _this2._storageHandler);
                    } else if (_this2._storage.removeListener) {
                      _this2._storage.removeListener('storage', _this2._storageHandler);
                    }

                    _this2._storageHandler = null;
                  }

                  if (_this2._storage) {
                    _this2._storage.destroy();

                    _this2._storage = null;
                  }

                  _this2.store.dispatch({
                    type: _this2.actionTypes.resetSuccess
                  });
                }

              case 22:
                if (_this2.status === _moduleStatuses["default"].ready && (!_this2._disableAllowInactiveTabsWrite || !_this2._tabManager || _this2._tabManager.active)) {
                  // save new data to storage when changed
                  currentData = _this2.data;

                  for (_key in currentData) {
                    if (storedData[_key] !== currentData[_key]) {
                      _this2._storage.setItem(_key, currentData[_key]);

                      storedData[_key] = currentData[_key];
                    }
                  }
                }

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })));
    }
  }]);

  return Storage;
}(_StorageBase2["default"])) || _class);
exports["default"] = Storage;
//# sourceMappingURL=index.js.map
