"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoChunkChecker = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var NoChunkChecker = exports.NoChunkChecker = /*#__PURE__*/function () {
  function NoChunkChecker() {
    var _this$_options$files;
    var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, NoChunkChecker);
    this._options = _options;
    this._files = void 0;
    this._files = (_this$_options$files = this._options.files) !== null && _this$_options$files !== void 0 ? _this$_options$files : [];
  }
  return _createClass(NoChunkChecker, [{
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
}();
//# sourceMappingURL=NoChunkChecker.js.map
