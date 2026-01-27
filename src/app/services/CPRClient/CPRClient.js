"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
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
exports.CPRClient = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _services2 = require("@ringcentral-integration/micro-core/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _jszip = _interopRequireDefault(require("jszip"));
var _ramda = require("ramda");
var _createCPRRequest = require("./createCPRRequest");
var _i18n = require("./i18n");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
var APPLICATION_LOGS_NAME = 'applicationLogs.zip';
var CPRClient = exports.CPRClient = (_dec = (0, _nextCore.injectable)({
  name: 'CPRClient'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.inject)('SdkConfig')(target, undefined, 9);
}, _dec3 = function _dec3(target, key) {
  return (0, _nextCore.optional)('CPRClientOptions')(target, undefined, 10);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _services.AccountInfo === "undefined" ? Object : _services.AccountInfo, typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _services2.Brand === "undefined" ? Object : _services2.Brand, typeof _services.Client === "undefined" ? Object : _services.Client, typeof _services.ExtensionInfo === "undefined" ? Object : _services.ExtensionInfo, typeof _nextCore.PortManager === "undefined" ? Object : _nextCore.PortManager, typeof _services2.Toast === "undefined" ? Object : _services2.Toast, typeof _services2.BrowserLogger === "undefined" ? Object : _services2.BrowserLogger, typeof _services2.UAParsedInfo === "undefined" ? Object : _services2.UAParsedInfo, typeof SDKConfig === "undefined" ? Object : SDKConfig, typeof CPRClientOptions === "undefined" ? Object : CPRClientOptions]), _dec6 = (0, _nextCore.delegate)('server'), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function CPRClient(_accountInfo, _auth, _brand, _client, _extensionInfo, _portManager, _toast, _browserLogger, _UAParsedInfo, _sdkConfig, _cPRClientOptions) {
    var _this;
    _classCallCheck(this, CPRClient);
    _this = _callSuper(this, CPRClient);
    _this._accountInfo = _accountInfo;
    _this._auth = _auth;
    _this._brand = _brand;
    _this._client = _client;
    _this._extensionInfo = _extensionInfo;
    _this._portManager = _portManager;
    _this._toast = _toast;
    _this._browserLogger = _browserLogger;
    _this._UAParsedInfo = _UAParsedInfo;
    _this._sdkConfig = _sdkConfig;
    _this._cPRClientOptions = _cPRClientOptions;
    return _this;
  }
  _inherits(CPRClient, _RcModule);
  return _createClass(CPRClient, [{
    key: "hasPermission",
    get: function get() {
      var _this$_auth$token, _this$_auth$token$sco, _this$_auth$token$sco2, _this$_auth$token2, _this$_auth$token2$sc, _this$_auth$token2$sc2;
      return !!(((_this$_auth$token = this._auth.token) === null || _this$_auth$token === void 0 ? void 0 : (_this$_auth$token$sco = _this$_auth$token.scope) === null || _this$_auth$token$sco === void 0 ? void 0 : (_this$_auth$token$sco2 = _this$_auth$token$sco.includes) === null || _this$_auth$token$sco2 === void 0 ? void 0 : _this$_auth$token$sco2.call(_this$_auth$token$sco, 'ProblemReportsManagement')) && ((_this$_auth$token2 = this._auth.token) === null || _this$_auth$token2 === void 0 ? void 0 : (_this$_auth$token2$sc = _this$_auth$token2.scope) === null || _this$_auth$token2$sc === void 0 ? void 0 : (_this$_auth$token2$sc2 = _this$_auth$token2$sc.includes) === null || _this$_auth$token2$sc2 === void 0 ? void 0 : _this$_auth$token2$sc2.call(_this$_auth$token2$sc, 'SendUsageInfo')));
    }
  }, {
    key: "logsFilename",
    get: function get() {
      var _this$_cPRClientOptio;
      return ((_this$_cPRClientOptio = this._cPRClientOptions) === null || _this$_cPRClientOptio === void 0 ? void 0 : _this$_cPRClientOptio.logsFilename) || APPLICATION_LOGS_NAME;
    }
  }, {
    key: "getEDRInfo",
    value: function () {
      var _getEDRInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var resp, data, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              _context.n = 1;
              return this._client.service.get('/restapi/v1.0/client-info/edr-info?channelId=problemReports');
            case 1:
              resp = _context.v;
              _context.n = 2;
              return resp.json();
            case 2:
              data = _context.v;
              return _context.a(2, data);
            case 3:
              _context.p = 3;
              _t = _context.v;
              this.logger.error('Error getting EDR info:', _t);
              return _context.a(2, {
                cprUri: '',
                token: ''
              });
          }
        }, _callee, this, [[0, 3]]);
      }));
      function getEDRInfo() {
        return _getEDRInfo.apply(this, arguments);
      }
      return getEDRInfo;
    }()
  }, {
    key: "sendCPR",
    value: function () {
      var _sendCPR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(description, extraFiles) {
        var _this$_extensionInfo$, _this$_extensionInfo$2, _yield$this$getEDRInf, cprUri, token, merged, _yield$this$getClient, clientAppType, clientDetails, resp, _t2;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              _context2.n = 1;
              return this.getEDRInfo();
            case 1:
              _yield$this$getEDRInf = _context2.v;
              cprUri = _yield$this$getEDRInf.cprUri;
              token = _yield$this$getEDRInf.token;
              if (!(!cprUri || !token)) {
                _context2.n = 2;
                break;
              }
              this._toast.danger({
                message: (0, _i18n.t)('ApiFailure')
              });
              return _context2.a(2, null);
            case 2:
              _context2.n = 3;
              return this.processAndSendToCPR({
                extraFiles: extraFiles
              });
            case 3:
              merged = _context2.v;
              if (merged) {
                _context2.n = 4;
                break;
              }
              throw new Error('failed to build log archive');
            case 4:
              _context2.n = 5;
              return this.getClientInfo();
            case 5:
              _yield$this$getClient = _context2.v;
              clientAppType = _yield$this$getClient.clientAppType;
              clientDetails = _yield$this$getClient.clientDetails;
              _context2.n = 6;
              return (0, _createCPRRequest.createCPRRequest)(cprUri, {
                token: token,
                data: {
                  description: description,
                  title: 'Automated Log Submission',
                  accountId: String(this._accountInfo.id),
                  brandId: this._brand.id,
                  clientEndpointId: this._auth.token.endpointId,
                  clientId: this._sdkConfig.clientId,
                  clientVersion: this._sdkConfig.appVersion || '1.0.0',
                  // TODO: Better way to do productCategory and productSubcategory
                  productCategory: this._brand.application,
                  userId: this._extensionInfo.id.toString(),
                  submitterEmail: (_this$_extensionInfo$ = this._extensionInfo.data) === null || _this$_extensionInfo$ === void 0 ? void 0 : (_this$_extensionInfo$2 = _this$_extensionInfo$.contact) === null || _this$_extensionInfo$2 === void 0 ? void 0 : _this$_extensionInfo$2.email,
                  clientAppType: clientAppType,
                  clientDetails: clientDetails
                },
                attachments: [{
                  data: merged.content,
                  filename: merged.name
                }]
              });
            case 6:
              resp = _context2.v;
              return _context2.a(2, resp);
            case 7:
              _context2.p = 7;
              _t2 = _context2.v;
              this.logger.error('Error submitting CPR Report:', _t2);
              return _context2.a(2, false);
          }
        }, _callee2, this, [[0, 7]]);
      }));
      function sendCPR(_x, _x2) {
        return _sendCPR.apply(this, arguments);
      }
      return sendCPR;
    }()
  }, {
    key: "processAndSendToCPR",
    value: function () {
      var _processAndSendToCPR = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(_ref) {
        var _ref$extraFiles, extraFiles, storageTransport, _this$_cPRClientOptio2, name, logsData, zip, attachmentsFolder, _iterator, _step, _step$value, _name, base64Url, base64Data, mergedBlob, _t3, _t4;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.p = _context3.n) {
            case 0:
              _ref$extraFiles = _ref.extraFiles, extraFiles = _ref$extraFiles === void 0 ? [] : _ref$extraFiles;
              storageTransport = this._browserLogger.storageTransport;
              if (storageTransport) {
                _context3.n = 1;
                break;
              }
              this.logger.error('StorageTransport not available on Client');
              return _context3.a(2);
            case 1:
              _context3.p = 1;
              name = this._portManager.portDetector.sharedAppOptions.name;
              _context3.n = 2;
              return storageTransport.saveDB();
            case 2:
              _context3.n = 3;
              return storageTransport.getLogs({
                name: name
              });
            case 3:
              logsData = _context3.v;
              if (logsData === null || logsData === void 0 ? void 0 : logsData.content) {
                _context3.n = 4;
                break;
              }
              return _context3.a(2);
            case 4:
              _context3.n = 5;
              return _jszip["default"].loadAsync(logsData.content);
            case 5:
              zip = _context3.v;
              if (!((_this$_cPRClientOptio2 = this._cPRClientOptions) === null || _this$_cPRClientOptio2 === void 0 ? void 0 : _this$_cPRClientOptio2.additionalLogProvider)) {
                _context3.n = 9;
                break;
              }
              _context3.p = 6;
              _context3.n = 7;
              return this._cPRClientOptions.additionalLogProvider.addAdditionalLogs(zip);
            case 7:
              _context3.n = 9;
              break;
            case 8:
              _context3.p = 8;
              _t3 = _context3.v;
              this.logger.warn('Failed to add additional logs:', _t3);
            case 9:
              if (extraFiles.length > 0) {
                attachmentsFolder = zip.folder("".concat(logsData.name, "/attachments"));
                if (attachmentsFolder) {
                  _iterator = _createForOfIteratorHelper(extraFiles);
                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      _step$value = _step.value, _name = _step$value.name, base64Url = _step$value.base64Url;
                      // Extract base64 data from data URL
                      base64Data = base64Url.split(',')[1]; // Add the file to zip
                      attachmentsFolder.file(_name, base64Data, {
                        base64: true
                      });
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                } else {
                  this.logger.error('Attachments folder not found');
                }
              }
              _context3.n = 10;
              return zip.generateAsync({
                type: 'blob',
                compression: 'DEFLATE',
                compressionOptions: {
                  level: 9
                }
              });
            case 10:
              mergedBlob = _context3.v;
              return _context3.a(2, {
                content: mergedBlob,
                name: this.logsFilename
              });
            case 11:
              _context3.p = 11;
              _t4 = _context3.v;
              this.logger.error('Error retrieving logs:', _t4);
            case 12:
              return _context3.a(2);
          }
        }, _callee3, this, [[6, 8], [1, 11]]);
      }));
      function processAndSendToCPR(_x3) {
        return _processAndSendToCPR.apply(this, arguments);
      }
      return processAndSendToCPR;
    }()
    /**
     * Determines the client application type and details for CPR reporting
     * @returns Object containing clientAppType and clientDetails
     */
  }, {
    key: "getClientInfo",
    value: (function () {
      var _getClientInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
        var _this$_cPRClientOptio3;
        var _this$_cPRClientOptio4, _this$_cPRClientOptio5, clientAppType, dpVersion, clientDetails, _osInfo$os, _osInfo$os$name, _osInfo$browser, _osInfo$browser2, _osInfo$browser2$vers, osInfo;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (!((_this$_cPRClientOptio3 = this._cPRClientOptions) === null || _this$_cPRClientOptio3 === void 0 ? void 0 : _this$_cPRClientOptio3.clientInfoProvider)) {
                _context4.n = 2;
                break;
              }
              // Get client info from Jupiter
              clientAppType = this._cPRClientOptions.clientInfoProvider.getCprClientAppType(); // Get DP version for MS Teams
              _context4.n = 1;
              return (_this$_cPRClientOptio4 = this._cPRClientOptions.clientInfoProvider) === null || _this$_cPRClientOptio4 === void 0 ? void 0 : (_this$_cPRClientOptio5 = _this$_cPRClientOptio4.getDpVersion) === null || _this$_cPRClientOptio5 === void 0 ? void 0 : _this$_cPRClientOptio5.call(_this$_cPRClientOptio4);
            case 1:
              dpVersion = _context4.v;
              clientDetails = this._cPRClientOptions.clientInfoProvider.getCprClientDetails(dpVersion);
              return _context4.a(2, {
                clientAppType: clientAppType,
                clientDetails: clientDetails
              });
            case 2:
              _context4.n = 3;
              return this._UAParsedInfo.getOsInfo();
            case 3:
              osInfo = _context4.v;
              return _context4.a(2, {
                clientAppType: 'RCIntegrationAppWeb',
                clientDetails: "".concat(osInfo === null || osInfo === void 0 ? void 0 : (_osInfo$os = osInfo.os) === null || _osInfo$os === void 0 ? void 0 : (_osInfo$os$name = _osInfo$os.name) === null || _osInfo$os$name === void 0 ? void 0 : _osInfo$os$name.replace(' ', ''), "-").concat(osInfo === null || osInfo === void 0 ? void 0 : (_osInfo$browser = osInfo.browser) === null || _osInfo$browser === void 0 ? void 0 : _osInfo$browser.name, "-").concat((0, _ramda.defaultTo)('Unknown', (0, _ramda.head)((osInfo === null || osInfo === void 0 ? void 0 : (_osInfo$browser2 = osInfo.browser) === null || _osInfo$browser2 === void 0 ? void 0 : (_osInfo$browser2$vers = _osInfo$browser2.version) === null || _osInfo$browser2$vers === void 0 ? void 0 : _osInfo$browser2$vers.split('.')) || [])))
              });
            case 4:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function getClientInfo() {
        return _getClientInfo.apply(this, arguments);
      }
      return getClientInfo;
    }())
  }]);
}(_nextCore.RcModule), _applyDecoratedDescriptor(_class2.prototype, "getEDRInfo", [_dec6, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "getEDRInfo"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class) || _class);
//# sourceMappingURL=CPRClient.js.map
