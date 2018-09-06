'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _class, _temp;

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _sleep = require('ringcentral-integration/lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _ConferenceParticipantPanel = require('../../components/ConferenceParticipantPanel');

var _ConferenceParticipantPanel2 = _interopRequireDefault(_ConferenceParticipantPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConferenceParticipantContainer = (_temp = _class = function (_Component) {
  (0, _inherits3.default)(ConferenceParticipantContainer, _Component);

  function ConferenceParticipantContainer(props) {
    (0, _classCallCheck3.default)(this, ConferenceParticipantContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConferenceParticipantContainer.__proto__ || (0, _getPrototypeOf2.default)(ConferenceParticipantContainer)).call(this, props));

    _this.mounted = false;
    return _this;
  }

  (0, _createClass3.default)(ConferenceParticipantContainer, [{
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
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (!this.mounted) {
        return;
      }

      var _props = this.props,
          participants = _props.participants,
          onBackButtonClick = _props.onBackButtonClick,
          sessionCount = _props.sessionCount;


      if (!nextProps.participants.length && nextProps.participants.length !== participants.length) {
        (0, _sleep2.default)(750).then(function () {
          if (_this2.mounted && sessionCount) {
            onBackButtonClick();
          }
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ConferenceParticipantPanel2.default, this.props);
    }
  }]);
  return ConferenceParticipantContainer;
}(_react.Component), _class.propTypes = {
  participants: _propTypes2.default.array.isRequired,
  onBackButtonClick: _propTypes2.default.func.isRequired,
  sessionCount: _propTypes2.default.number.isRequired
}, _temp);


function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      locale = _ref$phone.locale,
      conferenceCall = _ref$phone.conferenceCall,
      webphone = _ref$phone.webphone;

  var participants = conferenceCall.partyProfiles;
  var sessionCount = webphone.sessions && webphone.sessions.length || 0;

  return {
    currentLocale: locale.currentLocale,
    participants: participants,
    sessionCount: sessionCount
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      conferenceCall = _ref2$phone.conferenceCall,
      routerInteraction = _ref2$phone.routerInteraction,
      regionSettings = _ref2$phone.regionSettings;

  return {
    onBackButtonClick: function onBackButtonClick() {
      routerInteraction.goBack();
    },
    removeFunc: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
        var confId;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                confId = conferenceCall.conferences && (0, _keys2.default)(conferenceCall.conferences)[0];
                _context.prev = 1;
                _context.next = 4;
                return conferenceCall.removeFromConference(confId, id);

              case 4:
                // user action track
                conferenceCall.removeParticipantClickRemoveTrack();
                return _context.abrupt('return', true);

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](1);
                return _context.abrupt('return', false);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function removeFunc(_x) {
        return _ref3.apply(this, arguments);
      }

      return removeFunc;
    }(),

    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber2.default)({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    },
    // user action track functions
    afterOnRemoveBtnClick: function afterOnRemoveBtnClick() {
      return conferenceCall.participantListClickHangupTrack();
    },
    afterOnCancel: function afterOnCancel() {
      return conferenceCall.removeParticipantClickCancelTrack();
    }
  };
}

var ConferenceParticipantPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(ConferenceParticipantContainer));

exports.default = ConferenceParticipantPage;
//# sourceMappingURL=index.js.map
