"use strict";

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcVideo = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _background = _interopRequireDefault(require("../../lib/background"));

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _selector = require("../../lib/selector");

var _meetingStatus = _interopRequireDefault(require("../Meeting/meetingStatus"));

var _Meeting = require("../Meeting");

var _meetingHelper = require("../../helpers/meetingHelper");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getRcVReducer = _interopRequireWildcard(require("./getRcVReducer"));

var _videoHelper = require("./videoHelper");

var _createStatus = _interopRequireDefault(require("./createStatus"));

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function migrateJBH(setting) {
  if (setting && Object.keys(setting).length) {
    setting.allowJoinBeforeHost = typeof setting.allowJoinBeforeHostV2 === 'boolean' ? setting.allowJoinBeforeHostV2 : _videoHelper.DEFAULT_JBH;
    delete setting.allowJoinBeforeHostV2;
  }

  return setting;
}

var RcVideo = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', 'ExtensionInfo', 'Brand', 'Storage', {
    dep: 'Conference',
    optional: true
  }, {
    dep: 'RcVideoOptions',
    optional: true
  }, {
    dep: 'AvailabilityMonitor',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModule) {
  _inherits(RcVideo, _RcModule);

  var _super = _createSuper(RcVideo);

  function RcVideo(_ref) {
    var _this;

    var alert = _ref.alert,
        client = _ref.client,
        showSaveAsDefault = _ref.showSaveAsDefault,
        extensionInfo = _ref.extensionInfo,
        brand = _ref.brand,
        storage = _ref.storage,
        reducers = _ref.reducers,
        conference = _ref.conference,
        availabilityMonitor = _ref.availabilityMonitor,
        _ref$enablePersonalMe = _ref.enablePersonalMeeting,
        enablePersonalMeeting = _ref$enablePersonalMe === void 0 ? false : _ref$enablePersonalMe,
        options = _objectWithoutProperties(_ref, ["alert", "client", "showSaveAsDefault", "extensionInfo", "brand", "storage", "reducers", "conference", "availabilityMonitor", "enablePersonalMeeting"]);

    _classCallCheck(this, RcVideo);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: options.actionTypes || _actionTypes["default"]
    }));
    _this._alert = void 0;
    _this._client = void 0;
    _this._defaultVideoSettingKey = void 0;
    _this._lastVideoSettingKey = void 0;
    _this._personalMeetingKey = void 0;
    _this._extensionInfo = void 0;
    _this._conference = void 0;
    _this._brand = void 0;
    _this._storage = void 0;
    _this._availabilityMonitor = void 0;
    _this._showSaveAsDefault = void 0;
    _this._fetchPersonMeetingTimeout = void 0;
    _this._enablePersonalMeeting = void 0;
    _this._reducer = void 0;

    _initializerDefineProperty(_this, "defaultVideoSetting", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "initialVideoSetting", _descriptor2, _assertThisInitialized(_this));

    _this._alert = alert;
    _this._client = client;
    _this._extensionInfo = extensionInfo;
    _this._brand = brand;
    _this._storage = storage;
    _this._conference = conference;
    _this._reducer = (0, _getRcVReducer["default"])(_this.actionTypes, reducers);
    _this._showSaveAsDefault = showSaveAsDefault;
    _this._availabilityMonitor = availabilityMonitor;
    _this._defaultVideoSettingKey = 'defaultVideoSetting';
    _this._lastVideoSettingKey = 'lastVideoSetting';
    _this._personalMeetingKey = 'personalMeeting';
    _this._enablePersonalMeeting = enablePersonalMeeting;

    if (_this._showSaveAsDefault) {
      _this._storage.registerReducer({
        key: _this._defaultVideoSettingKey,
        reducer: (0, _getRcVReducer.getDefaultVideoSettingReducer)(_this.actionTypes)
      });
    } else {
      _this._storage.registerReducer({
        key: _this._lastVideoSettingKey,
        reducer: (0, _getRcVReducer.getLastVideoStorageReducer)(_this.actionTypes)
      });
    }

    if (_this._enablePersonalMeeting) {
      _this._storage.registerReducer({
        key: _this._personalMeetingKey,
        reducer: (0, _getRcVReducer.getPersonalMeetingReducer)(_this.actionTypes)
      });
    }

    return _this;
  }

  _createClass(RcVideo, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
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
      return this.pending && this._extensionInfo.ready && this._storage.ready && (!this._availabilityMonitor || this._availabilityMonitor.ready);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return this.ready && !this._extensionInfo.ready && !this._storage.ready && (this._availabilityMonitor || !this._availabilityMonitor.ready);
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: "_init",
    value: function () {
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.init
                });

                if (!this._enablePersonalMeeting) {
                  _context.next = 4;
                  break;
                }

                _context.next = 4;
                return this._initPersonalMeeting();

              case 4:
                this._initMeeting();

                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _init() {
        return _init2.apply(this, arguments);
      }

      return _init;
    }()
    /**
     * Init basic meeting information
     * also load meeting setting from previous one.
     */

  }, {
    key: "init",
    value: function init() {
      console.log('init meeting');

      this._initMeeting();
    }
  }, {
    key: "reload",
    value: function reload() {
      this._initMeeting();
    }
  }, {
    key: "_initMeeting",
    value: function _initMeeting() {
      this.updateMeetingSettings(_objectSpread(_objectSpread({}, this.defaultVideoSetting), {}, {
        meetingPassword: (0, _videoHelper.generateRandomPassword)(10),
        // generated random password is valid
        isMeetingPasswordValid: true
      }));
    }
  }, {
    key: "_initPersonalMeeting",
    value: function () {
      var _initPersonalMeeting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this3 = this;

        var meeting;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.personalMeeting.shortId) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:
                if (this._fetchPersonMeetingTimeout) {
                  clearTimeout(this._fetchPersonMeetingTimeout);
                }

                _context2.prev = 3;
                _context2.next = 6;
                return this.fetchPersonalMeeting();

              case 6:
                meeting = _context2.sent;
                this.store.dispatch({
                  type: this.actionTypes.savePersonalMeeting,
                  meeting: meeting
                });
                _context2.next = 15;
                break;

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](3);
                console.error('fetch default meeting error:', _context2.t0);
                console.warn('retry after 10s');
                this._fetchPersonMeetingTimeout = setTimeout(function () {
                  _this3._initPersonalMeeting();
                }, 10000);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 10]]);
      }));

      function _initPersonalMeeting() {
        return _initPersonalMeeting2.apply(this, arguments);
      }

      return _initPersonalMeeting;
    }()
  }, {
    key: "saveAsDefaultSetting",
    value: function saveAsDefaultSetting(meeting) {
      var allowJoinBeforeHost = meeting.allowJoinBeforeHost,
          muteAudio = meeting.muteAudio,
          muteVideo = meeting.muteVideo,
          isMeetingSecret = meeting.isMeetingSecret,
          notShowAgain = meeting.notShowAgain;
      var updateInfo = {
        allowJoinBeforeHostV2: allowJoinBeforeHost,
        muteAudio: muteAudio,
        muteVideo: muteVideo,
        isMeetingSecret: isMeetingSecret
      };

      if (notShowAgain) {
        updateInfo._saved = notShowAgain;
      }

      this.store.dispatch({
        type: this.actionTypes.saveAsDefaultSetting,
        meeting: updateInfo
      });
    }
  }, {
    key: "saveLastVideoSetting",
    value: function saveLastVideoSetting(meeting) {
      var allowJoinBeforeHost = meeting.allowJoinBeforeHost,
          muteAudio = meeting.muteAudio,
          muteVideo = meeting.muteVideo,
          isMeetingSecret = meeting.isMeetingSecret;
      var setting = {
        allowJoinBeforeHostV2: allowJoinBeforeHost,
        muteAudio: muteAudio,
        muteVideo: muteVideo,
        isMeetingSecret: isMeetingSecret
      };
      this.store.dispatch({
        type: this.actionTypes.saveLastVideoSetting,
        meeting: setting
      });
    }
  }, {
    key: "validatePasswordSettings",
    value: function validatePasswordSettings(password, isSecret) {
      return (0, _videoHelper.validatePasswordSettings)(password, isSecret);
    }
  }, {
    key: "generateRandomPassword",
    value: function generateRandomPassword() {
      return (0, _videoHelper.generateRandomPassword)(10);
    }
  }, {
    key: "createMeeting",
    value: function () {
      var _createMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(meeting) {
        var _this4 = this;

        var _ref2,
            _ref2$isAlertSuccess,
            isAlertSuccess,
            meetingResult,
            meetingResponse,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _ref2 = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {}, _ref2$isAlertSuccess = _ref2.isAlertSuccess, isAlertSuccess = _ref2$isAlertSuccess === void 0 ? true : _ref2$isAlertSuccess;

                if (!this.isScheduling) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", this.createMeeting._promise);

              case 3:
                _context3.prev = 3;
                this.store.dispatch({
                  type: this.actionTypes.initCreating
                });

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                this.createMeeting._promise = this._client.service.platform().post('/rcvideo/v1/bridges', (0, _videoHelper.pruneMeetingObject)(meeting));
                _context3.next = 9;
                return this.createMeeting._promise;

              case 9:
                meetingResult = _context3.sent;
                this.store.dispatch({
                  type: this.actionTypes.created,
                  meeting: meeting
                });
                this.saveLastVideoSetting(meeting);
                this.updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), {}, {
                  saveAsDefault: false
                }));

                this._initMeeting();

                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this4._alert.info({
                      message: _meetingStatus["default"].scheduledSuccess
                    });
                  }, 50);
                }

                meetingResponse = {
                  extensionInfo: this._extensionInfo.info,
                  dialInNumber: this._conference && this._conference.dialInNumber,
                  meeting: _objectSpread(_objectSpread({}, meeting), meetingResult.json())
                };
                return _context3.abrupt("return", _objectSpread(_objectSpread({}, meetingResponse), meeting));

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3["catch"](3);
                this.store.dispatch({
                  type: this.actionTypes.resetCreating
                });

                this._errorHandle(_context3.t0);

                return _context3.abrupt("return", null);

              case 24:
                _context3.prev = 24;
                delete this.createMeeting._promise;
                return _context3.finish(24);

              case 27:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 19, 24, 27]]);
      }));

      function createMeeting(_x) {
        return _createMeeting.apply(this, arguments);
      }

      return createMeeting;
    }()
  }, {
    key: "instantMeeting",
    value: function () {
      var _instantMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(meeting) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", this.createMeeting(_objectSpread(_objectSpread({}, meeting), {}, {
                  expiresIn: 86400,
                  type: _videoHelper.RcVideoTypes.call
                })));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function instantMeeting(_x2) {
        return _instantMeeting.apply(this, arguments);
      }

      return instantMeeting;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(meetingId) {
        var meetingResult;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._client.service.platform().get('/rcvideo/v1/bridges', {
                  shortId: meetingId
                });

              case 2:
                meetingResult = _context5.sent;
                return _context5.abrupt("return", meetingResult.json());

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getMeeting(_x3) {
        return _getMeeting.apply(this, arguments);
      }

      return getMeeting;
    }()
  }, {
    key: "fetchPersonalMeeting",
    value: function () {
      var _fetchPersonalMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var meetingResult;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._client.service.platform().get('/rcvideo/v1/bridges', {
                  "default": true
                });

              case 2:
                meetingResult = _context6.sent;
                return _context6.abrupt("return", meetingResult.json());

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function fetchPersonalMeeting() {
        return _fetchPersonalMeeting.apply(this, arguments);
      }

      return fetchPersonalMeeting;
    }()
  }, {
    key: "updateMeeting",
    value: function () {
      var _updateMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(meetingId, meeting) {
        var _this5 = this;

        var _ref3,
            _ref3$isAlertSuccess,
            isAlertSuccess,
            meetingResult,
            newMeeting,
            meetingResponse,
            _args7 = arguments;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref3 = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {}, _ref3$isAlertSuccess = _ref3.isAlertSuccess, isAlertSuccess = _ref3$isAlertSuccess === void 0 ? false : _ref3$isAlertSuccess;
                _context7.prev = 1;

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                _context7.next = 5;
                return this._client.service.platform().send({
                  method: 'PATCH',
                  url: "/rcvideo/v1/bridges/".concat(meeting.id),
                  body: meeting
                });

              case 5:
                meetingResult = _context7.sent;

                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this5._alert.info({
                      message: _meetingStatus["default"].updatedSuccess
                    });
                  }, 50);
                }

                newMeeting = meetingResult.json();
                meetingResponse = {
                  extensionInfo: this._extensionInfo.info,
                  dialInNumber: this._conference && this._conference.dialInNumber,
                  meeting: _objectSpread(_objectSpread({}, meeting), newMeeting)
                };

                if (this.personalMeeting && newMeeting.id === this.personalMeeting.id) {
                  this.store.dispatch({
                    type: this.actionTypes.savePersonalMeeting,
                    meeting: newMeeting
                  });
                }

                return _context7.abrupt("return", meetingResponse);

              case 13:
                _context7.prev = 13;
                _context7.t0 = _context7["catch"](1);

                this._errorHandle(_context7.t0);

                return _context7.abrupt("return", null);

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[1, 13]]);
      }));

      function updateMeeting(_x4, _x5) {
        return _updateMeeting.apply(this, arguments);
      }

      return updateMeeting;
    }()
  }, {
    key: "updateMeetingSettings",
    value: function updateMeetingSettings(meeting) {
      var patch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      this.store.dispatch({
        type: this.actionTypes.updateMeetingSettings,
        meeting: meeting,
        patch: patch
      });
    }
  }, {
    key: "_errorHandle",
    value: function _errorHandle(errors) {
      if (errors instanceof _Meeting.MeetingErrors) {
        var _iterator = _createForOfIteratorHelper(errors.all),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var error = _step.value;

            this._alert.warning(error);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else if (errors && errors.apiResponse) {
        var _errors$apiResponse$j = errors.apiResponse.json(),
            errorCode = _errors$apiResponse$j.errorCode,
            permissionName = _errors$apiResponse$j.permissionName;

        if (errorCode === 'InsufficientPermissions' && permissionName) {
          this._alert.danger({
            message: _meetingStatus["default"].insufficientPermissions,
            payload: {
              permissionName: permissionName
            }
          });
        } else if (!this._availabilityMonitor || !this._availabilityMonitor.checkIfHAError(errors)) {
          this._alert.danger({
            message: _meetingStatus["default"].internalError
          });
        }
      }
    }
  }, {
    key: "meeting",
    get: function get() {
      return this.state.meeting;
    }
  }, {
    key: "extensionName",
    get: function get() {
      return this._extensionInfo.info && this._extensionInfo.info.name;
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
    key: "savedDefaultVideoSetting",
    get: function get() {
      var setting = this._storage.getItem(this._defaultVideoSettingKey);

      return migrateJBH(setting);
    }
  }, {
    key: "lastVideoSetting",
    get: function get() {
      var setting = this._storage.getItem(this._lastVideoSettingKey);

      return migrateJBH(setting);
    }
  }, {
    key: "isScheduling",
    get: function get() {
      return this.state.creatingStatus === _createStatus["default"].creating;
    }
  }, {
    key: "showSaveAsDefault",
    get: function get() {
      return !!this._showSaveAsDefault;
    }
  }, {
    key: "personalMeeting",
    get: function get() {
      return this._storage.getItem(this._personalMeetingKey);
    }
  }]);

  return RcVideo;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_init", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "init", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "createMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchPersonalMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchPersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeetingSettings", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeetingSettings"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "defaultVideoSetting", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return [function () {
      return _this6.initialVideoSetting;
    }, function () {
      var savedSetting = _this6._showSaveAsDefault ? _this6.savedDefaultVideoSetting : _this6.lastVideoSetting;
      return savedSetting;
    }, function (initialSetting, savedSetting) {
      return _objectSpread(_objectSpread({}, initialSetting), savedSetting);
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "initialVideoSetting", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return [function () {
      return _this7.extensionName;
    }, function () {
      return _this7.brandName;
    }, function () {
      return (0, _meetingHelper.getInitializedStartTime)();
    }, function (extensionName, brandName, startTime) {
      var topic = (0, _videoHelper.getTopic)(extensionName, brandName);
      var setting = (0, _videoHelper.getDefaultVideoSettings)({
        topic: topic,
        startTime: new Date(startTime)
      });
      return setting;
    }];
  }
})), _class2)) || _class);
exports.RcVideo = RcVideo;
//# sourceMappingURL=RcVideo.js.map
