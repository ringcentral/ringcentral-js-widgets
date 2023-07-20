export function getButtonStatus({
  isSucceed,
  isSaving,
  isEdited,
  isAutoSave,
  isFailed,
  isCreated,
}: any) {
  const buttonDisabled =
    (isCreated && isAutoSave && !isFailed) ||
    isSaving ||
    (!isEdited && isSucceed && isCreated);
  const unSavingText = isCreated && !isEdited && isSucceed ? 'saved' : 'save';
  const buttonContent = isSaving ? 'saving' : unSavingText;

  return {
    buttonDisabled,
    buttonContent,
  };
}
