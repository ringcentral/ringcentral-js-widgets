import { Checkbox, FormLabel } from '@ringcentral/spring-ui';
import {
  ariaDescribedByIds,
  descriptionId,
  FormContextType,
  getTemplate,
  labelValue,
  RJSFSchema,
  schemaRequiresTrueValue,
  StrictRJSFSchema,
  WidgetProps,
} from '@rjsf/utils';
import React, { FocusEvent } from 'react';

/** The `CheckBoxWidget` is a widget for rendering boolean properties.
 *  It is typically used to represent a boolean.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function CheckboxWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: WidgetProps<T, S, F>) {
  const {
    schema,
    id,
    value,
    disabled,
    readonly,
    label = '',
    hideLabel,
    autofocus,
    onChange,
    onBlur,
    onFocus,
    registry,
    options,
    uiSchema,
  } = props;
  const DescriptionFieldTemplate = getTemplate<
    'DescriptionFieldTemplate',
    T,
    S,
    F
  >('DescriptionFieldTemplate', registry, options);
  // Because an unchecked checkbox will cause html5 validation to fail, only add
  // the "required" attribute if the field value must be "true", due to the
  // "const" or "enum" keywords
  const required = schemaRequiresTrueValue<S>(schema);

  const _onBlur = ({ target: { value } }: FocusEvent<HTMLButtonElement>) =>
    onBlur(id, value);
  const _onFocus = ({ target: { value } }: FocusEvent<HTMLButtonElement>) =>
    onFocus(id, value);
  const description = options.description ?? schema.description;

  return (
    <>
      {!hideLabel && !!description && (
        <DescriptionFieldTemplate
          id={descriptionId<T>(id)}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      <FormLabel label={labelValue(label, hideLabel, false)}>
        <Checkbox
          inputProps={{
            id: id,
            name: id,
          }}
          checked={typeof value === 'undefined' ? false : Boolean(value)}
          required={required}
          disabled={disabled || readonly}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autofocus}
          onChange={(e) => onChange(e.target.checked)}
          onBlur={_onBlur}
          onFocus={_onFocus}
          aria-describedby={ariaDescribedByIds<T>(id)}
        />
      </FormLabel>
    </>
  );
}
