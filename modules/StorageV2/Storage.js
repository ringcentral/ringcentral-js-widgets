"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Storage = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _di = require("../../lib/di");

var _StorageBaseV = require("../../lib/StorageBaseV2");

var _loginStatus = _interopRequireDefault(require("../Auth/loginStatus"));

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Storage = (_dec = (0, _di.Module)({
  name: 'Storage',
  deps: ['Auth', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'StorageOptions',
    optional: true
  }]
}), _dec(_class = (_temp = /*#__PURE__*/function (_StorageBase) {
  _inherits(Storage, _StorageBase);

  var _super = _createSuper(Storage);

  /* migration storage v1 to v2 */

  /* migration storage v1 to v2 */
  function Storage(deps) {
    var _deps$storageOptions, _this$_deps$storageOp, _this$_deps$storageOp2;

    var _this;

    _classCallCheck(this, Storage);

    _this = _super.call(this, deps, {
      name: 'storage',
      StorageProvider: (_deps$storageOptions = deps.storageOptions) === null || _deps$storageOptions === void 0 ? void 0 : _deps$storageOptions.StorageProvider
    });
    _this.migrationMapping = {};
    _this._disableInactiveTabsWrite = void 0;
    _this._storage = void 0;
    _this._storageHandler = null;
    _this._disableInactiveTabsWrite = (_this$_deps$storageOp = (_this$_deps$storageOp2 = _this._deps.storageOptions) === null || _this$_deps$storageOp2 === void 0 ? void 0 : _this$_deps$storageOp2.disableInactiveTabsWrite) !== null && _this$_deps$storageOp !== void 0 ? _this$_deps$storageOp : true;
    return _this;
  } // overridden RcModuleV2 `initModule`


  _createClass(Storage, [{
    key: "initModule",
    value: function () {
      var _initModule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var storedData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                storedData = null;
                this.store.subscribe( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  var storageKey, newKey, oldKey, index, _storedData$newKey, key, currentData, _key;

                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!(_this2._deps.auth.loginStatus === _loginStatus["default"].loggedIn && (!_this2._deps.tabManager || _this2._deps.tabManager.ready) && _this2.pending)) {
                            _context.next = 22;
                            break;
                          }

                          _this2.store.dispatch({
                            type: _this2._storageActionTypes.init
                          });

                          storageKey = "".concat(_this2.prefix ? "".concat(_this2.prefix, "-") : '', "storage-").concat(_this2._deps.auth.ownerId);
                          _this2._storage = new _this2._StorageProvider({
                            storageKey: storageKey
                          });
                          _context.next = 6;
                          return _this2._storage.getData();

                        case 6:
                          storedData = _context.sent;

                          /* migration storage v1 to v2 */

                          /* eslint-disable */
                          for (newKey in _this2.migrationMapping) {
                            oldKey = _this2.migrationMapping[newKey];

                            if (typeof oldKey === 'string') {
                              if (storedData[oldKey]) {
                                storedData[newKey] = storedData[oldKey];
                              }
                            } else if (_typeof(oldKey) === 'object') {
                              for (index in oldKey) {
                                if (storedData[oldKey[index]]) {
                                  storedData[newKey] = (_storedData$newKey = storedData[newKey]) !== null && _storedData$newKey !== void 0 ? _storedData$newKey : {};
                                  storedData[newKey][index] = storedData[oldKey[index]];
                                }
                              }
                            }

                            _this2._storage.setItem(newKey, storedData[newKey]);
                          }
                          /* eslint-enable */

                          /* migration storage v1 to v2 */


                          _context.t0 = regeneratorRuntime.keys(storedData);

                        case 9:
                          if ((_context.t1 = _context.t0()).done) {
                            _context.next = 17;
                            break;
                          }

                          key = _context.t1.value;

                          if (_this2._storageReducers[key]) {
                            _context.next = 15;
                            break;
                          }

                          delete storedData[key];
                          _context.next = 15;
                          return _this2._storage.removeItem(key);

                        case 15:
                          _context.next = 9;
                          break;

                        case 17:
                          _this2.store.dispatch({
                            type: _this2._storageActionTypes.initSuccess,
                            // storageKey,
                            // To fix same reference in redux store with storedData
                            data: _objectSpread({}, storedData)
                          });

                          _this2._storageHandler = function (_ref2) {
                            var key = _ref2.key,
                                value = _ref2.value;

                            if (_this2.ready) {
                              storedData[key] = value;

                              _this2.store.dispatch({
                                type: _this2._storageActionTypes.sync,
                                key: key,
                                value: value
                              });
                            }
                          };

                          _this2._storage.on('storage', _this2._storageHandler);

                          _context.next = 23;
                          break;

                        case 22:
                          if ((!!_this2._deps.tabManager && !_this2._deps.tabManager.ready || _this2._deps.auth.notLoggedIn) && _this2.ready) {
                            _this2.resetStorage();
                          }

                        case 23:
                          if (_this2.status === _moduleStatuses["default"].ready && (!_this2._disableInactiveTabsWrite || !_this2._deps.tabManager || _this2._deps.tabManager.active)) {
                            // save new data to storage when changed
                            currentData = _this2.data;

                            for (_key in currentData) {
                              if (storedData[_key] !== currentData[_key]) {
                                _this2._storage.setItem(_key, currentData[_key]);

                                storedData[_key] = currentData[_key];
                              }
                            }
                          }

                        case 24:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function initModule() {
        return _initModule.apply(this, arguments);
      }

      return initModule;
    }()
  }, {
    key: "resetStorage",
    value: function resetStorage() {
      this.store.dispatch({
        type: this._storageActionTypes.reset
      });

      if (this._storageHandler) {
        if (this._storage.off) {
          this._storage.off('storage', this._storageHandler);
        } else if (this._storage.removeListener) {
          this._storage.removeListener('storage', this._storageHandler);
        }

        this._storageHandler = null;
      }

      if (this._storage) {
        this._storage.destroy();

        this._storage = null;
      }

      this.store.dispatch({
        type: this._storageActionTypes.resetSuccess
      });
    }
  }]);

  return Storage;
}(_StorageBaseV.StorageBase), _temp)) || _class);
exports.Storage = Storage;
//# sourceMappingURL=Storage.js.map
