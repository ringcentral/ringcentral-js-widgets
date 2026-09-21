import {
  MAX_SIP_TRANSPORT_LOG_LENGTH,
  formatTransportEventSummary,
  formatWebphoneSessionSummary,
  truncateLogContent,
} from '../../../src/app/services/Webphone/webphoneLogSanitizer';

const TRUNCATED_SUFFIX = '… [truncated]';

describe('webphoneLogSanitizer', () => {
  describe('MAX_SIP_TRANSPORT_LOG_LENGTH', () => {
    it('should be 2000', () => {
      expect(MAX_SIP_TRANSPORT_LOG_LENGTH).toBe(2000);
    });
  });

  describe('truncateLogContent', () => {
    it('should return short content unchanged', () => {
      const short = 'SIP INVITE received';
      expect(truncateLogContent(short)).toBe(short);
    });

    it('should return empty string unchanged', () => {
      expect(truncateLogContent('')).toBe('');
    });

    it('should truncate content longer than default max and append suffix', () => {
      const long = 'x'.repeat(3000);
      const result = truncateLogContent(long);
      expect(result.length).toBe(MAX_SIP_TRANSPORT_LOG_LENGTH);
      expect(result.endsWith(TRUNCATED_SUFFIX)).toBe(true);
      expect(result).toBe(
        'x'.repeat(MAX_SIP_TRANSPORT_LOG_LENGTH - TRUNCATED_SUFFIX.length) +
          TRUNCATED_SUFFIX,
      );
    });

    it('should use custom maxLength when provided', () => {
      const content = 'a'.repeat(100);
      expect(truncateLogContent(content, 50)).toBe(
        'a'.repeat(50 - TRUNCATED_SUFFIX.length) + TRUNCATED_SUFFIX,
      );
    });

    it('should not truncate when content length equals maxLength', () => {
      const exact = 'a'.repeat(MAX_SIP_TRANSPORT_LOG_LENGTH);
      expect(truncateLogContent(exact)).toBe(exact);
    });

    it('should stringify non-string input and append suffix', () => {
      const result = truncateLogContent(12345 as unknown as string);
      expect(result).toBe('12345' + TRUNCATED_SUFFIX);
    });
  });

  describe('formatTransportEventSummary', () => {
    it('should include event name and safe payload fields', () => {
      const payload = {
        message: 'Connection failed',
        code: 'ECONNREFUSED',
        sessionId: 's-123',
      };
      const result = formatTransportEventSummary('transportError', payload);
      expect(result).toContain('transportError');
      expect(result).toContain('Connection failed');
      expect(result).toContain('ECONNREFUSED');
      expect(result).toContain('s-123');
    });

    it('should extract request.method for request object', () => {
      const payload = { request: { method: 'INVITE' }, id: 'abc' };
      const result = formatTransportEventSummary('invite', payload);
      expect(result).toContain('invite');
      expect(result).toContain('INVITE');
      expect(result).toContain('abc');
    });

    it('should represent array values as [N items] for safe keys', () => {
      const payload = { reason: [1, 2, 3], message: 'ok' };
      const result = formatTransportEventSummary('event', payload);
      expect(result).toContain('3 items');
      expect(result).toContain('ok');
    });

    it('should handle null payload', () => {
      const result = formatTransportEventSummary('closed', null);
      expect(result).toContain('closed');
      expect(result).toContain('value');
    });

    it('should handle string payload when no safe keys', () => {
      const result = formatTransportEventSummary('event', 'raw message');
      expect(result).toContain('event');
      expect(result).toContain('raw message');
    });

    it('should use [no summary] for object with no safe keys', () => {
      const payload = { sdp: 'v=0...', internal: {} };
      const result = formatTransportEventSummary('event', payload);
      expect(result).toContain('event');
      expect(result).toContain('[no summary]');
    });

    it('should truncate output when total length exceeds maxLength', () => {
      const payload = { message: 'x'.repeat(3000) };
      const result = formatTransportEventSummary(
        'transportError',
        payload,
        100,
      );
      expect(result.length).toBe(100);
      expect(result.endsWith(TRUNCATED_SUFFIX)).toBe(true);
      expect(result).toContain('transportError');
    });

    it('should use default max length when not provided', () => {
      const payload = { message: 'a'.repeat(2500) };
      const result = formatTransportEventSummary('event', payload);
      expect(result.length).toBe(MAX_SIP_TRANSPORT_LOG_LENGTH);
      expect(result.endsWith(TRUNCATED_SUFFIX)).toBe(true);
    });

    it('should include statusCode or status_code when present', () => {
      expect(
        formatTransportEventSummary('error', { statusCode: 503 }),
      ).toContain('503');
      expect(
        formatTransportEventSummary('error', { status_code: 404 }),
      ).toContain('404');
    });

    it('should include direction and id for session-like payload', () => {
      const payload = { id: 'sess-1', direction: 'inbound' };
      const result = formatTransportEventSummary('invite', payload);
      expect(result).toContain('sess-1');
      expect(result).toContain('inbound');
    });
  });

  describe('formatWebphoneSessionSummary', () => {
    it('keeps session diagnostics without serializing SIP internals', () => {
      const result = formatWebphoneSessionSummary({
        id: 'session-1',
        __rc_partyData: { sessionId: 'telephony-1' },
        __rc_callStatus: 'finished',
        __rc_direction: 'Outbound',
        status: 9,
        hasOffer: true,
        hasAnswer: true,
        request: { headers: { Authorization: 'secret' } },
        body: { body: 'sdp' },
      });

      expect(result).toContain('session-1');
      expect(result).toContain('telephony-1');
      expect(result).toContain('finished');
      expect(result).not.toContain('Authorization');
      expect(result).not.toContain('sdp');
      expect(result.length).toBeLessThanOrEqual(MAX_SIP_TRANSPORT_LOG_LENGTH);
    });
  });
});
