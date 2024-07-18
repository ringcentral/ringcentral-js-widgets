interface ButtonStatus {
  buttonDisabled: boolean;
  buttonContent: string;
}

export function getButtonStatus({
  isSucceed,
  isSaving,
  isEdited,
  isAutoSave,
  isFailed,
  isCreated,
  isSaveDelaying,
}: any): ButtonStatus {
  const buttonDisabled =
    (isCreated && isAutoSave && !isFailed) ||
    isSaving ||
    isSaveDelaying ||
    (!isEdited && isSucceed && isCreated);
  const unSavingText = isCreated && !isEdited && isSucceed ? 'saved' : 'save';
  const buttonContent = isSaving ? 'saving' : unSavingText;

  return {
    buttonDisabled,
    buttonContent,
  };
}
