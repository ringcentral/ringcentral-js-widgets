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
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcVideo = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _RcVideo = require("../RcVideo");
var _constants = require("./constants");
var _dec, _class, _class2;
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
var formatJoinUriWithPMN = function formatJoinUriWithPMN(settings) {
  var _settings$discovery, _settings$pins, _settings$pins$aliase;
  var joinUri = (_settings$discovery = settings.discovery) === null || _settings$discovery === void 0 ? void 0 : _settings$discovery.web;
  var alias = (_settings$pins = settings.pins) === null || _settings$pins === void 0 ? void 0 : (_settings$pins$aliase = _settings$pins.aliases) === null || _settings$pins$aliase === void 0 ? void 0 : _settings$pins$aliase[0];
  if (settings.type === 'PMI' && alias) {
    var _settings$pins2;
    var pmiId = (_settings$pins2 = settings.pins) === null || _settings$pins2 === void 0 ? void 0 : _settings$pins2.pstn.participant;
    return joinUri.replace(pmiId, alias);
  }
  return joinUri;
};
var RcVideo = exports.RcVideo = (_dec = (0, _di.Module)({
  name: 'RcVideo',
  deps: ['Alert', 'Client', 'Brand', 'Storage', 'AccountInfo', 'ExtensionInfo', 'VideoConfiguration', 'Locale', 'AppFeatures', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'RcVideoOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseRcVideo) {
  function RcVideo() {
    _classCallCheck(this, RcVideo);
    return _callSuper(this, RcVideo, arguments);
  }
  _inherits(RcVideo, _BaseRcVideo);
  return _createClass(RcVideo, [{
    key: "transformV2ResponseToV1",
    value:
    // Convert the data structure of RcVideoV2 to RcVideoV1
    function transformV2ResponseToV1(settings) {
      var _settings$pins3, _settings$host, _settings$host2, _settings$pins4, _settings$pins4$alias, _settings$security$pa, _settings$security$pa2, _settings$security$pa3, _settings$preferences, _settings$preferences2, _settings$preferences3, _settings$preferences4, _settings$preferences5, _settings$preferences6;
      return {
        id: settings.id,
        name: settings.name,
        shortId: (_settings$pins3 = settings.pins) === null || _settings$pins3 === void 0 ? void 0 : _settings$pins3.pstn.participant,
        extensionId: (_settings$host = settings.host) === null || _settings$host === void 0 ? void 0 : _settings$host.extensionId,
        accountId: (_settings$host2 = settings.host) === null || _settings$host2 === void 0 ? void 0 : _settings$host2.accountId,
        type: 0,
        personalMeetingName: (_settings$pins4 = settings.pins) === null || _settings$pins4 === void 0 ? void 0 : (_settings$pins4$alias = _settings$pins4.aliases) === null || _settings$pins4$alias === void 0 ? void 0 : _settings$pins4$alias[0],
        allowJoinBeforeHost: settings.preferences.joinBeforeHost,
        allowScreenSharing: settings.preferences.screenSharing,
        isMeetingSecret: settings.security.passwordProtected,
        meetingPassword: (_settings$security$pa = settings.security.password) === null || _settings$security$pa === void 0 ? void 0 : _settings$security$pa.plainText,
        meetingPasswordMasked: (_settings$security$pa2 = settings.security.password) === null || _settings$security$pa2 === void 0 ? void 0 : _settings$security$pa2.joinQuery,
        meetingPasswordPSTN: (_settings$security$pa3 = settings.security.password) === null || _settings$security$pa3 === void 0 ? void 0 : _settings$security$pa3.pstn,
        isOnlyAuthUserJoin: settings.security.noGuests,
        isOnlyCoworkersJoin: settings.security.sameAccount,
        e2ee: settings.security.e2ee,
        joinUri: formatJoinUriWithPMN(settings),
        muteAudio: (_settings$preferences = settings.preferences.join) === null || _settings$preferences === void 0 ? void 0 : _settings$preferences.audioMuted,
        muteVideo: (_settings$preferences2 = settings.preferences.join) === null || _settings$preferences2 === void 0 ? void 0 : _settings$preferences2.videoMuted,
        waitingRoomMode: _constants.RCV_WAITING_ROOM_MODE[(_settings$preferences3 = settings.preferences.join) === null || _settings$preferences3 === void 0 ? void 0 : _settings$preferences3.waitingRoomRequired],
        allowAnyoneRecord: (_settings$preferences4 = (_settings$preferences5 = settings.preferences.recordings) === null || _settings$preferences5 === void 0 ? void 0 : _settings$preferences5.everyoneCanControl.enabled) !== null && _settings$preferences4 !== void 0 ? _settings$preferences4 : false,
        allowAnyoneTranscribe: (_settings$preferences6 = settings.preferences.allowEveryoneTranscribeMeetings) !== null && _settings$preferences6 !== void 0 ? _settings$preferences6 : false
      };
    }
  }, {
    key: "transformV1MeetingToV2",
    value: function transformV1MeetingToV2(settings, usePersonalMeetingId) {
      var result = {
        name: settings.name,
        type: usePersonalMeetingId ? 'PMI' : 'Scheduled',
        security: {
          passwordProtected: settings.isMeetingSecret,
          password: settings.isMeetingSecret ? settings.meetingPassword : '',
          // If true, only authenticated users can join to a meeting.
          noGuests: settings.isOnlyAuthUserJoin,
          // If true, only users have the same account can join to a meeting.
          sameAccount: settings.isOnlyCoworkersJoin
        },
        preferences: {
          join: {
            audioMuted: settings.muteAudio,
            videoMuted: settings.muteVideo
          },
          joinBeforeHost: settings.allowJoinBeforeHost,
          screenSharing: settings.allowScreenSharing,
          allowEveryoneTranscribeMeetings: !!settings.allowAnyoneTranscribe,
          recordings: {
            everyoneCanControl: {
              enabled: !!settings.allowAnyoneRecord
            }
          }
        }
      };
      if (this.enableWaitingRoom) {
        result.preferences.join.waitingRoomRequired = _constants.RCV_WAITING_ROOM_MODE_REVERSE[settings.waitingRoomMode];
      }
      if (this.enableE2EE) {
        result.security.e2ee = settings.e2ee;
      }
      if (usePersonalMeetingId) {
        result.id = settings.id;
      }
      return result;
    }
  }, {
    key: "_initPersonalMeeting",
    value: function () {
      var _initPersonalMeeting2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var accountId,
          extensionId,
          meetingResult,
          meeting,
          _args = arguments,
          _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              accountId = _args.length > 0 && _args[0] !== undefined ? _args[0] : this.accountId;
              extensionId = _args.length > 1 && _args[1] !== undefined ? _args[1] : this.extensionId;
              if (this._enablePersonalMeeting) {
                _context.n = 1;
                break;
              }
              return _context.a(2);
            case 1:
              _context.p = 1;
              _context.n = 2;
              return this._deps.client.service.platform().get("/rcvideo/v2/account/".concat(accountId, "/extension/").concat(extensionId, "/bridges/default"));
            case 2:
              meetingResult = _context.v;
              _context.n = 3;
              return meetingResult.json();
            case 3:
              meeting = _context.v;
              this._savePersonalMeeting(this.transformV2ResponseToV1(meeting));
              _context.n = 5;
              break;
            case 4:
              _context.p = 4;
              _t = _context.v;
              console.error('fetch personal meeting error:', _t);
              this._resetPersonalMeeting();
            case 5:
              return _context.a(2);
          }
        }, _callee, this, [[1, 4]]);
      }));
      function _initPersonalMeeting() {
        return _initPersonalMeeting2.apply(this, arguments);
      }
      return _initPersonalMeeting;
    }()
  }, {
    key: "_postBridges",
    value: function () {
      var _postBridges2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(meetingDetail, usePersonalMeetingId) {
        var postData, result, resp;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              postData = this.transformV1MeetingToV2(meetingDetail, usePersonalMeetingId);
              _context2.n = 1;
              return this._deps.client.service.platform().post("/rcvideo/v2/account/".concat(meetingDetail.accountId, "/extension/").concat(meetingDetail.extensionId, "/bridges"), postData);
            case 1:
              result = _context2.v;
              _context2.n = 2;
              return result.json();
            case 2:
              resp = _context2.v;
              return _context2.a(2, this.transformV2ResponseToV1(resp));
          }
        }, _callee2, this);
      }));
      function _postBridges(_x, _x2) {
        return _postBridges2.apply(this, arguments);
      }
      return _postBridges;
    }()
  }, {
    key: "_patchBridges",
    value: function () {
      var _patchBridges2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(meetingId, meetingDetail, usePersonalMeetingId) {
        var body, result, resp;
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              body = this.transformV1MeetingToV2(meetingDetail, usePersonalMeetingId);
              _context3.n = 1;
              return this._deps.client.service.platform().send({
                method: 'PATCH',
                url: "/rcvideo/v2/bridges/".concat(meetingId),
                body: body
              });
            case 1:
              result = _context3.v;
              _context3.n = 2;
              return result.json();
            case 2:
              resp = _context3.v;
              return _context3.a(2, this.transformV2ResponseToV1(resp));
          }
        }, _callee3, this);
      }));
      function _patchBridges(_x3, _x4, _x5) {
        return _patchBridges2.apply(this, arguments);
      }
      return _patchBridges;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(shortId) {
        var result, meeting;
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return this._deps.client.service.platform().get("/rcvideo/v2/bridges/pin/web/".concat(shortId));
            case 1:
              result = _context4.v;
              _context4.n = 2;
              return result.json();
            case 2:
              meeting = _context4.v;
              return _context4.a(2, this.transformV2ResponseToV1(meeting));
          }
        }, _callee4, this);
      }));
      function getMeeting(_x6) {
        return _getMeeting.apply(this, arguments);
      }
      return getMeeting;
    }()
  }]);
}(_RcVideo.RcVideo), _applyDecoratedDescriptor(_class2.prototype, "_postBridges", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_postBridges"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_patchBridges", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_patchBridges"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=RcVideoV2.js.map
