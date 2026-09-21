import { render, screen } from '@ringcentral-integration/test-utils';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import React from 'react';

import {
  DAYS,
  HOURS,
  MINS,
  TimeInput,
} from '../../components/ReplyWithMessage/TimeInput';

const getProps = () => ({
  currentLocale: 'en-US',
  timeValue: '5',
  timeUnit: MINS,
  inputRef: jest.fn(),
  onTimeValueChange: jest.fn(),
  onSelectTimeUnit: jest.fn(),
});

describe('TimeInput', () => {
  it('selects minutes unit when clicking the min button', () => {
    const props = getProps();
    render(<TimeInput {...props} />);

    fireEvent.click(screen.getByText('min'));

    expect(props.onSelectTimeUnit).toHaveBeenCalledWith(MINS);
  });

  it('selects hours unit when clicking the hours button', () => {
    const props = getProps();
    render(<TimeInput {...props} />);

    fireEvent.click(screen.getByText('hours'));

    expect(props.onSelectTimeUnit).toHaveBeenCalledWith(HOURS);
  });

  it('selects days unit when clicking the days button', () => {
    const props = getProps();
    render(<TimeInput {...props} />);

    fireEvent.click(screen.getByText('days'));

    expect(props.onSelectTimeUnit).toHaveBeenCalledWith(DAYS);
  });
});
