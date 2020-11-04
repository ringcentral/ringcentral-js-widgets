"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataFetcherV2 = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.from");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.date.now");

require("core-js/modules/es6.map");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.set");

var _core = require("@ringcentral-integration/core");

var _ramda = require("ramda");

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _sourceStatus = require("./sourceStatus");

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var DataFetcherV2 = (_dec = (0, _di.Module)({
  name: 'DataFetcherV2',
  deps: ['Auth', 'Storage', 'SleepDetector', {
    dep: 'TabManager',
    optional: true
  }, {
    dep: 'DataFetcherV2Options',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(DataFetcherV2, _RcModuleV);

  var _super = _createSuper(DataFetcherV2);

  function DataFetcherV2(deps) {
    var _this;

    _classCallCheck(this, DataFetcherV2);

    _this = _super.call(this, {
      storageKey: 'dataFetcherV2',
      enableCache: true,
      deps: deps
    });
    _this._sources = new Set();
    _this._timeoutIds = new Map();
    _this._promises = new Map();

    _initializerDefineProperty(_this, "sourceStatus", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "storageData", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "data", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "timestamps", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "isFetching", _descriptor5, _assertThisInitialized(_this));

    _this._deps.sleepDetector.on(_this._deps.sleepDetector.events.detected, function () {
      return _this._handleSleepDetected();
    });

    return _this;
  }

  _createClass(DataFetcherV2, [{
    key: "_shouldInit",
    value: function _shouldInit() {
      return this._deps.auth.loggedIn && _get(_getPrototypeOf(DataFetcherV2.prototype), "_shouldInit", this).call(this);
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(DataFetcherV2.prototype), "_shouldReset", this).call(this) || this.ready && !this._deps.auth.loggedIn);
    }
  }, {
    key: "_setFetching",
    value: function _setFetching(source, isFetching) {
      this.isFetching[source.key] = isFetching;
    }
  }, {
    key: "getFetching",
    value: function getFetching(source) {
      return !!this.isFetching[source.key];
    }
  }, {
    key: "_setData",
    value: function _setData(source, data) {
      var timestamp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Date.now();

      if (source.disableCache) {
        this.data[source.key] = data;
        this.timestamps[source.key] = timestamp;
      } else {
        this.storageData.cachedData[source.key] = data;
        this.storageData.cachedTimestamps[source.key] = timestamp;
      }
    }
  }, {
    key: "updateData",
    value: function updateData(source, data, timestamp) {
      this._setData(source, data, timestamp);
    }
  }, {
    key: "_fetchData",
    value: function () {
      var _fetchData2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(source) {
        var ownerId, data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._setFetching(source, true);

                ownerId = this._deps.auth.ownerId;
                _context.prev = 2;
                _context.next = 5;
                return source.fetchFunction();

              case 5:
                data = _context.sent;

                if (this._deps.auth.ownerId === ownerId) {
                  this._setData(source, data, Date.now());

                  this._setFetching(source, false);

                  if (source.polling) {
                    this._startPolling(source);
                  }

                  this._promises["delete"](source.key);
                }

                _context.next = 16;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);

                if (!(this._deps.auth.ownerId === ownerId)) {
                  _context.next = 16;
                  break;
                }

                this._promises["delete"](source.key);

                this._setFetching(source, false);

                if (source.polling) {
                  this._startPolling(source, source.timeToRetry);
                } else {
                  this._retry(source);
                }

                throw _context.t0;

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function _fetchData(_x) {
        return _fetchData2.apply(this, arguments);
      }

      return _fetchData;
    }()
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout(source) {
      if (this._timeoutIds.has(source.key)) {
        clearTimeout(this._timeoutIds.get(source.key));

        this._timeoutIds["delete"](source.key);
      }
    }
  }, {
    key: "_startPolling",
    value: function _startPolling(source) {
      var _this2 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getTimestamp(source) + source.pollingInterval + 10 - Date.now();

      this._clearTimeout(source);

      this._timeoutIds.set(source.key, setTimeout(function () {
        _this2._timeoutIds["delete"](source.key);

        if (_this2.ready && _this2._checkIsActiveTab(source) && source.readyCheckFunction() && source.permissionCheckFunction()) {
          if (_this2._expired(source)) {
            _this2.fetchData(source);
          } else {
            _this2._startPolling(source);
          }
        } else if (!_this2._expired(source)) {
          _this2._startPolling(source);
        } else {
          _this2._startPolling(source, source.timeToRetry);
        }
      }, t));
    }
  }, {
    key: "_retry",
    value: function _retry(source) {
      var _this3 = this;

      var t = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : source.timeToRetry;

      this._clearTimeout(source);

      this._timeoutIds.set(source.key, setTimeout(function () {
        if (_this3._expired(source)) {
          if (_this3.ready && _this3._checkIsActiveTab(source) && source.readyCheckFunction() && source.permissionCheckFunction()) {
            _this3.fetchData(source);
          } else {
            _this3._retry(source);
          }
        }
      }, t));
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(source) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._promises.get(source.key)) {
                  this._promises.set(source.key, this._fetchData(source));
                }

                return _context2.abrupt("return", this._promises.get(source.key));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function fetchData(_x2) {
        return _fetchData3.apply(this, arguments);
      }

      return fetchData;
    }()
  }, {
    key: "getTimestamp",
    value: function getTimestamp(source) {
      if (source.disableCache) {
        return this.timestamps[source.key] || null;
      }

      return this.cachedTimestamps[source.key] || null;
    }
  }, {
    key: "_expired",
    value: function _expired(source) {
      return Date.now() - this.getTimestamp(source) > source.ttl;
    }
  }, {
    key: "_shouldFetch",
    value: function _shouldFetch(source) {
      var isFreshLogin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return this._checkIsActiveTab(source) && (isFreshLogin || this._expired(source));
    }
  }, {
    key: "_checkIsActiveTab",
    value: function _checkIsActiveTab(source) {
      // if cache is disabled, then each tab should fetch its own data
      // therefore tabManager should be ignored
      return source.disableCache || !this._deps.tabManager || this._deps.tabManager.active;
    }
  }, {
    key: "_tryInitializeSource",
    value: function () {
      var _tryInitializeSource2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(source) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.getSourceStatus(source) === _sourceStatus.sourceStatus.pending)) {
                  _context3.next = 15;
                  break;
                }

                this._setSourceStatus(source, _sourceStatus.sourceStatus.initializing);

                if (!this._shouldFetch(source)) {
                  _context3.next = 13;
                  break;
                }

                _context3.prev = 3;
                _context3.next = 6;
                return this.fetchData(source);

              case 6:
                _context3.next = 11;
                break;

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](3);

                this._retry(source);

              case 11:
                _context3.next = 14;
                break;

              case 13:
                if (source.polling) {
                  this._startPolling(source);
                } else {
                  this._retry(source);
                }

              case 14:
                return _context3.abrupt("return");

              case 15:
                if (this.getData(source) !== null && this.getTimestamp(source) !== null) {
                  this._setSourceStatus(source, _sourceStatus.sourceStatus.ready);
                }

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[3, 8]]);
      }));

      function _tryInitializeSource(_x3) {
        return _tryInitializeSource2.apply(this, arguments);
      }

      return _tryInitializeSource;
    }()
  }, {
    key: "_setSourceStatus",
    value: function _setSourceStatus(source, status) {
      this.sourceStatus[source.key] = status;
    }
  }, {
    key: "getSourceStatus",
    value: function getSourceStatus(source) {
      return this.sourceStatus[source.key];
    }
  }, {
    key: "_processSources",
    value: function _processSources() {
      var _this4 = this;

      if (this.ready) {
        (0, _ramda.forEach)(function (source) {
          if (!_this4.getSourceStatus(source)) {
            _this4._setSourceStatus(source, _sourceStatus.sourceStatus.pending);
          }

          var status = _this4.getSourceStatus(source);

          var readyCheck = _this4.ready && source.readyCheckFunction();
          var permissionCheck = readyCheck && source.permissionCheckFunction();

          if (readyCheck) {
            if (status === _sourceStatus.sourceStatus.pending || status === _sourceStatus.sourceStatus.initializing) {
              // if user has no permission to fetch data, bypass the initialization process
              if (!permissionCheck) {
                _this4._setSourceStatus(source, _sourceStatus.sourceStatus.ready);

                _this4._setData(source, null, 0);
              } else {
                _this4._tryInitializeSource(source);
              }
            } else if (status === _sourceStatus.sourceStatus.ready) {
              if (!permissionCheck && _this4.getData(source) !== null && _this4.getTimestamp(source) !== null) {
                // no permission but has data, set data to null
                // use 0 for timestamp so we know this is on purpose
                _this4._setData(source, null, 0);
              } else if (permissionCheck && _this4.getData(source) === null && _this4.getTimestamp(source) === 0 && !_this4._promises.get(source.key)) {
                // if the data set to null due to permission before
                // but now there is permission, then fetch data
                _this4.fetchData(source);
              }
            }
          } else if (status === _sourceStatus.sourceStatus.ready) {
            _this4._setSourceStatus(source, _sourceStatus.sourceStatus.pending);

            if (source.cleanOnReset) {
              _this4._setData(source, null, null);
            }
          }
        }, Array.from(this._sources));
      }
    }
  }, {
    key: "_handleSleepDetected",
    value: function _handleSleepDetected() {
      var _this5 = this;

      (0, _ramda.forEach)(function (source) {
        if (_this5.ready && _this5._shouldFetch(source)) {
          _this5.fetchData(source);
        }
      }, Array.from(this._sources));
    }
  }, {
    key: "_getRegisteredKeys",
    value: function _getRegisteredKeys() {
      var keys = new Set();

      this._sources.forEach(function (source) {
        keys.add(source.key);
      });

      return keys;
    }
  }, {
    key: "_getInvalidCachedKeys",
    value: function _getInvalidCachedKeys() {
      var registeredKeys = this._getRegisteredKeys();

      var keys = new Set();

      for (var k in this.cachedData) {
        if (Object.prototype.hasOwnProperty.call(this.cachedData, k) && !registeredKeys.has(k)) {
          keys.add(k);
        }
      }

      for (var _k in this.cachedTimestamps) {
        if (Object.prototype.hasOwnProperty.call(this.cachedTimestamps, _k) && !registeredKeys.has(_k)) {
          keys.add(_k);
        }
      }

      return keys;
    }
  }, {
    key: "_deleteKeys",
    value: function _deleteKeys(keys) {
      var _this6 = this;

      keys.forEach(function (k) {
        delete _this6.cachedData[k];
        delete _this6.cachedTimestamps[k];
      });
    }
  }, {
    key: "_cleanCache",
    value: function _cleanCache() {
      this._deleteKeys(this._getInvalidCachedKeys());
    }
  }, {
    key: "onInit",
    value: function onInit() {
      // clean up cached sources that are no longer exist
      this._cleanCache();
    }
  }, {
    key: "onReset",
    value: function onReset() {
      var _this7 = this;

      (0, _ramda.forEach)(function (source) {
        // clear all pollings or retries
        _this7._clearTimeout(source); // clear all pending requests


        _this7._promises["delete"](source.key); // reset isFetching


        _this7._setFetching(source, false);

        if (_this7.getSourceStatus(source) !== _sourceStatus.sourceStatus.pending) {
          _this7._setSourceStatus(source, _sourceStatus.sourceStatus.pending);
        }

        if (source.cleanOnReset && _this7.getData(source) !== null && _this7.getTimestamp(source) !== null) {
          _this7._setData(source, null, null);
        }
      }, Array.from(this._sources));
    }
  }, {
    key: "onStateChange",
    value: function onStateChange() {
      this._processSources();
    }
  }, {
    key: "register",
    value: function register(source) {
      this._sources.add(source);
    }
  }, {
    key: "getData",
    value: function getData(source) {
      if (this._sources.has(source)) {
        if (source.disableCache) {
          return this.data[source.key] || null;
        }

        return this.cachedData[source.key] || null;
      }

      return null;
    }
  }, {
    key: "cachedData",
    get: function get() {
      return this.storageData.cachedData;
    }
  }, {
    key: "cachedTimestamps",
    get: function get() {
      return this.storageData.cachedTimestamps;
    }
  }, {
    key: "sources",
    get: function get() {
      return this._sources;
    }
  }]);

  return DataFetcherV2;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sourceStatus", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "storageData", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      cachedData: {},
      cachedTimestamps: {}
    };
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "data", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "timestamps", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "isFetching", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {};
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setFetching", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setFetching"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setData", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_fetchData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "_fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fetchData", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "fetchData"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_setSourceStatus", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setSourceStatus"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_deleteKeys", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_deleteKeys"), _class2.prototype)), _class2)) || _class);
exports.DataFetcherV2 = DataFetcherV2;
//# sourceMappingURL=DataFetcherV2.js.map
