"use strict";

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

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Storage = void 0;

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _di = require("../../lib/di");

var _StorageBaseV = require("../../lib/StorageBaseV2");

var _loginStatus = _interopRequireDefault(require("../Auth/loginStatus"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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
}), _dec(_class = /*#__PURE__*/function (_StorageBase) {
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
    _this.storedData = {};
    _this._disableInactiveTabsWrite = (_this$_deps$storageOp = (_this$_deps$storageOp2 = _this._deps.storageOptions) === null || _this$_deps$storageOp2 === void 0 ? void 0 : _this$_deps$storageOp2.disableInactiveTabsWrite) !== null && _this$_deps$storageOp !== void 0 ? _this$_deps$storageOp : true;
    return _this;
  }

  _createClass(Storage, [{
    key: "onStateChange",
    value: function onStateChange() {
      if (this.ready && this.storageWritable) {
        var currentData = this.data; // save new data to storage when changed

        for (var key in currentData) {
          if (this.storedData[key] !== currentData[key]) {
            this._storage.setItem(key, currentData[key]);

            this.storedData[key] = currentData[key];
          }
        }
      }
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var newKey, oldKey, index, _this$storedData$newK, key, currentData, _key;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._storage = new this._StorageProvider({
                  storageKey: this.storageKey
                });
                _context.next = 3;
                return this._storage.getData();

              case 3:
                this.storedData = _context.sent;

                /* migration storage v1 to v2 */

                /* eslint-disable */
                for (newKey in this.migrationMapping) {
                  oldKey = this.migrationMapping[newKey];

                  if (typeof oldKey === 'string') {
                    if (this.storedData[oldKey]) {
                      this.storedData[newKey] = this.storedData[oldKey];
                    }
                  } else if (_typeof(oldKey) === 'object') {
                    for (index in oldKey) {
                      if (this.storedData[oldKey[index]]) {
                        this.storedData[newKey] = (_this$storedData$newK = this.storedData[newKey]) !== null && _this$storedData$newK !== void 0 ? _this$storedData$newK : {};
                        this.storedData[newKey][index] = this.storedData[oldKey[index]];
                      }
                    }
                  }

                  if (typeof this.storedData[newKey] !== 'undefined' && this.storageWritable) {
                    this._storage.setItem(newKey, this.storedData[newKey]);
                  }
                }
                /* eslint-enable */

                /* migration storage v1 to v2 */


                _context.t0 = regeneratorRuntime.keys(this.storedData);

              case 6:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 14;
                  break;
                }

                key = _context.t1.value;

                if (this._storageReducers[key]) {
                  _context.next = 12;
                  break;
                }

                delete this.storedData[key];
                _context.next = 12;
                return this._storage.removeItem(key);

              case 12:
                _context.next = 6;
                break;

              case 14:
                this.setData(_objectSpread(_objectSpread({}, this.data), this.storedData));
                currentData = this.data;

                for (_key in currentData) {
                  if (!Object.prototype.hasOwnProperty.call(this.storedData, _key) && this.storageWritable) {
                    this._storage.setItem(_key, currentData[_key]);
                  }
                }

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function onInit() {
        return _onInit.apply(this, arguments);
      }

      return onInit;
    }()
  }, {
    key: "onInitSuccess",
    value: function onInitSuccess() {
      var _this2 = this;

      this._storageHandler = function (_ref) {
        var key = _ref.key,
            value = _ref.value;

        if (_this2.ready) {
          _this2.storedData[key] = value;

          _this2.syncData(key, value);
        }
      };

      this._storage.on('storage', this._storageHandler);
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.auth.loginStatus === _loginStatus["default"].loggedIn && (!this._deps.tabManager || this._deps.tabManager.ready) && this.pending;
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return (!!this._deps.tabManager && !this._deps.tabManager.ready || this._deps.auth.notLoggedIn) && this.ready;
    }
  }, {
    key: "onReset",
    value: function onReset() {
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

      this.resetData();
    }
  }, {
    key: "storageWritable",
    get: function get() {
      return !this._disableInactiveTabsWrite || !this._deps.tabManager || this._deps.tabManager.active;
    }
  }, {
    key: "storageKey",
    get: function get() {
      return "".concat(this.prefix ? "".concat(this.prefix, "-") : '', "storage-").concat(this._deps.auth.ownerId);
    }
  }]);

  return Storage;
}(_StorageBaseV.StorageBase)) || _class);
exports.Storage = Storage;
//# sourceMappingURL=Storage.js.map
