import { FormLabel, RadioGroup, Radio } from '@ringcentral/spring-ui';
import {
  ariaDescribedByIds,
  enumOptionsIndexForValue,
  enumOptionsValueForIndex,
  FormContextType,
  labelValue,
  optionId,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import React, { FocusEvent, ChangeEventHandler } from 'react';

/** The `RadioWidget` is a widget for rendering a radio group.
 *  It is typically used with a string property constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function RadioWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>({
  id,
  options,
  value,
  required,
  disabled,
  readonly,
  label,
  hideLabel,
  onChange,
  onBlur,
  onFocus,
}: WidgetProps<T, S, F>) {
  const { enumOptions, enumDisabled, emptyValue } = options;

  const _onChange = (event: any) => onChange(event.target.value);
  const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onBlur(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) =>
    onFocus(id, enumOptionsValueForIndex<S>(value, enumOptions, emptyValue));

  const row = options ? options.inline : false;
  const selectedIndex = enumOptionsIndexForValue<S>(value, enumOptions) ?? null;

  return (
    <>
      {labelValue(
        <FormLabel htmlFor={id}>{label || undefined}</FormLabel>,
        hideLabel,
      )}
      <RadioGroup
        id={id}
        name={id}
        defaultValue={selectedIndex as string}
        row={row as boolean}
        onChange={_onChange}
        onBlur={_onBlur}
        onFocus={_onFocus}
        aria-describedby={ariaDescribedByIds<T>(id)}
      >
        {Array.isArray(enumOptions) &&
          enumOptions.map((option, index) => {
            const itemDisabled =
              Array.isArray(enumDisabled) &&
              enumDisabled.indexOf(option.value) !== -1;
            const radio = (
              <FormLabel
                label={option.label}
                value={String(index)}
                key={index}
                disabled={disabled || itemDisabled || readonly}
              >
                <Radio name={id} />
              </FormLabel>
            );

            return radio;
          })}
      </RadioGroup>
    </>
  );
}
