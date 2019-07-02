"use strict";

require("core-js/modules/es6.array.find");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "UTC_TIMEZONE_ID", {
  enumerable: true,
  get: function get() {
    return _meetingHelper.UTC_TIMEZONE_ID;
  }
});
Object.defineProperty(exports, "MeetingType", {
  enumerable: true,
  get: function get() {
    return _meetingHelper.MeetingType;
  }
});
Object.defineProperty(exports, "getDefaultMeetingSettings", {
  enumerable: true,
  get: function get() {
    return _meetingHelper.getDefaultMeetingSettings;
  }
});
exports["default"] = exports.MeetingErrors = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.string.iterator");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

var _moment = _interopRequireDefault(require("moment"));

var _ramda = require("ramda");

var _format2 = _interopRequireWildcard(require("@ringcentral-integration/phone-number/lib/format"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _background = _interopRequireDefault(require("../../lib/background"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _scheduleStatus = _interopRequireDefault(require("./scheduleStatus"));

var _meetingStatus = _interopRequireDefault(require("./meetingStatus"));

var _getMeetingReducer = _interopRequireWildcard(require("./getMeetingReducer"));

var _meetingHelper = require("./meetingHelper");

var _dec, _class, _class2;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MeetingErrors =
/*#__PURE__*/
function () {
  function MeetingErrors(type) {
    _classCallCheck(this, MeetingErrors);

    this._errors = [];
    if (type) this._errors.push({
      message: type
    });
  }

  _createClass(MeetingErrors, [{
    key: "push",
    value: function push(type) {
      if (type) this._errors.push({
        message: type
      });
    }
  }, {
    key: "all",
    get: function get() {
      return this._errors;
    }
  }, {
    key: "length",
    get: function get() {
      return this._errors.length;
    }
  }]);

  return MeetingErrors;
}();

exports.MeetingErrors = MeetingErrors;
var Meeting = (_dec = (0, _di.Module)({
  deps: ['Alert', 'Client', 'ExtensionInfo', 'Storage', {
    dep: 'AvailabilityMonitor',
    optional: true
  }, {
    dep: 'MeetingOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(Meeting, _RcModule);

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Meeting).call(this, _objectSpread({}, options, {
      actionTypes: options.actionTypes || _actionTypes["default"]
    })));
    _this._alert = alert;
    _this._client = client;
    _this._extensionInfo = extensionInfo;
    _this._storage = storage;
    _this._availabilityMonitor = availabilityMonitor;
    _this._reducer = (0, _getMeetingReducer["default"])(_this.actionTypes, reducers);
    _this._lastMeetingSettingKey = 'lastMeetingSetting';
    _this._defaultMeetingSettingKey = 'defaultMeetingSetting';
    _this._showSaveAsDefault = showSaveAsDefault;

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
        type: this.actionTypes.initSuccess
      });

      if (!Object.keys(this.defaultMeetingSetting).length) {
        var extensionName = this._extensionInfo.info.name || '';
        var now = new Date();
        var startTime = now.setHours(now.getHours() + 1, 0, 0);
        var meeting = (0, _meetingHelper.getDefaultMeetingSettings)(extensionName, startTime);

        this._saveAsDefaultSetting(meeting);
      }
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
     * also load meeting settings from previous one.
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
      var extensionName = this._extensionInfo.info.name || '';
      var now = new Date();
      var startTime = now.setHours(now.getHours() + 1, 0, 0);

      if (this._showSaveAsDefault) {
        this.store.dispatch({
          type: this.actionTypes.updateMeeting,
          meeting: _objectSpread({}, (0, _meetingHelper.getDefaultMeetingSettings)(extensionName, startTime), this.defaultMeetingSetting)
        });
      } else {
        this.store.dispatch({
          type: this.actionTypes.updateMeeting,
          meeting: _objectSpread({}, (0, _meetingHelper.getDefaultMeetingSettings)(extensionName, startTime), this.lastMeetingInfo)
        });
      }
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
    key: "getMobileDialingNumberTpl",
    value: function getMobileDialingNumberTpl(dialInNumbers, meetingId) {
      return dialInNumbers.map(function (_ref2) {
        var phoneNumber = _ref2.phoneNumber,
            _ref2$location = _ref2.location,
            location = _ref2$location === void 0 ? '' : _ref2$location;
        return "".concat(phoneNumber, ",,").concat(meetingId, "# ").concat(location);
      }).join('\n    ');
    }
  }, {
    key: "getPhoneDialingNumberTpl",
    value: function getPhoneDialingNumberTpl(dialInNumbers) {
      return dialInNumbers.map(function (_ref3) {
        var phoneNumber = _ref3.phoneNumber,
            _ref3$location = _ref3.location,
            location = _ref3$location === void 0 ? '' : _ref3$location,
            country = _ref3.country;
        var filterFormattedNumber = (0, _format2["default"])({
          phoneNumber: phoneNumber,
          countryCode: country.isoCode,
          type: _format2.formatTypes.international
        });
        return "".concat(filterFormattedNumber).concat(location);
      }).join('\n    ');
    }
  }, {
    key: "schedule",
    value: function () {
      var _schedule2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(meeting) {
        var _this3 = this;

        var _ref4,
            _ref4$isAlertSuccess,
            isAlertSuccess,
            opener,
            formattedMeeting,
            _ref5,
            _ref6,
            resp,
            serviceInfo,
            mobileDialingNumberTpl,
            phoneDialingNumberTpl,
            result,
            _iteratorNormalCompletion,
            _didIteratorError,
            _iteratorError,
            _iterator,
            _step,
            error,
            _errors$apiResponse$j,
            errorCode,
            permissionName,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref4 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref4$isAlertSuccess = _ref4.isAlertSuccess, isAlertSuccess = _ref4$isAlertSuccess === void 0 ? true : _ref4$isAlertSuccess;
                opener = _args.length > 2 ? _args[2] : undefined;

                if (!this.isScheduling) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", null);

              case 4:
                meeting = meeting || this.meeting;
                _context.prev = 5;
                this.store.dispatch({
                  type: this.actionTypes.initScheduling
                }); // Validate meeting

                this._validate(meeting);

                formattedMeeting = this._format(meeting);

                if (this._showSaveAsDefault && meeting.saveAsDefault) {
                  this._saveAsDefaultSetting(meeting);
                }

                _context.next = 12;
                return Promise.all([this._client.account().extension().meeting().post(formattedMeeting), this._client.account().extension().meeting().serviceInfo().get()]);

              case 12:
                _ref5 = _context.sent;
                _ref6 = _slicedToArray(_ref5, 2);
                resp = _ref6[0];
                serviceInfo = _ref6[1];
                this.store.dispatch({
                  type: this.actionTypes.scheduled,
                  meeting: _objectSpread({}, formattedMeeting, {
                    _saved: meeting._saved
                  })
                });
                mobileDialingNumberTpl = this.getMobileDialingNumberTpl(serviceInfo.dialInNumbers, resp.id);
                phoneDialingNumberTpl = this.getPhoneDialingNumberTpl(serviceInfo.dialInNumbers, resp.id);
                serviceInfo.mobileDialingNumberTpl = mobileDialingNumberTpl;
                serviceInfo.phoneDialingNumberTpl = phoneDialingNumberTpl;
                result = {
                  meeting: resp,
                  serviceInfo: serviceInfo,
                  extensionInfo: this.extensionInfo
                };

                if (!(typeof this.scheduledHook === 'function')) {
                  _context.next = 25;
                  break;
                }

                _context.next = 25;
                return this.scheduledHook(result, opener);

              case 25:
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

              case 30:
                _context.prev = 30;
                _context.t0 = _context["catch"](5);
                this.store.dispatch({
                  type: this.actionTypes.resetScheduling
                });

                if (!(_context.t0 instanceof MeetingErrors)) {
                  _context.next = 55;
                  break;
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 37;

                for (_iterator = _context.t0.all[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  error = _step.value;

                  this._alert.warning(error);
                }

                _context.next = 45;
                break;

              case 41:
                _context.prev = 41;
                _context.t1 = _context["catch"](37);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 45:
                _context.prev = 45;
                _context.prev = 46;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 48:
                _context.prev = 48;

                if (!_didIteratorError) {
                  _context.next = 51;
                  break;
                }

                throw _iteratorError;

              case 51:
                return _context.finish(48);

              case 52:
                return _context.finish(45);

              case 53:
                _context.next = 56;
                break;

              case 55:
                if (_context.t0 && _context.t0.apiResponse) {
                  _errors$apiResponse$j = _context.t0.apiResponse.json(), errorCode = _errors$apiResponse$j.errorCode, permissionName = _errors$apiResponse$j.permissionName;

                  if (errorCode === 'InsufficientPermissions' && permissionName) {
                    this._alert.danger({
                      message: _meetingStatus["default"].insufficientPermissions,
                      payload: {
                        permissionName: permissionName
                      }
                    });
                  } else if (!this._availabilityMonitor || !this._availabilityMonitor.checkIfHAError(_context.t0)) {
                    this._alert.danger({
                      message: _meetingStatus["default"].internalError
                    });
                  }
                }

              case 56:
                return _context.abrupt("return", null);

              case 57:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 30], [37, 41, 45, 53], [46,, 48, 52]]);
      }));

      function schedule(_x) {
        return _schedule2.apply(this, arguments);
      }

      return schedule;
    }()
  }, {
    key: "getMeeting",
    value: function () {
      var _getMeeting = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(meetingId) {
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
      var _updateMeeting = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(meetingId, meeting) {
        var _this4 = this;

        var _ref7,
            _ref7$isAlertSuccess,
            isAlertSuccess,
            opener,
            formattedMeeting,
            _ref8,
            _ref9,
            resp,
            serviceInfo,
            mobileDialingNumberTpl,
            phoneDialingNumberTpl,
            result,
            _iteratorNormalCompletion2,
            _didIteratorError2,
            _iteratorError2,
            _iterator2,
            _step2,
            error,
            _errors$apiResponse$j2,
            errorCode,
            permissionName,
            _args3 = arguments;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _ref7 = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {}, _ref7$isAlertSuccess = _ref7.isAlertSuccess, isAlertSuccess = _ref7$isAlertSuccess === void 0 ? false : _ref7$isAlertSuccess;
                opener = _args3.length > 3 ? _args3[3] : undefined;

                if (!this._isUpdating(meetingId)) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", null);

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
                  this._saveAsDefaultSetting(meeting);
                }

                _context3.next = 12;
                return Promise.all([this._client.account().extension().meeting(meetingId).put(formattedMeeting), this._client.account().extension().meeting().serviceInfo().get()]);

              case 12:
                _ref8 = _context3.sent;
                _ref9 = _slicedToArray(_ref8, 2);
                resp = _ref9[0];
                serviceInfo = _ref9[1];
                this.store.dispatch({
                  type: this.actionTypes.updated,
                  meeting: _objectSpread({}, formattedMeeting, {
                    _saved: meeting._saved
                  }),
                  meetingId: meetingId
                });
                mobileDialingNumberTpl = this.getMobileDialingNumberTpl(serviceInfo.dialInNumbers, resp.id);
                phoneDialingNumberTpl = this.getPhoneDialingNumberTpl(serviceInfo.dialInNumbers, resp.id);
                serviceInfo.mobileDialingNumberTpl = mobileDialingNumberTpl;
                serviceInfo.phoneDialingNumberTpl = phoneDialingNumberTpl;
                result = {
                  meeting: resp,
                  serviceInfo: serviceInfo,
                  extensionInfo: this.extensionInfo
                };

                if (!(typeof this.scheduledHook === 'function')) {
                  _context3.next = 25;
                  break;
                }

                _context3.next = 25;
                return this.scheduledHook(result, opener);

              case 25:
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

              case 30:
                _context3.prev = 30;
                _context3.t0 = _context3["catch"](5);
                this.store.dispatch({
                  type: this.actionTypes.resetUpdating,
                  meetingId: meetingId
                });

                if (!(_context3.t0 instanceof MeetingErrors)) {
                  _context3.next = 55;
                  break;
                }

                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context3.prev = 37;

                for (_iterator2 = _context3.t0.all[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  error = _step2.value;

                  this._alert.warning(error);
                }

                _context3.next = 45;
                break;

              case 41:
                _context3.prev = 41;
                _context3.t1 = _context3["catch"](37);
                _didIteratorError2 = true;
                _iteratorError2 = _context3.t1;

              case 45:
                _context3.prev = 45;
                _context3.prev = 46;

                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }

              case 48:
                _context3.prev = 48;

                if (!_didIteratorError2) {
                  _context3.next = 51;
                  break;
                }

                throw _iteratorError2;

              case 51:
                return _context3.finish(48);

              case 52:
                return _context3.finish(45);

              case 53:
                _context3.next = 56;
                break;

              case 55:
                if (_context3.t0 && _context3.t0.apiResponse) {
                  _errors$apiResponse$j2 = _context3.t0.apiResponse.json(), errorCode = _errors$apiResponse$j2.errorCode, permissionName = _errors$apiResponse$j2.permissionName;

                  if (errorCode === 'InsufficientPermissions' && permissionName) {
                    this._alert.danger({
                      message: _meetingStatus["default"].insufficientPermissions,
                      payload: {
                        permissionName: permissionName
                      }
                    });
                  } else if (!this._availabilityMonitor || !this._availabilityMonitor.checkIfHAError(_context3.t0)) {
                    this._alert.danger({
                      message: _meetingStatus["default"].internalError
                    });
                  }
                }

              case 56:
                return _context3.abrupt("return", null);

              case 57:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[5, 30], [37, 41, 45, 53], [46,, 48, 52]]);
      }));

      function updateMeeting(_x3, _x4) {
        return _updateMeeting.apply(this, arguments);
      }

      return updateMeeting;
    }()
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
          schedule = meeting.schedule;
      var formatted = {
        topic: topic,
        meetingType: meetingType,
        allowJoinBeforeHost: allowJoinBeforeHost,
        startHostVideo: startHostVideo,
        startParticipantsVideo: startParticipantsVideo,
        audioOptions: audioOptions,
        password: password
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
        throw new MeetingErrors(_meetingStatus["default"].invalidMeetingInfo);
      }

      var topic = meeting.topic,
          password = meeting.password,
          schedule = meeting.schedule,
          _requireMeetingPassword = meeting._requireMeetingPassword;
      var errors = new MeetingErrors();

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
    key: "_saveAsDefaultSetting",
    value: function _saveAsDefaultSetting(meeting) {
      var formattedMeeting = this._format(meeting);

      this.store.dispatch({
        type: this.actionTypes.saveAsDefaultSetting,
        meeting: _objectSpread({}, formattedMeeting, {
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
    key: "lastMeetingInfo",
    get: function get() {
      var state = this._storage.getItem(this._lastMeetingSettingKey);

      return state;
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
    key: "defaultMeetingSetting",
    get: function get() {
      return this._storage.getItem(this._defaultMeetingSettingKey) || {};
    }
  }, {
    key: "showSaveAsDefault",
    get: function get() {
      return this._showSaveAsDefault || false;
    }
  }]);

  return Meeting;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "init", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "init"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "reload", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "reload"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "update", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "update"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "schedule", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "schedule"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getMeeting"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateMeeting", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateMeeting"), _class2.prototype)), _class2)) || _class);
exports["default"] = Meeting;
//# sourceMappingURL=index.js.map
