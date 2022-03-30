"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Feedback = void 0;

require("regenerator-runtime/runtime");

var _core = require("@ringcentral-integration/core");

var _di = require("../../lib/di");

var _proxify = _interopRequireDefault(require("../../lib/proxy/proxify"));

var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var Feedback = (_dec = (0, _di.Module)({
  name: 'Feedback',
  deps: ['Storage']
}), _dec(_class = (_class2 = /*#__PURE__*/function (_RcModuleV) {
  _inherits(Feedback, _RcModuleV);

  var _super = _createSuper(Feedback);

  function Feedback(deps) {
    var _this;

    _classCallCheck(this, Feedback);

    _this = _super.call(this, {
      deps: deps,
      enableCache: true,
      storageKey: 'Feedback'
    });

    _initializerDefineProperty(_this, "email", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "topic", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "subject", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "description", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(Feedback, [{
    key: "_updateEmail",
    value: function _updateEmail(email) {
      this.email = email;
    }
  }, {
    key: "_updateTopic",
    value: function _updateTopic(topic) {
      this.topic = topic;
    }
  }, {
    key: "_updateSubject",
    value: function _updateSubject(subject) {
      this.subject = subject;
    }
  }, {
    key: "_updateDescription",
    value: function _updateDescription(description) {
      this.description = description;
    }
  }, {
    key: "_clean",
    value: function _clean() {
      this.email = '';
      this.topic = '';
      this.subject = '';
      this.description = '';
    }
  }, {
    key: "updateEmail",
    value: function () {
      var _updateEmail2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this._updateEmail(email);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function updateEmail(_x) {
        return _updateEmail2.apply(this, arguments);
      }

      return updateEmail;
    }()
  }, {
    key: "updateTopic",
    value: function () {
      var _updateTopic2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(topic) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this._updateTopic(topic);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updateTopic(_x2) {
        return _updateTopic2.apply(this, arguments);
      }

      return updateTopic;
    }()
  }, {
    key: "updateSubject",
    value: function () {
      var _updateSubject2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(subject) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._updateSubject(subject);

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateSubject(_x3) {
        return _updateSubject2.apply(this, arguments);
      }

      return updateSubject;
    }()
  }, {
    key: "updateDescription",
    value: function () {
      var _updateDescription2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(description) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this._updateDescription(description);

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function updateDescription(_x4) {
        return _updateDescription2.apply(this, arguments);
      }

      return updateDescription;
    }()
  }, {
    key: "clean",
    value: function () {
      var _clean2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                this._clean();

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function clean() {
        return _clean2.apply(this, arguments);
      }

      return clean;
    }()
  }, {
    key: "sendFeedback",
    value: function () {
      var _sendFeedback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(mailToUrl) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                window.location.href = mailToUrl;

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function sendFeedback(_x5) {
        return _sendFeedback.apply(this, arguments);
      }

      return sendFeedback;
    }()
  }]);

  return Feedback;
}(_core.RcModuleV2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "email", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "topic", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "subject", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "description", [_core.storage, _core.state], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return '';
  }
}), _applyDecoratedDescriptor(_class2.prototype, "_updateEmail", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateEmail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateTopic", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateTopic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateSubject", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateSubject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_updateDescription", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_updateDescription"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "_clean", [_core.action], Object.getOwnPropertyDescriptor(_class2.prototype, "_clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateEmail", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateEmail"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateTopic", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateTopic"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateSubject", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateSubject"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "updateDescription", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "updateDescription"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "clean", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "clean"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "sendFeedback", [_proxify["default"]], Object.getOwnPropertyDescriptor(_class2.prototype, "sendFeedback"), _class2.prototype)), _class2)) || _class);
exports.Feedback = Feedback;
//# sourceMappingURL=Feedback.js.map
