import { render, cleanup } from '@testing-library/react';
import React from 'react';

import TextareaWidget from './TextareaWidget';

let mockTextareaProps: Record<string, any>;

jest.mock('@ringcentral-integration/react-hooks', () => ({
  useDebouncedFieldState: () => ({
    inputValue: 'draft value',
    setInputValue: jest.fn(),
    focusInput: jest.fn(),
    blurInput: jest.fn(),
  }),
}));

jest.mock('@ringcentral/spring-ui', () => ({
  Textarea: (props: Record<string, any>) => {
    mockTextareaProps = props;
    return null;
  },
}));

describe('TextareaWidget', () => {
  afterEach(() => {
    cleanup();
    mockTextareaProps = undefined as any;
  });

  it('handles blur without an event from Spring Textarea', () => {
    const onBlur = jest.fn();

    render(
      <TextareaWidget
        id="notes"
        name="notes"
        label="Notes"
        value="draft value"
        onChange={jest.fn()}
        onBlur={onBlur}
        onFocus={jest.fn()}
        options={{}}
        schema={{ type: 'string' }}
        registry={{} as any}
      />,
    );

    expect(() => mockTextareaProps.onBlur(undefined)).not.toThrow();
    expect(onBlur).toHaveBeenCalledWith('notes', 'draft value');

    mockTextareaProps.onBlur({
      target: { value: 'updated value' },
    });
    expect(onBlur).toHaveBeenLastCalledWith('notes', 'updated value');
  });

  it('handles focus without an event from Spring Textarea', () => {
    const onFocus = jest.fn();

    render(
      <TextareaWidget
        id="notes"
        name="notes"
        label="Notes"
        value="draft value"
        onChange={jest.fn()}
        onBlur={jest.fn()}
        onFocus={onFocus}
        options={{}}
        schema={{ type: 'string' }}
        registry={{} as any}
      />,
    );

    expect(() => mockTextareaProps.onFocus(undefined)).not.toThrow();
    expect(onFocus).toHaveBeenCalledWith('notes', 'draft value');

    mockTextareaProps.onFocus({
      target: { value: 'updated value' },
    });
    expect(onFocus).toHaveBeenLastCalledWith('notes', 'updated value');
  });
});
