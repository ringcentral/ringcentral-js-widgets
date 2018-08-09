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

var _Modal = require('ringcentral-widgets/components/Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _SearchInput = require('ringcentral-widgets/components/SearchInput');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _TextInput = require('ringcentral-widgets/components/TextInput');

var _TextInput2 = _interopRequireDefault(_TextInput);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GlipTeamCreationModal = function (_Component) {
  (0, _inherits3.default)(GlipTeamCreationModal, _Component);

  function GlipTeamCreationModal(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, GlipTeamCreationModal);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GlipTeamCreationModal.__proto__ || (0, _getPrototypeOf2.default)(GlipTeamCreationModal)).call(this, props));

    _this.state = {
      selectedContacts: [],
      teamName: '',
      creating: false,
      error: null
    };

    _this.updateSeachString = function (e) {
      _this.setState({
        error: null
      });
      var searchString = e.target.value;
      _this.props.updateFilter(searchString);
    };

    _this.updateTeamName = function (e) {
      var name = e.target.value;
      _this.setState({
        teamName: name,
        error: null
      });
    };

    _this.removeContact = function (email) {
      _this.setState(function (previousState) {
        return {
          selectedContacts: previousState.selectedContacts.filter(function (c) {
            return c.email !== email;
          })
        };
      });
    };

    _this.onCancel = function () {
      _this.props.updateFilter('');
      _this.props.closeModal();
      _this.setState({
        selectedContacts: [],
        teamName: ''
      });
    };

    _this.onConfirm = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!_this.state.creating) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

            case 2:
              if (!(_this.state.teamName === '')) {
                _context.next = 5;
                break;
              }

              _this.setState({ error: 'Please enter a valid team name.' });
              return _context.abrupt('return');

            case 5:
              if (!(_this.state.selectedContacts.length === 0)) {
                _context.next = 8;
                break;
              }

              _this.setState({ error: 'Please select team number.' });
              return _context.abrupt('return');

            case 8:
              _this.setState({ creating: true });
              _context.prev = 9;
              _context.next = 12;
              return _this.props.createTeam(_this.state);

            case 12:
              _this.props.updateFilter('');
              _this.setState({
                selectedContacts: [],
                teamName: '',
                creating: false
              });
              _this.props.closeModal();
              _context.next = 21;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context['catch'](9);

              console.log(_context.t0.message);
              _this.setState({ error: _context.t0.message, creating: false });

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[9, 17]]);
    }));

    _this.addContact = function (contact) {
      _this.setState({
        error: null
      });
      var oldIndex = _this.state.selectedContacts.findIndex(function (c) {
        return c.email === contact.email;
      });
      if (oldIndex > -1) {
        return;
      }

      _this.setState({
        selectedContacts: [{
          name: contact.name,
          email: contact.email
        }].concat(_this.state.selectedContacts)
      });
      _this.props.updateFilter('');
    };
    return _this;
  }

  (0, _createClass3.default)(GlipTeamCreationModal, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var contacts = void 0;
      if (this.props.searchFilter.length < 3) {
        contacts = [];
      } else {
        contacts = this.props.filteredContacts.slice(0, 10);
      }
      return _react2.default.createElement(
        _Modal2.default,
        {
          onConfirm: this.onConfirm,
          onCancel: this.onCancel,
          currentLocale: 'en-US',
          show: this.props.show,
          title: 'Create Team',
          textCancel: 'Close',
          textConfirm: this.state.creating ? 'Creating' : 'Create'
        },
        this.state.error ? _react2.default.createElement(
          'div',
          { className: _styles2.default.errorMessage },
          this.state.error
        ) : null,
        _react2.default.createElement(_TextInput2.default, {
          className: _styles2.default.teamName,
          value: this.state.teamName,
          onChange: this.updateTeamName,
          placeholder: 'Team name'
        }),
        _react2.default.createElement(_SearchInput2.default, {
          className: _styles2.default.searchInput,
          value: this.props.searchFilter,
          onChange: this.updateSeachString,
          placeholder: 'Search and add people..'
        }),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.selectedContacts },
          this.state.selectedContacts.map(function (contact) {
            return _react2.default.createElement(
              'span',
              {
                className: _styles2.default.selectedContactItem,
                key: contact.email
              },
              contact.name,
              _react2.default.createElement(
                'span',
                {
                  className: _styles2.default.closeIcon,
                  onClick: function onClick() {
                    return _this3.removeContact(contact.email);
                  }
                },
                'x'
              )
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.contacts },
          contacts.map(function (contact) {
            return _react2.default.createElement(
              'div',
              {
                className: _styles2.default.contactItem,
                key: contact.email,
                onClick: function onClick() {
                  return _this3.addContact(contact);
                }
              },
              _react2.default.createElement(
                'div',
                { className: _styles2.default.contactName, title: contact.name },
                contact.name
              ),
              _react2.default.createElement(
                'div',
                { className: _styles2.default.contactEmail, title: contact.email },
                contact.email
              )
            );
          })
        )
      );
    }
  }]);
  return GlipTeamCreationModal;
}(_react.Component);

exports.default = GlipTeamCreationModal;


GlipTeamCreationModal.propTypes = {
  show: _propTypes2.default.bool.isRequired,
  closeModal: _propTypes2.default.func.isRequired,
  createTeam: _propTypes2.default.func.isRequired,
  updateFilter: _propTypes2.default.func.isRequired,
  searchFilter: _propTypes2.default.string.isRequired,
  filteredContacts: _propTypes2.default.array.isRequired
};
//# sourceMappingURL=index.js.map
