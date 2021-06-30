"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

var _di = require("@ringcentral-integration/commons/lib/di");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var VideoUI = (_dec = (0, _di.Module)({
  name: 'VideoUI',
  deps: ['RcVideo', 'Locale', 'RateLimiter', 'ConnectivityMonitor', 'Brand']
}), _dec(_class = /*#__PURE__*/function (_RcUIModule) {
  _inherits(VideoUI, _RcUIModule);

  var _super = _createSuper(VideoUI);

  function VideoUI(_ref) {
    var _this;

    var rcVideo = _ref.rcVideo,
        locale = _ref.locale,
        rateLimiter = _ref.rateLimiter,
        connectivityMonitor = _ref.connectivityMonitor,
        brand = _ref.brand,
        options = _objectWithoutProperties(_ref, ["rcVideo", "locale", "rateLimiter", "connectivityMonitor", "brand"]);

    _classCallCheck(this, VideoUI);

    _this = _super.call(this, _objectSpread({}, options));
    _this._locale = void 0;
    _this._rcVideo = void 0;
    _this._rateLimiter = void 0;
    _this._connectivityMonitor = void 0;
    _this._brand = void 0;
    _this._rcVideo = rcVideo;
    _this._locale = locale;
    _this._rateLimiter = rateLimiter;
    _this._connectivityMonitor = connectivityMonitor;
    _this._brand = brand;
    return _this;
  }

  _createClass(VideoUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _this$_rcVideo$person;

      var disabled = _ref2.disabled;
      return {
        currentLocale: this._locale.currentLocale,
        meeting: this._rcVideo.meeting,
        enablePersonalMeeting: this._rcVideo.enablePersonalMeeting,
        personalMeetingId: this._rcVideo.ready && ((_this$_rcVideo$person = this._rcVideo.personalMeeting) === null || _this$_rcVideo$person === void 0 ? void 0 : _this$_rcVideo$person.shortId),
        showSaveAsDefault: this._rcVideo.showSaveAsDefault,
        disableSaveAsDefault: !this._rcVideo.isPreferencesChanged,
        brandName: this._brand.name,
        disabled: this._rcVideo.isScheduling || disabled || !this._connectivityMonitor.connectivity || this._rateLimiter && this._rateLimiter.throttling,
        hasSettingsChanged: this._rcVideo.hasSettingsChanged
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this2 = this;

      var _schedule = _ref3.schedule;
      return {
        updateMeetingSettings: function updateMeetingSettings(value) {
          return _this2._rcVideo.updateMeetingSettings(value);
        },
        validatePasswordSettings: function validatePasswordSettings(password, isSecret) {
          return _this2._rcVideo.validatePasswordSettings(password, isSecret);
        },
        switchUsePersonalMeetingId: function switchUsePersonalMeetingId(usePersonalMeetingId) {
          return _this2._rcVideo.switchUsePersonalMeetingId(usePersonalMeetingId);
        },
        schedule: function () {
          var _schedule2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(meetingInfo, opener) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!_schedule) {
                      _context.next = 4;
                      break;
                    }

                    _context.next = 3;
                    return _schedule(meetingInfo, opener);

                  case 3:
                    return _context.abrupt("return");

                  case 4:
                    if (!meetingInfo.usePersonalMeetingId) {
                      _context.next = 9;
                      break;
                    }

                    _context.next = 7;
                    return _this2._rcVideo.updateMeeting(_this2._rcVideo.personalMeeting.id, meetingInfo);

                  case 7:
                    _context.next = 11;
                    break;

                  case 9:
                    _context.next = 11;
                    return _this2._rcVideo.createMeeting(meetingInfo);

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function schedule(_x, _x2) {
            return _schedule2.apply(this, arguments);
          }

          return schedule;
        }(),
        updateHasSettingsChanged: this._rcVideo.updateHasSettingsChanged,
        init: function init() {
          _this2._rcVideo.init();
        }
      };
    }
  }]);

  return VideoUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = VideoUI;
//# sourceMappingURL=index.js.map
