import { useDebouncedFieldState } from '@ringcentral-integration/react-hooks';
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
  const { inputValue, setInputValue, focusInput, blurInput } =
    useDebouncedFieldState({
      value: value ?? '',
      onChange,
      shouldDebounceOnChange: true,
    });
  const _onChange = ({ target: { value } }: ChangeEvent<HTMLTextAreaElement>) =>
    setInputValue(value);
  const _onBlur: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement> = (
    event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    blurInput();
    onBlur(id, event?.target?.value ?? inputValue);
  };
  const _onFocus: FocusEventHandler<HTMLTextAreaElement | HTMLInputElement> = (
    event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    focusInput();
    onFocus(id, event?.target?.value ?? inputValue);
  };

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
      onChange={_onChange}
      onBlur={_onBlur}
      onFocus={_onFocus}
      value={inputValue}
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
