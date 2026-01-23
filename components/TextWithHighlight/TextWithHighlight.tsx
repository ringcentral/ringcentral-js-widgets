import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { Fragment, useMemo } from 'react';

export const indexesOf = (string: string, highLightText: string) => {
  if (highLightText.length === 0) return [];
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

export const mergeOverlappingRanges = (
  ranges: Array<{ index: number; length: number }>,
) => {
  if (ranges.length === 0) return [];

  // Sort by start index
  const sorted = ranges.sort((a, b) => a.index - b.index);
  const merged = [];

  let current = {
    index: sorted[0].index,
    length: sorted[0].length,
  };

  for (let i = 1; i < sorted.length; i++) {
    const next = sorted[i];
    const currentEnd = current.index + current.length;
    const nextEnd = next.index + next.length;

    // If ranges overlap or are adjacent
    if (next.index <= currentEnd) {
      // Extend current range to cover the next range
      current.length = Math.max(currentEnd, nextEnd) - current.index;
    } else {
      // No overlap, add current to merged and start new current
      merged.push(current);
      current = { index: next.index, length: next.length };
    }
  }

  // Add the last range
  merged.push(current);

  return merged;
};

type TextWithHighlightProps = {
  text: string;
  highLightText: string | string[] | null | undefined;
  classes?: {
    highlight?: string;
  };
} & React.HTMLAttributes<HTMLSpanElement>;

export const TextWithHighlight: FunctionComponent<TextWithHighlightProps> = ({
  text,
  highLightText,
  classes,
  ...rest
}) => {
  const matches = useMemo(() => {
    if (Array.isArray(highLightText)) {
      return highLightText.map((item) => {
        return {
          indexes: indexesOf(text, item),
          length: item.length,
        };
      });
    }

    return typeof highLightText === 'string'
      ? [
          {
            indexes: indexesOf(text, highLightText),
            length: highLightText.length,
          },
        ]
      : [];
  }, [highLightText, text]);

  const flatMatches = useMemo(() => {
    if (matches.length === 0) {
      return [];
    }

    if (matches.length === 1) {
      const match = matches[0];
      return match.indexes.map((index) => ({
        index,
        length: match.length,
      }));
    }

    return mergeOverlappingRanges(
      matches.flatMap(({ indexes, length }) =>
        indexes.map((index) => ({ index, length })),
      ),
    );
  }, [matches]);

  return (
    <span title={text} {...rest}>
      {flatMatches.length > 0
        ? flatMatches.map(({ index, length }, i) => {
            const startIndex = index;
            const endIndex = startIndex + length;
            const nextStartIndex = flatMatches[i + 1]?.index;

            return (
              <Fragment key={startIndex}>
                {i === 0 && text.substring(0, startIndex)}

                <span
                  data-sign="highlight"
                  className={clsx('font-bold', classes?.highlight)}
                >
                  {text.substring(startIndex, endIndex)}
                </span>

                {nextStartIndex !== undefined
                  ? text.substring(endIndex, nextStartIndex)
                  : text.substring(endIndex)}
              </Fragment>
            );
          })
        : text}
    </span>
  );
};
