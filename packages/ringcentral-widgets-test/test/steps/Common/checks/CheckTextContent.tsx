import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';

export const CheckTextContent: StepFunction<{
  dataSign?: string;
  containerDataSign?: string;
  content: string;
}> = async ({ dataSign, containerDataSign, content }) => {
  const queryRoot = containerDataSign
    ? within(screen.getByTestId(containerDataSign))
    : screen;
  if (dataSign) {
    expect(queryRoot.getByTestId(dataSign)).toHaveTextContent(content);
  } else {
    expect(queryRoot.getByText(content)).toBeInTheDocument();
  }
};
