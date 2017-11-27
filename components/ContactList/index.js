'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _ContactItem = require('../ContactItem');

var _ContactItem2 = _interopRequireDefault(_ContactItem);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NoContacts(_ref) {
  var currentLocale = _ref.currentLocale;

  return _react2.default.createElement(
    'p',
    { className: _styles2.default.noContacts },
    _i18n2.default.getString('noContacts', currentLocale)
  );
}
NoContacts.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired
};

function ContactGroup(_ref2) {
  var caption = _ref2.caption,
      contacts = _ref2.contacts,
      getAvatarUrl = _ref2.getAvatarUrl,
      getPresence = _ref2.getPresence,
      onItemSelect = _ref2.onItemSelect,
      sourceNodeRenderer = _ref2.sourceNodeRenderer;

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.contactGroup },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.groupCaption },
      caption
    ),
    contacts.map(function (contact) {
      return _react2.default.createElement(_ContactItem2.default, {
        key: '' + contact.type + contact.id,
        contact: contact,
        getAvatarUrl: getAvatarUrl,
        getPresence: getPresence,
        onSelect: onItemSelect,
        sourceNodeRenderer: sourceNodeRenderer
      });
    })
  );
}
ContactGroup.propTypes = {
  onItemSelect: _propTypes2.default.func,
  getAvatarUrl: _propTypes2.default.func.isRequired,
  getPresence: _propTypes2.default.func.isRequired,
  caption: _propTypes2.default.string.isRequired,
  contacts: _propTypes2.default.arrayOf(_ContactItem2.default.propTypes.contact).isRequired,
  sourceNodeRenderer: _propTypes2.default.func
};
ContactGroup.defaultProps = {
  onItemSelect: undefined,
  sourceNodeRenderer: undefined
};

var ContactList = function (_Component) {
  (0, _inherits3.default)(ContactList, _Component);

  function ContactList(props) {
    (0, _classCallCheck3.default)(this, ContactList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ContactList.__proto__ || (0, _getPrototypeOf2.default)(ContactList)).call(this, props));

    _this.downwards = true;
    _this.onScroll = _this.onScroll.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ContactList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // wait for contact items rendering
      setTimeout(function () {
        // detect here for the case when there is no scroll bar
        _this2.detectNextPage(_this2.rootElem);
      }, 0);
    }
  }, {
    key: 'onScroll',
    value: function onScroll(ev) {
      this.detectNextPage(ev.target);
    }
  }, {
    key: 'detectNextPage',
    value: function detectNextPage(el) {
      if (!el) {
        return;
      }
      if (this.downwards) {
        if (el.scrollTop + el.clientHeight > el.scrollHeight - 20) {
          this.downwards = false;
          var _props = this.props,
              currentPage = _props.currentPage,
              onNextPage = _props.onNextPage;

          if (onNextPage) {
            var curr = currentPage || 1;
            onNextPage(curr + 1);
          }
        }
      } else if (el.scrollTop + el.clientHeight < el.scrollHeight - 30) {
        this.downwards = true;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          currentLocale = _props2.currentLocale,
          contactGroups = _props2.contactGroups,
          getAvatarUrl = _props2.getAvatarUrl,
          getPresence = _props2.getPresence,
          onItemSelect = _props2.onItemSelect,
          sourceNodeRenderer = _props2.sourceNodeRenderer;

      return _react2.default.createElement(
        'div',
        {
          className: _styles2.default.root,
          onScroll: this.onScroll,
          ref: function ref(el) {
            _this3.rootElem = el;
          }
        },
        contactGroups.length ? contactGroups.map(function (group) {
          return _react2.default.createElement(ContactGroup, {
            key: group.id,
            caption: group.caption,
            contacts: group.contacts,
            getAvatarUrl: getAvatarUrl,
            getPresence: getPresence,
            onItemSelect: onItemSelect,
            sourceNodeRenderer: sourceNodeRenderer
          });
        }) : _react2.default.createElement(NoContacts, {
          currentLocale: currentLocale
        })
      );
    }
  }]);
  return ContactList;
}(_react.Component);

exports.default = ContactList;


ContactList.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  contactGroups: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    caption: _propTypes2.default.string.isRequired,
    contacts: _propTypes2.default.arrayOf(_ContactItem2.default.propTypes.contact).isRequired
  })).isRequired,
  getAvatarUrl: _propTypes2.default.func.isRequired,
  getPresence: _propTypes2.default.func.isRequired,
  currentPage: _propTypes2.default.number,
  onNextPage: _propTypes2.default.func,
  onItemSelect: _propTypes2.default.func,
  sourceNodeRenderer: _propTypes2.default.func
};

ContactList.defaultProps = {
  currentPage: undefined,
  onNextPage: undefined,
  onItemSelect: undefined,
  sourceNodeRenderer: undefined
};
//# sourceMappingURL=index.js.map
