import {
  RcCheckbox,
  RcFormControlLabel,
  RcFormGroup,
  RcFormLabel,
} from '@ringcentral/juno';
import {
  ariaDescribedByIds,
  enumOptionsDeselectValue,
  enumOptionsIsSelected,
  enumOptionsSelectValue,
  enumOptionsValueForIndex,
  FormContextType,
  labelValue,
  optionId,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import React, { ChangeEvent, FocusEvent } from 'react';

/** The `CheckboxesWidget` is a widget for rendering checkbox groups.
 *  It is typically used to represent an array of enums.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function CheckboxesWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  label,
  hideLabel,
  id,
  disabled,
  options,
  value,
  autofocus,
  readonly,
  required,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, inline, emptyValue } = options;
  const checkboxesValues = Array.isArray(value) ? value : [value];

  const _onChange =
    (index: number) =>
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      if (checked) {
        onChange(
          enumOptionsSelectValue<S>(index, checkboxesValues, enumOptions),
        );
      } else {
        onChange(
          enumOptionsDeselectValue<S>(index, checkboxesValues, enumOptions),
        );
      }
    };

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLButtonElement>) =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLButtonElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));

  return (
    <>
      {labelValue(
        <RcFormLabel required={required} htmlFor={id}>
          {label || undefined}
        </RcFormLabel>,
        hideLabel,
      )}
      <RcFormGroup id={id} row={!!inline}>
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, index: number) => {
            const checked = enumOptionsIsSelected<S>(
              option.value,
              checkboxesValues,
            );
            const itemDisabled =
              Array.isArray(enumDisabled) &&
              enumDisabled.indexOf(option.value) !== -1;
            const checkbox = (
              <RcCheckbox
                id={optionId(id, index)}
                name={id}
                checked={checked}
                disabled={disabled || itemDisabled || readonly}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={autofocus && index === 0}
                onChange={_onChange(index)}
                onBlur={_onBlur}
                onFocus={_onFocus}
                aria-describedby={ariaDescribedByIds<T>(id)}
              />
            );
            return (
              <RcFormControlLabel
                control={checkbox}
                key={index}
                label={option.label}
              />
            );
          })}
      </RcFormGroup>
    </>
  );
}
