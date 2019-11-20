"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

var _di = require("../../lib/di");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _sleep = _interopRequireDefault(require("../../lib/sleep"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _batchApiHelper = require("../../lib/batchApiHelper");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _ensureExist = _interopRequireDefault(require("../../lib/ensureExist"));

var _actionTypes = _interopRequireDefault(require("./actionTypes"));

var _getReducer = _interopRequireWildcard(require("./getReducer"));

var _dec, _class, _class2;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var MaximumBatchGetPersons = 30;
var DEFAULT_BATCH_FETCH_DELAY = 500;
var GlipPersons = (_dec = (0, _di.Module)({
  deps: ['Client', 'Auth', 'RolesAndPermissions', {
    dep: 'Storage',
    optional: true
  }, {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'GlipPersonsOptions',
    optional: true
  }]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_RcModule) {
  _inherits(GlipPersons, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {Client} params.client - client module instance
   * @param {Auth} params.auth - auth module instance
   * @param {RolesAndPermissions} params.rolesAndPermissions - rolesAndPermission module instance
   * @param {Storage} params.storage - storage module instance
   * @param {TabManager} params.tabManager - tabManager module instance
   */
  function GlipPersons(_ref) {
    var _context;

    var _this;

    var client = _ref.client,
        auth = _ref.auth,
        storage = _ref.storage,
        tabManager = _ref.tabManager,
        rolesAndPermissions = _ref.rolesAndPermissions,
        _ref$batchFetchDelay = _ref.batchFetchDelay,
        batchFetchDelay = _ref$batchFetchDelay === void 0 ? DEFAULT_BATCH_FETCH_DELAY : _ref$batchFetchDelay,
        options = _objectWithoutProperties(_ref, ["client", "auth", "storage", "tabManager", "rolesAndPermissions", "batchFetchDelay"]);

    _classCallCheck(this, GlipPersons);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GlipPersons).call(this, _objectSpread({}, options, {
      actionTypes: _actionTypes["default"]
    })));
    _this._rolesAndPermissions = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, rolesAndPermissions, 'rolesAndPermissions');
    _this._client = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, client, 'client');
    _this._auth = (_context = _assertThisInitialized(_this), _ensureExist["default"]).call(_context, auth, 'auth');
    _this._tabManager = tabManager;
    _this._storage = storage;
    _this._fetchingIds = {};
    _this._batchFetchDelay = batchFetchDelay;
    _this._dataStorageKey = 'glipPersonsData';

    if (_this._storage) {
      _this._reducer = (0, _getReducer["default"])(_this.actionTypes);

      _this._storage.registerReducer({
        key: _this._dataStorageKey,
        reducer: (0, _getReducer.getGlipPersonStoreReducer)(_this.actionTypes)
      });
    } else {
      _this._reducer = (0, _getReducer["default"])(_this.actionTypes, {
        glipPersonStore: (0, _getReducer.getGlipPersonStoreReducer)(_this.actionTypes)
      });
    }

    return _this;
  }

  _createClass(GlipPersons, [{
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
      return regeneratorRuntime.async(function _onStateChange$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!this._shouldInit()) {
                _context2.next = 10;
                break;
              }

              this.store.dispatch({
                type: this.actionTypes.init
              });

              if (this._auth.isFreshLogin) {
                this.store.dispatch({
                  type: this.actionTypes.cleanUp
                });
              }

              if (this._hasPermission) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt("return");

            case 5:
              _context2.next = 7;
              return regeneratorRuntime.awrap(this.loadMe());

            case 7:
              this.store.dispatch({
                type: this.actionTypes.initSuccess
              });
              _context2.next = 11;
              break;

            case 10:
              if (this._shouldReset()) {
                this.store.dispatch({
                  type: this.actionTypes.resetSuccess
                });
              }

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._auth.loggedIn && this._rolesAndPermissions.ready && (!this._storage || this._storage.ready) && (!this._tabManager || this._tabManager.ready) && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (this._storage && !this._storage.ready || this._tabManager && !this._tabManager.ready || !this._rolesAndPermissions.ready || !this._auth.loggedIn) && this.ready;
    }
  }, {
    key: "loadMe",
    value: function loadMe() {
      return regeneratorRuntime.async(function loadMe$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.loadPerson(this._auth.ownerId));

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "loadPerson",
    value: function loadPerson(id) {
      var person;
      return regeneratorRuntime.async(function loadPerson$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              this.store.dispatch({
                type: this.actionTypes.fetch
              });
              _context4.next = 4;
              return regeneratorRuntime.awrap(this._client.glip().persons(id).get());

            case 4:
              person = _context4.sent;
              this.store.dispatch({
                type: this.actionTypes.fetchSuccess,
                person: person
              });
              _context4.next = 11;
              break;

            case 8:
              _context4.prev = 8;
              _context4.t0 = _context4["catch"](0);
              this.store.dispatch({
                type: this.actionTypes.fetchError
              });

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, [[0, 8]]);
    }
  }, {
    key: "loadPersons",
    value: function loadPersons(personIds) {
      var _this3 = this;

      var ownerId, newPersonIds, ids, persons, lastIds;
      return regeneratorRuntime.async(function loadPersons$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (this._auth.loggedIn) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return");

            case 2:
              if (personIds) {
                _context5.next = 4;
                break;
              }

              return _context5.abrupt("return");

            case 4:
              ownerId = this._auth.ownerId;
              newPersonIds = [];
              personIds.forEach(function (id) {
                if (!_this3.personsMap[id] && !_this3._fetchingIds[id]) {
                  newPersonIds.push(id);
                }
              });

              if (!(newPersonIds.length === 0)) {
                _context5.next = 9;
                break;
              }

              return _context5.abrupt("return");

            case 9:
              ids = newPersonIds.slice(0, MaximumBatchGetPersons);
              ids.forEach(function (id) {
                _this3._fetchingIds[id] = 1;
              });
              _context5.prev = 11;
              this.store.dispatch({
                type: this.actionTypes.fetch
              });
              _context5.next = 15;
              return regeneratorRuntime.awrap(this._batchGetPersons(ids));

            case 15:
              persons = _context5.sent;
              this.store.dispatch({
                type: this.actionTypes.batchFetchSuccess,
                persons: persons
              });
              ids.forEach(function (id) {
                delete _this3._fetchingIds[id];
              });
              _context5.next = 24;
              break;

            case 20:
              _context5.prev = 20;
              _context5.t0 = _context5["catch"](11);
              this.store.dispatch({
                type: this.actionTypes.fetchError
              });
              ids.forEach(function (id) {
                delete _this3._fetchingIds[id];
              });

            case 24:
              if (!(ownerId !== this._auth.ownerId)) {
                _context5.next = 26;
                break;
              }

              return _context5.abrupt("return");

            case 26:
              lastIds = newPersonIds.slice(MaximumBatchGetPersons);

              if (!(lastIds.length > 0)) {
                _context5.next = 32;
                break;
              }

              _context5.next = 30;
              return regeneratorRuntime.awrap((0, _sleep["default"])(this._batchFetchDelay));

            case 30:
              _context5.next = 32;
              return regeneratorRuntime.awrap(this.loadPersons(lastIds));

            case 32:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, [[11, 20]]);
    }
  }, {
    key: "_batchGetPersons",
    value: function _batchGetPersons(personIds) {
      var response, ids, multipartResponse, responses;
      return regeneratorRuntime.async(function _batchGetPersons$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(!personIds || personIds.length === 0)) {
                _context6.next = 2;
                break;
              }

              return _context6.abrupt("return", []);

            case 2:
              if (!(personIds.length === 1)) {
                _context6.next = 7;
                break;
              }

              _context6.next = 5;
              return regeneratorRuntime.awrap(this._client.glip().persons(personIds[0]).get());

            case 5:
              response = _context6.sent;
              return _context6.abrupt("return", [response]);

            case 7:
              ids = personIds.join(',');
              _context6.next = 10;
              return regeneratorRuntime.awrap((0, _batchApiHelper.batchGetApi)({
                platform: this._client.service.platform(),
                url: "/glip/persons/".concat(ids)
              }));

            case 10:
              multipartResponse = _context6.sent;
              responses = multipartResponse.filter(function (r) {
                return r.ok();
              }).map(function (x) {
                return x.json();
              });
              return _context6.abrupt("return", responses);

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      return _actionTypes["default"];
    }
  }, {
    key: "personsMap",
    get: function get() {
      if (this._storage) {
        return this._storage.getItem(this._dataStorageKey) || {};
      }

      return this.state.glipPersonStore;
    }
  }, {
    key: "status",
    get: function get() {
      return this.state.status;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.status === _moduleStatuses["default"].ready;
    }
  }, {
    key: "me",
    get: function get() {
      return this.personsMap[this._auth.ownerId];
    }
  }, {
    key: "_hasPermission",
    get: function get() {
      return this._rolesAndPermissions.hasGlipPermission;
    }
  }]);

  return GlipPersons;
}(_RcModule2["default"]), (_applyDecoratedDescriptor(_class2.prototype, "loadMe", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadMe"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadPerson", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadPerson"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadPersons", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "loadPersons"), _class2.prototype)), _class2)) || _class);
exports["default"] = GlipPersons;
//# sourceMappingURL=index.js.map
