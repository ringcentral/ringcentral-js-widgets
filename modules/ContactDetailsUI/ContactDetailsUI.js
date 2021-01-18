"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactDetailsUI = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

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

var _core = require("@ringcentral-integration/core");

var _di = require("ringcentral-integration/lib/di");

var _background = _interopRequireDefault(require("ringcentral-integration/lib/background"));

var _proxify = _interopRequireDefault(require("ringcentral-integration/lib/proxy/proxify"));

var _phoneNumber = require("@ringcentral-integration/phone-number");

var _phoneTypes = require("ringcentral-integration/enums/phoneTypes");

var _formatNumber2 = require("ringcentral-integration/lib/formatNumber");

var _trackEvents = require("./trackEvents");

var _contactReadyStates = require("./contactReadyStates");

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DEFAULT_DIALER_ROUTE = '/dialer';
var DEFAULT_COMPOSE_TEXT_ROUTE = '/composeText';
var ContactDetailsUI = (_dec = (0, _di.Module)({
  name: 'ContactDetailsUI',
  deps: ['Locale', 'RouterInteraction', 'ContactSearch', 'Contacts', 'ExtensionInfo', 'RolesAndPermissions', 'RateLimiter', 'RegionSettings', 'ConnectivityManager', 'Call', 'DialerUI', 'ComposeText', {
    dep: 'ContactDetailsUIOptions',
    optional: true
  }]
}), _dec2 = (0, _core.track)(_trackEvents.trackEvents.clickToCall), _dec3 = (0, _core.track)(_trackEvents.trackEvents.clickToSMS), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ContactDetailsUI, _RcUIModuleV);

  var _super = _createSuper(ContactDetailsUI);

  function ContactDetailsUI(deps) {
    var _this;

    _classCallCheck(this, ContactDetailsUI);

    _this = _super.call(this, {
      deps: deps
    });

    _initializerDefineProperty(_this, "currentContact", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "currentContactReadyState", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(ContactDetailsUI, [{
    key: "_setCurrentContact",
    value: function _setCurrentContact(readyState, contact) {
      this.currentContactReadyState = readyState;
      this.currentContact = contact;
    }
  }, {
    key: "resetCurrentContact",
    value: function () {
      var _resetCurrentContact = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._setCurrentContact(_contactReadyStates.contactReadyStates.pending, null);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function resetCurrentContact() {
        return _resetCurrentContact.apply(this, arguments);
      }

      return resetCurrentContact;
    }()
  }, {
    key: "initCurrentContact",
    value: function () {
      var _initCurrentContact = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref) {
        var contactType, contactId, contact;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                contactType = _ref.contactType, contactId = _ref.contactId;

                if (!(this.currentContactReadyState !== _contactReadyStates.contactReadyStates.pending)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return");

              case 3:
                this._setCurrentContact(_contactReadyStates.contactReadyStates.loading, null);

                _context2.next = 6;
                return this._deps.contacts.findContact({
                  sourceName: contactType,
                  contactId: contactId
                });

              case 6:
                contact = _context2.sent;

                if (!(this.currentContactReadyState !== _contactReadyStates.contactReadyStates.loading)) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return");

              case 9:
                this._setCurrentContact(_contactReadyStates.contactReadyStates.loaded, contact);

                if (contact) {
                  this._deps.contacts.getProfileImage(contact, false);

                  this._deps.contacts.getPresence(contact, false);
                }

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function initCurrentContact(_x) {
        return _initCurrentContact.apply(this, arguments);
      }

      return initCurrentContact;
    }()
  }, {
    key: "showContactDetails",
    value: function () {
      var _showContactDetails = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref2) {
        var id, type, _ref2$direct, direct;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                id = _ref2.id, type = _ref2.type, _ref2$direct = _ref2.direct, direct = _ref2$direct === void 0 ? false : _ref2$direct;

                this._deps.routerInteraction.push("/contacts/".concat(type, "/").concat(id).concat(direct ? '?direct=true' : ''));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function showContactDetails(_x2) {
        return _showContactDetails.apply(this, arguments);
      }

      return showContactDetails;
    }()
  }, {
    key: "handleClickToDial",
    value: function () {
      var _handleClickToDial = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(contact, phoneNumber) {
        var recipient, _this$_deps$contactDe, _this$_deps$contactDe2;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                recipient = _objectSpread(_objectSpread({}, contact), {}, {
                  phoneNumber: phoneNumber
                });

                if (this._deps.call.isIdle) {
                  this._deps.routerInteraction.push((_this$_deps$contactDe = (_this$_deps$contactDe2 = this._deps.contactDetailsUIOptions) === null || _this$_deps$contactDe2 === void 0 ? void 0 : _this$_deps$contactDe2.dialerRoute) !== null && _this$_deps$contactDe !== void 0 ? _this$_deps$contactDe : DEFAULT_DIALER_ROUTE);

                  this._deps.dialerUI.call({
                    recipient: recipient
                  });
                }

                this._trackClickToCall();

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function handleClickToDial(_x3, _x4) {
        return _handleClickToDial.apply(this, arguments);
      }

      return handleClickToDial;
    }()
  }, {
    key: "handleClickToSMS",
    value: function () {
      var _handleClickToSMS = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(contact, phoneNumber) {
        var _this$_deps$contactDe3, _this$_deps$contactDe4;

        var recipient;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                recipient = _objectSpread(_objectSpread({}, contact), {}, {
                  phoneNumber: phoneNumber
                });

                this._deps.routerInteraction.push((_this$_deps$contactDe3 = (_this$_deps$contactDe4 = this._deps.contactDetailsUIOptions) === null || _this$_deps$contactDe4 === void 0 ? void 0 : _this$_deps$contactDe4.composeTextRoute) !== null && _this$_deps$contactDe3 !== void 0 ? _this$_deps$contactDe3 : DEFAULT_COMPOSE_TEXT_ROUTE);

                this._deps.composeText.addToNumber(recipient);

                if (this._deps.composeText.typingToNumber === recipient.phoneNumber) {
                  this._deps.composeText.cleanTypingToNumber();
                }

                this._trackClickToSMS();

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function handleClickToSMS(_x5, _x6) {
        return _handleClickToSMS.apply(this, arguments);
      }

      return handleClickToSMS;
    }()
  }, {
    key: "_trackClickToCall",
    value: function _trackClickToCall() {}
  }, {
    key: "_trackClickToSMS",
    value: function _trackClickToSMS() {}
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_deps$extension, _this$_deps$connectiv, _this$_deps$connectiv2, _this$_deps$connectiv3, _this$_deps$rateLimit, _this$_deps$connectiv4, _this$_deps$connectiv5, _this$_deps$rateLimit2;

      return {
        currentLocale: this._deps.locale.currentLocale,
        contact: this.currentContact,
        isMultipleSiteEnabled: (_this$_deps$extension = this._deps.extensionInfo.isMultipleSiteEnabled) !== null && _this$_deps$extension !== void 0 ? _this$_deps$extension : false,
        isCallButtonDisabled: !!(((_this$_deps$connectiv = this._deps.connectivityManager) === null || _this$_deps$connectiv === void 0 ? void 0 : _this$_deps$connectiv.isOfflineMode) || ((_this$_deps$connectiv2 = this._deps.connectivityManager) === null || _this$_deps$connectiv2 === void 0 ? void 0 : _this$_deps$connectiv2.isWebphoneUnavailableMode) || ((_this$_deps$connectiv3 = this._deps.connectivityManager) === null || _this$_deps$connectiv3 === void 0 ? void 0 : _this$_deps$connectiv3.isWebphoneInitializing) || ((_this$_deps$rateLimit = this._deps.rateLimiter) === null || _this$_deps$rateLimit === void 0 ? void 0 : _this$_deps$rateLimit.throttling)),
        disableLinks: !!(((_this$_deps$connectiv4 = this._deps.connectivityManager) === null || _this$_deps$connectiv4 === void 0 ? void 0 : _this$_deps$connectiv4.isOfflineMode) || ((_this$_deps$connectiv5 = this._deps.connectivityManager) === null || _this$_deps$connectiv5 === void 0 ? void 0 : _this$_deps$connectiv5.isVoipOnlyMode) || ((_this$_deps$rateLimit2 = this._deps.rateLimiter) === null || _this$_deps$rateLimit2 === void 0 ? void 0 : _this$_deps$rateLimit2.throttling)),
        showSpinner: !(this.currentContactReadyState === _contactReadyStates.contactReadyStates.loaded && this._deps.locale.ready && this._deps.contactSearch.ready && this._deps.rolesAndPermissions.ready)
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this2 = this;

      var params = _ref3.params;
      return {
        onVisitPage: function onVisitPage() {
          _this2.initCurrentContact(params);
        },
        onLeavingPage: function onLeavingPage() {
          _this2.resetCurrentContact();
        },
        formatNumber: function formatNumber() {
          var _this2$_deps$extensio;

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
              countryCode: _this2._deps.regionSettings.countryCode
            });
            return formattedNumber;
          } // if multi-site is enabled then we will try to remove site code with same site


          if (_this2._deps.extensionInfo.isMultipleSiteEnabled && ((_this2$_deps$extensio = _this2._deps.extensionInfo.site) === null || _this2$_deps$extensio === void 0 ? void 0 : _this2$_deps$extensio.code)) {
            var _this2$_deps$extensio2;

            var _formattedNumber = (0, _formatNumber2.formatNumber)({
              phoneNumber: phoneNumber,
              countryCode: _this2._deps.regionSettings.countryCode,
              siteCode: (_this2$_deps$extensio2 = _this2._deps.extensionInfo.site) === null || _this2$_deps$extensio2 === void 0 ? void 0 : _this2$_deps$extensio2.code,
              isMultipleSiteEnabled: _this2._deps.extensionInfo.isMultipleSiteEnabled
            });

            return _formattedNumber;
          }

          return phoneNumber;
        },
        canTextButtonShow: function canTextButtonShow(phoneType) {
          var _this2$_deps$rolesAnd, _this2$_deps$rolesAnd2;

          var outboundSmsPermission = !!((_this2$_deps$rolesAnd = _this2._deps.rolesAndPermissions.permissions.OutboundSMS) !== null && _this2$_deps$rolesAnd !== void 0 ? _this2$_deps$rolesAnd : false);
          var internalSmsPermission = !!((_this2$_deps$rolesAnd2 = _this2._deps.rolesAndPermissions.permissions.InternalSMS) !== null && _this2$_deps$rolesAnd2 !== void 0 ? _this2$_deps$rolesAnd2 : false); // guess this statement is to avoid exception

          var isClickToTextEnabled = !!_this2._deps.composeText;
          return isClickToTextEnabled && phoneType !== _phoneTypes.phoneTypes.fax && (phoneType === _phoneTypes.phoneTypes.extension ? internalSmsPermission : outboundSmsPermission);
        },
        canCallButtonShow: function canCallButtonShow(phoneType) {
          var _this2$_deps$rolesAnd3;

          var isClickToDialEnabled = !!(_this2._deps.dialerUI && ((_this2$_deps$rolesAnd3 = _this2._deps.rolesAndPermissions.callingEnabled) !== null && _this2$_deps$rolesAnd3 !== void 0 ? _this2$_deps$rolesAnd3 : false));
          return isClickToDialEnabled && phoneType !== _phoneTypes.phoneTypes.fax;
        },
        onBackClick: function onBackClick() {
          _this2._deps.routerInteraction.goBack();
        },
        onClickToDial: function onClickToDial(contact, phoneNumber) {
          return _this2.handleClickToDial(contact, phoneNumber);
        },
        onClickToSMS: function onClickToSMS(contact, phoneNumber) {
          return _this2.handleClickToSMS(contact, phoneNumber);
        }
      };
    }
  }]);

  return ContactDetailsUI;
}(_core.RcUIModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentContact", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "currentContactReadyState", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _contactReadyStates.contactReadyStates.pending;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setCurrentContact", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setCurrentContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "resetCurrentContact", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "resetCurrentContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "initCurrentContact", [_background["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "initCurrentContact"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "showContactDetails", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "showContactDetails"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleClickToDial", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "handleClickToDial"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "handleClickToSMS", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "handleClickToSMS"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_trackClickToCall", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackClickToCall"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_trackClickToSMS", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "_trackClickToSMS"), _class2.prototype)), _class2)) || _class);
exports.ContactDetailsUI = ContactDetailsUI;
//# sourceMappingURL=ContactDetailsUI.js.map
