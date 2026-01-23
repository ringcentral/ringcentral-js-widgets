import React, { FC } from 'react';

import { TextMiddleEllipsis } from './TextMiddleEllipsis';

type FileNameProps = {
  fileName: string;
};

export const FileName: FC<FileNameProps> = ({ fileName }) => {
  return (
    <TextMiddleEllipsis className="text-neutral-b0 typography-mainText">
      {fileName}
    </TextMiddleEllipsis>
  );
};
