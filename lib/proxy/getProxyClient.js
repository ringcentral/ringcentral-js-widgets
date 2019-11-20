"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getProxyClient;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.object.define-property");

var _uuid = _interopRequireDefault(require("uuid"));

var _RcModule2 = _interopRequireDefault(require("../RcModule"));

var _getProxyClientReducer = _interopRequireDefault(require("./getProxyClientReducer"));

var _baseActionTypes = _interopRequireDefault(require("./baseActionTypes"));

var _ensureExist = _interopRequireDefault(require("../ensureExist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var defaultVerifyModuleFunc = function defaultVerifyModuleFunc(module) {
  return module instanceof _RcModule2["default"];
};

function getProxyClient(createTarget) {
  var verifyModuleFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultVerifyModuleFunc;
  return (
    /*#__PURE__*/
    function (_RcModule) {
      _inherits(_class, _RcModule);

      function _class(_ref) {
        var _context;

        var _this;

        var transport = _ref.transport,
            options = _objectWithoutProperties(_ref, ["transport"]);

        _classCallCheck(this, _class);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(_class).call(this, _objectSpread({}, options, {
          actionTypes: _baseActionTypes["default"]
        })));
        _this._id = _uuid["default"].v4();
        _this._target = createTarget(_objectSpread({}, options));

        _this._target._getState = function () {
          return _this.state.target;
        };

        _this._target._getProxyState = function () {
          return _this.state.proxy;
        }; // this._target = new Target({
        //   ...options,
        //   getState: () => this.state.target,
        //   getProxyState: () => this.state.proxy,
        // });


        _this._transport = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, transport, 'transport');

        _this._setTransport(_this._target);

        var _loop = function _loop(subModule) {
          var _context2;

          if ((_context2 = _this._target, Object.prototype.hasOwnProperty).call(_context2, subModule) && verifyModuleFunc(_this._target[subModule])) {
            Object.defineProperty(_assertThisInitialized(_this), subModule, {
              configurable: false,
              enumerable: true,
              get: function get() {
                return this._target[subModule];
              }
            });
          }
        };

        for (var subModule in _this._target) {
          _loop(subModule);
        }

        _this._reducer = (0, _getProxyClientReducer["default"])({
          targetReducer: _this._target.reducer,
          proxyReducer: _this._target.proxyReducer,
          transport: transport,
          types: _this.actionTypes
        });
        return _this;
      }

      _createClass(_class, [{
        key: "_setTransport",
        value: function _setTransport(target) {
          target._transport = this._transport;
          target._proxyActionTypes = this.actionTypes;
          target._suppressInit = true;

          for (var subModule in target) {
            if (Object.prototype.hasOwnProperty.call(target, subModule) && verifyModuleFunc(target[subModule])) {
              target[subModule]._transport = this._transport;
              target[subModule]._proxyActionTypes = this.actionTypes;
              target[subModule]._suppressInit = true;
            }
          }
        }
      }, {
        key: "_sync",
        value: function _sync() {
          var result;
          return regeneratorRuntime.async(function _sync$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.prev = 0;
                  _context3.next = 3;
                  return regeneratorRuntime.awrap(this._transport.request({
                    payload: {
                      type: this.actionTypes.sync,
                      actionNumber: this.state.actionNumber
                    }
                  }));

                case 3:
                  result = _context3.sent;
                  this.store.dispatch(_objectSpread({}, result, {
                    type: this.actionTypes.sync
                  }));
                  _context3.next = 9;
                  break;

                case 7:
                  _context3.prev = 7;
                  _context3.t0 = _context3["catch"](0);

                case 9:
                  this._syncPromise = null;

                case 10:
                case "end":
                  return _context3.stop();
              }
            }
          }, null, this, [[0, 7]]);
        }
      }, {
        key: "sync",
        value: function sync() {
          if (!this._syncPromise) {
            this._syncPromise = this._sync();
          }

          return this._syncPromise;
        }
      }, {
        key: "_initialize",
        value: function _initialize(target) {
          if (typeof target.initializeProxy === 'function' && !target._proxyInitialized) {
            target._proxyInitialized = true;
            target.initializeProxy();
          }

          for (var subModule in target) {
            if (Object.prototype.hasOwnProperty.call(target, subModule) && verifyModuleFunc(target[subModule]) && typeof target[subModule].initializeProxy === 'function' && !target[subModule]._proxyInitialized) {
              target[subModule]._proxyInitialized = true;
              target[subModule].initializeProxy();
            }
          }
        }
      }, {
        key: "initialize",
        value: function initialize() {
          var _this2 = this;

          return regeneratorRuntime.async(function initialize$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  // initialize the instance before sync to avoid history object from
                  // becoming out of sync
                  this._initialize(this._target);

                  this._transport.on(this._transport.events.push, function _callee(payload) {
                    return regeneratorRuntime.async(function _callee$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!(payload.type === _this2.actionTypes.action)) {
                              _context4.next = 10;
                              break;
                            }

                            if (!_this2._syncPromise) {
                              _context4.next = 4;
                              break;
                            }

                            _context4.next = 4;
                            return regeneratorRuntime.awrap(_this2._syncPromise);

                          case 4:
                            if (!(payload.actionNumber === _this2.state.actionNumber + 1)) {
                              _context4.next = 8;
                              break;
                            }

                            _this2.store.dispatch(_objectSpread({}, payload, {
                              type: _this2.actionTypes.action
                            }));

                            _context4.next = 10;
                            break;

                          case 8:
                            _context4.next = 10;
                            return regeneratorRuntime.awrap(_this2.sync());

                          case 10:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    });
                  });

                  _context5.next = 4;
                  return regeneratorRuntime.awrap(this.sync());

                case 4:
                case "end":
                  return _context5.stop();
              }
            }
          }, null, this);
        }
      }]);

      return _class;
    }(_RcModule2["default"])
  );
}
//# sourceMappingURL=getProxyClient.js.map
