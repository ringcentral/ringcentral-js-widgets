import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen } from '@testing-library/react';

interface ICheckConversationPageHyperLinkProps {
  linksAmount: number;
  content?: string;
}

export const CheckConversationPageHyperLink: StepFunction<
  ICheckConversationPageHyperLinkProps
> = async ({ linksAmount, content }) => {
  const subjectDom = screen.getByTestId('message');
  if (content) {
    expect(subjectDom).toHaveTextContent(content);
  }
  const links = subjectDom.querySelectorAll('a') as any;
  expect(links.length).toBe(linksAmount);
};
