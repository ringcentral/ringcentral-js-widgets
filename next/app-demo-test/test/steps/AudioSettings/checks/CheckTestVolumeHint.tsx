import { screen } from '@ringcentral-integration/test-utils';
import type { StepFunction } from '@ringcentral-integration/test-utils';

export const CheckTestVolumeHint: StepFunction<{
  selector: string;
  text: string;
  color?: 'red' | 'green';
}> = async ({ selector, text, color = 'red' }) => {
  const hint = screen.queryByTestId(selector);
  if (!text) {
    expect(hint).not.toBeInTheDocument();
    return;
  } else {
    expect(hint).toHaveTextContent(text);
    if (color) {
      expect(hint).toHaveStyle(
        `color: ${color === 'red' ? '#BE3933' : '#32773B'}`,
      );
    }
  }
};
