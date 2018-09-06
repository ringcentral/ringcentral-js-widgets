'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _calleeTypes = require('ringcentral-integration/enums/calleeTypes');

var _calleeTypes2 = _interopRequireDefault(_calleeTypes);

var _BackButton = require('../BackButton');

var _BackButton2 = _interopRequireDefault(_BackButton);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _ConfirmRemoveModal = require('./ConfirmRemoveModal');

var _ConfirmRemoveModal2 = _interopRequireDefault(_ConfirmRemoveModal);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _ParticipantItem = require('./ParticipantItem');

var _ParticipantItem2 = _interopRequireDefault(_ParticipantItem);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ParticipantsContainer = function (_Component) {
  (0, _inherits3.default)(ParticipantsContainer, _Component);

  function ParticipantsContainer(props) {
    (0, _classCallCheck3.default)(this, ParticipantsContainer);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ParticipantsContainer.__proto__ || (0, _getPrototypeOf2.default)(ParticipantsContainer)).call(this, props));

    _this.state = {
      showModal: false,
      detail: null
    };
    _this.formatPrticipants(props);
    _this.onRemoveBtnClick = _this.onRemoveBtnClick.bind(_this);
    _this.onCancel = _this.onCancel.bind(_this);
    _this.onCancelNoAfter = _this.onCancelNoAfter.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ParticipantsContainer, [{
    key: 'formatPrticipants',
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
    key: 'onRemoveBtnClick',
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
    key: 'onCancel',
    value: function onCancel() {
      this.onCancelNoAfter();
      this.props.afterOnCancel();
    }
    // onCancel without track

  }, {
    key: 'onCancelNoAfter',
    value: function onCancelNoAfter() {
      this.setState({
        showModal: false,
        detail: null
      });
    }
  }, {
    key: 'componentWillReceiveProps',
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          participants = _props.participants,
          currentLocale = _props.currentLocale,
          removeFunc = _props.removeFunc,
          onBackButtonClick = _props.onBackButtonClick;
      var _state = this.state,
          detail = _state.detail,
          showModal = _state.showModal;


      var backHeader = _react2.default.createElement(_BackHeader2.default, {
        className: _styles2.default.header,
        onBackClick: onBackButtonClick,
        backButton: _react2.default.createElement(_BackButton2.default, { label: _i18n2.default.getString('conferenceCall', currentLocale) })
      });

      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        backHeader,
        _react2.default.createElement(
          'div',
          { className: _styles2.default.participantsListContainer },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.participantsCount },
            participants.length === 1 ? participants.length + ' ' + _i18n2.default.getString('participant', currentLocale) : participants.length + ' ' + _i18n2.default.getString('participants', currentLocale)
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.participantsList },
            participants.map(function (participant) {
              var avatarUrl = participant.avatarUrl,
                  toUserName = participant.toUserName,
                  partyNumber = participant.partyNumber,
                  calleeType = participant.calleeType,
                  id = participant.id;

              var detail = void 0;

              if (calleeType === _calleeTypes2.default.contacts) {
                detail = toUserName;
              } else {
                detail = partyNumber;
              }
              return _react2.default.createElement(_ParticipantItem2.default, {
                key: id,
                avatarUrl: avatarUrl,
                detail: detail,
                currentLocale: currentLocale,
                onRemove: function onRemove() {
                  return _this3.onRemoveBtnClick(participant);
                }
              });
            })
          )
        ),
        _react2.default.createElement(_ConfirmRemoveModal2.default, {
          show: showModal,
          detail: detail,
          onCancel: this.onCancel,
          currentLocale: currentLocale,
          onRemove: function onRemove() {
            return removeFunc(detail && detail.id).then(_this3.onCancelNoAfter);
          } })
      );
    }
  }]);
  return ParticipantsContainer;
}(_react.Component);

ParticipantsContainer.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  removeFunc: _propTypes2.default.func,
  participants: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
  onBackButtonClick: _propTypes2.default.func,
  formatPhone: _propTypes2.default.func,
  afterOnCancel: _propTypes2.default.func,
  afterOnRemoveBtnClick: _propTypes2.default.func
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

exports.default = ParticipantsContainer;
//# sourceMappingURL=index.js.map
