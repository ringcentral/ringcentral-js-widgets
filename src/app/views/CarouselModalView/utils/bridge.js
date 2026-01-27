"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-own-property-descriptors.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.object.keys.js");
var _constants = require("./constants");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } // eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='./bridge.d.ts'/>
/**
 * post message to parent window
 */
var post = function post() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var last = args[args.length - 1];
  if (last instanceof Event || last.preventDefault) {
    last.preventDefault();
    // remove from args
    args.pop();
  }
  var emitValue = {
    type: _constants.TUTORIAL_ACTION_KEY,
    data: args
  };
  window.parent.postMessage(JSON.stringify(emitValue), '*');
};
window.RC_AEM = _objectSpread(_objectSpread({}, window.RC_AEM), {}, {
  post: post
});
if (!window.RC_AEM.disabledGlobalActionListener) {
  var listenGlobalActionEvent = function listenGlobalActionEvent() {
    function postData(actionType, source, e) {
      if (e.key) {
        var _e$target;
        var beSpace = e.key === ' ' || e.code === 'Space';
        var beEnter = e.key === 'Enter';

        // not be space or enter, return
        if (!(beEnter || beSpace)) {
          return;
        }
        var beButton = ((_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.tagName) === 'BUTTON';
        // not be button but key code is space, also not trigger
        if (!beButton && beSpace) {
          return;
        }
      }
      try {
        var _JSON$parse = JSON.parse(source),
          type = _JSON$parse.type,
          value = _JSON$parse.value;
        window.RC_AEM.post(actionType, type, value, e);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("[RC_AEM] data format error, should be string value with JSON object like\n\n        <button data-desktop-action='{\"type\": \"event\", \"value\": \"value\"}'>click</button>\n\n        or\n\n        <button data-mobile-action='{\"type\": \"event\", \"value\": \"value\"}'>click</button>\n        ");
        throw error;
      }
    }
    var handleListener = function handleListener(e) {
      var element = e.target;
      var desktop = element.getAttribute('data-desktop-action');
      var mobile = element.getAttribute('data-mobile-action');
      if (desktop) {
        postData('desktop', desktop, e);
      }
      if (mobile) {
        postData('mobile', mobile, e);
      }
    };
    document.addEventListener('click', handleListener);
    document.addEventListener('keydown', handleListener);
  };
  listenGlobalActionEvent();
}
//# sourceMappingURL=bridge.js.map
