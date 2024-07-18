"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvRequeueCall = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _enums = require("../../enums");
var _EvTypeError = require("../../lib/EvTypeError");
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var EvRequeueCall = (_dec = (0, _di.Module)({
  name: 'EvRequeueCall',
  deps: ['EvClient', 'EvCall', 'Storage', 'ActiveCallControl', 'EvAuth', 'Alert', {
    dep: 'EvRequeueCallOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that._deps.evCall.currentCall, that._deps.evAuth.agentPermissions.allowCrossQueueRequeue];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvRequeueCall, _RcModuleV);
  var _super = _createSuper(EvRequeueCall);
  function EvRequeueCall(deps) {
    var _this;
    _classCallCheck(this, EvRequeueCall);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'EvRequeueCall'
    });
    _initializerDefineProperty(_this, "selectedQueueGroupId", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "selectedGateId", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "stayOnCall", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "requeuing", _descriptor4, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(EvRequeueCall, [{
    key: "setStatus",
    value: function setStatus(_ref) {
      var selectedQueueGroupId = _ref.selectedQueueGroupId,
        selectedGateId = _ref.selectedGateId,
        stayOnCall = _ref.stayOnCall,
        requeuing = _ref.requeuing;
      this.selectedQueueGroupId = selectedQueueGroupId !== null && selectedQueueGroupId !== void 0 ? selectedQueueGroupId : this.selectedQueueGroupId;
      this.selectedGateId = selectedGateId !== null && selectedGateId !== void 0 ? selectedGateId : this.selectedGateId;
      this.stayOnCall = stayOnCall !== null && stayOnCall !== void 0 ? stayOnCall : this.stayOnCall;
      this.requeuing = requeuing !== null && requeuing !== void 0 ? requeuing : this.requeuing;
    }
  }, {
    key: "requeueCall",
    value: function () {
      var _requeueCall = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var loadingId, result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                this.setStatus({
                  requeuing: true
                });
                _context.next = 4;
                return this._deps.alert.info({
                  message: _enums.requeueEvents.START,
                  loading: true
                });
              case 4:
                loadingId = _context.sent;
                _context.next = 7;
                return this._deps.evClient.requeueCall({
                  maintain: this.stayOnCall,
                  queueId: this.selectedGateId
                });
              case 7:
                result = _context.sent;
                if (!(result.status === 'FAILURE')) {
                  _context.next = 10;
                  break;
                }
                throw new _EvTypeError.EvTypeError({
                  type: 'Requeue'
                });
              case 10:
                if (!this.stayOnCall) {
                  _context.next = 13;
                  break;
                }
                _context.next = 13;
                return this._deps.activeCallControl.hold();
              case 13:
                this._deps.alert.success({
                  message: _enums.requeueEvents.SUCCESS
                });
                _context.next = 20;
                break;
              case 16:
                _context.prev = 16;
                _context.t0 = _context["catch"](0);
                this._deps.alert.danger({
                  message: _enums.requeueEvents.FAILURE
                });
                throw new _EvTypeError.EvTypeError({
                  type: _enums.requeueEvents.FAILURE
                });
              case 20:
                _context.prev = 20;
                this.setStatus({
                  requeuing: false
                });
                this._deps.alert.dismiss(loadingId);
                return _context.finish(20);
              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 16, 20, 24]]);
      }));
      function requeueCall() {
        return _requeueCall.apply(this, arguments);
      }
      return requeueCall;
    }()
  }, {
    key: "_hasRequeueQueues",
    value: function _hasRequeueQueues(currentCall) {
      var result = false;
      if (currentCall.requeueType === 'ADVANCED') {
        var queues = this._deps.evAuth.availableQueues;
        result = queues && queues.length > 0;
      } else {
        var shortcuts = currentCall.requeueShortcuts;
        result = shortcuts && shortcuts.length > 0;
      }
      return result;
    }
  }, {
    key: "allowRequeueCall",
    get: function get() {
      var currentCall = this._deps.evCall.currentCall;
      var result = true;
      if (currentCall && !currentCall.endedCall) {
        if (!currentCall.allowRequeue) {
          result = false;
        } else if (!this._deps.evAuth.agentPermissions.allowCrossQueueRequeue && currentCall.callType === 'OUTBOUND' && currentCall.requeueType === 'ADVANCED') {
          result = false;
        } else if (!this._hasRequeueQueues(currentCall)) {
          result = false;
        }
      }
      return result;
    }
  }]);
  return EvRequeueCall;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "selectedQueueGroupId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "selectedGateId", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "stayOnCall", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "requeuing", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "allowRequeueCall", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "allowRequeueCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setStatus"), _class2.prototype)), _class2)) || _class);
exports.EvRequeueCall = EvRequeueCall;
//# sourceMappingURL=EvRequeueCall.js.map