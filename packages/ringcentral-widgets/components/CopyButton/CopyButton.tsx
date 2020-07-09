import React, { FunctionComponent } from 'react';
import copyIconSvg from '@ringcentral-integration/rcui/icons/icon-copy.svg';
import { RcIconButton } from '@ringcentral-integration/rcui';

export interface CopyButtonProps {
  executeCopy?: () => void;
}
const CopyButton: FunctionComponent<CopyButtonProps> = ({ executeCopy }) => {
  return (
    <RcIconButton onClick={executeCopy} symbol={copyIconSvg} size="small" />
  );
};

export default CopyButton;
