'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getOwnPropertyDescriptor = require('babel-runtime/core-js/object/get-own-property-descriptor');

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _dec, _class, _desc, _value, _class2;

var _RcModule2 = require('../../lib/RcModule');

var _RcModule3 = _interopRequireDefault(_RcModule2);

var _di = require('../../lib/di');

var _isBlank = require('../../lib/isBlank');

var _isBlank2 = _interopRequireDefault(_isBlank);

var _ensureExist = require('../../lib/ensureExist');

var _ensureExist2 = _interopRequireDefault(_ensureExist);

var _contactHelper = require('../../lib/contactHelper');

var _batchApiHelper = require('../../lib/batchApiHelper');

var _proxify = require('../../lib/proxy/proxify');

var _proxify2 = _interopRequireDefault(_proxify);

var _actionTypes = require('./actionTypes');

var _actionTypes2 = _interopRequireDefault(_actionTypes);

var _getReducer = require('./getReducer');

var _getReducer2 = _interopRequireDefault(_getReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var MaximumBatchGetPresence = 30;
var DEFAULT_TTL = 30 * 60 * 1000; // 30 mins
var DEFAULT_PRESENCETTL = 10 * 60 * 1000; // 10 mins
var DEFAULT_AVATARTTL = 2 * 60 * 60 * 1000; // 2 hour
var DEFAULT_AVATARQUERYINTERVAL = 2 * 1000; // 2 seconds

/**
 * @class
 * @description Contacts managing module
 */
var AccountContacts = (_dec = (0, _di.Module)({
  deps: ['Client', 'AccountExtension', 'AccountPhoneNumber', { dep: 'AccoundContactsOptions', optional: true }]
}), _dec(_class = (_class2 = function (_RcModule) {
  (0, _inherits3.default)(AccountContacts, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {AccountExtension} params.accountExtension - accountExtension module instance
   * @param {AccountPhoneNumber} params.accountPhoneNumber - accountPhoneNumber module instance
   * @param {Number} params.ttl - timestamp of local cache, default 30 mins
   * @param {Number} params.avatarTtl - timestamp of avatar local cache, default 2 hour
   * @param {Number} params.presenceTtl - timestamp of presence local cache, default 10 mins
   * @param {Number} params.avatarQueryInterval - interval of query avatar, default 2 seconds
   */
  function AccountContacts(_ref) {
    var client = _ref.client,
        accountExtension = _ref.accountExtension,
        accountPhoneNumber = _ref.accountPhoneNumber,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === undefined ? DEFAULT_TTL : _ref$ttl,
        _ref$avatarTtl = _ref.avatarTtl,
        avatarTtl = _ref$avatarTtl === undefined ? DEFAULT_AVATARTTL : _ref$avatarTtl,
        _ref$presenceTtl = _ref.presenceTtl,
        presenceTtl = _ref$presenceTtl === undefined ? DEFAULT_PRESENCETTL : _ref$presenceTtl,
        _ref$avatarQueryInter = _ref.avatarQueryInterval,
        avatarQueryInterval = _ref$avatarQueryInter === undefined ? DEFAULT_AVATARQUERYINTERVAL : _ref$avatarQueryInter,
        options = (0, _objectWithoutProperties3.default)(_ref, ['client', 'accountExtension', 'accountPhoneNumber', 'ttl', 'avatarTtl', 'presenceTtl', 'avatarQueryInterval']);
    (0, _classCallCheck3.default)(this, AccountContacts);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AccountContacts.__proto__ || (0, _getPrototypeOf2.default)(AccountContacts)).call(this, (0, _extends3.default)({}, options, {
      actionTypes: _actionTypes2.default
    })));

    _this._accountExtension = _ensureExist2.default.call(_this, accountExtension, 'accountExtension');
    _this._accountPhoneNumber = _ensureExist2.default.call(_this, accountPhoneNumber, 'accountPhoneNumber');
    _this._client = _ensureExist2.default.call(_this, client, 'client');

    _this._ttl = ttl;
    _this._avatarTtl = avatarTtl;
    _this._presenceTtl = presenceTtl;
    _this._avatarQueryInterval = avatarQueryInterval;

    _this._reducer = (0, _getReducer2.default)(_this.actionTypes);

    _this.addSelector('contacts', function () {
      return _this._accountExtension.availableExtensions;
    }, function () {
      return _this._accountPhoneNumber.extensionToPhoneNumberMap;
    }, function () {
      return _this.profileImages;
    }, function () {
      return _this.presences;
    }, function (extensions, extensionToPhoneNumberMap, profileImages, presences) {
      var newExtensions = [];
      extensions.forEach(function (extension) {
        if (!(extension.status === 'Enabled' && ['DigitalUser', 'User', 'Department'].indexOf(extension.type) >= 0)) {
          return;
        }
        var id = '' + extension.id;
        var contact = {
          type: _this.sourceName,
          id: id,
          firstName: extension.contact && extension.contact.firstName,
          lastName: extension.contact && extension.contact.lastName,
          emails: extension.contact ? [extension.contact.email] : [],
          extensionNumber: extension.ext,
          hasProfileImage: !!extension.hasProfileImage,
          phoneNumbers: [{ phoneNumber: extension.ext, phoneType: 'extension' }],
          profileImageUrl: profileImages[id] && profileImages[id].imageUrl,
          presence: presences[id] && presences[id].presence
        };
        contact.name = (contact.firstName || '') + ' ' + (contact.lastName || '');
        if ((0, _isBlank2.default)(contact.extensionNumber)) {
          return;
        }
        var phones = extensionToPhoneNumberMap[contact.extensionNumber];
        if (phones && phones.length > 0) {
          phones.forEach(function (phone) {
            (0, _contactHelper.addPhoneToContact)(contact, phone.phoneNumber, 'directPhone');
          });
        }
        newExtensions.push(contact);
      });
      return newExtensions;
    });
    return _this;
  }

  (0, _createClass3.default)(AccountContacts, [{
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
        this.store.dispatch({
          type: this.actionTypes.resetSuccess
        });
      }
    }
  }, {
    key: '_shouldInit',
    value: function _shouldInit() {
      return this._accountExtension.ready && this._accountPhoneNumber.ready && this.pending;
    }
  }, {
    key: '_shouldReset',
    value: function _shouldReset() {
      return (!this._accountExtension.ready || !this._accountPhoneNumber.ready) && this.ready;
    }

    // interface of contact source

  }, {
    key: 'getProfileImage',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(contact) {
        var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var imageId, image, imageUrl, response;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(!contact || !contact.id || contact.type !== 'company' || !contact.hasProfileImage)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', null);

              case 2:
                imageId = contact.id;

                if (!(useCache && this.profileImages[imageId] && Date.now() - this.profileImages[imageId].timestamp < this._avatarTtl)) {
                  _context.next = 6;
                  break;
                }

                image = this.profileImages[imageId].imageUrl;
                return _context.abrupt('return', image);

              case 6:
                imageUrl = null;
                _context.prev = 7;
                _context.next = 10;
                return this._client.account().extension(contact.id).profileImage('195x195').get();

              case 10:
                response = _context.sent;
                _context.t0 = URL;
                _context.next = 14;
                return response._response.blob();

              case 14:
                _context.t1 = _context.sent;
                imageUrl = _context.t0.createObjectURL.call(_context.t0, _context.t1);

                this.store.dispatch({
                  type: this.actionTypes.fetchImageSuccess,
                  imageId: imageId,
                  imageUrl: imageUrl,
                  ttl: this._avatarTtl
                });
                _context.next = 22;
                break;

              case 19:
                _context.prev = 19;
                _context.t2 = _context['catch'](7);

                console.error(_context.t2);

              case 22:
                return _context.abrupt('return', imageUrl);

              case 23:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 19]]);
      }));

      function getProfileImage(_x) {
        return _ref2.apply(this, arguments);
      }

      return getProfileImage;
    }()

    // interface of contact source

  }, {
    key: 'getPresence',
    value: function getPresence(contact) {
      var _this3 = this;

      var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      return new _promise2.default(function (resolve) {
        if (!contact || !contact.id || contact.type !== 'company') {
          resolve(null);
          return;
        }

        var presenceId = '' + contact.id;
        if (useCache && _this3.presences[presenceId] && Date.now() - _this3.presences[presenceId].timestamp < _this3._presenceTtl) {
          var presence = _this3.presences[presenceId].presence;

          resolve(presence);
          return;
        }

        if (!_this3._getPresenceContexts) {
          _this3._getPresenceContexts = [];
        }
        _this3._getPresenceContexts.push({
          contact: contact,
          resolve: resolve
        });

        clearTimeout(_this3.enqueueTimeoutId);
        if (_this3._getPresenceContexts.length === MaximumBatchGetPresence) {
          _this3._processQueryPresences(_this3._getPresenceContexts);
          _this3._getPresenceContexts = null;
        } else {
          _this3.enqueueTimeoutId = setTimeout(function () {
            _this3._processQueryPresences(_this3._getPresenceContexts);
            _this3._getPresenceContexts = null;
          }, 1000);
        }
      });
    }

    // interface of contact source

  }, {
    key: 'matchPhoneNumber',
    value: function matchPhoneNumber(phoneNumber) {
      return (0, _contactHelper.getMatchContacts)({
        contacts: this.contacts,
        phoneNumber: phoneNumber,
        entityType: 'rcContact'
      });
    }
  }, {
    key: '_processQueryPresences',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(getPresenceContexts) {
        var contacts, responses, presenceMap;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                contacts = getPresenceContexts.map(function (x) {
                  return x.contact;
                });
                _context2.next = 3;
                return this._batchQueryPresences(contacts);

              case 3:
                responses = _context2.sent;
                presenceMap = {};

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

                  var presenceId = ctx.contact.id;
                  presenceMap[presenceId] = {
                    dndStatus: dndStatus,
                    presenceStatus: presenceStatus,
                    telephonyStatus: telephonyStatus,
                    userStatus: userStatus
                  };
                  ctx.resolve(presenceMap[presenceId]);
                });
                this.store.dispatch({
                  type: this.actionTypes.batchFetchPresenceSuccess,
                  presenceMap: presenceMap,
                  ttl: this._presenceTtl
                });

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _processQueryPresences(_x4) {
        return _ref3.apply(this, arguments);
      }

      return _processQueryPresences;
    }()
  }, {
    key: '_batchQueryPresences',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(contacts) {
        var presenceSet, id, response, ids, multipartResponse, responses;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                presenceSet = {};
                _context3.prev = 1;

                if (!(contacts.length === 1)) {
                  _context3.next = 10;
                  break;
                }

                id = contacts[0].id;
                _context3.next = 6;
                return this._client.account().extension(id).presence().get();

              case 6:
                response = _context3.sent;

                presenceSet[id] = response;
                _context3.next = 17;
                break;

              case 10:
                if (!(contacts.length > 1)) {
                  _context3.next = 17;
                  break;
                }

                ids = contacts.map(function (x) {
                  return x.id;
                }).join(',');
                _context3.next = 14;
                return (0, _batchApiHelper.batchGetApi)({
                  platform: this._client.service.platform(),
                  url: '/account/~/extension/' + ids + '/presence?detailedTelephonyState=true&sipData=true'
                });

              case 14:
                multipartResponse = _context3.sent;
                responses = multipartResponse.map(function (x) {
                  return x.json();
                });

                responses.forEach(function (item) {
                  presenceSet[item.extension.id] = item;
                });

              case 17:
                _context3.next = 22;
                break;

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3['catch'](1);

                console.error(_context3.t0);

              case 22:
                return _context3.abrupt('return', presenceSet);

              case 23:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 19]]);
      }));

      function _batchQueryPresences(_x5) {
        return _ref4.apply(this, arguments);
      }

      return _batchQueryPresences;
    }()
  }, {
    key: 'status',
    get: function get() {
      return this.state.status;
    }
  }, {
    key: 'profileImages',
    get: function get() {
      return this.state.profileImages;
    }
  }, {
    key: 'presences',
    get: function get() {
      return this.state.presences;
    }

    // interface of contact source

  }, {
    key: 'sourceName',
    get: function get() {
      return 'company';
    }

    // interface of contact source

  }, {
    key: 'contacts',
    get: function get() {
      return this._selectors.contacts();
    }
  }, {
    key: 'sourceReady',
    get: function get() {
      return this.ready;
    }
  }]);
  return AccountContacts;
}(_RcModule3.default), (_applyDecoratedDescriptor(_class2.prototype, 'getProfileImage', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'getProfileImage'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'getPresence', [_proxify2.default], (0, _getOwnPropertyDescriptor2.default)(_class2.prototype, 'getPresence'), _class2.prototype)), _class2)) || _class);
exports.default = AccountContacts;
//# sourceMappingURL=index.js.map
