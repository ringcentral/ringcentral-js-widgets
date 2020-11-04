"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactDetailsUI = void 0;

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

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.find");

var _di = require("ringcentral-integration/lib/di");

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _formatNumber2 = require("ringcentral-integration/lib/formatNumber");

var _proxify = _interopRequireDefault(require("ringcentral-integration/lib/proxy/proxify"));

var _phoneTypes = require("ringcentral-integration/enums/phoneTypes");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var DEFAULT_DIALER_ROUTE = '/dialer';
var DEFAULT_COMPOSETEXT_ROUTE = '/composeText';
var ContactDetailsUI = (_dec = (0, _di.Module)({
  name: 'ContactDetailsUI',
  deps: ['RouterInteraction', 'ContactSearch', 'Contacts', 'ExtensionInfo', 'RolesAndPermissions', 'RateLimiter', 'RegionSettings', 'ConnectivityManager', 'Call', 'DialerUI', 'ComposeText', 'Brand', 'Locale', 'CallingSettings', {
    dep: 'ContactDetailsUIOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcUIModule) {
  _inherits(ContactDetailsUI, _RcUIModule);

  var _super = _createSuper(ContactDetailsUI);

  // for track
  function ContactDetailsUI(_ref) {
    var _this;

    var routerInteraction = _ref.routerInteraction,
        contactSearch = _ref.contactSearch,
        contacts = _ref.contacts,
        rolesAndPermissions = _ref.rolesAndPermissions,
        rateLimiter = _ref.rateLimiter,
        regionSettings = _ref.regionSettings,
        connectivityManager = _ref.connectivityManager,
        call = _ref.call,
        dialerUI = _ref.dialerUI,
        composeText = _ref.composeText,
        brand = _ref.brand,
        locale = _ref.locale,
        callingSettings = _ref.callingSettings,
        extensionInfo = _ref.extensionInfo,
        _ref$composeTextRoute = _ref.composeTextRoute,
        composeTextRoute = _ref$composeTextRoute === void 0 ? DEFAULT_COMPOSETEXT_ROUTE : _ref$composeTextRoute,
        _ref$dialerRoute = _ref.dialerRoute,
        dialerRoute = _ref$dialerRoute === void 0 ? DEFAULT_DIALER_ROUTE : _ref$dialerRoute,
        options = _objectWithoutProperties(_ref, ["routerInteraction", "contactSearch", "contacts", "rolesAndPermissions", "rateLimiter", "regionSettings", "connectivityManager", "call", "dialerUI", "composeText", "brand", "locale", "callingSettings", "extensionInfo", "composeTextRoute", "dialerRoute"]);

    _classCallCheck(this, ContactDetailsUI);

    _this = _super.call(this, _objectSpread({
      routerInteraction: routerInteraction,
      contactSearch: contactSearch,
      contacts: contacts,
      rolesAndPermissions: rolesAndPermissions,
      rateLimiter: rateLimiter,
      regionSettings: regionSettings,
      connectivityManager: connectivityManager,
      call: call,
      dialerUI: dialerUI,
      composeText: composeText,
      brand: brand,
      locale: locale,
      callingSettings: callingSettings
    }, options));
    _this._routerInteraction = routerInteraction;
    _this._contactSearch = contactSearch;
    _this._contacts = contacts;
    _this._extensionInfo = extensionInfo;
    _this._rolesAndPermissions = rolesAndPermissions;
    _this._rateLimiter = rateLimiter;
    _this._regionSettings = regionSettings;
    _this._connectivityManager = connectivityManager;
    _this._call = call;
    _this._dialerUI = dialerUI;
    _this._composeText = composeText;
    _this._brand = brand;
    _this._locale = locale;
    _this._callingSettings = callingSettings;
    _this._composeTextRoute = composeTextRoute;
    _this._dialerRoute = dialerRoute;
    return _this;
  }

  _createClass(ContactDetailsUI, [{
    key: "showContactDetails",
    value: function showContactDetails(_ref2) {
      var id = _ref2.id,
          type = _ref2.type,
          _ref2$direct = _ref2.direct,
          direct = _ref2$direct === void 0 ? false : _ref2$direct;

      var contact = this._contacts.find({
        id: id,
        type: type
      });

      if (contact) {
        this._routerInteraction.push("/contacts/".concat(type, "/").concat(id).concat(direct ? '?direct=true' : ''));

        this._contacts.getProfileImage(contact, false);

        this._contacts.getPresence(contact, false);
      }
    }
  }, {
    key: "getContact",
    value: function getContact(_ref3) {
      var _this$_contacts$find, _this$_contacts;

      var id = _ref3.id,
          type = _ref3.type;
      return (_this$_contacts$find = (_this$_contacts = this._contacts) === null || _this$_contacts === void 0 ? void 0 : _this$_contacts.find({
        id: id,
        type: type
      })) !== null && _this$_contacts$find !== void 0 ? _this$_contacts$find : null;
    }
  }, {
    key: "handleClickToDial",
    value: function () {
      var _handleClickToDial = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(contact, phoneNumber) {
        var recipient;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                recipient = _objectSpread(_objectSpread({}, contact), {}, {
                  phoneNumber: phoneNumber
                });

                if (this._call.isIdle) {
                  this._routerInteraction.push(this._dialerRoute);

                  this._dialerUI.call({
                    recipient: recipient
                  });

                  this.store.dispatch({
                    type: this.actionTypes.clickToCall
                  });
                }

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleClickToDial(_x, _x2) {
        return _handleClickToDial.apply(this, arguments);
      }

      return handleClickToDial;
    }()
  }, {
    key: "handleClickToSMS",
    value: function () {
      var _handleClickToSMS = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(contact, phoneNumber) {
        var recipient;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                recipient = _objectSpread(_objectSpread({}, contact), {}, {
                  phoneNumber: phoneNumber
                });

                if (this._routerInteraction) {
                  this._routerInteraction.push(this._composeTextRoute);
                }

                this._composeText.addToNumber(recipient);

                if (this._composeText.typingToNumber === recipient.phoneNumber) {
                  this._composeText.cleanTypingToNumber();
                } // for tracking


                this.store.dispatch({
                  type: this.actionTypes.clickToSMS
                });

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleClickToSMS(_x3, _x4) {
        return _handleClickToSMS.apply(this, arguments);
      }

      return handleClickToSMS;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps(_ref4) {
      var _this$_locale, _this$_extensionInfo$, _this$_extensionInfo, _this$_connectivityMa, _this$_connectivityMa2, _this$_connectivityMa3, _this$_rateLimiter, _this$_connectivityMa4, _this$_connectivityMa5, _this$_rateLimiter2, _this$_locale2, _this$_contactSearch, _this$_rolesAndPermis;

      var _ref4$params = _ref4.params,
          contactId = _ref4$params.contactId,
          contactType = _ref4$params.contactType;
      return {
        currentLocale: (_this$_locale = this._locale) === null || _this$_locale === void 0 ? void 0 : _this$_locale.currentLocale,
        contact: this.getContact({
          id: contactId,
          type: contactType
        }),
        isMultipleSiteEnabled: (_this$_extensionInfo$ = (_this$_extensionInfo = this._extensionInfo) === null || _this$_extensionInfo === void 0 ? void 0 : _this$_extensionInfo.isMultipleSiteEnabled) !== null && _this$_extensionInfo$ !== void 0 ? _this$_extensionInfo$ : false,
        isCallButtonDisabled: !!(((_this$_connectivityMa = this._connectivityManager) === null || _this$_connectivityMa === void 0 ? void 0 : _this$_connectivityMa.isOfflineMode) || ((_this$_connectivityMa2 = this._connectivityManager) === null || _this$_connectivityMa2 === void 0 ? void 0 : _this$_connectivityMa2.isWebphoneUnavailableMode) || ((_this$_connectivityMa3 = this._connectivityManager) === null || _this$_connectivityMa3 === void 0 ? void 0 : _this$_connectivityMa3.isWebphoneInitializing) || ((_this$_rateLimiter = this._rateLimiter) === null || _this$_rateLimiter === void 0 ? void 0 : _this$_rateLimiter.throttling)),
        disableLinks: !!(((_this$_connectivityMa4 = this._connectivityManager) === null || _this$_connectivityMa4 === void 0 ? void 0 : _this$_connectivityMa4.isOfflineMode) || ((_this$_connectivityMa5 = this._connectivityManager) === null || _this$_connectivityMa5 === void 0 ? void 0 : _this$_connectivityMa5.isVoipOnlyMode) || ((_this$_rateLimiter2 = this._rateLimiter) === null || _this$_rateLimiter2 === void 0 ? void 0 : _this$_rateLimiter2.throttling)),
        showSpinner: !(((_this$_locale2 = this._locale) === null || _this$_locale2 === void 0 ? void 0 : _this$_locale2.ready) && ((_this$_contactSearch = this._contactSearch) === null || _this$_contactSearch === void 0 ? void 0 : _this$_contactSearch.ready) && ((_this$_rolesAndPermis = this._rolesAndPermissions) === null || _this$_rolesAndPermis === void 0 ? void 0 : _this$_rolesAndPermis.ready))
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;

      return {
        formatNumber: function formatNumber() {
          var _this2$_extensionInfo, _this2$_extensionInfo2, _this2$_extensionInfo3;

          var phoneNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

          if (!phoneNumber) {
            return phoneNumber;
          } // if the cleaned phone number is not a E164 format
          // we will show it directly, doesn't format it.


          var cleanedNumber = (0, _phoneNumber.parseIncompletePhoneNumber)(phoneNumber.toString());
          var isE164Number = (0, _phoneNumber.isE164)(cleanedNumber);

          if (isE164Number) {
            var formattedNumber = (0, _formatNumber2.formatNumber)({
              phoneNumber: phoneNumber,
              countryCode: _this2._regionSettings.countryCode
            });
            return formattedNumber;
          } // if multi-site is enabled then we will try to remove site code with same site


          if (((_this2$_extensionInfo = _this2._extensionInfo) === null || _this2$_extensionInfo === void 0 ? void 0 : _this2$_extensionInfo.isMultipleSiteEnabled) && ((_this2$_extensionInfo2 = _this2._extensionInfo) === null || _this2$_extensionInfo2 === void 0 ? void 0 : (_this2$_extensionInfo3 = _this2$_extensionInfo2.site) === null || _this2$_extensionInfo3 === void 0 ? void 0 : _this2$_extensionInfo3.code)) {
            var _this2$_extensionInfo4;

            var _formattedNumber = (0, _formatNumber2.formatNumber)({
              phoneNumber: phoneNumber,
              countryCode: _this2._regionSettings.countryCode,
              siteCode: (_this2$_extensionInfo4 = _this2._extensionInfo.site) === null || _this2$_extensionInfo4 === void 0 ? void 0 : _this2$_extensionInfo4.code,
              isMultipleSiteEnabled: _this2._extensionInfo.isMultipleSiteEnabled
            });

            return _formattedNumber;
          }

          return phoneNumber;
        },
        canTextButtonShow: function canTextButtonShow(phoneType) {
          var _this2$_rolesAndPermi, _this2$_rolesAndPermi2, _this2$_rolesAndPermi3, _this2$_rolesAndPermi4, _this2$_rolesAndPermi5, _this2$_rolesAndPermi6;

          var outboundSmsPermission = !!((_this2$_rolesAndPermi = (_this2$_rolesAndPermi2 = _this2._rolesAndPermissions) === null || _this2$_rolesAndPermi2 === void 0 ? void 0 : (_this2$_rolesAndPermi3 = _this2$_rolesAndPermi2.permissions) === null || _this2$_rolesAndPermi3 === void 0 ? void 0 : _this2$_rolesAndPermi3.OutboundSMS) !== null && _this2$_rolesAndPermi !== void 0 ? _this2$_rolesAndPermi : false);
          var internalSmsPermission = !!((_this2$_rolesAndPermi4 = (_this2$_rolesAndPermi5 = _this2._rolesAndPermissions) === null || _this2$_rolesAndPermi5 === void 0 ? void 0 : (_this2$_rolesAndPermi6 = _this2$_rolesAndPermi5.permissions) === null || _this2$_rolesAndPermi6 === void 0 ? void 0 : _this2$_rolesAndPermi6.InternalSMS) !== null && _this2$_rolesAndPermi4 !== void 0 ? _this2$_rolesAndPermi4 : false); // guess this statement is to avoid exception

          var isClickToTextEnabled = !!_this2._composeText;
          return isClickToTextEnabled && phoneType !== _phoneTypes.phoneTypes.fax && (phoneType === _phoneTypes.phoneTypes.extension ? internalSmsPermission : outboundSmsPermission);
        },
        canCallButtonShow: function canCallButtonShow(phoneType) {
          var _this2$_rolesAndPermi7, _this2$_rolesAndPermi8;

          var isClickToDialEnabled = !!(_this2._dialerUI && ((_this2$_rolesAndPermi7 = (_this2$_rolesAndPermi8 = _this2._rolesAndPermissions) === null || _this2$_rolesAndPermi8 === void 0 ? void 0 : _this2$_rolesAndPermi8.callingEnabled) !== null && _this2$_rolesAndPermi7 !== void 0 ? _this2$_rolesAndPermi7 : false));
          return isClickToDialEnabled && phoneType !== _phoneTypes.phoneTypes.fax;
        },
        onBackClick: function onBackClick() {
          _this2._routerInteraction.goBack();
        },
        onClickToDial: function onClickToDial(contact, phoneNumber) {
          return _this2.handleClickToDial(contact, phoneNumber);
        },
        onClickToSMS: function onClickToSMS(contact, phoneNumber) {
          return _this2.handleClickToSMS(contact, phoneNumber);
        }
      };
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      return _ObjectMap.ObjectMap.prefixKeys([//
      'clickToSMS', 'clickToCall'], 'contactDetails');
    }
  }]);

  return ContactDetailsUI;
}(_RcUIModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "showContactDetails", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "showContactDetails"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleClickToDial", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "handleClickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleClickToSMS", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "handleClickToSMS"), _class2.prototype)), _class2)) || _class);
exports.ContactDetailsUI = ContactDetailsUI;
//# sourceMappingURL=ContactDetailsUI.js.map
