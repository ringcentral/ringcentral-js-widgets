import { render, screen } from '@testing-library/react';
import React from 'react';

import { ConversationMessageList } from '../../src/app/views/ConversationViewSpring/ConversationPanel/ConversationMessageList';

jest.mock('@ringcentral-integration/micro-core/src/app/hooks', () => ({
  useLocale: () => ({
    t: (key: string) =>
      key === 'deliveryError'
        ? "Sorry, we're having trouble delivering your message. Please try again."
        : key,
  }),
}));

jest.mock('@ringcentral-integration/micro-phone/src/app/hooks', () => ({
  useFormattedDateFromNowFn: () => () => '10:00',
}));

jest.mock(
  '../../src/app/views/ConversationViewSpring/ConversationPanel/ConversationMessageList/SubjectRender',
  () => ({
    SubjectRender: ({ children }: React.PropsWithChildren<unknown>) => (
      <div>{children}</div>
    ),
  }),
);

jest.mock(
  '../../src/app/views/ConversationViewSpring/ConversationPanel/ConversationMessageList/i18n',
  () => ({
    getString: (key: string) => key,
  }),
);

jest.mock(
  '../../src/app/views/ConversationViewSpring/ConversationPanel/ConversationMessageList/styles.scss',
  () => ({
    root: 'root',
    message: 'message',
    time: 'time',
    messageBody: 'messageBody',
    clear: 'clear',
  }),
);

describe('ConversationMessageList delivery status', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = jest.fn();
  });

  it.each([
    ['Inbound', 'float-left'],
    ['Outbound', 'float-right'],
  ] as const)(
    'shows the localized delivery error for an %s message',
    (direction, alignmentClass) => {
      render(
        <ConversationMessageList
          messages={[
            {
              id: `failed-${direction}`,
              subject: 'Failed message',
              direction,
              creationTime: Date.now(),
              deliveryErrorCode: 'SMS-RC-500',
              mmsAttachments: [],
            } as any,
          ]}
        />,
      );

      const deliveryError = screen.getByText(
        "Sorry, we're having trouble delivering your message. Please try again.",
      );

      expect(deliveryError).toBeInTheDocument();
      expect(deliveryError).toHaveClass('text-danger', alignmentClass);
      expect(deliveryError.querySelector('svg')).toBeInTheDocument();
    },
  );

  it('does not show a delivery error for a message without an error code', () => {
    render(
      <ConversationMessageList
        messages={[
          {
            id: 'delivered',
            subject: 'Delivered message',
            direction: 'Outbound',
            creationTime: Date.now(),
            mmsAttachments: [],
          } as any,
        ]}
      />,
    );

    expect(
      screen.queryByText(
        "Sorry, we're having trouble delivering your message. Please try again.",
      ),
    ).not.toBeInTheDocument();
  });
});
