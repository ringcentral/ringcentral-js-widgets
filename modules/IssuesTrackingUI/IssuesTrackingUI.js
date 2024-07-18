"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IssuesTrackingUI = void 0;
require("regenerator-runtime/runtime");
var _issueTrackingMessages = require("@ringcentral-integration/commons/enums/issueTrackingMessages");
var _di = require("@ringcentral-integration/commons/lib/di");
var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");
var _core = require("@ringcentral-integration/core");
var _dec, _dec2, _class, _class2, _descriptor;
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var IssuesTrackingUI = (_dec = (0, _di.Module)({
  name: 'IssuesTrackingUI',
  deps: ['RouterInteraction', 'Locale', 'Alert', 'BrowserLogger', {
    dep: 'IssuesTrackingViewOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (that) {
  return [that.open];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(IssuesTrackingUI, _RcUIModuleV);
  var _super = _createSuper(IssuesTrackingUI);
  _createClass(IssuesTrackingUI, [{
    key: "_setOpen",
    value: function _setOpen(val) {
      this.open = val;
    }
  }, {
    key: "setOpen",
    value: function () {
      var _setOpen2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(val) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._setOpen(val);
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function setOpen(_x) {
        return _setOpen2.apply(this, arguments);
      }
      return setOpen;
    }()
  }, {
    key: "ConfirmPanelProps",
    get: function get() {
      var _this2 = this;
      return {
        open: this.open,
        onCancel: function onCancel() {
          _this2.setOpen(false);
        },
        onClose: function onClose() {
          _this2.setOpen(false);
        },
        onConfirm: function () {
          var _onConfirm = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _this2.setOpen(false);
                    _context2.next = 3;
                    return _this2._deps.browserLogger.disable();
                  case 3:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));
          function onConfirm() {
            return _onConfirm.apply(this, arguments);
          }
          return onConfirm;
        }()
      };
    }
  }]);
  function IssuesTrackingUI(deps) {
    var _this;
    _classCallCheck(this, IssuesTrackingUI);
    _this = _super.call(this, {
      deps: deps
    });
    _initializerDefineProperty(_this, "open", _descriptor, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(IssuesTrackingUI, [{
    key: "goBack",
    value: function () {
      var _goBack = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._deps.routerInteraction.push('/settings');
              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function goBack() {
        return _goBack.apply(this, arguments);
      }
      return goBack;
    }()
  }, {
    key: "toggleEnable",
    value: function () {
      var _toggleEnable = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(checked) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!checked) {
                  _context4.next = 2;
                  break;
                }
                return _context4.abrupt("return", this._deps.browserLogger.enable());
              case 2:
                this.setOpen(true);
              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function toggleEnable(_x2) {
        return _toggleEnable.apply(this, arguments);
      }
      return toggleEnable;
    }()
  }, {
    key: "downloadLog",
    value: function () {
      var _downloadLog = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return this._deps.browserLogger.saveLog();
              case 3:
                this._deps.alert.success({
                  message: _issueTrackingMessages.issueTrackingMessages.downloadSuccess
                });
                this._deps.browserLogger.disable();
                _context5.next = 10;
                break;
              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](0);
                this._deps.alert.danger({
                  message: _issueTrackingMessages.issueTrackingMessages.downloadFail
                });
              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 7]]);
      }));
      function downloadLog() {
        return _downloadLog.apply(this, arguments);
      }
      return downloadLog;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps(props) {
      return {
        enabled: this._deps.browserLogger.enabled,
        downloading: this._deps.browserLogger.downloading,
        currentLocale: this._deps.locale.currentLocale,
        ConfirmPanelProps: this.ConfirmPanelProps
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(props) {
      var _this3 = this;
      return {
        downloadLog: function () {
          var _downloadLog2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return _this3.downloadLog();
                  case 2:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          }));
          function downloadLog() {
            return _downloadLog2.apply(this, arguments);
          }
          return downloadLog;
        }(),
        goBack: function () {
          var _goBack2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    _context7.next = 2;
                    return _this3.goBack();
                  case 2:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7);
          }));
          function goBack() {
            return _goBack2.apply(this, arguments);
          }
          return goBack;
        }(),
        toggleEnable: function () {
          var _toggleEnable2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(checked) {
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return _this3.toggleEnable(checked);
                  case 2:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8);
          }));
          function toggleEnable(_x3) {
            return _toggleEnable2.apply(this, arguments);
          }
          return toggleEnable;
        }()
      };
    }
  }]);
  return IssuesTrackingUI;
}(_core.RcUIModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "open", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "ConfirmPanelProps", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "ConfirmPanelProps"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setOpen", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setOpen"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setOpen", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "setOpen"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "goBack", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "goBack"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "toggleEnable", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "toggleEnable"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "downloadLog", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "downloadLog"), _class2.prototype)), _class2)) || _class);
exports.IssuesTrackingUI = IssuesTrackingUI;
//# sourceMappingURL=IssuesTrackingUI.js.map
