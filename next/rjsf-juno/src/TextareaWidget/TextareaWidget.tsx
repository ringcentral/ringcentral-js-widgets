import {
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  WidgetProps,
  getTemplate,
} from '@rjsf/utils';
import React from 'react';

/** The `TextareaWidget` is a widget for rendering input fields as textarea.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function TextareaWidget<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any,
>(props: WidgetProps<T, S, F>) {
  const { options, registry } = props;
  const BaseInputTemplate = getTemplate<'BaseInputTemplate', T, S, F>(
    'BaseInputTemplate',
    registry,
    options,
  );
  
  if (typeof options.rows === 'string' || typeof options.rows === 'number') {
    return <BaseInputTemplate {...props} rows={options.rows} multiline clearBtn={false} />;
  }

  return <BaseInputTemplate {...props} multiline clearBtn={false} />;
}
