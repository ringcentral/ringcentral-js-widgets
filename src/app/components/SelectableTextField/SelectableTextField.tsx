import {
  ExpandCollapseCaret,
  getGrow,
  ListItem,
  Menu,
  Squircle,
  TextField,
  useEventListener,
  useForceUpdate,
  useKeyboardMoveFocus,
  useRefState,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, { useMemo, useRef, useState } from 'react';

interface SelectableTextFieldProps {
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
}

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
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);
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

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const { listen: listenRootKeyDown, remove: stopListenRootKeyDown } =
    useEventListener(
      ref,
      'keydown',
      () => {
        focusInput();
      },
      {
        once: true,
        startImmediately: false,
      },
    );

  const focusRoot = () => {
    const rootElm = ref.current;
    if (rootElm) {
      rootElm.tabIndex = 0;
      rootElm.focus();
      listenRootKeyDown();
    }
  };

  const selectItem = (value: string) => {
    setMenuOpened(false);
    setInnerValue(value);
    onChange(value);
    setInputFocus(false);
    focusRoot();
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

  return (
    <div>
      <TextField
        ref={ref}
        classes={{
          formFieldContent: 'pointer-events-none pr-2',
        }}
        RootProps={{
          className: 'outline-none',
          onClick: focusInput,
          onBlur: () => {
            stopListenRootKeyDown();
            ref.current!.tabIndex = -1;
          },
        }}
        inputRef={inputRef}
        fullWidth
        label={label}
        className={clsx(!inputFocus && hasOptions && '[&_input]:text-right')}
        size="large"
        clearBtn={false}
        disabled={disabled}
        inputProps={{
          maxLength: 30,
          'data-sign': 'autocompleteInput',
        }}
        startAdornment={
          !!selectedLabel &&
          !hideLabel && (
            <span
              data-sign="selectedLabel"
              className={clsx(
                'typography-mainText max-w-20 truncate pointer-events-auto',
              )}
              title={selectedLabel}
            >
              {selectedLabel}
            </span>
          )
        }
        endAdornment={
          hasOptions ? (
            <Squircle
              className={clsx(
                'sui-select-chevron',
                menuOpened
                  ? 'text-primary-f sui-squircle-bg-color-neutral-b4'
                  : '',
              )}
              interactive={false}
            >
              <ExpandCollapseCaret
                tabIndex={-1}
                size={'small'}
                expanded={menuOpened}
              />
            </Squircle>
          ) : undefined
        }
        value={inputFocus ? innerValueRef.current : value}
        variant="outlined"
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
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (menuOpened && focusedIndexRef.current >= 0) {
              selectItem(displayOptions[focusedIndexRef.current].value);
            } else {
              focusRoot();
            }
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
              focusRoot();
            }
            e.preventDefault();
            return;
          }

          onKeyFocusedIndexHandle(e);
        }}
        onBlur={() => {
          setMenuOpened(false);
          setInputFocus(false);
          const innerValue = innerValueRef.current;
          if (!innerValue.trim()) {
            setInnerValue(value);
          } else {
            onChange(innerValue || options?.[0]?.value || '');
          }
        }}
      />
      {!!hasOptions && (
        <Menu
          data-sign="autocompleteMenu"
          disableAutoFocus
          disableRestoreFocus
          disableBackdropClick
          hideBackdrop
          placement="bottom"
          PopperProps={{
            offset: 0,
            matchAnchorWidth: true,
          }}
          motionProps={motionProps}
          open={Boolean(ref.current) && menuOpened}
          anchorEl={ref.current}
          onClose={() => {
            setMenuOpened(false);
          }}
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
              <div className="flex justify-between w-full">
                <span>{label}</span>
                <span>{value}</span>
              </div>
            </ListItem>
          ))}
        </Menu>
      )}
    </div>
  );
};
