import { render, screen } from '@ringcentral-integration/test-utils';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import React from 'react';

import { SelectLineItem } from '../../components/SettingsPanel/SelectLineItem';

const getProps = () => ({
  show: true,
  name: 'testSetting',
  currentLocale: 'en-US',
  dataSign: 'testSetting',
  value: 'a',
  options: [
    { value: 'a', label: 'optionA' },
    { value: 'b', label: 'optionB' },
  ],
  onChange: jest.fn(),
});

describe('SelectLineItem', () => {
  it('emits the selected value when the selection changes', () => {
    const props = getProps();
    render(<SelectLineItem {...props} />);

    fireEvent.mouseDown(screen.getByRole('button', { name: 'optionA' }));
    fireEvent.click(screen.getByText('optionB'));

    expect(props.onChange).toHaveBeenCalledWith('b');
  });
});
