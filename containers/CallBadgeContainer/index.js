'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Webphone = require('ringcentral-integration/modules/Webphone');

var _Webphone2 = _interopRequireDefault(_Webphone);

var _Locale = require('ringcentral-integration/modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _sessionStatus = require('ringcentral-integration/modules/Webphone/sessionStatus');

var _sessionStatus2 = _interopRequireDefault(_sessionStatus);

var _ActiveCallBadge = require('../../components/ActiveCallBadge');

var _ActiveCallBadge2 = _interopRequireDefault(_ActiveCallBadge);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallBadge = function (_Component) {
  (0, _inherits3.default)(CallBadge, _Component);

  function CallBadge(props) {
    (0, _classCallCheck3.default)(this, CallBadge);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallBadge.__proto__ || (0, _getPrototypeOf2.default)(CallBadge)).call(this, props));

    _this.state = {
      badgeOffsetX: 0,
      badgeOffsetY: 0
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
      _this.props.goToCallCtrl();
    };
    return _this;
  }

  (0, _createClass3.default)(CallBadge, [{
    key: '_isRinging',
    value: function _isRinging() {
      var isRinging = false;
      var session = this.props.session;
      if (session.direction === _callDirections2.default.inbound && session.callStatus === _sessionStatus2.default.connecting) {
        isRinging = true;
      }
      return isRinging;
    }
  }, {
    key: 'render',
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
      return _react2.default.createElement(_ActiveCallBadge2.default, {
        onClick: this.onClick,
        offsetX: this.state.badgeOffsetX,
        offsetY: this.state.badgeOffsetY,
        updatePositionOffset: this.updatePositionOffset,
        title: _i18n2.default.getString('activeCall', this.props.currentLocale)
      });
    }
  }]);
  return CallBadge;
}(_react.Component);

CallBadge.propTypes = {
  session: _propTypes2.default.shape({
    id: _propTypes2.default.string,
    direction: _propTypes2.default.string,
    startTime: _propTypes2.default.number,
    isOnMute: _propTypes2.default.bool,
    isOnHold: _propTypes2.default.bool,
    isOnRecord: _propTypes2.default.bool,
    to: _propTypes2.default.string,
    from: _propTypes2.default.string
  }).isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  toggleMinimized: _propTypes2.default.func.isRequired,
  goToCallCtrl: _propTypes2.default.func.isRequired,
  hidden: _propTypes2.default.bool.isRequired
};

function mapToProps(_, _ref) {
  var webphone = _ref.webphone,
      locale = _ref.locale,
      hidden = _ref.hidden,
      goToCallCtrl = _ref.goToCallCtrl;

  var currentSession = webphone.activeSession || webphone.ringSession || {};
  return {
    currentLocale: locale.currentLocale,
    session: currentSession,
    hidden: hidden,
    goToCallCtrl: goToCallCtrl
  };
}

function mapToFunctions(_, _ref2) {
  var webphone = _ref2.webphone;

  return {
    toggleMinimized: function toggleMinimized(sessionId) {
      return webphone.toggleMinimized(sessionId);
    }
  };
}

var CallBadgeContainer = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(CallBadge);

CallBadgeContainer.propTypes = {
  webphone: _propTypes2.default.instanceOf(_Webphone2.default).isRequired,
  hidden: _propTypes2.default.bool.isRequired,
  goToCallCtrl: _propTypes2.default.func.isRequired,
  locale: _propTypes2.default.instanceOf(_Locale2.default).isRequired
};

exports.default = CallBadgeContainer;
//# sourceMappingURL=index.js.map
