import React, { FunctionComponent } from 'react';

import { RcIconButton } from '@ringcentral/juno';
import { Copy as copyIconSvg } from '@ringcentral/juno-icon';

export interface CopyButtonProps {
  executeCopy?: () => void;
}
const CopyButton: FunctionComponent<CopyButtonProps> = ({ executeCopy }) => {
  return (
    <RcIconButton onClick={executeCopy} symbol={copyIconSvg} size="small" />
  );
};

export default CopyButton;
