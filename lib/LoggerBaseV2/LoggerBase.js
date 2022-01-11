"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoggerBase = void 0;

require("core-js/modules/es6.function.name");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.map");

var _core = require("@ringcentral-integration/core");

var _proxify = require("../proxy/proxify");

var _loggerBaseHelper = require("./loggerBaseHelper");

var _dec, _class, _descriptor;

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var LoggerBase = (_dec = (0, _core.computed)(function (that) {
  return [that.loggingList];
}), (_class = /*#__PURE__*/function (_RcModuleV) {
  _inherits(LoggerBase, _RcModuleV);

  var _super = _createSuper(LoggerBase);

  function LoggerBase(deps, options) {
    var _this;

    _classCallCheck(this, LoggerBase);

    _this = _super.call(this, _objectSpread({
      deps: deps
    }, options));
    _this._identityFunction = _loggerBaseHelper.defaultIdentityFunction;
    _this._logFunction = void 0;
    _this._readyCheckFunction = void 0;
    _this._logPromises = new Map();

    _initializerDefineProperty(_this, "loggingList", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(LoggerBase, [{
    key: "setLoggingList",
    value: function setLoggingList(id) {
      if (this.loggingList.indexOf(id) === -1) {
        this.loggingList.push(id);
      }
    }
  }, {
    key: "filterLoggingListById",
    value: function filterLoggingListById(id) {
      this.loggingList = this.loggingList.filter(function (item) {
        return item !== id;
      });
    }
  }, {
    key: "resetLoggingList",
    value: function resetLoggingList() {
      this.loggingList = [];
    }
  }, {
    key: "_shouldInit",
    value: function _shouldInit() {
      return !!(_get(_getPrototypeOf(LoggerBase.prototype), "_shouldInit", this).call(this) && this._readyCheckFunction());
    }
  }, {
    key: "_shouldReset",
    value: function _shouldReset() {
      return !!(_get(_getPrototypeOf(LoggerBase.prototype), "_shouldReset", this).call(this) || this.ready && !this._readyCheckFunction());
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this.resetLoggingList();
    }
  }, {
    key: "_log",
    value: function () {
      var _log2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var item, options, id, promise;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                item = _ref.item, options = _objectWithoutProperties(_ref, ["item"]);

                if (this.ready) {
                  _context.next = 3;
                  break;
                }

                throw new Error("".concat(this.constructor.name, "._log: module is not ready."));

              case 3:
                if (item) {
                  _context.next = 5;
                  break;
                }

                throw new Error("".concat(this.constructor.name, "._log: options.item is undefined."));

              case 5:
                id = this._identityFunction(item); // wait for the previous log action to finish

                if (!this._logPromises.has(id)) {
                  _context.next = 9;
                  break;
                }

                _context.next = 9;
                return this._logPromises.get(id);

              case 9:
                _context.prev = 9;
                this.setLoggingList(id);
                promise = this._logFunction(_objectSpread({
                  item: item
                }, options));

                this._logPromises.set(id, promise);

                _context.next = 15;
                return promise;

              case 15:
                this._logPromises["delete"](id);

                this.filterLoggingListById(id);
                _context.next = 24;
                break;

              case 19:
                _context.prev = 19;
                _context.t0 = _context["catch"](9);

                this._logPromises["delete"](id);

                this.filterLoggingListById(id);
                throw _context.t0;

              case 24:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 19]]);
      }));

      function _log(_x) {
        return _log2.apply(this, arguments);
      }

      return _log;
    }()
  }, {
    key: "log",
    value: function () {
      var _log3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
        var item, options;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                item = _ref2.item, options = _objectWithoutProperties(_ref2, ["item"]);

                if (this.ready) {
                  _context2.next = 3;
                  break;
                }

                throw new Error("".concat(this.constructor.name, ".log: module is not ready."));

              case 3:
                if (item) {
                  _context2.next = 5;
                  break;
                }

                throw new Error("".concat(this.constructor.name, ".log: options.item is undefined."));

              case 5:
                _context2.next = 7;
                return this._log(_objectSpread({
                  item: item
                }, options));

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function log(_x2) {
        return _log3.apply(this, arguments);
      }

      return log;
    }()
  }, {
    key: "loggingMap",
    get: function get() {
      return (0, _loggerBaseHelper.convertListToMap)(this.loggingList);
    }
  }]);

  return LoggerBase;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "loggingList", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _applyDecoratedDescriptor(_class.prototype, "setLoggingList", [_core.action], Object.getOwnPropertyDescriptor(_class.prototype, "setLoggingList"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "filterLoggingListById", [_core.action], Object.getOwnPropertyDescriptor(_class.prototype, "filterLoggingListById"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resetLoggingList", [_core.action], Object.getOwnPropertyDescriptor(_class.prototype, "resetLoggingList"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_log", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class.prototype, "_log"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "log", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class.prototype, "log"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "loggingMap", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "loggingMap"), _class.prototype)), _class));
exports.LoggerBase = LoggerBase;
//# sourceMappingURL=LoggerBase.js.map
