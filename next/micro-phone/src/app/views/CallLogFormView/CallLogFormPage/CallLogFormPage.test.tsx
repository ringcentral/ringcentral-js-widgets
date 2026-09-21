import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';

import { CallLogFormPage } from './CallLogFormPage';

type MockFormProps = {
  formData: Record<string, unknown>;
  onChange: (event: { formData: Record<string, unknown> }, id?: string) => void;
};

let mockFormProps: MockFormProps | undefined;
let mockFormUnmountCount = 0;

jest.mock('@ringcentral-integration/rjsf-spring', () => {
  const React = jest.requireActual('react');

  return {
    Form: (props: MockFormProps) => {
      React.useEffect(
        () => () => {
          mockFormUnmountCount += 1;
        },
        [],
      );
      mockFormProps = props;
      return null;
    },
  };
});

describe('CallLogFormPage', () => {
  beforeEach(() => {
    mockFormProps = undefined;
    mockFormUnmountCount = 0;
  });

  const getCallLogFormPage = ({
    formKey,
    onUpdateCallLog,
    task = { subject: 'Initial subject' },
  }: {
    formKey?: string;
    onUpdateCallLog: jest.Mock;
    task?: Record<string, unknown>;
  }) => (
    <CallLogFormPage
      disabled={false}
      editSectionSchema={{
        uiOrder: ['subject'],
        uiSchema: {
          type: 'object',
          properties: {
            subject: {
              type: 'string',
            },
          },
        },
        renderSchema: {},
      }}
      formKey={formKey}
      referenceFields={{}}
      task={task}
      onUpdateCallLog={onUpdateCallLog}
    />
  );

  const renderCallLogFormPage = (onUpdateCallLog: jest.Mock) => {
    act(() => {
      TestRenderer.create(getCallLogFormPage({ onUpdateCallLog }));
    });
  };

  it('marks RJSF lifecycle changes as non-dirty', () => {
    const onUpdateCallLog = jest.fn();
    renderCallLogFormPage(onUpdateCallLog);

    act(() => {
      mockFormProps!.onChange({
        formData: {
          subject: 'Defaulted by RJSF',
        },
      });
    });

    expect(onUpdateCallLog).toHaveBeenCalledWith(
      {
        subject: 'Defaulted by RJSF',
      },
      { markDirty: false },
    );
  });

  it('marks field-origin changes as dirty', () => {
    const onUpdateCallLog = jest.fn();
    renderCallLogFormPage(onUpdateCallLog);

    act(() => {
      mockFormProps!.onChange(
        {
          formData: {
            subject: 'User typed subject',
          },
        },
        'root_subject',
      );
    });

    expect(onUpdateCallLog).toHaveBeenCalledWith(
      {
        subject: 'User typed subject',
      },
      { markDirty: true, changedKeys: ['subject'] },
    );
  });

  it('resets local form state when formKey changes', () => {
    const onUpdateCallLog = jest.fn();
    let renderer: TestRenderer.ReactTestRenderer;

    act(() => {
      renderer = TestRenderer.create(
        getCallLogFormPage({
          formKey: 'session-1',
          onUpdateCallLog,
          task: { subject: 'Session one subject' },
        }),
      );
    });

    act(() => {
      mockFormProps!.onChange(
        {
          formData: {
            subject: 'Local session one draft',
          },
        },
        'root_subject',
      );
    });

    expect(mockFormProps!.formData.subject).toBe('Local session one draft');

    act(() => {
      renderer!.update(
        getCallLogFormPage({
          formKey: 'session-2',
          onUpdateCallLog,
          task: { subject: 'Session two subject' },
        }),
      );
    });

    expect(mockFormUnmountCount).toBe(1);
    expect(mockFormProps!.formData.subject).toBe('Session two subject');
  });
});
