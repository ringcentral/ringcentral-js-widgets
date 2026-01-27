"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockPlugin = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.promise.finally.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _components = require("@ringcentral-integration/next-widgets/components");
var _SpinnerOverlay = require("@ringcentral-integration/next-widgets/components/SpinnerOverlay");
var _Portal = require("@ringcentral/juno/es6/components/Portal/Portal.js");
var _react = _interopRequireDefault(require("react"));
var _rxjs = require("rxjs");
var _uuid = require("uuid");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class, _class2, _descriptor, _descriptor2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var BlockPlugin = exports.BlockPlugin = (_dec = (0, _nextCore.injectable)({
  name: 'BlockPlugin'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('BlockPluginOptions')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof BlockPluginOptions === "undefined" ? Object : BlockPluginOptions]), _dec5 = Reflect.metadata("design:type", Array), _dec6 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec7 = (0, _nextCore.computed)(function (that) {
  return [that.blockIds, that.blockMapping];
}), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", []), _dec0 = (0, _nextCore.computed)(function (that) {
  return [that.blocks];
}), _dec1 = Reflect.metadata("design:type", Function), _dec10 = Reflect.metadata("design:paramtypes", []), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [String, typeof BlockItem === "undefined" ? Object : BlockItem]), _dec13 = (0, _nextCore.delegate)('server'), _dec14 = Reflect.metadata("design:type", Function), _dec15 = Reflect.metadata("design:paramtypes", [String, typeof BlockItem === "undefined" ? Object : BlockItem]), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [String]), _dec18 = (0, _nextCore.delegate)('server'), _dec19 = Reflect.metadata("design:type", Function), _dec20 = Reflect.metadata("design:paramtypes", [String]), _dec21 = Reflect.metadata("design:type", Function), _dec22 = Reflect.metadata("design:paramtypes", []), _dec23 = (0, _nextCore.delegate)('server'), _dec24 = Reflect.metadata("design:type", Function), _dec25 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_PluginModule) {
  function BlockPlugin(_blockPluginOptions) {
    var _this;
    _classCallCheck(this, BlockPlugin);
    _this = _callSuper(this, BlockPlugin);
    _this._blockPluginOptions = _blockPluginOptions;
    _initializerDefineProperty(_this, "blockIds", _descriptor, _this);
    _initializerDefineProperty(_this, "blockMapping", _descriptor2, _this);
    _this.provider = function (_ref) {
      var _this$_blockPluginOpt;
      var children = _ref.children;
      var currentBlock = (0, _nextCore.useConnector)(function () {
        return _this.currentBlock;
      });
      var Component = process.env.THEME_SYSTEM === 'spring-ui' ? _components.SpringSpinnerOverlay : _SpinnerOverlay.SpinnerOverlay;
      var BlockPanel = ((_this$_blockPluginOpt = _this._blockPluginOptions) === null || _this$_blockPluginOpt === void 0 ? void 0 : _this$_blockPluginOpt.component) || Component;
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, children, /*#__PURE__*/_react["default"].createElement(_Portal.RcPortal, null, /*#__PURE__*/_react["default"].createElement(BlockPanel, _extends({}, currentBlock, {
        loading: !!currentBlock,
        keepMounted: false
      }), null)));
    };
    return _this;
  }

  /**
   * block view with `SpinnerOverlay`
   * @param props props for show in `SpinnerOverlay`
   */
  _inherits(BlockPlugin, _PluginModule);
  return _createClass(BlockPlugin, [{
    key: "blocks",
    get: function get() {
      var _this2 = this;
      return this.blockIds.map(function (id) {
        return _this2.blockMapping[id];
      });
    }
  }, {
    key: "currentBlock",
    get: function get() {
      var _blocks$;
      var blocks = this.blocks;
      return (_blocks$ = blocks[0]) !== null && _blocks$ !== void 0 ? _blocks$ : null;
    }
  }, {
    key: "block",
    value: function block() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var id = (0, _uuid.v4)();
      this._setListItem(id, props);
      return id;
    }

    /**
     * that will unblock one of pass id
     * @param id for unblock id
     */
  }, {
    key: "unblock",
    value: function unblock(id) {
      this._removeListItem(id);
    }

    /**
     * Show block and wait for call back method complete that block will auto close
     * @param cb the method you want to wait for complete
     */
  }, {
    key: "next",
    value: (function () {
      var _next2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(cb) {
        var _this3 = this;
        var id, result;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              id = this.block();
              _context.n = 1;
              return cb()["finally"](function () {
                _this3.unblock(id);
              });
            case 1:
              result = _context.v;
              return _context.a(2, result);
          }
        }, _callee, this);
      }));
      function next(_x) {
        return _next2.apply(this, arguments);
      }
      return next;
    }())
  }, {
    key: "next$",
    value: function next$(obs, props) {
      var _this4 = this;
      var id;
      return (0, _rxjs.of)(null).pipe((0, _rxjs.tap)(function () {
        return id = _this4.block(props);
      }), (0, _rxjs.switchMap)(function () {
        return obs;
      }), (0, _rxjs.finalize)(function () {
        return _this4.unblock(id);
      }));
    }

    /**
     * clear all block item, and unblock view
     */
  }, {
    key: "unblockAll",
    value: function unblockAll() {
      this._clearAllItem();
    }
  }, {
    key: "__setListItem",
    value: function __setListItem(id, data) {
      this.blockIds.push(id);
      this.blockMapping[id] = data;
    }
  }, {
    key: "_setListItem",
    value: function () {
      var _setListItem2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id, data) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this.__setListItem(id, data);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function _setListItem(_x2, _x3) {
        return _setListItem2.apply(this, arguments);
      }
      return _setListItem;
    }()
  }, {
    key: "__removeListItem",
    value: function __removeListItem(id) {
      this.blockIds = this.blockIds.filter(function (blockId) {
        return blockId !== id;
      });
      delete this.blockMapping[id];
    }
  }, {
    key: "_removeListItem",
    value: function () {
      var _removeListItem2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(id) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              this.__removeListItem(id);
            case 1:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function _removeListItem(_x4) {
        return _removeListItem2.apply(this, arguments);
      }
      return _removeListItem;
    }()
  }, {
    key: "__clearAllItem",
    value: function __clearAllItem() {
      this.blockIds.length = 0;
      this.blockMapping = {};
    }
  }, {
    key: "_clearAllItem",
    value: function () {
      var _clearAllItem2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this.__clearAllItem();
            case 1:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function _clearAllItem() {
        return _clearAllItem2.apply(this, arguments);
      }
      return _clearAllItem;
    }()
  }]);
}(_nextCore.PluginModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "blockIds", [_nextCore.state, _dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "blockMapping", [_nextCore.state, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "blocks", [_dec7, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "blocks"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentBlock", [_dec0, _dec1, _dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "currentBlock"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "__setListItem", [_nextCore.action, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "__setListItem"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setListItem", [_dec13, _dec14, _dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "_setListItem"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "__removeListItem", [_nextCore.action, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "__removeListItem"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removeListItem", [_dec18, _dec19, _dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "_removeListItem"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "__clearAllItem", [_nextCore.action, _dec21, _dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "__clearAllItem"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clearAllItem", [_dec23, _dec24, _dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "_clearAllItem"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Block.plugin.js.map
