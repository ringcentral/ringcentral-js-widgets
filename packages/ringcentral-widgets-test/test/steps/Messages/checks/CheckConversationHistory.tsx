import { waitForRenderReady } from '@ringcentral-integration/test-utils/lib/test-utils';
import { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';
import { intersection } from 'ramda';

export const CheckConversationHistory: StepFunction<{
  userName: string;
  textList: Array<string>;
  type?: 'OutboundText' | 'InboundText';
}> = async ({ userName, textList, type = 'OutboundText' }) => {
  await waitForRenderReady();
  expect(screen.getByTestId('currentName')).toHaveTextContent(userName);

  const messagesListEls = screen.getAllByTestId('message');
  const messagesList = messagesListEls.map(
    (messageEl) => within(messageEl).getByTestId(type).textContent,
  );
  expect(intersection(messagesList, textList)).toEqual(textList);
};
