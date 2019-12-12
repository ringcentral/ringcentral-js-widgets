"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getButtonStatus = getButtonStatus;

function getButtonStatus(_ref) {
  var isSucceed = _ref.isSucceed,
      isSaving = _ref.isSaving,
      isEdited = _ref.isEdited,
      isAutoSave = _ref.isAutoSave,
      isFailed = _ref.isFailed,
      isCreated = _ref.isCreated;
  var buttonDisabled = isCreated && isAutoSave && !isFailed || isSaving || !isEdited && isSucceed && isCreated;
  var unSavingText = isCreated && !isEdited && isSucceed ? 'saved' : 'save';
  var buttonContent = isSaving ? 'saving' : unSavingText;
  return {
    buttonDisabled: buttonDisabled,
    buttonContent: buttonContent
  };
}
//# sourceMappingURL=getButtonStatus.js.map
