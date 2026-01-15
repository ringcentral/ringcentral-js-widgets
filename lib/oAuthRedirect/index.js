"use strict";

require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.iterator");
require("core-js/modules/es.array.join");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.to-string");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.iterator");
require("core-js/modules/es.string.split");
require("core-js/modules/web.dom-collections.iterator");
require("core-js/modules/web.timers");
require("core-js/modules/web.url");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseCombinedState = parseCombinedState;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function parseCombinedState(authState) {
  var _authState$split = authState.split('-'),
    _authState$split2 = _slicedToArray(_authState$split, 1),
    state = _authState$split2[0]; // first part of auth state
  try {
    var json = window.atob(state);
    var combinedState = JSON.parse(json);
    // validate the combined state
    if (typeof (combinedState === null || combinedState === void 0 ? void 0 : combinedState.now) === 'number') {
      console.log('[CombinedState] parsed');
      return combinedState;
    }
  } catch (ex) {
    console.log('[CombinedState]', ex);
  }
}
(function () {
  var callbackUri = location.href;
  var urlSearchParams = new URLSearchParams(callbackUri);
  var state = urlSearchParams.get('state') || '';
  var combinedState = parseCombinedState(state);

  /* Solution: call hook */
  try {
    var _window$opener;
    if ((_window$opener = window.opener) === null || _window$opener === void 0 ? void 0 : _window$opener.oAuthCallback) {
      window.opener.oAuthCallback(callbackUri);
      console.log('[CallHook] success');
      window.close();
      return;
    }
  } catch (ex) {
    console.log('[CallHook]', ex);
  }

  /* Solution: postMessage */
  var postMessageToOpener = function postMessageToOpener() {
    try {
      var _window$opener2;
      if (((_window$opener2 = window.opener) === null || _window$opener2 === void 0 ? void 0 : _window$opener2.postMessage) && (combinedState === null || combinedState === void 0 ? void 0 : combinedState.origin)) {
        window.opener.postMessage({
          callbackUri: callbackUri
        }, combinedState.origin);
        console.log('[PostMessage] success');
        window.close();
        return;
      }
    } catch (ex) {
      console.log('[PostMessage]', ex);
    }
  };

  /* Solution: localStorage */
  var storageSentTimeout = false;
  var timeoutId = undefined;
  // Listen to storage event to detect if the storage is removed/handled
  var hash = state.split('-').slice(1).join('-');
  var key = "".concat(hash, "-callbackUri");
  window.addEventListener('storage', function (event) {
    if (event.key !== key) return;
    var isRemoved = !event.newValue; // is removed by opener or by timeout
    if (isRemoved && !storageSentTimeout) {
      console.log('[LocalStorage] success');
      // Notify parent window to close window.
      if (window.parent) {
        window.parent.postMessage('authenticated', '*');
      }
      clearTimeout(timeoutId);
      window.close();
    }
  });
  // If opener can't handle the storage, remove the storage and try to post message to opener
  timeoutId = setTimeout(function () {
    console.log('[LocalStorage] timeout');
    storageSentTimeout = true;
    localStorage.removeItem(key);
    postMessageToOpener();
  }, 1000);
  // Set storage value
  localStorage.setItem(key, callbackUri);
})();
//# sourceMappingURL=index.js.map
