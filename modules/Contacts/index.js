'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _isBlank = require('../../lib/isBlank');

var _isBlank2 = _interopRequireDefault(_isBlank);

var _normalizeNumber = require('../../lib/normalizeNumber');

var _normalizeNumber2 = _interopRequireDefault(_normalizeNumber);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getContactsReducer = require('./getContactsReducer');

var _getContactsReducer2 = _interopRequireDefault(_getContactsReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addPhoneToContact(contact, phone, type) {
  var phoneNumber = (0, _normalizeNumber2.default)({ phoneNumber: phone });
  if ((0, _isBlank2.default)(phoneNumber)) {
    return;
  }
  var existedPhone = contact.phoneNumbers.find(function (number) {
    return number && number.phoneNumber === phone;
  });
  if (existedPhone) {
    existedPhone.phoneType = type;
  } else {
    contact.phoneNumbers.push({
      phoneNumber: phone,
      phoneType: type
    });
  }
}

var DEFAULT_TTL = 30 * 60 * 1000;

var Contacts = function (_RcModule) {
  (0, _inherits3.default)(Contacts, _RcModule);

  function Contacts(_ref) {
    var client = _ref.client,
        addressBook = _ref.addressBook,
        accountExtension = _ref.accountExtension,
        accountPhoneNumber = _ref.accountPhoneNumber,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'addressBook', 'accountExtension', 'accountPhoneNumber', 'ttl']);
    (0, _classCallCheck3.default)(this, Contacts);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Contacts.__proto__ || (0, _getPrototypeOf2.default)(Contacts)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._addressBook = _ensureExist2.default.call(_this, addressBook, 'addressBook');
    _this._accountExtension = _ensureExist2.default.call(_this, accountExtension, 'accountExtension');
    _this._accountPhoneNumber = _ensureExist2.default.call(_this, accountPhoneNumber, 'accountPhoneNumber');
    _this._client = _ensureExist2.default.call(_this, client, 'client');
    _this._reducer = (0, _getContactsReducer2.default)(_this.actionTypes);
    _this._ttl = ttl;

    _this.addSelector('companyContacts', function () {
      return _this._accountExtension.availableExtensions;
    }, function () {
      return _this._accountPhoneNumber.extensionToPhoneNumberMap;
    }, function (extensions, extensionToPhoneNumberMap) {
      var newExtensions = [];
      extensions.forEach(function (extension) {
        if (!(extension.status === 'Enabled' && ['DigitalUser', 'User'].indexOf(extension.type) >= 0)) {
          return;
        }
        var contact = {
          type: 'company',
          id: extension.id,
          firstName: extension.contact && extension.contact.firstName,
          lastName: extension.contact && extension.contact.lastName,
          email: extension.contact && extension.contact.email,
          extensionNumber: extension.ext,
          hasProfileImage: extension.hasProfileImage,
          phoneNumbers: []
        };
        if ((0, _isBlank2.default)(contact.extensionNumber)) {
          return;
        }
        var phones = extensionToPhoneNumberMap[contact.extensionNumber];
        if (phones && phones.length > 0) {
          phones.forEach(function (phone) {
            addPhoneToContact(contact, phone.phoneNumber, 'directPhone');
          });
        }
        newExtensions.push(contact);
      });
      return newExtensions;
    });

    _this.addSelector('personalContacts', function () {
      return _this._addressBook.contacts;
    }, function (rawContacts) {
      var contacts = [];
      rawContacts.forEach(function (rawContact) {
        var contact = (0, _extends3.default)({
          type: 'personal',
          phoneNumbers: []
        }, rawContact);
        (0, _keys2.default)(contact).forEach(function (key) {
          if (key.toLowerCase().indexOf('phone') === -1) {
            return;
          }
          if (typeof contact[key] !== 'string') {
            return;
          }
          addPhoneToContact(contact, contact[key], key);
        });
        contacts.push(contact);
      });
      return contacts;
    });
    return _this;
  }

  (0, _createClass3.default)(Contacts, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: '_onStateChange',
    value: function _onStateChange() {
      if (this._shouldInit()) {
        this.store.dispatch({
          type: this.actionTypes.initSuccess
        });
      } else if (this._shouldReset()) {
        this._resetModuleStatus();
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._addressBook.ready && this._accountExtension.ready && this._accountPhoneNumber.ready && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._addressBook.ready || !this._accountExtension.ready || !this._accountPhoneNumber.ready) && this.ready;
    }
  }, {
    key: '_resetModuleStatus',
    value: function _resetModuleStatus() {
      this.store.dispatch({
        type: this.actionTypes.resetSuccess
      });
    }
  }, {
    key: 'matchPhoneNumber',
    value: function matchPhoneNumber(phone) {
      var result = [];
      var phoneNumber = (0, _normalizeNumber2.default)({ phoneNumber: phone });
      var matchContact = function matchContact(contact) {
        var found = contact.extensionNumber && contact.extensionNumber === phoneNumber;
        if (!found) {
          contact.phoneNumbers.forEach(function (contactPhoneNumber) {
            if (!found && contactPhoneNumber.phoneNumber === phoneNumber) {
              found = true;
            }
          });
        }
        if (!found) {
          return;
        }
        var name = (contact.firstName ? contact.firstName : '') + ' ' + (contact.lastName ? contact.lastName : '');
        var matchedContact = (0, _extends3.default)({}, contact, {
          phoneNumbers: [].concat((0, _toConsumableArray3.default)(contact.phoneNumbers)),
          entityType: 'rcContact',
          name: name
        });
        if (contact.extensionNumber) {
          matchedContact.phoneNumbers.push({
            phoneType: 'extension',
            phoneNumber: contact.extensionNumber
          });
        }
        result.push(matchedContact);
      };
      this.companyContacts.forEach(matchContact);
      this.personalContacts.forEach(matchContact);
      return result;
    }
  }, {
    key: 'matchContacts',
    value: function matchContacts(_ref2) {
      var _this3 = this;

      var phoneNumbers = _ref2.phoneNumbers;

      var result = {};
      phoneNumbers.forEach(function (phoneNumber) {
        result[phoneNumber] = _this3.matchPhoneNumber(phoneNumber);
      });
      return result;
    }
  }, {
    key: 'getImageProfile',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(contact) {
        var imageId, response, imageUrl, image;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(contact.type === 'company' && contact.id && contact.hasProfileImage)) {
                  _context.next = 22;
                  break;
                }

                imageId = '' + contact.type + contact.id;

                if (!(this.profileImages[imageId] && Date.now() - this.profileImages[imageId].timestamp < this._ttl)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', this.profileImages[imageId].url);

              case 4:
                _context.prev = 4;
                _context.next = 7;
                return this._client.account().extension(contact.id).profileImage().get();

              case 7:
                response = _context.sent;
                _context.t0 = URL;
                _context.next = 11;
                return response._response.blob();

              case 11:
                _context.t1 = _context.sent;
                imageUrl = _context.t0.createObjectURL.call(_context.t0, _context.t1);
                image = {
                  id: imageId,
                  url: imageUrl
                };

                this.store.dispatch({
                  type: this.actionTypes.fetchImageSuccess,
                  image: image
                });
                return _context.abrupt('return', image.url);

              case 18:
                _context.prev = 18;
                _context.t2 = _context['catch'](4);

                console.error(_context.t2);
                return _context.abrupt('return', null);

              case 22:
                return _context.abrupt('return', null);

              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 18]]);
      }));

      function getImageProfile(_x) {
        return _ref3.apply(this, arguments);
      }

      return getImageProfile;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'companyContacts',
    get: function get() {
      return this._selectors.companyContacts();
    }
  }, {
    key: 'personalContacts',
    get: function get() {
      return this._selectors.personalContacts();
    }
  }, {
    key: 'profileImages',
    get: function get() {
      return this.state.profileImages;
    }
  }]);
  return Contacts;
}(_RcModule3.default);

exports.default = Contacts;
//# sourceMappingURL=index.js.map
