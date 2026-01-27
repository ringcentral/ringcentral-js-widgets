"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gapHeight = exports.GalleryView = void 0;
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
var _nextCore = require("@ringcentral-integration/next-core");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _utils = require("@ringcentral-integration/utils");
var _Avatar = require("@ringcentral/juno/es6/components/Avatar/Avatar.js");
var _IconButton = require("@ringcentral/juno/es6/components/Buttons/IconButton/IconButton.js");
var _IconButtonGroup = require("@ringcentral/juno/es6/components/Buttons/IconButtonGroup/IconButtonGroup.js");
var _Slide = require("@ringcentral/juno/es6/components/Transitions/Slide/Slide.js");
var _Text = require("@ringcentral/juno/es6/components/Text/Text.js");
var _ZoomFrom = require("@ringcentral/juno/es6/components/Transitions/ZoomFrom/ZoomFrom.js");
var _Close = _interopRequireDefault(require("@ringcentral/juno-icon/es6/Close.js"));
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _DownloadButton = require("../../components/DownloadButton");
var _TextMiddleEllipsis = require("../../components/TextMiddleEllipsis");
var _ModalView = require("../ModalView");
var _styles = require("./styles");
var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor;
var _excluded = ["$draggable", "nodeRef"];
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var gapHeight = exports.gapHeight = 40;
var Img = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var $draggable = _ref.$draggable,
    nodeRef = _ref.nodeRef,
    props = _objectWithoutProperties(_ref, _excluded);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/alt-text
    _react["default"].createElement("img", _extends({
      "data-sign": "gallery-image"
    }, props, {
      ref: ref,
      className: (0, _clsx["default"])($draggable ? 'cursor-move' : 'cursor-default', 'shadow-lg select-none max-w-full max-h-[calc(100vh-104px)] object-contain'),
      width: 600,
      height: 400
    }))
  );
});
var ContentProps = {
  style: {
    overflow: 'hidden'
  }
};
var TransitionProps = {
  timeout: 450
};
var BackdropProps = {
  style: {
    opacity: 0
  }
};
var minScaleRate = 0.1;
var maxScaleRate = 20;
var GalleryView = exports.GalleryView = (_dec = (0, _nextCore.injectable)({
  name: 'GalleryView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('GalleryViewOptions')(target, undefined, 1);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ModalView.ModalView === "undefined" ? Object : _ModalView.ModalView, typeof GalleryViewOptions === "undefined" ? Object : GalleryViewOptions]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function GalleryView(_modalView, _galleryViewOptions) {
    var _this;
    _classCallCheck(this, GalleryView);
    _this = _callSuper(this, GalleryView);
    _this._modalView = _modalView;
    _this._galleryViewOptions = _galleryViewOptions;
    _this.sourceElement = null;
    _initializerDefineProperty(_this, "_gallery", _descriptor, _this);
    _this.header = function () {
      var _useModalItemView = (0, _ModalView.useModalItemView)(),
        props = _useModalItemView.props,
        action = _useModalItemView.action;
      var open = props.open,
        payload = props.payload;
      var _ref2 = payload || {},
        info = _ref2.info;
      var _ref3 = info || {},
        downloadUrl = _ref3.downloadUrl,
        subject = _ref3.subject,
        description = _ref3.description,
        AvatarProps = _ref3.AvatarProps,
        primary = _ref3.primary,
        secondary = _ref3.secondary;
      return /*#__PURE__*/_react["default"].createElement(_Slide.RcSlide, {
        "in": open
      }, /*#__PURE__*/_react["default"].createElement("header", {
        className: "bg-neutral-b4 flex items-center p-6 border-b border-neutral-b3 h-16"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex w-1/4 items-center justify-start pr-2 gap-2"
      }, /*#__PURE__*/_react["default"].createElement(_Avatar.ExportType, _extends({
        size: "xsmall"
      }, AvatarProps)), /*#__PURE__*/_react["default"].createElement("div", null, primary && /*#__PURE__*/_react["default"].createElement(_Text.RcText, {
        color: "neutral.f06"
      }, primary), secondary && /*#__PURE__*/_react["default"].createElement(_Text.RcText, {
        color: "neutral.f04",
        variant: "caption1"
      }, secondary))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex w-1/2 items-center justify-center gap-2"
      }, subject && /*#__PURE__*/_react["default"].createElement(_Text.RcText, {
        color: "neutral.f06"
      }, /*#__PURE__*/_react["default"].createElement(_TextMiddleEllipsis.TextMiddleEllipsis, null, subject)), description && /*#__PURE__*/_react["default"].createElement(_Text.RcText, {
        color: "neutral.f04"
      }, description)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "flex w-1/4 items-center justify-end"
      }, /*#__PURE__*/_react["default"].createElement(_IconButtonGroup.RcIconButtonGroup, {
        className: "-mr-2"
      }, downloadUrl && /*#__PURE__*/_react["default"].createElement(_DownloadButton.DownloadButton, {
        size: "medium",
        "data-sign": "gallery-download",
        url: downloadUrl,
        variant: "round",
        name: subject
      }), /*#__PURE__*/_react["default"].createElement(_IconButton.RcIconButton, {
        "data-sign": "gallery-close",
        symbol: _Close["default"],
        onClick: function onClick() {
          return action === null || action === void 0 ? void 0 : action.close();
        }
      })))));
    };
    _this.footer = null;
    return _this;
  }

  /**
   * open image gallery from source element
   */
  _inherits(GalleryView, _RcViewModule);
  return _createClass(GalleryView, [{
    key: "open",
    value: function open(url, _ref4) {
      var alt = _ref4.alt,
        sourceElement = _ref4.sourceElement,
        info = _ref4.info;
      if (sourceElement) {
        this.sourceElement = sourceElement;
      }
      var result = this._modalView.open(this._gallery, {
        url: url,
        alt: alt,
        info: info
      });
      return result;
    }
  }, {
    key: "getHostElement",
    value: function getHostElement() {
      return {
        current: this.sourceElement || null
      };
    }
  }, {
    key: "component",
    value: function component() {
      var _useModalItemView2 = (0, _ModalView.useModalItemView)(),
        props = _useModalItemView2.props,
        action = _useModalItemView2.action;
      var open = props.open,
        payload = props.payload;
      var _ref5 = payload || {},
        url = _ref5.url,
        alt = _ref5.alt;
      var _useState = (0, _react.useState)(false),
        _useState2 = _slicedToArray(_useState, 2),
        draggable = _useState2[0],
        setDraggable = _useState2[1];
      var zoomRef = (0, _react.useRef)(null);
      var imgRef = (0, _react.useRef)(null);
      var containerRef = (0, _react.useRef)(null);
      var zoomActions = (0, _reactHooks.useHammerZoom)(imgRef, {
        container: containerRef,
        min: minScaleRate,
        max: maxScaleRate,
        onScale: function onScale(scale) {
          var _zoomRef$current;
          (_zoomRef$current = zoomRef.current) === null || _zoomRef$current === void 0 ? void 0 : _zoomRef$current.setRate(scale);
        },
        onDragChange: function onDragChange(state) {
          setDraggable(state);
        }
      });
      var elementRef = this.getHostElement();
      var imgContainerRef = (0, _react.useRef)(null);
      var img = /*#__PURE__*/_react["default"].createElement(Img, {
        ref: imgRef,
        $draggable: draggable,
        src: url,
        alt: alt,
        draggable: "false"
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: containerRef,
        "data-sign": "gallery-container",
        className: "bg-neutral-b5 relative flex items-center justify-center overflow-hidden h-full",
        onClick: function onClick() {
          zoomActions.reset();
          action === null || action === void 0 ? void 0 : action.close();
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: imgContainerRef,
        "data-sign": "gallery-image-container",
        onClick: function onClick(e) {
          // when click on container, close modal
          if (e.target === imgContainerRef.current) return;

          // when click on img, stop propagation
          (0, _utils.stopPropagation)(e);
        }
      }, elementRef.current ? /*#__PURE__*/_react["default"].createElement(_ZoomFrom.RcZoomFrom, {
        from: elementRef,
        "in": open,
        timeout: 450
      }, img) : img), /*#__PURE__*/_react["default"].createElement(_styles.ZoomAction, {
        ref: zoomRef,
        min: minScaleRate,
        max: maxScaleRate,
        onZoom: function onZoom(scale) {
          zoomActions === null || zoomActions === void 0 ? void 0 : zoomActions.zoom(scale);
        }
      }));
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "_gallery", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this2 = this;
    return this._modalView.create({
      view: this,
      props: function props() {
        return {
          fullScreen: true,
          ContentProps: ContentProps,
          BackdropProps: BackdropProps,
          disableEscapeKeyDown: false,
          TransitionProps: TransitionProps,
          onExited: function onExited() {
            _this2.sourceElement = null;
          }
        };
      }
    });
  }
}), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=Gallery.view.js.map
