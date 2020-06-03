"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getProxyServer;

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var defaultVerifyModuleFunc = function defaultVerifyModuleFunc(module) {
  return module instanceof _RcModule2["default"];
};

function getProxyServer(createTarget) {
  var verifyModuleFunc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultVerifyModuleFunc;
  return /*#__PURE__*/function (_RcModule) {
    _inherits(_class, _RcModule);

    var _super = _createSuper(_class);

    function _class(_ref) {
      var _context;

      var _this;

      var transport = _ref.transport,
          options = _objectWithoutProperties(_ref, ["transport"]);

      _classCallCheck(this, _class);

      _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
        actionTypes: _baseActionTypes["default"]
      }));
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
      transport.on(transport.events.request, /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
          var requestId, _ref2$payload, type, functionPath, args, actionNumber, _functionPath$split$s, _functionPath$split$s2, pathTokens, fnName, target, _target, result;

          return regeneratorRuntime.wrap(function _callee$(_context2) {
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
                  return (_target = target)[fnName].apply(_target, _toConsumableArray(args));

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
          }, _callee, null, [[8, 15]]);
        }));

        return function (_x) {
          return _ref3.apply(this, arguments);
        };
      }());
      return _this;
    }

    return _class;
  }(_RcModule2["default"]);
}
//# sourceMappingURL=getProxyServer.js.map
