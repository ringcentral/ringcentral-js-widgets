import { ExpandedLayoutPopper } from '@ringcentral-integration/micro-core/src/app/components';
import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { PageHeader } from '@ringcentral-integration/next-widgets/components';
import { PlusMd, SearchMd } from '@ringcentral/spring-icon';
import {
  CircularProgressIndicator,
  FocusTrap,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  MenuItemText,
  TextField,
} from '@ringcentral/spring-ui';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  displayList,
  ReferenceItemClickHandler,
  ReferenceWidgetAddEntityMenuProps,
  ReferenceWidgetProps,
  SelectedIdMap,
  SimpleCrmObject,
} from '../ReferenceWidget.interface';

import { FilterAndSearchHint } from './FilterAndSearchHint';
import { ReferenceList } from './ReferenceList';
import i18n, { I18nKey } from './i18n';
import NoResult from './no_search_results.svg';

interface ReferenceSearchPanelProps {
  initValue: string;
  searchFn: ReferenceWidgetProps['searchFn'];
  selectedMap: SelectedIdMap;
  onItemClick: ReferenceItemClickHandler;
  onCreateEntity?: () => void;
  addEntityMenu?: ReferenceWidgetAddEntityMenuProps;
  onBack?: () => void;
  closePageFn: () => void;
  expandMode?: boolean;
  useMenuList?: boolean;
  getIcon?: (item: SimpleCrmObject) => React.ReactNode;
  addEntityTooltip?: string;
}

export const ReferenceSearchPanel: React.FC<ReferenceSearchPanelProps> = ({
  initValue,
  searchFn,
  selectedMap,
  onItemClick,
  expandMode,
  closePageFn,
  onCreateEntity,
  addEntityMenu,
  onBack,
  useMenuList,
  getIcon,
  addEntityTooltip,
}) => {
  const { t } = useLocale(i18n);

  const [searchValue, setSearchValue] = React.useState(initValue);
  const [noChangeSearchTerm, setNoChangeSearchTerm] = React.useState(false);
  const [searching, setSearching] = React.useState(false);
  const [searchError, setSearchError] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<
    displayList['values'] | undefined
  >();

  // Menu state for search panel
  const [menuOpen, setMenuOpen] = useState(false);
  const addEntityButtonRef = useRef<HTMLButtonElement>(null);

  const handleMenuOpen = () => setMenuOpen(true);
  const handleMenuClose = () => setMenuOpen(false);

  const displayList = useMemo(
    () =>
      searchResult?.filter((record) => {
        return record.name?.toLowerCase().includes(searchValue.toLowerCase());
      }),
    [searchResult, searchValue],
  );

  const searchHandler = useCallback(
    async (searchTerm) => {
      setSearching(true);
      setSearchResult(void 0);
      try {
        const res = await searchFn?.(searchTerm);
        setSearchResult(res);
        setNoChangeSearchTerm(true);
      } catch (error) {
        setSearchError(true);
        setSearchResult(void 0);
      } finally {
        setSearching(false);
      }
    },
    [searchFn],
  );

  useEffect(() => {
    // init search
    searchHandler(searchValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const searchTitle = t('search');
  const notFoundAnyResult = noChangeSearchTerm && searchResult?.length === 0;

  const noResultMainContent = (
    <div className="flex-col flex justify-center items-center gpa-3 mt-24">
      <NoResult height={120} width={120} />
      <div className="text-center text-14 text-gray-500">
        {t('noSearchResult')}
      </div>
    </div>
  );

  const searchingContent = (
    <div className="flex-col flex justify-center items-center gpa-4 mt-40">
      <CircularProgressIndicator size="large" />
    </div>
  );

  const onPressEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (searching || notFoundAnyResult) return;
        searchHandler(searchValue);
      }
    },
    [searchHandler, searchValue, searching, notFoundAnyResult],
  );

  // Wrap onItemClick to close the panel after selection in menuList (single select) mode
  const handleItemClick = useCallback(
    (item, selected) => {
      onItemClick(item, selected);
      if (useMenuList) {
        closePageFn();
      }
    },
    [onItemClick, useMenuList, closePageFn],
  );

  return (
    <ExpandedLayoutPopper expanded={Boolean(expandMode)}>
      <FocusTrap open>
        <div
          className="outline-none flex flex-col h-full"
          data-sign="referenceSearchPanel"
          tabIndex={-1}
        >
          <PageHeader
            onBackClick={() => {
              closePageFn();
              onBack?.();
            }}
            endAdornment={
              <IconButton
                TooltipProps={{
                  title: addEntityTooltip,
                }}
                data-sign="addEntity"
                symbol={PlusMd}
                color="secondary"
                variant="icon"
                ref={addEntityButtonRef}
                onClick={() => {
                  if (addEntityMenu) {
                    handleMenuOpen();
                  } else {
                    onCreateEntity?.();
                  }
                }}
              />
            }
            className="h-14"
          >
            <span
              className="sui-text sui-text-root truncate"
              title={searchTitle}
            >
              {searchTitle}
            </span>
          </PageHeader>
          <div className="gap-3">
            <div className="mx-4">
              <TextField
                size="medium"
                inputProps={{
                  'data-sign': 'searchPanelSearchInput',
                }}
                value={searchValue}
                disabled={searching}
                fullWidth
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setNoChangeSearchTerm(false);
                }}
                clearBtn
                startAdornment={<Icon symbol={SearchMd} size="small" />}
                onKeyDown={onPressEnter}
              />
            </div>
            {searching && searchingContent}

            {!searching && !notFoundAnyResult && (
              <FilterAndSearchHint
                searchValue={searchValue}
                onClickHandler={() => searchHandler(searchValue)}
                enableSearch={true}
              />
            )}
          </div>

          {!notFoundAnyResult && displayList && displayList.length > 0 && (
            <ReferenceList
              list={displayList}
              onItemClick={handleItemClick}
              selectedMap={selectedMap}
              highLightText={searchValue}
              useMenuList={useMenuList}
              getIcon={getIcon}
            />
          )}

          {notFoundAnyResult && noResultMainContent}
        </div>
      </FocusTrap>
      {addEntityMenu && (
        <Menu
          open={menuOpen}
          anchorEl={() => addEntityButtonRef.current}
          onClose={handleMenuClose}
        >
          {addEntityMenu.options.map((option) => (
            <MenuItem
              key={option.type}
              onClick={() => {
                addEntityMenu.onSelect(option.type);
                handleMenuClose();
              }}
            >
              <span className="mr-2">{option.icon}</span>
              <MenuItemText>{option.label}</MenuItemText>
            </MenuItem>
          ))}
        </Menu>
      )}
    </ExpandedLayoutPopper>
  );
};
