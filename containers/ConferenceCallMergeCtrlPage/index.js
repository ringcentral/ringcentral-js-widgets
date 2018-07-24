'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToFunctions = exports.mapToProps = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sessionStatus = require('ringcentral-integration/modules/Webphone/sessionStatus');

var _sessionStatus2 = _interopRequireDefault(_sessionStatus);

var _sleep = require('ringcentral-integration/lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _callCtrlLayouts = require('../../enums/callCtrlLayouts');

var _callCtrlLayouts2 = _interopRequireDefault(_callCtrlLayouts);

var _CallCtrlPage = require('../CallCtrlPage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var phone = _ref.phone,
      _ref$phone = _ref.phone,
      webphone = _ref$phone.webphone,
      conferenceCall = _ref$phone.conferenceCall,
      callMonitor = _ref$phone.callMonitor,
      props = (0, _objectWithoutProperties3.default)(_ref, ['phone', 'phone']);

  var baseProps = (0, _CallCtrlPage.mapToProps)(_, (0, _extends3.default)({
    phone: phone
  }, props));

  var currentSession = webphone.activeSession || {};
  var isOnConference = conferenceCall.isConferenceSession(currentSession.id);
  var layout = isOnConference ? _callCtrlLayouts2.default.conferenceCtrl : _callCtrlLayouts2.default.mergeCtrl;
  var lastCallInfo = callMonitor.lastCallInfo;
  var mergeDisabled = !!baseProps.mergeDisabled;
  if (layout === _callCtrlLayouts2.default.mergeCtrl && (!lastCallInfo || lastCallInfo.status === _sessionStatus2.default.finished)) {
    mergeDisabled = true;
  }
  return (0, _extends3.default)({}, baseProps, {
    layout: layout,
    mergeDisabled: mergeDisabled,
    lastCallInfo: lastCallInfo
  });
}

function mapToFunctions(_, _ref2) {
  var phone = _ref2.phone,
      props = (0, _objectWithoutProperties3.default)(_ref2, ['phone']);

  var baseProps = (0, _CallCtrlPage.mapToFunctions)(_, (0, _extends3.default)({
    phone: phone
  }, props));
  return (0, _extends3.default)({}, baseProps);
}

var ConferenceCallMergeContainer = function (_Component) {
  (0, _inherits3.default)(ConferenceCallMergeContainer, _Component);

  function ConferenceCallMergeContainer(props) {
    (0, _classCallCheck3.default)(this, ConferenceCallMergeContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConferenceCallMergeContainer.__proto__ || (0, _getPrototypeOf2.default)(ConferenceCallMergeContainer)).call(this, props));

    _this.mounted = false;
    _this.onLastCallEnded = _this.onLastCallEnded.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ConferenceCallMergeContainer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (ConferenceCallMergeContainer.isLastCallEnded(this.props) === false && ConferenceCallMergeContainer.isLastCallEnded(nextProps) === true && this.mounted) {
        this.onLastCallEnded();
      }
    }
  }, {
    key: 'onLastCallEnded',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _sleep2.default)(2000);

              case 2:
                if (this.mounted) {
                  this.props.onLastCallEnded();
                }

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onLastCallEnded() {
        return _ref3.apply(this, arguments);
      }

      return onLastCallEnded;
    }()
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_CallCtrlPage.CallCtrlPage, this.props);
    }
  }], [{
    key: 'isLastCallEnded',
    value: function isLastCallEnded(_ref4) {
      var lastCallInfo = _ref4.lastCallInfo;

      return !!(lastCallInfo && lastCallInfo.status === _sessionStatus2.default.finished);
    }
  }]);
  return ConferenceCallMergeContainer;
}(_react.Component);

ConferenceCallMergeContainer.propTypes = {
  onLastCallEnded: _propTypes2.default.func.isRequired
};

var ConferenceCallMergeCtrlPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(ConferenceCallMergeContainer));

exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
exports.default = ConferenceCallMergeCtrlPage;
//# sourceMappingURL=index.js.map
