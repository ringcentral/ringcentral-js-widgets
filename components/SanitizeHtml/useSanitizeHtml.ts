import { useMemo } from 'react';

import { sanitizeHtml } from './utils';

/**
 * Hook to sanitize and memoize HTML content.
 * Returns a React node that safely renders plain text or sanitized HTML.
 *
 * @param content - The text or HTML content to sanitize and render
 * @returns Memoized React node with either plain text or sanitized HTML
 */
export function useSanitizeHtml(content: string | undefined) {
  return useMemo(() => {
    if (!content) {
      return null;
    }

    const sanitized = sanitizeHtml(content);
    return sanitized;
  }, [content]);
}
