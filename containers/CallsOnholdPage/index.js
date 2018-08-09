'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _reselect = require('reselect');

var _ramda = require('ramda');

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _CallsOnholdPanel = require('../../components/CallsOnholdPanel');

var _CallsOnholdPanel2 = _interopRequireDefault(_CallsOnholdPanel);

var _ActiveCallsPage = require('../ActiveCallsPage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallsOnholdContainer = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(CallsOnholdContainer, _Component);

  function CallsOnholdContainer(props) {
    (0, _classCallCheck3.default)(this, CallsOnholdContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallsOnholdContainer.__proto__ || (0, _getPrototypeOf2.default)(CallsOnholdContainer)).call(this, props));

    _this.getCalls = (0, _reselect.createSelector)(function () {
      return _this.props.activeOnHoldCalls;
    }, function (activeOnHoldCalls) {
      return (0, _ramda.filter)(function (call) {
        return call.direction !== _callDirections2.default.inbound;
      }, activeOnHoldCalls);
    });
    return _this;
  }

  (0, _createClass3.default)(CallsOnholdContainer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_CallsOnholdPanel2.default, (0, _extends3.default)({}, this.props, { calls: this.getCalls() }));
    }
  }]);
  return CallsOnholdContainer;
}(_react.Component), _class.propTypes = {
  activeOnHoldCalls: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired
}, _temp);


function mapToProps(_, _ref) {
  var phone = _ref.phone,
      callMonitor = _ref.phone.callMonitor,
      props = (0, _objectWithoutProperties3.default)(_ref, ['phone', 'phone']);

  var baseProps = (0, _ActiveCallsPage.mapToProps)(_, (0, _extends3.default)({
    phone: phone
  }, props));

  return (0, _extends3.default)({}, baseProps, {
    activeOnHoldCalls: callMonitor.activeOnHoldCalls
  });
}

function mapToFunctions(_, _ref2) {
  var params = _ref2.params,
      phone = _ref2.phone,
      _ref2$phone = _ref2.phone,
      conferenceCall = _ref2$phone.conferenceCall,
      routerInteraction = _ref2$phone.routerInteraction,
      getAvatarUrl = _ref2.getAvatarUrl,
      props = (0, _objectWithoutProperties3.default)(_ref2, ['params', 'phone', 'phone', 'getAvatarUrl']);

  var baseProps = (0, _ActiveCallsPage.mapToFunctions)(_, (0, _extends3.default)({
    params: params,
    phone: phone
  }, props));
  var onBackButtonClick = function onBackButtonClick() {
    routerInteraction.goBack();
  };
  return (0, _extends3.default)({}, baseProps, {
    onMerge: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(sessionId) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return conferenceCall.onMergeOnhold({ sessionId: sessionId, callback: onBackButtonClick.bind(this) });

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onMerge(_x) {
        return _ref3.apply(this, arguments);
      }

      return onMerge;
    }(),
    onBackButtonClick: function onBackButtonClick() {
      routerInteraction.goBack();
    },
    onAdd: function onAdd() {
      routerInteraction.push('/conferenceCall/dialer/' + params.fromNumber);
    },

    getAvatarUrl: getAvatarUrl
  });
}

var CallsOnholdPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(CallsOnholdContainer));

exports.default = CallsOnholdPage;
//# sourceMappingURL=index.js.map
