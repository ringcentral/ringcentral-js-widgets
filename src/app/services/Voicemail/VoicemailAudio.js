"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
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
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VoicemailAudio = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/web.url-search-params.js");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _utils = require("@ringcentral-integration/utils");
var _rxjs = require("rxjs");
var _Conversations = require("../Conversations");
var _MessageStore = require("../MessageStore");
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
var VoicemailAudio = exports.VoicemailAudio = (_dec = (0, _nextCore.injectable)({
  name: 'VoicemailAudio'
}), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", [typeof _MessageStore.MessageStore === "undefined" ? Object : _MessageStore.MessageStore, typeof _services.Auth === "undefined" ? Object : _services.Auth, typeof _Conversations.Conversations === "undefined" ? Object : _Conversations.Conversations]), _dec4 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [Object]), _dec7 = Reflect.metadata("design:type", Function), _dec8 = Reflect.metadata("design:paramtypes", [String, typeof VoicemailAudioStatus === "undefined" ? Object : VoicemailAudioStatus]), _dec9 = Reflect.metadata("design:type", Function), _dec0 = Reflect.metadata("design:paramtypes", [String, typeof VoicemailAudioStatus === "undefined" ? Object : VoicemailAudioStatus]), _dec1 = (0, _nextCore.delegate)('server'), _dec10 = Reflect.metadata("design:type", Function), _dec11 = Reflect.metadata("design:paramtypes", [String, typeof VoicemailAudioStatus === "undefined" ? Object : VoicemailAudioStatus]), _dec12 = (0, _nextCore.delegate)('server'), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [String, String]), _dec15 = (0, _nextCore.delegate)('server'), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [String, String]), _dec(_class = _dec2(_class = _dec3(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function VoicemailAudio(_messageStore, _auth, _conversations) {
    var _this;
    _classCallCheck(this, VoicemailAudio);
    _this = _callSuper(this, VoicemailAudio);
    _this._messageStore = _messageStore;
    _this._auth = _auth;
    _this._conversations = _conversations;
    _initializerDefineProperty(_this, "audioMap", _descriptor, _this);
    return _this;
  }
  _inherits(VoicemailAudio, _RcModule);
  return _createClass(VoicemailAudio, [{
    key: "removeAudio",
    value: function removeAudio(voicemailIds) {
      var _this2 = this;
      var ids = Array.isArray(voicemailIds) ? voicemailIds : [voicemailIds];
      ids.forEach(function (id) {
        var status = _this2.audioMap[id];
        if (status === null || status === void 0 ? void 0 : status.blobUrl) URL.revokeObjectURL(status.blobUrl);
        delete _this2.audioMap[id];
      });
    }
  }, {
    key: "onInitOnce",
    value: function onInitOnce() {
      var _this3 = this;
      (0, _nextCore.fromWatchValue)(this, function () {
        return _this3._conversations.allConversationsMap;
      }).pipe((0, _rxjs.filter)(function () {
        return Object.keys(_this3.audioMap).length > 0;
      }), (0, _rxjs.tap)(function (conversationsMap) {
        // Collect IDs to remove using reduce
        var idsToRemove = Object.keys(_this3.audioMap).reduce(function (acc, voicemailId) {
          if (!conversationsMap.get(voicemailId)) {
            acc.push(voicemailId);
          }
          return acc;
        }, []);

        // Remove collected IDs at once
        if (idsToRemove.length > 0) {
          _this3.removeAudio(idsToRemove);
        }
      }), _nextCore.takeUntilAppDestroy).subscribe();
      this._auth.afterLogout$.pipe((0, _rxjs.tap)(function () {
        _this3.removeAudio(Object.keys(_this3.audioMap));
      }), _nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "_setAudioStatus",
    value: function _setAudioStatus(voicemailId, status) {
      this.audioMap[voicemailId] = status;
    }
  }, {
    key: "_updateAudioStatus",
    value: function _updateAudioStatus(voicemailId, status) {
      this.audioMap[voicemailId] = _objectSpread(_objectSpread({}, this.audioMap[voicemailId]), status);
    }
  }, {
    key: "setAudioStatus",
    value: function () {
      var _setAudioStatus2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(voicemailId, status) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              this._setAudioStatus(voicemailId, status);
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setAudioStatus(_x, _x2) {
        return _setAudioStatus2.apply(this, arguments);
      }
      return setAudioStatus;
    }()
  }, {
    key: "getAudioStatus",
    value: function getAudioStatus(voicemailId) {
      return this.audioMap[voicemailId];
    }
  }, {
    key: "loadAudio",
    value: function () {
      var _loadAudio = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(voicemailId, uri) {
        var blobUrl, _t;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.p = _context2.n) {
            case 0:
              _context2.p = 0;
              this._messageStore.readMessages(voicemailId);
              _context2.n = 1;
              return (0, _utils.getBlobURL)(uri);
            case 1:
              blobUrl = _context2.v;
              this._updateAudioStatus(voicemailId, {
                blobUrl: blobUrl
              });
              return _context2.a(2, blobUrl);
            case 2:
              _context2.p = 2;
              _t = _context2.v;
              this.logger.error('loadAudio error', _t);
              this._updateAudioStatus(voicemailId, {
                loading: false,
                isNetworkError: true
              });
              return _context2.a(2, undefined);
          }
        }, _callee2, this, [[0, 2]]);
      }));
      function loadAudio(_x3, _x4) {
        return _loadAudio.apply(this, arguments);
      }
      return loadAudio;
    }()
  }, {
    key: "getBlobUrl",
    value: function () {
      var _getBlobUrl = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(voicemailId, uri) {
        var _this$getAudioStatus;
        var blobUrl, _t2;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              blobUrl = (_this$getAudioStatus = this.getAudioStatus(voicemailId)) === null || _this$getAudioStatus === void 0 ? void 0 : _this$getAudioStatus.blobUrl;
              if (!blobUrl) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2, blobUrl);
            case 1:
              if (!uri) {
                _context3.n = 3;
                break;
              }
              _context3.n = 2;
              return this.loadAudio(voicemailId, uri);
            case 2:
              _t2 = _context3.v;
              _context3.n = 4;
              break;
            case 3:
              _t2 = undefined;
            case 4:
              return _context3.a(2, _t2);
          }
        }, _callee3, this);
      }));
      function getBlobUrl(_x5, _x6) {
        return _getBlobUrl.apply(this, arguments);
      }
      return getBlobUrl;
    }()
  }, {
    key: "download",
    value: function () {
      var _download = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(voicemailId, uri) {
        var blobUrl;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              this._messageStore.readMessages(voicemailId);
              if (!(voicemailId && uri)) {
                _context4.n = 2;
                break;
              }
              _context4.n = 1;
              return this.getBlobUrl(voicemailId, uri);
            case 1:
              blobUrl = _context4.v;
              if (!blobUrl) {
                _context4.n = 2;
                break;
              }
              (0, _utils.downloadFile)(blobUrl, (0, _utils.getFilenameWithNoUrlParams)(uri));
              return _context4.a(2);
            case 2:
              this.logger.error('Voicemail uri is empty:', voicemailId);
            case 3:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function download(_x7, _x8) {
        return _download.apply(this, arguments);
      }
      return download;
    }()
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "audioMap", [_nextCore.state, _dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "removeAudio", [_nextCore.action, _dec5, _dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "removeAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setAudioStatus", [_nextCore.action, _dec7, _dec8], Object.getOwnPropertyDescriptor(_class2.prototype, "_setAudioStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateAudioStatus", [_nextCore.action, _dec9, _dec0], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateAudioStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setAudioStatus", [_dec1, _dec10, _dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "setAudioStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadAudio", [_dec12, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "loadAudio"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getBlobUrl", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "getBlobUrl"), _class2.prototype), _class2)) || _class) || _class) || _class);
//# sourceMappingURL=VoicemailAudio.js.map
