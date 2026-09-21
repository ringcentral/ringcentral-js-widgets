import clsx from 'clsx';
import linkifyHtml from 'linkify-html';
import React from 'react';

import { useSanitizeHtml } from './useSanitizeHtml';

type LinkifyOptions = {
  target?: string;
  rel?: string;
};

interface SanitizeHtmlProps {
  /**
   * The text or HTML content to sanitize and render
   */
  content: string | undefined;
  /**
   * The options for linkifyjs
   */
  linkifyOptions?: LinkifyOptions;
  className?: string;
}

const DEFAULT_LINKIFY_OPTIONS = {
  target: '_blank',
  rel: 'noopener noreferrer',
};

/**
 * Component that safely renders text or sanitized HTML content.
 * Uses memoization internally to optimize performance.
 */
export const SanitizeHtml: React.FC<SanitizeHtmlProps> = ({
  content,
  linkifyOptions,
  className,
  ...rest
}) => {
  const sanitizedContent = useSanitizeHtml(content);
  if (!sanitizedContent) {
    return null;
  }

  return (
    <span
      className={clsx(
        'whitespace-pre-wrap break-words [&_a]:sui-link [&_a]:sui-link-root [&_a]:sui-link-primary [&_a]:sui-link-always',
        className,
      )}
      dangerouslySetInnerHTML={{
        __html: linkifyHtml(
          sanitizedContent,
          linkifyOptions ?? DEFAULT_LINKIFY_OPTIONS,
        ),
      }}
      {...rest}
    />
  );
};
