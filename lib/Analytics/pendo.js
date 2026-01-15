"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pendo = void 0;
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Pendo = exports.Pendo = /*#__PURE__*/function () {
  function Pendo() {
    _classCallCheck(this, Pendo);
  }
  return _createClass(Pendo, null, [{
    key: "init",
    value: function init(pendoApiKey, useLocalPendoJS, onLoadSuccess) {
      if (!pendoApiKey || process.env.BLOCK_PENDO_SOURCE_CODE) return;
      var pendoLibSource = useLocalPendoJS ? './pendo.xhr.js' : "https://cdn.pendo.io/agent/static/".concat(pendoApiKey, "/pendo.js");
      var isCreated = document.querySelector("script[src=\"".concat(pendoLibSource, "\"]"));
      if (isCreated) return;
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = pendoLibSource;
      script.async = true;
      script.onload = function () {
        if (useLocalPendoJS) {
          window.pendo.initialize({
            apiKey: pendoApiKey
          });
        }
        console.log('pendo SDK is loaded!');
        if (typeof onLoadSuccess === 'function') {
          onLoadSuccess(window.pendo);
        }
      };
      script.onerror = function () {
        console.log('load pendo fail.');
      };
      document.head.appendChild(script);
    }
  }]);
}();
//# sourceMappingURL=pendo.js.map
