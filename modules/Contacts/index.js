'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _batchApiHelper = require('../../lib/batchApiHelper');

var _sleep = require('../../lib/sleep');

var _sleep2 = _interopRequireDefault(_sleep);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getContactsReducer = require('./getContactsReducer');

var _getContactsReducer2 = _interopRequireDefault(_getContactsReducer);

var _contactsMessages = require('./contactsMessages');

var _contactsMessages2 = _interopRequireDefault(_contactsMessages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MaximumBatchGetPresence = 30;

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

var DEFAULT_TTL = 30 * 60 * 1000; // 30 mins
var DEFAULT_PRESENCETTL = 10 * 60 * 1000; // 10 mins
var DEFAULT_AVATARTTL = 2 * 60 * 60 * 1000; // 2 hour
var DEFAULT_AVATARQUERYINTERVAL = 2 * 1000; // 2 seconds

/**
 * @class
 * @description Contacts managing module
 */

var Contacts = function (_RcModule) {
  (0, _inherits3.default)(Contacts, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {AddressBook} params.addressBook - addressBook module instance
   * @param {AccountExtension} params.accountExtension - accountExtension module instance
   * @param {AccountPhoneNumber} params.accountPhoneNumber - accountPhoneNumber module instance
   * @param {Number} params.ttl - timestamp of local cache, default 30 mins
   * @param {Number} params.avatarTtl - timestamp of avatar local cache, default 2 hour
   * @param {Number} params.presenceTtl - timestamp of presence local cache, default 10 mins
   * @param {Number} params.avatarQueryInterval - interval of query avatar, default 2 seconds
   */
  function Contacts(_ref) {
    var client = _ref.client,
        addressBook = _ref.addressBook,
        accountExtension = _ref.accountExtension,
        accountPhoneNumber = _ref.accountPhoneNumber,
        alert = _ref.alert,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        _ref$avatarTtl = _ref.avatarTtl,
        avatarTtl = _ref$avatarTtl === undefined ? DEFAULT_AVATARTTL : _ref$avatarTtl,
        _ref$presenceTtl = _ref.presenceTtl,
        presenceTtl = _ref$presenceTtl === undefined ? DEFAULT_PRESENCETTL : _ref$presenceTtl,
        _ref$avatarQueryInter = _ref.avatarQueryInterval,
        avatarQueryInterval = _ref$avatarQueryInter === undefined ? DEFAULT_AVATARQUERYINTERVAL : _ref$avatarQueryInter,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'addressBook', 'accountExtension', 'accountPhoneNumber', 'alert', 'ttl', 'avatarTtl', 'presenceTtl', 'avatarQueryInterval']);
    (0, _classCallCheck3.default)(this, Contacts);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Contacts.__proto__ || (0, _getPrototypeOf2.default)(Contacts)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._addressBook = _ensureExist2.default.call(_this, addressBook, 'addressBook');
    _this._accountExtension = _ensureExist2.default.call(_this, accountExtension, 'accountExtension');
    _this._accountPhoneNumber = _ensureExist2.default.call(_this, accountPhoneNumber, 'accountPhoneNumber');
    _this._client = _ensureExist2.default.call(_this, client, 'client');
    _this._alert = _ensureExist2.default.call(_this, alert, 'alert');
    _this._reducer = (0, _getContactsReducer2.default)(_this.actionTypes);
    _this._ttl = ttl;
    _this._avatarTtl = avatarTtl;
    _this._presenceTtl = presenceTtl;
    _this._avatarQueryInterval = avatarQueryInterval;

    _this.addSelector('companyContacts', function () {
      return _this._accountExtension.availableExtensions;
    }, function () {
      return _this._accountPhoneNumber.extensionToPhoneNumberMap;
    }, function (extensions, extensionToPhoneNumberMap) {
      var newExtensions = [];
      extensions.forEach(function (extension) {
        if (!(extension.status === 'Enabled' && ['DigitalUser', 'User', 'Department'].indexOf(extension.type) >= 0)) {
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
    key: 'showAlert',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this._alert) {
                  this._alert.warning({
                    message: _contactsMessages2.default.inexistence
                  });
                }

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function showAlert() {
        return _ref2.apply(this, arguments);
      }

      return showAlert;
    }()
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
    value: function matchContacts(_ref3) {
      var _this3 = this;

      var phoneNumbers = _ref3.phoneNumbers;

      var result = {};
      phoneNumbers.forEach(function (phoneNumber) {
        result[phoneNumber] = _this3.matchPhoneNumber(phoneNumber);
      });
      return result;
    }
  }, {
    key: 'findContactItem',
    value: function findContactItem(_ref4) {
      var contactType = _ref4.contactType,
          contactId = _ref4.contactId;

      var id = (contactId || '').toString();
      switch (contactType) {
        case 'company':
          return this.companyContacts.find(function (x) {
            return x.id.toString() === id;
          });
        case 'personal':
          return this.personalContacts.find(function (x) {
            return x.id.toString() === id;
          });
        default:
          return null;
      }
    }
  }, {
    key: 'getImageProfile',
    value: function getImageProfile(contact) {
      var _this4 = this;

      var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      return new _promise2.default(function (resolve) {
        if (!contact || !contact.id || contact.type !== 'company' || !contact.hasProfileImage) {
          resolve(null);
          return;
        }

        var imageId = '' + contact.type + contact.id;
        if (useCache && _this4.profileImages[imageId] && Date.now() - _this4.profileImages[imageId].timestamp < _this4._avatarTtl) {
          var image = _this4.profileImages[imageId].imageUrl;
          resolve(image);
          return;
        }

        if (!_this4._getAvatarContexts) {
          _this4._getAvatarContexts = [];
        }
        _this4._getAvatarContexts.push({
          contact: contact,
          resolve: resolve
        });

        if (!_this4._queryingAvatar) {
          _this4._queryingAvatar = true;
          _this4._processQueryAvatar(_this4._getAvatarContexts);
        }
      });
    }
  }, {
    key: '_processQueryAvatar',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(getAvatarContexts) {
        var ctx, imageId, imageUrl, response;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ctx = getAvatarContexts[0];
                imageId = '' + ctx.contact.type + ctx.contact.id;
                imageUrl = null;
                _context2.prev = 3;
                _context2.next = 6;
                return this._client.account().extension(ctx.contact.id).profileImage('195x195').get();

              case 6:
                response = _context2.sent;
                _context2.t0 = URL;
                _context2.next = 10;
                return response._response.blob();

              case 10:
                _context2.t1 = _context2.sent;
                imageUrl = _context2.t0.createObjectURL.call(_context2.t0, _context2.t1);

                this.store.dispatch({
                  type: this.actionTypes.fetchImageSuccess,
                  imageId: imageId,
                  imageUrl: imageUrl,
                  ttl: this._avatarTtl
                });
                _context2.next = 18;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t2 = _context2['catch'](3);

                console.error(_context2.t2);

              case 18:
                ctx.resolve(imageUrl);
                getAvatarContexts.splice(0, 1);

                if (!getAvatarContexts.length) {
                  _context2.next = 26;
                  break;
                }

                _context2.next = 23;
                return (0, _sleep2.default)(this._avatarQueryInterval);

              case 23:
                this._processQueryAvatar(getAvatarContexts);
                _context2.next = 27;
                break;

              case 26:
                this._queryingAvatar = false;

              case 27:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 15]]);
      }));

      function _processQueryAvatar(_x2) {
        return _ref5.apply(this, arguments);
      }

      return _processQueryAvatar;
    }()
  }, {
    key: 'getPresence',
    value: function getPresence(contact) {
      var _this5 = this;

      return new _promise2.default(function (resolve) {
        if (!contact || !contact.id || contact.type !== 'company') {
          resolve(null);
          return;
        }

        var presenceId = '' + contact.type + contact.id;
        if (_this5.contactPresences[presenceId] && Date.now() - _this5.contactPresences[presenceId].timestamp < _this5._presenceTtl) {
          var presence = _this5.contactPresences[presenceId].presence;
          resolve(presence);
          return;
        }

        if (!_this5._getPresenceContexts) {
          _this5._getPresenceContexts = [];
        }
        _this5._getPresenceContexts.push({
          contact: contact,
          resolve: resolve
        });

        clearTimeout(_this5.enqueueTimeoutId);
        if (_this5._getPresenceContexts.length === MaximumBatchGetPresence) {
          _this5._processQueryPresences(_this5._getPresenceContexts);
          _this5._getPresenceContexts = null;
        } else {
          _this5.enqueueTimeoutId = setTimeout(function () {
            _this5._processQueryPresences(_this5._getPresenceContexts);
            _this5._getPresenceContexts = null;
          }, 1000);
        }
      });
    }
  }, {
    key: '_processQueryPresences',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(getPresenceContexts) {
        var _this6 = this;

        var contacts, responses;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                contacts = getPresenceContexts.map(function (x) {
                  return x.contact;
                });
                _context3.next = 3;
                return this._batchQueryPresences(contacts);

              case 3:
                responses = _context3.sent;

                getPresenceContexts.forEach(function (ctx) {
                  var response = responses[ctx.contact.id];
                  if (!response) {
                    ctx.resolve(null);
                    return;
                  }
                  var dndStatus = response.dndStatus,
                      presenceStatus = response.presenceStatus,
                      telephonyStatus = response.telephonyStatus,
                      userStatus = response.userStatus;

                  var presence = {
                    dndStatus: dndStatus,
                    presenceStatus: presenceStatus,
                    telephonyStatus: telephonyStatus,
                    userStatus: userStatus
                  };
                  var presenceId = '' + ctx.contact.type + ctx.contact.id;
                  _this6.store.dispatch({
                    type: _this6.actionTypes.fetchPresenceSuccess,
                    presenceId: presenceId,
                    presence: presence,
                    ttl: _this6._presenceTtl
                  });
                  ctx.resolve(presence);
                });

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _processQueryPresences(_x3) {
        return _ref6.apply(this, arguments);
      }

      return _processQueryPresences;
    }()
  }, {
    key: '_batchQueryPresences',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(contacts) {
        var presenceSet, id, response, ids, multipartResponse, responses;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                presenceSet = {};
                _context4.prev = 1;

                if (!(contacts.length === 1)) {
                  _context4.next = 10;
                  break;
                }

                id = contacts[0].id;
                _context4.next = 6;
                return this._client.account().extension(id).presence().get();

              case 6:
                response = _context4.sent;

                presenceSet[id] = response;
                _context4.next = 17;
                break;

              case 10:
                if (!(contacts.length > 1)) {
                  _context4.next = 17;
                  break;
                }

                ids = contacts.map(function (x) {
                  return x.id;
                }).join(',');
                _context4.next = 14;
                return (0, _batchApiHelper.batchGetApi)({
                  platform: this._client.service.platform(),
                  url: '/account/~/extension/' + ids + '/presence?detailedTelephonyState=true&sipData=true'
                });

              case 14:
                multipartResponse = _context4.sent;
                responses = multipartResponse.map(function (x) {
                  return x.json();
                });

                responses.forEach(function (item) {
                  presenceSet[item.extension.id] = item;
                });

              case 17:
                _context4.next = 22;
                break;

              case 19:
                _context4.prev = 19;
                _context4.t0 = _context4['catch'](1);

                console.error(_context4.t0);

              case 22:
                return _context4.abrupt('return', presenceSet);

              case 23:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 19]]);
      }));

      function _batchQueryPresences(_x4) {
        return _ref7.apply(this, arguments);
      }

      return _batchQueryPresences;
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
  }, {
    key: 'contactPresences',
    get: function get() {
      return this.state.contactPresences;
    }
  }]);
  return Contacts;
}(_RcModule3.default);

exports.default = Contacts;
//# sourceMappingURL=index.js.map
