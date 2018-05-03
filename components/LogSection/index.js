'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _LogBasicInfo = require('../LogBasicInfo');

var _LogBasicInfo2 = _interopRequireDefault(_LogBasicInfo);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LogSection = function (_Component) {
  (0, _inherits3.default)(LogSection, _Component);

  function LogSection(props) {
    (0, _classCallCheck3.default)(this, LogSection);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LogSection.__proto__ || (0, _getPrototypeOf2.default)(LogSection)).call(this, props));

    _this.state = {
      mainCtrlOverlapped: false
    };
    return _this;
  }

  (0, _createClass3.default)(LogSection, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.checkOverlap, false);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.checkOverlap, false);
    }
  }, {
    key: 'checkOverlap',
    value: function checkOverlap() {
      if (!this.mainCtrl) {
        return;
      }
      var _mainCtrl = this.mainCtrl,
          scrollHeight = _mainCtrl.scrollHeight,
          clientHeight = _mainCtrl.clientHeight,
          scrollTop = _mainCtrl.scrollTop;

      var overlappedHeight = scrollHeight - clientHeight - scrollTop;
      var mainCtrlOverlapped = overlappedHeight > 1;
      if (mainCtrlOverlapped !== this.state.mainCtrlOverlapped) {
        this.setState({ mainCtrlOverlapped: mainCtrlOverlapped });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          renderEditLogSection = _props.renderEditLogSection,
          currentLocale = _props.currentLocale,
          onUpdateCallLog = _props.onUpdateCallLog,
          currentLog = _props.currentLog,
          isInnerMask = _props.isInnerMask,
          showSaveLogBtn = _props.showSaveLogBtn,
          onSaveCallLog = _props.onSaveCallLog;
      var call = currentLog.call,
          showSpinner = currentLog.showSpinner,
          currentLogCall = currentLog.currentLogCall;

      if (showSpinner) {
        return _react2.default.createElement(_SpinnerOverlay2.default, { className: _styles2.default.spinner });
      }
      var editLogSection = renderEditLogSection({
        currentLocale: currentLocale,
        onSaveCallLog: onSaveCallLog,
        onUpdateCallLog: onUpdateCallLog,
        currentLog: currentLog
      });
      var buttonPanelClassName = (0, _classnames2.default)(_styles2.default.buttonPanel, this.state.mainCtrlOverlapped && _styles2.default.overlapped);
      var buttonClassName = (0, _classnames2.default)(_styles2.default.primaryButton, currentLogCall.isSaving && _styles2.default.disabled);
      var saveLogBtn = showSaveLogBtn ? _react2.default.createElement(
        _Button2.default,
        {
          disabled: currentLogCall.isSaving,
          className: buttonClassName,
          onClick: function onClick() {
            return onSaveCallLog(call);
          } },
        _i18n2.default.getString('saveLog', currentLocale)
      ) : null;
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.section },
        _react2.default.createElement(_LogBasicInfo2.default, {
          currentLog: this.props.currentLog,
          currentLocale: this.props.currentLocale,
          formatPhone: this.props.formatPhone
        }),
        _react2.default.createElement(
          'div',
          {
            ref: function ref(_ref) {
              _this2.mainCtrl = _ref;
            },
            onScroll: function onScroll() {
              return _this2.checkOverlap();
            },
            className: _styles2.default.editSection },
          editLogSection
        ),
        _react2.default.createElement(
          'div',
          {
            className: buttonPanelClassName },
          saveLogBtn
        ),
        isInnerMask ? _react2.default.createElement('div', { className: _styles2.default.innerMask }) : null
      );
    }
  }]);
  return LogSection;
}(_react.Component);

exports.default = LogSection;


LogSection.propTypes = {
  currentLog: _propTypes2.default.object,
  currentLocale: _propTypes2.default.string.isRequired,
  formatPhone: _propTypes2.default.func,
  onUpdateCallLog: _propTypes2.default.func,
  onSaveCallLog: _propTypes2.default.func,
  renderEditLogSection: _propTypes2.default.func,
  isInnerMask: _propTypes2.default.bool,
  showSaveLogBtn: _propTypes2.default.bool
};

LogSection.defaultProps = {
  currentLog: {},
  formatPhone: undefined,
  onUpdateCallLog: undefined,
  onSaveCallLog: undefined,
  renderEditLogSection: undefined,
  isInnerMask: undefined,
  showSaveLogBtn: true
};
//# sourceMappingURL=index.js.map
