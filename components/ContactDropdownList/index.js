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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _phoneTypes = require('../../lib/phoneTypes');

var _phoneTypes2 = _interopRequireDefault(_phoneTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ContactItem(props) {
  var className = (0, _classnames2.default)(_styles2.default.contactItem, props.active ? _styles2.default.active : null);
  var spliter = '|';
  var nameTitle = props.name + ' ' + spliter + ' ' + ('' + _phoneTypes2.default.getString('phoneSource.' + props.entityType));
  var phoneNumberTitle = props.formatContactPhone(props.phoneNumber) + ' ' + spliter + ' ' + ('' + (props.phoneType === 'unknown' ? _phoneTypes2.default.getString('phoneType.' + props.phoneType) : props.phoneType));

  return _react2.default.createElement(
    'li',
    { className: className, onMouseOver: props.onHover },
    _react2.default.createElement(
      'a',
      { href: '#select-contact-item', onClick: props.onClick },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.nameSection, title: props.titleEnabled && nameTitle },
        _react2.default.createElement(
          'span',
          { className: _styles2.default.name },
          props.name
        ),
        _react2.default.createElement(
          'span',
          { className: _styles2.default.spliter },
          spliter
        ),
        _react2.default.createElement(
          'span',
          { className: _styles2.default.label },
          _phoneTypes2.default.getString('phoneSource.' + props.entityType)
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.phoneNumberSection, title: props.titleEnabled && phoneNumberTitle },
        _react2.default.createElement(
          'span',
          null,
          props.formatContactPhone(props.phoneNumber)
        ),
        _react2.default.createElement(
          'span',
          { className: _styles2.default.spliter },
          spliter
        ),
        _react2.default.createElement(
          'span',
          { className: _styles2.default.label },
          props.phoneType === 'unknown' ? _phoneTypes2.default.getString('phoneType.' + props.phoneType) : props.phoneType
        )
      )
    )
  );
}

ContactItem.propTypes = {
  onClick: _react.PropTypes.func.isRequired,
  formatContactPhone: _react.PropTypes.func.isRequired,
  name: _react.PropTypes.string.isRequired,
  entityType: _react.PropTypes.string.isRequired,
  phoneType: _react.PropTypes.string.isRequired,
  phoneNumber: _react.PropTypes.string.isRequired,
  active: _react.PropTypes.bool.isRequired,
  onHover: _react.PropTypes.func.isRequired,
  titleEnabled: _react.PropTypes.bool
};
ContactItem.defaultProps = {
  titleEnabled: undefined
};

var ContactDropdownList = function (_Component) {
  (0, _inherits3.default)(ContactDropdownList, _Component);

  function ContactDropdownList() {
    (0, _classCallCheck3.default)(this, ContactDropdownList);
    return (0, _possibleConstructorReturn3.default)(this, (ContactDropdownList.__proto__ || (0, _getPrototypeOf2.default)(ContactDropdownList)).apply(this, arguments));
  }

  (0, _createClass3.default)(ContactDropdownList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.visibility) {
        if (nextProps.scrollDirection === 'ArrowDown') {
          if (nextProps.selectedIndex < nextProps.items.length) {
            if (nextProps.selectedIndex > 4) {
              this.node.scrollTop += 53;
              this.node.scrollTop = Math.floor(this.node.scrollTop / 53) * 53;
            }
          }
        }
        if (nextProps.scrollDirection === 'ArrowUp') {
          if (nextProps.selectedIndex > -1) {
            if (nextProps.selectedIndex < nextProps.items.length - 4) {
              this.node.scrollTop -= 53;
              this.node.scrollTop = Math.floor(this.node.scrollTop / 53) * 53;
            }
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var props = this.props;
      var items = props.items;
      var listClassName = null;
      var hiddenClassName = null;
      if (items.length === 0) {
        hiddenClassName = _styles2.default.hidden;
      }
      listClassName = (0, _classnames2.default)(_styles2.default.dropdownList, props.className, hiddenClassName);

      return _react2.default.createElement(
        'ul',
        { className: listClassName, ref: function ref(c) {
            _this2.node = c;
          } },
        items.map(function (item, index) {
          return _react2.default.createElement(ContactItem, {
            active: props.selectedIndex === index,
            name: item.name,
            entityType: item.entityType,
            phoneType: item.phoneType,
            phoneNumber: item.phoneNumber,
            formatContactPhone: props.formatContactPhone,
            onHover: function onHover() {
              return props.setSelectedIndex(index);
            },
            onClick: function onClick() {
              return props.addToRecipients({
                name: item.name,
                phoneNumber: item.phoneNumber
              });
            },
            key: '' + index + item.phoneNumber + item.name + item.phoneType,
            titleEnabled: props.titleEnabled
          });
        })
      );
    }
  }]);
  return ContactDropdownList;
}(_react.Component);

ContactDropdownList.propTypes = {
  scrollDirection: _react.PropTypes.string,
  visibility: _react.PropTypes.bool.isRequired,
  className: _react.PropTypes.string,
  items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    name: _react.PropTypes.string.isRequired,
    entityType: _react.PropTypes.string.isRequired,
    phoneType: _react.PropTypes.string.isRequired,
    phoneNumber: _react.PropTypes.string.isRequired
  })).isRequired,
  formatContactPhone: _react.PropTypes.func.isRequired,
  addToRecipients: _react.PropTypes.func.isRequired,
  setSelectedIndex: _react.PropTypes.func.isRequired,
  selectedIndex: _react.PropTypes.number.isRequired,
  titleEnabled: _react.PropTypes.bool
};

ContactDropdownList.defaultProps = {
  className: null,
  scrollDirection: null,
  titleEnabled: undefined
};

exports.default = ContactDropdownList;
//# sourceMappingURL=index.js.map
