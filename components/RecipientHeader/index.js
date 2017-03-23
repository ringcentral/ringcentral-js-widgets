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

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RecipientName(props) {
  var className = (0, _classnames2.default)(_styles2.default.recipient, props.className);
  return _react2.default.createElement(
    'a',
    { href: '#recipient', className: className, onClick: props.onClick },
    props.name
  );
}

RecipientName.propTypes = {
  name: _react.PropTypes.string.isRequired,
  onClick: _react.PropTypes.func.isRequired,
  className: _react.PropTypes.string
};

RecipientName.defaultProps = {
  className: null
};

function MatchedNameList(props) {
  var matchedNames = props.matchedNames;
  return _react2.default.createElement(
    'div',
    { className: props.className },
    matchedNames.map(function (matchedName) {
      return _react2.default.createElement(RecipientName, {
        key: matchedName,
        name: matchedName,
        onClick: function onClick() {
          return props.setDefaultMatchedName(matchedName);
        }
      });
    })
  );
}

MatchedNameList.propTypes = {
  className: _react.PropTypes.string.isRequired,
  matchedNames: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired
};

var RecipientHeader = function (_Component) {
  (0, _inherits3.default)(RecipientHeader, _Component);

  function RecipientHeader(props) {
    (0, _classCallCheck3.default)(this, RecipientHeader);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RecipientHeader.__proto__ || (0, _getPrototypeOf2.default)(RecipientHeader)).call(this, props));

    _this.state = {
      showDropdownList: false
    };
    _this.toggleDropdown = function () {
      _this.setState(function (preState) {
        return {
          showDropdownList: !preState.showDropdownList
        };
      });
    };
    _this.setDefaultMatchedName = function (matchedName) {
      var recipient = _this.props.recipient;
      var phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
      var matchedNames = _this.context.getMatcherContactList(phoneNumber);
      if (!matchedNames) {
        return;
      }
      var newMatchedNames = matchedNames.filter(function (name) {
        return name !== matchedName;
      });
      newMatchedNames = [matchedName].concat(newMatchedNames);
      _this.context.changeMatchedNames(newMatchedNames);
      _this.toggleDropdown();
    };
    return _this;
  }

  (0, _createClass3.default)(RecipientHeader, [{
    key: 'hasDropdown',
    value: function hasDropdown() {
      var recipient = this.props.recipient;
      var phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
      var matchedNames = this.context.getMatcherContactList(phoneNumber);
      return matchedNames.length > 1;
    }
  }, {
    key: 'render',
    value: function render() {
      var recipient = this.props.recipient;
      var hasDropdown = this.hasDropdown();
      if (!hasDropdown) {
        return _react2.default.createElement(
          'span',
          { className: _styles2.default.title },
          this.context.getRecipientName(recipient)
        );
      }
      var dropdownClass = this.props.dropdownClassName;
      if (this.state.showDropdownList) {
        dropdownClass = (0, _classnames2.default)(dropdownClass, _styles2.default.active);
      }
      var phoneNumber = recipient.phoneNumber || recipient.extensionNumber;
      var matchedNames = this.context.getMatcherContactList(phoneNumber);
      var defaultRecipient = _i18n2.default.getString('selectMatchedName', this.props.currentLocale);
      // if it have old data
      if (recipient.matchedNames && recipient.matchedNames[0]) {
        var firstMatchedName = recipient.matchedNames[0];
        var isFind = matchedNames.find(function (name) {
          return name === firstMatchedName;
        });
        if (isFind) {
          defaultRecipient = firstMatchedName;
        }
        var oldMatchedNames = recipient.matchedNames.slice().sort();
        if (matchedNames.sort().join('') === oldMatchedNames.join('')) {
          matchedNames = oldMatchedNames;
        }
      }
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(RecipientName, {
          name: defaultRecipient,
          onClick: this.toggleDropdown,
          className: _styles2.default.dropdownButton
        }),
        this.props.dropdownIcon,
        _react2.default.createElement(MatchedNameList, {
          matchedNames: matchedNames,
          className: dropdownClass,
          setDefaultMatchedName: this.setDefaultMatchedName
        })
      );
    }
  }]);
  return RecipientHeader;
}(_react.Component);

RecipientHeader.propTypes = {
  recipient: _react.PropTypes.shape({
    phoneNumber: _react.PropTypes.string,
    extensionNumber: _react.PropTypes.string,
    name: _react.PropTypes.string,
    matchedNames: _react.PropTypes.array
  }).isRequired,
  currentLocale: _react.PropTypes.string.isRequired,
  dropdownIcon: _react.PropTypes.node.isRequired,
  dropdownClassName: _react.PropTypes.string.isRequired
};

RecipientHeader.contextTypes = {
  getRecipientName: _react.PropTypes.func.isRequired,
  getMatcherContactList: _react.PropTypes.func.isRequired,
  changeMatchedNames: _react.PropTypes.func.isRequired
};

exports.default = RecipientHeader;
//# sourceMappingURL=index.js.map
