"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _calleeTypes = _interopRequireDefault(require("ringcentral-integration/enums/calleeTypes"));

var _BackButton = _interopRequireDefault(require("../BackButton"));

var _BackHeader = _interopRequireDefault(require("../BackHeader"));

var _ConfirmRemoveModal = _interopRequireDefault(require("./ConfirmRemoveModal"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _ParticipantItem = _interopRequireDefault(require("./ParticipantItem"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ParticipantsContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(ParticipantsContainer, _Component);

  function ParticipantsContainer(props) {
    var _context;

    var _this;

    _classCallCheck(this, ParticipantsContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ParticipantsContainer).call(this, props));
    _this.state = {
      showModal: false,
      detail: null
    };

    _this.formatPrticipants(props);

    _this.onRemoveBtnClick = (_context = _assertThisInitialized(_this), _this.onRemoveBtnClick).bind(_context);
    _this.onCancel = (_context = _assertThisInitialized(_this), _this.onCancel).bind(_context);
    _this.onCancelNoAfter = (_context = _assertThisInitialized(_this), _this.onCancelNoAfter).bind(_context);
    return _this;
  }

  _createClass(ParticipantsContainer, [{
    key: "formatPrticipants",
    value: function formatPrticipants() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var participants = props.participants,
          formatPhone = props.formatPhone;
      participants.map(function (participant) {
        participant.partyNumber = formatPhone(participant.partyNumber);
        return participant;
      });
    }
  }, {
    key: "onRemoveBtnClick",
    value: function onRemoveBtnClick(participant) {
      this.setState(function () {
        return {
          detail: participant,
          showModal: true
        };
      });
      this.props.afterOnRemoveBtnClick();
    }
  }, {
    key: "onCancel",
    value: function onCancel() {
      this.onCancelNoAfter();
      this.props.afterOnCancel();
    } // onCancel without track

  }, {
    key: "onCancelNoAfter",
    value: function onCancelNoAfter() {
      this.setState({
        showModal: false,
        detail: null
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      this.formatPrticipants(nextProps);

      if (this.state.showModal && !nextProps.participants.find(function (participant) {
        return participant.id === _this2.state.detail.id;
      })) {
        this.onCancelNoAfter();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          participants = _this$props.participants,
          currentLocale = _this$props.currentLocale,
          removeFunc = _this$props.removeFunc,
          onBackButtonClick = _this$props.onBackButtonClick;
      var _this$state = this.state,
          detail = _this$state.detail,
          showModal = _this$state.showModal;

      var backHeader = _react["default"].createElement(_BackHeader["default"], {
        className: _styles["default"].header,
        onBackClick: onBackButtonClick,
        backButton: _react["default"].createElement(_BackButton["default"], {
          label: _i18n["default"].getString('conferenceCall', currentLocale)
        })
      });

      return _react["default"].createElement("div", {
        className: _styles["default"].root
      }, backHeader, _react["default"].createElement("div", {
        className: _styles["default"].participantsListContainer
      }, _react["default"].createElement("div", {
        className: _styles["default"].participantsCount
      }, participants.length === 1 ? "".concat(participants.length, " ").concat(_i18n["default"].getString('participant', currentLocale)) : "".concat(participants.length, " ").concat(_i18n["default"].getString('participants', currentLocale))), _react["default"].createElement("div", {
        className: _styles["default"].participantsList
      }, participants.map(function (participant) {
        var id = participant.id,
            avatarUrl = participant.avatarUrl,
            partyName = participant.partyName,
            partyNumber = participant.partyNumber,
            calleeType = participant.calleeType;

        var displayText = partyNumber || _i18n["default"].getString('unknownNumber', currentLocale);

        if (partyName && calleeType === _calleeTypes["default"].contacts) {
          // means that matched a contact
          displayText = partyName;
        }

        return _react["default"].createElement(_ParticipantItem["default"], {
          key: id,
          avatarUrl: avatarUrl,
          detail: displayText,
          currentLocale: currentLocale,
          onRemove: function onRemove() {
            return _this3.onRemoveBtnClick(participant);
          }
        });
      }))), _react["default"].createElement(_ConfirmRemoveModal["default"], {
        show: showModal,
        detail: detail,
        onCancel: this.onCancel,
        currentLocale: currentLocale,
        onRemove: function onRemove() {
          return removeFunc(detail && detail.id).then(_this3.onCancelNoAfter);
        }
      }));
    }
  }]);

  return ParticipantsContainer;
}(_react.Component);

ParticipantsContainer.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  removeFunc: _propTypes["default"].func,
  participants: _propTypes["default"].arrayOf(_propTypes["default"].object).isRequired,
  onBackButtonClick: _propTypes["default"].func,
  formatPhone: _propTypes["default"].func,
  afterOnCancel: _propTypes["default"].func,
  afterOnRemoveBtnClick: _propTypes["default"].func
};
ParticipantsContainer.defaultProps = {
  removeFunc: function removeFunc(i) {
    return i;
  },
  onBackButtonClick: function onBackButtonClick(i) {
    return i;
  },
  formatPhone: function formatPhone(i) {
    return i;
  },
  afterOnCancel: function afterOnCancel(i) {
    return i;
  },
  afterOnRemoveBtnClick: function afterOnRemoveBtnClick(i) {
    return i;
  }
};
var _default = ParticipantsContainer;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
