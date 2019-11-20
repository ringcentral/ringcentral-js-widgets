"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getProxyServer;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.split");

require("regenerator-runtime/runtime");

var _RcModule2 = _interopRequireDefault(require("../RcModule"));

var _baseActionTypes = _interopRequireDefault(require("./baseActionTypes"));

var _getProxyServerReducer = _interopRequireDefault(require("./getProxyServerReducer"));

var _ensureExist = _interopRequireDefault(require("../ensureExist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var defaultVerifyModuleFunc = function defaultVerifyModuleFunc(module) {
  return module instanceof _RcModule2["default"];
};

function getProxyServer(createTarget) {
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
        _this._target = createTarget(_objectSpread({}, options));

        _this._target._getState = function () {
          return _this.state.target;
        };

        var _loop = function _loop(subModule) {
          var _context3;

          if ((_context3 = _this._target, Object.prototype.hasOwnProperty).call(_context3, subModule) && verifyModuleFunc(_this._target[subModule])) {
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

        _this._transport = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, transport, 'transport');
        _this._reducer = (0, _getProxyServerReducer["default"])({
          moduleReducer: _this._target.reducer,
          transport: transport,
          prefix: _this.prefix
        });
        transport.on(transport.events.request, function _callee(_ref2) {
          var requestId, _ref2$payload, type, functionPath, args, actionNumber, _functionPath$split$s, _functionPath$split$s2, pathTokens, fnName, target, _target, result;

          return regeneratorRuntime.async(function _callee$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  requestId = _ref2.requestId, _ref2$payload = _ref2.payload, type = _ref2$payload.type, functionPath = _ref2$payload.functionPath, args = _ref2$payload.args, actionNumber = _ref2$payload.actionNumber;
                  _context2.t0 = type;
                  _context2.next = _context2.t0 === _this.actionTypes.execute ? 4 : _context2.t0 === _this.actionTypes.sync ? 19 : 21;
                  break;

                case 4:
                  _functionPath$split$s = functionPath.split('.').slice(1), _functionPath$split$s2 = _toArray(_functionPath$split$s), pathTokens = _functionPath$split$s2.slice(0);
                  fnName = pathTokens.pop();
                  target = _this._target;
                  pathTokens.forEach(function (token) {
                    target = target[token];
                  });
                  _context2.prev = 8;
                  _context2.next = 11;
                  return regeneratorRuntime.awrap((_target = target)[fnName].apply(_target, _toConsumableArray(args)));

                case 11:
                  result = _context2.sent;
                  transport.response({
                    requestId: requestId,
                    result: result
                  });
                  _context2.next = 18;
                  break;

                case 15:
                  _context2.prev = 15;
                  _context2.t1 = _context2["catch"](8);
                  transport.response({
                    requestId: requestId,
                    error: _context2.t1
                  });

                case 18:
                  return _context2.abrupt("break", 23);

                case 19:
                  if (actionNumber !== _this.state.actionNumber) {
                    transport.response({
                      requestId: requestId,
                      result: _this.state
                    });
                  } else {
                    transport.response({
                      requestId: requestId,
                      error: new Error('State is already up to date.')
                    });
                  }

                  return _context2.abrupt("break", 23);

                case 21:
                  transport.response({
                    requestId: requestId,
                    error: new Error("Invalid request type '".concat(type, "'."))
                  });
                  return _context2.abrupt("break", 23);

                case 23:
                case "end":
                  return _context2.stop();
              }
            }
          }, null, null, [[8, 15]]);
        });
        return _this;
      }

      return _class;
    }(_RcModule2["default"])
  );
}
//# sourceMappingURL=getProxyServer.js.map
