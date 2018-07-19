'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _reactRedux = require('react-redux');

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _CallsOnholdPanel = require('../../components/CallsOnholdPanel');

var _CallsOnholdPanel2 = _interopRequireDefault(_CallsOnholdPanel);

var _ActiveCallsPage = require('../ActiveCallsPage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var phone = _ref.phone,
      _ref$phone = _ref.phone,
      callMonitor = _ref$phone.callMonitor,
      contactMatcher = _ref$phone.contactMatcher,
      props = (0, _objectWithoutProperties3.default)(_ref, ['phone', 'phone']);

  var baseProps = (0, _ActiveCallsPage.mapToProps)(_, (0, _extends3.default)({
    phone: phone
  }, props));
  var contactMapping = contactMatcher && contactMatcher.dataMapping;

  return (0, _extends3.default)({}, baseProps, {
    calls: callMonitor.activeOnHoldCalls.filter(function (call) {
      return call.direction !== _callDirections2.default.inbound;
    }),
    contactMapping: contactMapping
  });
}

function mapToFunctions(_, _ref2) {
  var params = _ref2.params,
      phone = _ref2.phone,
      _ref2$phone = _ref2.phone,
      webphone = _ref2$phone.webphone,
      conferenceCall = _ref2$phone.conferenceCall,
      routerInteraction = _ref2$phone.routerInteraction,
      getAvatarUrl = _ref2.getAvatarUrl,
      props = (0, _objectWithoutProperties3.default)(_ref2, ['params', 'phone', 'phone', 'getAvatarUrl']);

  var baseProps = (0, _ActiveCallsPage.mapToFunctions)(_, (0, _extends3.default)({
    params: params,
    phone: phone
  }, props));
  return (0, _extends3.default)({}, baseProps, {
    onMerge: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(sessionId) {
        var session, sessionToMergeWith, webphoneSessions, conferenceData;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                routerInteraction.replace('/calls/active');
                session = webphone._sessions.get(sessionId);

                conferenceCall.setMergeParty({ to: session });
                sessionToMergeWith = conferenceCall.state.mergingPair.from;
                webphoneSessions = sessionToMergeWith ? [sessionToMergeWith, session] : [session];
                _context.next = 7;
                return conferenceCall.mergeToConference(webphoneSessions);

              case 7:
                conferenceData = (0, _values2.default)(conferenceCall.conferences)[0];

                if (conferenceData && conferenceData.session.isOnHold().local) {
                  /**
                   * because session termination operation in conferenceCall._mergeToConference,
                   * need to wait for webphone.getActiveSessionIdReducer to update
                   */
                  webphone.resume(conferenceData.session.id);
                }

              case 9:
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

var CallsOnholdPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallsOnholdPanel2.default));

exports.default = CallsOnholdPage;
//# sourceMappingURL=index.js.map
