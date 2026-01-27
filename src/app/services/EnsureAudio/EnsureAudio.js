"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnsureAudio = void 0;
var _nextCore = require("@ringcentral-integration/next-core");
var _rxjs = require("rxjs");
var _ensureAudioSoundPermission = require("./ensureAudioSoundPermission");
var _dec, _class;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var EnsureAudio = exports.EnsureAudio = (_dec = (0, _nextCore.injectable)({
  name: 'EnsureAudio'
}), _dec(_class = /*#__PURE__*/function () {
  function EnsureAudio() {
    _classCallCheck(this, EnsureAudio);
    this.audioSoundPermission = (0, _ensureAudioSoundPermission.ensureAudioSoundPermission)();
  }
  return _createClass(EnsureAudio, [{
    key: "ensure",
    value:
    /**
     * ensure audio sound permission when user interact with document
     */
    function ensure() {
      var _this = this;
      if (global.document) {
        var events$ = (0, _rxjs.merge)((0, _rxjs.fromEvent)(document, 'click'), (0, _rxjs.fromEvent)(document, 'keydown'));
        events$.pipe((0, _rxjs.switchMap)(function () {
          return _this.audioSoundPermission.ensure();
        }), (0, _rxjs.filter)(Boolean), (0, _rxjs.take)(1)).subscribe();
      }
    }
  }]);
}()) || _class);
//# sourceMappingURL=EnsureAudio.js.map
