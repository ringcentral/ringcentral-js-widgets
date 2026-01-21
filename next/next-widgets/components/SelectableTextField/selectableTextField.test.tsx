import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';

import { SelectableTextField } from './SelectableTextField';

describe('SelectableTextField', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const setup = (props = {}) => {
    const onChange = jest.fn();
    const utils = render(
      <SelectableTextField
        label="Test Label"
        options={options}
        value=""
        // @ts-ignore
        data-sign="Test Field"
        onChange={onChange}
        {...props}
      />,
    );
    const input = screen.getByTestId('Test Field');
    return {
      input,
      onChange,
      ...utils,
    };
  };

  test('renders the component', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
  });

  test('opens and closes the dropdown menu', () => {
    const { input } = setup();
    fireEvent.focus(input);
    expect(screen.getByTestId('autocompleteMenu')).toBeInTheDocument();
    fireEvent.blur(input);
    fireEvent.change(input, { target: { value: 'Option 2' } });
    fireEvent.blur(input);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('selects an item from the dropdown', () => {
    const { input, onChange } = setup();
    fireEvent.focus(input);
    fireEvent.mouseDown(screen.getByText('Option 1'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(onChange).toHaveBeenCalledWith('option1');
  });

  test('searches and filters options', () => {
    const { input } = setup({ searchable: true });
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Option 2' } });
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  test('handles keyboard navigation and selection', () => {
    const { input, onChange } = setup();
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('option1');
  });

  test('handles empty options', () => {
    const { input } = setup({ options: [] });
    fireEvent.focus(input);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('handles disabled state', () => {
    const { input } = setup({ disabled: true });
    expect(input).toBeDisabled();
    fireEvent.focus(input);
    expect(input).toBeInTheDocument();
  });

  test('handles keydown event', () => {
    const { input } = setup();
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getByTestId('autocompleteMenu')).toBeInTheDocument();
  });

  test('handles keyup event', () => {
    const { input } = setup();
    fireEvent.keyUp(input, { key: 'ArrowUp' });
    fireEvent.focus(input);
    fireEvent.keyUp(input, { key: 'ArrowUp' });
    expect(screen.getByTestId('autocompleteMenu')).toBeInTheDocument();
  });

  test('handles keyDown event', () => {
    const { input } = setup();
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(screen.getByTestId('autocompleteMenu')).toBeInTheDocument();
  });

  test('handles Escape key event', () => {
    const { input } = setup();
    fireEvent.keyDown(input, { key: 'Escape' });
    fireEvent.focus(input);
    fireEvent.click(screen.getByTestId('expandCollapseCaret'));
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input).toBeInTheDocument();
  });

  test('displays the correct selected label', () => {
    const { input } = setup({ value: 'option2' });
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('expandCollapseCaret'));
    expect(input).toBeInTheDocument();
  });
});
