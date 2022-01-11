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
exports.RecentActivityUI = void 0;

require("regenerator-runtime/runtime");

var _callDirections = _interopRequireDefault(require("@ringcentral-integration/commons/enums/callDirections"));

var _di = require("@ringcentral-integration/commons/lib/di");

var _proxify = require("@ringcentral-integration/commons/lib/proxy/proxify");

var _Analytics = require("@ringcentral-integration/commons/modules/Analytics");

var _core = require("@ringcentral-integration/core");

var _getTabs2 = require("./getTabs");

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _dec2, _dec3, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var RecentActivityUI = (_dec = (0, _di.Module)({
  name: 'RecentActivityUI',
  deps: ['Locale', 'DateTimeFormat', 'RecentMessages', 'RecentCalls', 'ContactMatcher', {
    dep: 'RecentActivityUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(function (_, entry) {
  return [_Analytics.trackEvents.clickRecentActivity, {
    Entry: entry
  }];
}), _dec3 = (0, _core.track)(function (_, tabName, entry) {
  return [_getTabs2.trackTabsMap[tabName], {
    Entry: entry
  }];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModuleV) {
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
    key: "trackClickToggle",
    value: function () {
      var _trackClickToggle = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(entry) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function trackClickToggle(_x) {
        return _trackClickToggle.apply(this, arguments);
      }

      return trackClickToggle;
    }()
  }, {
    key: "trackClickTab",
    value: function () {
      var _trackClickTab = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(tabName, entry) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function trackClickTab(_x2, _x3) {
        return _trackClickTab.apply(this, arguments);
      }

      return trackClickTab;
    }()
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
    value: function getUIFunctions(_ref2) {
      var _this2 = this;

      var entry = _ref2.entry;
      return {
        trackClickToggle: function trackClickToggle(expanded) {
          if (expanded) {
            _this2.trackClickToggle(entry);
          }
        },
        trackClickTab: function trackClickTab(tabName) {
          return _this2.trackClickTab(tabName, entry);
        }
      };
    }
  }]);

  return RecentActivityUI;
}(_core.RcUIModuleV2), (_applyDecoratedDescriptor(_class2.prototype, "trackClickToggle", [_dec2, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "trackClickToggle"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "trackClickTab", [_dec3, _proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "trackClickTab"), _class2.prototype)), _class2)) || _class);
exports.RecentActivityUI = RecentActivityUI;
//# sourceMappingURL=RecentActivityUI.js.map
