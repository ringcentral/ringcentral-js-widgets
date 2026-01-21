import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@ringcentral-integration/test-utils';

export const CheckTextContent: StepFunction<{
  dataSign?: string;
  content: string;
}> = async ({ dataSign, content }) => {
  if (dataSign) {
    expect(screen.getByTestId(dataSign)).toHaveTextContent(content);
  } else {
    expect(screen.getByText(content)).toBeInTheDocument();
  }
};
