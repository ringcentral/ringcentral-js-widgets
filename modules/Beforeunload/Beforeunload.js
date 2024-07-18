"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.splice");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Beforeunload = void 0;
var _di = require("@ringcentral-integration/commons/lib/di");
var _core = require("@ringcentral-integration/core");
var _dec, _class;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
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
var UNLOAD_EVENT_NAME = 'beforeunload';
var Beforeunload = (_dec = (0, _di.Module)({
  name: 'Beforeunload',
  deps: [{
    dep: 'BeforeunloadOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Beforeunload, _RcModuleV);
  var _super = _createSuper(Beforeunload);
  _createClass(Beforeunload, [{
    key: "list",
    get: function get() {
      return this._list;
    },
    set: function set(value) {
      this._list = value;
      if (this._bindState && this._list.length === 0) {
        this._window.removeEventListener(UNLOAD_EVENT_NAME, this._beforeunloadHandler);
        // TODO: binding event here, that will not emit when close tab, not sure why
        // this._window.removeEventListener('pagehide', this._onAfterUnload);
        this._bindState = false;
      } else if (!this._bindState && this._list.length > 0) {
        this._window.addEventListener(UNLOAD_EVENT_NAME, this._beforeunloadHandler);
        // TODO: binding event here, that will not emit when close tab, not sure why
        // this._window.addEventListener('pagehide', this._onAfterUnload);
        this._bindState = true;
      }
    }
  }]);
  function Beforeunload() {
    var _this$_deps$beforeunl, _this$_deps$beforeunl2;
    var _this;
    _classCallCheck(this, Beforeunload);
    _this = _super.call(this, {
      deps: {}
    });
    _this._window = void 0;
    _this._list = [];
    _this._bindState = false;
    _this._beforeunloadHandler = function (event) {
      if (_this.checkShouldBlock()) {
        event.preventDefault();
        event.returnValue = '';
        return;
      }

      // Guarantee the browser unload by removing the returnValue property of the event
      delete event.returnValue;
    };
    _this._window = (_this$_deps$beforeunl = (_this$_deps$beforeunl2 = _this._deps.beforeunloadOptions) === null || _this$_deps$beforeunl2 === void 0 ? void 0 : _this$_deps$beforeunl2.originWindow) !== null && _this$_deps$beforeunl !== void 0 ? _this$_deps$beforeunl : window;
    return _this;
  }

  /**
   * add method into window event beforeunload
   * @param cb a callback with boolean, if return `true` that will block browser close.
   */
  _createClass(Beforeunload, [{
    key: "add",
    value: function add(cb) {
      var index = this.list.indexOf(cb);
      if (index === -1) {
        this.list = [].concat(_toConsumableArray(this.list), [cb]);
        return this.list.length;
      }
      return index;
    }
    /**
     * remove check from check list.
     * @param cb a callback that you add previous.
     */
  }, {
    key: "remove",
    value: function remove(cb) {
      var index = this.list.indexOf(cb);
      if (index > -1) {
        this._removeItem(index);
      }
      return index;
    }
    /**
     * clear all check methods
     */
  }, {
    key: "clear",
    value: function clear() {
      this.list = [];
    }
    /**
     * check all should block callback, and return should we need block
     */
  }, {
    key: "checkShouldBlock",
    value: function checkShouldBlock() {
      var _iterator = _createForOfIteratorHelper(this._list),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var fn = _step.value;
          if (fn()) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return false;
    }
    /**
     * that method will trigger after check not leave success
     */
  }, {
    key: "onAfterUnload",
    value: function onAfterUnload(cb) {
      var _this2 = this;
      var notNeedCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this._window.addEventListener('pagehide', function () {
        if (notNeedCheck || _this2.checkShouldBlock()) {
          cb();
        }
      });
    }
  }, {
    key: "removeAfterUnloadListener",
    value: function removeAfterUnloadListener(cb) {
      console.log('removeAfterUnloadListener~~');
      this._window.removeEventListener('pagehide', cb);
    }
  }, {
    key: "_removeItem",
    value: function _removeItem(i) {
      var list = _toConsumableArray(this.list);
      list.splice(i, 1);
      this.list = list;
    }
  }]);
  return Beforeunload;
}(_core.RcModuleV2)) || _class);
exports.Beforeunload = Beforeunload;
//# sourceMappingURL=Beforeunload.js.map
