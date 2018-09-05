'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _sessionStatus = require('ringcentral-integration/modules/Webphone/sessionStatus');

var _sessionStatus2 = _interopRequireDefault(_sessionStatus);

var _calleeTypes = require('ringcentral-integration/enums/calleeTypes');

var _calleeTypes2 = _interopRequireDefault(_calleeTypes);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _CallAvatar = require('../CallAvatar');

var _CallAvatar2 = _interopRequireDefault(_CallAvatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MergeInfo = function (_Component) {
  (0, _inherits3.default)(MergeInfo, _Component);

  function MergeInfo(props) {
    (0, _classCallCheck3.default)(this, MergeInfo);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MergeInfo.__proto__ || (0, _getPrototypeOf2.default)(MergeInfo)).call(this, props));

    _this.state = {
      lastCallAvatar: null,
      lastCallInfoTimeout: false
    };
    _this.mounted = false;
    return _this;
  }

  (0, _createClass3.default)(MergeInfo, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      if (this.timeout_clock) {
        clearTimeout(this.timeout_clock);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.mounted = true;
      var _props = this.props,
          lastCallInfo = _props.lastCallInfo,
          getAvatarUrl = _props.getAvatarUrl;

      if (lastCallInfo && !lastCallInfo.avatarUrl && lastCallInfo.lastCallContact) {
        getAvatarUrl(lastCallInfo.lastCallContact).then(function (lastCallAvatar) {
          if (_this2.mounted) {
            _this2.setState({
              lastCallAvatar: lastCallAvatar
            });
          }
        });
      }
      if (lastCallInfo && lastCallInfo.calleeType !== _calleeTypes2.default.conference) {
        var isSimplifiedCallAndLastCallInfoNotReady = !lastCallInfo.name || !lastCallInfo.phoneNumber;

        if (isSimplifiedCallAndLastCallInfoNotReady) {
          this.timeout_clock = setTimeout(function () {
            if (_this2.mounted) {
              _this2.setState({
                lastCallInfoTimeout: true
              });
            }
          }, this.props.checkLastCallInfoTimeout);
        } else if (this.timeout_clock) {
          clearTimeout(this.timeout_clock);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props2 = this.props,
          currentLocale = _props2.currentLocale,
          timeCounter = _props2.timeCounter,
          lastCallInfo = _props2.lastCallInfo,
          currentCallTitle = _props2.currentCallTitle,
          currentCallAvatarUrl = _props2.currentCallAvatarUrl,
          formatPhone = _props2.formatPhone;

      if (!lastCallInfo) {
        return null;
      }
      var _state = this.state,
          lastCallAvatar = _state.lastCallAvatar,
          lastCallInfoTimeout = _state.lastCallInfoTimeout;

      var isLastCallInfoReady = !!lastCallInfo && (!!lastCallInfo.name || !!lastCallInfo.phoneNumber);
      var isLastCallEnded = lastCallInfo && lastCallInfo.status === _sessionStatus2.default.finished;
      var statusClasses = (0, _classnames3.default)((_classnames = {}, (0, _defineProperty3.default)(_classnames, _styles2.default.callee_status, true), (0, _defineProperty3.default)(_classnames, _styles2.default.callee_status_disconnected, !!isLastCallEnded), _classnames));

      var isOnConferenceCall = !!(lastCallInfo && lastCallInfo.calleeType === _calleeTypes2.default.conference);
      var isContacts = !!(lastCallInfo && lastCallInfo.calleeType === _calleeTypes2.default.contacts);
      var calleeName = isContacts ? lastCallInfo.name : formatPhone(lastCallInfo.phoneNumber);
      var loadingText = _i18n2.default.getString('loading');
      var loadingTimeoutText = _i18n2.default.getString('loadingTimeout');
      var showSpinner = !lastCallInfoTimeout && !isLastCallInfoReady && !isOnConferenceCall;
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.mergeInfo },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.merge_item },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.callee_avatar },
            _react2.default.createElement(_CallAvatar2.default, {
              avatarUrl: isContacts && !lastCallInfo.avatarUrl ? lastCallAvatar : lastCallInfo.avatarUrl,
              extraNum: isOnConferenceCall ? lastCallInfo.extraNum : 0,
              isOnConferenceCall: isOnConferenceCall,
              spinnerMode: showSpinner
            })
          ),
          (isLastCallInfoReady || !isLastCallInfoReady && isOnConferenceCall) && _react2.default.createElement(
            'div',
            { className: _styles2.default.callee_name },
            isOnConferenceCall ? _react2.default.createElement(
              'span',
              { title: _i18n2.default.getString('conferenceCall', currentLocale) },
              _i18n2.default.getString('conferenceCall', currentLocale)
            ) : _react2.default.createElement(
              'span',
              { title: calleeName },
              calleeName
            )
          ),
          !isLastCallInfoReady && !isOnConferenceCall && (lastCallInfoTimeout ? _react2.default.createElement(
            'div',
            { className: _styles2.default.last_call_info_load_timeout },
            _react2.default.createElement(
              'span',
              { title: loadingTimeoutText },
              loadingTimeoutText
            )
          ) : _react2.default.createElement(
            'div',
            { className: _styles2.default.callee_name },
            _react2.default.createElement(
              'span',
              { title: loadingText },
              loadingText
            )
          )),
          (isLastCallInfoReady || !isLastCallInfoReady && isOnConferenceCall) && _react2.default.createElement(
            'div',
            { className: statusClasses },
            lastCallInfo.status === _sessionStatus2.default.finished ? _i18n2.default.getString('disconnected', currentLocale) : _i18n2.default.getString('onHold', currentLocale)
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.merge_item_active },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.callee_avatar_active },
            currentCallAvatarUrl ? _react2.default.createElement(_CallAvatar2.default, { avatarUrl: currentCallAvatarUrl }) : _react2.default.createElement(_CallAvatar2.default, { avatarUrl: null })
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.callee_name_active },
            _react2.default.createElement(
              'span',
              { title: currentCallTitle },
              currentCallTitle
            )
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.callee_status_active },
            timeCounter
          )
        )
      );
    }
  }]);
  return MergeInfo;
}(_react.Component);

MergeInfo.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  timeCounter: _propTypes2.default.element.isRequired,
  lastCallInfo: _propTypes2.default.object,
  currentCallTitle: _propTypes2.default.string,
  currentCallAvatarUrl: _propTypes2.default.string,
  formatPhone: _propTypes2.default.func,
  getAvatarUrl: _propTypes2.default.func,
  checkLastCallInfoTimeout: _propTypes2.default.number
};

MergeInfo.defaultProps = {
  lastCallInfo: { calleeType: _calleeTypes2.default.unknow },
  currentCallTitle: undefined,
  currentCallAvatarUrl: undefined,
  formatPhone: function formatPhone() {
    return null;
  },
  getAvatarUrl: function getAvatarUrl() {
    return null;
  },

  /**
   * The timeout seconds to check if the last call info is received.
   */
  checkLastCallInfoTimeout: 30 * 1000
};

exports.default = MergeInfo;
//# sourceMappingURL=MergeInfo.js.map
