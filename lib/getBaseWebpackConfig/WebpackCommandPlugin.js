"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebpackCommandPlugin = void 0;
var _execa = _interopRequireDefault(require("execa"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var WebpackCommandPlugin = /*#__PURE__*/function () {
  function WebpackCommandPlugin(_ref) {
    var command = _ref.command;
    _classCallCheck(this, WebpackCommandPlugin);
    /**
     * exec command
     */
    this.command = void 0;
    this.isRunning = false;
    this.command = command;
  }
  _createClass(WebpackCommandPlugin, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;
      compiler.hooks.afterEmit.tap('AfterEmitPlugin', function (compilation) {
        if (_this.isRunning) return;
        _execa["default"].command(_this.command, {
          stdio: 'inherit'
        });
        _this.isRunning = true;
      });
    }
  }]);
  return WebpackCommandPlugin;
}();
exports.WebpackCommandPlugin = WebpackCommandPlugin;
//# sourceMappingURL=WebpackCommandPlugin.js.map
