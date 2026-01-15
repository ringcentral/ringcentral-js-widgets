import { whenStateChange } from '@ringcentral-integration/core/test';
import { screen, within } from '@testing-library/react';

import type { StepFunction } from '../../../lib/step';

export const CheckMatchResult: StepFunction<{
  content?: string;
  matchedItems?: string[];
  matchedHighLight?: string;
  type: 'foundFromServer' | 'Other' | 'Matched';
}> = async ({ content, type, matchedItems, matchedHighLight }) => {
  await whenStateChange(() => {
    const searchResultSection = screen.getByTestId(type);
    if (content) {
      expect(searchResultSection.textContent).toContain(content);
    }
    if (matchedItems) {
      const elements =
        within(searchResultSection).queryAllByTestId('matchedItemText');
      matchedItems.forEach((expectItemText) => {
        const matchedElement = elements.find(
          (element) => element.textContent === expectItemText,
        );
        expect(matchedElement).toBeTruthy();
        if (matchedElement && matchedHighLight) {
          expect(
            matchedElement.querySelector('[data-sign="highlight"]'),
          ).toHaveTextContent(matchedHighLight);
        }
      });
    }
  });
};
