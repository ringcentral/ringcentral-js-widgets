/**
 * Set mouse focus and move cursor to end of input
 * @param {HTMLElement} inputField
 */
export const focusCampo = (inputField) => {
  inputField.blur();
  if (inputField && inputField.value.length !== 0) {
    if (inputField.createTextRange) {
      const FieldRange = inputField.createTextRange();
      FieldRange.moveStart('character', inputField.value.length);
      FieldRange.collapse();
      FieldRange.select();
    } else if (inputField.selectionStart || inputField.selectionStart === 0) {
      const elemLen = inputField.value.length;
      inputField.selectionStart = elemLen;
      inputField.selectionEnd = elemLen;
    }
  }
  setTimeout(() => {
    inputField.focus();
  }, 0);
};
