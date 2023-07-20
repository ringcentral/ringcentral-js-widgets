import { screen } from '@testing-library/react';
import type { StepFunction } from '../../../lib/step';

interface MessageListProps {
  expectList: string[];
}

interface MessageItemProps {
  contactName: string;
  messageDetail: string;
}

interface MessageItemCreateTimeProps {
  expectResult: {
    testId: string;
    createTime: string;
  }[];
}

export const CheckMessageListDisplayInTimeOrder: StepFunction<MessageListProps> =
  ({ expectList }) => {
    const messageItem = screen
      .getByTestId('conversationList')
      .querySelectorAll('[data-sign$="MessageItem"]');
    expect(messageItem.length).toBe(expectList.length);

    const messageList = Array.from(messageItem).map((item) =>
      item.getAttribute('data-sign'),
    );
    expect(messageList).toEqual(expectList);
  };

export const CheckSMSMessageItemDisplay: StepFunction<MessageItemProps> = ({
  contactName,
  messageDetail,
}) => {
  const messageItem = screen.getByTestId('SMSMessageItem');
  expect(
    messageItem.querySelector('span[title="Conversation"]'),
  ).toBeInTheDocument();
  expect(
    messageItem.querySelector('[data-sign="contactName"] span')?.innerHTML,
  ).toBe(contactName);
  expect(messageItem.querySelector('[data-sign="msgDetail"]')?.innerHTML).toBe(
    messageDetail,
  );
  expect(
    messageItem.querySelector('[data-sign="msgCreateTime"]'),
  ).toBeInTheDocument();
  expect(
    messageItem.querySelector('button[data-sign="smsLog"]'),
  ).toBeInTheDocument();
  expect(messageItem.querySelector('[data-sign="Call"]')).toBeInTheDocument();
  expect(
    messageItem.querySelector('[data-sign="Create New"]'),
  ).toBeInTheDocument();
};

export const CheckMessageCreateTimeDisplay: StepFunction<MessageItemCreateTimeProps> =
  ({ expectResult }) => {
    expectResult.forEach((item) => {
      expect(
        screen
          .getByTestId(item.testId)
          .querySelector('[data-sign="msgCreateTime"]')?.innerHTML,
      ).toBe(item.createTime);
    });
  };
