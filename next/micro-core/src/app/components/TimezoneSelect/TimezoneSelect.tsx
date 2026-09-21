import { GlobeMd } from '@ringcentral/spring-icon';
import {
  Text,
  Select,
  Option,
  MenuItemText,
  Icon,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { FunctionComponent, useMemo } from 'react';

import {
  formatTimezoneOffsetMinutes,
  getTimezoneOffsetMinutes,
  type ITimezone,
} from '../../services/StaticTimezoneService';

function isIOSBrowser(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const nav = navigator as Navigator & {
    maxTouchPoints?: number;
  };
  const userAgent = nav.userAgent || '';
  const platform = nav.platform || '';

  return (
    /iPad|iPhone|iPod/i.test(userAgent) ||
    /iPad|iPhone|iPod/i.test(platform) ||
    (platform === 'MacIntel' && (nav.maxTouchPoints ?? 0) > 1)
  );
}

export interface TimezoneSelectProps {
  currentTimezoneId: string;
  timezones: ITimezone[];
  onTimezoneChange?: (id: string) => void;
  size?: 'xlarge' | 'large' | 'medium';
  variant?: 'outlined' | 'standard' | 'contained';
  showLabel?: boolean;
  className?: string;
  mode?: 'standard' | 'mini';
  locale?: string;
  label?: string;
  getTimezoneDescription?: (description: string) => string;
  /**
   * Extra dropdown menu class names for a specific consumer.
   * Do not use this to change the default Scheduling Tool menu styles.
   */
  menuClassName?: string;
}

type TimezoneDisplayInfo = ITimezone & {
  index: number;
  offsetMinutes: number;
  offset: string;
  text: string;
};

const SORTED_TIMEZONE_CACHE_LIMIT = 24;
const sortedTimezoneCache = new Map<string, TimezoneDisplayInfo[]>();
const getDefaultTimezoneDescription = (description: string) => description;

const STANDARD_MENU_CLASS_NAME =
  'min-w-[400px] max-h-[320px] overflow-y-auto overscroll-contain';
const MINI_MENU_CLASS_NAME =
  'w-full min-w-0 max-w-full md:w-[360px] md:min-w-[360px] md:max-w-[360px] max-h-[320px] overflow-y-auto overscroll-contain';
// Spring UI 1.12 Popover sets content maxWidth to
// `availableWidth - (floating.offsetWidth - content.offsetWidth)`.
// `matchAnchorWidth` sizes the floating node first, so the first React 18
// layout can see content.offsetWidth === 0 and collapse the menu interior.
const MATCHED_ANCHOR_PAPER_CONTENT_CLASS_NAME =
  '!box-border !w-full !min-w-0 !max-w-full';

function isMobileOrTabletBrowser(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const nav = navigator as Navigator & {
    userAgentData?: { mobile?: boolean };
  };
  const userAgent = nav.userAgent || '';
  const platform = nav.platform || '';

  return (
    !!nav.userAgentData?.mobile ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet|Silk|Kindle|PlayBook|Windows Phone/i.test(
      userAgent,
    ) ||
    (platform === 'MacIntel' && nav.maxTouchPoints > 1)
  );
}

function getTimezoneCacheKey(
  timezones: ITimezone[],
  locale: string,
  referenceHour: string,
  getTimezoneDescription: (description: string) => string,
): string {
  return [
    locale,
    referenceHour,
    timezones
      .map((timezone) =>
        [
          timezone.id,
          timezone.name,
          getTimezoneDescription(timezone.description),
        ].join(':'),
      )
      .join('|'),
  ].join('::');
}

export const TimezoneSelect: FunctionComponent<TimezoneSelectProps> = ({
  currentTimezoneId,
  onTimezoneChange,
  timezones,
  size = 'xlarge',
  variant = 'outlined',
  showLabel = true,
  className,
  mode = 'standard',
  locale = 'en-US',
  label,
  getTimezoneDescription = getDefaultTimezoneDescription,
  menuClassName,
}) => {
  const shouldPreventIOSMenuScrollJump = isIOSBrowser();
  const isMobileOrTablet = isMobileOrTabletBrowser();
  const sortedTimezones = useMemo(() => {
    const referenceHour = new Date().toISOString().slice(0, 13);
    const referenceTime = `${referenceHour}:00:00.000Z`;
    const cacheKey = getTimezoneCacheKey(
      timezones,
      locale,
      referenceHour,
      getTimezoneDescription,
    );
    const cachedOptions = sortedTimezoneCache.get(cacheKey);

    if (cachedOptions) {
      return cachedOptions;
    }

    const sortableTimezones = timezones.map((tz, index) => {
      const offsetMinutes = getTimezoneOffsetMinutes(tz.name, referenceTime);

      return {
        ...tz,
        index,
        offsetMinutes,
        offset: formatTimezoneOffsetMinutes(offsetMinutes),
        text: getTimezoneDescription(tz.description || ''),
      };
    });

    sortableTimezones.sort(
      (left, right) =>
        left.offsetMinutes - right.offsetMinutes || left.index - right.index,
    );

    if (sortedTimezoneCache.size >= SORTED_TIMEZONE_CACHE_LIMIT) {
      sortedTimezoneCache.clear();
    }
    sortedTimezoneCache.set(cacheKey, sortableTimezones);

    return sortableTimezones;
  }, [getTimezoneDescription, locale, timezones]);

  const currentTimezoneDisplayInfo = sortedTimezones.find(
    (timezone) => timezone.id === currentTimezoneId,
  );

  const currentTimezoneDisplayText = currentTimezoneDisplayInfo
    ? `(${currentTimezoneDisplayInfo.offset}) ${currentTimezoneDisplayInfo.text}`
    : '';

  const timezoneOptions = useMemo(
    () =>
      sortedTimezones.map((timezone) => {
        return (
          <Option key={timezone.id} value={timezone.id}>
            <MenuItemText>
              {`(${timezone.offset}) ${timezone.text}`}
            </MenuItemText>
          </Option>
        );
      }),
    [sortedTimezones],
  );

  return (
    <Select
      label={showLabel ? label : undefined}
      variant={variant}
      size={size}
      selectMode="single"
      className={clsx('min-w-0', className || 'w-full')}
      value={currentTimezoneId}
      classes={{
        menu: clsx(
          mode === 'mini' ? MINI_MENU_CLASS_NAME : STANDARD_MENU_CLASS_NAME,
          menuClassName,
        ),
        ...(mode === 'mini'
          ? {
              selector: '!min-w-0',
              value: '!min-w-0',
            }
          : {}),
      }}
      MenuProps={{
        ...(shouldPreventIOSMenuScrollJump
          ? {
              autoFocus: false,
              disableAutoFocus: true,
              disableEnforceFocus: true,
              disableRestoreFocus: true,
            }
          : {}),
        placement: 'bottom-start',
        PopperProps: {
          matchAnchorWidth: !isMobileOrTablet,
        },
        ...(!isMobileOrTablet
          ? {
              PopperPaperProps: {
                classes: {
                  content: MATCHED_ANCHOR_PAPER_CONTENT_CLASS_NAME,
                },
              },
            }
          : {}),
      }}
      renderValue={() => {
        if (mode === 'mini') {
          return (
            <div className="flex w-full min-w-0 flex-row items-center gap-1 overflow-hidden">
              <Icon symbol={GlobeMd} size="small" />
              <Text className="min-w-0 truncate text-[13px] text-neutral-b1">
                {currentTimezoneDisplayText}
              </Text>
            </div>
          );
        }
        return (
          <div className="flex flex-row items-center gap-1">
            <Icon symbol={GlobeMd} />
            <Text>{currentTimezoneDisplayText}</Text>
          </div>
        );
      }}
      onChange={(e) => {
        onTimezoneChange?.(e.target.value);
      }}
      data-sign="timezone-select"
    >
      {timezoneOptions}
    </Select>
  );
};
