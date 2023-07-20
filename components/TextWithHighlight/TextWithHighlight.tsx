import type { FunctionComponent } from 'react';
import React, { Fragment, useMemo } from 'react';

import { palette2, styled } from '@ringcentral/juno';

const HighlightText = styled.span`
  background: ${palette2('highlight', 'b02')};
`;

const indexesOf = (string: string, highLightText: string) => {
  let match;
  const indexes = [];
  const regex = new RegExp(
    highLightText.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&'),
    'gi',
  );
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(string)) !== null) {
    indexes.push(match.index);
  }
  return indexes;
};

interface TextWithHighlightProps {
  text: string;
  highLightText: string;
}

export const TextWithHighlight: FunctionComponent<TextWithHighlightProps> = ({
  text,
  highLightText,
  ...rest
}) => {
  const highlightTextLength = highLightText?.length;
  const matchIndexes = useMemo(
    () => (highlightTextLength > 0 ? indexesOf(text, highLightText) : []),
    [highLightText, highlightTextLength, text],
  );

  return (
    <span title={text} {...rest}>
      {matchIndexes.length > 0
        ? matchIndexes.map((startIndex, index) => {
            const endIndex = startIndex + highlightTextLength;
            return (
              <Fragment key={startIndex}>
                {index === 0 && text.substring(0, startIndex)}

                <HighlightText data-sign="highlight">
                  {text.substring(startIndex, endIndex)}
                </HighlightText>

                {text.substring(endIndex, matchIndexes[index + 1])}
              </Fragment>
            );
          })
        : text}
    </span>
  );
};
