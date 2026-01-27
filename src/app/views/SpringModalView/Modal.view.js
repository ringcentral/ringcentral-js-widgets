"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.index-of.js");
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
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpringModalView = void 0;
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _ModalView = require("../ModalView");
var _ModalItemView = require("./ModalItemView");
var _excluded = ["modal", "payload"],
  _excluded2 = ["TitleProps", "header", "content", "footer", "ContentProps", "isCompact"],
  _excluded3 = ["ref"],
  _excluded4 = ["open", "id"];
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2;
/* eslint-disable @typescript-eslint/no-explicit-any */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
var SpringModalView = exports.SpringModalView = (_dec = (0, _nextCore.injectable)({
  name: 'SpringModalView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('ModalViewOptions')(target, undefined, 1);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ModalView.ModalView === "undefined" ? Object : _ModalView.ModalView, typeof ModalViewOptions === "undefined" ? Object : ModalViewOptions]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof ModalItemViewProps === "undefined" ? Object : ModalItemViewProps]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function SpringModalView(_modalView, _modalViewOptions) {
    var _this;
    _classCallCheck(this, SpringModalView);
    _this = _callSuper(this, SpringModalView);
    _this._modalView = _modalView;
    _this._modalViewOptions = _modalViewOptions;
    return _this;
  }
  _inherits(SpringModalView, _RcViewModule);
  return _createClass(SpringModalView, [{
    key: "Item",
    value: function Item(_ref) {
      var _ref2, _this$_modalViewOptio, _ContentProps$classNa, _ContentProps$classNa2;
      var modal = _ref.modal,
        payload = _ref.payload,
        props = _objectWithoutProperties(_ref, _excluded);
      var ViewModule = modal.options.view;
      var isComponent = typeof ViewModule === 'function';
      var _useConnector = (0, _nextCore.useConnector)(function () {
          return modal.getPureProps(payload || {});
        }),
        TitleProps = _useConnector.TitleProps,
        headerText = _useConnector.header,
        content = _useConnector.content,
        footer = _useConnector.footer,
        ContentProps = _useConnector.ContentProps,
        modalIsCompact = _useConnector.isCompact,
        modalProps = _objectWithoutProperties(_useConnector, _excluded2);

      // Apply isCompact with priority: modal-specific > global options > false
      var isCompact = (_ref2 = modalIsCompact !== null && modalIsCompact !== void 0 ? modalIsCompact : (_this$_modalViewOptio = this._modalViewOptions) === null || _this$_modalViewOptio === void 0 ? void 0 : _this$_modalViewOptio.isCompact) !== null && _ref2 !== void 0 ? _ref2 : false;
      var _ref3 = TitleProps || {},
        ref = _ref3.ref,
        restTitleProps = _objectWithoutProperties(_ref3, _excluded3);

      // footer
      // content
      var DefaultHeader = (0, _react.useCallback)(function () {
        var _restTitleProps$class;
        return /*#__PURE__*/_react["default"].createElement(_springUi.DialogTitle, _extends({}, restTitleProps, {
          className: isCompact ? "p-0 ".concat((_restTitleProps$class = restTitleProps === null || restTitleProps === void 0 ? void 0 : restTitleProps.className) !== null && _restTitleProps$class !== void 0 ? _restTitleProps$class : '') : restTitleProps.className
        }), headerText);
      }, [headerText, restTitleProps]);
      var _ref4 = (isComponent ? undefined : ViewModule) || {},
        header = _ref4.header;
      var nonHeaderText = headerText === null;
      var nonHeader = nonHeaderText || (isComponent ? undefined : ViewModule === null || ViewModule === void 0 ? void 0 : ViewModule.header) === null;
      var Header = header !== null && header !== void 0 ? header : DefaultHeader;
      var nonFooter = footer === null || (isComponent ? undefined : ViewModule === null || ViewModule === void 0 ? void 0 : ViewModule.footer) === null;
      var footerNode = !nonFooter && !isComponent && (ViewModule === null || ViewModule === void 0 ? void 0 : ViewModule.footer) ? /*#__PURE__*/_react["default"].createElement(ViewModule.footer, null) : null;
      return /*#__PURE__*/_react["default"].createElement(_ModalItemView.ModalItemPanel, _extends({}, props, modalProps, {
        isCompact: isCompact,
        payload: payload,
        headerText: headerText,
        footerText: footer,
        header: nonHeader ? null : nonHeaderText ? undefined : /*#__PURE__*/_react["default"].createElement(Header, null),
        footer: nonFooter ? null : nonFooter ? undefined : footerNode
      }), ViewModule ? isComponent ? /*#__PURE__*/_react["default"].createElement(ViewModule, null) : /*#__PURE__*/_react["default"].createElement(ViewModule.component, null) : /*#__PURE__*/_react["default"].createElement(_springUi.DialogContent, _extends({}, ContentProps, {
        className: isCompact ? "p-0 ".concat((_ContentProps$classNa = ContentProps === null || ContentProps === void 0 ? void 0 : ContentProps.className) !== null && _ContentProps$classNa !== void 0 ? _ContentProps$classNa : '') : (_ContentProps$classNa2 = ContentProps === null || ContentProps === void 0 ? void 0 : ContentProps.className) !== null && _ContentProps$classNa2 !== void 0 ? _ContentProps$classNa2 : ''
      }), content));
    }
  }, {
    key: "component",
    value: function component(inputProps) {
      var _this2 = this;
      var modals = (0, _nextCore.useConnector)(function () {
        return _this2._modalView.modals;
      });
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, modals.map(function (_ref5) {
        var open = _ref5.open,
          id = _ref5.id,
          props = _objectWithoutProperties(_ref5, _excluded4);
        var modal = _this2._modalView['getMap'](id);

        // deprecated props throw error directly
        if (process.env.NODE_ENV !== 'production' && props.size) {
          throw new Error('[ModalPanel] that size props are be deprecated, please use maxWidth');
        }
        return /*#__PURE__*/_react["default"].createElement(_this2.Item, _extends({
          id: id
        }, inputProps, {
          key: id
        }, props, {
          open: open,
          modal: modal
        }));
      }));
    }
  }]);
}(_nextCore.RcViewModule), _applyDecoratedDescriptor(_class2.prototype, "Item", [_nextCore.autobind, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "Item"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Modal.view.js.map
