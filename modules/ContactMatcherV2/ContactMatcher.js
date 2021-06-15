"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
exports.ContactMatcher = void 0;

require("core-js/modules/es6.regexp.match");

require("regenerator-runtime/runtime");

var _di = require("../../lib/di");

var _DataMatcherV = require("../../lib/DataMatcherV2");

var _proxify = require("../../lib/proxy/proxify");

var _dec, _class, _class2;

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var ContactMatcher = (_dec = (0, _di.Module)({
  name: 'ContactMatcher',
  deps: [{
    dep: 'ContactMatcherOptions',
    optional: true
  }]
}), _dec(_class = (_class2 = /*#__PURE__*/function (_DataMatcher) {
  _inherits(ContactMatcher, _DataMatcher);

  var _super = _createSuper(ContactMatcher);

  function ContactMatcher(deps) {
    var _deps$contactMatcherO;

    _classCallCheck(this, ContactMatcher);

    return _super.call(this, deps, 'ContactMatcher', (_deps$contactMatcherO = deps.contactMatcherOptions) === null || _deps$contactMatcherO === void 0 ? void 0 : _deps$contactMatcherO.disableCache);
  }

  _createClass(ContactMatcher, [{
    key: "hasMatchNumber",
    value: function () {
      var _hasMatchNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref) {
        var _this$dataMapping$pho;

        var phoneNumber, _ref$ignoreCache, ignoreCache;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                phoneNumber = _ref.phoneNumber, _ref$ignoreCache = _ref.ignoreCache, ignoreCache = _ref$ignoreCache === void 0 ? false : _ref$ignoreCache;
                _context.next = 3;
                return this.match({
                  queries: [phoneNumber],
                  ignoreCache: ignoreCache
                });

              case 3:
                return _context.abrupt("return", ((_this$dataMapping$pho = this.dataMapping[phoneNumber]) === null || _this$dataMapping$pho === void 0 ? void 0 : _this$dataMapping$pho.length) > 0);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function hasMatchNumber(_x) {
        return _hasMatchNumber.apply(this, arguments);
      }

      return hasMatchNumber;
    }()
  }, {
    key: "forceMatchBatchNumbers",
    value: function () {
      var _forceMatchBatchNumbers = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref2) {
        var phoneNumbers;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                phoneNumbers = _ref2.phoneNumbers;
                _context2.next = 3;
                return this.match({
                  queries: phoneNumbers,
                  ignoreCache: true,
                  ignoreQueue: true
                });

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function forceMatchBatchNumbers(_x2) {
        return _forceMatchBatchNumbers.apply(this, arguments);
      }

      return forceMatchBatchNumbers;
    }()
  }, {
    key: "forceMatchNumber",
    value: function () {
      var _forceMatchNumber = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref3) {
        var phoneNumber;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                phoneNumber = _ref3.phoneNumber;
                _context3.next = 3;
                return this.forceMatchBatchNumbers({
                  phoneNumbers: [phoneNumber]
                });

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function forceMatchNumber(_x3) {
        return _forceMatchNumber.apply(this, arguments);
      }

      return forceMatchNumber;
    }()
  }, {
    key: "dataMatcherOptions",
    get: function get() {
      return this._deps.contactMatcherOptions;
    }
  }]);

  return ContactMatcher;
}(_DataMatcherV.DataMatcher), (_applyDecoratedDescriptor(_class2.prototype, "hasMatchNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "hasMatchNumber"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forceMatchBatchNumbers", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "forceMatchBatchNumbers"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "forceMatchNumber", [_proxify.proxify], Object.getOwnPropertyDescriptor(_class2.prototype, "forceMatchNumber"), _class2.prototype)), _class2)) || _class);
exports.ContactMatcher = ContactMatcher;
//# sourceMappingURL=ContactMatcher.js.map
