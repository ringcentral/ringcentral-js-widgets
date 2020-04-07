import React, { useRef, useState } from 'react';
import classnames from 'classnames';
import { RcOutlineTextField } from '@ringcentral-integration/rcui';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import BackHeader from '../BackHeaderV2';
import i18n from './i18n';

const SelectListBasic = ({
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
  onBackClick,
}) => {
  const [filter, setFilter] = useState(null);
  const scrollElmRef = useRef();
  const matchElmRef = useRef();

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
    if (onBackClick) {
      return onBackClick();
    }
    setOpen(false);
    setFilter(null);
  };

  return (
    <div
      className={classnames(
        styles.list,
        open ? styles.active : null,
        selectListBasicClassName,
      )}
    >
      {open ? (
        <>
          <BackHeader
            currentLocale={currentLocale}
            title={title}
            onBackClick={backHeaderOnclick}
            rightIcon={rightIcon}
            className={backHeaderClassName}
          />
          <main data-sign="selectList">
            <div className={styles.search}>
              {!filter && (
                <span
                  className={classnames(styles.placeholder, 'text-ellipsis')}
                >
                  {placeholder}
                </span>
              )}
              <RcOutlineTextField
                size="small"
                type="circle"
                fullWidth
                icon="search"
                iconSize="small"
                data-sign="searchBar"
                onChange={(event: any) => {
                  if (event.target) {
                    const value = event.target.value || '';
                    setFilter(value);
                  }
                }}
              />
            </div>
            <div
              className={classnames(
                styles.listContainer,
                listContainerClassName,
              )}
              ref={scrollElmRef}
              data-sign="searchResult"
            >
              {hasResult ? (
                <>
                  <div ref={matchElmRef} className={styles.text}>
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
                  <div className={styles.text}>
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
                </>
              ) : (
                <div
                  className={classnames(
                    styles.search,
                    styles.text,
                    'text-break',
                  )}
                >
                  {`${i18n.getString(
                    'noResultFoundFor',
                    currentLocale,
                  )} '${filter}'`}
                </div>
              )}
            </div>
          </main>
        </>
      ) : null}
    </div>
  );
};

SelectListBasic.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  otherOptions: PropTypes.arrayOf(PropTypes.object),
  associatedOptions: PropTypes.arrayOf(PropTypes.object),
  showAssociatedSection: PropTypes.bool,
  placeholder: PropTypes.string,
  searchOption: PropTypes.func.isRequired,
  rightIcon: PropTypes.element,
  currentLocale: PropTypes.string.isRequired,
  matchedTitle: PropTypes.string,
  otherTitle: PropTypes.string,
  associatedTitle: PropTypes.string,
  renderListView: PropTypes.func,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  scrollCheck: PropTypes.func,
  selectListBasicClassName: PropTypes.string,
  backHeaderClassName: PropTypes.string,
  listContainerClassName: PropTypes.string,
  onBackClick: PropTypes.func,
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
  renderListView() {},
  scrollCheck() {},
  selectListBasicClassName: null,
  backHeaderClassName: null,
  listContainerClassName: null,
  onBackClick: undefined,
  matchedTitle: null,
  otherTitle: null,
  associatedTitle: null,
};

export { SelectListBasic };
