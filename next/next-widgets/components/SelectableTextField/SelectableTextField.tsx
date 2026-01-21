import {
  ExpandCollapseCaret,
  getGrow,
  ListItem,
  Menu,
  setSelectionPosition,
  Squircle,
  useForceUpdate,
  useKeyboardMoveFocus,
  useRefState,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useMemo, useRef, useState } from 'react';

import {
  SimpleTextField,
  SimpleTextFieldAction,
  SimpleTextFieldProps,
} from './SimpleTextField';

type SelectableTextFieldProps = {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
  searchable?: boolean;
  /**
   * Label for the custom option
   */
  freeSoloOptionLabel?: string;
  /**
   * debug mode for development
   */
  debug?: boolean;
} & Omit<SimpleTextFieldProps, 'onChange'>;

const motionProps = getGrow({
  direction: 'y',
  transformOrigin: {
    vertical: 'bottom',
    horizontal: 'center',
  },
});

/**
 * A text field with a dropdown menu that allows selecting from a list of options.
 *
 * also support search feature when `searchable` is `true`
 */
export const SelectableTextField: React.FC<SelectableTextFieldProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  searchable = false,
  freeSoloOptionLabel = 'Custom',
  debug,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const focusedIndexRef = useRef(-1);

  const [inputFocus, setInputFocus] = useState(false);
  const [menuOpened, _setMenuOpened] = useState(false);
  const [searching, setSearching] = useState(false);
  const [innerValueRef, setInnerValue] = useRefState(value);
  const forceUpdate = useForceUpdate();

  const innerValue = innerValueRef.current;

  const displayOptions = useMemo(() => {
    if (!searching || !searchable) return options;

    return options.filter(({ value }) => value.includes(innerValue));
  }, [options, innerValue, searching, searchable]);

  const selectedLabel = useMemo(() => {
    if (!value) return '';

    const selected = options.find((option) => option.value === value);
    return selected ? selected.label : freeSoloOptionLabel;
  }, [value, options, freeSoloOptionLabel]);

  const hasOptions = options.length > 0;

  const setMenuOpened = (val: boolean) => {
    if (menuOpened && menuOpened !== val) {
      focusedIndexRef.current = -1;
      setSearching(false);
    }
    _setMenuOpened(val);
  };

  const selectItem = (value: string) => {
    setMenuOpened(false);
    setInnerValue(value);
    onChange(value);
    setInputFocus(false);
    fakeFocus();
  };

  const { onKeyFocusedIndexHandle } = useKeyboardMoveFocus({
    options: displayOptions,
    focusedIndexRef,
    infinite: true,
    columns: 1,
    onFocusedIndexChange: (event, toIndex) => {
      event.preventDefault();
      focusedIndexRef.current = toIndex;
      forceUpdate();
    },
  });

  const hideLabel = inputFocus || !hasOptions;

  const actionRef = useRef<SimpleTextFieldAction>(null);

  const fakeFocus = () => {
    actionRef.current?.fakeFocus();
  };

  return (
    <>
      <SimpleTextField
        ref={ref}
        inputRef={inputRef}
        action={actionRef}
        label={label}
        className="w-full"
        disabled={disabled}
        startAdornment={
          !!selectedLabel &&
          !hideLabel && (
            <span
              data-sign="selectedLabel"
              className={clsx('typography-mainText max-w-20 truncate')}
              title={selectedLabel}
            >
              {selectedLabel}
            </span>
          )
        }
        endAdornment={
          hasOptions ? (
            <Squircle
              ref={endRef}
              className={clsx(
                'sui-select-chevron',
                '-mr-1',
                menuOpened
                  ? 'text-primary-f sui-squircle-bg-color-neutral-b4'
                  : '',
              )}
              interactive={false}
            >
              <ExpandCollapseCaret
                data-sign="expandCollapseCaret"
                onClick={() => {
                  if (menuOpened) {
                    fakeFocus();
                  }
                }}
                tabIndex={-1}
                size={'small'}
                expanded={menuOpened}
                className={disabled ? 'text-neutral-b3' : ''}
              />
            </Squircle>
          ) : undefined
        }
        value={inputFocus ? innerValueRef.current : value}
        onChange={(e) => {
          focusedIndexRef.current = -1;
          const currentValue = e.target.value;
          setInnerValue(currentValue);
          if (searchable && menuOpened) {
            setSearching(true);
          }
          setMenuOpened(true);
        }}
        onFocus={() => {
          setMenuOpened(true);
          setInputFocus(true);
          const inputElm = inputRef.current;
          if (inputElm) {
            setSelectionPosition(inputElm, {
              start: 0,
              end: inputElm.value.length,
            });
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (menuOpened && focusedIndexRef.current >= 0) {
              selectItem(displayOptions[focusedIndexRef.current].value);
            }

            fakeFocus();
            e.preventDefault();
            return;
          }

          if (!menuOpened && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
            setMenuOpened(true);
            focusedIndexRef.current = 0;
            e.preventDefault();
            return;
          }

          if (e.key === 'Escape') {
            if (menuOpened) {
              setMenuOpened(false);
            } else {
              setInnerValue(value, false);
              fakeFocus();
            }
            e.preventDefault();
            return;
          }

          onKeyFocusedIndexHandle(e);
        }}
        onBlur={() => {
          if (debug) return;

          setMenuOpened(false);
          setInputFocus(false);
          const innerValue = innerValueRef.current;
          if (!innerValue.trim()) {
            setInnerValue(value);
          } else {
            onChange(innerValue || options?.[0]?.value || '');
          }
        }}
        {...rest}
      />

      <Menu
        data-sign="autocompleteMenu"
        disableAutoFocus
        disableRestoreFocus
        placement="bottom"
        PopperProps={{
          offset: 0,
          matchAnchorWidth: true,
        }}
        classes={{
          paper: 'pointer-events-auto max-w-full',
          root: displayOptions.length === 0 ? 'hidden' : '',
        }}
        // make whole not able to receive focus and click event
        className="pointer-events-none"
        motionProps={motionProps}
        open={Boolean(ref.current) && menuOpened}
        anchorEl={ref.current}
      >
        {displayOptions.map(({ label, value }, i) => (
          <ListItem
            data-sign="selectMenuItem"
            key={value}
            divider={false}
            focused={focusedIndexRef.current === i}
            onClick={() => {
              selectItem(value);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex justify-between w-full typography-mainText">
              <span>{label}</span>
              <span>{value}</span>
            </div>
          </ListItem>
        ))}
      </Menu>
    </>
  );
};
