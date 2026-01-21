/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  HTMLDataAttribute,
  useEventListener,
  useForkRef,
  useId,
} from '@ringcentral/spring-ui';
import clsx from 'clsx';
import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

export type SimpleTextFieldAction = {
  /**
   * keep focus inside the text field but not have real input focus for keep focus position and focus ring
   */
  fakeFocus: () => void;
};

export type SimpleTextFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  label?: string;
  className?: string;
  size?: 'large' | 'xlarge';
  disabled?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  inputRef?: React.Ref<any>;
  action?: Ref<SimpleTextFieldAction>;
  RootProps?: React.HTMLAttributes<HTMLDivElement> & HTMLDataAttribute;
  classes?: {
    label?: string;
  };
};

export const preventFocusChange = (e: any) => {
  e.preventDefault();
};

const useFocusTargetProps = (toFocusTarget: React.RefObject<any>) => {
  return useMemo(
    () => ({
      onClick: () => {
        toFocusTarget.current?.focus();
      },
      onMouseDown: preventFocusChange,
    }),
    [toFocusTarget],
  );
};

export const getSimpleTextFieldFocusRingStyles = (disabled?: boolean) =>
  clsx(
    'relative overflow-hidden rounded-sui-sm',
    'focus-ring-inset flex [--sui-focus-ring-color:--sui-color]  sui-color-neutral-b0/20 [--sui-focus-ring-inset-width:1px]',
    disabled
      ? 'bg-neutral-b5'
      : 'hover:bg-neutral-b5 transition-neutral-01-fast hover:sui-color-neutral-b2 [&:has(.focus-visible)]:sui-color-primary-f [&:has(.focus-visible)]:[--sui-focus-ring-inset-width:2px]',
  );

export const SimpleTextField = forwardRef<HTMLDivElement, SimpleTextFieldProps>(
  (
    {
      label,
      className,
      size = 'xlarge',
      disabled,
      startAdornment,
      endAdornment,
      inputRef: inputRefProp,
      action,
      classes,
      RootProps,
      ...rest
    },
    ref,
  ) => {
    const id = useId();

    const inputRef = useRef<HTMLInputElement>(null);
    const fakeFocusRef = useRef<HTMLDivElement>(null);

    const forkedInputRef = useForkRef(inputRef, inputRefProp);
    const focusInputProps = useFocusTargetProps(inputRef);

    useEventListener<KeyboardEvent>(fakeFocusRef, 'keydown', (e) => {
      if (e.key === 'Escape') {
        fakeFocusRef.current?.blur();
        return;
      }

      const isAlphanumericKey = /^[a-zA-Z0-9]$/.test(e.key);
      // Check for arrow keys, alphanumeric keys, and enter, space
      if (
        e.key.startsWith('Arrow') ||
        e.key === 'Enter' ||
        // when be tab, also focus to input that below with not prevent default to move to next element
        e.key === 'Tab' ||
        e.key === ' ' ||
        isAlphanumericKey
      ) {
        inputRef.current?.focus();
      }

      // Prevent the default behavior for all keys except alphanumeric keys
      if (!isAlphanumericKey && e.key !== 'Tab') {
        e.preventDefault();
      }
    });

    // once blur, make that not able to focus manually
    useEventListener(fakeFocusRef, 'blur', () => {
      const elm = fakeFocusRef.current;
      if (elm) {
        elm.tabIndex = -1;
        elm.classList.remove('focus-visible'); // for focus ring
      }
    });

    useImperativeHandle(
      action,
      () => ({
        fakeFocus: () => {
          const elm = fakeFocusRef.current;
          if (elm) {
            elm.tabIndex = 0;
            elm.classList.add('focus-visible'); // for focus ring
            elm.focus();
          }
        },
      }),
      [],
    );

    return (
      <div
        ref={ref}
        className={clsx(
          'sui-form-field sui-form-field-root sui-form-field-outlined sui-text-field sui-text-field-root grow sui-text-field-outlined outline-none',
          disabled && 'sui-disabled pointer-events-none',
          className,
        )}
        aria-disabled={disabled}
        {...RootProps}
      >
        <label
          htmlFor={id}
          className={clsx(
            'sui-form-field-label sui-form-field-outlined-label inline-block max-w-fit',
            classes?.label,
          )}
        >
          {label}
        </label>
        <div
          className={clsx(
            size === 'large' && 'h-9',
            size === 'xlarge' && 'h-12',
            'flex items-center',
            getSimpleTextFieldFocusRingStyles(disabled),
          )}
        >
          <i className="sr-only" tabIndex={-1} ref={fakeFocusRef} />
          {startAdornment && (
            <div className="flex items-center pl-3" {...focusInputProps}>
              {startAdornment}
            </div>
          )}
          <input
            tabIndex={disabled ? -1 : undefined}
            ref={forkedInputRef}
            disabled={disabled}
            autoComplete="off"
            id={id}
            className={clsx(
              'sui-text-field-input pl-3 h-full w-full pr-3',
              disabled && 'text-neutral-b3',
            )}
            {...rest}
          />
          {endAdornment && (
            <div className="flex items-center pr-3" {...focusInputProps}>
              {endAdornment}
            </div>
          )}
        </div>
      </div>
    );
  },
);

SimpleTextField.displayName = 'SimpleTextField';
