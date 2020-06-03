"use strict";

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Meeting = void 0;

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.array.is-array");

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

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.promise");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("regenerator-runtime/runtime");

var _moment = _interopRequireDefault(require("moment"));

var _ramda = require("ramda");

var _meetingHelper = require("../../helpers/meetingHelper");

var _background = _interopRequireDefault(require("../../lib/background"));

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _selector = require("../../lib/selector");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getMeetingReducer = _interopRequireWildcard(require("./getMeetingReducer"));

var _meetingErrors = require("./meetingErrors");

var _meetingStatus = _interopRequireDefault(require("./meetingStatus"));

var _scheduleStatus = _interopRequireDefault(require("./scheduleStatus"));

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

var Meeting = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', 'ExtensionInfo', 'Storage', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'MeetingOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModule) {
  _inherits(Meeting, _RcModule);

  var _super = _createSuper(Meeting);

  function Meeting(_ref) {
    var _this;

    var alert = _ref.alert,
        client = _ref.client,
        extensionInfo = _ref.extensionInfo,
        storage = _ref.storage,
        availabilityMonitor = _ref.availabilityMonitor,
        reducers = _ref.reducers,
        showSaveAsDefault = _ref.showSaveAsDefault,
        options = _objectWithoutProperties(_ref, ["alert", "client", "extensionInfo", "storage", "availabilityMonitor", "reducers", "showSaveAsDefault"]);

    _classCallCheck(this, Meeting);

    _this = _super.call(this, _objectSpread(_objectSpread({}, options), {}, {
      actionTypes: options.actionTypes || _actionTypes["default"]
    }));
    _this._alert = void 0;
    _this._client = void 0;
    _this._extensionInfo = void 0;
    _this._storage = void 0;
    _this._availabilityMonitor = void 0;
    _this._lastMeetingSettingKey = void 0;
    _this._defaultMeetingSettingKey = void 0;
    _this._showSaveAsDefault = void 0;

    _initializerDefineProperty(_this, "defaultMeetingSetting", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "initialMeetingSetting", _descriptor2, _assertThisInitialized(_this));

    _this._alert = alert;
    _this._client = client;
    _this._storage = storage;
    _this._extensionInfo = extensionInfo;
    _this._showSaveAsDefault = showSaveAsDefault;
    _this._availabilityMonitor = availabilityMonitor;
    _this._lastMeetingSettingKey = 'lastMeetingSetting';
    _this._defaultMeetingSettingKey = 'defaultMeetingSetting';
    _this._reducer = (0, _getMeetingReducer["default"])(_this.actionTypes, reducers);

    _this._storage.registerReducer({
      key: _this._lastMeetingSettingKey,
      reducer: (0, _getMeetingReducer.getMeetingStorageReducer)(_this.actionTypes)
    });

    if (_this._showSaveAsDefault) {
      _this._storage.registerReducer({
        key: _this._defaultMeetingSettingKey,
        reducer: (0, _getMeetingReducer.getDefaultMeetingSettingReducer)(_this.actionTypes)
      });
    }

    return _this;
  }

  _createClass(Meeting, [{
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
      return this._alert.ready && this._storage.ready && this._extensionInfo.ready && (!this._availabilityMonitor || this._availabilityMonitor.ready) && this.pending;
    }
  }, {
    key: "_init",
    value: function _init() {
      this.store.dispatch({
        type: this.actionTypes.init
      });

      this._initMeeting();

      this.store.dispatch({
        type: this.actionTypes.initSuccess
      });
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!this._alert.ready || !this._storage.ready || !this._extensionInfo.ready || this._availabilityMonitor && !this._availabilityMonitor.ready) && this.ready;
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
    /**
     * Init basic meeting information
     * also load meeting setting from previous one.
     */

  }, {
    key: "init",
    value: function init() {
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
      this.update(this.defaultMeetingSetting);
    }
  }, {
    key: "update",
    value: function update(meeting) {
      this.store.dispatch({
        type: this.actionTypes.updateMeeting,
        meeting: meeting
      });
    }
  }, {
    key: "schedule",
    value: function () {
      var _schedule2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(meeting) {
        var _this3 = this;

        var _ref2,
            _ref2$isAlertSuccess,
            isAlertSuccess,
            opener,
            formattedMeeting,
            _yield$_promise,
            _yield$_promise2,
            resp,
            serviceInfo,
            result,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref2 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref2$isAlertSuccess = _ref2.isAlertSuccess, isAlertSuccess = _ref2$isAlertSuccess === void 0 ? true : _ref2$isAlertSuccess;
                opener = _args.length > 2 ? _args[2] : undefined;

                if (!this.isScheduling) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", this.schedule._promise);

              case 4:
                meeting = meeting || this.meeting;
                _context.prev = 5;
                this.store.dispatch({
                  type: this.actionTypes.initScheduling
                }); // Validate meeting

                this._validate(meeting);

                formattedMeeting = this._format(meeting);

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                this.schedule._promise = Promise.all([this._client.account().extension().meeting().post(formattedMeeting), this._client.account().extension().meeting().serviceInfo().get()]);
                _context.next = 13;
                return this.schedule._promise;

              case 13:
                _yield$_promise = _context.sent;
                _yield$_promise2 = _slicedToArray(_yield$_promise, 2);
                resp = _yield$_promise2[0];
                serviceInfo = _yield$_promise2[1];
                this.store.dispatch({
                  type: this.actionTypes.scheduled,
                  meeting: _objectSpread(_objectSpread({}, formattedMeeting), {}, {
                    _saved: meeting._saved
                  })
                });
                _context.next = 20;
                return this._createDialingNumberTpl(serviceInfo, resp, opener);

              case 20:
                result = _context.sent;

                // Reload meeting info
                this._initMeeting(); // Notify user the meeting has been scheduled


                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this3._alert.info({
                      message: _meetingStatus["default"].scheduledSuccess
                    });
                  }, 50);
                }

                return _context.abrupt("return", result);

              case 26:
                _context.prev = 26;
                _context.t0 = _context["catch"](5);
                this.store.dispatch({
                  type: this.actionTypes.resetScheduling
                });

                this._errorHandle(_context.t0);

                return _context.abrupt("return", null);

              case 31:
                _context.prev = 31;
                delete this.schedule._promise;
                return _context.finish(31);

              case 34:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 26, 31, 34]]);
      }));

      function schedule(_x) {
        return _schedule2.apply(this, arguments);
      }

      return schedule;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(meetingId) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this._client.account().extension().meeting(meetingId).get());

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getMeeting(_x2) {
        return _getMeeting.apply(this, arguments);
      }

      return getMeeting;
    }()
  }, {
    key: "updateMeeting",
    value: function () {
      var _updateMeeting = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(meetingId, meeting) {
        var _this4 = this;

        var _ref3,
            _ref3$isAlertSuccess,
            isAlertSuccess,
            opener,
            formattedMeeting,
            _yield$_promise3,
            _yield$_promise4,
            resp,
            serviceInfo,
            result,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _ref3 = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {}, _ref3$isAlertSuccess = _ref3.isAlertSuccess, isAlertSuccess = _ref3$isAlertSuccess === void 0 ? false : _ref3$isAlertSuccess;
                opener = _args3.length > 3 ? _args3[3] : undefined;

                if (!this._isUpdating(meetingId)) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", this.updateMeeting._promise);

              case 4:
                meeting = meeting || this.meeting;
                _context3.prev = 5;
                this.store.dispatch({
                  type: this.actionTypes.initUpdating,
                  meetingId: meetingId
                }); // Validate meeting

                this._validate(meeting);

                formattedMeeting = this._format(meeting);

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this.saveAsDefaultSetting(meeting);
                }

                this.updateMeeting._promise = Promise.all([this._client.account().extension().meeting(meetingId).put(formattedMeeting), this._client.account().extension().meeting().serviceInfo().get()]);
                _context3.next = 13;
                return this.updateMeeting._promise;

              case 13:
                _yield$_promise3 = _context3.sent;
                _yield$_promise4 = _slicedToArray(_yield$_promise3, 2);
                resp = _yield$_promise4[0];
                serviceInfo = _yield$_promise4[1];
                this.store.dispatch({
                  type: this.actionTypes.updated,
                  meeting: _objectSpread(_objectSpread({}, formattedMeeting), {}, {
                    _saved: meeting._saved
                  }),
                  meetingId: meetingId
                });
                _context3.next = 20;
                return this._createDialingNumberTpl(serviceInfo, resp, opener);

              case 20:
                result = _context3.sent;

                // Reload meeting info
                this._initMeeting(); // Notify user the meeting has been updated


                if (isAlertSuccess) {
                  setTimeout(function () {
                    _this4._alert.info({
                      message: _meetingStatus["default"].updatedSuccess
                    });
                  }, 50);
                }

                return _context3.abrupt("return", result);

              case 26:
                _context3.prev = 26;
                _context3.t0 = _context3["catch"](5);
                this.store.dispatch({
                  type: this.actionTypes.resetUpdating,
                  meetingId: meetingId
                });
                return _context3.abrupt("return", this._errorHandle(_context3.t0));

              case 30:
                _context3.prev = 30;
                delete this.updateMeeting._promise;
                return _context3.finish(30);

              case 33:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 26, 30, 33]]);
      }));

      function updateMeeting(_x3, _x4) {
        return _updateMeeting.apply(this, arguments);
      }

      return updateMeeting;
    }()
  }, {
    key: "_createDialingNumberTpl",
    value: function () {
      var _createDialingNumberTpl2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(serviceInfo, resp, opener) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                serviceInfo.mobileDialingNumberTpl = (0, _meetingHelper.getMobileDialingNumberTpl)(serviceInfo.dialInNumbers, resp.id);
                serviceInfo.phoneDialingNumberTpl = (0, _meetingHelper.getPhoneDialingNumberTpl)(serviceInfo.dialInNumbers);
                result = {
                  meeting: resp,
                  serviceInfo: serviceInfo,
                  extensionInfo: this.extensionInfo
                };

                if (!(typeof this.scheduledHook === 'function')) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 6;
                return this.scheduledHook(result, opener);

              case 6:
                return _context4.abrupt("return", result);

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _createDialingNumberTpl(_x5, _x6, _x7) {
        return _createDialingNumberTpl2.apply(this, arguments);
      }

      return _createDialingNumberTpl;
    }()
  }, {
    key: "_errorHandle",
    value: function _errorHandle(errors) {
      if (errors instanceof _meetingErrors.MeetingErrors) {
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

      return null;
    }
    /**
     * @param {number} meetingId
     */

  }, {
    key: "_isUpdating",
    value: function _isUpdating(meetingId) {
      return this.state.updatingStatus && (0, _ramda.find)(function (obj) {
        return obj.meetingId === meetingId;
      }, this.state.updatingStatus);
    }
    /**
     * Format meeting information.
     * @param {Object} meeting
     */

  }, {
    key: "_format",
    value: function _format(meeting) {
      var topic = meeting.topic,
          meetingType = meeting.meetingType,
          allowJoinBeforeHost = meeting.allowJoinBeforeHost,
          startHostVideo = meeting.startHostVideo,
          startParticipantsVideo = meeting.startParticipantsVideo,
          audioOptions = meeting.audioOptions,
          password = meeting.password,
          schedule = meeting.schedule,
          recurrence = meeting.recurrence;
      var formatted = {
        topic: topic,
        meetingType: meetingType,
        allowJoinBeforeHost: allowJoinBeforeHost,
        startHostVideo: startHostVideo,
        startParticipantsVideo: startParticipantsVideo,
        audioOptions: audioOptions,
        password: password,
        recurrence: recurrence
      }; // Recurring meetings do not have schedule info

      if (meetingType !== _meetingHelper.MeetingType.RECURRING) {
        var _schedule = {
          durationInMinutes: schedule.durationInMinutes,
          timeZone: {
            id: _meetingHelper.UTC_TIMEZONE_ID
          }
        };

        if (schedule.startTime) {
          // Format selected startTime to utc standard time
          // Timezone information is not included here
          _schedule.startTime = _moment["default"].utc(schedule.startTime).format();
        }

        formatted.schedule = _schedule;

        if (recurrence && recurrence.until) {
          formatted.recurrence.until = _moment["default"].utc(recurrence.until).format();
        }
      }

      return formatted;
    }
    /**
     * Validate meeting information format.
     * @param {Object} meeting
     * @throws
     */

  }, {
    key: "_validate",
    value: function _validate(meeting) {
      if (!meeting) {
        throw new _meetingErrors.MeetingErrors(_meetingStatus["default"].invalidMeetingInfo);
      }

      var topic = meeting.topic,
          password = meeting.password,
          schedule = meeting.schedule,
          _requireMeetingPassword = meeting._requireMeetingPassword;
      var errors = new _meetingErrors.MeetingErrors();

      if (topic.length <= 0) {
        errors.push(_meetingStatus["default"].emptyTopic);
      }

      if (_requireMeetingPassword && (!password || password.length <= 0)) {
        errors.push(_meetingStatus["default"].noPassword);
      }

      if (schedule) {
        if (schedule.durationInMinutes < 0) {
          errors.push(_meetingStatus["default"].durationIncorrect);
        }
      }

      if (errors.length > 0) {
        throw errors;
      }
    }
  }, {
    key: "saveAsDefaultSetting",
    value: function saveAsDefaultSetting(meeting) {
      var formattedMeeting = this._format(meeting);

      this.store.dispatch({
        type: this.actionTypes.saveAsDefaultSetting,
        meeting: _objectSpread(_objectSpread({}, formattedMeeting), {}, {
          _saved: meeting.notShowAgain
        })
      });
    }
  }, {
    key: "extensionInfo",
    get: function get() {
      return this._extensionInfo.info;
    }
  }, {
    key: "meeting",
    get: function get() {
      return this.state.meeting;
    }
  }, {
    key: "isScheduling",
    get: function get() {
      return this.state.schedulingStatus === _scheduleStatus["default"].scheduling;
    }
  }, {
    key: "isUpdating",
    get: function get() {
      return this.meeting && this.meeting.id && this._isUpdating(this.meeting.id);
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "savedDefaultMeetingSetting",
    get: function get() {
      return this._storage.getItem(this._defaultMeetingSettingKey);
    }
  }, {
    key: "lastMeetingSetting",
    get: function get() {
      return this._storage.getItem(this._lastMeetingSettingKey);
    }
  }, {
    key: "showSaveAsDefault",
    get: function get() {
      return !!this._showSaveAsDefault;
    }
  }]);

  return Meeting;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "init", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "update", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "schedule", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "schedule"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "defaultMeetingSetting", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return [function () {
      return _this5.initialMeetingSetting;
    }, function () {
      var savedSetting = _this5._showSaveAsDefault ? _this5.savedDefaultMeetingSetting : _this5.lastMeetingSetting;
      return savedSetting;
    }, function (initialSetting, savedSetting) {
      return _objectSpread(_objectSpread({}, initialSetting), savedSetting);
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "initialMeetingSetting", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this6 = this;

    return [function () {
      return _this6._extensionInfo.info.name || '';
    }, function () {
      return (0, _meetingHelper.getInitializedStartTime)();
    }, function (extensionName, startTime) {
      var setting = (0, _meetingHelper.getDefaultMeetingSettings)(extensionName, startTime);
      return setting;
    }];
  }
})), _class2)) || _class);
exports.Meeting = Meeting;
//# sourceMappingURL=meeting.js.map
