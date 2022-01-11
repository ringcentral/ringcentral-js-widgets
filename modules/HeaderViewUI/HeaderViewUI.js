"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderViewUI = void 0;

var _react = _interopRequireDefault(require("react"));

var _di = require("@ringcentral-integration/commons/lib/di");

var _core = require("@ringcentral-integration/core");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var HeaderViewUI = (_dec = (0, _di.Module)({
  name: 'HeaderViewUI',
  deps: ['Auth', 'CallMonitor', 'RouterInteraction', 'Locale', 'Webphone', 'Presence', {
    dep: 'UserGuide',
    optional: true
  }, {
    dep: 'QuickAccess',
    optional: true
  }, {
    dep: 'Brand',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(HeaderViewUI, _RcUIModuleV);

  var _super = _createSuper(HeaderViewUI);

  function HeaderViewUI(deps) {
    _classCallCheck(this, HeaderViewUI);

    return _super.call(this, {
      deps: deps
    });
  }

  _createClass(HeaderViewUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var standAlone = _ref.standAlone;
      var _this$_deps = this._deps,
          auth = _this$_deps.auth,
          callMonitor = _this$_deps.callMonitor,
          routerInteraction = _this$_deps.routerInteraction,
          locale = _this$_deps.locale,
          webphone = _this$_deps.webphone,
          presence = _this$_deps.presence;
      return {
        standAlone: standAlone,
        userStatus: auth.loggedIn && presence.userStatus || undefined,
        dndStatus: auth.loggedIn && presence.dndStatus || undefined,
        ringingCalls: callMonitor.activeRingCalls || [],
        onHoldCalls: callMonitor.activeOnHoldCalls || [],
        currentCalls: callMonitor.activeCurrentCalls || [],
        currentPath: routerInteraction.currentPath,
        currentLocale: locale.currentLocale,
        activeSessionId: webphone.activeSessionId || '',
        incomingCallPageMinimized: !webphone.ringSession || webphone.ringSession.minimized,
        presenceReady: presence.ready
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this$_deps$brand, _this$_deps$brand$bra;

      var logo = _ref2.logo;
      var _this$_deps2 = this._deps,
          routerInteraction = _this$_deps2.routerInteraction,
          userGuide = _this$_deps2.userGuide,
          quickAccess = _this$_deps2.quickAccess,
          webphone = _this$_deps2.webphone,
          presence = _this$_deps2.presence;
      var logoUrl = (_this$_deps$brand = this._deps.brand) === null || _this$_deps$brand === void 0 ? void 0 : (_this$_deps$brand$bra = _this$_deps$brand.brandConfig.assets) === null || _this$_deps$brand$bra === void 0 ? void 0 : _this$_deps$brand$bra.logo;
      return {
        logo: (logoUrl ? function () {
          return /*#__PURE__*/_react["default"].createElement("img", {
            src: logoUrl,
            alt: ""
          });
        } : undefined) || logo,
        onCurrentCallBtnClick: function onCurrentCallBtnClick() {
          if (routerInteraction.currentPath !== '/calls/active') {
            routerInteraction.push('/calls/active');
          }

          if (userGuide) {
            userGuide.dismiss();
          }

          if (quickAccess) {
            quickAccess.exit();
          } // TODO: need to replace webphone with webphoneV2


          if (webphone && webphone.ringSession && !webphone.ringSession.minimized) {
            webphone.toggleMinimized(webphone.ringSession.id);
          }
        },
        onViewCallBtnClick: function onViewCallBtnClick() {
          if (routerInteraction.currentPath !== '/calls') {
            routerInteraction.push('/calls');
          }

          if (userGuide) {
            userGuide.dismiss();
          }

          if (quickAccess) {
            quickAccess.exit();
          }

          if (webphone && webphone.ringSession && !webphone.ringSession.minimized) {
            webphone.toggleMinimized(webphone.ringSession.id);
          }
        },
        setAvailable: function setAvailable() {
          return presence && presence.setAvailable();
        },
        setBusy: function setBusy() {
          return presence && presence.setBusy();
        },
        setDoNotDisturb: function setDoNotDisturb() {
          return presence && presence.setDoNotDisturb();
        },
        setInvisible: function setInvisible() {
          return presence && presence.setInvisible();
        }
      };
    }
  }]);

  return HeaderViewUI;
}(_core.RcUIModuleV2)) || _class);
exports.HeaderViewUI = HeaderViewUI;
//# sourceMappingURL=HeaderViewUI.js.map
