"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PreviewButton = exports.MarkButton = exports.DeleteButton = exports.ConfirmDeleteModal = exports.ClickToSmsButton = exports.ClickToDialButton = void 0;
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.set-prototype-of.js");
var _extensionTypes = require("@ringcentral-integration/commons/enums/extensionTypes");
var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _DeleteMessageIcon = _interopRequireDefault(require("../../assets/images/DeleteMessageIcon.svg"));
var _Download = _interopRequireDefault(require("../../assets/images/Download.svg"));
var _Mark = _interopRequireDefault(require("../../assets/images/Mark.svg"));
var _Preview = _interopRequireDefault(require("../../assets/images/Preview.svg"));
var _Unmark = _interopRequireDefault(require("../../assets/images/Unmark.svg"));
var _Button = require("../Button");
var _EntityButton = _interopRequireDefault(require("../EntityButton"));
var _EntityModal = _interopRequireDefault(require("../EntityModal"));
var _LogButton = _interopRequireDefault(require("../LogButton"));
var _Modal = _interopRequireDefault(require("../Modal"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var ConfirmDeleteModal = exports.ConfirmDeleteModal = function ConfirmDeleteModal(_ref) {
  var currentLocale = _ref.currentLocale,
    show = _ref.show,
    onDelete = _ref.onDelete,
    onCancel = _ref.onCancel,
    type = _ref.type;
  var tip;
  if (type === _messageTypes["default"].fax) {
    tip = _i18n["default"].getString('sureToDeleteFax', currentLocale);
  } else {
    tip = _i18n["default"].getString('sureToDeleteVoiceMail', currentLocale);
  }
  return /*#__PURE__*/_react["default"].createElement(_Modal["default"]
  // @ts-expect-error TS(2322): Type '{ children: Element; show: any; currentLocal... Remove this comment to see the full error message
  , {
    show: show,
    currentLocale: currentLocale,
    onConfirm: onDelete,
    onCancel: onCancel
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].contentText
  }, tip));
};
ConfirmDeleteModal.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  show: _propTypes["default"].bool.isRequired,
  onDelete: _propTypes["default"].func,
  onCancel: _propTypes["default"].func,
  type: _propTypes["default"].string
};
ConfirmDeleteModal.defaultProps = {
  onDelete: function onDelete() {},
  onCancel: function onCancel() {},
  type: undefined
};
var ClickToDialButton = exports.ClickToDialButton = function ClickToDialButton(_ref2) {
  var className = _ref2.className,
    onClickToDial = _ref2.onClickToDial,
    disableCallButton = _ref2.disableCallButton,
    disableClickToDial = _ref2.disableClickToDial,
    phoneNumber = _ref2.phoneNumber,
    title = _ref2.title;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _clsx["default"])(_styles["default"].button, _styles["default"].clickToDialButton, className),
    onClick: onClickToDial,
    dataSign: title,
    disabled: disableCallButton || disableClickToDial || !phoneNumber
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _DynamicsFont["default"].call,
    title: title
  }));
};
ClickToDialButton.propTypes = {
  className: _propTypes["default"].string,
  onClickToDial: _propTypes["default"].func,
  disableCallButton: _propTypes["default"].bool,
  disableClickToDial: _propTypes["default"].bool,
  phoneNumber: _propTypes["default"].string,
  title: _propTypes["default"].string
};
ClickToDialButton.defaultProps = {
  className: undefined,
  onClickToDial: undefined,
  disableCallButton: false,
  disableClickToDial: false,
  phoneNumber: undefined,
  title: undefined
};
var ClickToSmsButton = exports.ClickToSmsButton = function ClickToSmsButton(_ref3) {
  var className = _ref3.className,
    onClickToSms = _ref3.onClickToSms,
    disableLinks = _ref3.disableLinks,
    phoneNumber = _ref3.phoneNumber,
    title = _ref3.title;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _clsx["default"])(_styles["default"].button, _styles["default"].clickToSmsButton, className),
    onClick: onClickToSms,
    dataSign: "clickToSms",
    disabled: disableLinks || !phoneNumber
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _DynamicsFont["default"].composeText,
    title: title
  }));
};
ClickToSmsButton.propTypes = {
  className: _propTypes["default"].string,
  onClickToSms: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool,
  phoneNumber: _propTypes["default"].string,
  title: _propTypes["default"].string
};
ClickToSmsButton.defaultProps = {
  className: undefined,
  onClickToSms: undefined,
  disableLinks: false,
  phoneNumber: undefined,
  title: undefined
};
var DeleteButton = exports.DeleteButton = function DeleteButton(_ref4) {
  var className = _ref4.className,
    title = _ref4.title,
    openDeleteModal = _ref4.openDeleteModal,
    disabled = _ref4.disabled;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _clsx["default"])(_styles["default"].button, _styles["default"].svgBtn, className),
    onClick: openDeleteModal,
    disabled: disabled,
    dataSign: title
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: title
  }, /*#__PURE__*/_react["default"].createElement(_DeleteMessageIcon["default"], {
    width: 14,
    height: 17,
    className: (0, _clsx["default"])(_styles["default"].svgFillIcon, disabled ? _styles["default"].disabled : null)
  })));
};
DeleteButton.propTypes = {
  className: _propTypes["default"].string,
  title: _propTypes["default"].string,
  openDeleteModal: _propTypes["default"].func,
  disabled: _propTypes["default"].bool.isRequired
};
DeleteButton.defaultProps = {
  className: undefined,
  title: undefined,
  openDeleteModal: function openDeleteModal() {}
};
var MarkButton = exports.MarkButton = function MarkButton(_ref5) {
  var marked = _ref5.marked,
    className = _ref5.className,
    onClick = _ref5.onClick,
    markTitle = _ref5.markTitle,
    unmarkTitle = _ref5.unmarkTitle,
    disabled = _ref5.disabled;
  var Icon = marked ? _Unmark["default"] : _Mark["default"];
  var title = marked ? unmarkTitle : markTitle;
  var classNames = (0, _clsx["default"])(_styles["default"].unmarked, marked ? _styles["default"].svgFillIcon : null, disabled ? _styles["default"].disabled : null);
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _clsx["default"])(_styles["default"].button, _styles["default"].svgBtn, className),
    onClick: onClick,
    disabled: disabled,
    dataSign: "mark"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: title
  }, /*#__PURE__*/_react["default"].createElement(Icon, {
    width: 14,
    height: 17,
    title: title,
    className: classNames
  })));
};
MarkButton.propTypes = {
  className: _propTypes["default"].string,
  markTitle: _propTypes["default"].string,
  unmarkTitle: _propTypes["default"].string,
  onClick: _propTypes["default"].func.isRequired,
  marked: _propTypes["default"].bool.isRequired,
  disabled: _propTypes["default"].bool.isRequired
};
MarkButton.defaultProps = {
  className: undefined,
  markTitle: undefined,
  unmarkTitle: undefined
};
var PreviewButton = exports.PreviewButton = function PreviewButton(_ref6) {
  var title = _ref6.title,
    onClick = _ref6.onClick,
    disabled = _ref6.disabled,
    className = _ref6.className;
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: (0, _clsx["default"])(_styles["default"].button, _styles["default"].svgBtn, className),
    onClick: onClick,
    disabled: disabled,
    dataSign: title
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: title
  }, /*#__PURE__*/_react["default"].createElement(_Preview["default"], {
    className: (0, _clsx["default"])(_styles["default"].svgFillIcon, disabled ? _styles["default"].disabled : null)
  })));
};
PreviewButton.propTypes = {
  title: _propTypes["default"].string.isRequired,
  onClick: _propTypes["default"].func.isRequired,
  disabled: _propTypes["default"].bool.isRequired,
  className: _propTypes["default"].string
};
PreviewButton.defaultProps = {
  className: undefined
};
var ActionMenuList = /*#__PURE__*/function (_Component) {
  function ActionMenuList(props) {
    var _this;
    _classCallCheck(this, ActionMenuList);
    _this = _callSuper(this, ActionMenuList, [props]);
    _this.onMark = void 0;
    _this.onCreateEnityModal = function (entityType) {
      // @ts-expect-error TS(2339): Property 'onCreateEntity' does not exist on type '... Remove this comment to see the full error message
      _this.props.onCreateEntity(entityType);
      _this.closeEntityModal();
    };
    _this.onCancelEntityModal = function () {
      _this.closeEntityModal();
    };
    _this.openEntityModal = function () {
      _this.setState({
        entityModalVisible: true
      });
    };
    _this.closeEntityModal = function () {
      _this.setState({
        entityModalVisible: false
      });
    };
    _this.onDelete = function () {
      // @ts-expect-error TS(2339): Property 'onDelete' does not exist on type 'Readon... Remove this comment to see the full error message
      _this.props.onDelete();
      _this.setState({
        disableDelete: true
      });
      _this.onCloseDeleteModal();
    };
    _this.openDeleteModal = function () {
      _this.setState({
        deleteModalVisible: true
      });
    };
    _this.onCloseDeleteModal = function () {
      _this.setState({
        deleteModalVisible: false
      });
    };
    _this.onCancelDelete = function () {
      _this.onCloseDeleteModal();
    };
    _this.preventEventPropagating = function (e) {
      if (e.target !== e.currentTarget) {
        e.stopPropagation();
      }
    };
    _this.onPreview = function () {
      // @ts-expect-error TS(2339): Property 'faxAttachment' does not exist on type 'R... Remove this comment to see the full error message
      if (_this.props.faxAttachment && _this.props.faxAttachment.uri) {
        // @ts-expect-error TS(2339): Property 'onPreview' does not exist on type 'Reado... Remove this comment to see the full error message
        _this.props.onPreview(_this.props.faxAttachment.uri);
      }
    };
    _this._onDownloadClick = function (e) {
      // @ts-expect-error TS(2339): Property 'faxAttachment' does not exist on type 'R... Remove this comment to see the full error message
      var _this$props = _this.props,
        faxAttachment = _this$props.faxAttachment,
        onFaxDownload = _this$props.onFaxDownload,
        disableLinks = _this$props.disableLinks;
      if (disableLinks) {
        e.preventDefault();
      }
      if (onFaxDownload) {
        e.preventDefault();
        onFaxDownload({
          uri: faxAttachment.uri
        });
      }
    };
    _this.getEntityButton = function () {
      var _this$props2 = _this.props,
        hasEntity = _this$props2.hasEntity,
        phoneNumber = _this$props2.phoneNumber,
        disableLinks = _this$props2.disableLinks,
        onViewEntity = _this$props2.onViewEntity,
        onCreateEntity = _this$props2.onCreateEntity,
        createEntityTitle = _this$props2.createEntityTitle,
        viewEntityTitle = _this$props2.viewEntityTitle,
        externalViewEntity = _this$props2.externalViewEntity,
        externalHasEntity = _this$props2.externalHasEntity,
        showChooseEntityModal = _this$props2.showChooseEntityModal,
        shouldHideEntityButton = _this$props2.shouldHideEntityButton,
        selectedMatchContactType = _this$props2.selectedMatchContactType;
      if (shouldHideEntityButton === null || shouldHideEntityButton === void 0 ? void 0 : shouldHideEntityButton()) {
        return null;
      }
      if (externalViewEntity) {
        if (externalHasEntity) {
          return /*#__PURE__*/_react["default"].createElement(_EntityButton["default"], {
            className: _styles["default"].button,
            onViewEntity: externalViewEntity,
            hasEntity: externalHasEntity,
            disableLinks: disableLinks,
            viewEntityTitle: viewEntityTitle
          });
        }
        if (phoneNumber && onCreateEntity) {
          return /*#__PURE__*/_react["default"].createElement(_EntityButton["default"], {
            className: _styles["default"].button,
            onCreateEntity: showChooseEntityModal ? _this.openEntityModal : function () {
              return onCreateEntity();
            },
            hasEntity: externalHasEntity,
            disableLinks: disableLinks,
            createEntityTitle: createEntityTitle
          });
        }
        return null;
      }
      var isIvrContact = selectedMatchContactType === _extensionTypes.extensionTypes.ivrMenu;
      if (hasEntity && onViewEntity && !isIvrContact) {
        return /*#__PURE__*/_react["default"].createElement(_EntityButton["default"], {
          className: _styles["default"].button,
          onViewEntity: onViewEntity,
          hasEntity: hasEntity,
          disableLinks: disableLinks,
          viewEntityTitle: viewEntityTitle
        });
      }
      if (!hasEntity && phoneNumber && onCreateEntity) {
        return /*#__PURE__*/_react["default"].createElement(_EntityButton["default"], {
          className: _styles["default"].button,
          onCreateEntity: showChooseEntityModal ? _this.openEntityModal : function () {
            return onCreateEntity();
          },
          hasEntity: hasEntity,
          disableLinks: disableLinks,
          createEntityTitle: createEntityTitle
        });
      }
      return null;
    };
    _this.state = {
      entityModalVisible: false,
      deleteModalVisible: false,
      disableDelete: false,
      marking: false
    };
    _this.onMark = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _this$props3, marked, onUnmark, onMark, onClick, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (!_this.state.marking) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            _this.setState({
              marking: true
            });
            // @ts-expect-error TS(2339): Property 'marked' does not exist on type 'Readonly... Remove this comment to see the full error message
            _this$props3 = _this.props, marked = _this$props3.marked, onUnmark = _this$props3.onUnmark, onMark = _this$props3.onMark;
            onClick = marked ? onUnmark : onMark;
            _context.p = 2;
            _context.n = 3;
            return onClick();
          case 3:
            _context.n = 5;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
          case 5:
            _this.setState({
              marking: false
            });
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[2, 4]]);
    }));
    return _this;
  }
  _inherits(ActionMenuList, _Component);
  return _createClass(ActionMenuList, [{
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
        className = _this$props4.className,
        type = _this$props4.type,
        currentLocale = _this$props4.currentLocale,
        onLog = _this$props4.onLog,
        isLogged = _this$props4.isLogged,
        isLogging = _this$props4.isLogging,
        createEntityTypes = _this$props4.createEntityTypes,
        hasEntity = _this$props4.hasEntity,
        onClickToDial = _this$props4.onClickToDial,
        onClickToSms = _this$props4.onClickToSms,
        phoneNumber = _this$props4.phoneNumber,
        disableLinks = _this$props4.disableLinks,
        disableCallButton = _this$props4.disableCallButton,
        disableClickToDial = _this$props4.disableClickToDial,
        addLogTitle = _this$props4.addLogTitle,
        editLogTitle = _this$props4.editLogTitle,
        callTitle = _this$props4.callTitle,
        textTitle = _this$props4.textTitle,
        onDelete = _this$props4.onDelete,
        deleteTitle = _this$props4.deleteTitle,
        onMark = _this$props4.onMark,
        marked = _this$props4.marked,
        markTitle = _this$props4.markTitle,
        unmarkTitle = _this$props4.unmarkTitle,
        previewTitle = _this$props4.previewTitle,
        downloadTitle = _this$props4.downloadTitle,
        onPreview = _this$props4.onPreview,
        faxAttachment = _this$props4.faxAttachment,
        disableClickToSms = _this$props4.disableClickToSms,
        externalHasEntity = _this$props4.externalHasEntity,
        externalViewEntity = _this$props4.externalViewEntity,
        extraButton = _this$props4.extraButton;

      // @ts-expect-error TS(2339): Property 'deleteModalVisible' does not exist on ty... Remove this comment to see the full error message
      var _this$state = this.state,
        deleteModalVisible = _this$state.deleteModalVisible,
        disableDelete = _this$state.disableDelete,
        entityModalVisible = _this$state.entityModalVisible;
      var logButton = onLog ? /*#__PURE__*/_react["default"].createElement(_LogButton["default"], {
        className: _styles["default"].button,
        onLog: onLog,
        disableLinks: disableLinks,
        isLogged: isLogged,
        isLogging: isLogging
        // @ts-expect-error TS(2322): Type '{ className: string; onLog: any; disableLink... Remove this comment to see the full error message
        ,
        currentLocale: currentLocale,
        addTitle: addLogTitle,
        editTitle: editLogTitle
      }) : null;
      var entityButton = this.getEntityButton();
      var isMatched = externalViewEntity ? externalHasEntity : hasEntity;
      var entityModal = !isMatched && phoneNumber ? /*#__PURE__*/_react["default"].createElement(_EntityModal["default"], {
        currentLocale: currentLocale,
        entities: createEntityTypes,
        show: entityModalVisible,
        onCreate: this.onCreateEnityModal,
        onCancel: this.onCancelEntityModal
      }) : null;
      var clickToDialButton = onClickToDial ? /*#__PURE__*/_react["default"].createElement(ClickToDialButton, {
        onClickToDial: onClickToDial,
        phoneNumber: phoneNumber
        // @ts-expect-error TS(2322): Type '{ onClickToDial: any; phoneNumber: any; disa... Remove this comment to see the full error message
        ,
        disableLinks: disableLinks,
        disableCallButton: disableLinks || disableCallButton,
        disableClickToDial: disableClickToDial,
        currentLocale: currentLocale,
        title: callTitle
      }) : null;
      var clickToSmsButton = onClickToSms ? /*#__PURE__*/_react["default"].createElement(ClickToSmsButton, {
        onClickToSms: onClickToSms,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks || disableClickToSms
        // @ts-expect-error TS(2322): Type '{ onClickToSms: any; phoneNumber: any; disab... Remove this comment to see the full error message
        ,
        currentLocale: currentLocale,
        title: textTitle
      }) : null;
      var deleteButton = onDelete ? /*#__PURE__*/_react["default"].createElement(DeleteButton
      // @ts-expect-error TS(2322): Type '{ onDelete: any; currentLocale: any; title: ... Remove this comment to see the full error message
      , {
        onDelete: onDelete,
        currentLocale: currentLocale,
        title: deleteTitle,
        openDeleteModal: this.openDeleteModal,
        disabled: disableDelete || disableLinks
      }) : null;
      var confirmDeleteModal = onDelete ? /*#__PURE__*/_react["default"].createElement(ConfirmDeleteModal, {
        currentLocale: currentLocale,
        show: deleteModalVisible,
        onDelete: this.onDelete,
        onCancel: this.onCancelDelete,
        type: type
      }) : null;
      var markButton = onMark ? /*#__PURE__*/_react["default"].createElement(MarkButton, {
        markTitle: markTitle,
        unmarkTitle: unmarkTitle,
        marked: marked,
        onClick: this.onMark,
        disabled: disableLinks
      }) : null;
      var previewButton = onPreview && faxAttachment && faxAttachment.uri ? /*#__PURE__*/_react["default"].createElement(PreviewButton, {
        title: previewTitle,
        onClick: this.onPreview,
        disabled: disableLinks
      }) : null;
      var downloadButton = faxAttachment && faxAttachment.uri ? /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "download",
        className: (0, _clsx["default"])(_styles["default"].button, _styles["default"].svgBtn, _styles["default"].svgFillIcon, disableLinks ? _styles["default"].disabled : null)
      }, /*#__PURE__*/_react["default"].createElement("a", {
        target: "_blank",
        download: true,
        title: downloadTitle,
        href: "".concat(faxAttachment.uri, "&contentDisposition=Attachment"),
        onClick: this._onDownloadClick
        // @ts-expect-error TS(2322): Type '{ children: Element; target: "_blank"; downl... Remove this comment to see the full error message
        ,
        disabled: disableLinks,
        rel: "noreferrer"
      }, /*#__PURE__*/_react["default"].createElement(_Download["default"], {
        width: 18,
        height: 18
      }))) : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className),
        onClick: this.preventEventPropagating
      }, clickToDialButton, clickToSmsButton, previewButton, downloadButton, entityButton, logButton, markButton, deleteButton, entityModal, confirmDeleteModal, extraButton);
    }
  }]);
}(_react.Component); // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ActionMenuList.propTypes = {
  className: _propTypes["default"].string,
  type: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  onLog: _propTypes["default"].func,
  isLogged: _propTypes["default"].bool,
  isLogging: _propTypes["default"].bool,
  onViewEntity: _propTypes["default"].func,
  onCreateEntity: _propTypes["default"].func,
  createEntityTypes: _propTypes["default"].array,
  hasEntity: _propTypes["default"].bool,
  onClickToDial: _propTypes["default"].func,
  onClickToSms: _propTypes["default"].func,
  phoneNumber: _propTypes["default"].string,
  disableLinks: _propTypes["default"].bool,
  disableCallButton: _propTypes["default"].bool,
  disableClickToDial: _propTypes["default"].bool,
  addLogTitle: _propTypes["default"].string,
  editLogTitle: _propTypes["default"].string,
  textTitle: _propTypes["default"].string,
  callTitle: _propTypes["default"].string,
  createEntityTitle: _propTypes["default"].string,
  viewEntityTitle: _propTypes["default"].string,
  onDelete: _propTypes["default"].func,
  deleteTitle: _propTypes["default"].string,
  onMark: _propTypes["default"].func,
  onUnmark: _propTypes["default"].func,
  marked: _propTypes["default"].bool,
  markTitle: _propTypes["default"].string,
  unmarkTitle: _propTypes["default"].string,
  previewTitle: _propTypes["default"].string,
  downloadTitle: _propTypes["default"].string,
  onPreview: _propTypes["default"].func,
  faxAttachment: _propTypes["default"].shape({
    uri: _propTypes["default"].string
  }),
  externalViewEntity: _propTypes["default"].func,
  externalHasEntity: _propTypes["default"].bool,
  disableClickToSms: _propTypes["default"].bool,
  onFaxDownload: _propTypes["default"].func,
  selectedMatchContactType: _propTypes["default"].string,
  showChooseEntityModal: _propTypes["default"].bool,
  shouldHideEntityButton: _propTypes["default"].func,
  extraButton: _propTypes["default"].element
};
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ActionMenuList.defaultProps = {
  className: undefined,
  type: undefined,
  onLog: undefined,
  isLogged: false,
  isLogging: false,
  onViewEntity: undefined,
  onCreateEntity: undefined,
  createEntityTypes: undefined,
  hasEntity: false,
  onClickToDial: undefined,
  onClickToSms: undefined,
  phoneNumber: undefined,
  disableLinks: false,
  disableCallButton: false,
  disableClickToDial: false,
  addLogTitle: undefined,
  editLogTitle: undefined,
  textTitle: undefined,
  callTitle: undefined,
  createEntityTitle: undefined,
  viewEntityTitle: undefined,
  deleteTitle: undefined,
  onDelete: undefined,
  onMark: undefined,
  onUnmark: undefined,
  marked: false,
  markTitle: undefined,
  unmarkTitle: undefined,
  previewTitle: undefined,
  downloadTitle: undefined,
  onPreview: undefined,
  faxAttachment: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  disableClickToSms: false,
  onFaxDownload: undefined,
  selectedMatchContactType: '',
  showChooseEntityModal: true,
  shouldHideEntityButton: function shouldHideEntityButton() {
    return false;
  },
  extraButton: undefined
};
var _default = exports["default"] = ActionMenuList;
//# sourceMappingURL=index.js.map
