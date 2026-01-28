import {
  Option,
  MenuItemText,
  Select,
  SelectProps,
} from '@ringcentral/spring-ui';
import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  FormContextType,
  labelValue,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import React, { ChangeEvent, FocusEvent } from 'react';

/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function SelectWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  schema,
  id,
  name, // remove this from textFieldProps
  options,
  label,
  hideLabel,
  required,
  disabled,
  readonly,
  placeholder,
  value,
  multiple,
  autofocus,
  onChange,
  onBlur,
  onFocus,
  rawErrors = [],
  registry,
  uiSchema,
  hideError,
  formContext,
  ...textFieldProps
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, emptyValue: optEmptyVal } = options;

  multiple = typeof multiple === 'undefined' ? false : !!multiple;

  const emptyValue = multiple ? [] : '';
  const isEmpty =
    typeof value === 'undefined' ||
    (multiple && value.length < 1) ||
    (!multiple && value === emptyValue);

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, optEmptyVal));
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, optEmptyVal));
  const selectedIndexes = enumOptionsIndexForValue<S>(
    value,
    enumOptions,
    multiple,
  );

  return (
    <Select
      variant="outlined"
      data-sign={name}
      id={id}
      name={id}
      label={labelValue(label, hideLabel || !label, false)}
      value={
        !isEmpty && typeof selectedIndexes !== 'undefined'
          ? selectedIndexes
          : emptyValue
      }
      required={required}
      disabled={disabled || readonly}
      focused={autofocus}
      placeholder={placeholder}
      error={rawErrors.length > 0}
      onChange={({ target: { value } }) =>
        onChange(
          enumOptionsValueForIndex<S>(value as any, enumOptions, optEmptyVal),
        )
      }
      renderValue={(value) => {
        return enumOptions?.find((_, i: number) => value === String(i))?.label;
      }}
      onBlur={_onBlur}
      onFocus={_onFocus}
      size="medium"
      {...(textFieldProps as SelectProps)}
      aria-describedby={ariaDescribedByIds<T>(id)}
    >
      {Array.isArray(enumOptions) &&
        enumOptions.map(({ value, label }, i: number) => {
          const disabled: boolean =
            Array.isArray(enumDisabled) && enumDisabled.indexOf(value) !== -1;
          return (
            <Option key={i} value={String(i)} disabled={disabled}>
              <MenuItemText>{label}</MenuItemText>
            </Option>
          );
        })}
    </Select>
  );
}
