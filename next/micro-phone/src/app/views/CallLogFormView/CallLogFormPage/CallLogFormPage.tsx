import { useAsyncState } from '@ringcentral-integration/react-hooks';
import { Form } from '@ringcentral-integration/rjsf-spring';
import { useEventCallback } from '@ringcentral/spring-ui';
import validator from '@rjsf/validator-ajv8';
import clsx from 'clsx';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import type { FunctionComponent } from 'react';
import React, { memo, useMemo } from 'react';

import {
  InputSelectWidget,
  InputSelectWidgetProps,
} from '../../../components/InputSelectWidgetSpring';
import { ReferenceWidget } from '../../../components/ReferenceWidgetSpring';
import { SpringUIDateWidget } from '../../../components/SpringUIDateWidget';
import type { CallLogFormViewPanelProps } from '../CallLogForm.view.interface';

const referenceWidgetName = `uif-reference-widget`;
const inputSelectWidgetName = `input-select-widget`;
const springuiDateWidgetName = `springui-date`;

const fields = {
  [referenceWidgetName]: ReferenceWidget,
  [inputSelectWidgetName]: InputSelectWidget,
  [springuiDateWidgetName]: SpringUIDateWidget,
};

const CallLogFormPageContent: FunctionComponent<CallLogFormViewPanelProps> = (
  props,
) => {
  const {
    task,
    editSectionSchema,
    referenceFields,
    onUpdateCallLog,
    disabled,
    variant = 'expanded',
    children,
  } = props;
  const { uiOrder, uiSchema: formSchema, renderSchema } = editSectionSchema;
  const uiSchema = useMemo(() => {
    const schema = { ...renderSchema };

    Object.keys(referenceFields).forEach((key) => {
      const referenceFieldProps = referenceFields[key];
      const referenceType =
        (referenceFieldProps as InputSelectWidgetProps).referenceType ??
        referenceWidgetName;

      schema[key] = {
        'ui:field': referenceType,
        'ui:options': {
          ...referenceFieldProps,
          expandMode: variant === 'expanded',
        },
      };
    });
    return schema;
  }, [referenceFields, renderSchema, variant]);

  const _uiSchema = useMemo(
    () => ({
      ...uiSchema,
      'ui:disabled': disabled,
      'ui:order': uiOrder,
      'ui:submitButtonOptions': {
        norender: true,
      },
    }),
    [disabled, uiOrder, uiSchema],
  );

  const innerFirstFieldKeys = useMemo(
    () =>
      Object.keys(formSchema.properties).filter((key) => {
        const value = formSchema.properties[key];
        return (
          value.type === 'string' && !('anyOf' in value) && !('items' in value)
        );
      }),
    [formSchema.properties],
  );

  /**
   * split the task into two parts, one part is the inner first fields, the other part is the outer directly fields
   *
   *  to avoid unnecessary re-render cause the input anchor to lose focus or position jump
   */
  const [innerFirstState, outerDirectlyState] = useMemo(() => {
    const inner = pick(task, innerFirstFieldKeys);
    const outer = omit(task, innerFirstFieldKeys);
    return [inner, outer];
  }, [task, innerFirstFieldKeys]);

  const [innerFirstFields, setInnerFirstField] = useAsyncState(innerFirstState);

  const handleChange = useEventCallback(({ formData }, id?: string) => {
    // RJSF passes the id of the field that changed (e.g. `root_subject`).
    // Strip the `root_` prefix to recover the task field key so we only mark
    // the field the user actually edited as dirty, instead of diffing the
    // whole formData (which races against async contact-match population).
    const changedKey = id?.replace(/^root_/, '') || undefined;
    onUpdateCallLog(formData, {
      markDirty: Boolean(id),
      changedKeys: changedKey ? [changedKey] : undefined,
    });
    setInnerFirstField(pick(formData, innerFirstFieldKeys));
  });

  const formData = useMemo(
    () => ({
      ...innerFirstFields,
      ...outerDirectlyState,
    }),
    [innerFirstFields, outerDirectlyState],
  );
  return (
    <>
      <div
        className={clsx(
          'pb-2 px-3 flex-grow',
          variant === 'expanded' && 'overflow-y-auto overflow-x-hidden',
        )}
        data-sign="call-log-panel"
      >
        <Form
          schema={formSchema}
          validator={validator}
          fields={fields}
          onChange={handleChange}
          onSubmit={console.log}
          onError={console.error}
          formData={formData}
          uiSchema={_uiSchema}
        />
      </div>

      {children}
    </>
  );
};

const _CallLogFormPage: FunctionComponent<CallLogFormViewPanelProps> = (
  props,
) => {
  return <CallLogFormPageContent key={props.formKey ?? 'default'} {...props} />;
};

_CallLogFormPage.displayName = 'CallLogFormPage';

export const CallLogFormPage = memo(_CallLogFormPage);
