"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pendo = void 0;

require("core-js/modules/es6.object.define-property");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Pendo = /*#__PURE__*/function () {
  function Pendo() {
    _classCallCheck(this, Pendo);
  }

  _createClass(Pendo, null, [{
    key: "init",
    value: function init(pendoApiKey, onLoadSuccess) {
      if (!pendoApiKey) return;
      var pendoLibSource = "https://cdn.pendo.io/agent/static/".concat(pendoApiKey, "/pendo.js");
      var isCreated = document.querySelector("script[src=\"".concat(pendoLibSource, "\"]"));
      if (isCreated) return;
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = pendoLibSource;
      script.async = true;

      script.onload = function () {
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

  return Pendo;
}();

exports.Pendo = Pendo;
//# sourceMappingURL=pendo.js.map
