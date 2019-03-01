"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _reactRedux = require("react-redux");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _callDirections = _interopRequireDefault(require("ringcentral-integration/enums/callDirections"));

var _sessionStatus = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/sessionStatus"));

var _ActiveCallBadge = _interopRequireDefault(require("../../components/ActiveCallBadge"));

var _phoneContext = require("../../lib/phoneContext");

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CallBadge =
/*#__PURE__*/
function (_Component) {
  _inherits(CallBadge, _Component);

  function CallBadge(props) {
    var _this;

    _classCallCheck(this, CallBadge);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CallBadge).call(this, props));
    _this.state = {
      badgeOffsetX: props.defaultOffsetX || 0,
      badgeOffsetY: props.defaultOffsetY || 0
    };

    _this.updatePositionOffset = function (x, y) {
      _this.setState({
        badgeOffsetX: x,
        badgeOffsetY: y
      });
    };

    _this.onClick = function () {
      var isRinging = _this._isRinging();

      if (isRinging) {
        _this.props.toggleMinimized(_this.props.session.id);

        return;
      }

      _this.props.goToCallCtrl(_this.props.session.id);
    };

    return _this;
  }

  _createClass(CallBadge, [{
    key: "_isRinging",
    value: function _isRinging() {
      var isRinging = false;
      var session = this.props.session;

      if (session.direction === _callDirections.default.inbound && session.callStatus === _sessionStatus.default.connecting) {
        isRinging = true;
      }

      return isRinging;
    }
  }, {
    key: "render",
    value: function render() {
      var session = this.props.session;
      var active = !!session.id;

      if (!active) {
        return null;
      }

      var isRinging = this._isRinging();

      if (isRinging && !session.minimized) {
        return null;
      }

      if (this.props.hidden) {
        return null;
      }

      return _react.default.createElement(_ActiveCallBadge.default, {
        onClick: this.onClick,
        offsetX: this.state.badgeOffsetX,
        offsetY: this.state.badgeOffsetY,
        updatePositionOffset: this.updatePositionOffset,
        title: _i18n.default.getString('activeCall', this.props.currentLocale)
      });
    }
  }]);

  return CallBadge;
}(_react.Component);

CallBadge.propTypes = {
  session: _propTypes.default.shape({
    id: _propTypes.default.string,
    direction: _propTypes.default.string,
    startTime: _propTypes.default.number,
    isOnMute: _propTypes.default.bool,
    isOnHold: _propTypes.default.bool,
    isOnRecord: _propTypes.default.bool,
    to: _propTypes.default.string,
    from: _propTypes.default.string
  }).isRequired,
  currentLocale: _propTypes.default.string.isRequired,
  toggleMinimized: _propTypes.default.func.isRequired,
  goToCallCtrl: _propTypes.default.func.isRequired,
  hidden: _propTypes.default.bool.isRequired,
  defaultOffsetX: _propTypes.default.number,
  defaultOffsetY: _propTypes.default.number
};
CallBadge.defaultProps = {
  defaultOffsetX: 0,
  defaultOffsetY: 0
};

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      webphone = _ref$phone.webphone,
      locale = _ref$phone.locale,
      hidden = _ref.hidden,
      goToCallCtrl = _ref.goToCallCtrl,
      _ref$defaultOffsetX = _ref.defaultOffsetX,
      defaultOffsetX = _ref$defaultOffsetX === void 0 ? 0 : _ref$defaultOffsetX,
      _ref$defaultOffsetY = _ref.defaultOffsetY,
      defaultOffsetY = _ref$defaultOffsetY === void 0 ? 0 : _ref$defaultOffsetY;
  var currentSession = webphone.activeSession || webphone.ringSession || {};
  return {
    currentLocale: locale.currentLocale,
    session: currentSession,
    hidden: hidden,
    goToCallCtrl: goToCallCtrl,
    defaultOffsetX: defaultOffsetX,
    defaultOffsetY: defaultOffsetY
  };
}

function mapToFunctions(_, _ref2) {
  var webphone = _ref2.phone.webphone;
  return {
    toggleMinimized: function toggleMinimized(sessionId) {
      return webphone.toggleMinimized(sessionId);
    }
  };
}

var CallBadgeContainer = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(CallBadge));
var _default = CallBadgeContainer;
exports.default = _default;
//# sourceMappingURL=index.js.map
