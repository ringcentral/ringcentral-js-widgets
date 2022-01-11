"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvChooseAccountUI = void 0;

require("regenerator-runtime/runtime");

var _di = require("@ringcentral-integration/commons/lib/di");

var _core = require("@ringcentral-integration/core");

var _dec, _class;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var EvChooseAccountUI = (_dec = (0, _di.Module)({
  name: 'ChooseAccountUI',
  deps: ['EvClient', 'Locale', 'RouterInteraction', 'EvAuth', 'Block']
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(EvChooseAccountUI, _RcUIModuleV);

  var _super = _createSuper(EvChooseAccountUI);

  function EvChooseAccountUI(deps) {
    _classCallCheck(this, EvChooseAccountUI);

    return _super.call(this, {
      deps: deps
    });
  }

  _createClass(EvChooseAccountUI, [{
    key: "_onAccountItemClick",
    value: function () {
      var _onAccountItemClick2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(agentId) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._deps.block.next( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _this._deps.evAuth.setAgentId(agentId);

                          _context.next = 3;
                          return _this._deps.evAuth.openSocketWithSelectedAgentId({
                            syncOtherTabs: true,
                            retryOpenSocket: true
                          });

                        case 3:
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

      function _onAccountItemClick(_x) {
        return _onAccountItemClick2.apply(this, arguments);
      }

      return _onAccountItemClick;
    }()
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      return {
        currentLocale: this._deps.locale.currentLocale,
        agents: this._deps.evAuth.authenticateResponse.agents
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;

      return {
        onAccountItemClick: function onAccountItemClick(agentId) {
          return _this2._onAccountItemClick(agentId);
        }
      };
    }
  }]);

  return EvChooseAccountUI;
}(_core.RcUIModuleV2)) || _class);
exports.EvChooseAccountUI = EvChooseAccountUI;
//# sourceMappingURL=EvChooseAccountUI.js.map
