"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.find");
require("core-js/modules/es.object.get-own-property-descriptor");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvTabManager = void 0;
require("regenerator-runtime/runtime");
var _events = require("events");
var _di = require("@ringcentral-integration/commons/lib/di");
var _TabManager2 = require("@ringcentral-integration/commons/modules/TabManager");
var _core = require("@ringcentral-integration/core");
var _enums = require("../../enums");
var _dec, _class, _class2, _descriptor;
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
var EvTabManager = (_dec = (0, _di.Module)({
  name: 'TabManager',
  deps: ['GlobalStorage']
}), _dec(_class = (_class2 = /*#__PURE__*/function (_TabManager) {
  _inherits(EvTabManager, _TabManager);
  var _super = _createSuper(EvTabManager);
  function EvTabManager() {
    var _this;
    _classCallCheck(this, EvTabManager);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this._eventEmitter = new _events.EventEmitter();
    _initializerDefineProperty(_this, "mainTabId", _descriptor, _assertThisInitialized(_this));
    return _this;
  }
  _createClass(EvTabManager, [{
    key: "setMainTabId",
    value: function setMainTabId(id) {
      this.setMainTabIdInThisTab(id);
      // could not use Storage module because of DI circular dependency
      this._sendTabManager(_enums.tabManagerEvents.SET_MIAN_TAB_ID, id);
    }
  }, {
    key: "setMainTabIdInThisTab",
    value: function setMainTabIdInThisTab(id) {
      this.mainTabId = id;
    }
  }, {
    key: "_sendTabManager",
    value: function _sendTabManager(event, value) {
      this.send(event, value);
    }
  }, {
    key: "emitSetMainTabComplete",
    value: function emitSetMainTabComplete() {
      console.log('_emitSetMainTabComplete~');
      this._eventEmitter.emit(_enums.tabManagerEvents.SET_MAIN_TAB_COMPLETE);
    }
  }, {
    key: "onSetMainTabComplete",
    value: function onSetMainTabComplete(callback) {
      this._eventEmitter.on(_enums.tabManagerEvents.SET_MAIN_TAB_COMPLETE, callback);
    }
  }, {
    key: "checkIsMainTabAlive",
    value: function () {
      var _checkIsMainTabAlive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", !this.enable || this.mainTabId &&
                // check if tab exist by finding in storaged tabs
                this.checkTabAliveById(this.mainTabId));
              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function checkIsMainTabAlive() {
        return _checkIsMainTabAlive.apply(this, arguments);
      }
      return checkIsMainTabAlive;
    }()
  }, {
    key: "firstTabIdExcludeMainTab",
    get: function get() {
      var _this2 = this;
      return this.tabbie.actualTabIds.find(function (tab) {
        return tab !== _this2.mainTabId;
      }) || null;
    }
  }, {
    key: "isMainTab",
    get: function get() {
      return !this.enable || this.mainTabId === this.id;
    }
  }, {
    key: "prefix",
    get: function get() {
      return this.tabbie.prefix;
    }
  }]);
  return EvTabManager;
}(_TabManager2.TabManager), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mainTabId", [_core.globalStorage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "setMainTabIdInThisTab", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "setMainTabIdInThisTab"), _class2.prototype)), _class2)) || _class);
exports.EvTabManager = EvTabManager;
//# sourceMappingURL=EvTabManager.js.map
