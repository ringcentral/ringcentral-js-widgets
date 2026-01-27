"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CoworkerLogger = void 0;
var _services = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var CoworkerLogger = exports.CoworkerLogger = (_dec = (0, _nextCore.injectable)({
  name: 'CoworkerLogger'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)(_nextCore.CoworkerOptions)(target, undefined, 2);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('CoworkerLoggerOptions')(target, undefined, 4);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _nextCore.Coworker === "undefined" ? Object : _nextCore.Coworker, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof ICoworkerOptions === "undefined" ? Object : ICoworkerOptions, typeof _services.BrowserLogger === "undefined" ? Object : _services.BrowserLogger, typeof CoworkerLoggerOptions === "undefined" ? Object : CoworkerLoggerOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = /*#__PURE__*/function (_RcModule) {
  function CoworkerLogger(_coworker, _portManager, _coworkerOptions, _browserLogger, _coworkerLoggerOptions) {
    var _this;
    _classCallCheck(this, CoworkerLogger);
    _this = _callSuper(this, CoworkerLogger);
    _this._coworker = _coworker;
    _this._portManager = _portManager;
    _this._coworkerOptions = _coworkerOptions;
    _this._browserLogger = _browserLogger;
    _this._coworkerLoggerOptions = _coworkerLoggerOptions;
    _this.transport = void 0;
    _this.init();
    return _this;
  }
  _inherits(CoworkerLogger, _RcModule);
  return _createClass(CoworkerLogger, [{
    key: "init",
    value: function init() {
      var _this2 = this;
      if (this._browserLogger && !this._coworker.isCoworker && !this._coworker.isMain) {
        this.initializeOnClient();
      }
      if (this._browserLogger && this._portManager.shared) {
        this._portManager.onServer(function () {
          return (0, _nextCore.watch)(_this2, function () {
            return _this2._browserLogger.enabled;
          }, function (enabled) {
            _this2.coworkerTransport.emit({
              name: 'toggleLogger',
              respond: false
            }, enabled);
          });
        });
      }
      if (this._coworker.isCoworker) {
        this.coworkerTransport.listen('toggleLogger', function (enabled) {
          if (enabled) {
            _this2._browserLogger.enable();
          } else {
            _this2._browserLogger.disable();
          }
        });
      }
    }
  }, {
    key: "coworkerTransport",
    get: function get() {
      return this._coworker.transport;
    }
  }, {
    key: "initializeOnClient",
    value: function initializeOnClient() {
      var _this3 = this;
      if (this._portManager.shared && this._portManager.isWorkerMode) {
        this._portManager.onMainTab(function () {
          _this3.transport = (0, _nextCore.createTransport)('SharedWorkerClient', {
            worker: _this3._coworkerOptions.worker,
            prefix: 'logger'
          });
          _this3.transport.listen('syncLog', function (data) {
            _this3._browserLogger.storageTransport.write(data);
          });
        });
      }
    }
  }]);
}(_nextCore.RcModule)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CoworkerLogger.js.map
