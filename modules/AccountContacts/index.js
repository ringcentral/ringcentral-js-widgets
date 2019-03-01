"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.date.now");

require("regenerator-runtime/runtime");

var _ramda = require("ramda");

var _phoneTypes = _interopRequireDefault(require("../../enums/phoneTypes"));

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _isBlank = _interopRequireDefault(require("../../lib/isBlank"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _contactHelper = require("../../lib/contactHelper");

var _batchApiHelper = require("../../lib/batchApiHelper");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _selector = require("../../lib/selector");

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getReducer = _interopRequireDefault(require("./getReducer"));

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

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
  deps: ['Client', {
    dep: 'AccountExtension',
    optional: true
  }, {
    dep: 'AccountDirectory',
    optional: true
  }, {
    dep: 'AccountPhoneNumber',
    optional: true
  }, {
    dep: 'AccountContactsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_RcModule) {
  _inherits(AccountContacts, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {AccountExtension} params.accountExtension - accountExtension module instance
   * @param {AccountPhoneNumber} params.accountPhoneNumber - accountPhoneNumber module instance
   * @param {Number} params.ttl - timestamp of local cache, default 30 mins
   * @param {Number} params.avatarTtl - timestamp of avatar local cache, default 2 hour
   * @param {Number} params.presenceTtl - timestamp of presence local cache, default 10 mins
   * @param {Number} params.needCheckStatus - If it's necessary to check extension's status
   * @param {Number} params.avatarQueryInterval - interval of query avatar, default 2 seconds
   */
  function AccountContacts(_ref) {
    var _context;

    var _this;

    var client = _ref.client,
        accountExtension = _ref.accountExtension,
        accountDirectory = _ref.accountDirectory,
        accountPhoneNumber = _ref.accountPhoneNumber,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        _ref$avatarTtl = _ref.avatarTtl,
        avatarTtl = _ref$avatarTtl === void 0 ? DEFAULT_AVATARTTL : _ref$avatarTtl,
        _ref$presenceTtl = _ref.presenceTtl,
        presenceTtl = _ref$presenceTtl === void 0 ? DEFAULT_PRESENCETTL : _ref$presenceTtl,
        _ref$avatarQueryInter = _ref.avatarQueryInterval,
        avatarQueryInterval = _ref$avatarQueryInter === void 0 ? DEFAULT_AVATARQUERYINTERVAL : _ref$avatarQueryInter,
        options = _objectWithoutProperties(_ref, ["client", "accountExtension", "accountDirectory", "accountPhoneNumber", "ttl", "avatarTtl", "presenceTtl", "avatarQueryInterval"]);

    _classCallCheck(this, AccountContacts);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AccountContacts).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes.default
    })));

    _initializerDefineProperty(_this, "extensionContacts", _descriptor, _assertThisInitialized(_assertThisInitialized(_this)));

    _initializerDefineProperty(_this, "directoryContacts", _descriptor2, _assertThisInitialized(_assertThisInitialized(_this)));

    _this._client = (_context = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context, client, 'client');

    if (accountDirectory) {
      _this._accountDirectory = accountDirectory;
    } else {
      var _context2;

      _this._accountPhoneNumber = (_context2 = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context2, accountPhoneNumber, 'accountPhoneNumber');
      _this._accountExtension = (_context2 = _assertThisInitialized(_assertThisInitialized(_this)), _ensureExist.default).call(_context2, accountExtension, 'accountExtension');
    }

    _this._ttl = ttl;
    _this._avatarTtl = avatarTtl;
    _this._presenceTtl = presenceTtl;
    _this._avatarQueryInterval = avatarQueryInterval;
    _this._reducer = (0, _getReducer.default)(_this.actionTypes);
    return _this;
  }

  _createClass(AccountContacts, [{
    key: "initialize",
    value: function initialize() {
      var _this2 = this;

      this.store.subscribe(function () {
        return _this2._onStateChange();
      });
    }
  }, {
    key: "_onStateChange",
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
    key: "_shouldInit",
    value: function _shouldInit() {
      return (this._accountDirectory ? this._accountDirectory.ready : this._accountExtension && this._accountExtension.ready) && (this._accountPhoneNumber ? this._accountPhoneNumber.ready : true) && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (this._accountDirectory ? !this._accountDirectory.ready : !this._accountExtension.ready || !this._accountPhoneNumber.ready) && this.ready;
    } // interface of contact source

  }, {
    key: "getProfileImage",
    value: function () {
      var _getProfileImage = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(contact) {
        var useCache,
            imageId,
            image,
            imageUrl,
            response,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                useCache = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;

                if (!(!contact || !contact.id || contact.type !== 'company' || !contact.hasProfileImage)) {
                  _context3.next = 3;
                  break;
                }

                return _context3.abrupt("return", null);

              case 3:
                imageId = contact.id;

                if (!(useCache && this.profileImages[imageId] && Date.now() - this.profileImages[imageId].timestamp < this._avatarTtl)) {
                  _context3.next = 7;
                  break;
                }

                image = this.profileImages[imageId].imageUrl;
                return _context3.abrupt("return", image);

              case 7:
                imageUrl = null;
                _context3.prev = 8;
                _context3.next = 11;
                return this._client.account().extension(contact.id).profileImage('195x195').get();

              case 11:
                response = _context3.sent;
                _context3.t0 = URL;
                _context3.next = 15;
                return response._response.blob();

              case 15:
                _context3.t1 = _context3.sent;
                imageUrl = _context3.t0.createObjectURL.call(_context3.t0, _context3.t1);
                this.store.dispatch({
                  type: this.actionTypes.fetchImageSuccess,
                  imageId: imageId,
                  imageUrl: imageUrl,
                  ttl: this._avatarTtl
                });
                _context3.next = 23;
                break;

              case 20:
                _context3.prev = 20;
                _context3.t2 = _context3["catch"](8);
                console.error(_context3.t2);

              case 23:
                return _context3.abrupt("return", imageUrl);

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee, this, [[8, 20]]);
      }));

      function getProfileImage(_x) {
        return _getProfileImage.apply(this, arguments);
      }

      return getProfileImage;
    }() // interface of contact source

  }, {
    key: "getPresence",
    value: function getPresence(contact) {
      var _this3 = this;

      var useCache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return new Promise(function (resolve) {
        if (!contact || !contact.id || contact.type !== 'company') {
          resolve(null);
          return;
        }

        var presenceId = "".concat(contact.id);

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
    } // interface of contact source

  }, {
    key: "matchPhoneNumber",
    value: function matchPhoneNumber(phoneNumber) {
      return (0, _contactHelper.getMatchContacts)({
        contacts: this.contacts,
        phoneNumber: phoneNumber,
        entityType: 'rcContact'
      });
    }
  }, {
    key: "_processQueryPresences",
    value: function () {
      var _processQueryPresences2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(getPresenceContexts) {
        var contacts, responses, presenceMap;
        return regeneratorRuntime.wrap(function _callee2$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                contacts = getPresenceContexts.map(function (x) {
                  return x.contact;
                });
                _context4.next = 3;
                return this._batchQueryPresences(contacts);

              case 3:
                responses = _context4.sent;
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
              case "end":
                return _context4.stop();
            }
          }
        }, _callee2, this);
      }));

      function _processQueryPresences(_x2) {
        return _processQueryPresences2.apply(this, arguments);
      }

      return _processQueryPresences;
    }()
  }, {
    key: "_batchQueryPresences",
    value: function () {
      var _batchQueryPresences2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(contacts) {
        var presenceSet, id, response, ids, multipartResponse, responses;
        return regeneratorRuntime.wrap(function _callee3$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                presenceSet = {};
                _context5.prev = 1;

                if (!(contacts.length === 1)) {
                  _context5.next = 10;
                  break;
                }

                id = contacts[0].id;
                _context5.next = 6;
                return this._client.account().extension(id).presence().get();

              case 6:
                response = _context5.sent;
                presenceSet[id] = response;
                _context5.next = 17;
                break;

              case 10:
                if (!(contacts.length > 1)) {
                  _context5.next = 17;
                  break;
                }

                ids = contacts.map(function (x) {
                  return x.id;
                }).join(',');
                _context5.next = 14;
                return (0, _batchApiHelper.batchGetApi)({
                  platform: this._client.service.platform(),
                  url: "/account/~/extension/".concat(ids, "/presence?detailedTelephonyState=true&sipData=true")
                });

              case 14:
                multipartResponse = _context5.sent;
                responses = (0, _ramda.map)(function (x) {
                  return x.json();
                }, multipartResponse);
                (0, _ramda.forEach)(function (item) {
                  if (item.errorCode) {
                    console.warn(item);
                    return;
                  }

                  presenceSet[item.extension.id] = item;
                }, responses);

              case 17:
                _context5.next = 22;
                break;

              case 19:
                _context5.prev = 19;
                _context5.t0 = _context5["catch"](1);
                console.error(_context5.t0);

              case 22:
                return _context5.abrupt("return", presenceSet);

              case 23:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee3, this, [[1, 19]]);
      }));

      function _batchQueryPresences(_x3) {
        return _batchQueryPresences2.apply(this, arguments);
      }

      return _batchQueryPresences;
    }()
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "profileImages",
    get: function get() {
      return this.state.profileImages;
    }
  }, {
    key: "presences",
    get: function get() {
      return this.state.presences;
    } // interface of contact source

  }, {
    key: "sourceName",
    get: function get() {
      return 'company';
    }
  }, {
    key: "contacts",
    get: function get() {
      return this._accountDirectory ? this.directoryContacts : this.extensionContacts;
    }
  }, {
    key: "sourceReady",
    get: function get() {
      return this.ready;
    }
  }]);

  return AccountContacts;
}(_RcModule2.default), _temp), (_applyDecoratedDescriptor(_class2.prototype, "getProfileImage", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfileImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_proxify.default], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "extensionContacts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this4 = this;

    return [function () {
      return _this4._accountExtension.availableExtensions;
    }, function () {
      return _this4._accountPhoneNumber.extensionToPhoneNumberMap;
    }, function () {
      return _this4.profileImages;
    }, function () {
      return _this4.presences;
    }, function (extensions, extensionToPhoneNumberMap, profileImages, presences) {
      return (0, _ramda.reduce)(function (result, extension) {
        var id = "".concat(extension.id);
        var contact = {
          type: _this4.sourceName,
          id: id,
          firstName: extension.contact && extension.contact.firstName,
          lastName: extension.contact && extension.contact.lastName,
          emails: extension.contact ? [extension.contact.email] : [],
          extensionNumber: extension.ext,
          hasProfileImage: !!extension.hasProfileImage,
          phoneNumbers: [{
            phoneNumber: extension.ext,
            phoneType: _phoneTypes.default.extension
          }],
          profileImageUrl: profileImages[id] && profileImages[id].imageUrl,
          presence: presences[id] && presences[id].presence,
          contactStatus: extension.status
        };
        contact.name = "".concat(contact.firstName || '', " ").concat(contact.lastName || '');

        if ((0, _isBlank.default)(contact.extensionNumber)) {
          return result;
        }

        var phones = extensionToPhoneNumberMap[contact.extensionNumber];

        if (phones && phones.length > 0) {
          phones.forEach(function (phone) {
            (0, _contactHelper.addPhoneToContact)(contact, phone.phoneNumber, _phoneTypes.default.direct);
          });
        }

        result.push(contact);
        return result;
      }, [], extensions);
    }];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "directoryContacts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return [function () {
      return _this5._accountDirectory.availableExtensions;
    }, function () {
      return _this5.profileImages;
    }, function () {
      return _this5.presences;
    }, function (extensions, profileImages, presences) {
      return (0, _ramda.reduce)(function (result, extension) {
        var id = "".concat(extension.id);
        var contact = {
          type: _this5.sourceName,
          id: id,
          firstName: extension.firstName,
          lastName: extension.lastName,
          emails: [extension.email],
          extensionNumber: extension.extensionNumber,
          hasProfileImage: !!extension.profileImage,
          phoneNumbers: [{
            phoneNumber: extension.extensionNumber,
            phoneType: _phoneTypes.default.extension
          }],
          profileImageUrl: profileImages[id] && profileImages[id].imageUrl,
          presence: presences[id] && presences[id].presence,
          contactStatus: extension.status
        };
        contact.name = extension.name ? extension.name : "".concat(contact.firstName || '', " ").concat(contact.lastName || '');

        if ((0, _isBlank.default)(contact.extensionNumber)) {
          return result;
        }

        if (extension.phoneNumbers && extension.phoneNumbers.length > 0) {
          extension.phoneNumbers.forEach(function (phone) {
            if (phone.type) {
              contact.phoneNumbers.push(_objectSpread({}, phone, {
                phoneType: _phoneTypes.default.direct
              }));
            }
          });
        }

        result.push(contact);
        return result;
      }, [], extensions);
    }];
  }
})), _class2)) || _class);
exports.default = AccountContacts;
//# sourceMappingURL=index.js.map
