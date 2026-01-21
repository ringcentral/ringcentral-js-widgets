import type { StepFunction } from '@ringcentral-integration/test-utils';
import { fireEvent, screen } from '@ringcentral-integration/test-utils';

export const ClickConversationPageHyperLink: StepFunction = async () => {
  const subjectDom = screen.getByTestId('message');
  const links = subjectDom.querySelectorAll('a') as any;
  links.forEach((ele: HTMLElement) => {
    fireEvent.click(ele);
  });
};
