import {
  RcButton,
  RcCheckbox,
  RcIcon,
  RcMenuItem,
  RcPopover,
  RcTextField,
} from '@ringcentral/juno';
import { ArrowDown2 as ArrowDropDownIcon } from '@ringcentral/juno-icon';
import type { FunctionComponent } from 'react';
import React, { useRef, useState, useMemo, useCallback } from 'react';

import { PickListOption } from '../FieldItem.interface';

import { t } from './i18n';

/**
 * TODO:
 * 1. this feature needs to be UX reviewed if prioritized
 */

export type MultiSelectFieldProps = {
  options: PickListOption[];
  labelClassName?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  helperText?: React.ReactNode;
  error?: boolean;
  required?: boolean;
  onOpen?: () => void;
};

export const MultiSelectField: FunctionComponent<MultiSelectFieldProps> = ({
  options,
  labelClassName,
  value = [],
  onChange,
  label,
  placeholder,
  disabled = false,
  onOpen,
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>(() =>
    value.filter((v) => v.trim() !== ''),
  );

  const filteredValues = useMemo(() => {
    return selectedValues.filter((v) => v.trim() !== '');
  }, [selectedValues]);

  const handleFieldClick = useCallback(() => {
    setAnchorEl(fieldRef.current);
    onOpen?.();
  }, [onOpen]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = useCallback(
    (selectedValue: string) => {
      const newValue = selectedValues.includes(selectedValue)
        ? selectedValues.filter((item) => item !== selectedValue)
        : [...selectedValues, selectedValue];
      setSelectedValues(newValue.filter((v) => v.trim() !== ''));
    },
    [selectedValues],
  );

  const handleOkClick = useCallback(() => {
    onChange?.(filteredValues);
    handleClose();
  }, [onChange, filteredValues, handleClose]);

  const displayValue = useMemo(() => {
    return filteredValues.length > 0
      ? filteredValues
          .map((value) => {
            const option = options.find((o) => o.value === value);
            return option?.label || value;
          })
          .join(', ')
      : '';
  }, [options, filteredValues]);

  return (
    <div ref={fieldRef}>
      <RcTextField
        clearBtn={false}
        onClick={handleFieldClick}
        value={displayValue}
        placeholder={placeholder}
        label={label}
        disabled={disabled}
        fullWidth
        InputProps={{
          readOnly: true,
          endAdornment: <RcIcon size="small" symbol={ArrowDropDownIcon} />,
        }}
        {...rest}
      />
      <RcPopover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            width: fieldRef.current?.offsetWidth || '100%',
          },
        }}
      >
        {anchorEl && (
          <div>
            {options.map((item, index) => (
              <RcMenuItem key={index} onClick={() => handleSelect(item.value)}>
                <RcCheckbox
                  checked={selectedValues.includes(item.value)}
                  onChange={() => handleSelect(item.value)}
                />
                {item.label}
              </RcMenuItem>
            ))}
            <div>
              <RcButton variant="contained" onClick={handleOkClick}>
                {t('ok')}
              </RcButton>
            </div>
          </div>
        )}
      </RcPopover>
    </div>
  );
};
