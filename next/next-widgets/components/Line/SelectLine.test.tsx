import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { SelectLine } from './SelectLine';

jest.mock('@ringcentral/spring-ui', () => {
  const React = require('react');

  return {
    ...jest.requireActual('@ringcentral/spring-ui'),
    Option: ({ children }: { children: React.ReactNode }) =>
      React.createElement('div', null, children),
    Select: ({
      children,
      renderValue,
      value,
      onChange,
    }: {
      children: React.ReactNode;
      renderValue: (value: unknown) => React.ReactNode;
      value: unknown;
      onChange: (e: { target: { value: string } }) => void;
    }) =>
      React.createElement(
        'div',
        {
          'data-sign': 'select',
          onClick: () => onChange({ target: { value: 'next' } }),
        },
        React.createElement('div', null, renderValue(value)),
        children,
      ),
  };
});

const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

describe('SelectLine', () => {
  it('renders the label of the selected option', () => {
    render(
      <SelectLine value="b" options={options} onChange={jest.fn()}>
        Label
      </SelectLine>,
    );

    // rendered both by renderValue and the option list
    expect(screen.getAllByText('Option B').length).toBeGreaterThan(0);
  });

  it('falls back to the raw value when no option matches', () => {
    render(
      <SelectLine value="unknown" options={options} onChange={jest.fn()}>
        Label
      </SelectLine>,
    );

    expect(screen.getByText('unknown')).toBeInTheDocument();
  });

  it('renders a numeric value when no option matches', () => {
    render(
      <SelectLine value={7} options={options} onChange={jest.fn()}>
        Label
      </SelectLine>,
    );

    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('renders empty text for a non-primitive unmatched value', () => {
    const { container } = render(
      <SelectLine value={{ id: 1 }} options={options} onChange={jest.fn()}>
        Label
      </SelectLine>,
    );

    expect(container.querySelector('[data-sign="select"]')!.textContent).toBe(
      'Option AOption B',
    );
  });

  it('emits the selected value on change', () => {
    const onChange = jest.fn();
    render(
      <SelectLine value="a" options={options} onChange={onChange}>
        Label
      </SelectLine>,
    );

    fireEvent.click(screen.getByTestId('select'));

    expect(onChange).toHaveBeenCalledWith('next');
  });
});
