export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'raw';

export type ParsedLogEntry = {
  id: string;
  sourceName: string;
  sourceLine: number;
  timestamp?: string;
  sequence?: number;
  level: LogLevel;
  scope?: string;
  summary: string;
  raw: string;
  payload?: unknown;
  displayPayload?: unknown;
  request?: {
    phase?: string;
    id?: string;
    method?: string;
    url?: string;
    duration?: number;
    status?: number;
    startTime?: number;
    requestBody?: unknown;
    responseBody?: unknown;
    requestHeaders?: Record<string, unknown>;
    responseHeaders?: Record<string, unknown>;
    details?: Record<string, unknown>;
  };
};

export type LogSource = {
  name: string;
  text: string;
};

const LOG_LINE_REGEXP = /^(\S+)\|(\d+)\s+(\w+):\s+\[([^\]]*)\]\s+MSG:\s*(.*)$/;
const BRACKET_LOG_LINE_REGEXP =
  /^\[([^\]]+)\]\s+\[([^\]]+)\]\s+\[([^\]]*)\]\s*(.*)$/;

const CSS_CHUNK_REGEXP = /^\s*(?:background-color|color|font-weight)\s*:/m;

const isLogLevel = (value: string) =>
  ['debug', 'info', 'warn', 'error', 'verbose'].includes(value.toLowerCase());

const normalizeLogLevel = (value: string): LogLevel => {
  const level = value.toLowerCase();

  if (level === 'verbose') {
    return 'debug';
  }

  return isLogLevel(level) ? (level as LogLevel) : 'raw';
};

const stringifyPart = (value: unknown): string => {
  if (typeof value === 'string') {
    return value;
  }

  if (value === undefined) {
    return '';
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
};

const parseJsonSafely = (text: string): unknown | undefined => {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
};

const parseJsonStringValue = (value: unknown): unknown => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmedValue = value.trim();

  if (
    (!trimmedValue.startsWith('{') || !trimmedValue.endsWith('}')) &&
    (!trimmedValue.startsWith('[') || !trimmedValue.endsWith(']'))
  ) {
    return value;
  }

  return parseJsonSafely(trimmedValue) ?? value;
};

const getRecordValue = (
  value: unknown,
): Record<string, unknown> | undefined => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return undefined;
  }

  return value as Record<string, unknown>;
};

const parseStyledConsolePayload = (payload: unknown): unknown | undefined => {
  if (!Array.isArray(payload) || typeof payload[0] !== 'string') {
    return undefined;
  }

  const [, candidate] = payload[0].match(/:%c\s+([\s\S]+)$/) || [];

  if (!candidate) {
    return undefined;
  }

  return parseJsonSafely(candidate);
};

const getUsefulPayload = (payload: unknown): unknown => {
  const styledPayload = parseStyledConsolePayload(payload);

  if (styledPayload) {
    return styledPayload;
  }

  if (!Array.isArray(payload)) {
    return payload;
  }

  const withoutCss = payload.filter(
    (item, index) =>
      index === 0 || typeof item !== 'string' || !CSS_CHUNK_REGEXP.test(item),
  );

  return withoutCss.length === 1 ? withoutCss[0] : withoutCss;
};

const getRequestInfo = (
  displayPayload: unknown,
): ParsedLogEntry['request'] | undefined => {
  if (!Array.isArray(displayPayload)) {
    return undefined;
  }

  const [message, method, url, details] = displayPayload;

  if (
    typeof message !== 'string' ||
    (!message.includes('beforeRequest') && !message.includes('afterRequest'))
  ) {
    return undefined;
  }

  const requestDetails = getRecordValue(details);
  const requestHeaders = getRecordValue(requestDetails?.requestHeaders);
  const responseHeaders = getRecordValue(requestDetails?.responseHeaders);
  const phase = message.includes('beforeRequest')
    ? 'beforeRequest'
    : 'afterRequest';

  return {
    phase,
    id: typeof requestDetails?.id === 'string' ? requestDetails.id : undefined,
    method: typeof method === 'string' ? method : undefined,
    url: typeof url === 'string' ? url : undefined,
    duration:
      typeof requestDetails?.duration === 'number'
        ? requestDetails.duration
        : undefined,
    status:
      typeof requestDetails?.status === 'number'
        ? requestDetails.status
        : undefined,
    startTime:
      typeof requestDetails?.startTime === 'number'
        ? requestDetails.startTime
        : undefined,
    requestBody: parseJsonStringValue(requestDetails?.requestBody),
    responseBody: parseJsonStringValue(requestDetails?.responseBody),
    requestHeaders,
    responseHeaders,
    details: requestDetails,
  };
};

const getSummary = (displayPayload: unknown): string => {
  const request = getRequestInfo(displayPayload);

  if (request) {
    return [
      request.phase,
      request.method,
      request.status,
      request.duration !== undefined ? `${request.duration}ms` : undefined,
      request.url,
    ]
      .filter(Boolean)
      .join(' ');
  }

  if (Array.isArray(displayPayload)) {
    const parts = displayPayload.slice(0, 4).map(stringifyPart).filter(Boolean);

    return parts.join(' ');
  }

  if (typeof displayPayload === 'string') {
    return displayPayload;
  }

  return stringifyPart(displayPayload);
};

const parseLine = (
  line: string,
  sourceName: string,
  sourceLine: number,
): ParsedLogEntry => {
  const id = `${sourceName}:${sourceLine}`;
  const match = line.match(LOG_LINE_REGEXP);

  if (!match) {
    const bracketMatch = line.match(BRACKET_LOG_LINE_REGEXP);

    if (bracketMatch) {
      const [, timestamp, levelText, scope, payloadText] = bracketMatch;

      return {
        id,
        sourceName,
        sourceLine,
        timestamp,
        level: normalizeLogLevel(levelText),
        scope,
        summary: getSummary(payloadText),
        raw: line,
        displayPayload: payloadText,
      };
    }

    return createRawEntry(line, sourceName, sourceLine);
  }

  const [, timestamp, sequenceText, levelText, scope, payloadText] = match;
  const payload = parseJsonSafely(payloadText);
  const displayPayload =
    payload === undefined ? payloadText : getUsefulPayload(payload);
  const request = getRequestInfo(displayPayload);

  return {
    id,
    sourceName,
    sourceLine,
    timestamp,
    sequence: Number(sequenceText),
    level: normalizeLogLevel(levelText),
    scope,
    summary: getSummary(displayPayload),
    raw: line,
    payload,
    displayPayload,
    request,
  };
};

const createRawEntry = (
  line: string,
  sourceName: string,
  sourceLine: number,
): ParsedLogEntry => ({
  id: `${sourceName}:${sourceLine}`,
  sourceName,
  sourceLine,
  level: 'raw',
  summary: line,
  raw: line,
});

const isContinuationLine = (line: string) =>
  !LOG_LINE_REGEXP.test(line) && !BRACKET_LOG_LINE_REGEXP.test(line);

const appendContinuationLine = (entry: ParsedLogEntry, line: string) => {
  entry.raw = `${entry.raw}\n${line}`;

  if (typeof entry.displayPayload === 'string') {
    entry.displayPayload = `${entry.displayPayload}\n${line}`;
    entry.summary = getSummary(entry.displayPayload);
  } else {
    entry.summary = `${entry.summary}\n${line}`.trim();
  }
};

export const parseLogSources = (sources: LogSource[]): ParsedLogEntry[] => {
  return sources.flatMap(({ name, text }) =>
    text.split(/\r?\n/).reduce<ParsedLogEntry[]>((entries, line, index) => {
      if (!line.trim()) {
        return entries;
      }

      const sourceLine = index + 1;
      const previousEntry = entries[entries.length - 1];

      if (previousEntry && isContinuationLine(line)) {
        appendContinuationLine(previousEntry, line);

        return entries;
      }

      entries.push(parseLine(line, name, sourceLine));

      return entries;
    }, []),
  );
};

export const getLevelCounts = (entries: ParsedLogEntry[]) => {
  return entries.reduce(
    (acc, entry) => {
      acc[entry.level] += 1;

      return acc;
    },
    {
      debug: 0,
      info: 0,
      warn: 0,
      error: 0,
      raw: 0,
    } satisfies Record<LogLevel, number>,
  );
};
