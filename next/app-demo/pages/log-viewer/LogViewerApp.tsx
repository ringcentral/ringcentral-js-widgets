import {
  CopyMd,
  FileMd,
  FolderMd,
  SearchMd,
  TrashMd,
  UploadMd,
} from '@ringcentral/spring-icon';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, {
  type ChangeEvent,
  type FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  getLevelCounts,
  type LogLevel,
  type LogSource,
  type ParsedLogEntry,
  parseLogSources,
} from './logParser';

const ENTRY_ROW_HEIGHT = 58;
const ENTRY_OVERSCAN_ROWS = 8;

const ACCEPTED_EXTENSIONS = [
  '.log',
  '.txt',
  '.json',
  '.ts',
  '.js',
  '.har',
  '.out',
  '.trace',
];

const LEVELS: LogLevel[] = ['error', 'warn', 'info', 'debug', 'raw'];

const DEFAULT_LEVELS = new Set<LogLevel>(LEVELS);
const DEFAULT_FONT_SCALE = 0.7;
const MIN_FONT_SCALE = 0.3;
const MAX_FONT_SCALE = 1.2;

const PANEL_WIDTHS = {
  source: {
    default: 280,
    min: 220,
    max: 520,
  },
  entries: {
    default: 520,
    min: 360,
    max: 900,
  },
} as const;

const LEVEL_THEME: Record<
  LogLevel,
  {
    badge: string;
    border: string;
    chip: string;
    row: string;
    selectedRow: string;
  }
> = {
  error: {
    badge: 'border-danger bg-danger-t10 text-danger',
    border: 'border-l-danger',
    chip: 'border-danger bg-danger-t10 text-danger',
    row: 'hover:bg-danger-t10',
    selectedRow: 'bg-danger-t10',
  },
  warn: {
    badge: 'border-warning-t20 bg-warning-t10 text-warning-f',
    border: 'border-l-warning-f',
    chip: 'border-warning-t20 bg-warning-t10 text-warning-f',
    row: 'hover:bg-warning-t10',
    selectedRow: 'bg-warning-t10',
  },
  info: {
    badge: 'border-primary-b bg-primary-b text-neutral-w0',
    border: 'border-l-primary-f',
    chip: 'border-primary-b bg-primary-b text-neutral-w0',
    row: 'hover:bg-primary-b',
    selectedRow: 'bg-primary-b',
  },
  debug: {
    badge: 'border-extra-amethyst bg-neutral-b5 text-extra-amethyst',
    border: 'border-l-extra-amethyst',
    chip: 'border-extra-amethyst bg-neutral-b5 text-extra-amethyst',
    row: 'hover:bg-neutral-b5',
    selectedRow: 'bg-neutral-b5',
  },
  raw: {
    badge: 'border-neutral-b4 bg-neutral-b5 text-neutral-b1',
    border: 'border-l-neutral-b4',
    chip: 'border-neutral-b4 bg-neutral-b5 text-neutral-b1',
    row: 'hover:bg-neutral-b5',
    selectedRow: 'bg-neutral-b5',
  },
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const toFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} MB`;
};

const truncateText = (value: string, maxLength: number) =>
  value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;

const saveTextFile = (fileName: string, text: string) => {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  const link = document.createElement('a');

  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

const getReadablePayload = (value: unknown) => {
  if (value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
};

const hasReadablePayload = (value: unknown) =>
  value !== undefined && value !== null && getReadablePayload(value) !== '';

const getRequestDisplayPayload = (request: ParsedLogEntry['request']) => {
  if (!request) {
    return undefined;
  }

  return {
    phase: request.phase,
    method: request.method,
    url: request.url,
    status: request.status,
    duration: request.duration,
    id: request.id,
    startTime: request.startTime,
  };
};

const getEntrySearchText = (entry: ParsedLogEntry) =>
  [
    entry.timestamp,
    entry.level,
    entry.scope,
    entry.sourceName,
    entry.summary,
    entry.request?.method,
    entry.request?.url,
    getReadablePayload(entry.request?.requestBody),
    getReadablePayload(entry.request?.responseBody),
    getReadablePayload(entry.request?.requestHeaders),
    getReadablePayload(entry.request?.responseHeaders),
    entry.raw,
    getReadablePayload(entry.displayPayload),
  ]
    .filter(Boolean)
    .join('\n')
    .toLowerCase();

const entryMatchesExcludeRule = (entry: ParsedLogEntry, rule: ExcludeRule) => {
  switch (rule.type) {
    case 'raw':
      return entry.raw === rule.value;
    case 'summary':
      return entry.summary === rule.value;
    case 'scope':
      return entry.scope === rule.value;
    case 'source':
      return entry.sourceName === rule.value;
    case 'requestUrl':
      return entry.request?.url === rule.value;
    case 'requestId':
      return entry.request?.id === rule.value;
    case 'level':
      return entry.level === rule.value;
    default:
      return false;
  }
};

const buildExcludeRules = (entry: ParsedLogEntry): ExcludeRule[] =>
  (
    [
      ['summary', 'Same summary', entry.summary],
      ['scope', 'Same scope', entry.scope],
      ['level', 'Same level', entry.level],
      ['source', 'Same source file', entry.sourceName],
      ['requestUrl', 'Same request URL', entry.request?.url],
      ['requestId', 'Same request id', entry.request?.id],
      ['raw', 'Exact log line', entry.raw],
    ] satisfies Array<[ExcludeRule['type'], string, string | undefined]>
  ).flatMap(([type, label, value]) =>
    value
      ? [
          {
            id: `${type}:${value}`,
            type,
            label,
            value,
          },
        ]
      : [],
  );

const isTextLikeFile = (file: File) => {
  const fileName = file.name.toLowerCase();

  if (file.type.startsWith('image/')) {
    return false;
  }

  return ACCEPTED_EXTENSIONS.some((extension) => fileName.endsWith(extension));
};

const getRelativeFileName = (file: File) => {
  const fileWithRelativePath = file as File & { webkitRelativePath?: string };

  return fileWithRelativePath.webkitRelativePath || file.name;
};

const readFiles = async (fileList: FileList | File[]) => {
  const files = Array.from(fileList)
    .filter(isTextLikeFile)
    .sort((a, b) =>
      getRelativeFileName(a).localeCompare(getRelativeFileName(b)),
    );

  const sources = await Promise.all(
    files.map(async (file) => ({
      name: getRelativeFileName(file),
      text: await file.text(),
      size: file.size,
    })),
  );

  return sources;
};

type LoadedSource = LogSource & {
  size?: number;
};

type SearchFilter = {
  id: string;
  value: string;
};

type ExcludeRule = {
  id: string;
  type:
    | 'level'
    | 'raw'
    | 'scope'
    | 'source'
    | 'summary'
    | 'requestUrl'
    | 'requestId';
  label: string;
  value: string;
};

const ResizeHandle: FunctionComponent<{
  label: string;
  max: number;
  min: number;
  onWidthChange: (value: number) => void;
  width: number;
}> = ({ label, max, min, onWidthChange, width }) => {
  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const startX = event.clientX;
    const startWidth = width;
    const originalCursor = document.body.style.cursor;
    const originalUserSelect = document.body.style.userSelect;

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handlePointerMove = (moveEvent: PointerEvent) => {
      onWidthChange(clamp(startWidth + moveEvent.clientX - startX, min, max));
    };

    const cleanup = () => {
      document.body.style.cursor = originalCursor;
      document.body.style.userSelect = originalUserSelect;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', cleanup);
      window.removeEventListener('pointercancel', cleanup);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', cleanup);
    window.addEventListener('pointercancel', cleanup);
  };

  return (
    <button
      aria-label={label}
      className="group hidden w-2 cursor-col-resize items-center justify-center bg-neutral-b5 transition-colors hover:bg-primary-b lg:flex"
      onPointerDown={handlePointerDown}
      title={label}
      type="button"
    >
      <span className="h-12 w-1 rounded bg-neutral-b3 transition-colors group-hover:bg-primary-f" />
    </button>
  );
};

const SourceList: FunctionComponent<{
  sources: LoadedSource[];
  selectedSource: string;
  onSelectSource: (value: string) => void;
}> = ({ sources, selectedSource, onSelectSource }) => {
  const allSelected = selectedSource === 'all';
  const selectedSourceRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    selectedSourceRef.current?.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }, [selectedSource]);

  return (
    <div className="flex min-h-[180px] flex-col border-b border-neutral-b4 bg-neutral-b5 lg:min-h-0 lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-2 border-b border-neutral-b4 bg-neutral-b0 px-3 py-2 text-neutral-w0">
        <FolderMd className="size-4 flex-none text-primary-f" />
        <div className="typography-subtitle truncate">Sources</div>
      </div>
      <button
        className={clsx(
          'typography-mainText flex items-center justify-between gap-2 border-b border-l-4 border-neutral-b4 border-l-transparent px-3 py-2 text-left transition-colors hover:bg-primary-b',
          allSelected && 'border-l-primary-f bg-primary-b text-neutral-w0',
        )}
        onClick={() => onSelectSource('all')}
        type="button"
      >
        <span className="truncate">All sources</span>
        <span className={allSelected ? 'text-neutral-w0' : 'text-neutral-b2'}>
          {sources.length}
        </span>
      </button>
      <div className="min-h-0 flex-auto overflow-auto">
        {sources.map((source) => {
          const sourceSelected = selectedSource === source.name;

          return (
            <button
              className={clsx(
                'typography-mainText flex w-full items-start gap-2 border-b border-l-4 border-neutral-b4 border-l-transparent px-3 py-2 text-left transition-colors hover:bg-primary-b',
                sourceSelected &&
                  'border-l-primary-f bg-primary-b text-neutral-w0',
              )}
              key={source.name}
              onClick={() => onSelectSource(source.name)}
              ref={sourceSelected ? selectedSourceRef : undefined}
              type="button"
            >
              <FileMd
                className={clsx(
                  'mt-0.5 size-4 flex-none',
                  sourceSelected ? 'text-neutral-w0' : 'text-extra-denim',
                )}
              />
              <span className="min-w-0 flex-auto">
                <span className="block truncate">{source.name}</span>
                {source.size !== undefined ? (
                  <span
                    className={clsx(
                      'typography-label block',
                      sourceSelected ? 'text-neutral-w0' : 'text-neutral-b2',
                    )}
                  >
                    {toFileSize(source.size)}
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const LevelFilters: FunctionComponent<{
  activeLevels: Set<LogLevel>;
  levelCounts: Record<LogLevel, number>;
  onToggleLevel: (level: LogLevel) => void;
}> = ({ activeLevels, levelCounts, onToggleLevel }) => (
  <div className="flex flex-wrap gap-2">
    {LEVELS.map((level) => (
      <label
        className={clsx(
          'typography-mainText inline-flex items-center gap-1 rounded border px-2 py-1 transition-opacity',
          LEVEL_THEME[level].chip,
          !activeLevels.has(level) && 'opacity-50',
        )}
        key={level}
      >
        <input
          checked={activeLevels.has(level)}
          onChange={() => onToggleLevel(level)}
          type="checkbox"
        />
        <span>{level}</span>
        <span className="opacity-80">{levelCounts[level]}</span>
      </label>
    ))}
  </div>
);

const EntryList: FunctionComponent<{
  entries: ParsedLogEntry[];
  pinnedIds: Set<string>;
  selectedEntry?: ParsedLogEntry;
  selectedIds: Set<string>;
  scrollRequestKey: number;
  scrollTargetEntryId?: string;
  onSelectEntry: (entry: ParsedLogEntry) => void;
  onTogglePin: (entryId: string) => void;
  onToggleSelected: (entryId: string) => void;
}> = ({
  entries,
  pinnedIds,
  selectedEntry,
  selectedIds,
  scrollRequestKey,
  scrollTargetEntryId,
  onSelectEntry,
  onTogglePin,
  onToggleSelected,
}) => {
  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const scrollRoot = scrollRootRef.current;

    if (!scrollRoot) {
      return undefined;
    }

    const updateViewportHeight = () => {
      setViewportHeight(scrollRoot.clientHeight);
    };

    updateViewportHeight();

    const resizeObserver = new ResizeObserver(updateViewportHeight);

    resizeObserver.observe(scrollRoot);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const scrollRoot = scrollRootRef.current;

    if (!scrollRoot || !scrollTargetEntryId) {
      return;
    }

    const selectedIndex = entries.findIndex(
      (entry) => entry.id === scrollTargetEntryId,
    );

    if (selectedIndex < 0) {
      return;
    }

    scrollRoot.scrollTop = Math.max(
      selectedIndex * ENTRY_ROW_HEIGHT - scrollRoot.clientHeight / 2,
      0,
    );
    setScrollTop(scrollRoot.scrollTop);
  }, [entries, scrollRequestKey, scrollTargetEntryId]);

  const visibleStart = clamp(
    Math.floor(scrollTop / ENTRY_ROW_HEIGHT) - ENTRY_OVERSCAN_ROWS,
    0,
    entries.length,
  );
  const visibleCount =
    Math.ceil((viewportHeight || ENTRY_ROW_HEIGHT * 20) / ENTRY_ROW_HEIGHT) +
    ENTRY_OVERSCAN_ROWS * 2;
  const visibleEnd = clamp(visibleStart + visibleCount, 0, entries.length);
  const visibleEntries = entries.slice(visibleStart, visibleEnd);

  return (
    <div
      className="min-h-[260px] flex-auto overflow-auto border-b border-neutral-b4 bg-neutral-base lg:min-h-0 lg:border-b-0 lg:border-r"
      onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
      ref={scrollRootRef}
    >
      <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-neutral-b4 bg-neutral-b5 px-3 py-2">
        <SearchMd className="size-4 text-primary-f" />
        <div className="typography-subtitle">Matched logs</div>
        {entries.length > visibleEntries.length ? (
          <span className="">
            Showing logs {visibleStart + 1}-{visibleEnd} of {entries.length}{' '}
            matched logs.
          </span>
        ) : null}
      </div>

      <div
        className="relative"
        style={{ height: entries.length * ENTRY_ROW_HEIGHT }}
      >
        <div
          className="absolute inset-x-0 top-0"
          style={{
            transform: `translateY(${visibleStart * ENTRY_ROW_HEIGHT}px)`,
          }}
        >
          {visibleEntries.map((entry) => {
            const selected = selectedEntry?.id === entry.id;

            return (
              <div
                className={clsx(
                  'cursor-pointer',
                  'grid w-full grid-cols-[24px_42px_96px_64px_minmax(0,1fr)] gap-2 border-b border-l-4 border-neutral-b4 px-3 py-2 text-left transition-colors focus-visible:bg-primary-b focus-visible:text-neutral-w0 focus-visible:outline-none',
                  LEVEL_THEME[entry.level].border,
                  selected
                    ? 'bg-primary-b text-neutral-w0'
                    : LEVEL_THEME[entry.level].row,
                )}
                key={entry.id}
                onClick={() => onSelectEntry(entry)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelectEntry(entry);
                  }
                }}
                role="button"
                style={{ height: ENTRY_ROW_HEIGHT }}
                tabIndex={0}
              >
                <input
                  aria-label="Select log entry"
                  checked={selectedIds.has(entry.id)}
                  onChange={() => onToggleSelected(entry.id)}
                  onClick={(event) => event.stopPropagation()}
                  type="checkbox"
                />
                <button
                  className={clsx(
                    'typography-labelSemiBold rounded border px-1 text-center',
                    pinnedIds.has(entry.id)
                      ? 'border-primary-b bg-primary-b text-neutral-w0'
                      : 'border-neutral-b4 text-neutral-b2',
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                    onTogglePin(entry.id);
                  }}
                  title={pinnedIds.has(entry.id) ? 'Unpin' : 'Pin'}
                  type="button"
                >
                  Pin
                </button>
                <span
                  className={clsx(
                    'typography-label truncate',
                    selected ? 'text-neutral-w0' : 'text-neutral-b2',
                  )}
                >
                  {entry.timestamp?.slice(11, 23) || '-'}
                </span>
                <span
                  className={clsx(
                    'typography-labelSemiBold rounded border px-1 text-center uppercase',
                    LEVEL_THEME[entry.level].badge,
                  )}
                >
                  {entry.level}
                </span>
                <span className="min-w-0">
                  <span className="typography-mainText block truncate">
                    {entry.summary}
                  </span>
                  <span
                    className={clsx(
                      'typography-label block truncate',
                      selected ? 'text-neutral-w0' : 'text-neutral-b2',
                    )}
                  >
                    {entry.scope || entry.sourceName}:{entry.sourceLine}
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const JsonSection: FunctionComponent<{
  title: string;
  value: unknown;
  tone?: 'dark' | 'light';
}> = ({ title, value, tone = 'dark' }) => {
  if (!hasReadablePayload(value)) {
    return null;
  }

  return (
    <div className="mb-3">
      <div className="typography-subtitle mb-2">{title}</div>
      <pre
        className={clsx(
          'max-h-[42vh] overflow-auto rounded border p-3 typography-mainText',
          tone === 'dark'
            ? 'border-neutral-b0 bg-neutral-b0 text-neutral-w0'
            : 'whitespace-pre-wrap break-words border-neutral-b4 bg-neutral-b5',
        )}
      >
        {getReadablePayload(value)}
      </pre>
    </div>
  );
};

const DetailPanel: FunctionComponent<{
  entry?: ParsedLogEntry;
  onAddExcludeRule: (rule: ExcludeRule) => void;
  onCopyRaw: (entry: ParsedLogEntry) => void;
  onShowContext: (entry: ParsedLogEntry) => void;
}> = ({ entry, onAddExcludeRule, onCopyRaw, onShowContext }) => {
  const [excludeDialogOpen, setExcludeDialogOpen] = useState(false);
  const [selectedExcludeRuleId, setSelectedExcludeRuleId] = useState<string>();

  if (!entry) {
    return (
      <div className="flex min-h-[320px] flex-auto items-center justify-center bg-neutral-base text-neutral-b2 lg:min-h-0">
        Select a log entry
      </div>
    );
  }

  const requestDisplayPayload = getRequestDisplayPayload(entry.request);
  const parsedPayload = requestDisplayPayload || entry.displayPayload;
  const excludeRules = buildExcludeRules(entry);
  const selectedExcludeRule =
    excludeRules.find((rule) => rule.id === selectedExcludeRuleId) ||
    excludeRules[0];

  const openExcludeDialog = () => {
    setSelectedExcludeRuleId(excludeRules[0]?.id);
    setExcludeDialogOpen(true);
  };

  const closeExcludeDialog = () => {
    setExcludeDialogOpen(false);
  };

  const applyExcludeRule = () => {
    if (!selectedExcludeRule) {
      return;
    }

    onAddExcludeRule(selectedExcludeRule);
    closeExcludeDialog();
  };

  return (
    <div className="min-h-[320px] flex-auto overflow-auto bg-neutral-base p-4 lg:min-h-0">
      <div className="mb-3 grid grid-cols-2 gap-2 typography-mainText md:grid-cols-4">
        <div className="rounded border border-primary-b bg-primary-b p-2 text-neutral-w0">
          <div className="typography-label text-neutral-w0">Level</div>
          <div>{entry.level}</div>
        </div>
        <div className="rounded border border-neutral-b4 bg-success-t10 p-2">
          <div className="typography-label text-neutral-b2">Time</div>
          <div className="break-words">{entry.timestamp || '-'}</div>
        </div>
        <div className="rounded border border-neutral-b4 bg-warning-t10 p-2">
          <div className="typography-label text-neutral-b2">Scope</div>
          <div className="break-words">{entry.scope || '-'}</div>
        </div>
        <div className="rounded border border-neutral-b4 bg-neutral-b5 p-2">
          <div className="typography-label text-neutral-b2">Sequence</div>
          <div>{entry.sequence ?? '-'}</div>
        </div>
      </div>

      {entry.request ? (
        <div className="mb-3 rounded border border-primary-b bg-primary-b p-3 text-neutral-w0">
          <div className="typography-subtitle mb-2">Request</div>
          <div className="grid gap-3 typography-mainText">
            <div className="grid gap-2 md:grid-cols-4">
              <div>
                <div className="typography-label text-neutral-w0 opacity-80">
                  Phase
                </div>
                <div>{entry.request.phase || '-'}</div>
              </div>
              <div>
                <div className="typography-label text-neutral-w0 opacity-80">
                  Method
                </div>
                <div>{entry.request.method || '-'}</div>
              </div>
              <div>
                <div className="typography-label text-neutral-w0 opacity-80">
                  Status
                </div>
                <div>{entry.request.status ?? '-'}</div>
              </div>
              <div>
                <div className="typography-label text-neutral-w0 opacity-80">
                  Duration
                </div>
                <div>
                  {entry.request.duration !== undefined
                    ? `${entry.request.duration}ms`
                    : '-'}
                </div>
              </div>
            </div>
            <div className="break-all text-neutral-w0">
              {entry.request.url || '-'}
            </div>
            {entry.request.id ? (
              <div className="break-all typography-label text-neutral-w0 opacity-80">
                request id: {entry.request.id}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <JsonSection title="Request body" value={entry.request?.requestBody} />
      <JsonSection title="Response body" value={entry.request?.responseBody} />
      <JsonSection
        title="Request headers"
        value={entry.request?.requestHeaders}
        tone="light"
      />
      <JsonSection
        title="Response headers"
        value={entry.request?.responseHeaders}
        tone="light"
      />
      <JsonSection title="Parsed payload" value={parsedPayload} />
      <div
        className={clsx(
          'mb-3 rounded border border-l-4 bg-neutral-b5 p-3',
          LEVEL_THEME[entry.level].border,
        )}
      >
        <div className="mb-2 flex flex-col items-stretch gap-3 xl:flex-row xl:items-start xl:justify-between">
          <div className="min-w-0 flex-1">
            <div className="typography-subtitle whitespace-normal break-words">
              {entry.summary}
            </div>
            <div className="typography-label mt-1 text-neutral-b2">
              {entry.sourceName}:{entry.sourceLine}
            </div>
          </div>
          <div className="flex flex-col flex-none gap-2 xl:justify-end">
            <Button
              className="whitespace-nowrap"
              disabled={!excludeRules.length}
              size="small"
              variant="outlined"
              onClick={openExcludeDialog}
            >
              Exclude...
            </Button>
            <Button
              className="whitespace-nowrap"
              size="small"
              variant="outlined"
              onClick={() => onShowContext(entry)}
            >
              <FileMd className="mr-1 size-4" />
              Show context
            </Button>
            <Button
              className="whitespace-nowrap"
              size="small"
              variant="outlined"
              onClick={() => onCopyRaw(entry)}
            >
              <CopyMd className="mr-1 size-4" />
              Copy raw
            </Button>
          </div>
        </div>
        <span
          className={clsx(
            'typography-labelSemiBold inline-flex rounded border px-2 py-1 uppercase',
            LEVEL_THEME[entry.level].badge,
          )}
        >
          {entry.level}
        </span>
      </div>

      <div>
        <div className="typography-subtitle mb-2">Raw</div>
        <pre className="max-h-[30vh] overflow-auto whitespace-pre-wrap break-words rounded border border-neutral-b4 bg-neutral-b5 p-3 typography-mainText">
          {entry.raw}
        </pre>
      </div>
      <Dialog
        open={excludeDialogOpen}
        onClose={closeExcludeDialog}
        size="medium"
      >
        <DialogTitle>Exclude log entries</DialogTitle>
        <DialogContent>
          <div className="mb-3 typography-mainText text-neutral-b2">
            Choose which matching entries should be hidden from the current
            result set.
          </div>
          <div className="grid max-h-[48vh] gap-2 overflow-auto">
            {excludeRules.map((rule) => (
              <label
                className={clsx(
                  'flex cursor-pointer items-start gap-2 rounded border p-3 typography-mainText',
                  selectedExcludeRule?.id === rule.id
                    ? 'border-primary-b bg-primary-b text-neutral-w0'
                    : 'border-neutral-b4 bg-neutral-base',
                )}
                key={rule.id}
              >
                <input
                  checked={selectedExcludeRule?.id === rule.id}
                  className="mt-1"
                  name="excludeRule"
                  onChange={() => setSelectedExcludeRuleId(rule.id)}
                  type="radio"
                />
                <span className="min-w-0">
                  <span className="block typography-labelSemiBold">
                    {rule.label}
                  </span>
                  <span className="block break-words typography-label">
                    {rule.value}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeExcludeDialog} variant="outlined">
            Cancel
          </Button>
          <Button
            disabled={!selectedExcludeRule}
            onClick={applyExcludeRule}
            variant="contained"
          >
            Apply exclude
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export const LogViewerApp: FunctionComponent = () => {
  const [pasteText, setPasteText] = useState('');
  const [sources, setSources] = useState<LoadedSource[]>([]);
  const [query, setQuery] = useState('');
  const [scopeQuery, setScopeQuery] = useState('');
  const [searchFilters, setSearchFilters] = useState<SearchFilter[]>([]);
  const [excludeRules, setExcludeRules] = useState<ExcludeRule[]>([]);
  const [selectedSource, setSelectedSource] = useState('all');
  const [activeLevels, setActiveLevels] = useState(DEFAULT_LEVELS);
  const [selectedEntryId, setSelectedEntryId] = useState<string>();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set());
  const [fontScale, setFontScale] = useState(DEFAULT_FONT_SCALE);
  const [showSearchFilters, setShowSearchFilters] = useState(true);
  const [showExcludeRules, setShowExcludeRules] = useState(true);
  const [requestsOnly, setRequestsOnly] = useState(false);
  const [slowOnly, setSlowOnly] = useState(false);
  const [pinnedOnly, setPinnedOnly] = useState(false);
  const [contextEntryId, setContextEntryId] = useState<string>();
  const [contextScrollRequestKey, setContextScrollRequestKey] = useState(0);
  const [loadingStatus, setLoadingStatus] = useState('');
  const [sourcePanelWidth, setSourcePanelWidth] = useState<number>(
    PANEL_WIDTHS.source.default,
  );
  const [entryPanelWidth, setEntryPanelWidth] = useState<number>(
    PANEL_WIDTHS.entries.default,
  );

  const entries = useMemo(() => parseLogSources(sources), [sources]);
  const levelCounts = useMemo(() => getLevelCounts(entries), [entries]);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedScopeQuery = scopeQuery.trim().toLowerCase();
    const normalizedSearchFilters = searchFilters.map((filter) =>
      filter.value.toLowerCase(),
    );

    return entries.filter((entry) => {
      if (!activeLevels.has(entry.level)) {
        return false;
      }

      if (selectedSource !== 'all' && entry.sourceName !== selectedSource) {
        return false;
      }

      if (excludeRules.some((rule) => entryMatchesExcludeRule(entry, rule))) {
        return false;
      }

      if (requestsOnly && !entry.request) {
        return false;
      }

      if (
        slowOnly &&
        (!entry.request || (entry.request.duration || 0) <= 1000)
      ) {
        return false;
      }

      if (pinnedOnly && !pinnedIds.has(entry.id)) {
        return false;
      }

      if (
        normalizedScopeQuery &&
        !`${entry.scope || ''} ${entry.sourceName}`
          .toLowerCase()
          .includes(normalizedScopeQuery)
      ) {
        return false;
      }

      const searchText = getEntrySearchText(entry);

      if (
        normalizedSearchFilters.some((filter) => !searchText.includes(filter))
      ) {
        return false;
      }

      return !normalizedQuery || searchText.includes(normalizedQuery);
    });
  }, [
    activeLevels,
    entries,
    excludeRules,
    pinnedIds,
    pinnedOnly,
    query,
    requestsOnly,
    scopeQuery,
    searchFilters,
    selectedSource,
    slowOnly,
  ]);

  const selectedEntry =
    filteredEntries.find((entry) => entry.id === selectedEntryId) ||
    filteredEntries[0];

  const handleLoadPaste = () => {
    const trimmedText = pasteText.trim();

    if (!trimmedText) {
      return;
    }

    const sourceName = `pasted-${new Date().toISOString()}.log`;
    setSources([
      { name: sourceName, text: trimmedText, size: trimmedText.length },
    ]);
    setSelectedSource('all');
    setSelectedEntryId(undefined);
    setSelectedIds(new Set());
    setPinnedIds(new Set());
    setContextEntryId(undefined);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files?.length) {
      return;
    }

    setLoadingStatus(`Reading ${files.length} files...`);

    try {
      const loadedSources = await readFiles(files);
      setSources(loadedSources);
      setSelectedSource('all');
      setSelectedEntryId(undefined);
      setSelectedIds(new Set());
      setPinnedIds(new Set());
      setContextEntryId(undefined);
      setLoadingStatus(`Loaded ${loadedSources.length} text files.`);
    } catch (error) {
      setLoadingStatus(error instanceof Error ? error.message : String(error));
    } finally {
      event.target.value = '';
    }
  };

  const toggleLevel = (level: LogLevel) => {
    setActiveLevels((prev) => {
      const next = new Set(prev);

      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
      }

      return next;
    });
  };

  const copyText = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleCopyFiltered = () => {
    void copyText(filteredEntries.map((entry) => entry.raw).join('\n'));
  };

  const selectedEntries = entries.filter((entry) => selectedIds.has(entry.id));

  const handleCopySelected = () => {
    void copyText(selectedEntries.map((entry) => entry.raw).join('\n'));
  };

  const handleSaveMatched = () => {
    saveTextFile(
      'matched-logs.log',
      filteredEntries.map((entry) => entry.raw).join('\n'),
    );
  };

  const handleSaveSelected = () => {
    saveTextFile(
      'selected-logs.log',
      selectedEntries.map((entry) => entry.raw).join('\n'),
    );
  };

  const handleAddSearchFilter = () => {
    const value = query.trim();

    if (!value) {
      return;
    }

    setSearchFilters((prev) =>
      prev.some((filter) => filter.value === value)
        ? prev
        : [...prev, { id: `${Date.now()}:${value}`, value }],
    );
    setQuery('');
    setShowSearchFilters(true);
  };

  const handleAddExcludeRule = (rule: ExcludeRule) => {
    setExcludeRules((prev) =>
      prev.some((item) => item.id === rule.id) ? prev : [...prev, rule],
    );
    setShowExcludeRules(true);
  };

  const handleToggleSelected = (entryId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);

      if (next.has(entryId)) {
        next.delete(entryId);
      } else {
        next.add(entryId);
      }

      return next;
    });
  };

  const handleTogglePin = (entryId: string) => {
    setPinnedIds((prev) => {
      const next = new Set(prev);

      if (next.has(entryId)) {
        next.delete(entryId);
      } else {
        next.add(entryId);
      }

      return next;
    });
  };

  const handleShowContext = (entry: ParsedLogEntry) => {
    setQuery('');
    setScopeQuery('');
    setActiveLevels(new Set(DEFAULT_LEVELS));
    setSelectedSource(entry.sourceName);
    setSelectedEntryId(entry.id);
    setContextEntryId(entry.id);
    setContextScrollRequestKey((value) => value + 1);
  };

  const handleClear = () => {
    setPasteText('');
    setSources([]);
    setQuery('');
    setScopeQuery('');
    setSearchFilters([]);
    setExcludeRules([]);
    setSelectedSource('all');
    setSelectedEntryId(undefined);
    setSelectedIds(new Set());
    setPinnedIds(new Set());
    setContextEntryId(undefined);
    setLoadingStatus('');
  };

  return (
    <div
      className="flex h-full min-h-0 flex-col bg-neutral-base text-neutral-b0"
      style={{ fontSize: `${fontScale * 100}%` }}
    >
      <header className="flex flex-none flex-wrap items-center gap-3 border-b border-primary-b bg-neutral-b0 px-4 py-3 text-neutral-w0">
        <div className="min-w-0 flex-auto">
          <h1 className="typography-title truncate">Log Viewer</h1>
          <div className="typography-label text-neutral-b4">
            {entries.length} logs, {filteredEntries.length} matched
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {LEVELS.map((level) => (
            <span
              className={clsx(
                'typography-labelSemiBold rounded border px-2 py-1 uppercase',
                LEVEL_THEME[level].chip,
              )}
              key={level}
            >
              {level} {levelCounts[level]}
            </span>
          ))}
        </div>
        <label className="inline-flex">
          <input
            {...{ webkitdirectory: '', directory: '' }}
            className="hidden"
            multiple
            onChange={handleFileChange}
            type="file"
          />
          <Button component="span" size="small" variant="outlined">
            <FolderMd className="mr-1 size-4" />
            Load folder
          </Button>
        </label>
        <label className="inline-flex">
          <input
            accept={ACCEPTED_EXTENSIONS.join(',')}
            className="hidden"
            multiple
            onChange={handleFileChange}
            type="file"
          />
          <Button component="span" size="small" variant="outlined">
            <UploadMd className="mr-1 size-4" />
            Load files
          </Button>
        </label>
        <Button
          disabled={!filteredEntries.length}
          onClick={handleCopyFiltered}
          size="small"
          variant="outlined"
        >
          <CopyMd className="mr-1 size-4" />
          Copy matched
        </Button>
        <Button
          disabled={!selectedEntries.length}
          onClick={handleCopySelected}
          size="small"
          variant="outlined"
        >
          <CopyMd className="mr-1 size-4" />
          Copy selected
        </Button>
        <Button
          disabled={!filteredEntries.length}
          onClick={handleSaveMatched}
          size="small"
          variant="outlined"
        >
          Save matched
        </Button>
        <Button
          disabled={!selectedEntries.length}
          onClick={handleSaveSelected}
          size="small"
          variant="outlined"
        >
          Save selected
        </Button>
        <div className="flex items-center gap-1">
          <Button
            onClick={() =>
              setFontScale((value) =>
                clamp(
                  Number((value - 0.06).toFixed(2)),
                  MIN_FONT_SCALE,
                  MAX_FONT_SCALE,
                ),
              )
            }
            size="small"
            variant="outlined"
          >
            A-
          </Button>
          <Button
            onClick={() => setFontScale(DEFAULT_FONT_SCALE)}
            size="small"
            variant="outlined"
          >
            {Math.round(fontScale * 100)}%
          </Button>
          <Button
            onClick={() =>
              setFontScale((value) =>
                clamp(
                  Number((value + 0.06).toFixed(2)),
                  MIN_FONT_SCALE,
                  MAX_FONT_SCALE,
                ),
              )
            }
            size="small"
            variant="outlined"
          >
            A+
          </Button>
        </div>
        <Button onClick={handleClear} size="small" variant="outlined">
          <TrashMd className="mr-1 size-4" />
          Clear
        </Button>
      </header>

      <div className="flex flex-none flex-wrap items-center gap-3 border-b border-neutral-b4 bg-neutral-b5 p-3">
        <div className="min-w-[280px] flex-[1_1_520px]">
          <TextField
            fullWidth
            label="Search logs"
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleAddSearchFilter();
              }
            }}
            placeholder="Text, URL, sessionId, request id..."
            value={query}
          />
        </div>
        <Button
          disabled={!query.trim()}
          onClick={handleAddSearchFilter}
          size="small"
          variant="outlined"
        >
          Add filter
        </Button>
        <div className="min-w-[240px] flex-[1_1_360px]">
          <TextField
            fullWidth
            label="Scope or file"
            onChange={(event) => setScopeQuery(event.target.value)}
            placeholder="Auth, CallLog, recent.log..."
            value={scopeQuery}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setRequestsOnly((value) => !value)}
            size="small"
            variant={requestsOnly ? 'contained' : 'outlined'}
          >
            Requests
          </Button>
          <Button
            onClick={() => setSlowOnly((value) => !value)}
            size="small"
            variant={slowOnly ? 'contained' : 'outlined'}
          >
            Slow &gt; 1s
          </Button>
          <Button
            onClick={() => setPinnedOnly((value) => !value)}
            size="small"
            variant={pinnedOnly ? 'contained' : 'outlined'}
          >
            Pinned
          </Button>
        </div>
        <div className="flex min-w-[280px] flex-[0_1_auto] items-center gap-2">
          <SearchMd className="size-4 text-neutral-b2" />
          <LevelFilters
            activeLevels={activeLevels}
            levelCounts={levelCounts}
            onToggleLevel={toggleLevel}
          />
        </div>
      </div>

      {searchFilters.length || excludeRules.length ? (
        <div className="flex flex-none flex-col border-b border-neutral-b4 bg-neutral-b5">
          {searchFilters.length ? (
            <div className="flex flex-wrap items-center gap-2 border-b border-neutral-b4 px-3 py-2">
              <button
                className="typography-labelSemiBold text-neutral-b2"
                onClick={() => setShowSearchFilters((value) => !value)}
                type="button"
              >
                {showSearchFilters ? '-' : '+'} AND filters (
                {searchFilters.length})
              </button>
              {showSearchFilters ? (
                <>
                  {searchFilters.map((filter) => (
                    <span
                      className="inline-flex items-center gap-1 rounded border border-neutral-b4 bg-neutral-base px-2 py-1 typography-label"
                      key={filter.id}
                      title={filter.value}
                    >
                      Contains: {truncateText(filter.value, 72)}
                      <button
                        className="text-neutral-b2"
                        onClick={() =>
                          setSearchFilters((prev) =>
                            prev.filter((item) => item.id !== filter.id),
                          )
                        }
                        type="button"
                      >
                        x
                      </button>
                    </span>
                  ))}
                  <Button
                    onClick={() => setSearchFilters([])}
                    size="small"
                    variant="outlined"
                  >
                    Clear
                  </Button>
                </>
              ) : null}
            </div>
          ) : null}
          {excludeRules.length ? (
            <div className="flex flex-wrap items-center gap-2 px-3 py-2">
              <button
                className="typography-labelSemiBold text-neutral-b2"
                onClick={() => setShowExcludeRules((value) => !value)}
                type="button"
              >
                {showExcludeRules ? '-' : '+'} Excluded ({excludeRules.length})
              </button>
              {showExcludeRules ? (
                <>
                  {excludeRules.map((rule) => (
                    <span
                      className="inline-flex items-center gap-1 rounded border border-neutral-b4 bg-neutral-base px-2 py-1 typography-label"
                      key={rule.id}
                      title={rule.value}
                    >
                      {rule.label}: {truncateText(rule.value, 72)}
                      <button
                        className="text-neutral-b2"
                        onClick={() =>
                          setExcludeRules((prev) =>
                            prev.filter((item) => item.id !== rule.id),
                          )
                        }
                        type="button"
                      >
                        x
                      </button>
                    </span>
                  ))}
                  <Button
                    onClick={() => setExcludeRules([])}
                    size="small"
                    variant="outlined"
                  >
                    Clear
                  </Button>
                </>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {!sources.length ? (
        <main className="flex min-h-0 flex-auto flex-wrap gap-4 overflow-auto p-4">
          <section className="flex min-h-[360px] min-w-[420px] flex-[1_1_620px] flex-col rounded border border-primary-b bg-neutral-b5">
            <div className="border-b border-primary-b bg-primary-b px-3 py-2 text-neutral-w0 typography-subtitle">
              Paste logs
            </div>
            <textarea
              className="typography-mainText min-h-0 flex-auto resize-none bg-neutral-base p-3 font-mono outline-none"
              onChange={(event) => setPasteText(event.target.value)}
              placeholder="Paste one or more log lines here..."
              spellCheck={false}
              value={pasteText}
            />
            <div className="flex justify-end border-t border-neutral-b4 p-3">
              <Button
                disabled={!pasteText.trim()}
                onClick={handleLoadPaste}
                size="small"
                variant="contained"
              >
                <UploadMd className="mr-1 size-4" />
                Parse pasted logs
              </Button>
            </div>
          </section>
          <section className="min-h-[180px] min-w-[320px] flex-[1_1_360px] rounded border border-success-t20 bg-success-t10 p-4">
            <div className="typography-subtitle mb-3 text-success-f">
              Folder structure
            </div>
            <div className="typography-mainText text-neutral-b2">
              Choose a folder like the HubSpot native log bundle. The viewer
              loads `recent.log`, `history/*.log`, `.txt`, `.json`, and `.ts`
              text files, while skipping image attachments.
            </div>
            {loadingStatus ? (
              <div className="typography-mainText mt-4 rounded border border-neutral-b4 bg-neutral-base p-3">
                {loadingStatus}
              </div>
            ) : null}
          </section>
        </main>
      ) : (
        <main
          className="flex min-h-0 flex-auto flex-col lg:grid"
          style={{
            gridTemplateColumns: `${sourcePanelWidth}px 8px ${entryPanelWidth}px 8px minmax(420px,1fr)`,
          }}
        >
          <SourceList
            onSelectSource={setSelectedSource}
            selectedSource={selectedSource}
            sources={sources}
          />
          <ResizeHandle
            label="Resize sources panel"
            max={PANEL_WIDTHS.source.max}
            min={PANEL_WIDTHS.source.min}
            onWidthChange={setSourcePanelWidth}
            width={sourcePanelWidth}
          />
          <EntryList
            entries={filteredEntries}
            onSelectEntry={(entry) => setSelectedEntryId(entry.id)}
            onTogglePin={handleTogglePin}
            onToggleSelected={handleToggleSelected}
            pinnedIds={pinnedIds}
            scrollRequestKey={contextScrollRequestKey}
            scrollTargetEntryId={contextEntryId}
            selectedEntry={selectedEntry}
            selectedIds={selectedIds}
          />
          <ResizeHandle
            label="Resize log list panel"
            max={PANEL_WIDTHS.entries.max}
            min={PANEL_WIDTHS.entries.min}
            onWidthChange={setEntryPanelWidth}
            width={entryPanelWidth}
          />
          <DetailPanel
            entry={selectedEntry}
            onAddExcludeRule={handleAddExcludeRule}
            onCopyRaw={(entry) => {
              void copyText(entry.raw);
            }}
            onShowContext={handleShowContext}
          />
        </main>
      )}
    </div>
  );
};
