"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FaxSendPanel = void 0;
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _components2 = require("@ringcentral-integration/next-widgets/components");
var _FileAttacher = require("@ringcentral-integration/next-widgets/components/MessageInput/FileAttacher");
var _utils = require("@ringcentral-integration/utils");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _uuid = require("uuid");
var _getMimeType = require("../../../services/Fax/utils/getMimeType");
var _FaxCoverPageSelect = require("./FaxCoverPageSelect");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var FaxSendPanel = exports.FaxSendPanel = function FaxSendPanel(_ref) {
  var _faxInfo$coverNotes;
  var acceptFileTypes = _ref.acceptFileTypes,
    faxInfo = _ref.faxInfo,
    covers = _ref.covers,
    canSendNow = _ref.canSendNow,
    maxAllowedAttachmentSize = _ref.maxAllowedAttachmentSize,
    showCoverTextInput = _ref.showCoverTextInput,
    typingToNumber = _ref.typingToNumber,
    senderNumber = _ref.senderNumber,
    senderNumbers = _ref.senderNumbers,
    maxRecipients = _ref.maxRecipients,
    currentFilesSize = _ref.currentFilesSize,
    updateSenderNumber = _ref.updateSenderNumber,
    cleanTypingToNumber = _ref.cleanTypingToNumber,
    addToNumbers = _ref.addToNumbers,
    removeToNumber = _ref.removeToNumber,
    updateTypingToNumber = _ref.updateTypingToNumber,
    onCoverTextChange = _ref.onCoverTextChange,
    onCoverIndexChange = _ref.onCoverIndexChange,
    onUploadFiles = _ref.onUploadFiles,
    onRemoveFile = _ref.onRemoveFile,
    onSendNow = _ref.onSendNow,
    onCancel = _ref.onCancel,
    formatPhone = _ref.formatPhone,
    showSpinner = _ref.showSpinner,
    ToContactSearch = _ref.ContactSearch;
  var _useState = (0, _react.useState)(false),
    _useState2 = _slicedToArray(_useState, 2),
    contactSearchExpanded = _useState2[0],
    setContactSearchExpanded = _useState2[1];
  var maxLength = 1024;
  var addToRecipients = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(receiver) {
      var isAdded;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return addToNumbers(receiver);
          case 1:
            isAdded = _context.v;
            if (isAdded) {
              cleanTypingToNumber();
            }
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function addToRecipients(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var removeFromRecipients = function removeFromRecipients(phoneNumber) {
    removeToNumber({
      phoneNumber: phoneNumber
    });
  };
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var fileSize = (0, _FileAttacher.useFileSize)(currentFilesSize);
  var title = t('createNewFax');
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
    override: true
  }, /*#__PURE__*/_react["default"].createElement(_components2.PageHeader, {
    onBackClick: onCancel
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "sui-text sui-text-root truncate",
    title: title
  }, title))), /*#__PURE__*/_react["default"].createElement(_components2.SpringSpinnerOverlay, {
    loading: !!showSpinner
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-col w-full h-full px-4 gap-4 overflow-auto"
  }, /*#__PURE__*/_react["default"].createElement(_components2.FromField, {
    fromNumber: senderNumber,
    fromPlaceholder: t('from'),
    fromNumbers: senderNumbers,
    onChange: function onChange(value) {
      updateSenderNumber(value);
    },
    hidden: !(senderNumbers.length > 0),
    showAnonymous: false
  }), /*#__PURE__*/_react["default"].createElement(ToContactSearch, {
    filterCallQueueExtension: true,
    excludeCompanyExtension: true,
    defaultTab: "thirdParty",
    source: "fax",
    open: contactSearchExpanded,
    inputValue: typingToNumber,
    toNumbers: faxInfo === null || faxInfo === void 0 ? void 0 : faxInfo.recipients,
    onSelect: addToRecipients,
    maxRecipients: maxRecipients,
    formatPhone: formatPhone,
    onInputValueChange: updateTypingToNumber,
    onRemove: removeFromRecipients,
    placeholder: t('toPlaceholder'),
    onExpanded: setContactSearchExpanded,
    autoFocusInput: false
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex flex-auto flex-col gap-2', contactSearchExpanded && 'hidden')
  }, /*#__PURE__*/_react["default"].createElement(_FaxCoverPageSelect.FaxCoverPageSelect, {
    selectedCoverId: faxInfo === null || faxInfo === void 0 ? void 0 : faxInfo.coverIndex,
    covers: covers,
    label: t('coverPage'),
    onSelectChange: onCoverIndexChange
  }), showCoverTextInput ? /*#__PURE__*/_react["default"].createElement(_springUi.Textarea, {
    fullWidth: true,
    minRows: 4,
    clearBtn: !!(faxInfo === null || faxInfo === void 0 ? void 0 : (_faxInfo$coverNotes = faxInfo.coverNotes) === null || _faxInfo$coverNotes === void 0 ? void 0 : _faxInfo$coverNotes.length),
    value: faxInfo === null || faxInfo === void 0 ? void 0 : faxInfo.coverNotes,
    label: t('coverPageNote'),
    onChange: function onChange(_ref3) {
      var value = _ref3.target.value;
      onCoverTextChange === null || onCoverTextChange === void 0 ? void 0 : onCoverTextChange(value === null || value === void 0 ? void 0 : value.substring(0, maxLength));
    },
    inputProps: {
      maxLength: maxLength,
      'data-sign': 'fax-cover-page-note'
    }
  }) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('flex items-center gap-2')
  }, /*#__PURE__*/_react["default"].createElement(_FileAttacher.AttachButton, {
    multiple: true,
    type: "button",
    size: "medium",
    startIcon: /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      symbol: _springIcon.LinkMd
    }),
    acceptTypes: acceptFileTypes,
    label: t('attach'),
    title: t('attachFiles'),
    onUpload: (/*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(data) {
        var files;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!(data === null || data === void 0 ? void 0 : data.length)) {
                _context3.n = 2;
                break;
              }
              _context3.n = 1;
              return Promise.all(data.map(/*#__PURE__*/function () {
                var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(file) {
                  var id, formattedType, name, size, newFile, base64Url;
                  return _regenerator().w(function (_context2) {
                    while (1) switch (_context2.n) {
                      case 0:
                        id = "fax-attachment-".concat((0, _uuid.v4)());
                        formattedType = (0, _getMimeType.getMimeTypeByFile)(file);
                        name = file.name, size = file.size;
                        newFile = new File([file], file.name, {
                          type: formattedType
                        });
                        _context2.n = 1;
                        return (0, _utils.fileToBase64)(file);
                      case 1:
                        base64Url = _context2.v;
                        return _context2.a(2, {
                          id: id,
                          name: name,
                          size: size,
                          file: newFile,
                          type: formattedType,
                          base64Url: base64Url
                        });
                    }
                  }, _callee2);
                }));
                return function (_x3) {
                  return _ref5.apply(this, arguments);
                };
              }()));
            case 1:
              files = _context3.v;
              onUploadFiles === null || onUploadFiles === void 0 ? void 0 : onUploadFiles(files);
            case 2:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      return function (_x2) {
        return _ref4.apply(this, arguments);
      };
    }())
  }), /*#__PURE__*/_react["default"].createElement(_springUi.Text, {
    className: "text-xs text-neutral-b2",
    "data-sign": "attachments-summary"
  }, t('attachmentDescription', {
    maxAllowedSize: maxAllowedAttachmentSize
  }), currentFilesSize && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", null, ' - '), /*#__PURE__*/_react["default"].createElement("span", {
    className: "text-primary-b"
  }, fileSize)))), faxInfo.attachments.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])('mt-4 max-h-[125px] overflow-y-auto overflow-x-hidden')
  }, /*#__PURE__*/_react["default"].createElement(_FileAttacher.AttachmentList, {
    files: faxInfo.attachments,
    onRemoveAttachment: function onRemoveAttachment(_ref6) {
      var id = _ref6.id;
      onRemoveFile === null || onRemoveFile === void 0 ? void 0 : onRemoveFile(id);
    },
    "data-sign": "faxAttachmentsList"
  })))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_springUi.Divider, null), /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-4 py-2 flex justify-between items-center"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "text",
    size: "large",
    onClick: onCancel
  }, t('cancel')), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
    variant: "contained",
    size: "large",
    disabled: !canSendNow,
    onClick: onSendNow
  }, t('sendNow'))))), /*#__PURE__*/_react["default"].createElement(_components.AppFooterNav, null));
};
//# sourceMappingURL=FaxSendPanel.js.map
