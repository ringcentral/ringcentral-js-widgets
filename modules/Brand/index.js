"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

var _RcModule2 = _interopRequireDefault(require("../../lib/RcModule"));

var _di = require("../../lib/di");

var _moduleStatuses = _interopRequireDefault(require("../../enums/moduleStatuses"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Brand = (
/**
 * @class
 * @description Brand managing module
 */
_dec = (0, _di.Module)({
  deps: [{
    dep: 'BrandOptions',
    optional: true
  }]
}), _dec(_class =
/*#__PURE__*/
function (_RcModule) {
  _inherits(Brand, _RcModule);

  /**
   * @constructor
   * @param {Object} params - params object
   * @param {String} params.id - brand id
   * @param {String} params.name - brand name
   * @param {String} params.fullName - full brand name
   * @param {String} params.application - application name
   */
  function Brand(_ref) {
    var _this;

    var id = _ref.id,
        name = _ref.name,
        fullName = _ref.fullName,
        appName = _ref.appName,
        application = _ref.application,
        code = _ref.code,
        brandConfig = _ref.brandConfig,
        options = _objectWithoutProperties(_ref, ["id", "name", "fullName", "appName", "application", "code", "brandConfig"]);

    _classCallCheck(this, Brand);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Brand).call(this, options));

    _this._reducer = function () {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        id: id,
        name: name,
        fullName: fullName,
        appName: appName,
        application: application,
        code: code,
        brandConfig: brandConfig
      };
      return state;
    };

    return _this;
  }

  _createClass(Brand, [{
    key: "_onStateChange",
    value: function _onStateChange() {
      /* do nothing */
    }
  }, {
    key: "_actionTypes",
    get: function get() {
      /* no action types */
    }
  }, {
    key: "id",
    get: function get() {
      return this.state.id;
    }
  }, {
    key: "name",
    get: function get() {
      return this.state.name;
    }
  }, {
    key: "fullName",
    get: function get() {
      return this.state.fullName;
    }
  }, {
    key: "application",
    get: function get() {
      return this.state.application;
    }
  }, {
    key: "appName",
    get: function get() {
      return this.state.appName;
    }
  }, {
    key: "code",
    get: function get() {
      return this.state.code;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "status",
    get: function get() {
      return _moduleStatuses["default"].ready;
    }
  }, {
    key: "brandConfig",
    get: function get() {
      return this.state.brandConfig;
    } // eslint-disable-next-line class-methods-use-this

  }, {
    key: "ready",
    get: function get() {
      return true;
    }
  }]);

  return Brand;
}(_RcModule2["default"])) || _class);
exports["default"] = Brand;
//# sourceMappingURL=index.js.map
