"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreinsertCall = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.entries.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _telephonyStatus2 = require("@ringcentral-integration/commons/enums/telephonyStatus");
var _ContactMatcher = require("@ringcentral-integration/commons/modules/ContactMatcher");
var _services = require("@ringcentral-integration/micro-auth/src/app/services");
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _helpers = require("../ActiveCallControl/helpers");
var _Webphone = require("../Webphone");
var _webphoneHelper = require("../Webphone/webphoneHelper");
var _utils = require("./utils");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec0, _dec1, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _class, _class2, _descriptor, _descriptor2;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var PreinsertCall = exports.PreinsertCall = (_dec = (0, _nextCore.injectable)({
  name: 'PreinsertCall'
}), _dec2 = function _dec2(target, key) {
  return (0, _nextCore.optional)()(target, undefined, 2);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _Webphone.Webphone === "undefined" ? Object : _Webphone.Webphone, typeof _services.NumberFormatter === "undefined" ? Object : _services.NumberFormatter, typeof _ContactMatcher.ContactMatcher === "undefined" ? Object : _ContactMatcher.ContactMatcher]), _dec5 = (0, _nextCore.dynamic)('CallMonitor'), _dec6 = Reflect.metadata("design:type", typeof CallMonitor === "undefined" ? Object : CallMonitor), _dec7 = Reflect.metadata("design:type", typeof Record === "undefined" ? Object : Record), _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [String, typeof PreinsertCallStatus === "undefined" ? Object : PreinsertCallStatus]), _dec0 = Reflect.metadata("design:type", Function), _dec1 = Reflect.metadata("design:paramtypes", [Array]), _dec10 = (0, _nextCore.delegate)('server'), _dec11 = Reflect.metadata("design:type", Function), _dec12 = Reflect.metadata("design:paramtypes", [String, typeof PreinsertCallStatus === "undefined" ? Object : PreinsertCallStatus]), _dec13 = Reflect.metadata("design:type", Function), _dec14 = Reflect.metadata("design:paramtypes", [String]), _dec15 = (0, _nextCore.delegate)('server'), _dec16 = Reflect.metadata("design:type", Function), _dec17 = Reflect.metadata("design:paramtypes", [String]), _dec18 = Reflect.metadata("design:type", Function), _dec19 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  function PreinsertCall(_webphone, _numberFormatter, _contactMatcher) {
    var _this;
    _classCallCheck(this, PreinsertCall);
    _this = _callSuper(this, PreinsertCall);
    _this._webphone = _webphone;
    _this._numberFormatter = _numberFormatter;
    _this._contactMatcher = _contactMatcher;
    _initializerDefineProperty(_this, "callMonitor", _descriptor, _this);
    _initializerDefineProperty(_this, "preinsertStatusMap", _descriptor2, _this);
    _this.preinsertStatusMap$ = (0, _nextCore.fromWatchValue)(_this, function () {
      return _this.preinsertStatusMap;
    });
    return _this;
  }
  _inherits(PreinsertCall, _RcModule);
  return _createClass(PreinsertCall, [{
    key: "_setPreinsert",
    value: function _setPreinsert(telephonySessionId, status) {
      this.preinsertStatusMap[telephonySessionId] = status;
    }
  }, {
    key: "cleanPreinsert",
    value: function cleanPreinsert(telephonySessionIds) {
      var _this2 = this;
      telephonySessionIds.forEach(function (telephonySessionId) {
        delete _this2.preinsertStatusMap[telephonySessionId];
      });
    }
  }, {
    key: "setPreinsert",
    value: function () {
      var _setPreinsert2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(telephonySessionId, status) {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              if (this.preinsertStatusMap[telephonySessionId] !== status) {
                this._setPreinsert(telephonySessionId, status);
              }
            case 1:
              return _context.a(2);
          }
        }, _callee, this);
      }));
      function setPreinsert(_x, _x2) {
        return _setPreinsert2.apply(this, arguments);
      }
      return setPreinsert;
    }()
  }, {
    key: "_removePreinsert",
    value: function _removePreinsert(telephonySessionId) {
      delete this.preinsertStatusMap[telephonySessionId];
    }
  }, {
    key: "removePreinsert",
    value: function () {
      var _removePreinsert2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(telephonySessionId) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              if (this.preinsertStatusMap[telephonySessionId]) {
                this._removePreinsert(telephonySessionId);
              }
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function removePreinsert(_x3) {
        return _removePreinsert2.apply(this, arguments);
      }
      return removePreinsert;
    }()
  }, {
    key: "preinsertCalls",
    get: function get() {
      var _this3 = this;
      return this._webphone.sessions.reduce(function (acc, session) {
        var _session$partyData;
        var telephonySessionId = (_session$partyData = session.partyData) === null || _session$partyData === void 0 ? void 0 : _session$partyData.sessionId;
        if (
        // non have telephonySessionId should preinsert
        !telephonySessionId ||
        // have id but not in activeCallControl.sessions, should preinsert
        telephonySessionId && !_this3.callMonitor.callsInfo.telephonySessionIdCallMap[telephonySessionId] && !_this3.isPreinsertStatusEnd(telephonySessionId) &&
        // only outbound call should preinsert, inbound currently not want that, that will got a blank call when inbound call
        session.direction === 'Outbound') {
          var _session$partyData2, _this3$_contactMatche, _this3$_contactMatche2, _session$partyData3;
          // normalize number for ensure the number is matcher mapping with same key
          var fromNumber = _this3._numberFormatter.normalizeNumber(session.from);
          var toNumber = _this3._numberFormatter.normalizeNumber(session.to);
          var direction = session.direction;
          var toName = '';
          var fromName = '';
          var partyId = (_session$partyData2 = session.partyData) === null || _session$partyData2 === void 0 ? void 0 : _session$partyData2.partyId;
          var contactMapping = (_this3$_contactMatche = (_this3$_contactMatche2 = _this3._contactMatcher) === null || _this3$_contactMatche2 === void 0 ? void 0 : _this3$_contactMatche2.dataMapping) !== null && _this3$_contactMatche !== void 0 ? _this3$_contactMatche : {};
          var fromMatches = fromNumber && contactMapping[fromNumber] || [];
          var toMatches = toNumber && contactMapping[toNumber] || [];
          var sessionId = (0, _utils.getPreinsertFakeId)(session.id);
          var callItem = {
            partyId: partyId,
            direction: direction,
            telephonySessionId: ((_session$partyData3 = session.partyData) === null || _session$partyData3 === void 0 ? void 0 : _session$partyData3.sessionId) || sessionId,
            toName: toName,
            fromName: fromName,
            from: {
              phoneNumber: fromNumber
            },
            to: {
              phoneNumber: toNumber
            },
            webphoneSession: session,
            startTime: (0, _webphoneHelper.getWebphoneSessionStartTime)(session),
            sessionId: sessionId,
            telephonyStatus: session.callStatus === _Webphone.sessionStatus.connected ? _telephonyStatus2.telephonyStatus.callConnected : _telephonyStatus2.telephonyStatus.ringing,
            fromMatches: fromMatches,
            toMatches: toMatches,
            activityMatches: []
          };
          acc.push(callItem);
        }
        return acc;
      }, []);
    }
  }, {
    key: "listenPreinsertFromWebphone",
    value: function listenPreinsertFromWebphone() {
      var _this4 = this;
      (0, _rxjs.merge)(this._webphone.invite$.pipe((0, _rxjs.concatMap)(function (session) {
        var _session$__rc_partyDa;
        var telephonySessionId = (_session$__rc_partyDa = session.__rc_partyData) === null || _session$__rc_partyDa === void 0 ? void 0 : _session$__rc_partyDa.sessionId;
        return (0, _rxjs.defer)(function () {
          // when not get telephonySessionId, need to wait for that have value
          if (!telephonySessionId) {
            var value$ = new _rxjs.Observable(function (subscriber) {
              var value = undefined;
              // Create property descriptor to track changes
              Object.defineProperty(session, '__rc_partyData', {
                get: function get() {
                  return value;
                },
                set: function set(val) {
                  value = val;
                  subscriber.next(val);
                }
              });
              return function () {
                // recover property descriptor
                Object.defineProperty(session, '__rc_partyData', {
                  value: value,
                  writable: true
                });
              };
            });
            return value$.pipe(
            // wait partyData have value
            (0, _rxjs.map)(function () {
              var _session$__rc_partyDa2;
              return (_session$__rc_partyDa2 = session.__rc_partyData) === null || _session$__rc_partyDa2 === void 0 ? void 0 : _session$__rc_partyDa2.sessionId;
            }), (0, _rxjs.filter)(Boolean));
          }
          return (0, _rxjs.of)(telephonySessionId);
        }).pipe((0, _rxjs.take)(1), (0, _rxjs.concatMap)(function (telephonySessionId) {
          return _this4.removePreinsert(telephonySessionId);
        }));
      })), this._webphone.end$.pipe((0, _rxjs.concatMap)(/*#__PURE__*/function () {
        var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(session) {
          var _session$__rc_partyDa3;
          var telephonySessionId;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                telephonySessionId = (_session$__rc_partyDa3 = session.__rc_partyData) === null || _session$__rc_partyDa3 === void 0 ? void 0 : _session$__rc_partyDa3.sessionId;
                _nextCore.logger.log("[".concat(_this4.identifier, "] end call trigger"), {
                  session: session,
                  telephonySessionId: telephonySessionId
                });
                if (!(!telephonySessionId ||
                // only when client side not have that data need to set end status, otherwise, use keep the current status, like ignore also trigger that, but that should keep as ignore, and switch should not trigger that
                _this4.preinsertStatusMap[telephonySessionId])) {
                  _context3.n = 1;
                  break;
                }
                return _context3.a(2);
              case 1:
                _nextCore.logger.log("[".concat(_this4.identifier, "] set client call status"), telephonySessionId);
                return _context3.a(2, _this4.setPreinsert(telephonySessionId, 'end'));
            }
          }, _callee3);
        }));
        return function (_x4) {
          return _ref.apply(this, arguments);
        };
      }()))).pipe(_nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "listenPreinsertServerHandler",
    value: function listenPreinsertServerHandler(sessionsMap$) {
      var _this5 = this;
      // clear not exist session id in preinsertStatusMap
      var clearPreinsertStatus$ = sessionsMap$.pipe((0, _rxjs.tap)(function (sessionsMap) {
        var clearIds = Object.keys(_this5.preinsertStatusMap).reduce(function (acc, source) {
          // the source is {telephonySessionId}_____{removedPartyId}, so need to split to get the telephonySessionId to ensure that the session is exist
          var _parseConferenceParti = (0, _utils.parseConferenceParticipantRemovalId)(source),
            telephonySessionId = _parseConferenceParti.telephonySessionId;
          // when not exist in sessionsMap, should remove that
          if (!sessionsMap[telephonySessionId]) {
            acc.push(source);
          }
          return acc;
        }, []);
        if (clearIds.length > 0) {
          _this5.cleanPreinsert(clearIds);
        }
      }));

      // when from not connected to connected, should remove the preinsert call status, because that be connect in other device
      var connectInOtherDevice$ = (0, _rxjs.combineLatest)([this.preinsertStatusMap$, sessionsMap$]).pipe((0, _rxjs.map)(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          preinsertStatusMap = _ref3[0],
          sessionsMap = _ref3[1];
        var preinsertEndSessionStatusMap = Object.entries(preinsertStatusMap).reduce(function (acc, _ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
            telephonySessionId = _ref5[0],
            status = _ref5[1];
          if (status === 'end') {
            var _session$party, _session$party$status;
            var session = sessionsMap[telephonySessionId];
            var _telephonyStatus = (0, _helpers.mapTelephonyStatus)(session === null || session === void 0 ? void 0 : (_session$party = session.party) === null || _session$party === void 0 ? void 0 : (_session$party$status = _session$party.status) === null || _session$party$status === void 0 ? void 0 : _session$party$status.code);
            acc[telephonySessionId] = _telephonyStatus;
          }
          return acc;
        }, {});
        return preinsertEndSessionStatusMap;
      }), (0, _rxjs.pairwise)(), (0, _rxjs.tap)(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
          prev = _ref7[0],
          current = _ref7[1];
        Object.entries(current).forEach(function (_ref8) {
          var _ref9 = _slicedToArray(_ref8, 2),
            telephonySessionId = _ref9[0],
            currTelephonyStatus = _ref9[1];
          var prevTelephonyStatus = prev[telephonySessionId];

          // when from not connected to connected, should remove the preinsert call status, because that be connect in other device
          if (prevTelephonyStatus && currTelephonyStatus && prevTelephonyStatus !== 'CallConnected' && currTelephonyStatus === 'CallConnected') {
            _nextCore.logger.log("[".concat(_this5.identifier, "] connected in other device, show that"), telephonySessionId);
            _this5._removePreinsert(telephonySessionId);
          }
        });
      }));
      (0, _rxjs.merge)(clearPreinsertStatus$, connectInOtherDevice$).pipe(_nextCore.takeUntilAppDestroy).subscribe();
    }
  }, {
    key: "isPreinsertStatusEnd",
    value: function isPreinsertStatusEnd(telephonySessionId) {
      var currStatus = this.preinsertStatusMap[telephonySessionId];
      return currStatus === 'end' ||
      // currStatus === 'forceTerminate' ||
      currStatus === 'partyRemoved';
    }
  }, {
    key: "isPreinsertStatusIgnored",
    value: function isPreinsertStatusIgnored(telephonySessionId) {
      var currStatus = this.preinsertStatusMap[telephonySessionId];
      return currStatus === 'ignore';
    }
  }, {
    key: "isBringInPartyPreinsertStatus",
    value: function isBringInPartyPreinsertStatus(telephonySessionId) {
      var currStatus = this.preinsertStatusMap[telephonySessionId];
      return currStatus === 'bringInParty';
    }
  }, {
    key: "checkParticipantStillExist",
    value: function checkParticipantStillExist(session, partyId) {
      var participantStatus = this.preinsertStatusMap[(0, _utils.createConferenceParticipantRemovalId)(session.id, partyId)];
      if (participantStatus === 'partyRemoved') {
        return false;
      }
      return true;
    }

    // TODO: outbound call still not completed
    // async isPreinsertCallBySessionId(telephonySessionId: string) {
    //   if (isPreinsertCallByTelephoneSessionId(telephonySessionId)) {
    //     this.setPreinsert(telephonySessionId, 'forceTerminate');
    //     // wait preinsert call telephonySessionId ready
    //     const readyPartyCall = await firstValueFrom(
    //       fromWatchValue(this, () => this.preinsertCalls).pipe(
    //         map((preinsertCalls) => {
    //           const partyReadyPreinsertItem = preinsertCalls.find((call) => {
    //             return Boolean(
    //               call.sessionId === telephonySessionId &&
    //                 // when that have party id and be connected
    //                 !isPreinsertCallByTelephoneSessionId(
    //                   call.telephonySessionId,
    //                 ) &&
    //                 // must wait that become connected then can hung up, otherwise server will emit error
    //                 call.telephonyStatus === telephonyStatus.callConnected,
    //             );
    //           });

    //           return partyReadyPreinsertItem;
    //         }),
    //         filter(Boolean),
    //         delay(0),
    //       ),
    //     );

    //     telephonySessionId = readyPartyCall.telephonySessionId!;
    //   }
    // }
  }]);
}(_nextCore.RcModule), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "callMonitor", [_dec5, _dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "preinsertStatusMap", [_nextCore.state, _dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setPreinsert", [_nextCore.action, _dec8, _dec9], Object.getOwnPropertyDescriptor(_class2.prototype, "_setPreinsert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "cleanPreinsert", [_nextCore.action, _dec0, _dec1], Object.getOwnPropertyDescriptor(_class2.prototype, "cleanPreinsert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "setPreinsert", [_dec10, _dec11, _dec12], Object.getOwnPropertyDescriptor(_class2.prototype, "setPreinsert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_removePreinsert", [_nextCore.action, _dec13, _dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "_removePreinsert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "removePreinsert", [_dec15, _dec16, _dec17], Object.getOwnPropertyDescriptor(_class2.prototype, "removePreinsert"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "preinsertCalls", [_nextCore.computed, _dec18, _dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "preinsertCalls"), _class2.prototype), _class2)) || _class) || _class) || _class) || _class);
//# sourceMappingURL=PreinsertCall.js.map
