import { expect } from 'chai';
import getIntlDateTimeFormatter, {
  getFormatter,
  DEFAULT_DATE_OPTIONS,
  DEFAULT_DATE_TIME_OPTIONS,
  DEFAULT_TIME_OPTIONS,
} from './';

describe('getFormatter', () => {
  it('should be a function', () => {
    expect(getFormatter).to.be.a('function');
  });
  it('should return a Intl.DateTimeFormatter instance', () => {
    expect(getFormatter('en-US')).to.exist;
  });
  it('should cache and reuse instance if locale and options are identical', () => {
    ['en-US', 'fr-FR', 'de-DE'].forEach((locale) => {
      [{ id: 0 }, { id: 1 }].forEach((options) => {
        const formatter = getFormatter(locale, options);
        expect(getFormatter(locale, options)).to.equal(formatter);
      });
    });
  });
});

describe('getIntlDateTimeFormatter', () => {
  it('should be a function', () => {
    expect(getIntlDateTimeFormatter).to.be.a('function');
  });
  it('should return a function', () => {
    expect(getIntlDateTimeFormatter()).to.be.a('function');
  });
  it('should allow customizing options', () => {
    const testDateTimeOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const testTimeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    const testDateOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const intlFormatter = getIntlDateTimeFormatter({
      dateTimeOptions: testDateTimeOptions,
      dateOptions: testDateOptions,
      timeOptions: testTimeOptions,
    });
    const locale = 'en-US';
    const now = Date.now();
    expect(intlFormatter({
      utcTimestamp: now,
      locale,
      type: 'long',
    })).to.equal(getFormatter(locale, testDateTimeOptions).format(now));
    expect(intlFormatter({
      utcTimestamp: now,
      locale,
      type: 'date',
    })).to.equal(getFormatter(locale, testDateOptions).format(now));
    expect(intlFormatter({
      utcTimestamp: now,
      locale,
      type: 'time',
    })).to.equal(getFormatter(locale, testTimeOptions).format(now));
  });
  describe('intlDateTimeFormatter', () => {
    const intlFormatter = getIntlDateTimeFormatter();
    const locale = 'en-US';
    const now = Date.now();
    const yesterday = Date.now() - (24 * 60 * 60 * 1000);
    it('should format timestamp to date-time string if type === "long"', () => {
      const formatter = getFormatter(locale, DEFAULT_DATE_TIME_OPTIONS);
      expect(intlFormatter({
        utcTimestamp: now,
        locale,
        type: 'long',
      })).to.equal(formatter.format(now));
      expect(intlFormatter({
        utcTimestamp: yesterday,
        locale,
        type: 'long',
      })).to.equal(formatter.format(yesterday));
    });
    it('should format timestamp to date string if type === "date"', () => {
      const formatter = getFormatter(locale, DEFAULT_DATE_OPTIONS);
      expect(intlFormatter({
        utcTimestamp: now,
        locale,
        type: 'date',
      })).to.equal(formatter.format(now));
      expect(intlFormatter({
        utcTimestamp: yesterday,
        locale,
        type: 'date',
      })).to.equal(formatter.format(yesterday));
    });
    it('should format timestamp to time string if type === "time"', () => {
      const formatter = getFormatter(locale, DEFAULT_TIME_OPTIONS);
      expect(intlFormatter({
        utcTimestamp: now,
        locale,
        type: 'time',
      })).to.equal(formatter.format(now));
      expect(intlFormatter({
        utcTimestamp: yesterday,
        locale,
        type: 'time',
      })).to.equal(formatter.format(yesterday));
    });
    it('should format timestamp to time string if type is not defined and time is today', () => {
      const formatter = getFormatter(locale, DEFAULT_TIME_OPTIONS);
      expect(intlFormatter({
        utcTimestamp: now,
        locale,
      })).to.equal(formatter.format(now));
    });
    it('should format timestamp to date string if type is not defined and time is not today',
      () => {
        const formatter = getFormatter(locale, DEFAULT_DATE_OPTIONS);
        expect(intlFormatter({
          utcTimestamp: yesterday,
          locale,
        })).to.equal(formatter.format(yesterday));
      }
    );
    it('should support iso formatted timestamp string', () => {
      expect(() => {
        intlFormatter({
          utcTimestamp: (new Date()).toISOString(),
          locale,
        });
      }).to.not.throw();
    });
  });
});
