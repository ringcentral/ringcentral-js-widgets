"use strict";

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RcVideo = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.is-array");

require("regenerator-runtime/runtime");

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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var RcVideo = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', 'Brand', 'Storage', 'ExtensionInfo', 'MeetingProvider', {
    dep: 'RcVideoOptions',
    optional: true
  }, {
    dep: 'AvailabilityMonitor',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModule) {
  _inherits(RcVideo, _RcModule);

  var _super = _createSuper(RcVideo);

  // TODO: add state interface
  function RcVideo(_ref) {
    var _this;

    var alert = _ref.alert,
        client = _ref.client,
        extensionInfo = _ref.extensionInfo,
        brand = _ref.brand,
        storage = _ref.storage,
        reducers = _ref.reducers,
        availabilityMonitor = _ref.availabilityMonitor,
        meetingProvider = _ref.meetingProvider,
        _ref$showSaveAsDefaul = _ref.showSaveAsDefault,
        showSaveAsDefault = _ref$showSaveAsDefaul === void 0 ? false : _ref$showSaveAsDefaul,
        _ref$isInstantMeeting = _ref.isInstantMeeting,
        isInstantMeeting = _ref$isInstantMeeting === void 0 ? false : _ref$isInstantMeeting,
        _ref$enablePersonalMe = _ref.enablePersonalMeeting,
        enablePersonalMeeting = _ref$enablePersonalMe === void 0 ? false : _ref$enablePersonalMe,
        options = _objectWithoutProperties(_ref, ["alert", "client", "extensionInfo", "brand", "storage", "reducers", "availabilityMonitor", "meetingProvider", "showSaveAsDefault", "isInstantMeeting", "enablePersonalMeeting"]);

    _classCallCheck(this, RcVideo);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: options.actionTypes || _actionTypes["default"]
    }));
    _this._alert = void 0;
    _this._client = void 0;
    _this._defaultVideoSettingKey = void 0;
    _this._personalMeetingKey = void 0;
    _this._extensionInfo = void 0;
    _this._brand = void 0;
    _this._storage = void 0;
    _this._availabilityMonitor = void 0;
    _this._showSaveAsDefault = void 0;
    _this._isInstantMeeting = void 0;
    _this._fetchPersonMeetingTimeout = void 0;
    _this._enablePersonalMeeting = void 0;
    _this._meetingProvider = void 0;
    _this._reducer = void 0;

    _initializerDefineProperty(_this, "defaultVideoSetting", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "initialVideoSetting", _descriptor2, _assertThisInitialized(_this));

    _this._alert = alert;
    _this._client = client;
    _this._extensionInfo = extensionInfo;
    _this._meetingProvider = meetingProvider;
    _this._brand = brand;
    _this._storage = storage;
    _this._reducer = (0, _getRcVReducer["default"])(_this.actionTypes, reducers);
    _this._showSaveAsDefault = showSaveAsDefault;
    _this._isInstantMeeting = isInstantMeeting;
    _this._availabilityMonitor = availabilityMonitor;
    _this._defaultVideoSettingKey = 'defaultVideoSetting';
    _this._personalMeetingKey = 'personalMeeting';
    _this._enablePersonalMeeting = enablePersonalMeeting;

    if (_this._showSaveAsDefault) {
      _this._storage.registerReducer({
        key: _this._defaultVideoSettingKey,
        reducer: (0, _getRcVReducer.getDefaultVideoSettingReducer)(_this.actionTypes)
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
    value: function () {
      var _onStateChange2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this._shouldInit()) {
                  _context.next = 5;
                  break;
                }

                _context.next = 3;
                return this._init();

              case 3:
                _context.next = 6;
                break;

              case 5:
                if (this._shouldReset()) {
                  this._reset();
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _onStateChange() {
        return _onStateChange2.apply(this, arguments);
      }

      return _onStateChange;
    }()
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this.pending && this._extensionInfo.ready && this._storage.ready && this._meetingProvider.ready && this._meetingProvider.isRCV && (!this._availabilityMonitor || this._availabilityMonitor.ready);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return this.ready && (!this._extensionInfo.ready || !this._storage.ready || !this._meetingProvider.ready || !this._meetingProvider.isRCV || this._availabilityMonitor && !this._availabilityMonitor.ready);
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
      var _init2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.store.dispatch({
                  type: this.actionTypes.init
                });

                if (!this._enablePersonalMeeting) {
                  _context2.next = 4;
                  break;
                }

                _context2.next = 4;
                return this._initPersonalMeeting();

              case 4:
                _context2.next = 6;
                return this._initMeeting();

              case 6:
                this.store.dispatch({
                  type: this.actionTypes.initSuccess
                });

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
    value: function () {
      var _init3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('init meeting');
                _context3.next = 3;
                return this._initMeeting();

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function init() {
        return _init3.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "reload",
    value: function () {
      var _reload = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._initMeeting();

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function reload() {
        return _reload.apply(this, arguments);
      }

      return reload;
    }()
  }, {
    key: "_initMeeting",
    value: function () {
      var _initMeeting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        var _yield$this$_getPrefe, preferences, meetingSettingLock;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._getPreferences();

              case 2:
                _yield$this$_getPrefe = _context5.sent;
                preferences = _yield$this$_getPrefe.preferences;
                meetingSettingLock = _yield$this$_getPrefe.meetingSettingLock;
                // TODO Remove the next line after rcv implement ui to manage password_instant
                preferences.password_instant = false;
                this.store.dispatch({
                  type: this.actionTypes.updateMeetingPreferences,
                  preferences: preferences
                });
                this.store.dispatch({
                  type: this.actionTypes.updateMeetingSettingLock,
                  meetingSettingLock: meetingSettingLock
                });
                this.updateMeetingSettings(_objectSpread(_objectSpread({}, this.defaultVideoSetting), {}, {
                  meetingPassword: (0, _videoHelper.generateRandomPassword)(10),
                  isMeetingPasswordValid: true // generated random password is valid

                }));

              case 9:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _initMeeting() {
        return _initMeeting2.apply(this, arguments);
      }

      return _initMeeting;
    }()
  }, {
    key: "_initPersonalMeeting",
    value: function () {
      var _initPersonalMeeting2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this3 = this;

        var meeting;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(this.personalMeeting && this.personalMeeting.shortId)) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return");

              case 2:
                if (this._fetchPersonMeetingTimeout) {
                  clearTimeout(this._fetchPersonMeetingTimeout);
                }

                _context6.prev = 3;
                _context6.next = 6;
                return this.initPersonalMeeting();

              case 6:
                meeting = _context6.sent;
                this.store.dispatch({
                  type: this.actionTypes.savePersonalMeeting,
                  meeting: meeting
                });
                _context6.next = 15;
                break;

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](3);
                console.error('fetch default meeting error:', _context6.t0);
                console.warn('retry after 10s');
                this._fetchPersonMeetingTimeout = setTimeout(function () {
                  _this3._initPersonalMeeting();
                }, 10000);

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[3, 10]]);
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
          isOnlyAuthUserJoin = meeting.isOnlyAuthUserJoin,
          isOnlyCoworkersJoin = meeting.isOnlyCoworkersJoin,
          allowScreenSharing = meeting.allowScreenSharing,
          muteAudio = meeting.muteAudio,
          muteVideo = meeting.muteVideo,
          isMeetingSecret = meeting.isMeetingSecret,
          notShowAgain = meeting.notShowAgain;
      var updateInfo = {
        allowJoinBeforeHost: allowJoinBeforeHost,
        isOnlyAuthUserJoin: isOnlyAuthUserJoin,
        isOnlyCoworkersJoin: isOnlyCoworkersJoin,
        allowScreenSharing: allowScreenSharing,
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
      var _createMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(meeting) {
        var _this4 = this;

        var _ref2,
            _ref2$isAlertSuccess,
            isAlertSuccess,
            meetingResult,
            dialInNumber,
            meetingResponse,
            _args7 = arguments;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref2 = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {}, _ref2$isAlertSuccess = _ref2.isAlertSuccess, isAlertSuccess = _ref2$isAlertSuccess === void 0 ? true : _ref2$isAlertSuccess;

                if (!this.isScheduling) {
                  _context7.next = 3;
                  break;
                }

                return _context7.abrupt("return", this.createMeeting._promise);

              case 3:
                _context7.prev = 3;
                this.store.dispatch({
                  type: this.actionTypes.initCreating
                });

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                this.createMeeting._promise = this._client.service.platform().post('/rcvideo/v1/bridges', (0, _videoHelper.pruneMeetingObject)(meeting));
                _context7.next = 9;
                return this.createMeeting._promise;

              case 9:
                meetingResult = _context7.sent;
                this.store.dispatch({
                  type: this.actionTypes.created,
                  meeting: meeting
                });
                this.updateMeetingSettings(_objectSpread(_objectSpread({}, meeting), {}, {
                  saveAsDefault: false
                })); // After Create

                _context7.next = 14;
                return this._getDialinNumbers();

              case 14:
                dialInNumber = _context7.sent;

                if (!meeting.saveAsDefault) {
                  _context7.next = 18;
                  break;
                }

                _context7.next = 18;
                return this.savePreferencesChanges(meeting);

              case 18:
                _context7.next = 20;
                return this._initMeeting();

              case 20:
                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this4._alert.info({
                      message: _meetingStatus["default"].scheduledSuccess
                    });
                  }, 50);
                }

                _context7.t0 = this._extensionInfo.info;
                _context7.t1 = dialInNumber;
                _context7.t2 = _objectSpread;
                _context7.t3 = _objectSpread({}, meeting);
                _context7.next = 27;
                return meetingResult.json();

              case 27:
                _context7.t4 = _context7.sent;
                _context7.t5 = (0, _context7.t2)(_context7.t3, _context7.t4);
                meetingResponse = {
                  extensionInfo: _context7.t0,
                  dialInNumber: _context7.t1,
                  meeting: _context7.t5
                };
                return _context7.abrupt("return", _objectSpread(_objectSpread({}, meetingResponse), meeting));

              case 33:
                _context7.prev = 33;
                _context7.t6 = _context7["catch"](3);
                this.store.dispatch({
                  type: this.actionTypes.resetCreating
                });

                this._errorHandle(_context7.t6);

                return _context7.abrupt("return", null);

              case 38:
                _context7.prev = 38;
                delete this.createMeeting._promise;
                return _context7.finish(38);

              case 41:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this, [[3, 33, 38, 41]]);
      }));

      function createMeeting(_x) {
        return _createMeeting.apply(this, arguments);
      }

      return createMeeting;
    }()
  }, {
    key: "instantMeeting",
    value: function () {
      var _instantMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(meeting) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this.createMeeting(_objectSpread(_objectSpread({}, meeting), {}, {
                  expiresIn: 86400,
                  type: _videoHelper.RcVideoTypes.call
                })));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function instantMeeting(_x2) {
        return _instantMeeting.apply(this, arguments);
      }

      return instantMeeting;
    }()
  }, {
    key: "_getDialinNumbers",
    value: function () {
      var _getDialinNumbers2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var result, _ref3, phoneNumbers, defaultPhoneNumber;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._client.service.platform().get('/rcvideo/v1/dial-in-numbers');

              case 2:
                result = _context9.sent;
                _context9.next = 5;
                return result.json();

              case 5:
                _ref3 = _context9.sent;
                phoneNumbers = _ref3.phoneNumbers;

                if (!Array.isArray(phoneNumbers)) {
                  _context9.next = 11;
                  break;
                }

                defaultPhoneNumber = phoneNumbers.find(function (obj) {
                  return obj["default"];
                });

                if (!defaultPhoneNumber) {
                  _context9.next = 11;
                  break;
                }

                return _context9.abrupt("return", defaultPhoneNumber.phoneNumber);

              case 11:
                return _context9.abrupt("return", null);

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _getDialinNumbers() {
        return _getDialinNumbers2.apply(this, arguments);
      }

      return _getDialinNumbers;
    }()
  }, {
    key: "_getPreferences",
    value: function () {
      var _getPreferences2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var res, list, preferences, meetingSettingLock;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._client.service.platform().get('/rcvideo/v1/account/~/extension/~/preferences', {
                  id: _videoHelper.RCV_PREFERENCES_API_KEYS
                });

              case 2:
                res = _context10.sent;
                _context10.next = 5;
                return res.json();

              case 5:
                list = _context10.sent;
                preferences = {};
                meetingSettingLock = {};
                list.forEach(function (_ref4) {
                  var id = _ref4.id,
                      value = _ref4.value,
                      readOnly = _ref4.readOnly;
                  preferences[id] = value;
                  meetingSettingLock[id] = readOnly;
                });
                return _context10.abrupt("return", {
                  preferences: preferences,
                  meetingSettingLock: meetingSettingLock
                });

              case 10:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _getPreferences() {
        return _getPreferences2.apply(this, arguments);
      }

      return _getPreferences;
    }()
  }, {
    key: "updatePreference",
    value: function updatePreference(preferences) {
      this.store.dispatch({
        type: this.actionTypes.updateMeetingPreferences,
        preferences: preferences
      });
    }
  }, {
    key: "_saveSinglePreference",
    value: function () {
      var _saveSinglePreference2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(preferenceId, value) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", this._client.service.platform().send({
                  method: 'PATCH',
                  url: "/rcvideo/v1/account/~/extension/~/preferences/".concat(preferenceId),
                  body: {
                    value: value
                  }
                }));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function _saveSinglePreference(_x3, _x4) {
        return _saveSinglePreference2.apply(this, arguments);
      }

      return _saveSinglePreference;
    }()
    /**
     * Determined the different between client and server, then save them to the server.
     * @param preferences preference fileds in meeting object
     * @param isOverwrite if true, dispatch updateMeetingPreferences on success
     */

  }, {
    key: "savePreferencesChanges",
    value: function () {
      var _savePreferencesChanges = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(preferences) {
        var _this5 = this;

        var isOverwrite,
            preferencesPayload,
            dirtyPreferences,
            _args12 = arguments;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                isOverwrite = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : false;
                preferencesPayload = (0, _videoHelper.reversePreferences)(preferences, this._isInstantMeeting);
                dirtyPreferences = Object.entries(preferencesPayload).filter(function (kvPairs) {
                  var _ref5 = kvPairs,
                      _ref6 = _slicedToArray(_ref5, 2),
                      preferenceId = _ref6[0],
                      newValue = _ref6[1];

                  var oldValue = _this5.preferences[preferenceId];
                  return newValue !== oldValue;
                });
                _context12.prev = 3;
                _context12.next = 6;
                return Promise.all(dirtyPreferences.map(function (_ref7) {
                  var _ref8 = _slicedToArray(_ref7, 2),
                      preferenceId = _ref8[0],
                      newValue = _ref8[1];

                  return _this5._saveSinglePreference(preferenceId, newValue);
                }));

              case 6:
                if (isOverwrite) {
                  this.updatePreference(preferencesPayload);
                }

                _context12.next = 12;
                break;

              case 9:
                _context12.prev = 9;
                _context12.t0 = _context12["catch"](3);
                console.error(_context12.t0);

              case 12:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[3, 9]]);
      }));

      function savePreferencesChanges(_x5) {
        return _savePreferencesChanges.apply(this, arguments);
      }

      return savePreferencesChanges;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(meetingId) {
        var meetingResult;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this._client.service.platform().get('/rcvideo/v1/bridges', {
                  shortId: meetingId
                });

              case 2:
                meetingResult = _context13.sent;
                return _context13.abrupt("return", meetingResult.json());

              case 4:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getMeeting(_x6) {
        return _getMeeting.apply(this, arguments);
      }

      return getMeeting;
    }()
  }, {
    key: "initPersonalMeeting",
    value: function () {
      var _initPersonalMeeting3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var meetingResult;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this._client.service.platform().get('/rcvideo/v1/bridges', {
                  "default": true
                });

              case 2:
                meetingResult = _context14.sent;
                return _context14.abrupt("return", meetingResult.json());

              case 4:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function initPersonalMeeting() {
        return _initPersonalMeeting3.apply(this, arguments);
      }

      return initPersonalMeeting;
    }()
  }, {
    key: "updateMeeting",
    value: function () {
      var _updateMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(meetingId, meeting) {
        var _this6 = this;

        var _ref9,
            _ref9$isAlertSuccess,
            isAlertSuccess,
            meetingResult,
            dialInNumber,
            newMeeting,
            meetingResponse,
            _args15 = arguments;

        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _ref9 = _args15.length > 2 && _args15[2] !== undefined ? _args15[2] : {}, _ref9$isAlertSuccess = _ref9.isAlertSuccess, isAlertSuccess = _ref9$isAlertSuccess === void 0 ? false : _ref9$isAlertSuccess;
                _context15.prev = 1;

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                _context15.next = 5;
                return this._client.service.platform().send({
                  method: 'PATCH',
                  url: "/rcvideo/v1/bridges/".concat(meeting.id),
                  body: meeting
                });

              case 5:
                meetingResult = _context15.sent;
                _context15.next = 8;
                return this._getDialinNumbers();

              case 8:
                dialInNumber = _context15.sent;

                if (!meeting.saveAsDefault) {
                  _context15.next = 12;
                  break;
                }

                _context15.next = 12;
                return this.savePreferencesChanges(meeting, true);

              case 12:
                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this6._alert.info({
                      message: _meetingStatus["default"].updatedSuccess
                    });
                  }, 50);
                }

                _context15.next = 15;
                return meetingResult.json();

              case 15:
                newMeeting = _context15.sent;
                meetingResponse = {
                  extensionInfo: this._extensionInfo.info,
                  dialInNumber: dialInNumber,
                  meeting: _objectSpread(_objectSpread({}, meeting), newMeeting)
                };

                if (this.personalMeeting && newMeeting.id === this.personalMeeting.id) {
                  this.store.dispatch({
                    type: this.actionTypes.savePersonalMeeting,
                    meeting: newMeeting
                  });
                }

                return _context15.abrupt("return", meetingResponse);

              case 21:
                _context15.prev = 21;
                _context15.t0 = _context15["catch"](1);

                this._errorHandle(_context15.t0);

                return _context15.abrupt("return", null);

              case 25:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this, [[1, 21]]);
      }));

      function updateMeeting(_x7, _x8) {
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

      this._comparePreferences();
    }
  }, {
    key: "_comparePreferences",
    value: function _comparePreferences() {
      var preferences = this.preferences,
          meeting = this.meeting;
      this.store.dispatch({
        type: this.actionTypes.saveMeetingPreferencesState,
        isPreferencesChanged: (0, _videoHelper.comparePreferences)((0, _videoHelper.transformPreferences)(preferences, this._isInstantMeeting), meeting)
      });
    }
  }, {
    key: "_errorHandle",
    value: function () {
      var _errorHandle2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(errors) {
        var _iterator, _step, error, _yield$errors$respons, errorCode, permissionName;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                if (!(errors instanceof _Meeting.MeetingErrors)) {
                  _context16.next = 5;
                  break;
                }

                _iterator = _createForOfIteratorHelper(errors.all);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    error = _step.value;

                    this._alert.warning(error);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _context16.next = 22;
                break;

              case 5:
                if (!(errors && errors.response)) {
                  _context16.next = 22;
                  break;
                }

                _context16.next = 8;
                return errors.response.clone().json();

              case 8:
                _yield$errors$respons = _context16.sent;
                errorCode = _yield$errors$respons.errorCode;
                permissionName = _yield$errors$respons.permissionName;

                if (!(errorCode === 'InsufficientPermissions' && permissionName)) {
                  _context16.next = 15;
                  break;
                }

                this._alert.danger({
                  message: _meetingStatus["default"].insufficientPermissions,
                  payload: {
                    permissionName: permissionName
                  }
                });

                _context16.next = 22;
                break;

              case 15:
                _context16.t0 = !this._availabilityMonitor;

                if (_context16.t0) {
                  _context16.next = 20;
                  break;
                }

                _context16.next = 19;
                return this._availabilityMonitor.checkIfHAError(errors);

              case 19:
                _context16.t0 = !_context16.sent;

              case 20:
                if (!_context16.t0) {
                  _context16.next = 22;
                  break;
                }

                this._alert.danger({
                  message: _meetingStatus["default"].internalError
                });

              case 22:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function _errorHandle(_x9) {
        return _errorHandle2.apply(this, arguments);
      }

      return _errorHandle;
    }()
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
    } // preferences directly from backend

  }, {
    key: "preferences",
    get: function get() {
      return this.state.preferences;
    }
  }, {
    key: "meetingSettingLock",
    get: function get() {
      return this.state.meetingSettingLock;
    }
  }, {
    key: "savedDefaultVideoSetting",
    get: function get() {
      return this._storage.getItem(this._defaultVideoSettingKey);
    }
  }, {
    key: "isScheduling",
    get: function get() {
      return this.state.creatingStatus === _createStatus["default"].creating;
    }
  }, {
    key: "showSaveAsDefault",
    get: function get() {
      return this._showSaveAsDefault;
    }
  }, {
    key: "isPreferencesChanged",
    get: function get() {
      return this.state.isPreferencesChanged;
    }
  }, {
    key: "personalMeeting",
    get: function get() {
      return this._storage.getItem(this._personalMeetingKey);
    }
  }]);

  return RcVideo;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "_init", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "init", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "createMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "createMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "initPersonalMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "initPersonalMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeetingSettings", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeetingSettings"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "defaultVideoSetting", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this7 = this;

    return [function () {
      return _this7.initialVideoSetting;
    }, function () {
      var savedSetting = _this7._showSaveAsDefault ? _this7.savedDefaultVideoSetting : {};
      return savedSetting;
    }, function () {
      return _this7._isInstantMeeting;
    }, function () {
      return _this7.preferences;
    }, function () {
      return _this7.meetingSettingLock;
    }, function (initialSetting, savedSetting, isInstantMeeting, preferences, meetingSettingLock) {
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, initialSetting), savedSetting), (0, _videoHelper.transformPreferences)(preferences, isInstantMeeting)), {}, {
        settingLock: _objectSpread({}, (0, _videoHelper.transformMeetingSettingLock)(meetingSettingLock, isInstantMeeting))
      });
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "initialVideoSetting", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this8 = this;

    return [function () {
      return _this8.extensionName;
    }, function () {
      return _this8.brandName;
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
