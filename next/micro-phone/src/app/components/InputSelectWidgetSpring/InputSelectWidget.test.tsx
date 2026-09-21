import { useDebounce } from '@ringcentral/spring-ui';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { InputSelectWidget } from './InputSelectWidget';

let mockAutocompleteProps: any;

jest.mock('@ringcentral/spring-ui', () => ({
  ...jest.requireActual('@ringcentral/spring-ui'),
  Autocomplete: (props: any) => {
    const React = jest.requireActual('react');
    mockAutocompleteProps = props;
    return React.createElement('input', {
      'data-sign': 'input-select',
      value: props.inputValue,
      ref: props.inputRef,
      onBlur: props.inputProps?.onBlur,
      onChange: (event: any) => props.onInputChange(event.target.value),
      onFocus: props.inputProps?.onFocus,
    });
  },
  useDebounce: jest.fn(),
}));

describe('InputSelectWidget', () => {
  beforeEach(() => {
    mockAutocompleteProps = undefined;

    const instance = (fn: () => void) => {
      let token = 0;
      const debounceMock = jest.fn(() => {
        const currentToken = ++token;
        return Promise.resolve().then(() => {
          if (currentToken === token) {
            fn();
          }
        });
      });
      (debounceMock as any).cancel = jest.fn(() => {
        token += 1;
      });
      return debounceMock;
    };

    jest.mocked(useDebounce).mockImplementation(instance as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should debounce free-solo typing updates', async () => {
    const onChange = jest.fn();

    render(<InputSelectWidget {...getProps({ onChange })} />);

    const input = screen.getByTestId('input-select');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Typed subject' } });

    expect(input).toHaveValue('Typed subject');
    expect(onChange).not.toHaveBeenCalled();

    await act(async () => {
      await Promise.resolve();
    });

    expect(onChange).toHaveBeenCalledWith('Typed subject');
  });

  it('should commit dropdown selection immediately', async () => {
    const onChange = jest.fn();

    render(<InputSelectWidget {...getProps({ onChange })} />);

    act(() => {
      mockAutocompleteProps.onChange([{ id: 'Follow up', label: 'Follow up' }]);
    });

    expect(screen.getByTestId('input-select')).toHaveValue('Follow up');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('Follow up');

    await act(async () => {
      await Promise.resolve();
    });

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should use the actual input value when Spring reports an over-limit value', async () => {
    const onChange = jest.fn();

    render(<InputSelectWidget {...getProps({ onChange, maxLength: 5 })} />);

    const input = screen.getByTestId('input-select') as HTMLInputElement;
    input.value = 'abcde';

    act(() => {
      mockAutocompleteProps.onInputChange('abcdeabcde');
    });

    expect(input).toHaveValue('abcde');
    expect(onChange).not.toHaveBeenCalled();

    await act(async () => {
      await Promise.resolve();
    });

    expect(onChange).toHaveBeenCalledWith('abcde');
  });
});

function getProps({
  onChange,
  maxLength = 255,
}: {
  onChange: (value: string) => void;
  maxLength?: number;
}) {
  return {
    uiSchema: {
      'ui:options': {
        formKey: 'subject',
        options: ['Follow up'],
        maxLength,
      },
    },
    formData: '',
    schema: {
      title: 'Subject',
    },
    onChange,
  };
}
