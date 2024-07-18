"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.find");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvCallDisposition = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _dec, _class, _class2, _descriptor, _descriptor2;
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var EvCallDisposition = (_dec = (0, _di.Module)({
  name: 'EvCallDisposition',
  deps: ['Storage', 'EvCallMonitor', 'EvCallHistory', 'EvClient', {
    dep: 'ContactMatcher',
    optional: true
  }, {
    dep: 'ActivityMatcher',
    optional: true
  }, {
    dep: 'EvCallDispositionOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvCallDisposition, _RcModuleV);
  var _super = _createSuper(EvCallDisposition);
  function EvCallDisposition(deps) {
    var _this;
    _classCallCheck(this, EvCallDisposition);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvCallDisposition'
    });
    _initializerDefineProperty(_this, "callsMapping", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "dispositionStateMapping", _descriptor2, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(EvCallDisposition, [{
    key: "setDisposition",
    value: function setDisposition(id, data) {
      this.callsMapping[id] = data;
    }
  }, {
    key: "removeDisposition",
    value: function removeDisposition(id) {
      delete this.callsMapping[id];
    }
  }, {
    key: "setDispositionState",
    value: function setDispositionState(id, disposed) {
      this.dispositionStateMapping[id] = disposed;
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this2 = this;
      this._deps.evCallMonitor.onCallAnswered(function (call) {
        if (call.outdialDispositions) {
          var disposition = call.outdialDispositions.dispositions.find(function (_ref) {
            var isDefault = _ref.isDefault;
            return isDefault;
          });
          var id = _this2._deps.evCallMonitor.getCallId(call.session);
          _this2.setDisposition(id, {
            dispositionId: disposition ? disposition.dispositionId : null,
            notes: ''
          });
        }
      });
    }
  }, {
    key: "disposeCall",
    value: function disposeCall(id) {
      var call = this._deps.evCallHistory.callsMapping[id];
      var callDisposition = this.callsMapping[id];
      var isDisposed = this.dispositionStateMapping[id] && this.dispositionStateMapping[id].disposed;
      if (!call.outdialDispositions || isDisposed) return;
      this._deps.evClient.dispositionCall({
        uii: call.uii,
        dispId: callDisposition.dispositionId,
        notes: callDisposition.notes
      });
      this.setDispositionState(id, {
        disposed: true
      });
    }
  }]);
  return EvCallDisposition;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "callsMapping", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "dispositionStateMapping", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setDisposition", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setDisposition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removeDisposition", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "removeDisposition"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setDispositionState", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setDispositionState"), _class2.prototype)), _class2)) || _class);
exports.EvCallDisposition = EvCallDisposition;
//# sourceMappingURL=EvCallDisposition.js.map
