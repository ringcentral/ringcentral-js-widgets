'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _concat = require('babel-runtime/core-js/array/concat');

var _concat2 = _interopRequireDefault(_concat);

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

var _formatMessage = require('format-message');

var _formatMessage2 = _interopRequireDefault(_formatMessage);

var _IconField = require('../IconField');

var _IconField2 = _interopRequireDefault(_IconField);

var _Switch = require('../Switch');

var _Switch2 = _interopRequireDefault(_Switch);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _RcFont = require('../../assets/RcFont/RcFont.scss');

var _RcFont2 = _interopRequireDefault(_RcFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConferencePanel = function (_Component) {
  (0, _inherits3.default)(ConferencePanel, _Component);

  function ConferencePanel(props) {
    (0, _classCallCheck3.default)(this, ConferencePanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConferencePanel.__proto__ || (0, _getPrototypeOf2.default)(ConferencePanel)).call(this, props));

    _this.state = {
      showInternational: false,
      searchInternationals: _this.props.conferenceNumbers.phoneNumbers,
      selectInternationals: []
    };
    _this.formatNumbers = {
      dialInNumber: _this.props.formatPhone(_this.props.conferenceNumbers.phoneNumber, _this.props.countryCode, _this.props.areaCode),
      hostCode: _this.props.formatPin(_this.props.conferenceNumbers.hostCode),
      participantCode: _this.props.formatPin(_this.props.conferenceNumbers.participantCode)
    };
    _this.onInternationalSwitch = function (checked) {
      _this.setState({
        showInternational: checked
      });
    };
    _this.onSearchKeyUp = function (e) {
      var searchKey = e.currentTarget.value;
      _this.setState({
        searchInternationals: _this.getMatchList(searchKey)
      });
    };
    _this.getMatchList = function (searchKey) {
      var key = searchKey.toLowerCase().trim().split(' ').join('');
      return _this.props.conferenceNumbers.phoneNumbers.filter(function (value) {
        return value.phoneNumber.trim().replace(' ', '').indexOf(key) >= 0 || value.country.name.toLowerCase().trim().replace(' ', '').indexOf(key) >= 0;
      });
    };
    _this.inviteWithText = function () {
      var internationals = '';
      if (_this.state.selectInternationals.length !== 0) {
        internationals += 'International Dial-in Numbers:\n';
        _this.state.selectInternationals.forEach(function (value) {
          var phoneNumber = _this.props.formatPhone(value.phoneNumber, value.countryCode, value.areaCode || '');
          internationals += value.countryName + ' ' + phoneNumber + '\n';
        });
        internationals += '\n';
      }
      _this.props.inviteWithText((0, _formatMessage2.default)(_i18n2.default.getString('inviteText', _this.props.currentLocale), {
        dialInNumber: _this.formatNumbers.dialInNumber,
        internationals: internationals,
        participantCode: _this.formatNumbers.participantCode
      }));
    };
    _this.changeSelect = function (e) {
      var state = _this.state.selectInternationals;
      if (e.currentTarget.checked === true) {
        var newState = (0, _concat2.default)(state, [{
          id: e.currentTarget.getAttribute('data-id'),
          phoneNumber: e.currentTarget.getAttribute('data-number'),
          countryName: e.currentTarget.getAttribute('data-name'),
          countryCode: e.currentTarget.getAttribute('data-countryCode'),
          areaCode: e.currentTarget.getAttribute('data-areaCode')
        }]);
        newState.sort(function (a, b) {
          return a.id - b.id;
        });
        _this.setState({
          selectInternationals: newState
        });
      } else {
        var _newState = state.filter(function (value) {
          return value.phoneNumber !== e.currentTarget.getAttribute('data-number');
        });
        _newState.sort(function (a, b) {
          return a.id - b.id;
        });
        _this.setState({
          selectInternationals: _newState
        });
      }
    };
    return _this;
  }

  (0, _createClass3.default)(ConferencePanel, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var currentLocale = this.props.currentLocale;

      var internationalNumbers = this.state.showInternational ? _react2.default.createElement(
        'div',
        { className: _styles2.default.international },
        _react2.default.createElement(
          'h2',
          null,
          _i18n2.default.getString('internationalNumbersHeader', currentLocale)
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.search },
          _react2.default.createElement('span', { className: _RcFont2.default.icon_search }),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.rightPanel },
            _react2.default.createElement('input', {
              type: 'text',
              placeholder: _i18n2.default.getString('search', currentLocale),
              onKeyUp: this.onSearchKeyUp
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.numbers },
          this.state.searchInternationals.map(function (value, key) {
            return _react2.default.createElement(
              'div',
              { className: _styles2.default.row, key: key },
              _react2.default.createElement(
                'label',
                null,
                _react2.default.createElement('input', {
                  type: 'checkbox',
                  className: _styles2.default.checkCountry,
                  'data-id': value.country.id,
                  'data-number': value.phoneNumber,
                  'data-name': value.country.name,
                  'data-countryCode': value.country.countryCode,
                  'data-areaCode': value.country.areaCode,
                  onChange: _this2.changeSelect }),
                _react2.default.createElement(
                  'span',
                  { className: _styles2.default.country },
                  value.country.name
                ),
                _react2.default.createElement(
                  'span',
                  { className: _styles2.default.phoneNumber },
                  _this2.props.formatInternational(value.phoneNumber, value.country.callingCode)
                )
              )
            );
          })
        )
      ) : '';
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: _styles2.default.showConferenceNumbers },
          _react2.default.createElement(
            'label',
            null,
            _i18n2.default.getString('dialInNumber', currentLocale),
            ':'
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.dialInNumber },
            this.formatNumbers.dialInNumber
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.showConferenceNumbers },
          _react2.default.createElement(
            'label',
            null,
            _i18n2.default.getString('host', currentLocale),
            ':'
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.conferenceNumber },
            this.formatNumbers.hostCode
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.showConferenceNumbers },
          _react2.default.createElement(
            'label',
            null,
            _i18n2.default.getString('participants', currentLocale),
            ':'
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.conferenceNumber },
            this.formatNumbers.participantCode
          )
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.participantsSwitch },
          _react2.default.createElement(
            _IconField2.default,
            {
              icon: _react2.default.createElement(_Switch2.default, {
                onChange: this.onInternationalSwitch
              })
            },
            _i18n2.default.getString('internationalParticipants', currentLocale)
          )
        ),
        internationalNumbers,
        _react2.default.createElement('input', {
          type: 'button',
          value: _i18n2.default.getString('inviteWithText', currentLocale),
          className: _styles2.default.textBtn,
          onClick: this.inviteWithText
        })
      );
    }
  }]);
  return ConferencePanel;
}(_react.Component);

ConferencePanel.propTypes = {
  conferenceNumbers: _react.PropTypes.shape({
    phoneNumber: _react.PropTypes.string,
    hostCode: _react.PropTypes.string,
    participantCode: _react.PropTypes.string,
    phoneNumbers: _react.PropTypes.array
  }).isRequired,
  countryCode: _react.PropTypes.string.isRequired,
  areaCode: _react.PropTypes.string.isRequired,
  currentLocale: _react.PropTypes.string.isRequired,
  inviteWithText: _react.PropTypes.func.isRequired,
  formatPhone: _react.PropTypes.func.isRequired,
  formatInternational: _react.PropTypes.func.isRequired,
  formatPin: _react.PropTypes.func.isRequired
};
exports.default = ConferencePanel;
//# sourceMappingURL=index.js.map
