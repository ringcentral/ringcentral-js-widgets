"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focusCampo = void 0;
require("core-js/modules/web.timers.js");
/**
 * Set mouse focus and move cursor to end of input
 * @param {HTMLElement} inputField
 */
var focusCampo = exports.focusCampo = function focusCampo(inputField) {
  inputField.blur();
  if (inputField && inputField.value.length !== 0) {
    if (inputField.createTextRange) {
      var FieldRange = inputField.createTextRange();
      FieldRange.moveStart('character', inputField.value.length);
      FieldRange.collapse();
      FieldRange.select();
    } else if (inputField.selectionStart || inputField.selectionStart === 0) {
      var elemLen = inputField.value.length;
      inputField.selectionStart = elemLen;
      inputField.selectionEnd = elemLen;
    }
  }
  setTimeout(function () {
    inputField.focus();
  }, 0);
};
//# sourceMappingURL=focusCampo.js.map
