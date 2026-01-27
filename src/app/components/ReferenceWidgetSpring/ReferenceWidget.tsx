import { useLocale } from '@ringcentral-integration/micro-core/src/app/hooks';
import { PlusMd } from '@ringcentral/spring-icon';
import {
  Autocomplete,
  AutocompleteProps,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  MenuItemText,
} from '@ringcentral/spring-ui';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import {
  ReferenceItemClickHandler,
  ReferenceWidgetAddEntityMenuProps,
  ReferenceWidgetProps,
  SelectedIdMap,
  SimpleCrmObject,
} from './ReferenceWidget.interface';
import { useReferencePopper } from './components/ReferencePopper';
import { ReferenceSearchPanel } from './components/ReferenceSearchPanel';
import i18n from './i18n';

export const ReferenceWidget = (filedProps: any) => {
  const {
    uiSchema: { 'ui:options': props },
    formData,
    schema,
  } = filedProps;

  // Ensure currentValue is always an array
  const currentValue = useMemo(
    () => (Array.isArray(formData) ? formData : []),
    [formData],
  );

  const { t } = useLocale(i18n);

  const {
    overrideLabel,
    disabled,
    onChange,
    allDisplayList,
    onCreateEntity,
    addEntityMenu,
    enableSearch,
    formKey,
    searchFn,
    multiple,
    expandMode,
    useMenuList = false,
    getIcon,
    showChips = true,
    addEntityTooltip,
    autoCloseOnSelect = false,
    clearBtnClearsSelection = false,
  } = props as ReferenceWidgetProps & {
    expandMode: boolean;
    showChips?: boolean;
    addEntityMenu?: ReferenceWidgetAddEntityMenuProps;
  };
  const withAddEntityButtonRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const [inputValue, setInputValue] = useState('');
  const [searchOpened, setSearchOpened] = useState(false);
  const matchedCount = allDisplayList.reduce(
    (acc, list) => acc + list.values.length,
    0,
  );
  const selectedMap = useMemo(
    () =>
      currentValue.reduce((acc, item) => {
        if (item && item.id) {
          acc[item.id] = true;
        }
        return acc;
      }, {} as SelectedIdMap),
    [currentValue],
  );

  const fieldLabel = overrideLabel ?? schema.title;
  const referenceItemClickHandler = useCallback<ReferenceItemClickHandler>(
    (item, selected) => {
      let newValues: SimpleCrmObject[] = [];
      if (!multiple) {
        newValues = selected ? [item] : [];
      } else {
        newValues = selected
          ? [...currentValue, item]
          : currentValue.filter(
              (record: SimpleCrmObject) => record.id !== item.id,
            );
      }
      onChange(newValues, { item, selected });

      if (autoCloseOnSelect && selected && autocompleteRef.current) {
        const inputElement = inputRef.current;
        if (inputElement) {
          inputElement.blur();
        }
      }
    },
    [onChange, currentValue, multiple, autoCloseOnSelect],
  );

  const openSearchPage = useCallback(() => {
    setSearchOpened(true);
  }, []);
  const closeSearchPage = useCallback(() => {
    setSearchOpened(false);
  }, []);
  const anchorEl = useCallback(() => withAddEntityButtonRef.current, []);

  const CustomPopper = useReferencePopper({
    filterTerm: inputValue,
    allDisplayList,
    currentValue,
    formKey,
    onItemClick: referenceItemClickHandler,
    enableSearch,
    searchFn: openSearchPage,
    useMenuList,
    getIcon,
    anchorEl,
  });

  const renderTags: AutocompleteProps['renderTags'] = useCallback(
    (values, getTagProps) => {
      if (!showChips) {
        if (!values || values.length === 0) {
          return null;
        }
        return (
          <span
            className="typography-mainText text-neutral-b1 truncate"
            style={{ maxWidth: '75%' }} // tailwind css not computing max-w-[75%]
          >
            {values[0]?.name || ''}
          </span>
        );
      }
      return values.map((item: any, index: number) => {
        const tagProps = getTagProps(item, index);
        const { id, name, type } = item as SimpleCrmObject;

        return (
          <Chip
            data-sign={`chip-${id ?? index}`}
            key={index}
            {...tagProps}
            label={name}
            onDelete={() => {
              referenceItemClickHandler(item, false);
            }}
            truncate
          />
        );
      });
    },
    [referenceItemClickHandler, showChips],
  );

  const showAddEntityButton = Boolean(onCreateEntity || addEntityMenu);

  // Ref and state for the add entity menu
  const addEntityButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => setMenuOpen(true);
  const handleMenuClose = () => setMenuOpen(false);

  const onPressEnter = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (!enableSearch || inputValue.length < 3 || searchOpened) return;
        // setSearchOpenedState(formKey);
        setSearchOpened(true);
      }
    },
    [enableSearch, inputValue, searchOpened, setSearchOpened],
  );

  const ReferenceInput = (
    <Autocomplete
      ref={autocompleteRef}
      inputRef={inputRef}
      RootProps={{
        'data-sign': formKey,
        className: 'max-w-full',
      }}
      ClearButtonProps={
        {
          'data-sign': 'removeBtn',
          ...(clearBtnClearsSelection && {
            onClick: () => {
              setInputValue('');
              if (currentValue && currentValue.length > 0) {
                currentValue.forEach((item) => {
                  referenceItemClickHandler(item, false);
                });
              }
            },
          }),
          // TODO: spring-ui issue with data-props miss, so must as any
        } as any
      }
      placeholder={t('matchedRecordsTips', { matchedCount })}
      disabled={disabled}
      clearBtn={
        !!inputValue.length ||
        (clearBtnClearsSelection && currentValue && currentValue.length > 0)
      }
      multiple
      toggleButton
      //@ts-ignore
      PopperComponent={CustomPopper}
      PopperProps={{
        anchorElType: 'root',
        placement: 'bottom',
      }}
      value={currentValue}
      onClose={(e, reason) => {
        if (reason === 'blur' || reason === 'escape') {
          setInputValue('');
        }
      }}
      options={[]}
      label={fieldLabel}
      inputValue={inputValue}
      onInputChange={(newInputValue) => {
        setInputValue(newInputValue);
      }}
      ToggleButtonProps={{
        disabled: false,
      }}
      renderTags={renderTags}
      inputVariant="outlined"
      onKeyDown={onPressEnter}
      size="medium"
    />
  );
  return (
    <>
      {showAddEntityButton ? (
        <div className="flex items-center gap-2" ref={withAddEntityButtonRef}>
          <div className="flex-1 min-w-0">{ReferenceInput}</div>
          <IconButton
            data-sign="addEntity"
            className="mt-6 flex-shrink-0"
            TooltipProps={{
              title: addEntityTooltip,
            }}
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
            size="medium"
          />
        </div>
      ) : (
        ReferenceInput
      )}
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
      {searchOpened && (
        <ReferenceSearchPanel
          expandMode={expandMode}
          onBack={() => {
            setInputValue('');
            inputRef.current?.focus();
          }}
          closePageFn={closeSearchPage}
          onCreateEntity={onCreateEntity}
          addEntityMenu={addEntityMenu}
          onItemClick={referenceItemClickHandler}
          selectedMap={selectedMap}
          searchFn={searchFn}
          initValue={inputValue}
          useMenuList={useMenuList}
          getIcon={getIcon}
          addEntityTooltip={addEntityTooltip}
        />
      )}
    </>
  );
};
