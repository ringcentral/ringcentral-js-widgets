"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Beforeunload = void 0;

require("core-js/modules/es6.array.index-of");

var _core = require("@ringcentral-integration/core");

var _di = require("@ringcentral-integration/commons/lib/di");

var _dec, _class;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
        this._window.removeEventListener(UNLOAD_EVENT_NAME, this._beforeunloadHandler); // TODO: binding event here, that will not emit when close tab, not sure why
        // this._window.removeEventListener('unload', this._onAfterUnload);


        this._bindState = false;
      } else if (!this._bindState && this._list.length > 0) {
        this._window.addEventListener(UNLOAD_EVENT_NAME, this._beforeunloadHandler); // TODO: binding event here, that will not emit when close tab, not sure why
        // this._window.addEventListener('unload', this._onAfterUnload);


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
      } // Guarantee the browser unload by removing the returnValue property of the event


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

      this._window.addEventListener('unload', function () {
        if (notNeedCheck || _this2.checkShouldBlock()) {
          cb();
        }
      });
    }
  }, {
    key: "removeAfterUnloadListener",
    value: function removeAfterUnloadListener(cb) {
      console.log('removeAfterUnloadListener~~');

      this._window.removeEventListener('unload', cb);
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
