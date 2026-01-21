import { Textarea } from '@ringcentral/spring-ui';
import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import React, {
  ChangeEvent,
  FocusEvent,
  FocusEventHandler,
  useMemo,
} from 'react';

export default function TextareaWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: WidgetProps<T, S, F>) {
  const {
    id,
    name, // remove this from textFieldProps
    placeholder,
    required,
    readonly,
    disabled,
    type,
    label,
    hideLabel,
    hideError,
    value,
    onChange,
    onChangeOverride,
    onBlur,
    onFocus,
    autofocus,
    options,
    schema,
    uiSchema,
    rawErrors = [],
    formContext,
    registry,
    InputLabelProps,
    ...textFieldProps
  } = props;
  const _onChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) =>
    onChange(value);
  const _onBlur: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement> = ({
    target: { value },
  }: FocusEvent<HTMLTextAreaElement>) => onBlur(id, value);
  const _onFocus: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement> = ({
    target: { value },
  }: FocusEvent<HTMLTextAreaElement>) => onFocus(id, value);

  const inputProps = useMemo(
    () => ({
      'data-sign': name,
      ...props.inputProps,
    }),
    [name, props.inputProps],
  );
  return (
    <Textarea
      {...props}
      inputProps={inputProps}
      onChange={onChangeOverride || _onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      value={value ?? ''}
      minRows={4}
      maxRows={12}
      rows={options.rows}
      fullWidth
      defaultValue={props.defaultValue as string}
      clearBtn={false}
      variant="outlined"
    />
  );
}
