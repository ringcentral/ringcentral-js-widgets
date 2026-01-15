"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.join");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcVideo = void 0;
require("regenerator-runtime/runtime");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _RcVideo = require("../RcVideo");
var _constants = require("./constants");
var _dec, _class, _class2;
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
var RcVideo = (_dec = (0, _di.Module)({
  name: 'RcVideo',
  deps: ['Alert', 'Client', 'Brand', 'Storage', 'AccountInfo', 'ExtensionInfo', 'VideoConfiguration', 'Locale', 'AppFeatures', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'RcVideoOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseRcVideo) {
  _inherits(RcVideo, _BaseRcVideo);
  var _super = _createSuper(RcVideo);
  function RcVideo() {
    _classCallCheck(this, RcVideo);
    return _super.apply(this, arguments);
  }
  _createClass(RcVideo, [{
    key: "transformV2ResponseToV1",
    // Convert the data structure of RcVideoV2 to RcVideoV1
    value: function transformV2ResponseToV1(settings) {
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
      var _initPersonalMeeting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var accountId,
          extensionId,
          meetingResult,
          meeting,
          _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                accountId = _args.length > 0 && _args[0] !== undefined ? _args[0] : this.accountId;
                extensionId = _args.length > 1 && _args[1] !== undefined ? _args[1] : this.extensionId;
                if (this._enablePersonalMeeting) {
                  _context.next = 4;
                  break;
                }
                return _context.abrupt("return");
              case 4:
                _context.prev = 4;
                _context.next = 7;
                return this._deps.client.service.platform().get("/rcvideo/v2/account/".concat(accountId, "/extension/").concat(extensionId, "/bridges/default"));
              case 7:
                meetingResult = _context.sent;
                _context.next = 10;
                return meetingResult.json();
              case 10:
                meeting = _context.sent;
                this._savePersonalMeeting(this.transformV2ResponseToV1(meeting));
                _context.next = 18;
                break;
              case 14:
                _context.prev = 14;
                _context.t0 = _context["catch"](4);
                console.error('fetch personal meeting error:', _context.t0);
                this._resetPersonalMeeting();
              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 14]]);
      }));
      function _initPersonalMeeting() {
        return _initPersonalMeeting2.apply(this, arguments);
      }
      return _initPersonalMeeting;
    }()
  }, {
    key: "_postBridges",
    value: function () {
      var _postBridges2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(meetingDetail, usePersonalMeetingId) {
        var postData, result, resp;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                postData = this.transformV1MeetingToV2(meetingDetail, usePersonalMeetingId);
                _context2.next = 3;
                return this._deps.client.service.platform().post("/rcvideo/v2/account/".concat(meetingDetail.accountId, "/extension/").concat(meetingDetail.extensionId, "/bridges"), postData);
              case 3:
                result = _context2.sent;
                _context2.next = 6;
                return result.json();
              case 6:
                resp = _context2.sent;
                return _context2.abrupt("return", this.transformV2ResponseToV1(resp));
              case 8:
              case "end":
                return _context2.stop();
            }
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
      var _patchBridges2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(meetingId, meetingDetail, usePersonalMeetingId) {
        var body, result, resp;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                body = this.transformV1MeetingToV2(meetingDetail, usePersonalMeetingId);
                _context3.next = 3;
                return this._deps.client.service.platform().send({
                  method: 'PATCH',
                  url: "/rcvideo/v2/bridges/".concat(meetingId),
                  body: body
                });
              case 3:
                result = _context3.sent;
                _context3.next = 6;
                return result.json();
              case 6:
                resp = _context3.sent;
                return _context3.abrupt("return", this.transformV2ResponseToV1(resp));
              case 8:
              case "end":
                return _context3.stop();
            }
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
      var _getMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(shortId) {
        var result, meeting;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._deps.client.service.platform().get("/rcvideo/v2/bridges/pin/web/".concat(shortId));
              case 2:
                result = _context4.sent;
                _context4.next = 5;
                return result.json();
              case 5:
                meeting = _context4.sent;
                return _context4.abrupt("return", this.transformV2ResponseToV1(meeting));
              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function getMeeting(_x6) {
        return _getMeeting.apply(this, arguments);
      }
      return getMeeting;
    }()
  }]);
  return RcVideo;
}(_RcVideo.RcVideo), (_applyDecoratedDescriptor(_class2.prototype, "_postBridges", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_postBridges"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_patchBridges", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_patchBridges"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype)), _class2)) || _class);
exports.RcVideo = RcVideo;
//# sourceMappingURL=RcVideoV2.js.map
