"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

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

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.array.find");

var _module = _interopRequireDefault(require("ringcentral-integration/lib/di/decorators/module"));

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TransferUI = (_dec = (0, _module["default"])({
  name: 'TransferUI',
  deps: ['Locale', 'RegionSettings', 'RouterInteraction', {
    dep: 'ContactSearch',
    optional: true
  }, {
    dep: 'Webphone',
    optional: true
  }, {
    dep: 'ActiveCallControl',
    optional: true
  }]
}), _dec(_class =
/*#__PURE__*/
function (_RcUIModule) {
  _inherits(TransferUI, _RcUIModule);

  function TransferUI(_ref) {
    var _this;

    var locale = _ref.locale,
        activeCallControl = _ref.activeCallControl,
        webphone = _ref.webphone,
        contactSearch = _ref.contactSearch,
        regionSettings = _ref.regionSettings,
        routerInteraction = _ref.routerInteraction,
        options = _objectWithoutProperties(_ref, ["locale", "activeCallControl", "webphone", "contactSearch", "regionSettings", "routerInteraction"]);

    _classCallCheck(this, TransferUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransferUI).call(this, _objectSpread({}, options)));
    _this._locale = locale;
    _this._activeCallControl = activeCallControl;
    _this._webphone = webphone;
    _this._contactSearch = contactSearch;
    _this._regionSettings = regionSettings;
    _this._routerInteraction = routerInteraction;
    return _this;
  }

  _createClass(TransferUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref2) {
      var _ref2$params = _ref2.params,
          sessionId = _ref2$params.sessionId,
          _ref2$params$type = _ref2$params.type,
          type = _ref2$params$type === void 0 ? 'active' : _ref2$params$type;
      var session = null;

      if (type === 'active' && this._activeCallControl) {
        session = this._activeCallControl.activeSession;
      } else if (type === 'webphone' && this._webphone) {
        session = this._webphone.sessions.find(function (session) {
          return session.id === sessionId;
        });
      }

      return {
        sessionId: sessionId,
        currentLocale: this._locale.currentLocale,
        searchContactList: this._contactSearch && this._contactSearch.sortedResult,
        session: session,
        controlBusy: this._activeCallControl && this._activeCallControl.busy || false
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this2 = this;

      var _ref3$params$type = _ref3.params.type,
          type = _ref3$params$type === void 0 ? 'active' : _ref3$params$type,
          phoneSourceNameRenderer = _ref3.phoneSourceNameRenderer,
          recipientsContactInfoRenderer = _ref3.recipientsContactInfoRenderer,
          recipientsContactPhoneRenderer = _ref3.recipientsContactPhoneRenderer,
          phoneTypeRenderer = _ref3.phoneTypeRenderer;
      return {
        setActiveSessionId: function setActiveSessionId(sessionId) {
          if (type === 'active' && _this2._activeCallControl) {
            _this2._activeCallControl.setActiveSessionId(sessionId);
          }
        },
        onTransfer: function onTransfer(transferNumber, sessionId) {
          if (type === 'active' && _this2._activeCallControl) {
            _this2._activeCallControl.transfer(transferNumber, sessionId);
          } else if (type === 'webphone' && _this2._webphone) {
            _this2._webphone.transfer(transferNumber, sessionId);
          }
        },
        onBack: function onBack() {
          _this2._routerInteraction.goBack();
        },
        onCallEnd: function onCallEnd() {
          if (type === 'active') {
            _this2._routerInteraction.replace('/calls');
          } else {
            _this2._routerInteraction.replace('/dialer');
          }
        },
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber["default"])({
            phoneNumber: phoneNumber,
            areaCode: _this2._regionSettings.areaCode,
            countryCode: _this2._regionSettings.countryCode
          });
        },
        searchContact: function searchContact(searchString) {
          if (_this2._contactSearch) {
            _this2._contactSearch.debouncedSearch({
              searchString: searchString
            });
          }
        },
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        recipientsContactInfoRenderer: recipientsContactInfoRenderer,
        recipientsContactPhoneRenderer: recipientsContactPhoneRenderer
      };
    }
  }]);

  return TransferUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = TransferUI;
//# sourceMappingURL=index.js.map
