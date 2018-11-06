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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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

var EditSection = function EditSection(_ref) {
  var children = _ref.children,
      scrollerRef = _ref.scrollerRef,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['children', 'scrollerRef']);
  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({}, rest, {
      ref: scrollerRef,
      className: (0, _classnames2.default)(_styles2.default.editSection) }),
    children
  );
};

EditSection.propTypes = {
  children: _propTypes2.default.object,
  scrollerRef: _propTypes2.default.func
};

EditSection.defaultProps = {
  children: null,
  scrollerRef: undefined
};

var SaveButton = function SaveButton(_ref2) {
  var isSaving = _ref2.isSaving,
      onClick = _ref2.onClick,
      overlapped = _ref2.overlapped,
      children = _ref2.children;
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.buttonPanel, overlapped && _styles2.default.overlapped) },
    _react2.default.createElement(
      _Button2.default,
      {
        className: (0, _classnames2.default)(_styles2.default.primaryButton, isSaving && _styles2.default.disabled),
        disabled: isSaving,
        onClick: onClick },
      children
    )
  );
};

SaveButton.propTypes = {
  isSaving: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  overlapped: _propTypes2.default.bool,
  children: _propTypes2.default.string
};

SaveButton.defaultProps = {
  isSaving: false,
  onClick: function onClick() {},

  overlapped: false,
  children: null
};

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
    key: 'getEditLogSection',
    value: function getEditLogSection() {
      var _props = this.props,
          renderEditLogSection = _props.renderEditLogSection,
          currentLocale = _props.currentLocale,
          onSaveCallLog = _props.onSaveCallLog,
          onUpdateCallLog = _props.onUpdateCallLog,
          currentLog = _props.currentLog,
          additionalInfo = _props.additionalInfo;

      return renderEditLogSection({
        currentLocale: currentLocale,
        onSaveCallLog: onSaveCallLog,
        onUpdateCallLog: onUpdateCallLog,
        currentLog: currentLog,
        additionalInfo: additionalInfo
      });
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
        SaveButton,
        {
          isSaving: currentLogCall.isSaving,
          onClick: function onClick() {
            return onSaveCallLog(call);
          },
          overlapped: this.state.mainCtrlOverlapped
        },
        _i18n2.default.getString('saveLog', currentLocale)
      );
    }
  }, {
    key: 'renderLogBasicInfo',
    value: function renderLogBasicInfo() {
      var _props3 = this.props,
          currentLog = _props3.currentLog,
          showSmallCallControl = _props3.showSmallCallControl;
      var currentSessionId = currentLog.currentSessionId,
          call = currentLog.call;
      var telephonyStatus = call.telephonyStatus,
          result = call.result;

      var status = telephonyStatus || result;
      var clickable = _callDirections2.default.inbound === call.direction && _telephonyStatus2.default.ringing === telephonyStatus;
      var extraButton = void 0;
      // if `result` is exist, call has been disconnect
      if (showSmallCallControl && !result) {
        extraButton = this.props.renderSmallCallContrl(status, currentSessionId);
      }
      return _react2.default.createElement(_LogBasicInfo2.default, {
        dataSign: 'leftSectionInfo',
        currentLog: this.props.currentLog,
        currentLocale: this.props.currentLocale,
        formatPhone: this.props.formatPhone,
        extraButton: extraButton,
        clickable: clickable,
        onClick: clickable ? this.props.onLogBasicInfoClick : function () {
          return console.log('noop');
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props4 = this.props,
          currentLog = _props4.currentLog,
          isInnerMask = _props4.isInnerMask;
      var showSpinner = currentLog.showSpinner;

      if (showSpinner) {
        return _react2.default.createElement(_SpinnerOverlay2.default, { className: _styles2.default.spinner });
      }
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        this.renderLogBasicInfo(),
        _react2.default.createElement(
          EditSection,
          {
            scrollerRef: function scrollerRef(el) {
              _this2.mainCtrl = el;
            },
            onScroll: function onScroll() {
              return _this2.checkOverlap();
            }
          },
          this.getEditLogSection()
        ),
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
