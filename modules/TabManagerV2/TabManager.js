"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabManager = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _Tabbie = require("../../lib/Tabbie");

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var TabManager = (_dec = (0, _di.Module)({
  name: 'TabManager',
  deps: ['Brand', {
    dep: 'TabManagerOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(TabManager, _RcModuleV);

  var _super = _createSuper(TabManager);

  function TabManager(deps) {
    var _this;

    _classCallCheck(this, TabManager);

    _this = _super.call(this, {
      deps: deps
    });
    _this._tabbie = null;

    _initializerDefineProperty(_this, "active", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "event", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }
  /**
   * Default to true. If tabbie cannot be enabled due to env, the runtime
   * should assume active.
   */


  _createClass(TabManager, [{
    key: "_setActive",
    value: function _setActive(active) {
      this.active = active;
    }
  }, {
    key: "_setEvent",
    value: function _setEvent(event, args) {
      this.event = {
        name: event,
        args: args
      };
    }
  }, {
    key: "onInit",
    value: function () {
      var _onInit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._tabbie = new _Tabbie.Tabbie({
                  prefix: this._deps.brand.prefix
                });

                if (!this._tabbie.enabled) {
                  _context2.next = 9;
                  break;
                }

                _context2.t0 = this;
                _context2.next = 5;
                return this._tabbie.checkIsMain();

              case 5:
                _context2.t1 = _context2.sent;

                _context2.t0._setActive.call(_context2.t0, _context2.t1);

                this._tabbie.on(this._tabbie.events.mainTabIdChanged, /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.t0 = _this2;
                          _context.next = 3;
                          return _this2._tabbie.checkIsMain();

                        case 3:
                          _context.t1 = _context.sent;

                          _context.t0._setActive.call(_context.t0, _context.t1);

                        case 5:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                })));

                this._tabbie.on(this._tabbie.events.event, function (event) {
                  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                  }

                  _this2._setEvent(event, args);
                });

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onInit() {
        return _onInit.apply(this, arguments);
      }

      return onInit;
    }()
  }, {
    key: "send",
    value: function send(event) {
      var _this$_tabbie;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      (_this$_tabbie = this._tabbie).send.apply(_this$_tabbie, [event].concat(args));
    }
  }, {
    key: "checkIsMain",
    value: function () {
      var _checkIsMain = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this._tabbie.checkIsMain());

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function checkIsMain() {
        return _checkIsMain.apply(this, arguments);
      }

      return checkIsMain;
    }()
  }, {
    key: "checkTabAliveById",
    value: function checkTabAliveById(id) {
      return this._tabbie.checkTabAliveById(id);
    }
  }, {
    key: "id",
    get: function get() {
      return this._tabbie.id;
    }
  }, {
    key: "hasMultipleTabs",
    get: function get() {
      return this._tabbie.hasMultipleTabs;
    }
  }, {
    key: "tabs",
    get: function get() {
      return this._tabbie.tabs;
    }
  }, {
    key: "isFirstTab",
    get: function get() {
      return this._tabbie.isFirstTab;
    }
  }]);

  return TabManager;
}(_core.RcModuleV2), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "active", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return true;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setActive", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setActive"), _class2.prototype), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "event", [_core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return null;
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_setEvent", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_setEvent"), _class2.prototype)), _class2)) || _class);
exports.TabManager = TabManager;
//# sourceMappingURL=TabManager.js.map
