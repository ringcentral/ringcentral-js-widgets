import { render, screen } from '@testing-library/react';
import React from 'react';

import { SanitizeHtml, sanitizeHtml } from '../../components';

describe('SanitizeHtml XSS Protection', () => {
  describe('sanitizeHtml function', () => {
    it('should remove script tags', () => {
      const malicious = '<script>alert("XSS")</script><p>Safe content</p>';
      const sanitized = sanitizeHtml(malicious);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('alert');
      expect(sanitized).toContain('Safe content');
    });

    it('should remove event handlers', () => {
      const malicious = '<p onclick="alert(\'XSS\')">Click me</p>';
      const sanitized = sanitizeHtml(malicious);
      expect(sanitized).not.toContain('onclick');
      expect(sanitized).not.toContain('alert');
      expect(sanitized).toContain('Click me');
    });

    it('should remove javascript: protocol in links', () => {
      const malicious = '<a href="javascript:alert(\'XSS\')">Click</a>';
      const sanitized = sanitizeHtml(malicious);
      expect(sanitized).not.toContain('javascript:');
      expect(sanitized).not.toContain('alert');
    });

    it('should remove iframe tags', () => {
      const malicious = '<iframe src="http://evil.com"></iframe><p>Safe</p>';
      const sanitized = sanitizeHtml(malicious);
      expect(sanitized).not.toContain('<iframe>');
      expect(sanitized).not.toContain('evil.com');
      expect(sanitized).toContain('Safe');
    });

    it('should remove object and embed tags', () => {
      const malicious =
        '<object data="evil.swf"></object><embed src="evil.swf"></embed>';
      const sanitized = sanitizeHtml(malicious);
      expect(sanitized).not.toContain('<object>');
      expect(sanitized).not.toContain('<embed>');
    });

    it('should remove style tags with malicious content', () => {
      const malicious =
        '<style>body { background: url("javascript:alert(1)") }</style><p>Safe</p>';
      const sanitized = sanitizeHtml(malicious);
      expect(sanitized).not.toContain('<style>');
      expect(sanitized).toContain('Safe');
    });

    it('should sanitize img tags with malicious src', () => {
      const malicious = '<img src="javascript:alert(\'XSS\')" />';
      const sanitized = sanitizeHtml(malicious);
      expect(sanitized).not.toContain('javascript:');
    });

    it('should preserve safe HTML tags', () => {
      const safe =
        '<p>Paragraph</p><strong>Bold</strong><em>Italic</em><br /><a href="https://example.com">Link</a>';
      const sanitized = sanitizeHtml(safe);
      expect(sanitized).toContain('<p>');
      expect(sanitized).toContain('<strong>');
      expect(sanitized).toContain('<em>');
      expect(sanitized).toContain('<br');
      expect(sanitized).toContain('<a');
      expect(sanitized).toContain('https://example.com');
    });

    it('should add rel="noopener noreferrer" to links with target', () => {
      const html = '<a href="https://example.com" target="_blank">Link</a>';
      const sanitized = sanitizeHtml(html);
      expect(sanitized).toContain('rel=');
      expect(sanitized).toContain('noopener');
      expect(sanitized).toContain('noreferrer');
    });

    it('should handle empty or null input', () => {
      expect(sanitizeHtml('')).toBe('');
      expect(sanitizeHtml(null as any)).toBe('');
      expect(sanitizeHtml(undefined as any)).toBe('');
    });

    it('should preserve data attributes (data-* attributes are allowed)', () => {
      const html = '<div data-test="value" data-id="123">Content</div>';
      const sanitized = sanitizeHtml(html);
      // data-* attributes are allowed via ALLOW_DATA_ATTR: true
      expect(sanitized).toContain('data-test=');
      expect(sanitized).toContain('data-id=');
    });

    it('should remove data attributes with dangerous values to prevent XSS', () => {
      const malicious = '<div data-xss="javascript:alert(1)">Content</div>';
      const sanitized = sanitizeHtml(malicious);
      // Dangerous data attributes should be completely removed
      expect(sanitized).not.toContain('javascript:');
      expect(sanitized).not.toContain('alert');
      expect(sanitized).not.toMatch(/data-xss=/);
      expect(sanitized).toContain('Content');
    });

    it('should remove data attributes with event handlers', () => {
      const malicious =
        '<div data-onclick="alert(1)" data-onerror="eval(1)">Content</div>';
      const sanitized = sanitizeHtml(malicious);
      // Data attributes with event handlers should be removed
      expect(sanitized).not.toMatch(/data-onclick=/);
      expect(sanitized).not.toMatch(/data-onerror=/);
      expect(sanitized).toContain('Content');
    });

    it('should remove data attributes with script tags', () => {
      const malicious =
        '<div data-html="<script>alert(1)</script>">Content</div>';
      const sanitized = sanitizeHtml(malicious);
      // Data attributes containing script tags should be removed
      expect(sanitized).not.toMatch(/data-html=/);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('Content');
    });

    it('should preserve safe data attribute values', () => {
      const html = '<div data-test="safe-value" data-id="123">Content</div>';
      const sanitized = sanitizeHtml(html);
      expect(sanitized).toContain('data-test=');
      expect(sanitized).toContain('safe-value');
      expect(sanitized).toContain('data-id=');
      expect(sanitized).toContain('123');
    });

    it('should handle nested malicious content', () => {
      const malicious = '<p>Safe <script>alert("XSS")</script> content</p>';
      const sanitized = sanitizeHtml(malicious);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('Safe');
      expect(sanitized).toContain('content');
    });

    it('should preserve safe attributes like class and style', () => {
      const html = '<p class="text-center" style="color: red;">Content</p>';
      const sanitized = sanitizeHtml(html);
      expect(sanitized).toContain('class=');
      expect(sanitized).toContain('style=');
    });

    it('should handle SVG-based XSS attempts', () => {
      const malicious = '<svg><script>alert("XSS")</script></svg><p>Safe</p>';
      const sanitized = sanitizeHtml(malicious);
      expect(sanitized).not.toContain('<svg>');
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('Safe');
    });

    it('should handle encoded XSS attempts', () => {
      const malicious = '&lt;script&gt;alert("XSS")&lt;/script&gt;';
      const sanitized = sanitizeHtml(malicious);
      // DOMPurify should handle encoded entities
      expect(sanitized).not.toContain('<script>');
    });

    it('should preserve new formatting tags', () => {
      const html =
        '<blockquote>Quote</blockquote><code>code</code><pre>pre</pre><hr /><sub>sub</sub><sup>sup</sup><del>del</del><s>strike</s><mark>mark</mark><small>small</small>';
      const sanitized = sanitizeHtml(html);
      expect(sanitized).toContain('<blockquote>');
      expect(sanitized).toContain('<code>');
      expect(sanitized).toContain('<pre>');
      expect(sanitized).toContain('<hr');
      expect(sanitized).toContain('<sub>');
      expect(sanitized).toContain('<sup>');
      expect(sanitized).toContain('<del>');
      expect(sanitized).toContain('<s>');
      expect(sanitized).toContain('<mark>');
      expect(sanitized).toContain('<small>');
    });

    it('should preserve semantic tags', () => {
      const html =
        '<abbr title="abbreviation">abbr</abbr><cite>cite</cite><q>quote</q>';
      const sanitized = sanitizeHtml(html);
      expect(sanitized).toMatch(/<abbr[^>]*>/);
      expect(sanitized).toMatch(/<cite[^>]*>/);
      expect(sanitized).toMatch(/<q[^>]*>/);
    });

    it('should preserve definition list tags', () => {
      const html = '<dl><dt>Term</dt><dd>Definition</dd></dl>';
      const sanitized = sanitizeHtml(html);
      expect(sanitized).toContain('<dl>');
      expect(sanitized).toContain('<dt>');
      expect(sanitized).toContain('<dd>');
    });

    it('should preserve new attributes (id, lang, dir, role)', () => {
      const html =
        '<p id="test" lang="en" dir="ltr" role="article">Content</p>';
      const sanitized = sanitizeHtml(html);
      expect(sanitized).toContain('id=');
      expect(sanitized).toContain('lang=');
      expect(sanitized).toContain('dir=');
      expect(sanitized).toContain('role=');
    });

    it('should allow all aria-* attributes dynamically', () => {
      const html =
        '<div aria-label="test" aria-hidden="true" aria-describedby="desc" aria-disabled="false" aria-expanded="true">Content</div>';
      const sanitized = sanitizeHtml(html);
      expect(sanitized).toContain('aria-label=');
      expect(sanitized).toContain('aria-hidden=');
      expect(sanitized).toContain('aria-describedby=');
      expect(sanitized).toContain('aria-disabled=');
      expect(sanitized).toContain('aria-expanded=');
    });

    it('should allow less common aria-* attributes', () => {
      const html =
        '<div aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" aria-live="polite" aria-atomic="true" aria-controls="target">Content</div>';
      const sanitized = sanitizeHtml(html);
      expect(sanitized).toContain('aria-valuenow=');
      expect(sanitized).toContain('aria-valuemin=');
      expect(sanitized).toContain('aria-valuemax=');
      expect(sanitized).toContain('aria-live=');
      expect(sanitized).toContain('aria-atomic=');
      expect(sanitized).toContain('aria-controls=');
    });

    it('should allow table-related aria-* attributes', () => {
      const html =
        '<div aria-colcount="5" aria-rowcount="10" aria-colspan="2" aria-rowspan="3" aria-sort="ascending">Content</div>';
      const sanitized = sanitizeHtml(html);
      expect(sanitized).toContain('aria-colcount=');
      expect(sanitized).toContain('aria-rowcount=');
      expect(sanitized).toContain('aria-colspan=');
      expect(sanitized).toContain('aria-rowspan=');
      expect(sanitized).toContain('aria-sort=');
    });

    it('should allow any aria-* attribute even if not in standard list', () => {
      // Test that the dynamic hook works for any aria-* attribute
      const html =
        '<div aria-custom-attr="test" aria-future-attr="value">Content</div>';
      const sanitized = sanitizeHtml(html);
      expect(sanitized).toContain('aria-custom-attr=');
      expect(sanitized).toContain('aria-future-attr=');
    });

    it('should preserve aria-* attributes with safe HTML tags', () => {
      const html =
        '<p aria-label="paragraph" aria-describedby="desc">Text</p><a href="#" aria-label="link" aria-current="page">Link</a>';
      const sanitized = sanitizeHtml(html);
      expect(sanitized).toContain('aria-label=');
      expect(sanitized).toContain('aria-describedby=');
      expect(sanitized).toContain('aria-current=');
    });
  });

  describe('SanitizeHtml component with linkifyjs', () => {
    it('should convert plain text URLs to links using linkifyjs', () => {
      const content = 'Visit https://example.com for more info';
      render(<SanitizeHtml content={content} />);
      const link = screen.getByText('https://example.com');
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('should apply default linkifyOptions with target="_blank"', () => {
      const content = 'Check out https://example.com';
      render(<SanitizeHtml content={content} />);
      const link = screen.getByText('https://example.com');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
      expect(link).toHaveAttribute(
        'rel',
        expect.stringContaining('noreferrer'),
      );
    });

    it('should apply custom linkifyOptions when provided', () => {
      const content = 'Visit https://example.com';
      render(
        <SanitizeHtml content={content} linkifyOptions={{ target: '_self' }} />,
      );
      const link = screen.getByText('https://example.com');
      expect(link).toHaveAttribute('target', '_self');
    });

    it('should convert multiple URLs in text to links', () => {
      const content =
        'Visit https://example.com and also http://test.com for more';
      render(<SanitizeHtml content={content} />);
      const link1 = screen.getByText('https://example.com');
      const link2 = screen.getByText('http://test.com');
      expect(link1).toBeInTheDocument();
      expect(link2).toBeInTheDocument();
      expect(link1.tagName).toBe('A');
      expect(link2.tagName).toBe('A');
    });

    it('should convert email addresses to mailto links', () => {
      const content = 'Contact us at test@example.com';
      render(<SanitizeHtml content={content} />);
      const link = screen.getByText('test@example.com');
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href', 'mailto:test@example.com');
    });

    it('should handle URLs in HTML content and preserve existing links', () => {
      const content =
        '<p>Visit <a href="https://existing.com">existing link</a> and https://new.com</p>';
      render(<SanitizeHtml content={content} />);
      const existingLink = screen.getByText('existing link');
      const newLink = screen.getByText('https://new.com');
      expect(existingLink).toBeInTheDocument();
      expect(newLink).toBeInTheDocument();
      expect(existingLink).toHaveAttribute('href', 'https://existing.com');
      expect(newLink).toHaveAttribute('href', 'https://new.com');
    });

    it('should sanitize content before linkifying to prevent XSS', () => {
      const malicious =
        '<script>alert("XSS")</script>Visit https://example.com';
      render(<SanitizeHtml content={malicious} />);
      const link = screen.getByText('https://example.com');
      expect(link).toBeInTheDocument();
      expect(screen.queryByText('alert')).not.toBeInTheDocument();
      expect(document.body.innerHTML).not.toContain('<script>');
    });

    it('should handle empty content', () => {
      const { container } = render(<SanitizeHtml content="" />);
      expect(container.firstChild).toBeNull();
    });

    it('should handle undefined content', () => {
      const { container } = render(<SanitizeHtml content={undefined} />);
      expect(container.firstChild).toBeNull();
    });

    it('should apply linkifyOptions to all generated links', () => {
      const content = 'Visit https://example.com and http://test.com';
      render(
        <SanitizeHtml
          content={content}
          linkifyOptions={{ target: '_parent' }}
        />,
      );
      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_parent');
      });
    });

    it('should preserve text content while converting URLs', () => {
      const content = 'Before https://example.com after';
      render(<SanitizeHtml content={content} />);
      expect(screen.getByText(/Before/)).toBeInTheDocument();
      expect(screen.getByText(/after/)).toBeInTheDocument();
      expect(screen.getByText('https://example.com')).toBeInTheDocument();
    });
  });
});
