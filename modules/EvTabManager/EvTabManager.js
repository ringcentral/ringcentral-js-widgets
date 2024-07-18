"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvTabManager = void 0;
require("regenerator-runtime/runtime");
var _di = require("@ringcentral-integration/commons/lib/di");
var _TabManager2 = require("@ringcentral-integration/commons/modules/TabManager");
var _core = require("@ringcentral-integration/core");
var _events = require("events");
var _enums = require("../../enums");
var _dec, _class, _class2, _descriptor;
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
var EvTabManager = (_dec = (0, _di.Module)({
  name: 'TabManager',
  deps: ['GlobalStorage']
}), _dec(_class = (_class2 = /*#__PURE__*/function (_TabManager) {
  _inherits(EvTabManager, _TabManager);
  var _super = _createSuper(EvTabManager);
  function EvTabManager() {
    var _this;
    _classCallCheck(this, EvTabManager);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this._eventEmitter = new _events.EventEmitter();
    _initializerDefineProperty(_this, "mainTabId", _descriptor, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(EvTabManager, [{
    key: "setMainTabId",
    value: function setMainTabId(id) {
      this.setMainTabIdInThisTab(id);
      // could not use Storage module because of DI circular dependency
      this._sendTabManager(_enums.tabManagerEvents.SET_MIAN_TAB_ID, id);
    }
  }, {
    key: "setMainTabIdInThisTab",
    value: function setMainTabIdInThisTab(id) {
      this.mainTabId = id;
    }
  }, {
    key: "_sendTabManager",
    value: function _sendTabManager(event, value) {
      this.send(event, value);
    }
  }, {
    key: "emitSetMainTabComplete",
    value: function emitSetMainTabComplete() {
      console.log('_emitSetMainTabComplete~');
      this._eventEmitter.emit(_enums.tabManagerEvents.SET_MAIN_TAB_COMPLETE);
    }
  }, {
    key: "onSetMainTabComplete",
    value: function onSetMainTabComplete(callback) {
      this._eventEmitter.on(_enums.tabManagerEvents.SET_MAIN_TAB_COMPLETE, callback);
    }
  }, {
    key: "checkIsMainTabAlive",
    value: function () {
      var _checkIsMainTabAlive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", !this.enable || this.mainTabId &&
                // check if tab exist by finding in storaged tabs
                this.checkTabAliveById(this.mainTabId));
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function checkIsMainTabAlive() {
        return _checkIsMainTabAlive.apply(this, arguments);
      }
      return checkIsMainTabAlive;
    }()
  }, {
    key: "firstTabIdExcludeMainTab",
    get: function get() {
      var _this2 = this;
      return this.tabbie.actualTabIds.find(function (tab) {
        return tab !== _this2.mainTabId;
      }) || null;
    }
  }, {
    key: "isMainTab",
    get: function get() {
      return !this.enable || this.mainTabId === this.id;
    }
  }, {
    key: "prefix",
    get: function get() {
      return this.tabbie.prefix;
    }
  }]);
  return EvTabManager;
}(_TabManager2.TabManager), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mainTabId", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setMainTabIdInThisTab", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setMainTabIdInThisTab"), _class2.prototype)), _class2)) || _class);
exports.EvTabManager = EvTabManager;
//# sourceMappingURL=EvTabManager.js.map
