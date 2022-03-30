"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

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

var _background = _interopRequireDefault(require("../../lib/background"));

var _di = require("../../lib/di");

var _proxify = require("../../lib/proxy/proxify");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _actionTypes = require("./actionTypes");

var _genericMeetingStatus = require("./genericMeetingStatus");

var _getGenericMeetingReducer = _interopRequireDefault(require("./getGenericMeetingReducer"));

var _interface = require("./interface");

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var GenericMeeting = (_dec = (0, _di.Module)({
  deps: ['MeetingProvider', 'ExtensionInfo', 'Brand', 'Meeting', 'RcVideo']
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModule) {
  _inherits(GenericMeeting, _RcModule);

  var _super = _createSuper(GenericMeeting);

  function GenericMeeting(_ref) {
    var _this;

    var meeting = _ref.meeting,
        meetingProvider = _ref.meetingProvider,
        rcVideo = _ref.rcVideo,
        brand = _ref.brand,
        reducers = _ref.reducers,
        extensionInfo = _ref.extensionInfo,
        options = _objectWithoutProperties(_ref, ["meeting", "meetingProvider", "rcVideo", "brand", "reducers", "extensionInfo"]);

    _classCallCheck(this, GenericMeeting);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: options.actionTypes || _actionTypes.actionTypes
    }));
    _this._meetingProvider = void 0;
    _this._meeting = void 0;
    _this._rcVideo = void 0;
    _this._brand = void 0;
    _this._extensionInfo = void 0;
    _this._eventEmitter = new _events.EventEmitter();
    _this._reducer = (0, _getGenericMeetingReducer["default"])(_this.actionTypes, reducers);
    _this._meeting = meeting;
    _this._meetingProvider = meetingProvider;
    _this._rcVideo = rcVideo;
    _this._brand = brand;
    _this._extensionInfo = extensionInfo;
    return _this;
  }

  _createClass(GenericMeeting, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "init",
    value: function init() {
      return this._meetingModule.init();
    }
  }, {
    key: "reload",
    value: function reload() {
      return this._meetingModule.reload();
    }
  }, {
    key: "switchUsePersonalMeetingId",
    value: function switchUsePersonalMeetingId(usePersonalMeetingId) {
      this._meetingModule.switchUsePersonalMeetingId(usePersonalMeetingId);
    }
  }, {
    key: "updateScheduleFor",
    value: function () {
      var _updateScheduleFor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userExtensionId) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this._meetingModule.updateScheduleFor) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                this.store.dispatch({
                  type: this.actionTypes.initUpdating
                });
                _context.next = 5;
                return this._meetingModule.updateScheduleFor(userExtensionId);

              case 5:
                this.store.dispatch({
                  type: this.actionTypes.updated
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateScheduleFor(_x) {
        return _updateScheduleFor.apply(this, arguments);
      }

      return updateScheduleFor;
    }()
  }, {
    key: "updateMeetingSettings",
    value: function updateMeetingSettings(meeting) {
      var patch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (this.isRCM) {
        this._meeting.update(meeting);
      }

      if (this.isRCV) {
        this._rcVideo.updateMeetingSettings(meeting, patch);
      }
    }
  }, {
    key: "schedule",
    value: function () {
      var _schedule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(meeting, config, opener) {
        var result, rcvMeetingInfo, _this$_rcVideo$person;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.isRCM) {
                  _context2.next = 6;
                  break;
                }

                _context2.next = 3;
                return this._meeting.schedule(meeting, config);

              case 3:
                result = _context2.sent;
                _context2.next = 21;
                break;

              case 6:
                if (!this.isRCV) {
                  _context2.next = 19;
                  break;
                }

                rcvMeetingInfo = meeting;

                if (!rcvMeetingInfo.usePersonalMeetingId) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 11;
                return this._rcVideo.updateMeeting((_this$_rcVideo$person = this._rcVideo.personalMeeting) === null || _this$_rcVideo$person === void 0 ? void 0 : _this$_rcVideo$person.id, rcvMeetingInfo, config);

              case 11:
                result = _context2.sent;
                _context2.next = 17;
                break;

              case 14:
                _context2.next = 16;
                return this._rcVideo.createMeeting(meeting, config);

              case 16:
                result = _context2.sent;

              case 17:
                _context2.next = 21;
                break;

              case 19:
                console.error('Unknown meeting provider, please check module runtime');
                return _context2.abrupt("return");

              case 21:
                if (result) {
                  this._eventEmitter.emit(_interface.MeetingEvents.afterSchedule, result, opener);
                } else if (opener && opener.close) {
                  opener.close();
                }

                return _context2.abrupt("return", result);

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function schedule(_x2, _x3, _x4) {
        return _schedule.apply(this, arguments);
      }

      return schedule;
    }()
  }, {
    key: "startMeeting",
    value: function () {
      var _startMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(meeting) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!this.isRCM) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", this._meeting.schedule(meeting));

              case 2:
                if (!this.isRCV) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", this._rcVideo.startMeeting(meeting));

              case 4:
                return _context3.abrupt("return", null);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function startMeeting(_x5) {
        return _startMeeting.apply(this, arguments);
      }

      return startMeeting;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(meetingId) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this._meetingModule.getMeeting(meetingId));

              case 1:
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
  }, {
    key: "getMeetingServiceInfo",
    value: function () {
      var _getMeetingServiceInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", this._meetingModule.getMeetingServiceInfo && this._meetingModule.getMeetingServiceInfo());

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getMeetingServiceInfo() {
        return _getMeetingServiceInfo.apply(this, arguments);
      }

      return getMeetingServiceInfo;
    }()
  }, {
    key: "updateMeeting",
    value: function () {
      var _updateMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(meetingId, meeting, config, opener) {
        var result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!this.isRCM) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 3;
                return this._meeting.updateMeeting(meetingId, meeting, config);

              case 3:
                result = _context6.sent;
                _context6.next = 14;
                break;

              case 6:
                if (!this.isRCV) {
                  _context6.next = 12;
                  break;
                }

                _context6.next = 9;
                return this._rcVideo.updateMeeting(meetingId, meeting, config);

              case 9:
                result = _context6.sent;
                _context6.next = 14;
                break;

              case 12:
                console.error('Unknown meeting provider, please check module runtime');
                return _context6.abrupt("return");

              case 14:
                if (result) {
                  this._eventEmitter.emit(_interface.MeetingEvents.afterUpdate, result, opener);
                } else if (opener && opener.close) {
                  opener.close();
                }

                return _context6.abrupt("return", result);

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function updateMeeting(_x7, _x8, _x9, _x10) {
        return _updateMeeting.apply(this, arguments);
      }

      return updateMeeting;
    }()
  }, {
    key: "addScheduledCallBack",
    value: function addScheduledCallBack(cb) {
      this._eventEmitter.on(_interface.MeetingEvents.afterSchedule, cb);
    }
  }, {
    key: "removeScheduledCallBack",
    value: function removeScheduledCallBack(cb) {
      this._eventEmitter.removeListener(_interface.MeetingEvents.afterSchedule, cb);
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
        // rcm doedn't support update disabled status yet
        return;
      }

      return this.isRCV && this._meetingModule.updateHasSettingsChanged(isChanged);
    }
  }, {
    key: "generateRcvMeetingPassword",
    value: function generateRcvMeetingPassword() {
      return this._rcVideo.generateRandomPassword();
    }
  }, {
    key: "_onStateChange",
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this._init();
      } else if (this._shouldReset()) {
        this._reset();
      }
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this.pending && this._brand.ready && this._extensionInfo.ready && this._meetingProvider.ready && this._meetingProvider.provider && this._meetingModule && this._meetingModule.ready;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return this.ready && (!this._brand.ready || !this._extensionInfo.ready || !this._meetingProvider.ready || !this._meetingProvider.provider || this._meetingModule && !this._meetingModule.ready);
    }
  }, {
    key: "_init",
    value: function _init() {
      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "meetingProviderType",
    get: function get() {
      return this._meetingProvider.provider;
    }
  }, {
    key: "isRCV",
    get: function get() {
      return this._meetingProvider.isRCV;
    }
  }, {
    key: "isRCM",
    get: function get() {
      return this._meetingProvider.isRCM;
    }
  }, {
    key: "extensionInfo",
    get: function get() {
      return this._extensionInfo.info;
    }
  }, {
    key: "_meetingModule",
    get: function get() {
      if (this.isRCM) {
        return this._meeting;
      }

      if (this.isRCV) {
        return this._rcVideo;
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
        return this._meeting.defaultMeetingSetting;
      }

      if (this.isRCV) {
        return this._rcVideo.defaultVideoSetting;
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
      return this._brand.name;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
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
        return this._rcVideo.enableWaitingRoom;
      }

      return false;
    }
  }, {
    key: "enableE2EE",
    get: function get() {
      if (this.isRCV) {
        return this._rcVideo.enableE2EE;
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
        return this._meeting.pmiDefaultSettings;
      }

      if (this.isRCV) {
        return this._rcVideo.personalVideoSetting;
      }

      return null;
    }
  }, {
    key: "isUpdating",
    get: function get() {
      return this.state.updatingStatus === _genericMeetingStatus.genericMeetingStatus.updating;
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
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "init", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchUsePersonalMeetingId", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "switchUsePersonalMeetingId"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateScheduleFor", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateScheduleFor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeetingSettings", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeetingSettings"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "schedule", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "schedule"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "startMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "startMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeetingServiceInfo", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeetingServiceInfo"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype)), _class2)) || _class);
exports.GenericMeeting = GenericMeeting;
//# sourceMappingURL=GenericMeetingModule.js.map
