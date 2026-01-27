import { Autocomplete } from '@ringcentral/spring-ui';
import React, { useState, useCallback, useEffect, useRef } from 'react';

import { InputSelectWidgetProps } from './InputSelectWidget.interface';

export const InputSelectWidget = (filedProps: any) => {
  const {
    uiSchema: { 'ui:options': props },
    formData,
    schema: { title },
    onChange,
  } = filedProps;
  const { options, maxLength } = props as InputSelectWidgetProps;

  const [inputValue, setInputValue] = useState(formData ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const isFromDropdownRef = useRef(false);

  const autoOptions = options.map((opt) => ({ id: opt, label: opt }));

  useEffect(() => {
    setInputValue(formData ?? '');
  }, [formData]);

  const handleInputChange = useCallback(
    (rawInputValue: string) => {
      const newInputValue = trimStrToLen(rawInputValue, maxLength);
      if (!isFromDropdownRef.current) {
        setInputValue(newInputValue);
        onChange(newInputValue);
      }
      isFromDropdownRef.current = false;
    },
    [onChange, maxLength],
  );

  const handleChange = useCallback(
    (selectedItems: any[]) => {
      const selectedValue = selectedItems[0]?.label || '';
      isFromDropdownRef.current = true;
      if (selectedValue) {
        setInputValue(selectedValue);
        onChange(selectedValue);
      }
      setIsOpen(false);
    },
    [onChange],
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
        inputProps={{ maxLength }}
        size="medium"
      />
    </div>
  );
};

function trimStrToLen(str: string, length: number | undefined) {
  if (!str) return '';
  return str.substring(0, length);
}
