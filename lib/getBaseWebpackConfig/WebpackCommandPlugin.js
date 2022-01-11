"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebpackCommandPlugin = void 0;

require("core-js/modules/es6.object.define-property");

var _execa = _interopRequireDefault(require("execa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var WebpackCommandPlugin = /*#__PURE__*/function () {
  /**
   * exec command
   */
  function WebpackCommandPlugin(_ref) {
    var command = _ref.command;

    _classCallCheck(this, WebpackCommandPlugin);

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
