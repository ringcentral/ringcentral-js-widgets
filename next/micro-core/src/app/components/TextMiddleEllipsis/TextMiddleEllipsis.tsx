import { ellipsis, styled } from '@ringcentral/juno';
import React, { memo } from 'react';

import { getMiddleSplit } from './utils';

const TextMiddleEllipsisWrap = styled.span`
  width: 100%;
  display: inline-flex;

  span:first-child {
    ${ellipsis()};
  }
  span:last-child {
    flex: none;
  }
`;

type TextMiddleEllipsisProps = {
  max?: number;
  middle?: number;
  children: string;
} & Omit<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >,
  'children'
>;

/**
 * provide you can ellipsis text in the middle
 *
 * @default max check be 22
 * @default middle check be -8
 */
export const TextMiddleEllipsis = memo(
  ({ max, middle, children, ...rest }: TextMiddleEllipsisProps) => {
    const { left, right } = getMiddleSplit(children, { max, middle });
    return (
      <TextMiddleEllipsisWrap {...rest} title={children}>
        <span>{left}</span>
        {right && <span>{right}</span>}
      </TextMiddleEllipsisWrap>
    );
  },
);
