'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isBlank = require('ringcentral-integration/lib/isBlank');

var _isBlank2 = _interopRequireDefault(_isBlank);

var _RecipientsInput = require('../RecipientsInput');

var _RecipientsInput2 = _interopRequireDefault(_RecipientsInput);

var _TextInput = require('../TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cleanRegex = /[^\d+*-\s]/g;

function ForwardNumbers(_ref) {
  var numbers = _ref.numbers,
      onSelect = _ref.onSelect,
      selected = _ref.selected,
      formatPhone = _ref.formatPhone;

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.numbers },
    numbers.map(function (number, index) {
      return _react2.default.createElement(
        'div',
        {
          key: number.id,
          className: (0, _classnames2.default)(_styles2.default.number, index === selected ? _styles2.default.active : null),
          onClick: function onClick() {
            return onSelect(index);
          }
        },
        _react2.default.createElement(
          'span',
          { className: _styles2.default.label, title: number.label },
          number.label
        ),
        _react2.default.createElement(
          'span',
          { className: _styles2.default.colon },
          ':'
        ),
        _react2.default.createElement(
          'span',
          null,
          formatPhone(number.phoneNumber)
        )
      );
    })
  );
}

ForwardNumbers.propTypes = {
  numbers: _propTypes2.default.array.isRequired,
  onSelect: _propTypes2.default.func.isRequired,
  selected: _propTypes2.default.number.isRequired,
  formatPhone: _propTypes2.default.func.isRequired
};

var ForwardForm = function (_Component) {
  (0, _inherits3.default)(ForwardForm, _Component);

  function ForwardForm(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ForwardForm);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ForwardForm.__proto__ || (0, _getPrototypeOf2.default)(ForwardForm)).call(this, props));

    _this._onCustomValueChange = function (value) {
      _this.setState({
        customValue: value
      });
    };

    _this._clearToNumber = function () {
      _this.setState({
        customValue: ''
      });
    };

    _this._setRecipient = function (recipient) {
      _this.setState({
        recipient: recipient
      });
      _this._clearToNumber();
    };

    _this._clearRecipient = function () {
      _this.setState({
        recipient: null
      });
    };

    _this.state = {
      selectedIndex: 0,
      customValue: '',
      handling: false,
      recipient: null
    };

    _this.filter = function (value) {
      return value.replace(cleanRegex, '');
    };

    _this.onSelect = function (index) {
      _this.setState({
        selectedIndex: index
      });
      if (typeof _this.props.onChange === 'function') {
        _this.props.onChange(_this.getValue());
      }
    };

    _this.onForward = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var result;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({
                handling: true
              });
              _context.next = 3;
              return _this.props.onForward(_this.getValue());

            case 3:
              result = _context.sent;

              if (_this._mounted) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return');

            case 6:
              _this.setState({
                handling: false
              });
              if (result) {
                _this.props.onCancel();
              }

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this.onSelectCustomNumber = function () {
      _this.onSelect(_this.props.forwardingNumbers.length);
      setTimeout(function () {
        if (_this.customInput) {
          _this.customInput.focus();
        }
      }, 100);
    };
    return _this;
  }

  (0, _createClass3.default)(ForwardForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      if (this.state.selectedIndex < this.props.forwardingNumbers.length) {
        var forwardingNumber = this.props.forwardingNumbers[this.state.selectedIndex];
        return forwardingNumber && forwardingNumber.phoneNumber;
      }
      if (this.state.recipient) {
        return this.state.recipient.phoneNumber;
      }
      return this.state.customValue;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          className = _props.className,
          onCancel = _props.onCancel,
          currentLocale = _props.currentLocale,
          forwardingNumbers = _props.forwardingNumbers,
          formatPhone = _props.formatPhone,
          searchContact = _props.searchContact,
          searchContactList = _props.searchContactList,
          phoneTypeRenderer = _props.phoneTypeRenderer;

      var value = this.getValue();
      var disableButton = (0, _isBlank2.default)(value) || this.state.handling;
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, className) },
        _react2.default.createElement(ForwardNumbers, {
          formatPhone: formatPhone,
          numbers: forwardingNumbers,
          onSelect: this.onSelect,
          selected: this.state.selectedIndex
        }),
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(_styles2.default.custromNumber, this.state.selectedIndex === forwardingNumbers.length ? _styles2.default.active : null),
            onClick: this.onSelectCustomNumber
          },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.customLabel },
            _i18n2.default.getString('customNumber', currentLocale)
          ),
          _react2.default.createElement(_RecipientsInput2.default, {
            label: '',
            placeholder: '',
            inputRef: function inputRef(ref) {
              _this3.customInput = ref;
            },
            value: this.state.customValue,
            className: _styles2.default.customInput,
            onChange: this._onCustomValueChange,
            onClean: this._clearToNumber,
            recipient: this.state.recipient,
            addToRecipients: this._setRecipient,
            removeFromRecipients: this._clearRecipient,
            searchContact: searchContact,
            searchContactList: searchContactList,
            phoneTypeRenderer: phoneTypeRenderer,
            formatContactPhone: formatPhone,
            currentLocale: currentLocale,
            titleEnabled: true,
            autoFocus: true
          })
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.buttonGroup },
          _react2.default.createElement(
            _Button2.default,
            {
              className: _styles2.default.cancelButton,
              onClick: onCancel
            },
            _i18n2.default.getString('cancel', currentLocale)
          ),
          _react2.default.createElement(
            _Button2.default,
            {
              className: (0, _classnames2.default)(_styles2.default.forwardButton, disableButton ? _styles2.default.disabled : null),
              onClick: this.onForward,
              disabled: disableButton
            },
            _react2.default.createElement(
              'span',
              { className: _styles2.default.buttonText },
              _i18n2.default.getString('forward', currentLocale)
            )
          )
        )
      );
    }
  }]);
  return ForwardForm;
}(_react.Component);

exports.default = ForwardForm;


ForwardForm.propTypes = {
  className: _propTypes2.default.string,
  onCancel: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  forwardingNumbers: _propTypes2.default.array.isRequired,
  formatPhone: _propTypes2.default.func.isRequired,
  onForward: _propTypes2.default.func.isRequired,
  onChange: _propTypes2.default.func,
  searchContactList: _propTypes2.default.array.isRequired,
  searchContact: _propTypes2.default.func.isRequired,
  phoneTypeRenderer: _propTypes2.default.func
};

ForwardForm.defaultProps = {
  className: null,
  onChange: undefined,
  phoneTypeRenderer: undefined
};
//# sourceMappingURL=index.js.map
