import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@testing-library/react';

const ClickVoicemailButton: StepFunction = async () => {
  fireEvent.click(screen.getByTestId('toVoicemailBtn'));
};

export { ClickVoicemailButton };
