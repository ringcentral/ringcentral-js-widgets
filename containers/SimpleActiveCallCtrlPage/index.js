"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.find-index");

var _reactRedux = require("react-redux");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _withPhone = _interopRequireDefault(require("../../lib/withPhone"));

var _CallCtrlPanel = _interopRequireDefault(require("../../components/CallCtrlPanel"));

var _callCtrlLayouts = _interopRequireDefault(require("../../enums/callCtrlLayouts"));

var _ActiveCallPad = require("../../components/ActiveCallPad");

var _i18n = _interopRequireDefault(require("./i18n"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      activeCallControl = _ref$phone.activeCallControl,
      regionSettings = _ref$phone.regionSettings,
      locale = _ref$phone.locale,
      brand = _ref$phone.brand,
      params = _ref.params,
      renderContactName = _ref.renderContactName;
  var sessionId = params.sessionId;
  var activeSession = activeCallControl.activeSession;
  var nameMatches = [];

  if (activeSession && !renderContactName) {
    nameMatches = activeSession.direction === _callDirections["default"].outbound ? activeSession.toMatches : activeSession.fromMatches;
  }

  var phoneNumber;

  if (activeSession) {
    phoneNumber = activeSession.direction === _callDirections["default"].outbound ? activeSession.to : activeSession.from;
  }

  var fallBackName = _i18n["default"].getString('Unknown', locale.currentLocale);

  if (renderContactName) {
    var _pickFallBackInfo = (0, _utils.pickFallBackInfo)(activeSession, renderContactName({
      sessionId: activeSession && activeSession.sessionId,
      telephonySessionId: sessionId
    }), locale.currentLocale),
        fallBackNameFromThirdParty = _pickFallBackInfo.fallBackName,
        fallBackNumber = _pickFallBackInfo.fallBackNumber;

    phoneNumber = fallBackNumber;
    fallBackName = fallBackNameFromThirdParty;
  }

  return {
    currentLocale: locale.currentLocale,
    activeSession: activeSession,
    sessionId: sessionId,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    nameMatches: nameMatches,
    phoneNumber: phoneNumber,
    fallBackName: fallBackName,
    brand: brand.fullName,
    activeCallControl: activeCallControl,
    controlBusy: activeCallControl.busy
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      routerInteraction = _ref2$phone.routerInteraction,
      activeCallControl = _ref2$phone.activeCallControl;
  return {
    onBackButtonClick: function onBackButtonClick() {
      routerInteraction.goBack();
    },
    setActiveSessionId: function setActiveSessionId(sessionId) {
      activeCallControl.setActiveSessionId(sessionId);
    },
    onTransfer: function onTransfer(sessionId) {
      routerInteraction.push("/transfer/".concat(sessionId, "/active"));
    }
  };
}

var muteCtrl = _ActiveCallPad.ACTIONS_CTRL_MAP.muteCtrl,
    transferCtrl = _ActiveCallPad.ACTIONS_CTRL_MAP.transferCtrl,
    holdCtrl = _ActiveCallPad.ACTIONS_CTRL_MAP.holdCtrl; // const actions = [muteCtrl, transferCtrl, holdCtrl]

var ActiveCallControlPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(ActiveCallControlPanel, _Component);

  function ActiveCallControlPanel(props) {
    var _this;

    _classCallCheck(this, ActiveCallControlPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ActiveCallControlPanel).call(this, props));
    _this.state = {
      selectedMatcherIndex: 0
    };

    _this.onMute = function () {
      return _this.props.activeCallControl.mute(_this.props.sessionId);
    };

    _this.onUnmute = function () {
      return _this.props.activeCallControl.unmute(_this.props.sessionId);
    };

    _this.onHold = function () {
      return _this.props.activeCallControl.hold(_this.props.sessionId);
    };

    _this.onUnhold = function () {
      return _this.props.activeCallControl.unhold(_this.props.sessionId);
    };

    _this.onHangup = function () {
      return _this.props.activeCallControl.hangUp(_this.props.sessionId);
    };

    _this.formatPhone = function (phoneNumber) {
      return (0, _formatNumber["default"])({
        phoneNumber: phoneNumber,
        areaCode: _this.props.areaCode,
        countryCode: _this.props.countryCode
      });
    };

    _this.onSelectMatcherName = function (option) {
      var nameMatches = _this.props.nameMatches || [];
      var selectedMatcherIndex = nameMatches.findIndex(function (match) {
        return match.id === option.id;
      });

      if (selectedMatcherIndex < 0) {
        selectedMatcherIndex = 0;
      }

      _this.setState({
        selectedMatcherIndex: selectedMatcherIndex
      });
    };

    return _this;
  }

  _createClass(ActiveCallControlPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadActCall();
    }
  }, {
    key: "loadActCall",
    value: function loadActCall() {
      this.props.setActiveSessionId(this.props.sessionId);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.activeSession) {
        this.props.onBackButtonClick();
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.activeSession) {
        // or using skeleton screen here
        return null;
      }

      return _react["default"].createElement(_CallCtrlPanel["default"], {
        sessionId: this.props.sessionId,
        currentLocale: this.props.currentLocale,
        fallBackName: this.props.fallBackName,
        phoneNumber: this.props.phoneNumber,
        onMute: this.onMute,
        onUnmute: this.onUnmute,
        onHold: this.onHold,
        onUnhold: this.onUnhold,
        onHangup: this.onHangup,
        onTransfer: this.props.onTransfer,
        showBackButton: true,
        backButtonLabel: _i18n["default"].getString('allCalls', this.props.currentLocale),
        onBackButtonClick: this.props.onBackButtonClick,
        formatPhone: this.formatPhone,
        areaCode: this.props.areaCode,
        countryCode: this.props.countryCode,
        selectedMatcherIndex: this.state.selectedMatcherIndex,
        layout: _callCtrlLayouts["default"].normalCtrl,
        startTime: this.props.activeSession.startTime,
        actions: this.props.actions,
        isOnMute: this.props.activeSession.isOnMute,
        isOnHold: this.props.activeSession.isOnHold,
        nameMatches: this.props.nameMatches,
        onSelectMatcherName: this.onSelectMatcherName,
        brand: this.props.brand,
        showContactDisplayPlaceholder: this.props.showContactDisplayPlaceholder,
        controlBusy: this.props.controlBusy
      });
    }
  }]);

  return ActiveCallControlPanel;
}(_react.Component);

ActiveCallControlPanel.propTypes = {
  setActiveSessionId: _propTypes["default"].func,
  currentLocale: _propTypes["default"].string,
  sessionId: _propTypes["default"].string,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  activeSession: _propTypes["default"].object,
  onBackButtonClick: _propTypes["default"].func.isRequired,
  activeCallControl: _propTypes["default"].object,
  nameMatches: _propTypes["default"].array,
  fallBackName: _propTypes["default"].string,
  phoneNumber: _propTypes["default"].string,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  brand: _propTypes["default"].string.isRequired,
  onTransfer: _propTypes["default"].func.isRequired,
  controlBusy: _propTypes["default"].bool,
  actions: _propTypes["default"].array
};
ActiveCallControlPanel.defaultProps = {
  setActiveSessionId: function setActiveSessionId() {},
  currentLocale: 'en-US',
  activeCallControl: {},
  activeSession: null,
  sessionId: null,
  nameMatches: [],
  fallBackName: '',
  phoneNumber: '',
  showContactDisplayPlaceholder: false,
  controlBusy: false,
  actions: [muteCtrl, transferCtrl, holdCtrl]
};

var _default = (0, _withPhone["default"])((0, _reactRedux.connect)(mapToProps, mapToFunctions)(ActiveCallControlPanel));

exports["default"] = _default;
//# sourceMappingURL=index.js.map
