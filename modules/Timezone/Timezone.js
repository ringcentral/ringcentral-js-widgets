"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.find");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timezone = void 0;
require("regenerator-runtime/runtime");
var _core = require("@ringcentral-integration/core");
var _di = require("../../lib/di");
var _proxify = require("../../lib/proxy/proxify");
var _dec, _dec2, _class, _class2, _descriptor, _descriptor2;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }
var CACHE_TTL = 60 * 60e3;
var Timezone = (_dec = (0, _di.Module)({
  name: 'Timezone',
  deps: ['Client', 'Storage', {
    dep: 'TimezoneOptions',
    optional: true
  }]
}), _dec2 = (0, _core.computed)(function (_ref) {
  var _localeTimezone = _ref._localeTimezone,
    timezones = _ref.timezones;
  return [_localeTimezone, timezones];
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Timezone, _RcModuleV);
  var _super = _createSuper(Timezone);
  function Timezone(deps) {
    var _this;
    _classCallCheck(this, Timezone);
    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'Timezone'
    });
    _this._localeTimezone = void 0;
    _initializerDefineProperty(_this, "timezones", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_this, "cacheExpiredIn", _descriptor2, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(Timezone, [{
    key: "_updateCacheExpiredIn",
    value: function _updateCacheExpiredIn() {
      this.cacheExpiredIn = new Date().getTime() + CACHE_TTL;
    }
  }, {
    key: "_updateTimezones",
    value: function _updateTimezones(timezones) {
      this.timezones = timezones;
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.shouldUpdateTimezones) {
                  _context.next = 4;
                  break;
                }
                _context.next = 3;
                return this._initTimezones();
              case 3:
                this.updateCacheExpiredIn();
              case 4:
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
    key: "_initTimezones",
    value: function () {
      var _initTimezones2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _yield$this$_deps$cli, _yield$this$_deps$cli2, records;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._deps.client.dictionary().timezone().list();
              case 2:
                _yield$this$_deps$cli = _context2.sent;
                _yield$this$_deps$cli2 = _yield$this$_deps$cli.records;
                records = _yield$this$_deps$cli2 === void 0 ? [] : _yield$this$_deps$cli2;
                this.updateTimezones(records);
              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function _initTimezones() {
        return _initTimezones2.apply(this, arguments);
      }
      return _initTimezones;
    }()
  }, {
    key: "updateTimezones",
    value: function () {
      var _updateTimezones2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(timezones) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._updateTimezones(timezones);
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function updateTimezones(_x) {
        return _updateTimezones2.apply(this, arguments);
      }
      return updateTimezones;
    }()
  }, {
    key: "updateCacheExpiredIn",
    value: function () {
      var _updateCacheExpiredIn2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this._updateCacheExpiredIn();
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function updateCacheExpiredIn() {
        return _updateCacheExpiredIn2.apply(this, arguments);
      }
      return updateCacheExpiredIn;
    }()
  }, {
    key: "localeTimezone",
    get: function get() {
      if (!this._localeTimezone) {
        var bias = String(-new Date().getTimezoneOffset());
        this._localeTimezone = this.timezones.find(function (timezone) {
          return timezone.bias === bias;
        });
      }
      return this._localeTimezone;
    }
  }, {
    key: "shouldUpdateTimezones",
    get: function get() {
      return !this.cacheExpiredIn || this.cacheExpiredIn < Date.now();
    }
  }]);
  return Timezone;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "timezones", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return [];
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "cacheExpiredIn", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateCacheExpiredIn", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateCacheExpiredIn"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateTimezones", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateTimezones"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_initTimezones", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "_initTimezones"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTimezones", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTimezones"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateCacheExpiredIn", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "updateCacheExpiredIn"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "localeTimezone", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "localeTimezone"), _class2.prototype)), _class2)) || _class);
exports.Timezone = Timezone;
//# sourceMappingURL=Timezone.js.map
