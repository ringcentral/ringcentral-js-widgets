"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecentActivityUI = void 0;

var _core = require("@ringcentral-integration/core");

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _di = require("ringcentral-integration/lib/di");

var _i18n = _interopRequireDefault(require("./i18n"));

var _getTabs2 = require("./getTabs");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var RecentActivityUI = (_dec = (0, _di.Module)({
  name: 'RecentActivityUI',
  deps: ['Locale', 'DateTimeFormat', 'RecentMessages', 'RecentCalls', 'ContactMatcher', {
    dep: 'RecentActivityUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(RecentActivityUI, _RcUIModuleV);

  var _super = _createSuper(RecentActivityUI);

  function RecentActivityUI(deps) {
    _classCallCheck(this, RecentActivityUI);

    return _super.call(this, {
      deps: deps
    });
  }

  _createClass(RecentActivityUI, [{
    key: "getTabs",
    value: function getTabs(options) {
      return (0, _getTabs2.getTabs)(options);
    }
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _this = this,
          _this$_deps$recentCal;

      var _ref$currentLocale = _ref.currentLocale,
          currentLocale = _ref$currentLocale === void 0 ? this._deps.locale.currentLocale : _ref$currentLocale,
          navigateTo = _ref.navigateTo,
          _ref$dateTimeFormatte = _ref.dateTimeFormatter,
          dateTimeFormatter = _ref$dateTimeFormatte === void 0 ? function () {
        var _this$_deps$dateTimeF;

        return (_this$_deps$dateTimeF = _this._deps.dateTimeFormat).formatDateTime.apply(_this$_deps$dateTimeF, arguments);
      } : _ref$dateTimeFormatte,
          getSession = _ref.getSession,
          _ref$useContact = _ref.useContact,
          useContact = _ref$useContact === void 0 ? false : _ref$useContact,
          getContact = _ref.getContact,
          _ref$showRecentCalls = _ref.showRecentCalls,
          showRecentCalls = _ref$showRecentCalls === void 0 ? true : _ref$showRecentCalls,
          _ref$showRecentMessag = _ref.showRecentMessage,
          showRecentMessage = _ref$showRecentMessag === void 0 ? true : _ref$showRecentMessag,
          _ref$showFax = _ref.showFax,
          showFax = _ref$showFax === void 0 ? true : _ref$showFax,
          _ref$showVoiceMails = _ref.showVoiceMails,
          showVoiceMails = _ref$showVoiceMails === void 0 ? true : _ref$showVoiceMails;
      var sessionId = null;
      var currentContact = getContact === null || getContact === void 0 ? void 0 : getContact();
      var ready = this._deps.dateTimeFormat.ready && this._deps.locale.ready && this._deps.recentMessages.ready && this._deps.recentCalls.ready;

      if (!useContact) {
        var session = getSession();
        sessionId = session.id;
        currentContact = session.contactMatch;
        var contactMapping = this._deps.contactMatcher.dataMapping;
        var phoneNumber = session.direction === _callDirections["default"].outbound ? session.to : session.from;

        if (!currentContact) {
          var entities = contactMapping === null || contactMapping === void 0 ? void 0 : contactMapping[phoneNumber];

          if ((entities === null || entities === void 0 ? void 0 : entities.length) >= 1) {
            currentContact = entities[0];
          }
        }

        ready = ready && this._deps.contactMatcher.ready;
      }

      return {
        currentLocale: currentLocale,
        title: _i18n["default"].getString('recentActivities', this._deps.locale.currentLocale),
        showSpinner: !ready,
        currentContact: currentContact,
        calls: (_this$_deps$recentCal = this._deps.recentCalls.calls) !== null && _this$_deps$recentCal !== void 0 ? _this$_deps$recentCal : {},
        tabs: this.getTabs({
          ready: ready,
          currentLocale: currentLocale,
          dateTimeFormatter: dateTimeFormatter,
          navigateTo: navigateTo,
          currentContact: currentContact,
          recentMessages: this._deps.recentMessages,
          recentCalls: this._deps.recentCalls,
          sessionId: sessionId,
          showFax: showFax,
          showRecentCalls: showRecentCalls,
          showVoiceMails: showVoiceMails,
          showRecentMessage: showRecentMessage
        }),
        defaultTab: 'recentCalls'
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      return {};
    }
  }]);

  return RecentActivityUI;
}(_core.RcUIModuleV2)) || _class);
exports.RecentActivityUI = RecentActivityUI;
//# sourceMappingURL=RecentActivityUI.js.map
