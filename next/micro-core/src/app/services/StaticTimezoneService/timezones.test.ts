import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import { StaticTimezoneService } from './StaticTimezoneService';
import {
  STATIC_TIMEZONE_LIST,
  TIMEZONE_UTC,
  type ITimezone,
} from './timezones';

dayjs.extend(utc);
dayjs.extend(timezone);

const EXPECTED_TIMEZONE_KEYS = ['description', 'id', 'name', 'utc'];
const TIMEZONE_CONVERSION_CASES = [
  {
    timezoneName: 'Asia/Shanghai',
    utcTime: '2025-03-15T10:00:00.000Z',
    expectedLocalTime: '2025-03-15 18:00',
    expectedOffset: 480,
  },
  {
    timezoneName: 'America/New_York',
    utcTime: '2025-07-01T15:00:00.000Z',
    expectedLocalTime: '2025-07-01 11:00',
    expectedOffset: -240,
  },
  {
    timezoneName: 'America/New_York',
    utcTime: '2025-12-01T15:00:00.000Z',
    expectedLocalTime: '2025-12-01 10:00',
    expectedOffset: -300,
  },
  {
    timezoneName: 'Australia/Sydney',
    utcTime: '2025-01-15T12:00:00.000Z',
    expectedLocalTime: '2025-01-15 23:00',
    expectedOffset: 660,
  },
];

function getTimezoneByName(name: string): ITimezone {
  const timezoneItem = STATIC_TIMEZONE_LIST.find(
    (candidate) => candidate.name === name,
  );

  if (!timezoneItem) {
    throw new Error(`Cannot find timezone "${name}" in STATIC_TIMEZONE_LIST`);
  }

  return timezoneItem;
}

describe('static timezone data', () => {
  test('should expose only id, name, and description for static timezones', () => {
    expect(Object.keys(TIMEZONE_UTC).sort()).toEqual(EXPECTED_TIMEZONE_KEYS);
    expect(Object.keys(getTimezoneByName('America/New_York')).sort()).toEqual(
      EXPECTED_TIMEZONE_KEYS,
    );
  });

  test('should keep timezone ids unique', () => {
    const ids = STATIC_TIMEZONE_LIST.map((timezoneItem) => timezoneItem.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  test('should keep timezone names unique', () => {
    const names = STATIC_TIMEZONE_LIST.map((timezoneItem) => timezoneItem.name);

    expect(new Set(names).size).toBe(names.length);
  });

  test('should keep timezone descriptions sorted alphabetically', () => {
    const descriptions = STATIC_TIMEZONE_LIST.map(
      (timezoneItem) => timezoneItem.description,
    );
    const sortedDescriptions = [...descriptions].sort((a, b) =>
      a.localeCompare(b),
    );

    expect(descriptions).toEqual(sortedDescriptions);
  });

  test('should attach utc aliases for every timezone item', () => {
    STATIC_TIMEZONE_LIST.forEach((timezoneItem) => {
      expect(Array.isArray(timezoneItem.utc)).toBe(true);
      expect(timezoneItem.utc.length).toBeGreaterThan(0);
      expect(timezoneItem.utc).toContain(timezoneItem.name);
    });
  });

  test('should expose a stable utc alias reference set', () => {
    const utcAliases = Array.from(
      new Set(STATIC_TIMEZONE_LIST.flatMap((timezoneItem) => timezoneItem.utc)),
    );

    expect(utcAliases.length).toBeGreaterThan(STATIC_TIMEZONE_LIST.length);
    expect(utcAliases).toEqual(
      expect.arrayContaining([
        'GMT',
        'Europe/London',
        'America/Toronto',
        'Asia/Rangoon',
        'Pacific/Tongatapu',
      ]),
    );
    expect(utcAliases).not.toContain('');
  });

  test('should include merged or aliased utc values for representative entries', () => {
    expect(getTimezoneByName('GMT').utc).toEqual(
      expect.arrayContaining([
        'Africa/Abidjan',
        'Africa/Accra',
        'Africa/Bamako',
        'Africa/Banjul',
        'Africa/Bissau',
        'Africa/Conakry',
        'Africa/Dakar',
        'Africa/Freetown',
        'Africa/Lome',
        'Africa/Monrovia',
        'Africa/Nouakchott',
        'Africa/Ouagadougou',
        'Africa/Sao_Tome',
        'Atlantic/Reykjavik',
        'Atlantic/St_Helena',
        'America/Danmarkshavn',
        'Etc/GMT',
        'GMT',
      ]),
    );
    expect(getTimezoneByName('Europe/Lisbon').utc).toEqual([
      'Europe/Isle_of_Man',
      'Europe/Guernsey',
      'Europe/Jersey',
      'Europe/London',
      'Atlantic/Canary',
      'Atlantic/Faeroe',
      'Atlantic/Faroe',
      'Atlantic/Madeira',
      'Europe/Dublin',
      'Europe/Lisbon',
    ]);
    expect(getTimezoneByName('America/Tijuana').utc).toEqual([
      'America/Tijuana',
      'America/Santa_Isabel',
    ]);
    expect(getTimezoneByName('Asia/Yangon').utc).toEqual([
      'Asia/Rangoon',
      'Indian/Cocos',
      'Asia/Yangon',
    ]);
  });

  test('should use valid IANA timezone names for every non-GMT entry', () => {
    STATIC_TIMEZONE_LIST.filter(
      (timezoneItem) => timezoneItem.name !== TIMEZONE_UTC.name,
    ).forEach((timezoneItem) => {
      expect(() => {
        new Intl.DateTimeFormat('en-US', {
          timeZone: timezoneItem.name,
        });
      }).not.toThrow();
    });
  });

  test.each(TIMEZONE_CONVERSION_CASES)(
    'should convert $utcTime correctly for $timezoneName',
    ({ timezoneName, utcTime, expectedLocalTime, expectedOffset }) => {
      const timezoneItem = getTimezoneByName(timezoneName);
      const localizedTime = dayjs.utc(utcTime).tz(timezoneItem.name);

      expect(localizedTime.format('YYYY-MM-DD HH:mm')).toBe(expectedLocalTime);
      expect(localizedTime.utcOffset()).toBe(expectedOffset);
    },
  );
});

describe('StaticTimezoneService timezone matching', () => {
  let service: StaticTimezoneService;

  beforeEach(() => {
    service = new StaticTimezoneService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should match system timezone by utc aliases when guessed timezone is not a primary name', () => {
    jest.spyOn(dayjs.tz, 'guess').mockReturnValue('America/Toronto');

    expect(service.findSystemTimezone()).toEqual(
      expect.objectContaining({
        name: 'America/New_York',
      }),
    );
  });

  test('should expose static list, UTC default, and timezone lookup by ID', () => {
    expect(service.timezonesList).toBe(STATIC_TIMEZONE_LIST);
    expect(service.defaultTimezone).toBe(TIMEZONE_UTC);
    expect(service.getTimezoneById(TIMEZONE_UTC.id)).toBe(TIMEZONE_UTC);
  });

  test('should return undefined when system timezone cannot be guessed', () => {
    jest.spyOn(dayjs.tz, 'guess').mockReturnValue('');

    expect(service.findSystemTimezone()).toBeUndefined();
  });

  test('should return undefined and log warning when system timezone detection fails', () => {
    const guessError = new Error('timezone unavailable');
    const serviceLogger = (
      service as unknown as {
        logger: { warn: (...args: unknown[]) => void };
      }
    ).logger;
    const warnSpy = jest.spyOn(serviceLogger, 'warn').mockImplementation();

    jest.spyOn(dayjs.tz, 'guess').mockImplementation(() => {
      throw guessError;
    });

    expect(service.findSystemTimezone()).toBeUndefined();
    expect(warnSpy).toHaveBeenCalledWith(
      'Failed to find system timezone',
      guessError,
    );
  });

  test('should fallback to UTC when guessed timezone is unsupported', () => {
    jest.spyOn(dayjs.tz, 'guess').mockReturnValue('Mars/Olympus_Mons');

    expect(service.getSystemTimezone()).toEqual(TIMEZONE_UTC);
  });

  test('should resolve timezone aliases from utc values when querying by name', () => {
    expect(service.getTimezoneByName('Asia/Rangoon')).toEqual(
      expect.objectContaining({
        name: 'Asia/Yangon',
      }),
    );
  });

  test('should return undefined for empty timezone names and unknown IDs', () => {
    expect(service.getTimezoneByName('')).toBeUndefined();
    expect(service.getTimezoneById('unknown')).toBeUndefined();
  });
});
