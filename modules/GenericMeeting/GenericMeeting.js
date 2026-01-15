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
exports.GenericMeeting = void 0;
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _core = require("@ringcentral-integration/core");
var _events = require("events");
var _background = _interopRequireDefault(require("../../lib/background"));
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _RcVideo = require("../RcVideo");
var _GenericMeeting2 = require("./GenericMeeting.interface");
var _genericMeetingStatus = require("./genericMeetingStatus");
var _dec, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var GenericMeeting = exports.GenericMeeting = (_dec = (0, _di.Module)({
  name: 'GenericMeeting',
  deps: ['VideoConfiguration', 'ExtensionInfo', 'Brand', 'Meeting', 'RcVideo', {
    dep: 'GenericMeetingOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  function GenericMeeting(deps) {
    var _deps$genericMeetingO, _deps$genericMeetingO2;
    var _this;
    _classCallCheck(this, GenericMeeting);
    _this = _callSuper(this, GenericMeeting, [{
      deps: deps,
      enableCache: (_deps$genericMeetingO = (_deps$genericMeetingO2 = deps.genericMeetingOptions) === null || _deps$genericMeetingO2 === void 0 ? void 0 : _deps$genericMeetingO2.enableCache) !== null && _deps$genericMeetingO !== void 0 ? _deps$genericMeetingO : false,
      storageKey: 'genericMeeting'
    }]);
    _this._eventEmitter = new _events.EventEmitter();
    _initializerDefineProperty(_this, "updatingStatus", _descriptor, _this);
    return _this;
  }
  _inherits(GenericMeeting, _RcModuleV);
  return _createClass(GenericMeeting, [{
    key: "setMeetingUpdatingStatus",
    value: function setMeetingUpdatingStatus(status) {
      this.updatingStatus = status;
    }
  }, {
    key: "init",
    value: function init() {
      return this._meetingModule.init();
    }
  }, {
    key: "reload",
    value: function () {
      var _reload = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              return _context.a(2, this._meetingModule.reload());
          }
        }, _callee, this);
      }));
      function reload() {
        return _reload.apply(this, arguments);
      }
      return reload;
    }()
  }, {
    key: "switchUsePersonalMeetingId",
    value: function () {
      var _switchUsePersonalMeetingId = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(usePersonalMeetingId) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              this._meetingModule.switchUsePersonalMeetingId(usePersonalMeetingId);
            case 1:
              return _context2.a(2);
          }
        }, _callee2, this);
      }));
      function switchUsePersonalMeetingId(_x) {
        return _switchUsePersonalMeetingId.apply(this, arguments);
      }
      return switchUsePersonalMeetingId;
    }()
  }, {
    key: "turnOnE2ee",
    value: function () {
      var _turnOnE2ee = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              if (!this.isRCM) {
                _context3.n = 1;
                break;
              }
              return _context3.a(2);
            case 1:
              _context3.n = 2;
              return this._meetingModule.turnOnE2ee();
            case 2:
              return _context3.a(2);
          }
        }, _callee3, this);
      }));
      function turnOnE2ee() {
        return _turnOnE2ee.apply(this, arguments);
      }
      return turnOnE2ee;
    }()
  }, {
    key: "deleteMeeting",
    value: function () {
      var _deleteMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(meetingId) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              if (!this.isRCV) {
                _context4.n = 1;
                break;
              }
              return _context4.a(2);
            case 1:
              _context4.n = 2;
              return this._meetingModule.deleteMeeting(meetingId);
            case 2:
              return _context4.a(2);
          }
        }, _callee4, this);
      }));
      function deleteMeeting(_x2) {
        return _deleteMeeting.apply(this, arguments);
      }
      return deleteMeeting;
    }()
  }, {
    key: "updateScheduleFor",
    value: function () {
      var _updateScheduleFor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(userExtensionId) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              if (this._meetingModule.updateScheduleFor) {
                _context5.n = 1;
                break;
              }
              return _context5.a(2);
            case 1:
              this.setUpdatingStatus();
              if (!this.isRCM) {
                _context5.n = 3;
                break;
              }
              _context5.n = 2;
              return this._meetingModule.updateScheduleFor(userExtensionId);
            case 2:
              _context5.n = 6;
              break;
            case 3:
              if (!this.isRCV) {
                _context5.n = 5;
                break;
              }
              _context5.n = 4;
              return this._meetingModule.updateScheduleFor(userExtensionId);
            case 4:
              _context5.n = 6;
              break;
            case 5:
              console.error('Unknown meeting provider, please check module runtime');
              return _context5.a(2);
            case 6:
              this.setIdleStatus();
            case 7:
              return _context5.a(2);
          }
        }, _callee5, this);
      }));
      function updateScheduleFor(_x3) {
        return _updateScheduleFor.apply(this, arguments);
      }
      return updateScheduleFor;
    }()
  }, {
    key: "updateMeetingSettings",
    value: function () {
      var _updateMeetingSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(meeting) {
        var patch,
          _args6 = arguments;
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              patch = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : true;
              if (this.isRCM) {
                this._deps.meeting.update(meeting);
              }
              if (this.isRCV) {
                this._deps.rcVideo.updateMeetingSettings(meeting, patch);
              }
            case 1:
              return _context6.a(2);
          }
        }, _callee6, this);
      }));
      function updateMeetingSettings(_x4) {
        return _updateMeetingSettings.apply(this, arguments);
      }
      return updateMeetingSettings;
    }()
  }, {
    key: "updatePersonalMeetingSettings",
    value: function () {
      var _updatePersonalMeetingSettings = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(pmiMeeting) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              if (!this.isRCM) {
                _context7.n = 1;
                break;
              }
              return _context7.a(2);
            case 1:
              if (this.isRCV) {
                this._deps.rcVideo.updatePersonalMeetingSettings(pmiMeeting);
              }
            case 2:
              return _context7.a(2);
          }
        }, _callee7, this);
      }));
      function updatePersonalMeetingSettings(_x5) {
        return _updatePersonalMeetingSettings.apply(this, arguments);
      }
      return updatePersonalMeetingSettings;
    }()
  }, {
    key: "schedule",
    value: function () {
      var _schedule = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(meeting, config, opener) {
        var result, rcvMeetingInfo, _this$_deps$rcVideo$p;
        return _regenerator().w(function (_context8) {
          while (1) switch (_context8.n) {
            case 0:
              if (!this.isRCM) {
                _context8.n = 2;
                break;
              }
              _context8.n = 1;
              return this._deps.meeting.schedule(meeting, config);
            case 1:
              result = _context8.v;
              _context8.n = 8;
              break;
            case 2:
              if (!this.isRCV) {
                _context8.n = 7;
                break;
              }
              rcvMeetingInfo = meeting;
              if (!rcvMeetingInfo.usePersonalMeetingId) {
                _context8.n = 4;
                break;
              }
              _context8.n = 3;
              return this._deps.rcVideo.updateMeeting(// @ts-expect-error TS(2345): Argument of type 'string | null | undefined' is no... Remove this comment to see the full error message
              (_this$_deps$rcVideo$p = this._deps.rcVideo.personalMeeting) === null || _this$_deps$rcVideo$p === void 0 ? void 0 : _this$_deps$rcVideo$p.id, rcvMeetingInfo, config);
            case 3:
              result = _context8.v;
              _context8.n = 6;
              break;
            case 4:
              _context8.n = 5;
              return this._deps.rcVideo.createMeeting(meeting, config);
            case 5:
              result = _context8.v;
            case 6:
              _context8.n = 8;
              break;
            case 7:
              console.error('Unknown meeting provider, please check module runtime');
              return _context8.a(2);
            case 8:
              if (result) {
                result.scheduleOriginalInfo = meeting;
                this._eventEmitter.emit(_GenericMeeting2.MeetingEvents.afterSchedule, result, opener);
              } else if (opener && opener.close) {
                opener.close();
              }
              return _context8.a(2, result);
          }
        }, _callee8, this);
      }));
      function schedule(_x6, _x7, _x8) {
        return _schedule.apply(this, arguments);
      }
      return schedule;
    }()
  }, {
    key: "startMeeting",
    value: function () {
      var _startMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(meeting) {
        return _regenerator().w(function (_context9) {
          while (1) switch (_context9.n) {
            case 0:
              if (!this.isRCM) {
                _context9.n = 1;
                break;
              }
              return _context9.a(2, this._deps.meeting.schedule(meeting));
            case 1:
              if (!this.isRCV) {
                _context9.n = 2;
                break;
              }
              return _context9.a(2, this._deps.rcVideo.startMeeting(meeting));
            case 2:
              return _context9.a(2, null);
          }
        }, _callee9, this);
      }));
      function startMeeting(_x9) {
        return _startMeeting.apply(this, arguments);
      }
      return startMeeting;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(meetingId) {
        return _regenerator().w(function (_context0) {
          while (1) switch (_context0.n) {
            case 0:
              return _context0.a(2, this._meetingModule.getMeeting(meetingId));
          }
        }, _callee0, this);
      }));
      function getMeeting(_x0) {
        return _getMeeting.apply(this, arguments);
      }
      return getMeeting;
    }()
  }, {
    key: "getMeetingServiceInfo",
    value: function () {
      var _getMeetingServiceInfo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
        return _regenerator().w(function (_context1) {
          while (1) switch (_context1.n) {
            case 0:
              if (!this.isRCM) {
                _context1.n = 1;
                break;
              }
              return _context1.a(2, this._meetingModule.getMeetingServiceInfo());
            case 1:
              throw new Error('Unknown meeting provider, please check the module runtime');
            case 2:
              return _context1.a(2);
          }
        }, _callee1, this);
      }));
      function getMeetingServiceInfo() {
        return _getMeetingServiceInfo.apply(this, arguments);
      }
      return getMeetingServiceInfo;
    }()
  }, {
    key: "updateMeeting",
    value: function () {
      var _updateMeeting = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(meetingId, meeting, config, opener) {
        var result;
        return _regenerator().w(function (_context10) {
          while (1) switch (_context10.n) {
            case 0:
              if (!this.isRCM) {
                _context10.n = 2;
                break;
              }
              _context10.n = 1;
              return this._deps.meeting.updateMeeting(meetingId, meeting, config);
            case 1:
              result = _context10.v;
              _context10.n = 5;
              break;
            case 2:
              if (!this.isRCV) {
                _context10.n = 4;
                break;
              }
              _context10.n = 3;
              return this._deps.rcVideo.updateMeeting(meetingId, meeting, config);
            case 3:
              result = _context10.v;
              _context10.n = 5;
              break;
            case 4:
              console.error('Unknown meeting provider, please check module runtime');
              return _context10.a(2);
            case 5:
              if (result) {
                this._eventEmitter.emit(_GenericMeeting2.MeetingEvents.afterUpdate, result, opener);
              } else if (opener && opener.close) {
                opener.close();
              }
              return _context10.a(2, result);
          }
        }, _callee10, this);
      }));
      function updateMeeting(_x1, _x10, _x11, _x12) {
        return _updateMeeting.apply(this, arguments);
      }
      return updateMeeting;
    }()
  }, {
    key: "addScheduledCallBack",
    value: function addScheduledCallBack(cb) {
      this._eventEmitter.on(_GenericMeeting2.MeetingEvents.afterSchedule, cb);
    }
  }, {
    key: "removeScheduledCallBack",
    value: function removeScheduledCallBack(cb) {
      this._eventEmitter.removeListener(_GenericMeeting2.MeetingEvents.afterSchedule, cb);
    }
  }, {
    key: "validatePasswordSettings",
    value: function validatePasswordSettings(password, isSecret) {
      return this._meetingModule.validatePasswordSettings(password, isSecret);
    }
  }, {
    key: "updateHasSettingsChanged",
    value: function updateHasSettingsChanged(isChanged) {
      if (this.isRCM) {
        // rcm doesn't support update disabled status yet
        return;
      }
      return this.isRCV && this._meetingModule.updateHasSettingsChanged(isChanged);
    }
  }, {
    key: "generateRcvMeetingPassword",
    value: function generateRcvMeetingPassword() {
      return (0, _RcVideo.generateRandomPassword)();
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(this.pending && this._deps.brand.ready && this._deps.extensionInfo.ready && this._deps.videoConfiguration.ready && this._deps.videoConfiguration.provider && this._meetingModule && this._meetingModule.ready);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return this.ready && (!this._deps.brand.ready || !this._deps.extensionInfo.ready || !this._deps.videoConfiguration.ready || !this._deps.videoConfiguration.provider || this._meetingModule && !this._meetingModule.ready);
    }
  }, {
    key: "setUpdatingStatus",
    value: function setUpdatingStatus() {
      this.setMeetingUpdatingStatus(_genericMeetingStatus.genericMeetingStatus.updating);
    }
  }, {
    key: "setIdleStatus",
    value: function setIdleStatus() {
      this.setMeetingUpdatingStatus(_genericMeetingStatus.genericMeetingStatus.idle);
    }
  }, {
    key: "setUpdatedStatus",
    value: function setUpdatedStatus() {
      this.setMeetingUpdatingStatus(_genericMeetingStatus.genericMeetingStatus.updated);
    }
  }, {
    key: "meetingProviderType",
    get: function get() {
      return this._deps.videoConfiguration.provider;
    }
  }, {
    key: "isRCV",
    get: function get() {
      return this._deps.videoConfiguration.isRCV;
    }
  }, {
    key: "isRCM",
    get: function get() {
      return this._deps.videoConfiguration.isRCM;
    }
  }, {
    key: "extensionInfo",
    get: function get() {
      return this._deps.extensionInfo.info;
    }
  }, {
    key: "_meetingModule",
    get: function get() {
      if (this.isRCM) {
        return this._deps.meeting;
      }
      if (this.isRCV) {
        return this._deps.rcVideo;
      }
      throw new Error('Unknown meeting provider, please check the module runtime');
    }
  }, {
    key: "meeting",
    get: function get() {
      return this._meetingModule.meeting;
    }
  }, {
    key: "defaultTopic",
    get: function get() {
      return this._meetingModule.defaultTopic;
    }
  }, {
    key: "delegators",
    get: function get() {
      return this._meetingModule.delegators;
    }
  }, {
    key: "defaultSetting",
    get: function get() {
      if (this.isRCM) {
        return this._deps.meeting.defaultMeetingSetting;
      }
      if (this.isRCV) {
        return this._deps.rcVideo.defaultVideoSetting;
      }
      return null;
    }
  }, {
    key: "isScheduling",
    get: function get() {
      return !!this._meetingModule.isScheduling;
    }
  }, {
    key: "showSaveAsDefault",
    get: function get() {
      return !!this._meetingModule.showSaveAsDefault;
    }
  }, {
    key: "isPreferencesChanged",
    get: function get() {
      return !!this._meetingModule.isPreferencesChanged;
    }
  }, {
    key: "brandName",
    get: function get() {
      return this._deps.brand.name;
    }
  }, {
    key: "enableServiceWebSettings",
    get: function get() {
      return !!this._meetingModule.enableServiceWebSettings;
    }
  }, {
    key: "enablePersonalMeeting",
    get: function get() {
      return !!this._meetingModule.enablePersonalMeeting;
    }
  }, {
    key: "enableWaitingRoom",
    get: function get() {
      if (this.isRCV) {
        return this._deps.rcVideo.enableWaitingRoom;
      }
      return false;
    }
  }, {
    key: "enableE2EE",
    get: function get() {
      if (this.isRCV) {
        return this._deps.rcVideo.enableE2EE;
      }
      return false;
    }
  }, {
    key: "personalMeeting",
    get: function get() {
      return this._meetingModule.personalMeeting;
    }
  }, {
    key: "personalMeetingId",
    get: function get() {
      var _this$personalMeeting;
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
      return (_this$personalMeeting = this.personalMeeting) === null || _this$personalMeeting === void 0 ? void 0 : _this$personalMeeting.shortId;
    }
  }, {
    key: "personalMeetingName",
    get: function get() {
      var _this$personalMeeting2;
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to type 'string'
      return (_this$personalMeeting2 = this.personalMeeting) === null || _this$personalMeeting2 === void 0 ? void 0 : _this$personalMeeting2.personalMeetingName;
    }
  }, {
    key: "personalMeetingLink",
    get: function get() {
      var _this$personalMeeting3;
      // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to type 'string'
      return (_this$personalMeeting3 = this.personalMeeting) === null || _this$personalMeeting3 === void 0 ? void 0 : _this$personalMeeting3.joinUri;
    }
  }, {
    key: "personalMeetingSettings",
    get: function get() {
      if (this.isRCM) {
        return this._deps.meeting.pmiDefaultSettings;
      }
      if (this.isRCV) {
        return this._deps.rcVideo.personalVideoSetting;
      }
      return null;
    }
  }, {
    key: "isUpdating",
    get: function get() {
      return this.updatingStatus === _genericMeetingStatus.genericMeetingStatus.updating;
    }
  }, {
    key: "hasSettingsChanged",
    get: function get() {
      if (this.isRCM) {
        // rcm doesn't support update button disabled status yet
        return true;
      }
      return this.isRCV && this._meetingModule.hasSettingsChanged;
    }
  }]);
}(_core.RcModuleV2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "updatingStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _genericMeetingStatus.genericMeetingStatus.idle;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setMeetingUpdatingStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setMeetingUpdatingStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "init", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchUsePersonalMeetingId", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "switchUsePersonalMeetingId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "turnOnE2ee", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "turnOnE2ee"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateScheduleFor", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateScheduleFor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeetingSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeetingSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updatePersonalMeetingSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updatePersonalMeetingSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "schedule", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "schedule"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeetingServiceInfo", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeetingServiceInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype), _class2)) || _class);
//# sourceMappingURL=GenericMeeting.js.map
