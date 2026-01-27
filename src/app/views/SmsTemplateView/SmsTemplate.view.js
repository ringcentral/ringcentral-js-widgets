"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmsTemplateView = void 0;
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.timers.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _views = require("@ringcentral-integration/micro-core/src/app/views");
var _i18n = _interopRequireDefault(require("@ringcentral-integration/micro-core/src/app/views/ModalView/ModalItemView/ModalItemPanel/i18n"));
var _nextCore = require("@ringcentral-integration/next-core");
var _springUi = require("@ringcentral/spring-ui");
var _copyToClipboard = _interopRequireDefault(require("copy-to-clipboard"));
var _react = _interopRequireDefault(require("react"));
var _services3 = require("../../services");
var _TemplatePopover = require("./TemplatePopover");
var _i18n2 = _interopRequireWildcard(require("./i18n"));
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _class, _class2, _descriptor, _descriptor2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t2 in e) "default" !== _t2 && {}.hasOwnProperty.call(e, _t2) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t2)) && (i.get || i.set) ? o(f, _t2, i) : f[_t2] = e[_t2]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
var SmsTemplateView = exports.SmsTemplateView = (_dec = (0, _nextCore.injectable)({
  name: 'SmsTemplateView'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('SmsTemplateViewOptions')(target, undefined, 3);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _views.ModalView === "undefined" ? Object : _views.ModalView, typeof _services3.SmsTemplate === "undefined" ? Object : _services3.SmsTemplate, typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof SmsTemplateViewOptions === "undefined" ? Object : SmsTemplateViewOptions]), _dec5 = (0, _nextCore.delegate)('server'), _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [String]), _dec8 = (0, _nextCore.delegate)('server'), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [String]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcViewModule) {
  function SmsTemplateView(_modalView, smsTemplate, toast, _smsTemplateViewOptions) {
    var _this;
    _classCallCheck(this, SmsTemplateView);
    _this = _callSuper(this, SmsTemplateView);
    _this._modalView = _modalView;
    _this.smsTemplate = smsTemplate;
    _this.toast = toast;
    _this._smsTemplateViewOptions = _smsTemplateViewOptions;
    _initializerDefineProperty(_this, "deleteConfirmDialog", _descriptor, _this);
    _initializerDefineProperty(_this, "replaceOrAddTemplateDialog", _descriptor2, _this);
    return _this;
  }
  _inherits(SmsTemplateView, _RcViewModule);
  return _createClass(SmsTemplateView, [{
    key: "openDeleteConfirmDialog",
    value: function () {
      var _openDeleteConfirmDialog = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(id) {
        var _this$_modalView$open, closed, success;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _this$_modalView$open = this._modalView.open(this.deleteConfirmDialog, {
                id: id
              }), closed = _this$_modalView$open.closed;
              _context.n = 1;
              return closed;
            case 1:
              success = _context.v;
              return _context.a(2, !!success);
          }
        }, _callee, this);
      }));
      function openDeleteConfirmDialog(_x) {
        return _openDeleteConfirmDialog.apply(this, arguments);
      }
      return openDeleteConfirmDialog;
    }()
  }, {
    key: "openReplaceOrAddTemplateDialog",
    value: function () {
      var _openReplaceOrAddTemplateDialog = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id) {
        var _this$_modalView$open2, closed, result;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _this$_modalView$open2 = this._modalView.open(this.replaceOrAddTemplateDialog, {
                id: id
              }), closed = _this$_modalView$open2.closed;
              _context2.n = 1;
              return closed;
            case 1:
              result = _context2.v;
              return _context2.a(2, result);
          }
        }, _callee2, this);
      }));
      function openReplaceOrAddTemplateDialog(_x2) {
        return _openReplaceOrAddTemplateDialog.apply(this, arguments);
      }
      return openReplaceOrAddTemplateDialog;
    }()
  }, {
    key: "copyTemplate",
    value: function copyTemplate(content) {
      var _this2 = this;
      if (content && (0, _copyToClipboard["default"])(content)) {
        this.smsTemplate.uniqueManager.unique(function () {
          return _this2.toast.success((0, _i18n2.t)('copyTemplateSuccess'));
        });
        return true;
      }
      return false;
    }
  }, {
    key: "getFinalContent",
    value: function getFinalContent(type, textarea, content) {
      var currentValue = textarea.value;
      if (type === 'add') {
        var _textarea$dataset$lat;
        var latestPos = JSON.parse((_textarea$dataset$lat = textarea.dataset.latestPos) !== null && _textarea$dataset$lat !== void 0 ? _textarea$dataset$lat : 'null');
        if (latestPos) {
          var start = latestPos.position.start;
          var end = latestPos.position.end;
          var endContent = currentValue.slice(0, start) + content;
          var newContent = endContent + currentValue.slice(end, currentValue.length);
          return {
            content: newContent,
            position: endContent.length
          };
        }
      }
      return {
        content: content
      };
    }
  }, {
    key: "handleApplyTemplate",
    value: function () {
      var _handleApplyTemplate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(targetInputRef, content) {
        var textarea, currentValue, doesShowConfirm, result, type, info, finalContent, position, truncatedValue, newPosition, setNewPosition, _t;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              textarea = targetInputRef.current;
              if (textarea) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2, false);
            case 1:
              currentValue = textarea.value;
              doesShowConfirm = currentValue.length > 0 && currentValue.trim() !== '';
              if (!doesShowConfirm) {
                _context3.n = 3;
                break;
              }
              _context3.n = 2;
              return this.openReplaceOrAddTemplateDialog(content);
            case 2:
              _t = _context3.v;
              _context3.n = 4;
              break;
            case 3:
              _t = {
                type: 'replace'
              };
            case 4:
              result = _t;
              if (!(!result || _typeof(result) !== 'object')) {
                _context3.n = 5;
                break;
              }
              return _context3.a(2, false);
            case 5:
              type = result.type;
              info = this.getFinalContent(type, textarea, content);
              finalContent = info.content, position = info.position; // Limit to 1000 characters
              truncatedValue = finalContent.slice(0, 1000); // in mui, that is not able to trigger the change event, so we need to dispatch a custom event and listen it in the MessageInput component
              textarea.dispatchEvent(new CustomEvent('change-programmatically', {
                bubbles: false,
                detail: truncatedValue
              }));
              newPosition = position !== null && position !== void 0 ? position : truncatedValue.length;
              setNewPosition = function setNewPosition() {
                var textarea = targetInputRef.current;
                if (!textarea) return;
                (0, _springUi.setSelectionPosition)(textarea, {
                  start: newPosition,
                  end: newPosition,
                  scrollIntoView: true
                });
              };
              if (doesShowConfirm) {
                setTimeout(setNewPosition, 195);
              } else {
                requestAnimationFrame(setNewPosition);
              }
              (0, _services.trackEvent)('Int_Text_useTemplate', {
                templateActions: 'Apply'
              });
              return _context3.a(2, true);
          }
        }, _callee3, this);
      }));
      function handleApplyTemplate(_x3, _x4) {
        return _handleApplyTemplate.apply(this, arguments);
      }
      return handleApplyTemplate;
    }()
  }, {
    key: "component",
    value: function component(_ref) {
      var _this3 = this;
      var targetInputRef = _ref.targetInputRef;
      var _useConnector = (0, _nextCore.useConnector)(function () {
          return {
            templates: _this3.smsTemplate.templates,
            isLoading: _this3.smsTemplate.isLoading
          };
        }),
        templates = _useConnector.templates,
        isLoading = _useConnector.isLoading;
      var handleCopyTemplate = function handleCopyTemplate(content) {
        var result = _this3.copyTemplate(content);
        if (result) {
          (0, _services.trackEvent)('Int_Text_useTemplate', {
            templateActions: 'Copy'
          });
        }
        return result;
      };
      var handleDeleteTemplate = function handleDeleteTemplate(id) {
        return _this3.openDeleteConfirmDialog(id);
      };
      var handleAddTemplate = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(title, content) {
          var result;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                _context4.n = 1;
                return _this3.smsTemplate.createTemplate({
                  title: title,
                  content: content
                });
              case 1:
                result = _context4.v;
                // the result also have the error message, so we need to check if it is true
                if (result === true) {
                  (0, _services.trackEvent)('Int_Text_useTemplate', {
                    templateActions: 'Add'
                  });
                }
                return _context4.a(2, result);
            }
          }, _callee4);
        }));
        return function handleAddTemplate(_x5, _x6) {
          return _ref2.apply(this, arguments);
        };
      }();
      var handleUpdateTemplate = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(id, title, content) {
          var result;
          return _regenerator().w(function (_context5) {
            while (1) switch (_context5.n) {
              case 0:
                _context5.n = 1;
                return _this3.smsTemplate.updateTemplate({
                  id: id,
                  title: title,
                  content: content
                });
              case 1:
                result = _context5.v;
                // the result also have the error message, so we need to check if it is true
                if (result === true) {
                  (0, _services.trackEvent)('Int_Text_useTemplate', {
                    templateActions: 'Edit'
                  });
                }
                return _context5.a(2, result);
            }
          }, _callee5);
        }));
        return function handleUpdateTemplate(_x7, _x8, _x9) {
          return _ref3.apply(this, arguments);
        };
      }();
      return /*#__PURE__*/_react["default"].createElement(_TemplatePopover.TemplatePopover, {
        onApplyTemplate: function onApplyTemplate(content) {
          return _this3.handleApplyTemplate(targetInputRef, content);
        },
        templates: templates,
        onCopy: handleCopyTemplate,
        onDelete: handleDeleteTemplate,
        onAddTemplate: handleAddTemplate,
        onUpdateTemplate: handleUpdateTemplate,
        isLoading: isLoading
      });
    }
  }]);
}(_nextCore.RcViewModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "deleteConfirmDialog", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;
    return this._modalView.create({
      props: function props(_ref4) {
        var id = _ref4.id;
        return {
          'data-sign': 'deleteSmsTemplateConfirmDialog',
          header: (0, _i18n2.t)('deleteTemplateConfirm'),
          variant: 'confirm',
          confirmButtonText: (0, _i18n2.t)('delete'),
          confirmButtonProps: {
            color: 'danger'
          },
          onConfirm: function () {
            var _onConfirm = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
              var result;
              return _regenerator().w(function (_context6) {
                while (1) switch (_context6.n) {
                  case 0:
                    _context6.n = 1;
                    return _this4.smsTemplate.deleteTemplate(id);
                  case 1:
                    result = _context6.v;
                    if (result) {
                      (0, _services.trackEvent)('Int_Text_useTemplate', {
                        templateActions: 'Delete'
                      });
                    }
                  case 2:
                    return _context6.a(2);
                }
              }, _callee6);
            }));
            function onConfirm() {
              return _onConfirm.apply(this, arguments);
            }
            return onConfirm;
          }()
        };
      }
    });
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "replaceOrAddTemplateDialog", [_nextCore.portal], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return this._modalView.create({
      view: function view() {
        var _useLocale = (0, _hooks.useLocale)(_i18n2["default"], _i18n["default"]),
          t = _useLocale.t;
        var info = (0, _views.useModalItemView)();
        var action = info.action;
        return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_springUi.DialogTitle, null, t('replaceOrAddTemplate')), /*#__PURE__*/_react["default"].createElement(_springUi.DialogContent, null, t('replaceOrAddTemplateContent')), /*#__PURE__*/_react["default"].createElement(_springUi.DialogActions, null, /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
          "data-sign": "DialogCancelButton",
          color: "secondary",
          variant: "outlined",
          onClick: function onClick() {
            action.close();
          }
        }, t('cancel')), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
          "data-sign": "DialogAddButton",
          color: "primary",
          variant: "contained",
          onClick: function onClick() {
            action.confirm({
              type: 'add'
            });
          }
        }, t('add')), /*#__PURE__*/_react["default"].createElement(_springUi.Button, {
          "data-sign": "DialogReplaceButton",
          color: "primary",
          variant: "contained",
          onClick: function onClick() {
            action.confirm({
              type: 'replace'
            });
          }
        }, t('replace'))));
      },
      props: function props() {
        return {
          'data-sign': 'replaceOrAddTemplateDialog',
          'aria-label': 'the dialog for replace or add template',
          header: null
        };
      }
    });
  }
}), _applyDecoratedDescriptor(_class2.prototype, "openDeleteConfirmDialog", [_dec5, _dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "openDeleteConfirmDialog"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "openReplaceOrAddTemplateDialog", [_dec8, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "openReplaceOrAddTemplateDialog"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=SmsTemplate.view.js.map
