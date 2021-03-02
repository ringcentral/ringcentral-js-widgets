import { RcIcon, RcTextField } from '@ringcentral/juno';
import searchSvg from '@ringcentral/juno/icon/Search';
import classNames from 'classnames';
import formatMessage from 'format-message';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import { AnimationPanel } from '../AnimationPanel';
import BackHeader from '../BackHeaderV2';
import { Tooltip } from '../Rcui/Tooltip';
import i18n from './i18n';
import styles from './styles.scss';
import { TOOLTIP_LONG_DELAY_TIME } from '../../lib/toolTipDelayTime';

export type SelectListBasicProps = {
  title: string;
  options?: object[];
  otherOptions?: object[];
  associatedOptions?: object[];
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
  scrollCheck?: (scrollElmRef, matchElmRef, elm, type) => any;
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
};

const SelectListBasic: FunctionComponent<SelectListBasicProps> = ({
  title,
  options,
  otherOptions,
  associatedOptions,
  showAssociatedSection,
  placeholder,
  searchOption,
  rightIcon,
  matchedTitle,
  otherTitle,
  associatedTitle,
  currentLocale,
  renderListView,
  open,
  setOpen,
  scrollCheck,
  selectListBasicClassName,
  backHeaderClassName,
  listContainerClassName,
  classes,
  onBackClick,
  contactSearch,
  field,
  foundFromServerTitle,
  showFoundFromServer,
  foundFromServerEntities,
  appName,
  isSearching,
}) => {
  const [filter, setFilter] = useState(null);
  const [showSearchFromServerHint, setShowSearchFromServerHint] = useState(
    false,
  );
  const scrollElmRef = useRef();
  const matchElmRef = useRef();

  // When open change clear filter
  useEffect(() => {
    setFilter(null);
    setShowSearchFromServerHint(true);
  }, [open]);
  useEffect(() => {
    if (isSearching) {
      setShowSearchFromServerHint(false);
    }
  }, [isSearching]);
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
      {formatMessage(i18n.getString('foundFromServerHint', currentLocale), {
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
  return (
    <AnimationPanel open={open} className={selectListBasicClassName}>
      {open ? (
        <>
          <BackHeader
            currentLocale={currentLocale}
            title={title}
            onBackClick={backHeaderOnclick}
            rightIcon={rightIcon}
            className={backHeaderClassName}
          />
          <main className={styles.main} data-sign="selectList">
            <Tooltip title={placeholder} enterDelay={TOOLTIP_LONG_DELAY_TIME}>
              <div className={classNames(styles.search, classes.searchInput)}>
                {!filter && (
                  <span
                    className={classNames(
                      styles.placeholder,
                      classes.placeholder,
                    )}
                  >
                    {placeholder}
                  </span>
                )}
                <RcTextField
                  variant="outline"
                  size="small"
                  fullWidth
                  radius="round"
                  InputProps={{
                    startAdornment: (
                      <RcIcon
                        symbol={searchSvg}
                        color="icon.subdued"
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
                          fromField: field,
                        });
                      }
                    }
                  }}
                />
              </div>
            </Tooltip>
            <div
              className={classNames(
                styles.listContainer,
                listContainerClassName,
              )}
              ref={scrollElmRef}
              data-sign="searchResult"
            >
              {hasResult || showFoundFromServer ? (
                <>
                  <div
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
                        (elm, type) =>
                          scrollCheck(scrollElmRef, matchElmRef, elm, type),
                      )}
                  </div>
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
                        (elm, type) =>
                          scrollCheck(scrollElmRef, matchElmRef, elm, type),
                      )}
                  </div>
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
                          (elm, type) =>
                            scrollCheck(scrollElmRef, matchElmRef, elm, type),
                        )}
                    </div>
                  )}
                  {showFoundFromServer && (
                    <div className={styles.text}>
                      {foundFromServerTitle && (
                        <div className={styles.title}>
                          {foundFromServerTitle} (
                          {foundFromServerEntities.length})
                        </div>
                      )}
                      {foundFromServerEntities &&
                      foundFromServerEntities.length > 0
                        ? renderListView(
                            foundFromServerEntities,
                            'custom',
                            filter,
                            (elm, type) =>
                              scrollCheck(scrollElmRef, matchElmRef, elm, type),
                          )
                        : showLoading}
                    </div>
                  )}
                </>
              ) : (
                <div
                  className={classNames(
                    styles.search,
                    styles.text,
                    classes.noResult,
                  )}
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
SelectListBasic.defaultProps = {
  options: [],
  otherOptions: [],
  associatedOptions: [],
  showAssociatedSection: false,
  placeholder: '',
  rightIcon: null,
  setOpen() {},
  open: false,
  renderListView() {
    return null;
  },
  scrollCheck() {},
  selectListBasicClassName: null,
  backHeaderClassName: null,
  listContainerClassName: null,
  classes: {},
  onBackClick: undefined,
  matchedTitle: null,
  otherTitle: null,
  associatedTitle: null,
  contactSearch: null,
  field: null,
  foundFromServerTitle: null,
  showFoundFromServer: false,
  foundFromServerEntities: [],
  appName: null,
  isSearching: false,
  setShowSearchFromServerHint() {},
  showSearchFromServerHint: true,
};
export { SelectListBasic };
