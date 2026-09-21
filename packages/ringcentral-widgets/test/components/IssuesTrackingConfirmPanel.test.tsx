import { render } from '@ringcentral-integration/test-utils';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import React from 'react';

import { IssuesTrackingCloseConfirmPanel } from '../../components/IssuesTrackingPanel/IssuesTrackingConfirmPanel/IssuesTrackingConfirmPanel';

const getProps = () => ({
  open: true,
  onClose: jest.fn(),
  onCancel: jest.fn(),
  onConfirm: jest.fn(),
});

describe('IssuesTrackingCloseConfirmPanel', () => {
  it('calls onCancel when clicking the cancel button', () => {
    const props = getProps();
    const { container } = render(
      <IssuesTrackingCloseConfirmPanel {...props} />,
    );

    fireEvent.click(
      document.querySelector('[data-sign="DialogCancelButton"]')!,
    );

    expect(props.onCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when clicking the confirm button', () => {
    const props = getProps();
    render(<IssuesTrackingCloseConfirmPanel {...props} />);

    fireEvent.click(document.querySelector('[data-sign="DialogOKButton"]')!);

    expect(props.onConfirm).toHaveBeenCalledTimes(1);
  });
});
