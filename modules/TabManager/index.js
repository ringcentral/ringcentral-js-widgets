"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.object.assign");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _di = require("../../lib/di");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _Tabbie = _interopRequireDefault(require("../../lib/Tabbie"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getTabManagerReducer = _interopRequireDefault(require("./getTabManagerReducer"));

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TabManager = (
/**
 * @class
 * @description To handle data between different tabs
 */
_dec = (0, _di.Module)(), _dec(_class = (_temp =
/*#__PURE__*/
function (_RcModule) {
  _inherits(TabManager, _RcModule);

  function TabManager(_ref) {
    var _this;

    var options = Object.assign({}, _ref);

    _classCallCheck(this, TabManager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TabManager).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));
    _this._tabbie = void 0;
    _this._tabbie = new _Tabbie["default"]({
      prefix: _this.prefix
    });
    _this._reducer = (0, _getTabManagerReducer["default"])(_this.actionTypes);
    return _this;
  }

  _createClass(TabManager, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      return regeneratorRuntime.async(function initialize$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = this.store;
              _context2.t1 = this.actionTypes.initSuccess;
              _context2.next = 4;
              return regeneratorRuntime.awrap(this._tabbie.checkIsMain());

            case 4:
              _context2.t2 = _context2.sent;
              _context2.t3 = {
                type: _context2.t1,
                active: _context2.t2
              };

              _context2.t0.dispatch.call(_context2.t0, _context2.t3);

              if (this._tabbie.enabled) {
                this._tabbie.on('mainTabIdChanged', function _callee(mainTabId) {
                  return regeneratorRuntime.async(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.t0 = _this2.store;
                          _context.t1 = _this2.actionTypes.mainTabIdChanged;
                          _context.t2 = mainTabId;
                          _context.next = 5;
                          return regeneratorRuntime.awrap(_this2._tabbie.checkIsMain());

                        case 5:
                          _context.t3 = _context.sent;
                          _context.t4 = {
                            type: _context.t1,
                            mainTabId: _context.t2,
                            active: _context.t3
                          };

                          _context.t0.dispatch.call(_context.t0, _context.t4);

                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }
                  });
                });

                this._tabbie.on('event', function (event) {
                  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                  }

                  _this2.store.dispatch({
                    type: _this2.actionTypes.event,
                    event: event,
                    args: args
                  });
                });
              }

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "send",
    value: function send(event) {
      var _this$_tabbie;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (_this$_tabbie = this._tabbie).send.apply(_this$_tabbie, [event].concat(args));
    }
  }, {
    key: "ensureActive",
    value: function ensureActive() {
      return regeneratorRuntime.async(function ensureActive$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this._tabbie.checkIsMain());

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.state.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "active",
    get: function get() {
      return this.state.active;
    }
  }, {
    key: "id",
    get: function get() {
      return this._tabbie.id;
    }
  }, {
    key: "hasMultipleTabs",
    get: function get() {
      return this._tabbie.hasMultipleTabs;
    }
  }, {
    key: "event",
    get: function get() {
      return this.state.event;
    }
  }]);

  return TabManager;
}(_RcModule2["default"]), _temp)) || _class);
exports["default"] = TabManager;
//# sourceMappingURL=index.js.map
