import { render } from '@testing-library/react';
import React from 'react';

import CheckboxWidget from './CheckboxWidget';

let mockCheckboxProps: Record<string, any>;

jest.mock('@ringcentral/spring-ui', () => ({
  Checkbox: (props: Record<string, any>) => {
    mockCheckboxProps = props;
    return null;
  },
  FormLabel: ({ children }: { children: React.ReactNode }) => children,
}));

describe('CheckboxWidget', () => {
  it('emits the checked state on change', () => {
    const onChange = jest.fn();

    render(
      <CheckboxWidget
        id="agree"
        name="agree"
        label="Agree"
        value={false}
        onChange={onChange}
        onBlur={jest.fn()}
        onFocus={jest.fn()}
        options={{}}
        schema={{ type: 'boolean' }}
        registry={{ templates: {} } as any}
      />,
    );

    mockCheckboxProps.onChange({
      target: { checked: true },
    } as React.ChangeEvent<HTMLInputElement>);

    expect(onChange).toHaveBeenCalledWith(true);
  });
});
