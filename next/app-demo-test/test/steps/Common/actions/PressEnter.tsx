import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

export const PressEnter: StepFunction<{ dataSign: string }> = async ({
  dataSign,
}) => {
  const Textarea = screen.getByTestId(dataSign);

  fireEvent.keyDown(Textarea, {
    key: 'Enter',
    code: 'Enter',
    charCode: 13,
    keyCode: 13,
  });
};
