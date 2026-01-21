import { type StepFunction, screen } from '@ringcentral-integration/test-utils';

interface ICheckConversationPageHyperLinkProps {
  linksAmount: number;
  content?: string;
  links?: string[];
}

export const CheckConversationPageHyperLink: StepFunction<
  ICheckConversationPageHyperLinkProps
> = async ({ linksAmount, content, links = [] }) => {
  const subjectDom = screen.getByTestId('message');
  if (content) {
    expect(subjectDom).toHaveTextContent(content);
  }
  const linkElements = subjectDom.querySelectorAll('a') as any;
  expect(linkElements.length).toBe(linksAmount);

  if (links.length) {
    links.map((link, index) => {
      // click will open url with href
      expect(linkElements[index].getAttribute('href')).toBe(link);
      // will open in new tab
      expect(linkElements[index].target).toBe('_blank');
    });
  }
};
