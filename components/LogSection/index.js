'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _telephonyStatus = require('ringcentral-integration/enums/telephonyStatus');

var _telephonyStatus2 = _interopRequireDefault(_telephonyStatus);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

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
    key: 'genEditLogSection',
    value: function genEditLogSection() {
      var _this2 = this;

      var _props = this.props,
          renderEditLogSection = _props.renderEditLogSection,
          currentLocale = _props.currentLocale,
          onSaveCallLog = _props.onSaveCallLog,
          onUpdateCallLog = _props.onUpdateCallLog,
          currentLog = _props.currentLog,
          additionalInfo = _props.additionalInfo;

      var editLogSection = renderEditLogSection({
        currentLocale: currentLocale,
        onSaveCallLog: onSaveCallLog,
        onUpdateCallLog: onUpdateCallLog,
        currentLog: currentLog,
        additionalInfo: additionalInfo
      });
      return _react2.default.createElement(
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
      );
    }
  }, {
    key: 'genSaveLogButton',
    value: function genSaveLogButton() {
      var _props2 = this.props,
          showSaveLogBtn = _props2.showSaveLogBtn,
          renderSaveLogButton = _props2.renderSaveLogButton,
          currentLocale = _props2.currentLocale,
          onSaveCallLog = _props2.onSaveCallLog,
          currentLog = _props2.currentLog;
      var call = currentLog.call,
          currentLogCall = currentLog.currentLogCall;

      var buttonPanelClassName = (0, _classnames3.default)(_styles2.default.buttonPanel, this.state.mainCtrlOverlapped && _styles2.default.overlapped);
      var buttonClassName = (0, _classnames3.default)(_styles2.default.primaryButton, currentLogCall.isSaving && _styles2.default.disabled);
      if (!showSaveLogBtn) {
        return null;
      }
      if (renderSaveLogButton) {
        return renderSaveLogButton({
          currentLocale: currentLocale,
          onSaveCallLog: onSaveCallLog,
          currentLog: currentLog,
          overlapped: this.state.mainCtrlOverlapped
        });
      }
      return _react2.default.createElement(
        'div',
        {
          className: buttonPanelClassName },
        _react2.default.createElement(
          _Button2.default,
          {
            disabled: currentLogCall.isSaving,
            className: buttonClassName,
            onClick: function onClick() {
              return onSaveCallLog(call);
            } },
          _i18n2.default.getString('saveLog', currentLocale)
        )
      );
    }
  }, {
    key: 'genLogBasicInfo',
    value: function genLogBasicInfo() {
      return _react2.default.createElement(_LogBasicInfo2.default, {
        currentLog: this.props.currentLog,
        currentLocale: this.props.currentLocale,
        formatPhone: this.props.formatPhone
      });
    }
  }, {
    key: 'genLogBasicInfoWithSmallCallCtrl',
    value: function genLogBasicInfoWithSmallCallCtrl() {
      var currentlog = this.props.currentLog;
      var currentSessionId = currentlog.currentSessionId,
          call = currentlog.call;
      var telephonyStatus = call.telephonyStatus,
          result = call.result;

      var status = telephonyStatus || result;
      // if `result` is exist, call has been disconnect
      if (result) {
        return this.genLogBasicInfo();
      }
      function disabledToCallControl() {
        return _callDirections2.default.inbound === call.direction && _telephonyStatus2.default.ringing === telephonyStatus;
      }

      var onLogBasicInfoClick = disabledToCallControl() ? function () {} : this.props.onLogBasicInfoClick;

      var wrapperCls = (0, _classnames3.default)(_styles2.default.basicInfoWrapper, (0, _defineProperty3.default)({}, _styles2.default.pointer, !disabledToCallControl()));
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.infoWithCtrlWrapper },
        _react2.default.createElement(
          'div',
          { className: wrapperCls, onClick: onLogBasicInfoClick },
          _react2.default.createElement(_LogBasicInfo2.default, {
            currentLog: this.props.currentLog,
            currentLocale: this.props.currentLocale,
            formatPhone: this.props.formatPhone
          })
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.callCtrlWrapper },
          this.props.renderSmallCallContrl(status, currentSessionId)
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          currentLog = _props3.currentLog,
          isInnerMask = _props3.isInnerMask,
          showSmallCallControl = _props3.showSmallCallControl;
      var showSpinner = currentLog.showSpinner;

      if (showSpinner) {
        return _react2.default.createElement(_SpinnerOverlay2.default, { className: _styles2.default.spinner });
      }

      return _react2.default.createElement(
        'div',
        { className: _styles2.default.section },
        showSmallCallControl ? this.genLogBasicInfoWithSmallCallCtrl() : this.genLogBasicInfo(),
        this.genEditLogSection(),
        this.genSaveLogButton(),
        isInnerMask ? _react2.default.createElement('div', { className: _styles2.default.innerMask }) : null
      );
    }
  }]);
  return LogSection;
}(_react.Component);

exports.default = LogSection;


LogSection.propTypes = {
  currentLog: _propTypes2.default.object,
  additionalInfo: _propTypes2.default.object,
  currentLocale: _propTypes2.default.string.isRequired,
  formatPhone: _propTypes2.default.func,
  onUpdateCallLog: _propTypes2.default.func,
  onSaveCallLog: _propTypes2.default.func,
  renderEditLogSection: _propTypes2.default.func,
  renderSaveLogButton: _propTypes2.default.func,
  isInnerMask: _propTypes2.default.bool,
  onLogBasicInfoClick: _propTypes2.default.func,
  showSaveLogBtn: _propTypes2.default.bool,
  showSmallCallControl: _propTypes2.default.bool,
  renderSmallCallContrl: _propTypes2.default.func
};

LogSection.defaultProps = {
  currentLog: {},
  additionalInfo: undefined,
  formatPhone: undefined,
  onUpdateCallLog: undefined,
  onSaveCallLog: undefined,
  renderEditLogSection: undefined,
  renderSaveLogButton: undefined,
  isInnerMask: undefined,
  onLogBasicInfoClick: function onLogBasicInfoClick() {},
  renderSmallCallContrl: function renderSmallCallContrl() {},

  showSaveLogBtn: true,
  showSmallCallControl: true
};
//# sourceMappingURL=index.js.map
