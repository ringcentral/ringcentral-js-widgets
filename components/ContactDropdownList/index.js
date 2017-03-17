'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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
  return _react2.default.createElement(
    'li',
    null,
    _react2.default.createElement(
      'a',
      { href: '#select-contact-item', onClick: props.onClick },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'span',
          null,
          props.name
        ),
        _react2.default.createElement(
          'span',
          { className: _styles2.default.label },
          _phoneTypes2.default.getString('phoneSource.' + props.entityType)
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.phoneNumberSection },
        _react2.default.createElement(
          'span',
          null,
          props.formatContactPhone(props.phoneNumber)
        ),
        _react2.default.createElement(
          'span',
          { className: _styles2.default.label },
          _phoneTypes2.default.getString('phoneType.' + props.phoneType)
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
  phoneNumber: _react.PropTypes.string.isRequired
};

function ContactDropdownList(props) {
  var items = props.items;
  var listClassName = null;
  var hiddenClassName = null;
  if (items.length === 0 || !props.visibility) {
    hiddenClassName = _styles2.default.hidden;
  }
  listClassName = (0, _classnames2.default)(_styles2.default.dropdownList, props.className, hiddenClassName);
  return _react2.default.createElement(
    'ul',
    { className: listClassName },
    items.map(function (item) {
      return _react2.default.createElement(ContactItem, {
        name: item.name,
        entityType: item.entityType,
        phoneType: item.phoneType,
        phoneNumber: item.phoneNumber,
        formatContactPhone: props.formatContactPhone,
        onClick: function onClick() {
          return props.addToRecipients({
            name: item.name,
            phoneNumber: item.phoneNumber
          });
        },
        key: (0, _stringify2.default)(item)
      });
    })
  );
}

ContactDropdownList.propTypes = {
  visibility: _react.PropTypes.bool.isRequired,
  className: _react.PropTypes.string,
  items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    name: _react.PropTypes.string.isRequired,
    entityType: _react.PropTypes.string.isRequired,
    phoneType: _react.PropTypes.string.isRequired,
    phoneNumber: _react.PropTypes.string.isRequired
  })).isRequired,
  formatContactPhone: _react.PropTypes.func.isRequired,
  addToRecipients: _react.PropTypes.func.isRequired
};

ContactDropdownList.defaultProps = {
  className: null
};

exports.default = ContactDropdownList;
//# sourceMappingURL=index.js.map
