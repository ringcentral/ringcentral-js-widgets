"use strict";

require("core-js/modules/es6.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("regenerator-runtime/runtime");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _reactRedux = require("react-redux");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _sleep = _interopRequireDefault(require("ringcentral-integration/lib/sleep"));

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _withPhone = _interopRequireDefault(require("../../lib/withPhone"));

var _ConferenceParticipantPanel = _interopRequireDefault(require("../../components/ConferenceParticipantPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ConferenceParticipantContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(ConferenceParticipantContainer, _Component);

  function ConferenceParticipantContainer(props) {
    var _this;

    _classCallCheck(this, ConferenceParticipantContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConferenceParticipantContainer).call(this, props));
    _this.mounted = false;
    return _this;
  }

  _createClass(ConferenceParticipantContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.mounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      if (!this.mounted) {
        return;
      }

      var _this$props = this.props,
          participants = _this$props.participants,
          onBackButtonClick = _this$props.onBackButtonClick,
          sessionCount = _this$props.sessionCount;

      if (!nextProps.participants.length && nextProps.participants.length !== participants.length) {
        (0, _sleep["default"])(750).then(function () {
          if (_this2.mounted && sessionCount) {
            onBackButtonClick();
          }
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement(_ConferenceParticipantPanel["default"], this.props);
    }
  }]);

  return ConferenceParticipantContainer;
}(_react.Component);

ConferenceParticipantContainer.propTypes = {
  participants: _propTypes["default"].array.isRequired,
  onBackButtonClick: _propTypes["default"].func.isRequired,
  sessionCount: _propTypes["default"].number.isRequired
};

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
      var _removeFunc = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(id) {
        var confId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                confId = conferenceCall.conferences && Object.keys(conferenceCall.conferences)[0];
                _context.prev = 1;
                _context.next = 4;
                return conferenceCall.removeFromConference(confId, id);

              case 4:
                // user action track
                conferenceCall.removeParticipantClickRemoveTrack();
                return _context.abrupt("return", true);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", false);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));

      function removeFunc(_x) {
        return _removeFunc.apply(this, arguments);
      }

      return removeFunc;
    }(),
    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber["default"])({
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

var ConferenceParticipantPage = (0, _withPhone["default"])((0, _reactRedux.connect)(mapToProps, mapToFunctions)(ConferenceParticipantContainer));
var _default = ConferenceParticipantPage;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
