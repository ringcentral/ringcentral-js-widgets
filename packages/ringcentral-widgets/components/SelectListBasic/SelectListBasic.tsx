import { emptyFn, format } from '@ringcentral-integration/utils';
import {
  RcIcon,
  RcTextField,
  useDepsChange,
  useRefState,
} from '@ringcentral/juno';
import { Search } from '@ringcentral/juno-icon';
import clsx from 'clsx';
import type { FunctionComponent } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { TOOLTIP_LONG_DELAY_TIME } from '../../lib/toolTipDelayTime';
import { AnimationPanel } from '../AnimationPanel';
import BackHeader from '../BackHeaderV2';
import { Tooltip } from '../Rcui/Tooltip';
import type { ListViewProps } from '../SelectList/ListView';
import selectListI18n from '../SelectList/i18n';

import i18n from './i18n';
import styles from './styles.scss';

export type SelectListBasicProps = {
  title: string;
  options?: ListViewProps['options'];
  otherOptions?: object[];
  associatedOptions?: object[];
  showOtherSection?: boolean;
  showAssociatedSection?: boolean;
  placeholder?: string;
  searchOption: (option: any, text: string) => any;
  rightIcon?: JSX.Element;
  currentLocale: string;
  matchedTitle?: string;
  otherTitle?: string;
  associatedTitle?: string;
  renderListView?: (
    data: any,
    type: string,
    filter: string,
    // TODO: need type check
    scrollCheck: Function,
  ) => React.ReactNode;
  open?: boolean;
  setOpen?: (...args: any[]) => any;
  scrollCheck?: (
    scrollElmRef: any,
    matchElmRef: any,
    elm: any,
    type: any,
  ) => any;
  selectListBasicClassName?: string;
  backHeaderClassName?: string;
  listContainerClassName?: string;
  classes?: {
    searchInput?: string;
    noResult?: string;
    placeholder?: string;
  };
  onBackClick?: () => any;
  contactSearch?: (arg: {
    searchString: string;
    fromField: SelectListBasicProps['field'];
  }) => any;
  field?: string;
  foundFromServerTitle?: string;
  showFoundFromServer?: boolean;
  foundFromServerEntities?: any[];
  appName?: string;
  isSearching?: boolean;
  setShowSearchFromServerHint?: (state: boolean) => any;
  showSearchFromServerHint?: boolean;
  disabled?: boolean;
};

const defaultRenderListView = () => {
  return null;
};

const SelectListBasic: FunctionComponent<SelectListBasicProps> = ({
  options = [],
  otherOptions = [],
  associatedOptions = [],
  showOtherSection = true,
  showAssociatedSection = false,
  placeholder = '',
  rightIcon = null,
  setOpen = emptyFn,
  open = false,
  renderListView = defaultRenderListView,
  scrollCheck = emptyFn,
  selectListBasicClassName = null,
  backHeaderClassName = null,
  listContainerClassName = null,
  classes = {},
  onBackClick = undefined,
  matchedTitle = null,
  otherTitle = null,
  associatedTitle = null,
  contactSearch = null,
  field = null,
  foundFromServerTitle = null,
  showFoundFromServer = false,
  foundFromServerEntities = [],
  appName = null,
  isSearching = false,
  disabled = false,
  title,
  searchOption,
  currentLocale,
}) => {
  const [filterRef, setFilter] = useRefState<string>('');
  const [showSearchFromServerHint, setShowSearchFromServerHint] =
    useState(false);
  const scrollElmRef = useRef();
  const matchElmRef = useRef();

  // When open change clear filter
  useEffect(() => {
    setFilter('');
    setShowSearchFromServerHint(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  useEffect(() => {
    if (isSearching) {
      setShowSearchFromServerHint(false);
    }
  }, [isSearching]);

  useDepsChange(() => {
    // null is invalid for RcTextField at disabled status but empty string works
    if (disabled) setFilter('', false);
  }, [disabled]);
  const filter = filterRef.current;

  // @ts-expect-error TS(2774): This condition will always return true since this ... Remove this comment to see the full error message
  const hasSearch = searchOption && filter;
  const matchOptions = hasSearch
    ? options.filter((option) => searchOption(option, filter))
    : options;
  const matchOtherOptions = hasSearch
    ? otherOptions.filter((option) => searchOption(option, filter))
    : otherOptions;
  const matchAssociatedOptions = hasSearch
    ? associatedOptions.filter((option) => searchOption(option, filter))
    : associatedOptions;
  const filteredFoundFromServerOptions = hasSearch
    ? foundFromServerEntities.filter((option) => searchOption(option, filter))
    : foundFromServerEntities;
  const hasResult =
    matchOptions.length +
      matchOtherOptions.length +
      matchAssociatedOptions.length >
      0 ||
    options.length + otherOptions.length + associatedOptions.length === 0;
  const backHeaderOnclick = () => {
    setOpen(false);
    if (onBackClick) {
      return onBackClick();
    }
  };
  const foundFromServerHint = (
    <p className={styles.hint}>
      {format(i18n.getString('foundFromServerHint', currentLocale), {
        appName,
      })}
    </p>
  );
  const notResultFoundFromServer = (
    <p className={styles.loading}>
      {' '}
      {i18n.getString('notResultFoundFromServer', currentLocale)}
    </p>
  );
  const loading = (
    <p className={styles.loading}>{i18n.getString('loading', currentLocale)}</p>
  );
  const notFoundFromServer = showSearchFromServerHint
    ? foundFromServerHint
    : notResultFoundFromServer;
  const showLoading = isSearching ? loading : notFoundFromServer;

  matchedTitle =
    matchedTitle || selectListI18n.getString('matched', currentLocale);

  otherTitle = otherTitle || selectListI18n.getString('other', currentLocale);

  foundFromServerTitle =
    foundFromServerTitle ||
    format(selectListI18n.getString('foundFromServer', currentLocale), {
      appName,
    });

  associatedTitle =
    associatedTitle || selectListI18n.getString('associated', currentLocale);

  return (
    // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
    <AnimationPanel open={open} className={selectListBasicClassName}>
      {open ? (
        <>
          <BackHeader
            currentLocale={currentLocale}
            title={title}
            onBackClick={backHeaderOnclick}
            rightIcon={rightIcon}
            // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
            className={backHeaderClassName}
          />
          <main className={styles.main} data-sign="selectList">
            <Tooltip title={placeholder} enterDelay={TOOLTIP_LONG_DELAY_TIME}>
              <div className={clsx(styles.search, classes.searchInput)}>
                {!filter && (
                  <span
                    className={clsx(styles.placeholder, classes.placeholder)}
                  >
                    {placeholder}
                  </span>
                )}
                <RcTextField
                  variant="outline"
                  size="small"
                  value={filter}
                  fullWidth
                  radius="round"
                  InputProps={{
                    startAdornment: (
                      <RcIcon
                        symbol={Search}
                        color="neutral.f04"
                        size="small"
                      />
                    ),
                  }}
                  data-sign="searchBar"
                  onChange={(event: any) => {
                    if (event.target) {
                      const value = event.target.value || '';
                      setFilter(value);
                    }
                  }}
                  onKeyDown={(key) => {
                    // Press enter to search contacts from server
                    if ((key && key.keyCode !== 13) || !showFoundFromServer)
                      return;
                    if (contactSearch && typeof contactSearch === 'function') {
                      const searchString = filter ? filter.trim() : '';
                      if (searchString.length) {
                        contactSearch({
                          searchString,
                          // @ts-expect-error TS(2322): Type 'string | null' is not assignable to type 'st... Remove this comment to see the full error message
                          fromField: field,
                        });
                      }
                    }
                  }}
                  disabled={disabled}
                />
              </div>
            </Tooltip>
            <div
              className={clsx(styles.listContainer, listContainerClassName)}
              // @ts-expect-error TS(2322): Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
              ref={scrollElmRef}
              data-sign="searchResult"
            >
              {hasResult || showFoundFromServer ? (
                <>
                  <div
                    // @ts-expect-error TS(2322): Type 'MutableRefObject<undefined>' is not assignab... Remove this comment to see the full error message
                    ref={matchElmRef}
                    className={styles.text}
                    data-sign={matchedTitle}
                  >
                    {matchedTitle && (
                      <div className={styles.title}>
                        {matchedTitle} ({matchOptions.length})
                      </div>
                    )}
                    {matchOptions.length > 0 &&
                      renderListView(
                        matchOptions,
                        'matched',
                        filter,
                        (elm: any, type: any) =>
                          scrollCheck(scrollElmRef, matchElmRef, elm, type),
                      )}
                  </div>
                  {showOtherSection && (
                    <div className={styles.text} data-sign={otherTitle}>
                      {otherTitle && (
                        <div className={styles.title}>
                          {otherTitle} ({matchOtherOptions.length})
                        </div>
                      )}
                      {matchOtherOptions.length > 0 &&
                        renderListView(
                          matchOtherOptions,
                          'other',
                          filter,
                          (elm: any, type: any) =>
                            scrollCheck(scrollElmRef, matchElmRef, elm, type),
                        )}
                    </div>
                  )}
                  {showAssociatedSection && (
                    <div className={styles.text}>
                      {associatedTitle && (
                        <div className={styles.title}>
                          {associatedTitle} ({matchAssociatedOptions.length})
                        </div>
                      )}
                      {matchAssociatedOptions.length > 0 &&
                        renderListView(
                          matchAssociatedOptions,
                          'other',
                          filter,
                          (elm: any, type: any) =>
                            scrollCheck(scrollElmRef, matchElmRef, elm, type),
                        )}
                    </div>
                  )}
                  {showFoundFromServer && (
                    <div className={styles.text} data-sign="foundFromServer">
                      {foundFromServerTitle && (
                        <div className={styles.title}>
                          {foundFromServerTitle} (
                          {filteredFoundFromServerOptions.length})
                        </div>
                      )}
                      {filteredFoundFromServerOptions &&
                      filteredFoundFromServerOptions.length > 0
                        ? renderListView(
                            filteredFoundFromServerOptions,
                            'custom',
                            filter,
                            (elm: any, type: any) =>
                              scrollCheck(scrollElmRef, matchElmRef, elm, type),
                          )
                        : showLoading}
                    </div>
                  )}
                </>
              ) : (
                <div
                  className={clsx(styles.search, styles.text, classes.noResult)}
                >
                  {`${i18n.getString(
                    'noResultFoundFor',
                    currentLocale,
                  )} "${filter}"`}
                </div>
              )}
            </div>
          </main>
        </>
      ) : null}
    </AnimationPanel>
  );
};

export { SelectListBasic };
