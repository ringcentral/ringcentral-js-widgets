"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericMeeting = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _events = require("events");
var _background = _interopRequireDefault(require("../../lib/background"));
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _RcVideo = require("../RcVideo");
var _GenericMeeting = require("./GenericMeeting.interface");
var _genericMeetingStatus = require("./genericMeetingStatus");
var _dec, _class, _class2, _descriptor;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _initializerDefineProperty(e, i, r, l) { r && Object.defineProperty(e, i, { enumerable: r.enumerable, configurable: r.configurable, writable: r.writable, value: r.initializer ? r.initializer.call(l) : void 0 }); }
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
function _initializerWarningHelper(r, e) { throw Error("Decorating class property failed. Please ensure that transform-class-properties is enabled and runs after the decorators transform."); }
var GenericMeeting = (_dec = (0, _di.Module)({
  name: 'GenericMeeting',
  deps: ['VideoConfiguration', 'ExtensionInfo', 'Brand', 'Meeting', 'RcVideo', {
    dep: 'GenericMeetingOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(GenericMeeting, _RcModuleV);
  var _super = _createSuper(GenericMeeting);
  function GenericMeeting(deps) {
    var _deps$genericMeetingO, _deps$genericMeetingO2;
    var _this;
    _classCallCheck(this, GenericMeeting);
    _this = _super.call(this, {
      deps: deps,
      enableCache: (_deps$genericMeetingO = (_deps$genericMeetingO2 = deps.genericMeetingOptions) === null || _deps$genericMeetingO2 === void 0 ? void 0 : _deps$genericMeetingO2.enableCache) !== null && _deps$genericMeetingO !== void 0 ? _deps$genericMeetingO : false,
      storageKey: 'genericMeeting'
    });
    _this._eventEmitter = new _events.EventEmitter();
    _initializerDefineProperty(_this, "updatingStatus", _descriptor, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(GenericMeeting, [{
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
      var _reload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this._meetingModule.reload());
              case 1:
              case "end":
                return _context.stop();
            }
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
      var _switchUsePersonalMeetingId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(usePersonalMeetingId) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._meetingModule.switchUsePersonalMeetingId(usePersonalMeetingId);
              case 1:
              case "end":
                return _context2.stop();
            }
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
      var _turnOnE2ee = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.isRCM) {
                  _context3.next = 2;
                  break;
                }
                return _context3.abrupt("return");
              case 2:
                _context3.next = 4;
                return this._meetingModule.turnOnE2ee();
              case 4:
              case "end":
                return _context3.stop();
            }
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
      var _deleteMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(meetingId) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.isRCV) {
                  _context4.next = 2;
                  break;
                }
                return _context4.abrupt("return");
              case 2:
                _context4.next = 4;
                return this._meetingModule.deleteMeeting(meetingId);
              case 4:
              case "end":
                return _context4.stop();
            }
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
      var _updateScheduleFor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(userExtensionId) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (this._meetingModule.updateScheduleFor) {
                  _context5.next = 2;
                  break;
                }
                return _context5.abrupt("return");
              case 2:
                this.setUpdatingStatus();
                if (!this.isRCM) {
                  _context5.next = 8;
                  break;
                }
                _context5.next = 6;
                return this._meetingModule.updateScheduleFor(userExtensionId);
              case 6:
                _context5.next = 15;
                break;
              case 8:
                if (!this.isRCV) {
                  _context5.next = 13;
                  break;
                }
                _context5.next = 11;
                return this._meetingModule.updateScheduleFor(userExtensionId);
              case 11:
                _context5.next = 15;
                break;
              case 13:
                console.error('Unknown meeting provider, please check module runtime');
                return _context5.abrupt("return");
              case 15:
                this.setIdleStatus();
              case 16:
              case "end":
                return _context5.stop();
            }
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
      var _updateMeetingSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(meeting) {
        var patch,
          _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                patch = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : true;
                if (this.isRCM) {
                  this._deps.meeting.update(meeting);
                }
                if (this.isRCV) {
                  this._deps.rcVideo.updateMeetingSettings(meeting, patch);
                }
              case 3:
              case "end":
                return _context6.stop();
            }
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
      var _updatePersonalMeetingSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(pmiMeeting) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this.isRCM) {
                  _context7.next = 2;
                  break;
                }
                return _context7.abrupt("return");
              case 2:
                if (this.isRCV) {
                  this._deps.rcVideo.updatePersonalMeetingSettings(pmiMeeting);
                }
              case 3:
              case "end":
                return _context7.stop();
            }
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
      var _schedule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(meeting, config, opener) {
        var result, rcvMeetingInfo, _this$_deps$rcVideo$p;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this.isRCM) {
                  _context8.next = 6;
                  break;
                }
                _context8.next = 3;
                return this._deps.meeting.schedule(meeting, config);
              case 3:
                result = _context8.sent;
                _context8.next = 21;
                break;
              case 6:
                if (!this.isRCV) {
                  _context8.next = 19;
                  break;
                }
                rcvMeetingInfo = meeting;
                if (!rcvMeetingInfo.usePersonalMeetingId) {
                  _context8.next = 14;
                  break;
                }
                _context8.next = 11;
                return this._deps.rcVideo.updateMeeting( // @ts-expect-error TS(2345): Argument of type 'string | null | undefined' is no... Remove this comment to see the full error message
                (_this$_deps$rcVideo$p = this._deps.rcVideo.personalMeeting) === null || _this$_deps$rcVideo$p === void 0 ? void 0 : _this$_deps$rcVideo$p.id, rcvMeetingInfo, config);
              case 11:
                result = _context8.sent;
                _context8.next = 17;
                break;
              case 14:
                _context8.next = 16;
                return this._deps.rcVideo.createMeeting(meeting, config);
              case 16:
                result = _context8.sent;
              case 17:
                _context8.next = 21;
                break;
              case 19:
                console.error('Unknown meeting provider, please check module runtime');
                return _context8.abrupt("return");
              case 21:
                if (result) {
                  result.scheduleOriginalInfo = meeting;
                  this._eventEmitter.emit(_GenericMeeting.MeetingEvents.afterSchedule, result, opener);
                } else if (opener && opener.close) {
                  opener.close();
                }
                return _context8.abrupt("return", result);
              case 23:
              case "end":
                return _context8.stop();
            }
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
      var _startMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(meeting) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!this.isRCM) {
                  _context9.next = 2;
                  break;
                }
                return _context9.abrupt("return", this._deps.meeting.schedule(meeting));
              case 2:
                if (!this.isRCV) {
                  _context9.next = 4;
                  break;
                }
                return _context9.abrupt("return", this._deps.rcVideo.startMeeting(meeting));
              case 4:
                return _context9.abrupt("return", null);
              case 5:
              case "end":
                return _context9.stop();
            }
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
      var _getMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(meetingId) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", this._meetingModule.getMeeting(meetingId));
              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));
      function getMeeting(_x10) {
        return _getMeeting.apply(this, arguments);
      }
      return getMeeting;
    }()
  }, {
    key: "getMeetingServiceInfo",
    value: function () {
      var _getMeetingServiceInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!this.isRCM) {
                  _context11.next = 2;
                  break;
                }
                return _context11.abrupt("return", this._meetingModule.getMeetingServiceInfo());
              case 2:
                throw new Error('Unknown meeting provider, please check the module runtime');
              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));
      function getMeetingServiceInfo() {
        return _getMeetingServiceInfo.apply(this, arguments);
      }
      return getMeetingServiceInfo;
    }()
  }, {
    key: "updateMeeting",
    value: function () {
      var _updateMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(meetingId, meeting, config, opener) {
        var result;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (!this.isRCM) {
                  _context12.next = 6;
                  break;
                }
                _context12.next = 3;
                return this._deps.meeting.updateMeeting(meetingId, meeting, config);
              case 3:
                result = _context12.sent;
                _context12.next = 14;
                break;
              case 6:
                if (!this.isRCV) {
                  _context12.next = 12;
                  break;
                }
                _context12.next = 9;
                return this._deps.rcVideo.updateMeeting(meetingId, meeting, config);
              case 9:
                result = _context12.sent;
                _context12.next = 14;
                break;
              case 12:
                console.error('Unknown meeting provider, please check module runtime');
                return _context12.abrupt("return");
              case 14:
                if (result) {
                  this._eventEmitter.emit(_GenericMeeting.MeetingEvents.afterUpdate, result, opener);
                } else if (opener && opener.close) {
                  opener.close();
                }
                return _context12.abrupt("return", result);
              case 16:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));
      function updateMeeting(_x11, _x12, _x13, _x14) {
        return _updateMeeting.apply(this, arguments);
      }
      return updateMeeting;
    }()
  }, {
    key: "addScheduledCallBack",
    value: function addScheduledCallBack(cb) {
      this._eventEmitter.on(_GenericMeeting.MeetingEvents.afterSchedule, cb);
    }
  }, {
    key: "removeScheduledCallBack",
    value: function removeScheduledCallBack(cb) {
      this._eventEmitter.removeListener(_GenericMeeting.MeetingEvents.afterSchedule, cb);
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
  return GenericMeeting;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "updatingStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _genericMeetingStatus.genericMeetingStatus.idle;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setMeetingUpdatingStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setMeetingUpdatingStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "init", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchUsePersonalMeetingId", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "switchUsePersonalMeetingId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "turnOnE2ee", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "turnOnE2ee"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateScheduleFor", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateScheduleFor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeetingSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeetingSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updatePersonalMeetingSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updatePersonalMeetingSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "schedule", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "schedule"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeetingServiceInfo", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeetingServiceInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype)), _class2)) || _class);
exports.GenericMeeting = GenericMeeting;
//# sourceMappingURL=GenericMeeting.js.map
