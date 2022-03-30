"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericMeeting = void 0;

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

var _events = require("events");

var _core = require("@ringcentral-integration/core");

var _background = _interopRequireDefault(require("../../lib/background"));

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _RcVideoV = require("../RcVideoV2");

var _GenericMeeting = require("./GenericMeeting.interface");

var _genericMeetingStatus = require("./genericMeetingStatus");

var _dec, _class, _class2, _descriptor;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

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
    key: "schedule",
    value: function () {
      var _schedule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(meeting, config, opener) {
        var result, rcvMeetingInfo, _this$_deps$rcVideo$p;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!this.isRCM) {
                  _context7.next = 6;
                  break;
                }

                _context7.next = 3;
                return this._deps.meeting.schedule(meeting, config);

              case 3:
                result = _context7.sent;
                _context7.next = 21;
                break;

              case 6:
                if (!this.isRCV) {
                  _context7.next = 19;
                  break;
                }

                rcvMeetingInfo = meeting;

                if (!rcvMeetingInfo.usePersonalMeetingId) {
                  _context7.next = 14;
                  break;
                }

                _context7.next = 11;
                return this._deps.rcVideo.updateMeeting((_this$_deps$rcVideo$p = this._deps.rcVideo.personalMeeting) === null || _this$_deps$rcVideo$p === void 0 ? void 0 : _this$_deps$rcVideo$p.id, rcvMeetingInfo, config);

              case 11:
                result = _context7.sent;
                _context7.next = 17;
                break;

              case 14:
                _context7.next = 16;
                return this._deps.rcVideo.createMeeting(meeting, config);

              case 16:
                result = _context7.sent;

              case 17:
                _context7.next = 21;
                break;

              case 19:
                console.error('Unknown meeting provider, please check module runtime');
                return _context7.abrupt("return");

              case 21:
                if (result) {
                  this._eventEmitter.emit(_GenericMeeting.MeetingEvents.afterSchedule, result, opener);
                } else if (opener && opener.close) {
                  opener.close();
                }

                return _context7.abrupt("return", result);

              case 23:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function schedule(_x5, _x6, _x7) {
        return _schedule.apply(this, arguments);
      }

      return schedule;
    }()
  }, {
    key: "startMeeting",
    value: function () {
      var _startMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(meeting) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!this.isRCM) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return", this._deps.meeting.schedule(meeting));

              case 2:
                if (!this.isRCV) {
                  _context8.next = 4;
                  break;
                }

                return _context8.abrupt("return", this._deps.rcVideo.startMeeting(meeting));

              case 4:
                return _context8.abrupt("return", null);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function startMeeting(_x8) {
        return _startMeeting.apply(this, arguments);
      }

      return startMeeting;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(meetingId) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", this._meetingModule.getMeeting(meetingId));

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getMeeting(_x9) {
        return _getMeeting.apply(this, arguments);
      }

      return getMeeting;
    }()
  }, {
    key: "getMeetingServiceInfo",
    value: function () {
      var _getMeetingServiceInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!this.isRCM) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return", this._meetingModule.getMeetingServiceInfo());

              case 2:
                throw new Error('Unknown meeting provider, please check the module runtime');

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getMeetingServiceInfo() {
        return _getMeetingServiceInfo.apply(this, arguments);
      }

      return getMeetingServiceInfo;
    }()
  }, {
    key: "updateMeeting",
    value: function () {
      var _updateMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(meetingId, meeting, config, opener) {
        var result;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!this.isRCM) {
                  _context11.next = 6;
                  break;
                }

                _context11.next = 3;
                return this._deps.meeting.updateMeeting(meetingId, meeting, config);

              case 3:
                result = _context11.sent;
                _context11.next = 14;
                break;

              case 6:
                if (!this.isRCV) {
                  _context11.next = 12;
                  break;
                }

                _context11.next = 9;
                return this._deps.rcVideo.updateMeeting(meetingId, meeting, config);

              case 9:
                result = _context11.sent;
                _context11.next = 14;
                break;

              case 12:
                console.error('Unknown meeting provider, please check module runtime');
                return _context11.abrupt("return");

              case 14:
                if (result) {
                  this._eventEmitter.emit(_GenericMeeting.MeetingEvents.afterUpdate, result, opener);
                } else if (opener && opener.close) {
                  opener.close();
                }

                return _context11.abrupt("return", result);

              case 16:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function updateMeeting(_x10, _x11, _x12, _x13) {
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
      return (0, _RcVideoV.generateRandomPassword)();
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this.pending && this._deps.brand.ready && this._deps.extensionInfo.ready && this._deps.videoConfiguration.ready && this._deps.videoConfiguration.provider && this._meetingModule && this._meetingModule.ready;
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

      return (_this$personalMeeting = this.personalMeeting) === null || _this$personalMeeting === void 0 ? void 0 : _this$personalMeeting.shortId;
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
}), _applyDecoratedDescriptor(_class2.prototype, "setMeetingUpdatingStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setMeetingUpdatingStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "init", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchUsePersonalMeetingId", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "switchUsePersonalMeetingId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "turnOnE2ee", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "turnOnE2ee"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "deleteMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "deleteMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateScheduleFor", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateScheduleFor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeetingSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeetingSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "schedule", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "schedule"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeetingServiceInfo", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeetingServiceInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype)), _class2)) || _class);
exports.GenericMeeting = GenericMeeting;
//# sourceMappingURL=GenericMeeting.js.map
