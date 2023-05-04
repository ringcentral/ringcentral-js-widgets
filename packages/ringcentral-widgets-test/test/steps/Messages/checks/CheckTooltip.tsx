import { StepFunction } from '@ringcentral-integration/test-utils';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export const checkElementTitle = async (panel: any, title: string) => {
  const ele = panel.querySelector(`[title="${title}"]`);
  expect(ele).toBeInTheDocument();
};

export const CheckVoiceMailItemTooltips: StepFunction<{
  contactName: string;
  durationTime: number;
  expectShowEntityButton?: boolean;
}> = async ({ contactName, durationTime, expectShowEntityButton }) => {
  const item = screen.queryByTestId('VoiceMailMessageItem');
  await checkElementTitle(item, 'Play');
  await checkElementTitle(item, 'Download');
  await checkElementTitle(item, 'Call');
  await checkElementTitle(item, 'Text');
  await checkElementTitle(item, 'Mark as Read');
  await checkElementTitle(item, 'Delete');
  await checkElementTitle(item, `Voice message (${durationTime})`);
  if (expectShowEntityButton) {
    await checkElementTitle(item, 'View Details');
  }
  const userName = item?.querySelector('[data-sign="currentName"]');
  expect(userName).toHaveTextContent(contactName);
};

export const PlayAndCheckVoiceMailItemTooltips: StepFunction = async () => {
  const item = screen.queryByTestId('VoiceMailMessageItem');
  act(() => {
    const playBtn = item!.querySelector(`[title="Play"]`);
    userEvent.click(playBtn!);
  });
  await checkElementTitle(item, 'Pause');
  await waitFor(
    async () => {
      console.log('Mark as Unread');
      await checkElementTitle(item, 'Mark as Unread');
    },
    { timeout: 3000 },
  );
};

export const CheckElementTitleById: StepFunction<{
  dataSign: string;
  title: string;
}> = async ({ dataSign, title }) => {
  const item = screen.getByTestId(dataSign);
  await checkElementTitle(item, title);
};
