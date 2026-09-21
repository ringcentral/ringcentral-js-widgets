import { useDebouncedFieldState } from '@ringcentral-integration/react-hooks';
import { Autocomplete } from '@ringcentral/spring-ui';
import React, { useState, useCallback, useRef } from 'react';

import { InputSelectWidgetProps } from './InputSelectWidget.interface';

export const InputSelectWidget = (filedProps: any) => {
  const {
    uiSchema: { 'ui:options': props },
    formData,
    schema: { title },
    onChange,
  } = filedProps;
  const { options, maxLength } = props as InputSelectWidgetProps;

  const { inputValue, setInputValue, focusInput, blurInput } =
    useDebouncedFieldState({
      value: formData ?? '',
      onChange,
      shouldDebounceOnChange: true,
    });
  const [isOpen, setIsOpen] = useState(false);
  const isFromDropdownRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const autoOptions = options.map((opt) => ({ id: opt, label: opt }));

  const handleInputChange = useCallback(
    (rawInputValue: string) => {
      const actualInputValue = inputRef.current?.value;
      const isOverMaxLength =
        maxLength !== undefined && rawInputValue.length > maxLength;

      // Spring Autocomplete can report a duplicated over-limit value when editing
      // a maxLength input under heavy rendering pressure. The DOM input already
      // has the correct browser-applied edit and caret position, so prefer it in
      // that case to avoid rewriting the controlled value and moving the caret.
      const valueToApply =
        isOverMaxLength && actualInputValue !== undefined
          ? actualInputValue
          : rawInputValue;
      const newInputValue = trimStrToLen(valueToApply, maxLength);

      if (!isFromDropdownRef.current) {
        setInputValue(newInputValue);
      }
      isFromDropdownRef.current = false;
    },
    [setInputValue, maxLength],
  );

  const handleChange = useCallback(
    (selectedItems: any[]) => {
      const selectedValue = selectedItems[0]?.label || '';
      isFromDropdownRef.current = true;
      if (selectedValue) {
        setInputValue(selectedValue, { flush: true });
      }
      setIsOpen(false);
    },
    [setInputValue],
  );

  const handleToggleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <Autocomplete
        RootProps={{
          'data-sign': 'subject',
        }}
        freeSolo
        toggleButton
        label={title}
        value={[]} // Keep value as empty array since we're using inputValue for the actual value
        inputValue={inputValue}
        inputRef={inputRef}
        onInputChange={handleInputChange}
        onChange={handleChange}
        onClose={handleClose}
        options={autoOptions}
        ToggleButtonProps={{
          disabled: false,
          onClick: handleToggleClick,
        }}
        inputVariant="outlined"
        openOnFocus={false}
        toggleWithInput={false}
        open={isOpen}
        inputProps={{ maxLength, onFocus: focusInput, onBlur: blurInput }}
        size="medium"
      />
    </div>
  );
};

function trimStrToLen(str: string, length: number | undefined) {
  if (!str) return '';
  return str.substring(0, length);
}
