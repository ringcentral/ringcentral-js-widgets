"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.function.name");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

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

var _dec, _class, _class2, _descriptor, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

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
    dep: 'CompanyContacts'
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
   * @param {CompanyContacts} params.companyContacts - companyContacts module instance
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
        companyContacts = _ref.companyContacts,
        _ref$ttl = _ref.ttl,
        ttl = _ref$ttl === void 0 ? DEFAULT_TTL : _ref$ttl,
        _ref$avatarTtl = _ref.avatarTtl,
        avatarTtl = _ref$avatarTtl === void 0 ? DEFAULT_AVATARTTL : _ref$avatarTtl,
        _ref$presenceTtl = _ref.presenceTtl,
        presenceTtl = _ref$presenceTtl === void 0 ? DEFAULT_PRESENCETTL : _ref$presenceTtl,
        _ref$avatarQueryInter = _ref.avatarQueryInterval,
        avatarQueryInterval = _ref$avatarQueryInter === void 0 ? DEFAULT_AVATARQUERYINTERVAL : _ref$avatarQueryInter,
        options = _objectWithoutProperties(_ref, ["client", "companyContacts", "ttl", "avatarTtl", "presenceTtl", "avatarQueryInterval"]);

    _classCallCheck(this, AccountContacts);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AccountContacts).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));

    _initializerDefineProperty(_this, "directoryContacts", _descriptor, _assertThisInitialized(_this));

    _this._client = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, client, 'client');
    _this._companyContacts = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, companyContacts, 'companyContacts');
    _this._ttl = ttl;
    _this._avatarTtl = avatarTtl;
    _this._presenceTtl = presenceTtl;
    _this._avatarQueryInterval = avatarQueryInterval;
    _this._reducer = (0, _getReducer["default"])(_this.actionTypes);
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
      return this._companyContacts.ready && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !this._companyContacts.ready && this.ready;
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
        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                useCache = _args.length > 1 && _args[1] !== undefined ? _args[1] : true;

                if (!(!contact || !contact.id || contact.type !== 'company' || !contact.hasProfileImage)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", null);

              case 3:
                imageId = contact.id;

                if (!(useCache && this.profileImages[imageId] && Date.now() - this.profileImages[imageId].timestamp < this._avatarTtl)) {
                  _context2.next = 7;
                  break;
                }

                image = this.profileImages[imageId].imageUrl;
                return _context2.abrupt("return", image);

              case 7:
                imageUrl = null;
                _context2.prev = 8;
                _context2.next = 11;
                return this._client.account(contact.account.id).extension(contact.id).profileImage('195x195').get();

              case 11:
                response = _context2.sent;
                _context2.t0 = URL;
                _context2.next = 15;
                return response._response.blob();

              case 15:
                _context2.t1 = _context2.sent;
                imageUrl = _context2.t0.createObjectURL.call(_context2.t0, _context2.t1);
                this.store.dispatch({
                  type: this.actionTypes.fetchImageSuccess,
                  imageId: imageId,
                  imageUrl: imageUrl,
                  ttl: this._avatarTtl
                });
                _context2.next = 23;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t2 = _context2["catch"](8);
                console.error(_context2.t2);

              case 23:
                return _context2.abrupt("return", imageUrl);

              case 24:
              case "end":
                return _context2.stop();
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
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
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
                return _context3.stop();
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
      regeneratorRuntime.mark(function _callee4(contacts) {
        var _this4 = this;

        var presenceSet, accountExtensionMap, batchResponses;
        return regeneratorRuntime.wrap(function _callee4$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                presenceSet = {};
                _context5.prev = 1;
                accountExtensionMap = (0, _ramda.reduce)(function (acc, item) {
                  if (!acc[item.account.id]) {
                    acc[item.account.id] = [];
                  }

                  acc[item.account.id].push(item.id);
                  return acc;
                }, {}, contacts);
                _context5.next = 5;
                return Promise.all((0, _ramda.map)(
                /*#__PURE__*/
                function () {
                  var _ref2 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3(accountId) {
                    var ids;
                    return regeneratorRuntime.wrap(function _callee3$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!(accountExtensionMap[accountId].length > 1)) {
                              _context4.next = 10;
                              break;
                            }

                            ids = (0, _ramda.join)(',', accountExtensionMap[accountId]); // extract json data now so the data appears in the same format
                            // as single requests

                            _context4.t0 = _ramda.map;

                            _context4.t1 = function (resp) {
                              return resp.json();
                            };

                            _context4.next = 6;
                            return (0, _batchApiHelper.batchGetApi)({
                              platform: _this4._client.service.platform(),
                              url: "/account/".concat(accountId, "/extension/").concat(ids, "/presence")
                            });

                          case 6:
                            _context4.t2 = _context4.sent;
                            return _context4.abrupt("return", (0, _context4.t0)(_context4.t1, _context4.t2));

                          case 10:
                            _context4.next = 12;
                            return _this4._client.account(accountId).extension(accountExtensionMap[accountId][0]).presence().get();

                          case 12:
                            _context4.t3 = _context4.sent;
                            return _context4.abrupt("return", [_context4.t3]);

                          case 14:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x4) {
                    return _ref2.apply(this, arguments);
                  };
                }(), (0, _ramda.keys)(accountExtensionMap)));

              case 5:
                batchResponses = _context5.sent;
                // treat all data as batch since the data is normalized
                (0, _ramda.forEach)(function (batch) {
                  return (0, _ramda.forEach)(function (data) {
                    if (data.errorCode) {
                      console.warn(data);
                      return;
                    }

                    presenceSet[data.extension.id] = data;
                  }, batch);
                }, batchResponses);
                _context5.next = 12;
                break;

              case 9:
                _context5.prev = 9;
                _context5.t0 = _context5["catch"](1);
                console.error(_context5.t0);

              case 12:
                return _context5.abrupt("return", presenceSet);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee4, null, [[1, 9]]);
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
    } // interface of contact source

  }, {
    key: "contacts",
    get: function get() {
      return this.directoryContacts;
    }
  }, {
    key: "sourceReady",
    get: function get() {
      return this.ready;
    }
  }]);

  return AccountContacts;
}(_RcModule2["default"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "getProfileImage", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getProfileImage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "getPresence", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "getPresence"), _class2.prototype), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "directoryContacts", [_selector.selector], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    var _this5 = this;

    return [function () {
      return _this5._companyContacts.filteredContacts;
    }, function () {
      return _this5.profileImages;
    }, function () {
      return _this5.presences;
    }, function (contacts, profileImages, presences) {
      return (0, _ramda.reduce)(function (result, item) {
        var id = "".concat(item.id);

        var contact = _objectSpread({}, item, {
          type: _this5.sourceName,
          id: id,
          emails: [item.email],
          extensionNumber: item.extensionNumber,
          hasProfileImage: !!item.profileImage,
          phoneNumbers: [{
            phoneNumber: item.extensionNumber,
            phoneType: _phoneTypes["default"].extension
          }],
          profileImageUrl: profileImages[id] && profileImages[id].imageUrl,
          presence: presences[id] && presences[id].presence,
          contactStatus: item.status
        });

        contact.name = item.name ? item.name : "".concat(contact.firstName || '', " ").concat(contact.lastName || '');

        if ((0, _isBlank["default"])(contact.extensionNumber)) {
          return result;
        }

        if (item.phoneNumbers && item.phoneNumbers.length > 0) {
          item.phoneNumbers.forEach(function (phone) {
            if (phone.type) {
              contact.phoneNumbers.push(_objectSpread({}, phone, {
                phoneType: _phoneTypes["default"].direct
              }));
            }
          });
        }

        result.push(contact);
        return result;
      }, [], contacts);
    }];
  }
})), _class2)) || _class);
exports["default"] = AccountContacts;
//# sourceMappingURL=index.js.map
