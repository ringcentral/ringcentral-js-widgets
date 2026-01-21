import { screen } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckButton: StepFunction<{
  selector: string;
  text: string;
  disabled?: boolean;
}> = async ({ selector, text, disabled = false }) => {
  const button = screen.queryByTestId(selector);
  expect(button).toBeInTheDocument();

  expect(button).toHaveTextContent(text);

  if (disabled) {
    try {
      expect(button).toBeDisabled();
    } catch {
      expect(button).toHaveAttribute('aria-disabled', 'true');
    }
  } else if (disabled === false) {
    expect(button).not.toBeDisabled();
  }
};
