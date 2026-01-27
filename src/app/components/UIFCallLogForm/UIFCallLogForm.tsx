import { Form } from '@ringcentral-integration/rjsf-juno';
import validator from '@rjsf/validator-ajv8';
import React, { useMemo } from 'react';

import { ReferenceWidget } from '../ReferenceWidget';

import { UIFCallLogFormProps } from './UIFCallLogForm.interface';

const widgetName = `uif-reference-widget`;
const fields = {
  [widgetName]: ReferenceWidget,
};

export const UIFCallLogForm = (props: UIFCallLogFormProps) => {
  // @ts-ignore
  const { task, editSectionSchema, customLogFields, currentSessionId } =
    props.currentLog;
  const { uiOrder, uiSchema: formSchema, renderSchema } = editSectionSchema;
  const { formRef, referenceFieldOptions, onUpdateCallLog, disabled } = props;

  const uiSchema = useMemo(() => {
    const schema: any = { ...renderSchema };
    Object.keys(referenceFieldOptions).forEach((key) => {
      const referenceFieldOption = referenceFieldOptions[key];
      schema[key] = {
        'ui:field': widgetName,
        'ui:options': {
          ...props,
          referenceFieldOption,
          fieldOption: customLogFields.find(
            (field: any) => field.value === key,
          ),
        },
      };
    });
    return schema;
  }, [renderSchema, referenceFieldOptions, customLogFields, props]);

  return (
    <Form
      schema={formSchema}
      validator={validator}
      // @ts-ignore
      fields={fields}
      onChange={({ formData }) => onUpdateCallLog!(formData, currentSessionId)}
      onSubmit={console.log}
      onError={console.error}
      formData={task}
      ref={formRef}
      uiSchema={{
        ...uiSchema,
        'ui:disabled': disabled,
        'ui:order': uiOrder,
        'ui:submitButtonOptions': {
          norender: true,
        },
      }}
    />
  );
};
