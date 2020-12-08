"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvSubscription = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

var _core = require("@ringcentral-integration/core");

var _events = require("events");

var _di = require("ringcentral-integration/lib/di");

var _dec, _class, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var EvSubscription = (_dec = (0, _di.Module)({
  name: 'EvSubscription',
  deps: ['EvClient', {
    dep: 'EvSubscriptionOptions',
    optional: true
  }]
}), _dec(_class = (_temp = /*#__PURE__*/function (_RcModuleV) {
  _inherits(EvSubscription, _RcModuleV);

  var _super = _createSuper(EvSubscription);

  function EvSubscription(deps) {
    var _this;

    _classCallCheck(this, EvSubscription);

    _this = _super.call(this, {
      deps: deps
    });
    _this.eventEmitters = new _events.EventEmitter();
    return _this;
  }

  _createClass(EvSubscription, [{
    key: "emit",
    value: function emit(event, value) {
      this.eventEmitters.emit(event, value);
    }
  }, {
    key: "subscribe",
    value: function subscribe(event, listener) {
      var _this2 = this;

      if (!this._deps.evClient.getEventCallback(event)) {
        this._deps.evClient.on(event, function () {
          var _this2$eventEmitters;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          (_this2$eventEmitters = _this2.eventEmitters).emit.apply(_this2$eventEmitters, [event].concat(args));
        });
      }

      this.eventEmitters.on(event, listener);
      return this;
    }
  }, {
    key: "once",
    value: function once(event, listener) {
      this.eventEmitters.once(event, listener);
    }
  }, {
    key: "off",
    value: function off(event, listener) {
      this.eventEmitters.off(event, listener);
    }
  }]);

  return EvSubscription;
}(_core.RcModuleV2), _temp)) || _class);
exports.EvSubscription = EvSubscription;
//# sourceMappingURL=EvSubscription.js.map
