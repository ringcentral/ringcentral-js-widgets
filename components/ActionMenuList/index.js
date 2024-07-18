"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PreviewButton = exports.MarkButton = exports.DeleteButton = exports.ConfirmDeleteModal = exports.ClickToSmsButton = exports.ClickToDialButton = void 0;
require("regenerator-runtime/runtime");
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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var ConfirmDeleteModal = function ConfirmDeleteModal(_ref) {
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
exports.ConfirmDeleteModal = ConfirmDeleteModal;
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
var ClickToDialButton = function ClickToDialButton(_ref2) {
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
exports.ClickToDialButton = ClickToDialButton;
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
var ClickToSmsButton = function ClickToSmsButton(_ref3) {
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
exports.ClickToSmsButton = ClickToSmsButton;
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
var DeleteButton = function DeleteButton(_ref4) {
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
exports.DeleteButton = DeleteButton;
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
var MarkButton = function MarkButton(_ref5) {
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
exports.MarkButton = MarkButton;
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
var PreviewButton = function PreviewButton(_ref6) {
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
exports.PreviewButton = PreviewButton;
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
  _inherits(ActionMenuList, _Component);
  var _super = _createSuper(ActionMenuList);
  function ActionMenuList(props) {
    var _this;
    _classCallCheck(this, ActionMenuList);
    _this = _super.call(this, props);
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
    _this.onMark = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var _this$props3, marked, onUnmark, onMark, onClick;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this.state.marking) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              _this.setState({
                marking: true
              });
              // @ts-expect-error TS(2339): Property 'marked' does not exist on type 'Readonly... Remove this comment to see the full error message
              _this$props3 = _this.props, marked = _this$props3.marked, onUnmark = _this$props3.onUnmark, onMark = _this$props3.onMark;
              onClick = marked ? onUnmark : onMark;
              _context.prev = 5;
              _context.next = 8;
              return onClick();
            case 8:
              _context.next = 12;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](5);
            case 12:
              _this.setState({
                marking: false
              });
            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[5, 10]]);
    }));
    return _this;
  }
  _createClass(ActionMenuList, [{
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
        extraButton = _this$props4.extraButton; // @ts-expect-error TS(2339): Property 'deleteModalVisible' does not exist on ty... Remove this comment to see the full error message
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
  return ActionMenuList;
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
var _default = ActionMenuList;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
