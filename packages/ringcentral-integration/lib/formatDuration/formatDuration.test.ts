import { formatDuration, formatDurationWithLocale } from '.';
import { expect } from 'chai';

describe('formatDuration', () => {
  it('should be a function', () => {
    expect(formatDuration).to.be.a('function');
  });
  const pairs = {
    '00:00': 0,
    '00:01': 1,
    '00:59': 59,
    '01:00': 60,
    '01:01': 61,
    '01:59': 119,
    '10:00': 600,
    '11:00': 660,
    '01:00:00': 3600,
    '10:00:00': 36000,
  };
  describe('formatDuration with number or string type value', () => {
    it('formatted string should be expected', () => {
      Object.entries(pairs).forEach(([result, duration]) => {
        expect(formatDuration(duration)).to.equal(result);
        expect(formatDuration(duration.toString())).to.equal(result);
      });
    });
  });
  describe('formatDuration with NaN or undefined', () => {
    it('formatted string should be expected', () => {
      expect(formatDuration(NaN)).to.equal('--:--');
      expect(formatDuration(undefined)).to.equal('--:--');
    });
    it('formatted string should be expected with custom invalid', () => {
      expect(formatDuration(NaN, '--')).to.equal('--');
      expect(formatDuration(undefined, '00:00')).to.equal('00:00');
    });
  });
  describe('formatDurationWithLocale', () => {
    const locale = { day: 'd', hr: 'h', min: 'm', sec: 's' };

    it('should format duration correctly for seconds', () => {
      expect(formatDurationWithLocale(45, locale)).to.equal('45 s');
    });

    it('should format duration correctly for minutes and seconds', () => {
      expect(formatDurationWithLocale(125, locale)).to.equal('2 m 5 s');
    });

    it('should format duration correctly for hours, minutes and seconds', () => {
      expect(formatDurationWithLocale(3665, locale)).to.equal('1 h 1 m 5 s');
    });

    it('should format duration correctly for days, hours, minutes and seconds', () => {
      expect(formatDurationWithLocale(90061, locale)).to.equal(
        '1 d 1 h 1 m 1 s',
      );
    });

    it('should format duration correctly for more than one month', () => {
      expect(formatDurationWithLocale(90061 * 40, locale)).to.equal(
        '41 d 16 h 40 m 40 s',
      );
    });

    it('should return empty string for null or undefined duration', () => {
      expect(formatDurationWithLocale(null, locale)).to.equal('');
      expect(formatDurationWithLocale(undefined, locale)).to.equal('');
    });

    it('should return empty string for zero duration', () => {
      expect(formatDurationWithLocale(0, locale)).to.equal('');
    });

    describe('omitting trailing zero units', () => {
      it('should omit zero seconds when minutes are non-zero', () => {
        expect(formatDurationWithLocale(120, locale)).to.equal('2 m');
      });

      it('should omit zero minutes and seconds when hours are non-zero', () => {
        expect(formatDurationWithLocale(3600, locale)).to.equal('1 h');
      });

      it('should omit zero hours, minutes and seconds when days are non-zero', () => {
        expect(formatDurationWithLocale(86400, locale)).to.equal('1 d');
      });

      it('should omit only trailing zero seconds', () => {
        expect(formatDurationWithLocale(3720, locale)).to.equal('1 h 2 m');
      });

      it('should omit trailing zero minutes and seconds', () => {
        expect(formatDurationWithLocale(3600, locale)).to.equal('1 h');
      });

      it('should keep non-zero middle units even if trailing units are zero', () => {
        expect(formatDurationWithLocale(93603, locale)).to.equal('1 d 2 h 3 s');
      });

      it('should handle complex scenarios with multiple trailing zeros', () => {
        expect(formatDurationWithLocale(183600, locale)).to.equal('2 d 3 h');
      });

      it('should handle scenarios with zero middle units but non-zero trailing units', () => {
        expect(formatDurationWithLocale(86405, locale)).to.equal('1 d 5 s');
        expect(formatDurationWithLocale(86520, locale)).to.equal('1 d 2 m');
      });

      it('should format exact hour durations correctly', () => {
        expect(formatDurationWithLocale(7200, locale)).to.equal('2 h');
      });

      it('should format exact day durations correctly', () => {
        expect(formatDurationWithLocale(259200, locale)).to.equal('3 d');
      });
    });
  });
});
