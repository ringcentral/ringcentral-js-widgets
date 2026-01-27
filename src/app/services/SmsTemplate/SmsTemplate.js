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
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmsTemplate = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.starts-with.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _descriptor;
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
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
var ONE_HOUR = 1000 * 60 * 60;
var SmsTemplate = exports.SmsTemplate = (_dec = (0, _nextCore.injectable)({
  name: 'SmsTemplate'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)('SmsTemplateOptions')(target, undefined, 7);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _nextCore.RouterPlugin === "undefined" ? Object : _nextCore.RouterPlugin, typeof _services2.ToastManager === "undefined" ? Object : _services2.ToastManager, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _services.DataFetcher === "undefined" ? Object : _services.DataFetcher, typeof SmsTemplateOptions === "undefined" ? Object : SmsTemplateOptions]), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [Boolean]), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", []), _dec1 = (0, _nextCore.delegate)('server'), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [typeof CreateSmsTemplateParams === "undefined" ? Object : CreateSmsTemplateParams]), _dec12 = (0, _nextCore.delegate)('server'), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [typeof UpdateSmsTemplateParams === "undefined" ? Object : UpdateSmsTemplateParams]), _dec15 = (0, _nextCore.delegate)('server'), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [String]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_DataFetcherConsumer) {
  function SmsTemplate(_auth, _toast, _client, _router, _toastManager, _portManager, _dataFetcher, _smsTemplateOptions) {
    var _this;
    _classCallCheck(this, SmsTemplate);
    _this = _callSuper(this, SmsTemplate, [_dataFetcher]);
    _this._auth = _auth;
    _this._toast = _toast;
    _this._client = _client;
    _this._router = _router;
    _this._toastManager = _toastManager;
    _this._portManager = _portManager;
    _this._dataFetcher = _dataFetcher;
    _this._smsTemplateOptions = _smsTemplateOptions;
    _initializerDefineProperty(_this, "isLoading", _descriptor, _this);
    _this.uniqueManager = _this._toastManager.createUniqueManager();
    _this.haveEverViewedUseTemplateRelatedPaths = false;
    _this._source = new _services.DataSource(_objectSpread(_objectSpread({}, _this._smsTemplateOptions), {}, {
      key: 'smsTemplate',
      fetchFunction: function () {
        var _fetchFunction = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var response;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return _this._client.service.platform().get('/restapi/v1.0/account/~/extension/~/message-store-templates');
              case 1:
                response = _context.v;
                return _context.a(2, response.json());
            }
          }, _callee);
        }));
        function fetchFunction() {
          return _fetchFunction.apply(this, arguments);
        }
        return fetchFunction;
      }(),
      readyCheckFunction: function readyCheckFunction() {
        // when become logged out, clear the flag again
        if (!_this.haveEverViewedUseTemplateRelatedPaths && (
        // check if the current path is every view SMS related path
        _this._router.currentPath.startsWith('/conversations') || _this._router.currentPath.startsWith('/composeText'))) {
          _this.haveEverViewedUseTemplateRelatedPaths = true;
        }
        return _this.haveEverViewedUseTemplateRelatedPaths && _this._auth.loggedIn;
      },
      polling: true,
      pollingInterval: ONE_HOUR,
      cleanOnReset: true
    }));
    _this._dataFetcher.register(_this._source);
    var listener = function listener() {
      _this._auth.afterLogout$.pipe((0, _rxjs.tap)(function () {
        _this.haveEverViewedUseTemplateRelatedPaths = false;
      }), _nextCore.takeUntilAppDestroy).subscribe();
    };
    if (_this._portManager.shared) {
      _this._portManager.onServer(function () {
        listener();
      });
    } else {
      listener();
    }
    return _this;
  }
  _inherits(SmsTemplate, _DataFetcherConsumer);
  return _createClass(SmsTemplate, [{
    key: "_setLoading",
    value: function _setLoading(loading) {
      this.isLoading = loading;
    }
  }, {
    key: "serverData",
    get: function get() {
      var _this$data;
      return (_this$data = this.data) !== null && _this$data !== void 0 ? _this$data : {
        records: []
      };
    }
  }, {
    key: "templates",
    get: function get() {
      var _this2 = this;
      return this.serverData.records.filter(function (template) {
        return template.scope === 'Personal';
      }).map(function (template) {
        return _this2._transformServerTemplate(template);
      })
      // the server data is not sorted by id, so we need to sort it by id
      .sort(function (a, b) {
        return -a.id.localeCompare(b.id);
      });
    }

    /**
     * Transform server template to local format
     */
  }, {
    key: "_transformServerTemplate",
    value: function _transformServerTemplate(serverTemplate) {
      return {
        id: serverTemplate.id,
        title: serverTemplate.displayName,
        content: serverTemplate.body.text
      };
    }

    /**
     * Transform local template to server format for creation
     */
  }, {
    key: "_transformToServerRequest",
    value: function _transformToServerRequest(params) {
      return {
        displayName: params.title,
        body: {
          text: params.content
        }
      };
    }

    /**
     * Transform local template update to server format
     */
  }, {
    key: "_transformToServerUpdateRequest",
    value: function _transformToServerUpdateRequest(params) {
      var request = {};
      if (params.title !== undefined) {
        request.displayName = params.title;
      }
      if (params.content !== undefined) {
        request.body = {
          text: params.content
        };
      }
      return request;
    }

    /**
     * Create a new template on server
     */
  }, {
    key: "createTemplate",
    value: (function () {
      var _createTemplate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(params) {
        var _this3 = this;
        var requestData, result, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              this._setLoading(true);
              _context2.p = 1;
              requestData = this._transformToServerRequest(params);
              _context2.n = 2;
              return this._client.service.platform().post('/restapi/v1.0/account/~/extension/~/message-store-templates', requestData);
            case 2:
              _context2.n = 3;
              return this.refreshTemplates();
            case 3:
              this.uniqueManager.unique(function () {
                return _this3._toast.success((0, _i18n.t)('createTemplateSuccess'));
              });
              return _context2.a(2, true);
            case 4:
              _context2.p = 4;
              _t = _context2.v;
              _context2.n = 5;
              return this._handleError(_t);
            case 5:
              result = _context2.v;
              if (!result) {
                _context2.n = 6;
                break;
              }
              return _context2.a(2, typeof result === 'string' ? result : null);
            case 6:
              this.logger.error('Failed to create SMS template:', _t);
              this.uniqueManager.unique(function () {
                return _this3._toast.danger((0, _i18n.t)('createTemplateFailed'));
              });
              return _context2.a(2, null);
            case 7:
              _context2.p = 7;
              this._setLoading(false);
              return _context2.f(7);
            case 8:
              return _context2.a(2);
          }
        }, _callee2, this, [[1, 4, 7, 8]]);
      }));
      function createTemplate(_x) {
        return _createTemplate.apply(this, arguments);
      }
      return createTemplate;
    }()
    /**
     * Update template on server
     */
    )
  }, {
    key: "updateTemplate",
    value: (function () {
      var _updateTemplate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(params) {
        var _this4 = this;
        var requestData, result, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              this._setLoading(true);
              _context3.p = 1;
              requestData = this._transformToServerUpdateRequest(params);
              _context3.n = 2;
              return this._client.service.platform().put("/restapi/v1.0/account/~/extension/~/message-store-templates/".concat(params.id), requestData);
            case 2:
              _context3.n = 3;
              return this.refreshTemplates();
            case 3:
              this.uniqueManager.unique(function () {
                return _this4._toast.success((0, _i18n.t)('updateTemplateSuccess'));
              });
              return _context3.a(2, true);
            case 4:
              _context3.p = 4;
              _t2 = _context3.v;
              _context3.n = 5;
              return this._handleError(_t2);
            case 5:
              result = _context3.v;
              if (!result) {
                _context3.n = 6;
                break;
              }
              return _context3.a(2, typeof result === 'string' ? result : false);
            case 6:
              this.logger.error('Failed to update SMS template:', _t2);
              this.uniqueManager.unique(function () {
                return _this4._toast.danger((0, _i18n.t)('updateTemplateFailed'));
              });
              return _context3.a(2, false);
            case 7:
              _context3.p = 7;
              this._setLoading(false);
              return _context3.f(7);
            case 8:
              return _context3.a(2);
          }
        }, _callee3, this, [[1, 4, 7, 8]]);
      }));
      function updateTemplate(_x2) {
        return _updateTemplate.apply(this, arguments);
      }
      return updateTemplate;
    }()
    /**
     * Delete template from server
     */
    )
  }, {
    key: "deleteTemplate",
    value: (function () {
      var _deleteTemplate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(id) {
        var _this5 = this;
        var _t3;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.p = _context4.n) {
            case 0:
              this._setLoading(true);
              _context4.p = 1;
              _context4.n = 2;
              return this._client.service.platform()["delete"]("/restapi/v1.0/account/~/extension/~/message-store-templates/".concat(id));
            case 2:
              _context4.n = 3;
              return this.refreshTemplates();
            case 3:
              this.uniqueManager.unique(function () {
                return _this5._toast.success((0, _i18n.t)('deleteTemplateSuccess'));
              });
              return _context4.a(2, true);
            case 4:
              _context4.p = 4;
              _t3 = _context4.v;
              this.logger.error('Failed to delete SMS template:', _t3);
              this.uniqueManager.unique(function () {
                return _this5._toast.danger((0, _i18n.t)('deleteTemplateFailed'));
              });
              return _context4.a(2, false);
            case 5:
              _context4.p = 5;
              this._setLoading(false);
              return _context4.f(5);
            case 6:
              return _context4.a(2);
          }
        }, _callee4, this, [[1, 4, 5, 6]]);
      }));
      function deleteTemplate(_x3) {
        return _deleteTemplate.apply(this, arguments);
      }
      return deleteTemplate;
    }()
    /**
     *
     * @returns does already handle the error
     */
    )
  }, {
    key: "_handleError",
    value: (function () {
      var _handleError2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(error) {
        var _this6 = this;
        var _response, errorData, errorCode, limit, resourceName, parameterName, _t4;
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.p = _context5.n) {
            case 0:
              _context5.p = 0;
              _context5.n = 1;
              return (_response = error.response) === null || _response === void 0 ? void 0 : _response.clone().json();
            case 1:
              errorData = _context5.v;
              errorCode = errorData.errorCode, limit = errorData.limit, resourceName = errorData.resourceName, parameterName = errorData.parameterName;
              if (!(errorCode === 'CMN-423' && resourceName === 'Templates' && limit)) {
                _context5.n = 2;
                break;
              }
              this.logger.error('Failed to create SMS template:', errorData);
              this.uniqueManager.unique(function () {
                return _this6._toast.danger((0, _i18n.t)('createTemplateFailedByLimit', {
                  limit: limit || 25
                }));
              });
              return _context5.a(2, true);
            case 2:
              if (!(errorCode === 'CMN-152' && parameterName === 'displayName')) {
                _context5.n = 3;
                break;
              }
              this.logger.error('Failed to create SMS template:', errorData);
              return _context5.a(2, (0, _i18n.t)('sameTemplateName'));
            case 3:
              _context5.n = 5;
              break;
            case 4:
              _context5.p = 4;
              _t4 = _context5.v;
            case 5:
              return _context5.a(2, false);
          }
        }, _callee5, this, [[0, 4]]);
      }));
      function _handleError(_x4) {
        return _handleError2.apply(this, arguments);
      }
      return _handleError;
    }()
    /**
     * Get template by ID
     */
    )
  }, {
    key: "getTemplate",
    value: function getTemplate(id) {
      return this.templates.find(function (template) {
        return template.id === id;
      });
    }

    /**
     * Refresh templates from server
     */
  }, {
    key: "refreshTemplates",
    value: (function () {
      var _refreshTemplates = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return this.fetchData();
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function refreshTemplates() {
        return _refreshTemplates.apply(this, arguments);
      }
      return refreshTemplates;
    }())
  }]);
}(_services.DataFetcherConsumer), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "isLoading", [_nextCore.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return false;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setLoading", [_nextCore.action, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "_setLoading"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "serverData", [_nextCore.computed, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "serverData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "templates", [_nextCore.computed, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "templates"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createTemplate", [_dec1, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "createTemplate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTemplate", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTemplate"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteTemplate", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteTemplate"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=SmsTemplate.js.map
