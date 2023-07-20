"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.for-each");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.function.name");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoChunkChecker = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var NoChunkChecker = /*#__PURE__*/function () {
  function NoChunkChecker() {
    var _this$_options$files;
    var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, NoChunkChecker);
    this._options = _options;
    this._files = void 0;
    this._files = (_this$_options$files = this._options.files) !== null && _this$_options$files !== void 0 ? _this$_options$files : [];
  }
  _createClass(NoChunkChecker, [{
    key: "apply",
    value: function apply(compiler) {
      var _this = this;
      compiler.hooks.shouldEmit.tap('NoChunkChecker', function (compilation) {
        var shouldEmit = true;
        compilation.chunks.forEach(function (chunk) {
          _this._files.forEach(function (file) {
            if (chunk.name !== file && (typeof chunk.runtime === 'string' && chunk.runtime === file || _typeof(chunk.runtime) === 'object' && chunk.runtime.has(file))) {
              shouldEmit = false;
              console.error("NoChunkChecker: entry: '".concat(file, "' found to load chunk: '").concat(chunk.name, "'"));
            }
          });
        });
        if (!shouldEmit) {
          throw new Error('Bad chunks found!!!');
        }
        return shouldEmit;
      });
    }
  }]);
  return NoChunkChecker;
}();
exports.NoChunkChecker = NoChunkChecker;
//# sourceMappingURL=NoChunkChecker.js.map
