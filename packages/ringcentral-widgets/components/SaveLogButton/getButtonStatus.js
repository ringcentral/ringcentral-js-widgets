export function getButtonStatus({
  isSucceed,
  isSaving,
  isEdited,
  isAutoSave,
  isFailed,
  isCreated,
}) {
  const buttonDisabled =
    (isCreated && isAutoSave && !isFailed) ||
    isSaving ||
    (!isEdited && isSucceed);

  const unSavingText = !isEdited && isSucceed ? 'saved' : 'save';
  const buttonContent = isSaving ? 'saving' : unSavingText;

  return {
    buttonDisabled,
    buttonContent,
  };
}
