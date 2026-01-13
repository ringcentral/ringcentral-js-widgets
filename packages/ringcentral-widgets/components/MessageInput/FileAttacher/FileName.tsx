import { palette2, styled, typography } from '@ringcentral/juno';
import React, { FC } from 'react';

import { TextMiddleEllipsis } from './TextMiddleEllipsis';

const StyledTextMiddleEllipsis = styled(TextMiddleEllipsis)`
  color: ${palette2('neutral', 'f06')};
  ${typography('body1')}
`;

type FileNameProps = {
  fileName: string;
};

export const FileName: FC<FileNameProps> = ({ fileName }) => {
  return <StyledTextMiddleEllipsis>{fileName}</StyledTextMiddleEllipsis>;
};
