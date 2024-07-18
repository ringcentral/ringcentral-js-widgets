"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Feedback = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));
var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var Feedback = (_dec = (0, _di.Module)({
  name: 'Feedback',
  deps: ['Storage']
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Feedback, _RcModuleV);
  var _super = _createSuper(Feedback);
  function Feedback(deps) {
    var _this;
    _classCallCheck(this, Feedback);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'Feedback'
    });
    _initializerDefineProperty(_this, "email", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "topic", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "subject", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "description", _descriptor4, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(Feedback, [{
    key: "_updateEmail",
    value: function _updateEmail(email) {
      this.email = email;
    }
  }, {
    key: "_updateTopic",
    value: function _updateTopic(topic) {
      this.topic = topic;
    }
  }, {
    key: "_updateSubject",
    value: function _updateSubject(subject) {
      this.subject = subject;
    }
  }, {
    key: "_updateDescription",
    value: function _updateDescription(description) {
      this.description = description;
    }
  }, {
    key: "_clean",
    value: function _clean() {
      this.email = '';
      this.topic = '';
      this.subject = '';
      this.description = '';
    }
  }, {
    key: "updateEmail",
    value: function () {
      var _updateEmail2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._updateEmail(email);
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function updateEmail(_x) {
        return _updateEmail2.apply(this, arguments);
      }
      return updateEmail;
    }()
  }, {
    key: "updateTopic",
    value: function () {
      var _updateTopic2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(topic) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._updateTopic(topic);
              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function updateTopic(_x2) {
        return _updateTopic2.apply(this, arguments);
      }
      return updateTopic;
    }()
  }, {
    key: "updateSubject",
    value: function () {
      var _updateSubject2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(subject) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._updateSubject(subject);
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function updateSubject(_x3) {
        return _updateSubject2.apply(this, arguments);
      }
      return updateSubject;
    }()
  }, {
    key: "updateDescription",
    value: function () {
      var _updateDescription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(description) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this._updateDescription(description);
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function updateDescription(_x4) {
        return _updateDescription2.apply(this, arguments);
      }
      return updateDescription;
    }()
  }, {
    key: "clean",
    value: function () {
      var _clean2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this._clean();
              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      function clean() {
        return _clean2.apply(this, arguments);
      }
      return clean;
    }()
  }, {
    key: "sendFeedback",
    value: function () {
      var _sendFeedback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(mailToUrl) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                window.location.href = mailToUrl;
              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));
      function sendFeedback(_x5) {
        return _sendFeedback.apply(this, arguments);
      }
      return sendFeedback;
    }()
  }]);
  return Feedback;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "email", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "topic", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "subject", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "description", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateEmail", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateEmail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateTopic", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateTopic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateSubject", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSubject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateDescription", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateDescription"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clean", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateEmail", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateEmail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTopic", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTopic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSubject", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSubject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateDescription", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateDescription"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clean", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendFeedback", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "sendFeedback"), _class2.prototype)), _class2)) || _class);
exports.Feedback = Feedback;
//# sourceMappingURL=Feedback.js.map
