import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks.
 * Uses DOMPurify to clean the HTML while preserving safe formatting tags.
 *
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML string safe for rendering
 */
export function sanitizeHtml(html: string): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  // Add hook to ensure links have rel="noopener noreferrer" for security
  // and allow all aria-* attributes dynamically
  DOMPurify.addHook('uponSanitizeAttribute', (node, data) => {
    // Allow all aria-* attributes dynamically (more maintainable than listing each one)
    if (data.attrName && data.attrName.startsWith('aria-')) {
      data.keepAttr = true;
      return;
    }
    // Ensure all links have rel="noopener noreferrer" for security
    if (node.tagName === 'A' && data.attrName === 'target') {
      const rel = node.getAttribute('rel') || '';
      if (!rel.includes('noopener')) {
        node.setAttribute('rel', `${rel} noopener noreferrer`.trim());
      }
    }
  });

  // Add hook to sanitize data-* attribute values after attributes are processed
  // Note: data-* attributes can be XSS vectors if:
  // 1. Their values are inserted via innerHTML/outerHTML
  // 2. Their values are executed via eval() or Function()
  // 3. Their values contain HTML/script tags that get parsed
  // 4. Their values are used as event handlers
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    // Remove data attributes with dangerous values to prevent XSS
    if (node.hasAttributes && node.hasAttributes()) {
      const attrsToRemove: string[] = [];
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        if (attr.name.startsWith('data-')) {
          const attrValue = attr.value || '';
          // Check for dangerous content in data attribute values
          if (
            // JavaScript protocol (can be executed in various contexts)
            attrValue.includes('javascript:') ||
            // Event handler names (could be used maliciously)
            /on\w+\s*=/i.test(attrValue) ||
            // Script tags (HTML injection risk)
            /<script/i.test(attrValue) ||
            // eval() function calls (code execution risk)
            /eval\s*\(/i.test(attrValue) ||
            // Function constructor (code execution risk)
            /Function\s*\(/i.test(attrValue) ||
            // alert() calls (often used in XSS payloads)
            /alert\s*\(/i.test(attrValue)
          ) {
            attrsToRemove.push(attr.name);
          }
        }
      }
      // Remove dangerous data attributes
      attrsToRemove.forEach((attrName) => {
        node.removeAttribute(attrName);
      });
    }
  });

  const sanitized = DOMPurify.sanitize(html, {
    // Allow common formatting tags
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      'b',
      'i',
      'span',
      'div',
      'ul',
      'ol',
      'li',
      'a',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'code',
      'pre',
      'hr',
      'sub',
      'sup',
      'del',
      's',
      'mark',
      'small',
      'abbr',
      'cite',
      'q',
      'dl',
      'dt',
      'dd',
      'img',
    ],
    // Allow safe attributes
    // Note: All aria-* attributes are allowed dynamically via hook above
    ALLOWED_ATTR: [
      'href',
      'target',
      'rel',
      'class',
      'style',
      'title',
      'id',
      'lang',
      'dir',
      'role',
      'src',
    ],
    // Allow data-* attributes (DOMPurify will still sanitize dangerous values)
    ALLOW_DATA_ATTR: true,
    // Keep relative URLs
    ALLOW_UNKNOWN_PROTOCOLS: false,
  });

  // Remove hooks after use to avoid affecting other sanitizations
  DOMPurify.removeHook('uponSanitizeAttribute');
  DOMPurify.removeHook('afterSanitizeAttributes');

  return sanitized;
}
