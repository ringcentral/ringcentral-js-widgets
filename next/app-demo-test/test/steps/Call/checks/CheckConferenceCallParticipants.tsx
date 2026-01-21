import { whenStateChange } from '@ringcentral-integration/next-core/test';
import type { StepFunction } from '@ringcentral-integration/test-utils';
import { screen, within } from '@testing-library/react';

interface CheckConferenceCallParticipantsProps {
  /**
   * Whether the participants list is open
   */
  open?: boolean;
  /**
   * Participants details to check [first participant is the host]
   */
  participants: Array<{ name: string }>;
}

const CheckParticipantItem = async (
  element: HTMLElement,
  {
    participantName,
    hasRemoveButton,
  }: { participantName: string; hasRemoveButton: boolean },
) => {
  expect(element).toBeInTheDocument();

  // Check participant avatar
  expect(
    within(element).queryByTestId('participantAvatar'),
  ).toBeInTheDocument();

  // Check participant name
  const participantNameElement =
    within(element).queryByTestId('participantName');
  expect(participantNameElement).toBeInTheDocument();
  expect(participantNameElement?.textContent?.trim()).toBe(participantName);

  // Check remove participant button
  const removeParticipantButton = within(element).queryByTestId(
    'removeParticipantButton',
  );
  if (hasRemoveButton) {
    expect(removeParticipantButton).toBeInTheDocument();
  } else {
    expect(removeParticipantButton).not.toBeInTheDocument();
  }

  // Check remove participant button tooltip
  if (hasRemoveButton) {
    expect(removeParticipantButton).toHaveAttribute(
      'title',
      'Remove participant',
    );
  }
};

/**
 * Check conference call participants
 * @param open - Whether the participants list is open
 * @param participants - Participants details to check
 * @returns {Promise<void>}
 */
export const CheckConferenceCallParticipants: StepFunction<
  CheckConferenceCallParticipantsProps
> = async ({ open = true, participants }) => {
  if (!open) {
    await whenStateChange(() => {
      expect(
        screen.queryByTestId('participantsListModal'),
      ).not.toBeInTheDocument();
    });
    return;
  }

  const participantsListModal = screen.queryByTestId('participantsListModal')!;
  expect(participantsListModal).toBeInTheDocument();

  // Check title
  expect(
    within(participantsListModal).getByText(
      `Participants (${participants.length})`,
    ),
  ).toBeInTheDocument();

  // Check host himself
  const hostItem = within(participantsListModal).getByTestId(
    'participantItemHost',
  );
  CheckParticipantItem(hostItem, {
    participantName: participants[0].name, // first participant is the host
    hasRemoveButton: false,
  });

  // Check participants
  const participantItems = within(participantsListModal).queryAllByTestId(
    'participantItem',
  );
  participants.slice(1).forEach((participant, index) => {
    CheckParticipantItem(participantItems[index], {
      participantName: participant.name,
      hasRemoveButton: true,
    });
  });
};
