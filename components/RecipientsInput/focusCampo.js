"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.focusCampo = void 0;

/**
 * Set mouse focus and move cursor to end of input
 * @param {HTMLElement} inputField
 */
var focusCampo = function focusCampo(inputField) {
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

exports.focusCampo = focusCampo;
//# sourceMappingURL=focusCampo.js.map
