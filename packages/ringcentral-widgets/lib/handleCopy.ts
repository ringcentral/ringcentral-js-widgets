const copyWithCommand = async (copiedText: string) => {
  const tempNode = document.createElement('textarea');
  tempNode.style.position = 'fixed';
  tempNode.style.top = '-9999px';
  tempNode.value = copiedText;
  document.body.appendChild(tempNode);
  tempNode.focus();
  tempNode.select();

  const result = document.execCommand('copy');
  document.body.removeChild(tempNode);

  if (!result) {
    throw new Error();
  }

  return true;
};

export const handleCopy = async (copiedText: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(copiedText);
    return true;
  } catch (e) {
    return copyWithCommand(copiedText);
  }
};
