"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GlobalStorage = void 0;

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

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _di = require("../../lib/di");

var _StorageBaseV = require("../../lib/StorageBaseV2");

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var GlobalStorage = (_dec = (0, _di.Module)({
  name: 'GlobalStorage',
  deps: [{
    dep: 'GlobalStorageOptions',
    optional: true
  }]
}), _dec(_class = (_temp = /*#__PURE__*/function (_StorageBase) {
  _inherits(GlobalStorage, _StorageBase);

  var _super = _createSuper(GlobalStorage);

  function GlobalStorage(deps) {
    var _deps$globalStorageOp;

    var _this;

    _classCallCheck(this, GlobalStorage);

    _this = _super.call(this, deps, {
      name: 'globalStorage',
      StorageProvider: (_deps$globalStorageOp = deps.globalStorageOptions) === null || _deps$globalStorageOp === void 0 ? void 0 : _deps$globalStorageOp.StorageProvider
    });
    _this._storage = void 0;
    _this._storageHandler = null;
    return _this;
  } // overridden RcModuleV2 `initModule`


  _createClass(GlobalStorage, [{
    key: "initModule",
    value: function () {
      var _initModule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var storedData, storageKey, key;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                storedData = null;
                storageKey = "".concat(this.prefix ? "".concat(this.prefix, "-") : '', "GlobalStorage");
                this._storage = new this._StorageProvider({
                  storageKey: storageKey
                });
                _context.next = 5;
                return this._storage.getData();

              case 5:
                storedData = _context.sent;
                _context.t0 = regeneratorRuntime.keys(storedData);

              case 7:
                if ((_context.t1 = _context.t0()).done) {
                  _context.next = 15;
                  break;
                }

                key = _context.t1.value;

                if (this._storageReducers[key]) {
                  _context.next = 13;
                  break;
                }

                delete storedData[key];
                _context.next = 13;
                return this._storage.removeItem(key);

              case 13:
                _context.next = 7;
                break;

              case 15:
                this.store.dispatch({
                  type: this._storageActionTypes.initSuccess,
                  data: storedData
                });

                this._storageHandler = function (_ref) {
                  var key = _ref.key,
                      value = _ref.value;

                  if (_this2.ready) {
                    storedData[key] = value;

                    _this2.store.dispatch({
                      type: _this2._storageActionTypes.sync,
                      key: key,
                      value: value
                    });
                  }
                };

                this._storage.on('storage', this._storageHandler);

                this.store.subscribe(function () {
                  if (_this2.status !== _moduleStatuses["default"].pending) {
                    // save new data to storage when changed
                    var currentData = _this2.data;

                    for (var _key in currentData) {
                      if (storedData[_key] !== currentData[_key]) {
                        _this2._storage.setItem(_key, currentData[_key]);

                        storedData[_key] = currentData[_key];
                      }
                    }
                  }
                });

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function initModule() {
        return _initModule.apply(this, arguments);
      }

      return initModule;
    }()
  }]);

  return GlobalStorage;
}(_StorageBaseV.StorageBase), _temp)) || _class);
exports.GlobalStorage = GlobalStorage;
//# sourceMappingURL=GlobalStorage.js.map
