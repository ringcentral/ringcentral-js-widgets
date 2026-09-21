import { render, screen } from '@ringcentral-integration/test-utils';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import React from 'react';

import InputSelect from '../../components/InputSelect/InputSelect';

describe('InputSelect', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('updates the input value and debounces onChange', () => {
    const onChange = jest.fn().mockResolvedValue(undefined);
    render(<InputSelect subject="" onChange={onChange} label="Subject" />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'hello' } });

    expect((input as HTMLInputElement).value).toBe('hello');

    jest.advanceTimersByTime(500);

    expect(onChange).toHaveBeenCalledWith('hello');
  });
});
